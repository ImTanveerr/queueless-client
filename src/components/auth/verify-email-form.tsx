"use client";

import Link from "next/link";
import { useActionState } from "react";
import { verifyEmailAction } from "@/actions/auth";
import { Alert } from "@/components/ui/alert";
import { SubmitButton } from "@/components/ui/submit-button";
import { TextField } from "@/components/ui/text-field";
import type { ActionState } from "@/types/actions";

const initialState: ActionState = {};

export function VerifyEmailForm({ email }: { email?: string }) {
  const [state, formAction] = useActionState(verifyEmailAction, initialState);
  const errors = state.fieldErrors;

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.message ? <Alert tone="error">{state.message}</Alert> : null}

      <TextField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        defaultValue={state.values?.email ?? email}
        error={errors?.email?.[0]}
        required
      />
      <TextField
        name="otp"
        label="Verification code"
        inputMode="numeric"
        autoComplete="one-time-code"
        defaultValue={state.values?.otp}
        error={errors?.otp?.[0]}
        className="tracking-[0.3em]"
        required
      />

      <SubmitButton pendingText="Verifying…" className="w-full">
        Verify email
      </SubmitButton>

      <p className="text-sm text-ink-soft">
        No code yet? Log in with your email and password and we&apos;ll send a new one.{" "}
        <Link href="/login" className="font-semibold text-ink underline underline-offset-4">
          Go to log in
        </Link>
      </p>
    </form>
  );
}
