import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-6 space-y-6">
      <h1 className="text-4xl font-serif font-bold text-primary">
        Welcome to Our Wedding Website
      </h1>
      <p className="text-muted-foreground max-w-md">
        We can&apos;t wait to celebrate with you. Use this site to RSVP, view
        details, and more.
      </p>
    </section>
  );
}
