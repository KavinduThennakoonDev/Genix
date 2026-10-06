import Container from "@/app/components/Container";
import Button from "@/app/components/Button";
import LogoSceneLoader from "@/app/components/three/LogoSceneLoader";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { CheckCircleIcon } from "@/app/components/icons";
import { BOOK_CALL_MESSAGE, whatsappUrl } from "@/app/data/contact";

const VALUE_PROPS = ["Live, mentor-led classes", "Real AWS & Azure projects", "Dedicated placement support"];

/** Home hero — split layout mirrors the reference template: headline/CTAs left, dark video panel right. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 sm:pt-12 sm:pb-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <RevealOnScroll direction="left">
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-genix-ink sm:text-5xl lg:text-[3.4rem]">
              Launch Your Career as a{" "}
              <span className="text-gradient-brand">DevOps Engineer</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-genix-charcoal/85 sm:text-lg">
              Genix Academy turns career-switchers and IT professionals into job-ready DevOps
              engineers through live classes, real AWS &amp; Azure projects, hands-on mentorship,
              and placement support that gets you hired — not just certified.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/courses" size="lg" variant="primary">
                Enroll Now
              </Button>
              <Button href={whatsappUrl(BOOK_CALL_MESSAGE)} target="_blank" size="lg" variant="secondary" withArrow={false}>
                Book a Free Career Call
              </Button>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={0.1}>
            <div className="relative pl-0 pt-8 sm:pl-8 sm:pt-0">
              <div className="absolute left-0 top-0 z-10 hidden w-56 flex-col gap-3 rounded-2xl border border-genix-line bg-white p-4 shadow-soft sm:flex">
                {VALUE_PROPS.map((v) => (
                  <div key={v} className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-genix-success/10 text-genix-success">
                      <CheckCircleIcon className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-semibold text-genix-ink">{v}</span>
                  </div>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-4xl bg-genix-ink p-3 shadow-soft sm:pl-16">
                <div className="relative aspect-4/5 overflow-hidden rounded-3xl sm:aspect-9/11">
                  <LogoSceneLoader />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-genix-ink via-genix-ink/80 to-transparent p-6 pt-16 text-white">
                    <p className="text-base font-bold">Launch Your DevOps Career</p>
                    <p className="mt-1 text-sm text-white/70">AWS &amp; Azure · Live, mentor-led classes</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
