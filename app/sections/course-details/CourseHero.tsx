import Image from "next/image";
import Container from "@/app/components/Container";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/Button";
import AvatarStack from "@/app/components/AvatarStack";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { ClockIcon, TrendingUpIcon } from "@/app/components/icons";
import type { Course } from "@/app/data/courses";

/** Course Details hero — background photo + brand-gradient scrim, category badge, duration/hours, avatars, CTAs. */
export default function CourseHero({ course }: { course: Course }) {
  return (
    <section className={`relative overflow-hidden bg-linear-to-br ${course.gradient} pt-14 pb-20 text-white sm:pt-20 sm:pb-28`}>
      <Image
        src={course.heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-35 mix-blend-luminosity"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.18),transparent_55%)]" />
      <Container className="relative">
        <RevealOnScroll className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <Badge tone="white">{course.category}</Badge>
          {course.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-genix-success/25 px-3.5 py-1.5 text-xs font-bold text-white">
              <TrendingUpIcon className="h-3.5 w-3.5" /> {course.status}
            </span>
          )}
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">{course.title}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{course.heroDescription}</p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2">
              <ClockIcon className="h-4 w-4" /> {course.duration}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2">
              {course.totalHours} Total Learning
            </span>
          </div>

          <div className="mt-2 flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
            <AvatarStack initials={course.avatarInitials} count={course.studentsEnrolled} label="" />
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button href="#register" size="lg" variant="primary">
              Register Now
            </Button>
            <Button href="#curriculum" size="lg" variant="secondary" withArrow={false} className="border-white/30! bg-white/10! text-white hover:border-white/60!">
              View Curriculum
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
