"use client";

import Link from "next/link";
import { buttonStyles } from "@/components/ui/button-styles";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-start justify-center px-6">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-4xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-ink-soft">
          We couldn&apos;t load this page. Try again, and if it keeps happening, check that the
          backend is running and <code className="font-mono text-sm">base_api_url</code> in your
          .env points to it.
        </p>
        <div className="mt-8 flex gap-3">
          <button type="button" onClick={reset} className={buttonStyles({ size: "lg" })}>
            Try again
          </button>
          <Link href="/" className={buttonStyles({ variant: "secondary", size: "lg" })}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
