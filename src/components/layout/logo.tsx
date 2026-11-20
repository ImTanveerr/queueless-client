import { CalendarCheck } from "lucide-react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  inverted?: boolean;
  /** Show only the icon on very narrow screens (the name stays available to screen readers). */
  collapseOnMobile?: boolean;
}

export function Logo({ className, inverted = false, collapseOnMobile = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight",
        inverted ? "text-white" : "text-ink",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "flex size-8 items-center justify-center rounded-lg",
          inverted ? "bg-marigold text-ink" : "bg-ink text-white",
        )}
      >
        <CalendarCheck className="size-[18px]" />
      </span>
      <span className={cn("whitespace-nowrap", collapseOnMobile && "max-[420px]:sr-only")}>
        {SITE_NAME}
      </span>
    </Link>
  );
}
