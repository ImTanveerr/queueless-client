import { Logo } from "@/components/layout/logo";
import { SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <p className="text-sm text-ink-soft">
          {SITE_NAME} is not for medical emergencies. If it&apos;s urgent, call your local emergency number.
        </p>
      </div>
    </footer>
  );
}
