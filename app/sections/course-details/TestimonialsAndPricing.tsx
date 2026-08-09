import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import TestimonialCard from "@/app/components/TestimonialCard";
import Button from "@/app/components/Button";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { CheckIcon } from "@/app/components/icons";
import { testimonials } from "@/app/data/testimonials";
import type { Course } from "@/app/data/courses";

/** Testimonials + Pricing (original/discounted/early-bird/promo/payment options). */
export default function TestimonialsAndPricing({ course }: { course: Course }) {
  const discountPct = Math.round(
    ((course.pricing.originalPrice - course.pricing.discountedPrice) / course.pricing.originalPrice) * 100
  );

  return (
    <>
      <Section tone="light">
        <Container>
          <RevealOnScroll>
            <SectionHeading align="center" eyebrow="Testimonials" title="What Our Students" highlight="Say" />
          </RevealOnScroll>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <RevealOnScroll key={t.name} delay={i * 0.06}>
                <TestimonialCard testimonial={t} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink" id="pricing">
        <Container>
          <RevealOnScroll className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="bg-genix-orange px-6 py-3 text-center text-xs font-bold uppercase tracking-wide text-white sm:px-8">
              Early-Bird Pricing Ends {course.pricing.earlyBirdDeadline}
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-sm font-semibold text-white/60">{course.title}</p>
              <div className="mt-2 flex items-end gap-3">
                <span className="text-4xl font-extrabold">${course.pricing.discountedPrice}</span>
                <span className="pb-1 text-lg text-white/50 line-through">${course.pricing.originalPrice}</span>
                <span className="mb-1.5 rounded-full bg-genix-success/20 px-2.5 py-1 text-xs font-bold text-genix-success">
                  Save {discountPct}%
                </span>
              </div>
              <p className="mt-2 text-xs text-white/60">
                Use promo code <span className="font-mono font-bold text-genix-orange">{course.pricing.promoCode}</span> at checkout
              </p>

              <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-6">
                {course.pricing.paymentOptions.map((option) => (
                  <li key={option} className="flex items-center gap-2.5 text-sm text-white/85">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-genix-success/20 text-genix-success">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {option}
                  </li>
                ))}
              </ul>

              <Button href="#register" size="lg" className="mt-7 w-full justify-center">
                Register Now
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>
    </>
  );
}
