import { decodeJwt } from "jose";
import { ACCESS_COOKIE, REFRESH_COOKIE, SESSION_COOKIE } from "./constants";

/**
 * Safe to import from both the proxy and server code (no `server-only`).
 *
 * Tokens are only *decoded* here, never verified: the signing secrets stay on the
 * backend. That is fine for routing decisions, because every real data request is
 * checked by the backend itself.
 */

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  sessionToken: string;
}

const DAY = 60 * 60 * 24;

/** True when the token decodes and has at least `skewSeconds` of life left. */
export function isTokenValid(token: string | undefined, skewSeconds = 10): boolean {
  if (!token) return false;
  try {
    const { exp } = decodeJwt(token);
    return typeof exp === "number" && exp > Math.floor(Date.now() / 1000) + skewSeconds;
  } catch {
    return false;
  }
}

function secondsLeft(token: string, fallback: number): number {
  try {
    const { exp } = decodeJwt(token);
    if (typeof exp === "number") {
      const left = exp - Math.floor(Date.now() / 1000);
      if (left > 0) return left;
    }
  } catch {
    // fall through to the fallback
  }
  return fallback;
}

/** Cookie definitions for a set of tokens, ready for `cookies().set` or `response.cookies.set`. */
export function buildAuthCookies(tokens: AuthTokens) {
  const base = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  const refreshAge = secondsLeft(tokens.refreshToken, DAY * 7);

  return [
    {
      name: ACCESS_COOKIE,
      value: tokens.accessToken,
      options: { ...base, maxAge: secondsLeft(tokens.accessToken, DAY) },
    },
    {
      name: REFRESH_COOKIE,
      value: tokens.refreshToken,
      options: { ...base, maxAge: refreshAge },
    },
    {
      // Lives as long as the refresh token so the proxy can still renew an expired
      // access token the next day. The backend enforces the real session expiry.
      name: SESSION_COOKIE,
      value: tokens.sessionToken,
      options: { ...base, maxAge: refreshAge },
    },
  ];
}
