import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { buttonStyles } from "@/components/ui/button-styles";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col px-6 py-8">
      <Logo />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-start justify-center">
        <h1 className="text-4xl font-semibold">This page doesn&apos;t exist</h1>
        <p className="mt-3 text-ink-soft">
          The link may be old or mistyped. Go back to the home page and start again.
        </p>
        <Link href="/" className={buttonStyles({ size: "lg", className: "mt-8" })}>
          Back to home
        </Link>
      </main>
    </div>
  );
}
