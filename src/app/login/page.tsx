"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/context/SessionContext";
import { SessionData } from "@/lib/session";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, loading, setSession } = useSession();

  const [safeNext, setSafeNext] = useState("/guest");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Safely parse the "next" query param
  useEffect(() => {
    const nextParam = searchParams.get("next");
    if (nextParam && nextParam !== "/login") {
      setSafeNext(nextParam);
    }
  }, [searchParams]);

  // If already logged in, redirect
  useEffect(() => {
    if (!loading && session?.email) {
      router.replace(safeNext);
    }
  }, [loading, session, safeNext, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setSubmitting(false);

    if (res.ok) {
      setCookie("post_toast", "Logged in!", { maxAge: 10, path: "/" });

      const sessionRes = await fetch("/api/auth/session");
      const sessionData = (await sessionRes.json()) as SessionData;
      setSession(sessionData);

      router.replace(safeNext);
    } else {
      const data = (await res.json()) as { error?: string };
      setError(data.error || "Login failed");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full px-4">
      <Card className="w-full max-w-md border-muted bg-muted/40 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-serif text-primary">
            Log In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="bg-white"
            />
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                <div className="flex justify-center items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </Button>
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
