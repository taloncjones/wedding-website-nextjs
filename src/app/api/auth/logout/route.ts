// auth/logout/route.ts
// This is the route that handles logging out a user.

import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import type { SessionData } from "@/lib/session";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ message: "Logged out" });

  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  session.destroy();
  return res;
}
