"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setCookie } from "cookies-next";
import { useSession } from "@/context/SessionContext";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function AuthButton() {
  const { session, loading, setSession } = useSession();
  const router = useRouter();

  const commonButtonClasses = `${navigationMenuTriggerStyle()} min-w-[55px] h-9 px-4 py-2 text-sm text-center inline-flex items-center justify-center`;

  async function handleLogout(e: React.MouseEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/logout", { method: "POST" });

    if (res.ok) {
      setCookie("post_toast", "Logged out successfully", {
        maxAge: 10,
        path: "/",
      });
      router.push("/logout");
    } else {
      toast.error("Logout failed");
    }
  }

  if (typeof window === "undefined") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: loading ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.span
            key="loading"
            role="status"
            aria-label="Loading session"
            className={`${commonButtonClasses} text-transparent cursor-wait bg-muted animate-pulse`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Log In
          </motion.span>
        ) : session?.email ? (
          <motion.button
            key="logout"
            onClick={handleLogout}
            className={commonButtonClasses}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Log Out
          </motion.button>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Link href="/login">
              <button className={commonButtonClasses}>Log In</button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
