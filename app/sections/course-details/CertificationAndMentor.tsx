import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { BadgeCheckIcon } from "@/app/components/icons";
import type { Course } from "@/app/data/courses";

/** Certification details, as entered in admin. Mentors are shown in the course hero. */
export default function CertificationAndMentor({ course }: { course: Course }) {
  const hasCertification = Boolean(course.certification.title);
  if (!hasCertification) return null;

  return (
    <>
      {hasCertification && (
        <Section tone="mist">
          <Container>
            <div className="mx-auto max-w-2xl">
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
                  {course.certification.careerValue && (
                    <p className="mt-5 border-t border-genix-line pt-4 text-sm leading-relaxed text-genix-charcoal/80">
                      <span className="font-bold text-genix-ink">Career Value: </span>
                      {course.certification.careerValue}
                    </p>
                  )}
                </div>
              </RevealOnScroll>
            </div>
          </Container>
        </Section>
      )}

    </>
  );
}
