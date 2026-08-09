import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import RoadmapSteps from "@/app/components/RoadmapSteps";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { BadgeCheckIcon, TargetIcon, UsersIcon, BriefcaseIcon } from "@/app/components/icons";

const JOURNEY_STEPS = [
  { title: "Apply & Get Assessed", description: "Submit your registration and complete a short background call so we can place you in the right batch." },
  { title: "Learn Live with Mentors", description: "Attend live, instructor-led classes covering Linux, Git, Docker, Kubernetes, Terraform, and AWS/Azure." },
  { title: "Build Real Projects", description: "Apply every concept in hands-on labs and a portfolio-worthy capstone project, reviewed by your mentor." },
  { title: "Get Placement-Ready", description: "Polish your resume and LinkedIn, and complete mock technical interviews with real DevOps engineers." },
  { title: "Land Your DevOps Role", description: "Get referred into our hiring partner network and interview with confidence, backed by a real portfolio." },
];

/** Learning Journey — the 5-step path every Genix student follows. */
export function LearningJourney() {
  return (
    <Section tone="mist">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <RevealOnScroll direction="left">
            <SectionHeading
              eyebrow="Your Learning Journey"
              title="From Beginner to"
              highlight="Hired DevOps Engineer"
              description="A clear, guided path — not a pile of disconnected videos. Here's exactly what the journey looks like from enrollment to offer letter."
            />
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={0.1}>
            <RoadmapSteps steps={JOURNEY_STEPS} />
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}

const METHODOLOGY = [
  {
    icon: <TargetIcon className="h-5 w-5" />,
    title: "Project-Based Learning",
    body: "Every module is anchored to a real, deployable project — so concepts stick because you've actually built with them.",
  },
  {
    icon: <UsersIcon className="h-5 w-5" />,
    title: "Small, Cohort-Based Classes",
    body: "Live classes are kept small so mentors can give direct feedback, not lecture into the void.",
  },
  {
    icon: <BadgeCheckIcon className="h-5 w-5" />,
    title: "Continuous Assessment",
    body: "Weekly assignments and code reviews keep you accountable and catch gaps before they compound.",
  },
  {
    icon: <BriefcaseIcon className="h-5 w-5" />,
    title: "Industry-Aligned Curriculum",
    body: "Course content is reviewed against current job postings and updated as tooling and hiring bars evolve.",
  },
];

/** Our Training Methodology — the teaching approach behind the curriculum. */
export function TrainingMethodology() {
  return (
    <Section tone="light">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            align="center"
            eyebrow="Our Training Methodology"
            title="How We Actually"
            highlight="Teach DevOps"
            description="A methodology built on doing, not just watching — designed so what you learn on Monday is something you can explain in an interview by Friday."
          />
        </RevealOnScroll>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METHODOLOGY.map((m, i) => (
            <RevealOnScroll key={m.title} delay={i * 0.06}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-genix-line bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-genix-mist text-genix-orange">
                  {m.icon}
                </span>
                <h3 className="text-base font-bold text-genix-ink">{m.title}</h3>
                <p className="text-sm leading-relaxed text-genix-charcoal/80">{m.body}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  );
}
