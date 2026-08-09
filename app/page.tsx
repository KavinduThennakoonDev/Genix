import Hero from "@/app/sections/home/Hero";
import { HiringCompanies, IndustryPartners } from "@/app/sections/home/HiringAndPartners";
import FeaturedCourses from "@/app/sections/home/FeaturedCourses";
import ConsultationCTA from "@/app/sections/home/ConsultationCTA";
import SuccessStories from "@/app/sections/home/SuccessStories";
import WhyChooseUs from "@/app/sections/home/WhyChooseUs";
import { LearningJourney, TrainingMethodology } from "@/app/sections/home/LearningJourneyAndMethodology";
import { PlacementSupport, LearningStatistics } from "@/app/sections/home/PlacementAndStats";
import FaqSection from "@/app/sections/home/FaqSection";
import FinalCta from "@/app/sections/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <HiringCompanies />
      <FeaturedCourses />
      <ConsultationCTA />
      <SuccessStories />
      <WhyChooseUs />
      <LearningJourney />
      <TrainingMethodology />
      <PlacementSupport />
      <LearningStatistics />
      <IndustryPartners />
      <FaqSection />
      <FinalCta />
    </>
  );
}
