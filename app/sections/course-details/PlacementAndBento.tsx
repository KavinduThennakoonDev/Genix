import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import BentoCell from "@/app/components/BentoCell";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import {
  BriefcaseIcon,
  ClockIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
  BadgeCheckIcon,
} from "@/app/components/icons";
import type { Course } from "@/app/data/courses";

/** Course at a Glance bento grid (time commitment, outcomes, career opportunities, salary, etc.). */
export default function PlacementAndBento({ course }: { course: Course }) {
  return (
    <>
      <Section tone="light">
        <Container>
          <RevealOnScroll>
            <SectionHeading eyebrow="Course at a Glance" title="Everything You Need to" highlight="Know" />
          </RevealOnScroll>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <RevealOnScroll delay={0} className="lg:col-span-2">
              <BentoCell icon={<ClockIcon className="h-5 w-5" />} title="Time Commitment" tone="orange" span={2}>
                {course.bento.timeCommitment}
              </BentoCell>
            </RevealOnScroll>
            <RevealOnScroll delay={0.05}>
              <BentoCell icon={<TrendingUpIcon className="h-5 w-5" />} title="Salary Potential" tone="ink">
                {course.bento.salaryPotential}
              </BentoCell>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <BentoCell icon={<TargetIcon className="h-5 w-5" />} title="What You'll Learn">
                <ul className="flex flex-col gap-1.5">
                  {course.bento.whatYoullLearn.slice(0, 5).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </BentoCell>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <BentoCell icon={<UsersIcon className="h-5 w-5" />} title="Who Should Join">
                <ul className="flex flex-col gap-1.5">
                  {course.bento.whoShouldJoin.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </BentoCell>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <BentoCell icon={<BriefcaseIcon className="h-5 w-5" />} title="Career Opportunities">
                <div className="flex flex-wrap gap-1.5">
                  {course.bento.careerOpportunities.map((role) => (
                    <span key={role} className="rounded-full bg-genix-mist px-2.5 py-1 text-xs font-semibold text-genix-ink">
                      {role}
                    </span>
                  ))}
                </div>
              </BentoCell>
            </RevealOnScroll>

            <RevealOnScroll delay={0.25} className="lg:col-span-3">
              <BentoCell icon={<BadgeCheckIcon className="h-5 w-5" />} title="Learning Outcomes" tone="blue" span={2}>
                <ul className="grid gap-1.5 sm:grid-cols-2">
                  {course.bento.learningOutcomes.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </BentoCell>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>
    </>
  );
}
