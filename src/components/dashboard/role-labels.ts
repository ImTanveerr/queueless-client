import type { Role } from "@/types/api";

export const ROLE_LABELS: Record<Role, string> = {
  SUPER_ADMIN: "Super admin",
  ADMIN: "Admin",
  DOCTOR: "Doctor",
  PATIENT: "Patient",
};
