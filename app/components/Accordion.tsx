"use client";

import { useState, type ReactNode } from "react";
import { ChevronDownIcon } from "./icons";

export interface AccordionItem {
  question: string;
  answer: ReactNode;
}

/** Single-open accordion used for FAQ sections and course/webinar curriculum modules. */
export default function Accordion({
  items,
  defaultOpen = 0,
  tone = "light",
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
  tone?: "light" | "ink";
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const borderClass = tone === "ink" ? "border-white/10" : "border-genix-line";
  const mutedClass = tone === "ink" ? "text-white/70" : "text-genix-charcoal/85";

  return (
    <div className={`divide-y overflow-hidden rounded-2xl border ${borderClass}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={borderClass}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
            >
              <span className="text-base font-semibold sm:text-lg">{item.question}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                  tone === "ink" ? "bg-white/10" : "bg-genix-mist"
                } ${isOpen ? "rotate-180" : ""}`}
              >
                <ChevronDownIcon className="h-4 w-4" />
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className={`px-5 pb-5 text-sm leading-relaxed sm:px-6 sm:text-base ${mutedClass}`}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
