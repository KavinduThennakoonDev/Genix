import type { Metadata } from "next";
import CoursesHero from "@/app/sections/courses/CoursesHero";
import { HiringCompanies } from "@/app/sections/home/HiringAndPartners";
import UpcomingWebinar from "@/app/sections/courses/UpcomingWebinar";
import UpcomingCoursePromotion from "@/app/sections/courses/UpcomingCoursePromotion";
import AllCourses from "@/app/sections/courses/AllCourses";
import WhyGenixComparison from "@/app/sections/courses/WhyGenixComparison";

export const metadata: Metadata = {
  title: "DevOps Courses",
  description:
    "Explore Genix Academy's live, mentor-led AWS and Azure DevOps courses — real projects, certification, and placement support included.",
};

export default function CoursesPage() {
  return (
    <>
      <CoursesHero />
      <HiringCompanies />
      <UpcomingWebinar />
      <UpcomingCoursePromotion />
      <AllCourses />
      <WhyGenixComparison />
    </>
  );
}
