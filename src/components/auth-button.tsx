"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setCookie } from "cookies-next";
import { useSession } from "@/context/session-context";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface AuthButtonProps {
  className?: string;
  isActive?: boolean; // Optional prop to indicate if the button is active
}

export default function AuthButton({
  className = "",
  isActive = false,
}: AuthButtonProps) {
  const { session, loading, setSession } = useSession();
  const router = useRouter();

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
      className="relative inline-flex"
    >
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.span
            key="loading"
            role="status"
            aria-label="Loading session"
            className={`${className} text-transparent cursor-wait bg-muted animate-pulse`}
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
            className={`${className} w-full`}
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
              <button className={`${className} w-full`}>Log In</button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute left-0 right-0 -bottom-1 h-[2px] bg-primary rounded"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </motion.div>
  );
}
