import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import Accordion from "@/app/components/Accordion";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { homeFaqs } from "@/app/data/faq";

/** Frequently Asked Questions — general, site-wide FAQ. */
export default function FaqSection() {
  return (
    <Section tone="mist" id="faq">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <RevealOnScroll direction="left">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions,"
              highlight="Answered"
              description="Can't find what you're looking for? Reach out to our admissions team directly and we'll get back to you within a day."
            />
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={0.1}>
            <Accordion items={homeFaqs.map((f) => ({ question: f.question, answer: f.answer }))} />
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}
