import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";

export const metadata: Metadata = { title: "Verify your email" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default function VerifyEmailPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <h1 className="font-display text-3xl font-semibold">Verify your email</h1>
      <Suspense fallback={<div aria-hidden className="mt-8 h-64 rounded-lg bg-sage/50" />}>
        <VerifyEmailContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function VerifyEmailContent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const email = Array.isArray(params.email) ? params.email[0] : params.email;

  return (
    <>
      <p className="mt-2 mb-8 text-ink-soft">
        {email ? (
          <>
            We sent a code to <span className="font-semibold text-ink">{email}</span>. Enter it
            below to finish setting up your account.
          </>
        ) : (
          "Enter the code we emailed you to finish setting up your account."
        )}
      </p>
      <VerifyEmailForm email={email} />
    </>
  );
}
