import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import SkillBadge from "@/app/components/SkillBadge";
import Button from "@/app/components/Button";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { DownloadIcon } from "@/app/components/icons";
import type { Webinar } from "@/app/data/webinars";

/** Skills Covered grid + detailed Webinar Topics agenda + Download Curriculum CTA. */
export default function SkillsAndTopics({ webinar }: { webinar: Webinar }) {
  return (
    <Section tone="light">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <RevealOnScroll direction="left">
              <SectionHeading eyebrow="Skills Covered" title="What We'll Touch On" highlight="Live" />
            </RevealOnScroll>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {webinar.skills.map((skill, i) => (
                <RevealOnScroll key={skill.label} delay={i * 0.03}>
                  <SkillBadge label={skill.label} mark={skill.mark} index={i} />
                </RevealOnScroll>
              ))}
            </div>
          </div>

          <div>
            <RevealOnScroll direction="right">
              <SectionHeading eyebrow="Webinar Topics" title="Full Session" highlight="Agenda" />
            </RevealOnScroll>
            <div className="mt-8 flex flex-col gap-4">
              {webinar.topics.map((topic, i) => (
                <RevealOnScroll key={topic.title} delay={i * 0.05}>
                  <div className="rounded-2xl border border-genix-line bg-genix-mist p-5">
                    <h3 className="text-sm font-bold text-genix-ink">{topic.title}</h3>
                    <ul className="mt-2 flex flex-col gap-1 text-sm text-genix-charcoal/80">
                      {topic.subtopics.map((sub) => (
                        <li key={sub} className="flex gap-2">
                          <span className="text-genix-orange">–</span> {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>

        <RevealOnScroll delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-genix-orange/40 bg-genix-mist p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="text-lg font-bold text-genix-ink">Want the AWS DevOps Course Curriculum?</h3>
              <p className="mt-1 text-sm text-genix-charcoal/75">
                Get the full module-by-module breakdown of the course this webinar leads into.
              </p>
            </div>
            <Button href="/courses/aws-devops#curriculum" variant="dark" withArrow={false} className="shrink-0 gap-2">
              <DownloadIcon className="h-4 w-4" /> Download Curriculum
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
