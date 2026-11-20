import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_COOKIE,
  AUTH_COOKIES,
  REFRESH_COOKIE,
  SESSION_COOKIE,
} from "@/lib/auth/constants";
import { buildAuthCookies, isTokenValid, type AuthTokens } from "@/lib/auth/tokens";
import { DEFAULT_DASHBOARD, isGuestOnlyPath, isProtectedPath } from "@/lib/routes";
import type { RefreshData } from "@/types/api";

/**
 * Runs before every page request (Next.js 16's replacement for middleware.ts).
 *
 *  1. Renews an expired access token with the refresh token (POST /auth/refresh-token).
 *  2. Sends signed-out visitors away from protected pages.
 *  3. Sends signed-in users away from login / register.
 *
 * It only decodes tokens to decide where to send people. The backend still verifies
 * them on every real API call, and `requireUser()` double-checks inside the dashboard.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  let sessionToken = request.cookies.get(SESSION_COOKIE)?.value;

  let accessIsValid = isTokenValid(accessToken);
  let renewed: AuthTokens | null = null;

  if (!accessIsValid && sessionToken && isTokenValid(refreshToken)) {
    renewed = await renewTokens(refreshToken as string, sessionToken);
    if (renewed) {
      accessIsValid = true;
      sessionToken = renewed.sessionToken;
      // Update the incoming request too, so server components in this same
      // request already see the fresh cookies.
      for (const { name, value } of buildAuthCookies(renewed)) {
        request.cookies.set(name, value);
      }
    }
  }

  const authenticated = accessIsValid && Boolean(sessionToken);
  const hasStaleCookies = !authenticated && AUTH_COOKIES.some((name) => request.cookies.has(name));

  let response: NextResponse;

  if (isProtectedPath(pathname) && !authenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", `${pathname}${search}`);
    response = NextResponse.redirect(loginUrl);
  } else if (isGuestOnlyPath(pathname) && authenticated) {
    response = NextResponse.redirect(new URL(DEFAULT_DASHBOARD, request.url));
  } else {
    response = NextResponse.next({ request });
  }

  if (renewed) {
    for (const { name, value, options } of buildAuthCookies(renewed)) {
      response.cookies.set(name, value, options);
    }
  } else if (hasStaleCookies) {
    for (const name of AUTH_COOKIES) response.cookies.delete(name);
  }

  return response;
}

async function renewTokens(refreshToken: string, sessionToken: string): Promise<AuthTokens | null> {
  const baseUrl = process.env.base_api_url?.replace(/\/+$/, "");
  if (!baseUrl) return null;

  try {
    const res = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: "POST",
      headers: { Cookie: `${REFRESH_COOKIE}=${refreshToken}; ${SESSION_COOKIE}=${sessionToken}` },
      cache: "no-store",
    });
    if (!res.ok) return null;

    const json = (await res.json()) as { data?: RefreshData };
    const data = json.data;
    if (!data?.accessToken || !data.refreshToken || !data.sessionToken) return null;

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      sessionToken: data.sessionToken,
    };
  } catch {
    return null;
  }
}

export const config = {
  // Skip Next.js internals and anything with a file extension (images, fonts, etc.).
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
