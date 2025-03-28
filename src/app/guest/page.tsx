"use client";

import { useSession } from "@/context/session-context";
import { Skeleton } from "@/components/ui/skeleton";

export default function GuestPage() {
  const { session, loading } = useSession();

  if (loading || !session) {
    return (
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mx-auto rounded-md" />
        <Skeleton className="h-4 w-1/2 mx-auto rounded-md mt-2" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-subheader font-subheader text-primary-foreground">
        Welcome, {session.name || session.email || "Guest"}
      </h1>
      <p className="text-body font-body text-primary-foreground">
        Your RSVP status: {session.rsvp_status ? "Yes" : "No"}
      </p>
    </div>
  );
}
