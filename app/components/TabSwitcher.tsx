"use client";

/** Horizontally-scrollable pill tab list (mirrors the template's "Business Line of Credit / Equipment Financing" switcher). */
export default function TabSwitcher({
  tabs,
  active,
  onChange,
  className = "",
}: {
  tabs: string[];
  active: number;
  onChange: (index: number) => void;
  className?: string;
}) {
  return (
    <div
      className={`no-scrollbar flex w-full items-center gap-2 overflow-x-auto rounded-full border border-genix-line bg-white p-1.5 sm:inline-flex sm:w-auto ${className}`}
    >
      {tabs.map((tab, i) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(i)}
          className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
            active === i ? "bg-genix-ink text-white" : "text-genix-charcoal hover:bg-genix-mist"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
