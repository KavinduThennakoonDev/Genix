import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import MentorCard from "@/app/components/MentorCard";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { BadgeCheckIcon } from "@/app/components/icons";
import type { Course } from "@/app/data/courses";
import { mentor } from "@/app/data/mentor";

/** Certification details + Meet Your Mentor. */
export default function CertificationAndMentor({ course }: { course: Course }) {
  return (
    <Section tone="mist">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
          <RevealOnScroll direction="left">
            <div className="flex h-full flex-col justify-center rounded-3xl border border-genix-line bg-white p-8 shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-genix-orange/10 text-genix-orange">
                <BadgeCheckIcon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-xl font-bold text-genix-ink">{course.certification.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-genix-charcoal/85">{course.certification.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {course.certification.skillsValidated.map((s) => (
                  <span key={s} className="rounded-full bg-genix-mist px-3 py-1.5 text-xs font-semibold text-genix-ink">
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-5 border-t border-genix-line pt-4 text-sm leading-relaxed text-genix-charcoal/80">
                <span className="font-bold text-genix-ink">Career Value: </span>
                {course.certification.careerValue}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={0.1}>
            <SectionHeading eyebrow="Meet Your Mentor" title="Learn Directly From" highlight="Working Engineers" />
            <div className="mt-6">
              <MentorCard mentor={mentor} />
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}
