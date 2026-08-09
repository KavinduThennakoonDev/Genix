import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import BentoCell from "@/app/components/BentoCell";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import {
  BadgeCheckIcon,
  BriefcaseIcon,
  ShieldIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
} from "@/app/components/icons";

const REASONS = [
  {
    icon: <TargetIcon className="h-5 w-5" />,
    title: "Project-First Curriculum",
    body: "You build real, production-style AWS and Azure infrastructure from week one — not disconnected tutorials.",
    tone: "orange" as const,
    span: 2 as const,
  },
  {
    icon: <UsersIcon className="h-5 w-5" />,
    title: "Live Mentorship",
    body: "Weekly 1:1 and group mentor sessions with working DevOps engineers, not pre-recorded lectures.",
    tone: "white" as const,
    span: 1 as const,
  },
  {
    icon: <BriefcaseIcon className="h-5 w-5" />,
    title: "Placement Support Built In",
    body: "Resume reviews, mock interviews, and referrals to our hiring partner network — included in every course.",
    tone: "ink" as const,
    span: 1 as const,
  },
  {
    icon: <BadgeCheckIcon className="h-5 w-5" />,
    title: "Certification That Means Something",
    body: "Graduate with a verifiable certificate tied to a real capstone project you can walk employers through.",
    tone: "white" as const,
    span: 1 as const,
  },
  {
    icon: <ShieldIcon className="h-5 w-5" />,
    title: "Lifetime Community & Support",
    body: "Keep learning after graduation with lifetime access to recordings and our alumni community.",
    tone: "blue" as const,
    span: 1 as const,
  },
  {
    icon: <TrendingUpIcon className="h-5 w-5" />,
    title: "Outcomes-Focused Teaching",
    body: "Every module maps directly to skills employers screen for — no filler content, no wasted weeks.",
    tone: "white" as const,
    span: 2 as const,
  },
];

/** "Why Choose Genix Academy" — bento-style reasons grid. */
export default function WhyChooseUs() {
  return (
    <Section tone="light" id="why-genix">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Why Genix Academy"
            title="Training Built Around"
            highlight="Getting You Hired"
            description="Most bootcamps teach tools. We build careers — with a curriculum, mentorship model, and support system designed around one outcome: your first (or next) DevOps job."
          />
        </RevealOnScroll>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <RevealOnScroll key={r.title} delay={i * 0.05} className={r.span === 2 ? "lg:col-span-2" : ""}>
              <BentoCell icon={r.icon} title={r.title} tone={r.tone} span={r.span}>
                {r.body}
              </BentoCell>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  );
}
