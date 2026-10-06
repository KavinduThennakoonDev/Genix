import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import TestimonialCard from "@/app/components/TestimonialCard";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { getTestimonials } from "@/app/lib/queries";

/** Attendee testimonials entered in admin. Hidden when there are none. */
export default async function CertificationMentorTestimonials() {
  const webinarTestimonials = await getTestimonials("webinar");
  if (webinarTestimonials.length === 0) return null;

  return (
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
  );
}
