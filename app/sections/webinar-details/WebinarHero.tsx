import Image from "next/image";
import Container from "@/app/components/Container";
import Badge from "@/app/components/Badge";
import AvatarStack from "@/app/components/AvatarStack";
import VideoCard from "@/app/components/VideoCard";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { CalendarIcon, ClockIcon, UsersIcon } from "@/app/components/icons";
import type { Webinar } from "@/app/data/webinars";

/** Webinar Details hero — background photo + brand-gradient scrim, date/time/duration, speaker, intro video, avatars. */
export default function WebinarHero({ webinar }: { webinar: Webinar }) {
  return (
    <section className={`relative overflow-hidden bg-linear-to-br ${webinar.gradient} pt-14 pb-16 text-white sm:pt-20 sm:pb-20`}>
      {webinar.heroImage && (
        <Image
          src={webinar.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.16),transparent_55%)]" />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <RevealOnScroll direction="left">
            <Badge tone="white">Free Live Webinar</Badge>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {webinar.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm text-white/80 sm:text-base">Hosted by {webinar.speakerName}</p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2">
                <CalendarIcon className="h-4 w-4" /> {webinar.date}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2">
                <ClockIcon className="h-4 w-4" /> {webinar.time}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2">
                <UsersIcon className="h-4 w-4" /> {webinar.registeredCount}
              </span>
            </div>

            <div className="mt-8">
              <AvatarStack initials={webinar.avatarInitials} count={webinar.registeredCount} label="already signed up" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={0.1}>
            <VideoCard
              title={webinar.introVideoTitle}
              image={webinar.introImage}
              className="aspect-video rounded-3xl border border-white/15"
            />
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
