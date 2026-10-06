import Hero from "@/app/sections/home/Hero";
import CourseDeadlineBanner from "@/app/sections/home/CourseDeadlineBanner";
import FeaturedCourses from "@/app/sections/home/FeaturedCourses";
import ConsultationCTA from "@/app/sections/home/ConsultationCTA";
import SuccessStories from "@/app/sections/home/SuccessStories";
import WhyChooseUs from "@/app/sections/home/WhyChooseUs";
import { LearningJourney, TrainingMethodology } from "@/app/sections/home/LearningJourneyAndMethodology";
import { PlacementSupport } from "@/app/sections/home/PlacementAndStats";
import FinalCta from "@/app/sections/home/FinalCta";

// Course data comes from the admin database, so render per request to show new courses immediately.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <CourseDeadlineBanner />
      <Hero />
      <FeaturedCourses />
      <ConsultationCTA />
      <SuccessStories />
      <WhyChooseUs />
      <LearningJourney />
      <TrainingMethodology />
      <PlacementSupport />
      <FinalCta />
    </>
  );
}
