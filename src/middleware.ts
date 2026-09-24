import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match routes that need auth handling:
     * - /team/waitlist (protected)
     * - /login (redirect if already authenticated)
     * Skip static files, images, and favicon.
     */
    "/team/waitlist/:path*",
    "/login",
    "/change-password",
  ],
};
