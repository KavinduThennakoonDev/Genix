import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import Accordion from "@/app/components/Accordion";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { webinarFaqs } from "@/app/data/faq";

/** Webinar-specific FAQ. */
export default function WebinarFaqSection() {
  return (
    <Section tone="mist">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <RevealOnScroll direction="left">
            <SectionHeading eyebrow="FAQ" title="Webinar" highlight="Questions" />
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={0.1}>
            <Accordion items={webinarFaqs} />
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}
