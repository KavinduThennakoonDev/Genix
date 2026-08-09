import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import RoadmapSteps from "@/app/components/RoadmapSteps";
import SkillBadge from "@/app/components/SkillBadge";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import type { Course } from "@/app/data/courses";

/** DevOps Career Roadmap + Skills You'll Learn grid. */
export default function RoadmapAndSkills({ course }: { course: Course }) {
  return (
    <Section tone="mist">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <RevealOnScroll direction="left">
              <SectionHeading eyebrow="Career Roadmap" title="Your Path to" highlight="DevOps Engineer" />
            </RevealOnScroll>
            <div className="mt-8">
              <RoadmapSteps steps={course.roadmap} />
            </div>
          </div>
          <div>
            <RevealOnScroll direction="right">
              <SectionHeading eyebrow="Skills You'll Learn" title="Tools You'll Actually" highlight="Master" />
            </RevealOnScroll>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {course.skills.map((skill, i) => (
                <RevealOnScroll key={skill.label} delay={i * 0.03}>
                  <SkillBadge label={skill.label} mark={skill.mark} index={i} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
