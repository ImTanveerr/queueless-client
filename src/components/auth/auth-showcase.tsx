import { CircleCheck, FileText, ShieldCheck } from "lucide-react";
import { AppointmentTicket } from "@/components/home/appointment-ticket";

const points = [
  "Only open times are shown, so you never double-book",
  "Pay online to hold your slot",
  "Prescriptions and invoices saved to every visit",
];

/**
 * Right-hand panel of the login / register / verify pages (large screens only).
 * Purely decorative product preview, so the illustration is hidden from screen readers.
 */
export function AuthShowcase() {
  return (
    <aside className="relative hidden flex-col overflow-hidden bg-ink p-12 text-white lg:flex xl:p-16">
      {/* Dot texture + soft glow so the panel isn't a flat block */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgb(255 255 255 / 0.09) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 size-[28rem] rounded-full bg-sage-deep/40 blur-3xl"
      />

      <p className="relative inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/85">
        <ShieldCheck aria-hidden className="size-4 text-marigold" />
        Your records stay private to you and your doctor
      </p>

      {/* Product preview */}
      <div aria-hidden className="relative flex flex-1 items-center justify-center pt-12 pb-24">
        <div className="relative w-full max-w-md text-ink">
          <AppointmentTicket className="rotate-[-2deg]" cutoutClassName="bg-ink" />

          <div className="absolute -bottom-20 -left-6 flex rotate-[2deg] items-center gap-3 rounded-xl border border-ink bg-paper px-4 py-3 text-ink shadow-[6px_6px_0_0_var(--color-marigold)] xl:-left-10">
            <span className="flex size-9 items-center justify-center rounded-lg bg-sage">
              <FileText className="size-[18px] text-sage-deep" />
            </span>
            <span>
              <span className="block text-sm font-semibold">Prescription ready</span>
              <span className="block text-xs text-ink-soft">Saved to your visit · PDF</span>
            </span>
          </div>

          <span className="absolute -top-4 -right-3 rotate-[4deg] rounded-full border border-ink bg-marigold px-3 py-1 text-xs font-bold text-ink">
            No waiting room
          </span>
        </div>
      </div>

      <div className="relative">
        <h2 className="max-w-sm font-display text-3xl font-semibold leading-tight">
          Your appointments, prescriptions and reports in one place.
        </h2>
        <ul className="mt-6 space-y-2.5">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-white/80">
              <CircleCheck aria-hidden className="mt-0.5 size-[18px] shrink-0 text-marigold" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
