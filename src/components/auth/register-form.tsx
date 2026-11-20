"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction } from "@/actions/auth";
import { Alert } from "@/components/ui/alert";
import { PasswordField } from "@/components/ui/password-field";
import { SubmitButton } from "@/components/ui/submit-button";
import { TextField } from "@/components/ui/text-field";
import type { ActionState } from "@/types/actions";

const initialState: ActionState = {};

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initialState);
  const errors = state.fieldErrors;

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.message ? <Alert tone="error">{state.message}</Alert> : null}

      <TextField
        name="name"
        label="Full name"
        autoComplete="name"
        defaultValue={state.values?.name}
        error={errors?.name?.[0]}
        required
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        defaultValue={state.values?.email}
        error={errors?.email?.[0]}
        required
      />
      <PasswordField
        name="password"
        label="Password"
        autoComplete="new-password"
        hint="At least 8 characters."
        error={errors?.password?.[0]}
      />
      <PasswordField
        name="confirmPassword"
        label="Confirm password"
        autoComplete="new-password"
        error={errors?.confirmPassword?.[0]}
      />

      <SubmitButton pendingText="Creating account…" className="w-full">
        Create account
      </SubmitButton>

      <p className="text-sm text-ink-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-ink underline underline-offset-4">
          Log in
        </Link>
      </p>
    </form>
  );
}
