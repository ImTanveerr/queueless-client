"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { apiFetch } from "@/lib/api";
import { DEFAULT_DASHBOARD, safeRedirectPath } from "@/lib/routes";
import { clearAuthCookies, setAuthCookies } from "@/lib/session";
import {
  loginSchema,
  registerSchema,
  verifyEmailSchema,
} from "@/lib/validations/auth";
import type { ActionState } from "@/types/actions";
import type { LoginData } from "@/types/api";

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function invalid(error: z.ZodError, values: Record<string, string>): ActionState {
  return { fieldErrors: z.flattenError(error).fieldErrors, values };
}

/**
 * POST /auth/login. On success the backend returns the tokens in the body, and we
 * store them as cookies on *this* site. (The backend's own Set-Cookie headers belong
 * to the backend's domain, so the browser would never send them to Next.js.)
 */
export async function loginAction(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = field(formData, "email").trim();
  const values = { email };

  const parsed = loginSchema.safeParse({ email, password: field(formData, "password") });
  if (!parsed.success) return invalid(parsed.error, values);

  const result = await apiFetch<LoginData>("/auth/login", {
    method: "POST",
    body: parsed.data,
    auth: false,
  });

  if (!result.ok) {
    // The backend asks unverified users to confirm their email first and sends a new code.
    if (/verif/i.test(result.message)) {
      redirect(`/verify-email?email=${encodeURIComponent(email)}&from=login`);
    }
    return { message: result.message, values };
  }

  const { accessToken, refreshToken, token } = result.data;
  await setAuthCookies({ accessToken, refreshToken, sessionToken: token });

  redirect(safeRedirectPath(formData.get("redirect")) ?? DEFAULT_DASHBOARD);
}

/**
 * POST /auth/register. New accounts must verify their email before they can sign in,
 * so no cookies are stored here; the next step is the verification code.
 */
export async function registerAction(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const values = { name: field(formData, "name").trim(), email: field(formData, "email").trim() };

  const parsed = registerSchema.safeParse({
    ...values,
    password: field(formData, "password"),
    confirmPassword: field(formData, "confirmPassword"),
  });
  if (!parsed.success) return invalid(parsed.error, values);

  const { name, email, password } = parsed.data;
  const result = await apiFetch("/auth/register", {
    method: "POST",
    body: { name, email, password },
    auth: false,
  });

  if (!result.ok) return { message: result.message, values };

  redirect(`/verify-email?email=${encodeURIComponent(email)}&from=register`);
}

/** POST /auth/verify-email with the one-time code that was emailed. */
export async function verifyEmailAction(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const values = { email: field(formData, "email").trim(), otp: field(formData, "otp").trim() };

  const parsed = verifyEmailSchema.safeParse(values);
  if (!parsed.success) return invalid(parsed.error, values);

  const result = await apiFetch("/auth/verify-email", {
    method: "POST",
    body: parsed.data,
    auth: false,
  });

  if (!result.ok) return { message: result.message, values };

  redirect("/login?verified=1");
}

/** POST /auth/logout, then always clear the local cookies, even if the backend call fails. */
export async function logoutAction() {
  await apiFetch("/auth/logout", { method: "POST" });
  await clearAuthCookies();
  redirect("/login");
}
