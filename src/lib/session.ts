import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { AUTH_COOKIES, ACCESS_COOKIE } from "@/lib/auth/constants";
import { buildAuthCookies, type AuthTokens } from "@/lib/auth/tokens";
import type { CurrentUser } from "@/types/api";

/** Stores the backend's tokens as cookies on this site (server actions only). */
export async function setAuthCookies(tokens: AuthTokens) {
  const store = await cookies();
  for (const { name, value, options } of buildAuthCookies(tokens)) {
    store.set(name, value, options);
  }
}

export async function clearAuthCookies() {
  const store = await cookies();
  for (const name of AUTH_COOKIES) store.delete(name);
}

/**
 * The signed-in user, or null. Asks the backend (GET /auth/me), so blocked or
 * deleted accounts are caught here. Memoised per request, so layouts and pages
 * can both call it without a second network round trip.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const store = await cookies();
  if (!store.get(ACCESS_COOKIE)?.value) return null;

  const result = await apiFetch<CurrentUser>("/auth/me");
  return result.ok ? result.data : null;
});

/**
 * Use at the top of protected server components. The proxy already redirects
 * signed-out visitors, so this only fires when the cookies look fine but the
 * backend rejects them (expired session, blocked account). `/session/clear`
 * removes the stale cookies before sending them to the login page.
 */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/session/clear");
  return user;
}
