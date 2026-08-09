import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import CourseCard from "@/app/components/CourseCard";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { courses } from "@/app/data/courses";

/** Full "All Courses" grid on the Courses listing page. */
export default function AllCourses() {
  return (
    <Section tone="mist">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            align="center"
            eyebrow="All Courses"
            title="Pick Your"
            highlight="Cloud Track"
            description="Both tracks share the same project-first teaching method and placement support — choose the cloud platform that matches your target job market."
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
