import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import Button from "@/app/components/Button";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { CalendarIcon } from "@/app/components/icons";
import { BOOK_CALL_MESSAGE, whatsappUrl } from "@/app/data/contact";

/** "Book a Career Consultation" CTA card. */
export default function ConsultationCTA() {
  return (
    <Section tone="light" className="pt-0!">
      <Container>
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl bg-genix-ink px-6 py-12 text-white sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1.5 bg-genix-orange" />
            <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-start gap-4">
                <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 sm:flex">
                  <CalendarIcon className="h-6 w-6 text-genix-orange" />
                </span>
                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">Not Sure Which Path Is Right for You?</h2>
                  <p className="mt-2 max-w-xl text-sm text-white/70 sm:text-base">
                    Book a free, no-obligation 20-minute career consultation with our admissions
                    team. We&rsquo;ll assess your background and map out the fastest realistic route
                    into a DevOps role.
                  </p>
                </div>
              </div>
              <Button href={whatsappUrl(BOOK_CALL_MESSAGE)} target="_blank" variant="primary" size="lg" className="shrink-0">
                Book Free Consultation
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
