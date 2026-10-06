import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import Button from "@/app/components/Button";
import CourseCard from "@/app/components/CourseCard";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { getCourses } from "@/app/lib/queries";

/** Featured Courses grid on Home. */
export default async function FeaturedCourses() {
  const courses = await getCourses();
  if (courses.length === 0) return null;
  return (
    <Section tone="light">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Featured Programs"
            title="Career-Defining"
            highlight="DevOps Courses"
            description="Structured, mentor-led programs built around real cloud infrastructure — not slideshows. Pick your track and start building a portfolio employers notice."
            action={
              <Button href="/courses" variant="secondary">
                View All Courses
              </Button>
            }
          />
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {courses.map((course, i) => (
            <RevealOnScroll key={course.slug} delay={i * 0.08}>
              <CourseCard course={course} />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  );
}
