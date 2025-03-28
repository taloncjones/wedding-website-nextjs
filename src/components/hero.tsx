import Countdown from "@/components/countdown";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center text-center py-5 px-6 space-y-6"
    >
      <h1 className="text-5xl text-foreground font-header text-header">
        We're getting married!
      </h1>
      <p className="text-lg text-primary-foreground max-w-md font-body text-body">
        November 1, 2025 – Lima, Peru
      </p>
    </section>
  );
}
