import Link from "next/link";
import { Button } from "@/components/ui/button";
import Hero from "@/components/hero";
import Countdown from "@/components/countdown";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full px-4">
      <Card className="w-full max-w-2xl border-muted bg-muted/40 shadow-md">
        <CardContent className="">
          <Hero />
        </CardContent>
        <CardContent className="bg-background/50 text-center p-4 border-t border-muted">
          <Countdown />
        </CardContent>
      </Card>
    </div>
  );
}
