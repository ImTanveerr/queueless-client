import "server-only";
import { cookies } from "next/headers";
import { ACCESS_COOKIE, REFRESH_COOKIE, SESSION_COOKIE } from "@/lib/auth/constants";
import type { ApiErrorSource, ApiResult, PaginationMeta } from "@/types/api";

/** Backend base URL, including the /api/v1 prefix. Set `base_api_url` in .env. */
function getBaseUrl(): string {
  const baseUrl = process.env.base_api_url;
  if (!baseUrl) {
    throw new Error("base_api_url is not set. Add it to .env (see .env.example).");
  }
  return baseUrl.replace(/\/+$/, "");
}

type ApiFetchOptions = Omit<RequestInit, "body" | "headers"> & {
  /** Sent as JSON. */
  body?: unknown;
  headers?: Record<string, string>;
  /** Forward the signed-in user's cookies to the backend. Defaults to true. */
  auth?: boolean;
};

async function buildCookieHeader(): Promise<string> {
  const store = await cookies();
  return [ACCESS_COOKIE, REFRESH_COOKIE, SESSION_COOKIE]
    .map((name) => {
      const value = store.get(name)?.value;
      return value ? `${name}=${value}` : null;
    })
    .filter(Boolean)
    .join("; ");
}

/**
 * Server-side client for the backend API. Use it from server actions, server
 * components and route handlers.
 *
 *   const res = await apiFetch<CurrentUser>("/auth/me");
 *   if (res.ok) res.data.name; else res.message;
 */
export async function apiFetch<T>(
  path: string,
  { body, headers, auth = true, ...init }: ApiFetchOptions = {},
): Promise<ApiResult<T>> {
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", "application/json");
  if (body !== undefined) requestHeaders.set("Content-Type", "application/json");

  if (auth) {
    const cookieHeader = await buildCookieHeader();
    if (cookieHeader) requestHeaders.set("Cookie", cookieHeader);
  }

  let response: Response;
  try {
    response = await fetch(`${getBaseUrl()}${path}`, {
      ...init,
      headers: requestHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return {
      ok: false,
      status: 0,
      message: "Can't reach the server right now. Check your connection and try again.",
      errors: [],
    };
  }

  const json = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
    data?: T;
    meta?: PaginationMeta;
    errorSources?: ApiErrorSource[];
  } | null;

  if (response.ok && json?.success !== false) {
    return {
      ok: true,
      status: response.status,
      message: json?.message ?? "",
      data: json?.data as T,
      meta: json?.meta,
    };
  }

  return {
    ok: false,
    status: response.status,
    message: json?.message ?? "Something went wrong. Please try again.",
    errors: json?.errorSources ?? [],
  };
}
