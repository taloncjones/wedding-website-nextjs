// auth/login/route.ts
// This is the route that handles logging in a user.
// It takes an email as a parameter and returns a session cookie.

import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { SessionData } from "@/lib/session";

export { dynamic } from "@/lib/force-dynamic";

type LoginRequest = {
  email: string;
};

export async function POST(req: NextRequest) {
  const DB = getCloudflareContext().env.DB;

  if (!DB) {
    return new Response(
      JSON.stringify({ error: "D1 Database not available" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { email }: LoginRequest = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const res = NextResponse.json({ message: "Logged in!" });

  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  const invite = await DB.prepare(`SELECT * FROM invites WHERE email = ?`)
    .bind(email)
    .first<{
      email: string;
      name: string;
      rsvp_status: number | null;
      rsvp_rsvp_total: number | null;
      rsvp_additional_guests_allowed: number | null;
    }>();

  if (!invite) {
    return NextResponse.json({ error: "Email not found" }, { status: 404 });
  }

  session.email = invite.email;
  session.name = invite.name;
  session.rsvp_status = invite.rsvp_status === 1;
  session.rsvp_rsvp_total = invite.rsvp_rsvp_total ?? 0;
  session.rsvp_additional_guests_allowed =
    invite.rsvp_additional_guests_allowed ?? 0;

  await session.save();

  return res;
}
