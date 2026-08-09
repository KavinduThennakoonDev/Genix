// Overlapping initials avatars (no stock photos of real people) + a trailing count label,
// used for "40+ Students Enrolled" style social-proof rows.
const GRADIENTS = [
  "from-genix-orange to-genix-orange-dark",
  "from-genix-blue to-genix-blue-dark",
  "from-genix-charcoal to-genix-ink",
  "from-genix-orange-dark to-genix-blue",
];

export default function AvatarStack({
  initials,
  count,
  label = "Students Enrolled",
  size = "md",
}: {
  initials: string[];
  count: string;
  label?: string;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-8 w-8 text-[11px]" : "h-10 w-10 text-xs";

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {initials.map((label, i) => (
          <span
            key={i}
            className={`flex ${dim} items-center justify-center rounded-full border-2 border-white bg-linear-to-br ${GRADIENTS[i % GRADIENTS.length]} font-bold text-white shadow-sm`}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="leading-tight">
        <p className="text-sm font-bold">{count}</p>
        {label && <p className="text-xs text-current opacity-70">{label}</p>}
      </div>
    </div>
  );
}
