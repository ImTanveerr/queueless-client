/** Where signed-in users land by default. */
export const DEFAULT_DASHBOARD = "/dashboard";

/** Routes that need a signed-in user. Matched as a prefix. */
export const PROTECTED_PREFIXES = ["/dashboard"];

/** Routes only for signed-out visitors. Signed-in users are sent to the dashboard. */
export const GUEST_ONLY_PATHS = ["/login", "/register", "/verify-email"];

function matchesPrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix));
}

export function isGuestOnlyPath(pathname: string) {
  return GUEST_ONLY_PATHS.some((path) => matchesPrefix(pathname, path));
}

/**
 * Accepts only same-site paths, so `?redirect=https://evil.example` or `//evil.example`
 * can never send someone off-site after login.
 */
export function safeRedirectPath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return null;
  return value;
}
