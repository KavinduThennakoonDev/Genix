import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import Button from "@/app/components/Button";
import Badge from "@/app/components/Badge";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { CalendarIcon, ClockIcon, UsersIcon } from "@/app/components/icons";
import { webinars } from "@/app/data/webinars";

/** Upcoming Webinar feature card. */
export default function UpcomingWebinar() {
  const webinar = webinars[0];

  return (
    <Section tone="light" className="pt-0!">
      <Container>
        <RevealOnScroll>
          <div className="grid gap-8 overflow-hidden rounded-3xl border border-genix-line bg-white shadow-card lg:grid-cols-2">
            <div
              className={`flex flex-col justify-center gap-4 bg-linear-to-br ${webinar.gradient} p-8 text-white sm:p-12`}
            >
              <Badge tone="white">Free Live Webinar</Badge>
              <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{webinar.title}</h2>
              <div className="flex flex-wrap gap-4 text-sm text-white/85">
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4" /> {webinar.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="h-4 w-4" /> {webinar.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <UsersIcon className="h-4 w-4" /> {webinar.registeredCount}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
              <p className="text-sm leading-relaxed text-genix-charcoal/85 sm:text-base">
                {webinar.overview}
              </p>
              <Button href={`/webinar/${webinar.slug}`} size="lg" className="self-start">
                Register for Webinar
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
