# Queueless frontend

Next.js 16 (App Router, Cache Components, Tailwind CSS 4, TypeScript) frontend for the
Queueless appointment backend. This starter covers the public site and the full
login flow. Everything else plugs in on top of it.

## Run it

```bash
pnpm install
cp .env.example .env        # then edit the URL if your backend isn't on :5000
pnpm dev                    # http://localhost:3000
```

`.env`:

```
base_api_url=http://localhost:5000/api/v1
```

The value is the backend URL **including `/api/v1`**. It is read with
`process.env.base_api_url` on the server only (server actions, server components and
`proxy.ts`), so it never reaches the browser and the backend's CORS settings don't
matter for this app.

Backend side, make sure `FRONTEND_URL` is set (it is a required variable) and that the
Super Admin seed has run, so you have an account that can log in without email
verification.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero, how booking works, features |
| `/login` | Log in (supports `?redirect=/some/page`) |
| `/register` | Create a patient account |
| `/verify-email` | Enter the emailed code to activate the account |
| `/dashboard` | Signed-in overview, role-aware (patient, doctor, admin) |
| `/session/clear` | Clears stale cookies, then goes to `/login` |

## Structure

```
src/
  proxy.ts                 Route gate + silent token refresh (Next 16's middleware)
  actions/auth.ts          Server actions: login, register, verifyEmail, logout
  app/
    (site)/                Public pages with navbar + footer
    (auth)/                Login, register, verify-email (split layout)
    (dashboard)/           Protected pages (header + session check)
    session/clear/         Route handler that clears stale cookies
  components/
    ui/                    Button styles, fields, alert, submit button
    auth/ layout/ home/ dashboard/
  lib/
    api.ts                 apiFetch(): server-side client for the backend
    session.ts             getCurrentUser(), requireUser(), cookie helpers
    routes.ts              Protected / guest-only routes, safe redirect check
    auth/                  Cookie names and token helpers
    validations/auth.ts    Zod schemas
  types/                   Backend response types
```

## How login works

1. The form posts to the `loginAction` server action, which validates with Zod and
   calls `POST {base_api_url}/auth/login`.
2. The backend returns `accessToken`, `refreshToken` and the session `token` in the
   response body. The action stores them as **httpOnly cookies on this site**, using the
   same names the backend uses (`accessToken`, `refreshToken`, `better-auth.session_token`).
   The backend's own `Set-Cookie` headers belong to *its* domain, so the browser would
   never send them to Next.js.
3. `apiFetch()` forwards those cookies on every backend call, so the backend's
   `checkAuth` middleware works unchanged.
4. `proxy.ts` runs before each page: it redirects signed-out visitors away from
   `/dashboard`, bounces signed-in users away from `/login`, and renews an expired
   access token through `POST /auth/refresh-token`.
5. `requireUser()` (inside the dashboard) asks the backend `GET /auth/me`, which is the
   authoritative check (blocked users, revoked sessions).

`proxy.ts` only *decodes* the JWT to decide where to send people. The signing secrets
stay on the backend, and no real data is served without the backend verifying the token.

## Calling the backend from a new page

```tsx
import { apiFetch } from "@/lib/api";

const result = await apiFetch<Doctor[]>("/doctors");
if (result.ok) {
  result.data; // typed
} else {
  result.message; // backend message, or a network error with status 0
}
```

Use it from server components and server actions. Reading it per request means the
page needs a `<Suspense>` boundary (Cache Components), as the dashboard layout does.

## Things to know about the backend

- **Wrong password and other auth errors come back as HTTP 500.** The backend's error
  handler treats better-auth errors as generic errors. The app therefore shows the
  backend's `message` and never branches on status codes. Returning 401/403 there would be
  a worthwhile backend fix.
- **Email verification is required.** A new account can't log in until it enters the
  code. Logging in with an unverified email makes the backend send a fresh code, which
  is how the verify page's "No code yet?" hint works.
- **Google login is not wired up.** The backend completes Google sign-in by setting
  cookies on its own domain, which this frontend can't read. It needs either a shared
  parent domain for both apps or a backend change that hands the tokens to the frontend.

## Next steps

Doctors list and specialties (`/doctors`, `/specialties`), booking
(`/appointments`), payments, and role-specific dashboards under `/dashboard`.
`isProtectedPath` in `lib/routes.ts` is where new protected prefixes go.
