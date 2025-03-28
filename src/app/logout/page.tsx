"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { useSession } from "@/context/session-context";

export default function SignedOutPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const { setSession } = useSession();

  useEffect(() => {
    setSession(null);

    const duration = 3000;
    const step = 25;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 * step) / duration;
        return next >= 100 ? 100 : next;
      });
    }, step);

    const timeout = setTimeout(() => {
      router.replace("/");
    }, duration);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [router, setSession]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-2xl font-serif text-primary mb-2">
        You have been logged out
      </h1>
      <p className="text-muted-foreground mb-4">Redirecting to home page...</p>
      <Progress value={progress} className="w-full max-w-sm" />
    </div>
  );
}
