import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import LogoMarquee from "@/app/components/LogoMarquee";
import LogoGrid from "@/app/components/LogoGrid";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { hiringCompanies, industryPartners } from "@/app/data/companies";

/** "Companies Hiring Our Graduates" — logo marquee + short placement-success intro. */
export function HiringCompanies() {
  return (
    <Section tone="light" className="py-12! sm:py-14!">
      <Container>
        <RevealOnScroll direction="none">
          <p className="text-center text-sm font-semibold text-genix-charcoal/70 sm:text-base">
            Our graduates are working as DevOps &amp; Cloud Engineers at companies like
          </p>
        </RevealOnScroll>
        <div className="mt-6">
          <LogoMarquee logos={hiringCompanies} />
        </div>
      </Container>
    </Section>
  );
}

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
