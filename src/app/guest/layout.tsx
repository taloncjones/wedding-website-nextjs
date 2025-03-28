"use client";

import { useSession } from "@/context/session-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { SessionData } from "@/lib/session";

function SessionGuard({ children }: { children: React.ReactNode }) {
  const { session, loading, setSession } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [refreshing, setRefreshing] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !session?.email) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, session, pathname, router]);

  // Patch: Fetch updated session if name is missing
  useEffect(() => {
    if (session?.email && !session.name && !refreshing) {
      setRefreshing(true);
      fetch("/api/auth/session")
        .then((res) => res.json() as Promise<SessionData>)
        .then((data) => {
          if (data?.email) {
            setSession(data); // Only update session if valid data is returned
          }
        })
        .finally(() => setRefreshing(false));
    }
  }, [session, refreshing, setSession]);

  const stillWaiting = loading || refreshing;

  if (!session || stillWaiting) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-6 w-3/4 mx-auto rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function GuestAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useSession();

  return (
    <div key={session?.name || "guest"}>
      <SessionGuard>{children}</SessionGuard>
    </div>
  );
}
