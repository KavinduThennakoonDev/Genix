import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import MentorSideCard from "@/app/components/MentorSideCard";
import type { Course } from "@/app/data/courses";

/** Course Introduction (video + overview) and Student Results (stats entered in admin). */
export default function CourseIntroAndResults({ course }: { course: Course }) {
  return (
    <Section tone="light">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll direction="left">
            <SectionHeading eyebrow="Course Introduction" title="What This Course Is" highlight="Really Like" />
            <p className="mt-5 text-base leading-relaxed text-genix-charcoal/85 sm:text-lg">{course.overview}</p>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={0.1} className="flex flex-col gap-10">
            {course.mentors.length > 0 && (
              <div className="flex flex-col gap-5">
                <SectionHeading eyebrow="Your Mentors" title="Learn Directly From" highlight="Working Engineers" />
                {course.mentors.map((m) => (
                  <MentorSideCard key={m._id ?? m.name} mentor={m} />
                ))}
              </div>
            )}
            {course.studentResultsStats.length > 0 && (
              <>
                <SectionHeading eyebrow="Student Results" title="Proof, Not" highlight="Promises" />
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {course.studentResultsStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-genix-line bg-genix-mist p-4 text-center">
                      <p className="text-2xl font-extrabold text-genix-ink">
                        {stat.value}
                        {stat.suffix}
                      </p>
                      <p className="mt-1 text-xs font-medium text-genix-charcoal/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}
