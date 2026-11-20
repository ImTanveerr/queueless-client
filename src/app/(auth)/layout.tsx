import { Logo } from "@/components/layout/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <Logo />
        <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          {children}
        </main>
      </div>

      <aside className="hidden flex-col justify-end bg-ink p-12 text-white lg:flex">
        <h2 className="max-w-sm font-display text-3xl font-semibold leading-tight">
          Your appointments, prescriptions and reports in one place.
        </h2>
        <p className="mt-4 max-w-sm text-white/75">
          Book a time that suits you, pay online, and keep every visit on record.
        </p>
      </aside>
    </div>
  );
}
