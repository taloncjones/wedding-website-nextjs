"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { toast } from "sonner";
import type { SessionData } from "@/lib/session";

type SessionContextType = {
  session: SessionData | null;
  loading: boolean;
  setSession: (data: SessionData | null) => void;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: true,
  setSession: () => {},
});

export function ClientSessionProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: SessionData | null;
}) {
  const [session, setSession] = useState<SessionData | null>(initialSession);
  const [loading, setLoading] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isLoggedOut || (session && session.name)) return; // Skip fetching if session is valid

    setLoading(true);
    fetch("/api/auth/session")
      .then((res) => res.json() as Promise<SessionData>)
      .then((data) => {
        if (data?.email) {
          setSession(data); // Only update session if valid data is returned
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch session:", error);
        setSession(null);
        setLoading(false);
      });
  }, [pathname, isLoggedOut, session]);

  useEffect(() => {
    const toastMessage = getCookie("post_toast");
    if (toastMessage) {
      toast.success(toastMessage.toString());
      deleteCookie("post_toast");
    }
  }, [pathname]);

  function handleSetSession(data: SessionData | null) {
    if (data === null) {
      setIsLoggedOut(true);
    }
    setSession(data);
  }

  return (
    <SessionContext.Provider
      value={{ session, loading, setSession: handleSetSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
