import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import BentoCell from "@/app/components/BentoCell";
import RoadmapSteps from "@/app/components/RoadmapSteps";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import {
  BadgeCheckIcon,
  BriefcaseIcon,
  ClockIcon,
  TargetIcon,
  TrendingUpIcon,
} from "@/app/components/icons";
import type { Webinar } from "@/app/data/webinars";

/** Webinar Bento Grid (agenda, outcomes, career benefits, DevOps overview, required knowledge, next steps) + Career Path roadmap. */
export default function BentoAndRoadmap({ webinar }: { webinar: Webinar }) {
  return (
    <>
      <Section tone="light">
        <Container>
          <RevealOnScroll>
            <SectionHeading eyebrow="Webinar Overview" title="What You'll Get Out of" highlight="This Session" />
          </RevealOnScroll>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <RevealOnScroll className="lg:col-span-2">
              <BentoCell icon={<ClockIcon className="h-5 w-5" />} title="Agenda" tone="orange" span={2}>
                <ul className="grid gap-1.5 sm:grid-cols-2">
                  {webinar.bento.agenda.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </BentoCell>
            </RevealOnScroll>
            <RevealOnScroll delay={0.05}>
              <BentoCell icon={<TargetIcon className="h-5 w-5" />} title="What You'll Learn" tone="ink">
                <ul className="flex flex-col gap-1.5">
                  {webinar.bento.outcomes.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </BentoCell>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <BentoCell icon={<TrendingUpIcon className="h-5 w-5" />} title="Career Benefits">
                <ul className="flex flex-col gap-1.5">
                  {webinar.bento.careerBenefits.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </BentoCell>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <BentoCell icon={<BadgeCheckIcon className="h-5 w-5" />} title="What Is DevOps?">
                {webinar.bento.devopsOverview}
              </BentoCell>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <BentoCell icon={<BriefcaseIcon className="h-5 w-5" />} title="Do I Need Experience?">
                <ul className="flex flex-col gap-1.5">
                  {webinar.bento.requiredKnowledge.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </BentoCell>
            </RevealOnScroll>

            <RevealOnScroll delay={0.25} className="lg:col-span-3">
              <BentoCell icon={<TargetIcon className="h-5 w-5" />} title="Your Next Steps" tone="blue" span={2}>
                <ol className="grid gap-1.5 sm:grid-cols-2">
                  {webinar.bento.nextSteps.map((item, i) => (
                    <li key={item}>
                      {i + 1}. {item}
                    </li>
                  ))}
                </ol>
              </BentoCell>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              align="center"
              eyebrow="DevOps Career Path"
              title="The Roadmap We'll Walk"
              highlight="Through Live"
            />
          </RevealOnScroll>
          <div className="mx-auto mt-10 max-w-2xl">
            <RoadmapSteps steps={webinar.roadmap} />
          </div>
        </Container>
      </Section>
    </>
  );
}
