/**
 * Types that mirror the Queueless backend.
 * Every backend response is shaped by `sendResponse` (success) or
 * `globalErrorHandler` (failure).
 */

export type Role = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";
export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

export interface ApiErrorSource {
  path: string;
  message: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** What `apiFetch` returns. It never throws on HTTP errors, so callers branch on `ok`. */
export type ApiResult<T> =
  | { ok: true; status: number; message: string; data: T; meta?: PaginationMeta }
  | {
      ok: false;
      /** 0 means the backend could not be reached at all. */
      status: number;
      message: string;
      errors: ApiErrorSource[];
    };

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: Role;
  status: UserStatus;
  needPasswordChange: boolean;
  isDeleted: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

/** `data` of POST /auth/login */
export interface LoginData {
  token: string;
  accessToken: string;
  refreshToken: string;
  redirect: boolean;
  url?: string;
  user: AuthUser;
}

/** `data` of POST /auth/refresh-token */
export interface RefreshData {
  accessToken: string;
  refreshToken: string;
  sessionToken: string;
}

/** `data` of GET /auth/me: the user plus whichever profile matches their role. */
export interface CurrentUser extends AuthUser {
  patient?: {
    id: string;
    contactNumber: string | null;
    address: string | null;
    appointments: unknown[];
    prescriptions: unknown[];
    medicalReports: unknown[];
    reviews: unknown[];
  } | null;
  doctor?: {
    id: string;
    appointments: unknown[];
    prescriptions: unknown[];
    reviews: unknown[];
    specialties: unknown[];
  } | null;
  admin?: { id: string } | null;
}
