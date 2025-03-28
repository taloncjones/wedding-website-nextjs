"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import AuthButton from "./auth-button";
import { useSession } from "@/context/session-context";

export default function Navbar() {
  const pathname = usePathname();
  const { session, loading } = useSession();

  const navItems = [
    { href: "/", label: "Home", requiresLogin: false },
    { href: "/guest", label: "Guest Area", requiresLogin: true },
    { href: "/guest/rsvp", label: "RSVP", requiresLogin: true },
  ];

  return (
    <motion.nav
      className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md px-6 py-4 shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: loading ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link
          href="/"
          className="tracking-wide hover:opacity-90 transition-opacity"
        >
          <span
            role="heading"
            aria-level={1}
            className="text-4xl font-header text-header tracking-wide"
          >
            Talon & Franchesca
          </span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-6 font-light text-xl relative">
            {navItems
              .filter((item) => !item.requiresLogin || session?.email)
              .map(({ href, label }) => {
                const isActive = pathname === href;

                return (
                  <NavigationMenuItem key={href} className="relative">
                    <Link href={href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} ${
                          isActive
                            ? "text-secondary-foreground"
                            : "text-primary-foreground"
                        } text-body font-body hover:bg-secondary/30 focus:bg-secondary/0 transition-colors duration-200 rounded-md relative`}
                      >
                        {label}
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
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}

            <NavigationMenuItem className="w-[55px] justify-center">
              <AuthButton
                className={`${navigationMenuTriggerStyle()} ${
                  pathname === "/logout" || pathname === "/login"
                    ? "text-secondary-foreground"
                    : "text-primary-foreground"
                } text-body font-body hover:bg-secondary/30 focus:bg-secondary/0 transition-colors duration-200 rounded-md relative`}
                isActive={pathname === "/logout" || pathname === "/login"}
              />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </motion.nav>
  );
}
