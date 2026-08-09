import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import ComparisonTable from "@/app/components/ComparisonTable";
import Button from "@/app/components/Button";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { MailIcon, PhoneIcon } from "@/app/components/icons";

const ROWS = [
  { feature: "Live Classes", generic: "Sometimes", genix: true },
  { feature: "Real, Production-Style Projects", generic: false, genix: true },
  { feature: "Industry Mentors (Working Engineers)", generic: false, genix: true },
  { feature: "Mock Interviews", generic: "Limited", genix: true },
  { feature: "Resume & LinkedIn Building", generic: false, genix: true },
  { feature: "Placement Support & Referrals", generic: false, genix: true },
  { feature: "Lifetime Community Access", generic: false, genix: true },
  { feature: "Recorded Sessions", generic: "Limited Time", genix: true },
];

/** Course-specific comparison table + Contact CTA. */
export default function ComparisonAndContact() {
  return (
    <>
      <Section tone="mist">
        <Container>
          <RevealOnScroll>
            <SectionHeading align="center" eyebrow="Why Genix Academy?" title="Compared to" highlight="Other Institutes" />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <ComparisonTable rows={ROWS} />
          </RevealOnScroll>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <RevealOnScroll className="flex flex-col items-center gap-6 rounded-3xl bg-genix-ink px-6 py-12 text-center text-white sm:px-12">
            <h2 className="max-w-xl text-2xl font-bold sm:text-3xl">Still Have Questions About This Course?</h2>
            <p className="max-w-lg text-sm text-white/70 sm:text-base">
              Talk to our admissions team directly — no pressure, just honest answers about whether this course fits your goals.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="mailto:hello@genixacademy.com" variant="primary" withArrow={false} className="gap-2">
                <MailIcon className="h-4 w-4" /> Email Us
              </Button>
              <Button href="tel:+94700000000" variant="secondary" withArrow={false} className="gap-2 border-white/30! bg-transparent! text-white hover:border-white/60!">
                <PhoneIcon className="h-4 w-4" /> Call Us
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>
    </>
  );
}
