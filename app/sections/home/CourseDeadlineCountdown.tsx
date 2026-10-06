"use client";

import { useSyncExternalStore } from "react";
import Button from "@/app/components/Button";

// One shared clock for every countdown on the page, ticking once a second.
let now = Date.now();
const listeners = new Set<() => void>();
if (typeof window !== "undefined") {
  setInterval(() => {
    now = Date.now();
    listeners.forEach((l) => l());
  }, 1000);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

interface Props {
  title: string;
  slug: string;
  deadline: string | null;
  originalPrice: number;
  discountedPrice: number;
  currency: string;
}

/** Live "enrollment closes in" banner. Shows placeholders until mounted, so server and client markup match. */
export default function CourseDeadlineCountdown({
  title,
  slug,
  deadline,
  originalPrice,
  discountedPrice,
  currency,
}: Props) {
  // null on the server and during hydration; the live time afterwards.
  const liveNow = useSyncExternalStore(subscribe, () => now, () => null);

  const deadlineMs = deadline ? new Date(deadline).getTime() : null;
  const remaining = deadlineMs !== null && liveNow !== null ? deadlineMs - liveNow : null;

  // Deadline passed: hide the banner so only open enrollments are promoted.
  if (remaining !== null && remaining <= 0) return null;

  const totalSeconds = remaining !== null ? Math.floor(remaining / 1000) : 0;
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const units = [
    { label: "Days", value: remaining !== null ? days : null },
    { label: "Hours", value: remaining !== null ? hours : null },
    { label: "Minutes", value: remaining !== null ? minutes : null },
    { label: "Seconds", value: remaining !== null ? seconds : null },
  ];

  const hasPrice = discountedPrice > 0;

  return (
    <section className="relative overflow-hidden bg-genix-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-genix-orange/25 via-transparent to-genix-blue/30" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-7 sm:px-6 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex max-w-xl flex-col gap-4">
          <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">{title}</h2>
          {hasPrice && (
            <p className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-extrabold text-genix-orange">
                {currency} {discountedPrice}
              </span>
              {originalPrice > discountedPrice && (
                <span className="text-lg text-white/50 line-through">
                  {currency} {originalPrice}
                </span>
              )}
            </p>
          )}
          <div>
            <Button href={`/courses/${slug}`} size="lg" variant="primary">
              Enroll Now
            </Button>
          </div>
        </div>

        {deadline ? (
          <div className="w-full lg:w-auto">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/60">Enrollment closes in</p>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {units.map((u) => (
                <div
                  key={u.label}
                  className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/10 px-2 py-3 backdrop-blur sm:min-w-22 sm:px-4 sm:py-4"
                >
                  <span className="text-3xl font-extrabold tabular-nums sm:text-4xl">
                    {u.value === null ? "--" : String(u.value).padStart(2, "0")}
                  </span>
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/60 sm:text-xs">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
