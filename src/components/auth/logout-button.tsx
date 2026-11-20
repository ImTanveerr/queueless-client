import { logoutAction } from "@/actions/auth";
import { SubmitButton } from "@/components/ui/submit-button";

/** Works from server and client components: the form posts straight to the server action. */
export function LogoutButton({ variant = "secondary" }: { variant?: "secondary" | "ghost" }) {
  return (
    <form action={logoutAction}>
      <SubmitButton pendingText="Logging out…" variant={variant} size="md">
        Log out
      </SubmitButton>
    </form>
  );
}
