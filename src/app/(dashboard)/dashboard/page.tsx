import type { Metadata } from "next";
import { ROLE_LABELS } from "@/components/dashboard/role-labels";
import { requireUser } from "@/lib/session";
import type { CurrentUser } from "@/types/api";

export const metadata: Metadata = { title: "Dashboard" };

/** Record counts for the signed-in user's role. */
function getCounts(user: CurrentUser): { label: string; value: number }[] {
  if (user.role === "PATIENT" && user.patient) {
    return [
      { label: "Appointments", value: user.patient.appointments.length },
      { label: "Prescriptions", value: user.patient.prescriptions.length },
      { label: "Medical reports", value: user.patient.medicalReports.length },
      { label: "Reviews written", value: user.patient.reviews.length },
    ];
  }
  if (user.role === "DOCTOR" && user.doctor) {
    return [
      { label: "Appointments", value: user.doctor.appointments.length },
      { label: "Prescriptions written", value: user.doctor.prescriptions.length },
      { label: "Reviews received", value: user.doctor.reviews.length },
      { label: "Specialties", value: user.doctor.specialties.length },
    ];
  }
  return [];
}

export default async function DashboardPage() {
  const user = await requireUser();
  const firstName = user.name.trim().split(/\s+/)[0];
  const counts = getCounts(user);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold sm:text-4xl">Welcome, {firstName}</h1>
        <p className="mt-2 text-ink-soft">Here is where your account stands.</p>
      </div>

      <section aria-labelledby="account-heading" className="rounded-xl border border-line bg-paper">
        <h2 id="account-heading" className="border-b border-line px-6 py-4 text-lg font-semibold">
          Account
        </h2>
        <dl className="divide-y divide-line">
          <Row label="Name" value={user.name} />
          <Row label="Email" value={user.email} />
          <Row label="Role" value={ROLE_LABELS[user.role]} />
          <Row label="Email verified" value={user.emailVerified ? "Yes" : "Not yet"} />
        </dl>
      </section>

      {counts.length > 0 ? (
        <section aria-labelledby="records-heading" className="rounded-xl border border-line bg-paper">
          <h2 id="records-heading" className="border-b border-line px-6 py-4 text-lg font-semibold">
            Your records
          </h2>
          <dl className="divide-y divide-line">
            {counts.map((item) => (
              <Row key={item.label} label={item.label} value={String(item.value)} />
            ))}
          </dl>
        </section>
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-6 px-6 py-3.5">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
