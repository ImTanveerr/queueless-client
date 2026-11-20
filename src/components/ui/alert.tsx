import { CircleAlert, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertProps {
  tone: "error" | "success" | "info";
  children: React.ReactNode;
  className?: string;
}

export function Alert({ tone, children, className }: AlertProps) {
  const Icon = tone === "error" ? CircleAlert : CircleCheck;

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-sm",
        tone === "error" && "border-danger/30 bg-danger-soft text-danger",
        tone === "success" && "border-sage-deep/30 bg-sage text-ink",
        tone === "info" && "border-ink/15 bg-paper text-ink",
        className,
      )}
    >
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0" />
      <p>{children}</p>
    </div>
  );
}
