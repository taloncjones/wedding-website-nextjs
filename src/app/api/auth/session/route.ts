// auth/session/route.ts
// This is the route that handles getting the current session.

import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/session";

export async function GET() {
  const session = await getServerSession();
  return NextResponse.json(session);
}
