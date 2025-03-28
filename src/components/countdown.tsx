"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("2025-11-01T00:00:00Z").getTime();
  const [daysLeft, setDaysLeft] = useState(calculateInitialDaysLeft());

  function calculateInitialDaysLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    return difference > 0 ? Math.floor(difference / (1000 * 60 * 60 * 24)) : 0; // Total days left
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 86400000); // Update every 24 hours (1 day)

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center space-y-2">
      <h2 className="text-2xl text-foreground font-subheader text-subheader">
        Countdown!
      </h2>
      <p className="text-lg text-primary-foreground font-body text-body">
        {daysLeft} days
      </p>
    </div>
  );
}
