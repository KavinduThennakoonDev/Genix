import RevealOnScroll from "./RevealOnScroll";

export interface RoadmapStep {
  title: string;
  description: string;
}

/** Visual step-by-step career roadmap (DevOps Career Roadmap / Career Path). */
export default function RoadmapSteps({ steps }: { steps: RoadmapStep[] }) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-2 bottom-2 hidden w-px bg-linear-to-b from-genix-orange via-genix-blue to-transparent sm:block" />
      <ol className="flex flex-col gap-6">
        {steps.map((step, i) => (
          <RevealOnScroll key={step.title} direction="left" delay={i * 0.05}>
            <li className="relative flex gap-5 rounded-2xl border border-genix-line bg-white p-5 shadow-sm sm:pl-6">
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-genix-ink text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="text-base font-bold text-genix-ink sm:text-lg">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-genix-charcoal/80">{step.description}</p>
              </div>
            </li>
          </RevealOnScroll>
        ))}
      </ol>
    </div>
  );
}
