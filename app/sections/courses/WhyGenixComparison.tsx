import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import ComparisonTable from "@/app/components/ComparisonTable";
import RevealOnScroll from "@/app/components/RevealOnScroll";

const ROWS = [
  { feature: "Live Classes", generic: "Sometimes", genix: true },
  { feature: "Real, Production-Style Projects", generic: false, genix: true },
  { feature: "Industry Mentors (Working Engineers)", generic: false, genix: true },
  { feature: "1:1 Career Guidance", generic: false, genix: true },
  { feature: "Mock Interviews", generic: "Limited", genix: true },
  { feature: "Resume & LinkedIn Building", generic: false, genix: true },
  { feature: "Placement Support & Referrals", generic: false, genix: true },
  { feature: "Active Alumni Community Access", generic: false, genix: true },
  { feature: "Recorded Sessions (Lifetime)", generic: "Limited Time", genix: true },
  { feature: "Lifetime Post-Course Support", generic: false, genix: true },
];

/** "Why Genix Academy?" comparison table vs generic training institutes. */
export default function WhyGenixComparison() {
  return (
    <Section tone="light">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            align="center"
            eyebrow="Why Genix Academy?"
            title="See the"
            highlight="Difference"
            description="Not all DevOps training is built the same. Here's exactly how Genix Academy compares to a typical generic training institute."
          />
        </RevealOnScroll>
        <RevealOnScroll delay={0.1} className="mt-10">
          <ComparisonTable rows={ROWS} />
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
