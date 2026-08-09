import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import Button from "@/app/components/Button";
import StatCounter from "@/app/components/StatCounter";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { CheckCircleIcon } from "@/app/components/icons";
import { learningStats } from "@/app/data/stats";

const SUPPORT_ITEMS = [
  "Personalized resume & LinkedIn profile review",
  "Multiple rounds of mock technical interviews",
  "Direct referrals into our hiring partner network",
  "1:1 career coaching sessions with your mentor",
  "Interview prep for real DevOps interview questions",
  "Lifetime access to our alumni & job-referral community",
];

/** Placement Support — what happens after you finish learning. */
export function PlacementSupport() {
  return (
    <Section tone="ink">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll direction="left">
            <SectionHeading
              tone="ink"
              eyebrow="Placement Support"
              title="Training Ends. Our Support"
              highlight="Doesn't."
              description="Graduating is the beginning, not the finish line. Every Genix student gets structured, hands-on support to convert new skills into an actual job offer."
            />
            <div className="mt-8">
              <Button href="/#contact" variant="primary" size="lg">
                Talk to a Career Advisor
              </Button>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={0.1}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {SUPPORT_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-genix-orange/20 text-genix-orange">
                    <CheckCircleIcon className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-relaxed text-white/85">{item}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}

/** Learning Statistics — animated count-up stat tiles. */
export function LearningStatistics() {
  return (
    <Section tone="light">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            align="center"
            eyebrow="Learning Statistics"
            title="The Numbers Behind"
            highlight="the Outcomes"
            description="We track these numbers closely because they're the entire point of the training."
          />
        </RevealOnScroll>
        <div className="mt-10 grid grid-cols-2 gap-6 rounded-3xl border border-genix-line bg-genix-mist p-8 sm:grid-cols-4 sm:p-10">
          {learningStats.map((s, i) => (
            <RevealOnScroll key={s.label} delay={i * 0.06} className="text-center sm:text-left">
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  );
}
