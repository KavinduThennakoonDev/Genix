import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import TestimonialCard from "@/app/components/TestimonialCard";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { getTestimonials } from "@/app/lib/queries";

/** Student Success Stories — testimonial grid with ratings & placement highlights. */
export default async function SuccessStories() {
  const testimonials = await getTestimonials("course");
  if (testimonials.length === 0) return null;
  return (
    <Section tone="mist" id="success-stories">
      <Container>
        <RevealOnScroll>
          <div className="flex flex-col items-center gap-4 text-center">
            <SectionHeading
              align="center"
              eyebrow="Student Success Stories"
              title="Real Career"
              highlight="Transformations"
              description="Every story below started exactly where you are now — with a decision to invest in a new skill set. Here's where that decision took them."
            />
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <RevealOnScroll key={t.name} delay={i * 0.06}>
              <TestimonialCard testimonial={t} />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  );
}
