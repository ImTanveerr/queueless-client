import { Video } from "lucide-react";
import { cn } from "@/lib/utils";

const slots = [
  { time: "9:00", taken: true },
  { time: "9:30", taken: false },
  { time: "10:00", taken: false, selected: true },
  { time: "10:30", taken: false },
  { time: "11:00", taken: true },
  { time: "11:30", taken: false },
];

/**
 * A made-up booking, drawn like the paper appointment slip it replaces.
 * Decorative: the real flow lives behind login, so it is hidden from screen readers.
 */
export function AppointmentTicket({ className }: { className?: string }) {
  return (
    <figure
      aria-hidden
      className={cn(
        "relative w-full max-w-md rounded-2xl border border-ink bg-paper shadow-[8px_8px_0_0_var(--color-sage)]",
        className,
      )}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-xl font-semibold">Cardiology</p>
            <p className="text-sm text-ink-soft">Sample doctor · Tuesday</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage px-3 py-1 text-xs font-semibold">
            <Video className="size-3.5" />
            Video visit
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {slots.map((slot) => (
            <span
              key={slot.time}
              className={cn(
                "flex h-10 items-center justify-center rounded-lg border text-sm font-semibold",
                slot.selected && "border-ink bg-marigold",
                slot.taken && "border-line text-ink-soft/60 line-through",
                !slot.selected && !slot.taken && "border-ink/25",
              )}
            >
              {slot.time}
            </span>
          ))}
        </div>
      </div>

      {/* Perforation between the slip and its stub */}
      <div className="relative">
        <div className="mx-6 border-t-2 border-dashed border-ink/30" />
        <span className="absolute -left-3 -top-3 size-6 rounded-full border border-ink bg-mist [clip-path:inset(0_0_0_50%)]" />
        <span className="absolute -right-3 -top-3 size-6 rounded-full border border-ink bg-mist [clip-path:inset(0_50%_0_0)]" />
      </div>

      <div className="flex items-center justify-between px-6 py-4 text-sm">
        <span className="text-ink-soft">Booking confirmed once paid</span>
        <span className="font-semibold text-sage-deep">10:00 selected</span>
      </div>
    </figure>
  );
}
