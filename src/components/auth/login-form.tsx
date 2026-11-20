"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import { Alert } from "@/components/ui/alert";
import { PasswordField } from "@/components/ui/password-field";
import { SubmitButton } from "@/components/ui/submit-button";
import { TextField } from "@/components/ui/text-field";
import type { ActionState } from "@/types/actions";

interface LoginFormProps {
  /** Page to open after signing in. Validated again on the server. */
  redirectTo?: string;
  notice?: { tone: "success" | "info" | "error"; text: string };
}

const initialState: ActionState = {};

export function LoginForm({ redirectTo, notice }: LoginFormProps) {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} noValidate className="space-y-5">
      {redirectTo ? <input type="hidden" name="redirect" value={redirectTo} /> : null}

      {state.message ? (
        <Alert tone="error">{state.message}</Alert>
      ) : notice ? (
        <Alert tone={notice.tone}>{notice.text}</Alert>
      ) : null}

      <TextField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        defaultValue={state.values?.email}
        error={state.fieldErrors?.email?.[0]}
        required
      />
      <PasswordField
        name="password"
        label="Password"
        autoComplete="current-password"
        error={state.fieldErrors?.password?.[0]}
      />

      <SubmitButton pendingText="Logging in…" className="w-full">
        Log in
      </SubmitButton>

      <p className="text-sm text-ink-soft">
        New here?{" "}
        <Link href="/register" className="font-semibold text-ink underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </form>
  );
}
