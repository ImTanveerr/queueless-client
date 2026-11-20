import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <>
      <h1 className="font-display text-3xl font-semibold">Create your account</h1>
      <p className="mt-2 mb-8 text-ink-soft">
        It takes a minute. We&apos;ll email you a code to confirm your address.
      </p>
      <RegisterForm />
    </>
  );
}
