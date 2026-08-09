// Monogram skill tile used in "Skills You'll Learn" / "Skills Covered" grids.
// Uses short text monograms rather than trademarked brand marks (no external logo assets).
const PALETTE = [
  "bg-genix-orange/10 text-genix-orange-dark",
  "bg-genix-blue/10 text-genix-blue",
  "bg-genix-ink/5 text-genix-ink",
];

export default function SkillBadge({ label, mark, index = 0 }: { label: string; mark: string; index?: number }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-genix-line bg-white px-4 py-3.5 shadow-sm transition-transform hover:-translate-y-0.5">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[11px] font-extrabold tracking-tight ${PALETTE[index % PALETTE.length]}`}
      >
        {mark}
      </span>
      <span className="text-sm font-semibold text-genix-ink">{label}</span>
    </div>
  );
}
