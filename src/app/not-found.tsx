import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl font-serif font-bold text-primary mb-3">
        Page Not Found
      </h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Sorry, we couldn&apos;t find the page you were looking for. It might
        have been moved or no longer exists.
      </p>
      <Link href="/" passHref>
        <Button variant="outline">Back to Home</Button>
      </Link>
    </div>
  );
}
