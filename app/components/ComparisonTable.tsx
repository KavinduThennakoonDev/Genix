import { CheckIcon, XIcon } from "./icons";

export interface ComparisonRow {
  feature: string;
  generic: boolean | string;
  genix: boolean | string;
}

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm font-medium">{value}</span>;
  }
  return value ? (
    <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-genix-success/15 text-genix-success">
      <CheckIcon className="h-3.5 w-3.5" />
    </span>
  ) : (
    <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-500">
      <XIcon className="h-3.5 w-3.5" />
    </span>
  );
}

/** "Why Genix Academy?" comparison table: Generic Training Institutes vs Genix Academy. */
export default function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-genix-line bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="bg-genix-mist">
              <th className="px-5 py-4 text-sm font-bold text-genix-ink sm:px-6">What You Get</th>
              <th className="px-5 py-4 text-center text-sm font-bold text-genix-charcoal/70 sm:px-6">
                Generic Institutes
              </th>
              <th className="px-5 py-4 text-center text-sm font-bold text-genix-orange-dark sm:px-6">
                Genix Academy
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-genix-mist/40"}>
                <td className="px-5 py-4 text-sm font-semibold text-genix-ink sm:px-6">{row.feature}</td>
                <td className="px-5 py-4 text-center text-genix-charcoal/60 sm:px-6">
                  <Cell value={row.generic} />
                </td>
                <td className="px-5 py-4 text-center text-genix-ink sm:px-6">
                  <Cell value={row.genix} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
