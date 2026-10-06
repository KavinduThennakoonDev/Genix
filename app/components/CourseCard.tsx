import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, ClockIcon } from "./icons";
import Badge from "./Badge";
import type { Course } from "@/app/data/courses";

/** Course card used on Home (Featured Courses) and the Courses listing grid. */
export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-genix-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
    >
      <div
        className={`relative flex h-40 items-end overflow-hidden p-5 ${course.heroImage ? "bg-genix-ink" : `bg-linear-to-br ${course.gradient || "from-genix-ink to-genix-blue-dark"}`}`}
      >
        {course.heroImage && (
          <>
            <Image
              src={course.heroImage}
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-genix-ink/70 via-transparent to-transparent" />
          </>
        )}
        <Badge tone="white">{course.category}</Badge>
        {course.status && (
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-genix-ink">
            {course.status}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-bold text-genix-ink">{course.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-genix-charcoal/80">{course.shortDescription}</p>
        <div className="flex items-center justify-between border-t border-genix-line pt-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-genix-charcoal/70">
            <ClockIcon className="h-4 w-4" /> {course.duration}
          </span>
          <span className="flex items-center gap-1 text-sm font-bold text-genix-orange">
            View Course
            <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
