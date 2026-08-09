/** Static (non-marquee) grid of wordmark logo chips — used for "Placement Companies" / "Industry Partners". */
export default function LogoGrid({ logos }: { logos: { name: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {logos.map((logo) => (
        <div
          key={logo.name}
          className="flex items-center gap-2 rounded-xl border border-genix-line bg-white px-4 py-4 transition-colors hover:border-genix-orange/40"
        >
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-linear-to-br from-genix-orange to-genix-blue" />
          <span className="truncate text-sm font-bold text-genix-charcoal">{logo.name}</span>
        </div>
      ))}
    </div>
  );
}
