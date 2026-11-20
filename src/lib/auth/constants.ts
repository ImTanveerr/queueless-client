/**
 * Cookie names match the backend's, so the tokens it returns can be stored as-is
 * and forwarded back on every API call.
 */
export const ACCESS_COOKIE = "accessToken";
export const REFRESH_COOKIE = "refreshToken";
export const SESSION_COOKIE = "better-auth.session_token";

export const AUTH_COOKIES = [ACCESS_COOKIE, REFRESH_COOKIE, SESSION_COOKIE] as const;
