import { AuthShowcase } from "@/components/auth/auth-showcase";
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

      <AuthShowcase />
    </div>
  );
}
