import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import Button from "@/app/components/Button";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { DownloadIcon } from "@/app/components/icons";
import type { Course } from "@/app/data/courses";

/** Detailed Course Curriculum (modules → topics → subtopics) + Download Curriculum CTA. */
export default function CurriculumSection({ course }: { course: Course }) {
  return (
    <Section tone="light" id="curriculum">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            align="center"
            eyebrow="Curriculum"
            title="Module-by-Module"
            highlight="Breakdown"
            description="Six modules, each ending in a hands-on deliverable — so you always know exactly what you've mastered and can prove it."
          />
        </RevealOnScroll>

        <div className="mt-10 flex flex-col gap-5">
          {course.curriculum.map((mod, i) => (
            <RevealOnScroll key={mod.title} delay={i * 0.04}>
              <details className="group rounded-2xl border border-genix-line bg-white p-5 open:shadow-card sm:p-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-genix-orange">
                      Module {i + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-genix-ink">{mod.title.replace(/^Module \d+ — /, "")}</h3>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-genix-mist text-genix-ink transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm font-semibold text-genix-charcoal/70">Outcome: {mod.outcome}</p>
                <div className="mt-4 grid gap-4 border-t border-genix-line pt-4 sm:grid-cols-2">
                  {mod.topics.map((topic) => (
                    <div key={topic.title}>
                      <p className="text-sm font-bold text-genix-ink">{topic.title}</p>
                      <ul className="mt-2 flex flex-col gap-1 text-sm text-genix-charcoal/80">
                        {topic.subtopics.map((sub) => (
                          <li key={sub} className="flex gap-2">
                            <span className="text-genix-orange">–</span> {sub}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.1}>
          <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-genix-orange/40 bg-genix-mist p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="text-lg font-bold text-genix-ink">Want the Full Curriculum as a PDF?</h3>
              <p className="mt-1 text-sm text-genix-charcoal/75">
                Download the complete module-by-module breakdown to review offline or share with a mentor.
              </p>
            </div>
            <Button href="#" variant="dark" withArrow={false} className="shrink-0 gap-2">
              <DownloadIcon className="h-4 w-4" /> Download Curriculum
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
