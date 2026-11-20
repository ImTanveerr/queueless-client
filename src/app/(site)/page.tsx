import { FileText, Receipt, Star, Stethoscope } from "lucide-react";
import Link from "next/link";
import { AppointmentTicket } from "@/components/home/appointment-ticket";
import { buttonStyles } from "@/components/ui/button-styles";

const steps = [
  {
    title: "Choose a specialty",
    body: "Browse doctors by specialty and read what other patients said about them.",
  },
  {
    title: "Pick an open time",
    body: "You only see times the doctor has opened, so you never book a slot that's taken.",
  },
  {
    title: "Pay to confirm",
    body: "Pay online to hold your time. Unpaid bookings are released automatically so others can take the slot.",
  },
];

const features = [
  {
    icon: Stethoscope,
    title: "Video visits",
    body: "Meet your doctor from home. Your visit is listed on your dashboard.",
  },
  {
    icon: FileText,
    title: "Prescriptions on record",
    body: "After a visit, your prescription is saved with your appointment, ready to download.",
  },
  {
    icon: Receipt,
    title: "Invoices for every payment",
    body: "Each payment gets an invoice, so you always know what you paid and when.",
  },
  {
    icon: Star,
    title: "Reviews from patients",
    body: "Rate your doctor after a visit and help the next patient choose.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="max-w-xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Book a doctor and skip the waiting room.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Choose a specialty, pick an open time, pay online and meet your doctor over video.
            Your appointments, prescriptions and reports stay in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className={buttonStyles({ size: "lg" })}>
              Create an account
            </Link>
            <Link href="/login" className={buttonStyles({ variant: "secondary", size: "lg" })}>
              Log in
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <AppointmentTicket className="-rotate-1" />
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-4 border-y border-line bg-paper">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <h2 className="max-w-md text-3xl font-semibold sm:text-4xl">
            Three steps from symptoms to seen.
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-ink pt-5">
                <span className="font-display text-sm font-semibold text-sage-deep">
                  Step {index + 1}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="features" className="scroll-mt-4">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="max-w-sm text-3xl font-semibold sm:text-4xl">
            Everything after the visit is kept for you.
          </h2>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <Icon aria-hidden className="size-6 text-sage-deep" />
                <dt className="mt-3 text-lg font-semibold">{title}</dt>
                <dd className="mt-1 leading-relaxed text-ink-soft">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-md text-3xl font-semibold">Ready to book your first visit?</h2>
          <Link href="/register" className={buttonStyles({ variant: "accent", size: "lg" })}>
            Create an account
          </Link>
        </div>
      </section>
    </>
  );
}
