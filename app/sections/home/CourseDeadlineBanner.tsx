import { getLatestOpenCourse } from "@/app/lib/queries";
import CourseDeadlineCountdown from "./CourseDeadlineCountdown";

/** Top-of-home banner for the newest open course, with a live enrollment countdown. Renders nothing when no course is open. */
export default async function CourseDeadlineBanner() {
  const course = await getLatestOpenCourse();
  if (!course) return null;

  return (
    <CourseDeadlineCountdown
      title={course.title}
      slug={course.slug}
      deadline={course.enrollmentDeadline}
      originalPrice={course.pricing.originalPrice}
      discountedPrice={course.pricing.discountedPrice}
      currency={course.pricing.currency}
    />
  );
}
