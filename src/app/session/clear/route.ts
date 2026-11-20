import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth/constants";

/**
 * Landing spot when the cookies look fine but the backend rejects them (session
 * expired on the server, account blocked). Server components can't delete cookies
 * while rendering, so they redirect here, and this handler can.
 */
export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login?session=expired", request.url));
  for (const name of AUTH_COOKIES) response.cookies.delete(name);
  return response;
}
