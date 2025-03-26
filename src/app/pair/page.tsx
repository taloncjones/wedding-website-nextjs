"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { setCookie } from "cookies-next";

export default function PairPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [safeCode, setSafeCode] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const codeParam = searchParams?.get("code");
    setSafeCode(codeParam);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/pair", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code: safeCode }),
    });

    const data = await res.json<{ error?: string }>();
    setLoading(false);

    if (res.ok) {
      setCookie("post_toast", "Email activated!", { maxAge: 10, path: "/" });
      setCookie("post_login_refresh", "true", {
        path: "/",
        maxAge: 10,
      });
      router.push("/");
    } else {
      toast.error(data.error || "Something went wrong");
      setError(data.error || "Something went wrong");
    }
  }

  if (!safeCode) {
    return (
      <div className="p-6 text-center text-red-600">
        Missing invite code in URL.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <Card className="w-full max-w-md border-muted bg-muted/40 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-serif text-primary">
            Pair Your Invite
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
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
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
