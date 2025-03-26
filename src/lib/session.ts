import { cookies } from "next/headers";
import { getIronSession, SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "Talon_and_Franchesca_wedding",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export type SessionData = {
  email?: string;
  name?: string;
  rsvp_status?: boolean;
  rsvp_rsvp_total?: number;
  rsvp_additional_guests_allowed?: number;
};

declare module "iron-session" {
  interface IronSessionData extends SessionData {}
}

export async function getServerSession(): Promise<SessionData> {
  if (
    process.env.NODE_ENV === "development" &&
    process.env.INJECT_FAKE_SESSION === "true"
  ) {
    return {
      email: "test@example.com",
      name: "Talon (Dev)",
      rsvp_status: false,
    };
  }

  return getIronSession<SessionData>(cookies(), sessionOptions);
}
