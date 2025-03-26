// auth/pair/route.ts
// This is the route that handles pairing an email with an invite code.
// It takes an email and a code as parameters and returns a session cookie.

import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { SessionData } from "@/lib/session";

export { dynamic } from "@/lib/force-dynamic";

type PairRequest = {
  code: string;
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

  const { code, email }: PairRequest = await req.json();

  if (!code || !email) {
    return NextResponse.json(
      { error: "Code and email required" },
      { status: 400 }
    );
  }

  const res = NextResponse.json({ message: "Paired!" });
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  // Validate and store in your DB
  const invite = await DB.prepare("SELECT * FROM invites WHERE code = ?")
    .bind(code)
    .first<{
      email: string | null;
      name: string;
      rsvp_status: number | null;
      rsvp_rsvp_total: number | null;
      rsvp_additional_guests_allowed: number | null;
    }>();

  if (!invite) {
    return NextResponse.json({ error: "Invalid invite code" }, { status: 404 });
  }

  if (invite.email) {
    return NextResponse.json({ error: "Code already used" }, { status: 400 });
  }

  await DB.prepare("UPDATE invites SET email = ? WHERE code = ?")
    .bind(email, code)
    .run();

  session.email = email;
  session.name = invite.name;
  session.rsvp_status = invite.rsvp_status === 1;
  session.rsvp_rsvp_total = invite.rsvp_rsvp_total ?? 0;
  session.rsvp_additional_guests_allowed =
    invite.rsvp_additional_guests_allowed ?? 0;

  await session.save();

  return res;
}
