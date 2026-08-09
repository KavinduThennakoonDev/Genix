import Container from "@/app/components/Container";
import Button from "@/app/components/Button";
import AvatarStack from "@/app/components/AvatarStack";
import RevealOnScroll from "@/app/components/RevealOnScroll";

/** Final Call-to-Action band before the footer. */
export default function FinalCta() {
  return (
    <section className="bg-genix-ink py-16 text-white sm:py-20">
      <Container>
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-genix-orange via-genix-orange-dark to-genix-blue-dark px-6 py-14 text-center sm:px-14 sm:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
            <div className="relative flex flex-col items-center gap-6">
              <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Your DevOps Career Starts With One Decision
              </h2>
              <p className="max-w-xl text-base text-white/90 sm:text-lg">
                Seats for the current AWS DevOps batch are limited. Enroll now to lock your spot,
                or book a free call if you still have questions.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/courses" variant="dark" size="lg" className="bg-white! text-genix-ink hover:bg-white/90!">
                  Enroll Now
                </Button>
                <Button href="/#contact" variant="secondary" size="lg" withArrow={false} className="border-white/40! bg-transparent! text-white hover:border-white!">
                  Book a Free Career Call
                </Button>
              </div>
              <AvatarStack
                initials={["IP", "DF", "SW", "KJ"]}
                count="1,200+ students"
                label="already building their DevOps careers"
              />
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
