import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { safeRedirectPath } from "@/lib/routes";

export const metadata: Metadata = { title: "Log in" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <h1 className="font-display text-3xl font-semibold">Log in</h1>
      <p className="mt-2 mb-8 text-ink-soft">Welcome back. Log in to manage your appointments.</p>

      {/* searchParams is only known per request, so it is read inside Suspense. */}
      <Suspense fallback={<LoginFormFallback />}>
        <LoginFormWithParams searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function LoginFormWithParams({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  let notice: { tone: "success" | "info" | "error"; text: string } | undefined;
  if (first(params.verified) === "1") {
    notice = { tone: "success", text: "Email verified. Log in to continue." };
  } else if (first(params.session) === "expired") {
    notice = { tone: "info", text: "Your session ended. Log in again to continue." };
  } else if (first(params.error)) {
    notice = {
      tone: "error",
      text: "Google sign-in didn't work. Try again, or log in with your email and password.",
    };
  }

  return <LoginForm redirectTo={safeRedirectPath(first(params.redirect)) ?? undefined} notice={notice} />;
}

function LoginFormFallback() {
  return (
    <div aria-hidden className="space-y-5">
      <div className="h-[68px] rounded-lg bg-sage/50" />
      <div className="h-[68px] rounded-lg bg-sage/50" />
      <div className="h-12 rounded-lg bg-sage/50" />
    </div>
  );
}
