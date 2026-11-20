import { LogoutButton } from "@/components/auth/logout-button";
import { Logo } from "@/components/layout/logo";
import { requireUser } from "@/lib/session";
import { ROLE_LABELS } from "@/components/dashboard/role-labels";

/** Dashboard chrome. Reads the session, so the layout renders it inside <Suspense>. */
export async function DashboardShell({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const initial = user.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
          <Logo />
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 sm:flex">
              <span
                aria-hidden
                className="flex size-9 items-center justify-center rounded-full bg-sage font-display text-sm font-bold"
              >
                {initial}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-ink-soft">{ROLE_LABELS[user.role]}</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex min-h-dvh flex-col" aria-busy="true">
      <div className="h-16 border-b border-line bg-paper" />
      <div className="mx-auto w-full max-w-6xl flex-1 space-y-4 px-6 py-10">
        <div className="h-9 w-64 rounded-lg bg-sage/60" />
        <div className="h-40 rounded-xl bg-sage/40" />
      </div>
    </div>
  );
}
