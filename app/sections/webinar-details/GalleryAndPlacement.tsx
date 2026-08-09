import Image from "next/image";
import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import LogoGrid from "@/app/components/LogoGrid";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { learningStats } from "@/app/data/stats";
import { hiringCompanies } from "@/app/data/companies";
import { webinarGalleryPhotos } from "@/app/data/gallery";

/** Student Success Gallery + stats, and Placement Companies. */
export default function GalleryAndPlacement() {
  return (
    <>
      <Section tone="light">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              align="center"
              eyebrow="Student Success Gallery"
              title="Real Students,"
              highlight="Real Outcomes"
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10 grid grid-cols-4 gap-3 sm:grid-cols-8">
            {webinarGalleryPhotos.map((photo, i) => (
              <div key={photo + i} className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src={photo} alt="" fill sizes="120px" className="object-cover" />
              </div>
            ))}
          </RevealOnScroll>
          <div className="mt-10 grid grid-cols-2 gap-6 rounded-3xl border border-genix-line bg-genix-mist p-8 sm:grid-cols-4">
            {learningStats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <p className="text-3xl font-extrabold text-genix-ink">
                  {s.value}
                  {s.suffix}
                </p>
                <p className="mt-1 text-xs font-medium text-genix-charcoal/70">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              align="center"
              eyebrow="Placement Companies"
              title="Where Genix Graduates"
              highlight="Work Today"
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <LogoGrid logos={hiringCompanies} />
          </RevealOnScroll>
        </Container>
      </Section>
    </>
  );
}
