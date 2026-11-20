"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { buttonStyles } from "@/components/ui/button-styles";

interface SubmitButtonProps {
  children: React.ReactNode;
  pendingText: string;
  variant?: "primary" | "secondary" | "accent" | "ghost";
  size?: "md" | "lg";
  className?: string;
}

/** Submit button that disables itself and shows progress while its parent form action runs. */
export function SubmitButton({
  children,
  pendingText,
  variant = "primary",
  size = "lg",
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={buttonStyles({ variant, size, className })}
    >
      {pending ? (
        <>
          <Loader2 aria-hidden className="size-4 motion-safe:animate-spin" />
          {pendingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
