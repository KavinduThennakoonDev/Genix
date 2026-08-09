import Container from "@/app/components/Container";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/Button";
import AvatarStack from "@/app/components/AvatarStack";
import VideoCard from "@/app/components/VideoCard";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { CheckCircleIcon, TrendingUpIcon } from "@/app/components/icons";

const VALUE_PROPS = ["Live, mentor-led classes", "Real AWS & Azure projects", "Dedicated placement support"];

/** Home hero — split layout mirrors the reference template: headline/CTAs left, dark video panel right. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 sm:pt-12 sm:pb-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <RevealOnScroll direction="left">
            <Badge tone="orange" icon={<TrendingUpIcon className="h-3.5 w-3.5" />}>
              Live Cohorts Open — AWS DevOps Batch Enrolling Now
            </Badge>
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
              <Button href="/#contact" size="lg" variant="secondary" withArrow={false}>
                Book a Free Career Call
              </Button>
            </div>
            <div className="mt-10">
              <AvatarStack
                initials={["IP", "DF", "SW", "KJ"]}
                count="1,200+"
                label="Students Trained & Counting"
              />
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
                <VideoCard
                  title="A Real Genix Academy Success Story"
                  subtitle="From IT Support to DevOps Engineer in 4 months"
                  image="/images/scenes/home-hero.jpg"
                  className="aspect-4/5 sm:aspect-9/11"
                />
              </div>

              <div className="absolute -bottom-6 right-2 z-10 flex items-center gap-3 rounded-2xl border border-genix-line bg-white px-4 py-3 shadow-soft sm:right-6">
                <div className="flex -space-x-2">
                  {["★", "★", "★"].map((s, i) => (
                    <span key={i} className="text-genix-orange">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-genix-ink">4.9 / 5</p>
                  <p className="text-[11px] text-genix-charcoal/60">Average Student Rating</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
