import Image from "next/image";
import Container from "@/app/components/Container";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/Button";
import AvatarStack from "@/app/components/AvatarStack";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { ClockIcon, TrendingUpIcon } from "@/app/components/icons";
import type { Course } from "@/app/data/courses";

/** Course Details hero — text and CTAs on the left, the course image in a fixed-size frame on the right. */
export default function CourseHero({ course }: { course: Course }) {
  return (
    <section className={`relative overflow-hidden bg-linear-to-br ${course.gradient || "from-genix-ink to-genix-blue-dark"} pt-14 pb-16 text-white sm:pt-20 sm:pb-20`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.16),transparent_55%)]" />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <RevealOnScroll direction="left" className="flex flex-col items-start gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="white">{course.category}</Badge>
              {course.status && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-genix-success/25 px-3.5 py-1.5 text-xs font-bold text-white">
                  <TrendingUpIcon className="h-3.5 w-3.5" /> {course.status}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">{course.title}</h1>
            <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{course.heroDescription}</p>

            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2">
                <ClockIcon className="h-4 w-4" /> {course.duration}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2">
                {course.totalHours} Total Learning
              </span>
            </div>

            {course.studentsEnrolled && (
              <AvatarStack initials={course.avatarInitials} count={course.studentsEnrolled} label="" />
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="#register" size="lg" variant="primary">
                Register Now
              </Button>
              <Button href="#curriculum" size="lg" variant="secondary" withArrow={false} className="border-white/30! bg-white/10! text-white hover:border-white/60!">
                View Curriculum
              </Button>
            </div>
          </RevealOnScroll>

          {course.heroImage && (
            <RevealOnScroll direction="right" delay={0.1} className="w-full max-w-md justify-self-center lg:justify-self-end">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/20 bg-white shadow-soft">
                <Image
                  src={course.heroImage}
                  alt={course.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, 100vw"
                  className="object-contain p-3"
                />
              </div>
            </RevealOnScroll>
          )}
        </div>
      </Container>
    </section>
  );
}
