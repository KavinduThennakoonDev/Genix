import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import LogoGrid from "@/app/components/LogoGrid";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { industryPartners } from "@/app/data/companies";

/** "Industry Partners" — grid of collaborating institutes/communities. */
export function IndustryPartners() {
  return (
    <Section tone="mist">
      <Container>
        <RevealOnScroll>
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-genix-ink sm:text-4xl">
              Our Industry <span className="text-gradient-brand">Partners</span>
            </h2>
            <p className="max-w-2xl text-base text-genix-charcoal/80">
              We collaborate with cloud communities, certification bodies, and hiring partners to
              keep our curriculum current and our students connected to real opportunities.
            </p>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1} className="mt-10">
          <LogoGrid logos={industryPartners} />
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
