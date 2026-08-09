import Container from "@/app/components/Container";
import Badge from "@/app/components/Badge";
import { TargetIcon } from "@/app/components/icons";
import RevealOnScroll from "@/app/components/RevealOnScroll";

/** Courses page hero. */
export default function CoursesHero() {
  return (
    <section className="bg-genix-mist pt-10 pb-14 sm:pt-14 sm:pb-16">
      <Container>
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Badge tone="orange" icon={<TargetIcon className="h-3.5 w-3.5" />}>
              Explore Our Programs
            </Badge>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-genix-ink sm:text-5xl">
            Courses Built to Get You <span className="text-gradient-brand">Hired</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-genix-charcoal/85 sm:text-lg">
            Every Genix Academy course pairs live mentorship with real cloud infrastructure
            projects, so you graduate with proof of skill — not just a certificate.
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
