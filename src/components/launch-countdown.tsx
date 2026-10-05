"use client";

import { useEffect, useState } from "react";

type Left = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function timeLeft(target: number): Left {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
    done: ms === 0,
  };
}

/** Live countdown to `startsAt`. Renders placeholders on the server to avoid a hydration mismatch. */
export function LaunchCountdown({ startsAt }: { startsAt: string }) {
  const [left, setLeft] = useState<Left | null>(null);

  useEffect(() => {
    const target = new Date(startsAt).getTime();
    const tick = () => setLeft(timeLeft(target));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [startsAt]);

  if (left?.done) {
    return <p className="font-display text-2xl text-mango-300">The gates are open — see you inside!</p>;
  }

  const units: [string, number | undefined][] = [
    ["Days", left?.days],
    ["Hours", left?.hours],
    ["Mins", left?.minutes],
    ["Secs", left?.seconds],
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="Countdown to the launch">
      {units.map(([label, value]) => (
        <div
          key={label}
          className="flex min-w-0 flex-col items-center rounded-2xl border border-bone-50/15 bg-bone-50/10 px-2 py-3 sm:px-4"
        >
          <span className="font-display text-3xl font-semibold tabular-nums sm:text-4xl">
            {value === undefined ? "--" : String(value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] tracking-widest uppercase opacity-70 sm:text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
