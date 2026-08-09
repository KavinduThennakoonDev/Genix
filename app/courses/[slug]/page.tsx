import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses, getCourseBySlug } from "@/app/data/courses";
import CourseHero from "@/app/sections/course-details/CourseHero";
import CourseIntroAndResults from "@/app/sections/course-details/CourseIntroAndResults";
import PlacementAndBento from "@/app/sections/course-details/PlacementAndBento";
import RoadmapAndSkills from "@/app/sections/course-details/RoadmapAndSkills";
import CurriculumSection from "@/app/sections/course-details/CurriculumSection";
import CertificationAndMentor from "@/app/sections/course-details/CertificationAndMentor";
import TestimonialsAndPricing from "@/app/sections/course-details/TestimonialsAndPricing";
import ComparisonAndContact from "@/app/sections/course-details/ComparisonAndContact";
import CourseFaqSection from "@/app/sections/course-details/CourseFaqSection";
import CourseRegistrationForm from "@/app/sections/course-details/CourseRegistrationForm";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const course = getCourseBySlug(slug);
  if (!course) return {};

  return {
    title: course.title,
    description: course.heroDescription,
  };
}

export default async function CourseDetailsPage(props: PageProps<"/courses/[slug]">) {
  const { slug } = await props.params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  return (
    <>
      <CourseHero course={course} />
      <CourseIntroAndResults course={course} />
      <PlacementAndBento course={course} />
      <RoadmapAndSkills course={course} />
      <CurriculumSection course={course} />
      <CertificationAndMentor course={course} />
      <TestimonialsAndPricing course={course} />
      <ComparisonAndContact />
      <CourseFaqSection />
      <CourseRegistrationForm course={course} />
    </>
  );
}
