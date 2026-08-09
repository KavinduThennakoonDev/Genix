import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import MentorCard from "@/app/components/MentorCard";
import TestimonialCard from "@/app/components/TestimonialCard";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { BadgeCheckIcon } from "@/app/components/icons";
import { mentor } from "@/app/data/mentor";
import { webinarTestimonials } from "@/app/data/testimonials";

/** Certification (participation benefits), Meet the Mentor, and attendee Testimonials. */
export default function CertificationMentorTestimonials() {
  return (
    <>
      <Section tone="mist">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
            <RevealOnScroll direction="left">
              <div className="flex h-full flex-col justify-center rounded-3xl border border-genix-line bg-white p-8 shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-genix-orange/10 text-genix-orange">
                  <BadgeCheckIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-genix-ink">Certificate of Attendance</h3>
                <p className="mt-3 text-sm leading-relaxed text-genix-charcoal/85">
                  Every attendee who joins the live session receives a Genix Academy Certificate of
                  Attendance, plus early-bird access to the AWS DevOps Masterclass and a recording of
                  the full session to revisit anytime.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" delay={0.1}>
              <SectionHeading eyebrow="Meet the Mentor" title="Learn From a Working" highlight="DevOps Engineer" />
              <div className="mt-6">
                <MentorCard mentor={mentor} />
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <RevealOnScroll>
            <SectionHeading align="center" eyebrow="Testimonials" title="What Past Attendees" highlight="Say" />
          </RevealOnScroll>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {webinarTestimonials.map((t, i) => (
              <RevealOnScroll key={t.name} delay={i * 0.06}>
                <TestimonialCard testimonial={t} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
