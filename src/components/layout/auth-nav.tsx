import Link from "next/link";
import { buttonStyles } from "@/components/ui/button-styles";
import { LogoutButton } from "@/components/auth/logout-button";
import { getCurrentUser } from "@/lib/session";

/** Right-hand side of the public navbar. Reads the session, so render it inside <Suspense>. */
export async function AuthNav() {
  const user = await getCurrentUser();

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className={buttonStyles({ variant: "secondary" })}>
          Dashboard
        </Link>
        <LogoutButton variant="ghost" />
      </div>
    );
  }

  return <GuestNav />;
}

export function GuestNav() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/login" className={buttonStyles({ variant: "ghost" })}>
        Log in
      </Link>
      <Link href="/register" className={buttonStyles({ variant: "primary" })}>
        Create account
      </Link>
    </div>
  );
}
