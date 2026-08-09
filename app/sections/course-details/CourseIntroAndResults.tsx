import Image from "next/image";
import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import VideoCard from "@/app/components/VideoCard";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import type { Course } from "@/app/data/courses";
import { courseGalleryPhotos } from "@/app/data/gallery";

/** Course Introduction (video + overview) and Student Results (gallery + stats). */
export default function CourseIntroAndResults({ course }: { course: Course }) {
  return (
    <Section tone="light">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll direction="left">
            <SectionHeading eyebrow="Course Introduction" title="What This Course Is" highlight="Really Like" />
            <p className="mt-5 text-base leading-relaxed text-genix-charcoal/85 sm:text-lg">{course.overview}</p>
            <div className="mt-6">
              <VideoCard title={course.introVideoTitle} image={course.introImage} className="aspect-video" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={0.1}>
            <SectionHeading eyebrow="Student Results" title="Proof, Not" highlight="Promises" />
            <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-4">
              {courseGalleryPhotos.map((photo, i) => (
                <div key={photo + i} className="relative aspect-square overflow-hidden rounded-xl">
                  <Image src={photo} alt="" fill sizes="120px" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {course.studentResultsStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-genix-line bg-genix-mist p-4 text-center">
                  <p className="text-2xl font-extrabold text-genix-ink">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-xs font-medium text-genix-charcoal/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}
