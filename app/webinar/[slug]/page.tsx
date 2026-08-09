import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { webinars, getWebinarBySlug } from "@/app/data/webinars";
import WebinarHero from "@/app/sections/webinar-details/WebinarHero";
import WebinarRegistrationForm from "@/app/sections/webinar-details/WebinarRegistrationForm";
import GalleryAndPlacement from "@/app/sections/webinar-details/GalleryAndPlacement";
import BentoAndRoadmap from "@/app/sections/webinar-details/BentoAndRoadmap";
import SkillsAndTopics from "@/app/sections/webinar-details/SkillsAndTopics";
import CertificationMentorTestimonials from "@/app/sections/webinar-details/CertificationMentorTestimonials";
import ComparisonAndContact from "@/app/sections/course-details/ComparisonAndContact";
import WebinarFaqSection from "@/app/sections/webinar-details/WebinarFaqSection";

export function generateStaticParams() {
  return webinars.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(props: PageProps<"/webinar/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const webinar = getWebinarBySlug(slug);
  if (!webinar) return {};

  return {
    title: webinar.title,
    description: webinar.overview,
  };
}

export default async function WebinarDetailsPage(props: PageProps<"/webinar/[slug]">) {
  const { slug } = await props.params;
  const webinar = getWebinarBySlug(slug);

  if (!webinar) notFound();

  return (
    <>
      <WebinarHero webinar={webinar} />
      <WebinarRegistrationForm webinar={webinar} />
      <GalleryAndPlacement />
      <BentoAndRoadmap webinar={webinar} />
      <SkillsAndTopics webinar={webinar} />
      <CertificationMentorTestimonials />
      <ComparisonAndContact />
      <WebinarFaqSection />
    </>
  );
}
