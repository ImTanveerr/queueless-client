import Link from "next/link";
import { Suspense } from "react";
import { AuthNav, GuestNav } from "@/components/layout/auth-nav";
import { Logo } from "@/components/layout/logo";

const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "What you get" },
];

export function Navbar() {
  return (
    <header className="border-b border-line bg-mist">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <div className="flex items-center gap-10">
          <Logo collapseOnMobile />
          <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* The session is read per request, so the rest of the page can load without waiting for it. */}
        <Suspense fallback={<GuestNav />}>
          <AuthNav />
        </Suspense>
      </div>
    </header>
  );
}
