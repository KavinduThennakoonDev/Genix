import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import Button from "@/app/components/Button";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { CheckCircleIcon } from "@/app/components/icons";

/** "AWS DevOps open now, Azure DevOps next" promotion banner. */
export default function UpcomingCoursePromotion() {
  return (
    <Section tone="ink" className="py-10! sm:py-12!">
      <Container>
        <RevealOnScroll className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-6 sm:flex-row sm:px-8">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <p className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-white sm:justify-start">
              <span className="flex items-center gap-1.5 rounded-full bg-genix-success/20 px-3 py-1 text-genix-success">
                <CheckCircleIcon className="h-4 w-4" /> AWS DevOps Course — Enrolling Now
              </span>
              <span className="text-white/40">·</span>
              <span className="text-white/60">Azure DevOps Course begins right after the AWS batch</span>
            </p>
            <p className="text-sm text-white/60">
              Seats for the current AWS DevOps cohort are limited — reserve yours before the batch closes.
            </p>
          </div>
          <Button href="/courses/aws-devops" size="md" variant="primary" className="shrink-0">
            Enroll Now
          </Button>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
