import { connectDB } from "./db";
import Course from "./models/Course";
import Testimonial from "./models/Testimonial";
import Webinar from "./models/Webinar";
import type { Course as CourseType } from "@/app/data/courses";
import type { Testimonial as TestimonialType } from "@/app/data/testimonials";
import type { Webinar as WebinarType } from "@/app/data/webinars";

// Converts a Mongoose lean doc to a plain JSON-serializable object safe to pass to Client Components.
function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

const COURSE_DEFAULTS = {
  bento: {
    timeCommitment: "",
    whatYoullLearn: [],
    whoShouldJoin: [],
    careerOpportunities: [],
    salaryPotential: "",
    learningOutcomes: [],
  },
  roadmap: [],
  skills: [],
  curriculum: [],
  studentResultsStats: [],
  placementCompanyNames: [],
  avatarInitials: [],
  certification: { title: "", description: "", skillsValidated: [], careerValue: "" },
  pricing: { currency: "USD", originalPrice: 0, discountedPrice: 0, earlyBirdDeadline: "", promoCode: "", paymentOptions: [] },
};

function normalizeCourse<T extends Record<string, unknown>>(doc: T): T {
  return {
    ...COURSE_DEFAULTS,
    ...doc,
    bento: (doc.bento && typeof doc.bento === "object" && !Array.isArray(doc.bento) && Object.keys(doc.bento as object).length > 0)
      ? { ...COURSE_DEFAULTS.bento, ...(doc.bento as object) }
      : COURSE_DEFAULTS.bento,
    roadmap: Array.isArray(doc.roadmap) ? doc.roadmap : [],
    skills: Array.isArray(doc.skills) ? doc.skills : [],
    curriculum: Array.isArray(doc.curriculum) ? doc.curriculum : [],
    studentResultsStats: Array.isArray(doc.studentResultsStats) ? doc.studentResultsStats : [],
    placementCompanyNames: Array.isArray(doc.placementCompanyNames) ? doc.placementCompanyNames : [],
    avatarInitials: Array.isArray(doc.avatarInitials) ? doc.avatarInitials : [],
    certification: (doc.certification && typeof doc.certification === "object")
      ? { ...COURSE_DEFAULTS.certification, ...(doc.certification as object) }
      : COURSE_DEFAULTS.certification,
    pricing: (doc.pricing && typeof doc.pricing === "object")
      ? { ...COURSE_DEFAULTS.pricing, ...(doc.pricing as object) }
      : COURSE_DEFAULTS.pricing,
  };
}

const WEBINAR_DEFAULTS = {
  bento: { agenda: [], outcomes: [], careerBenefits: [], devopsOverview: "", requiredKnowledge: [], nextSteps: [] },
  roadmap: [],
  skills: [],
  topics: [],
  avatarInitials: [],
};

function normalizeWebinar<T extends Record<string, unknown>>(doc: T): T {
  return {
    ...WEBINAR_DEFAULTS,
    ...doc,
    bento: (doc.bento && typeof doc.bento === "object" && !Array.isArray(doc.bento) && Object.keys(doc.bento as object).length > 0)
      ? { ...WEBINAR_DEFAULTS.bento, ...(doc.bento as object) }
      : WEBINAR_DEFAULTS.bento,
    roadmap: Array.isArray(doc.roadmap) ? doc.roadmap : [],
    skills: Array.isArray(doc.skills) ? doc.skills : [],
    topics: Array.isArray(doc.topics) ? doc.topics : [],
    avatarInitials: Array.isArray(doc.avatarInitials) ? doc.avatarInitials : [],
  };
}

export async function getCourses(): Promise<CourseType[]> {
  await connectDB();
  const docs = await Course.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
  return serialize<Record<string, unknown>[]>(docs).map(normalizeCourse) as unknown as CourseType[];
}

export async function getCourseBySlug(slug: string): Promise<CourseType | null> {
  await connectDB();
  const doc = await Course.findOne({ slug, isPublished: true }).lean();
  return doc ? normalizeCourse(serialize<Record<string, unknown>>(doc)) as unknown as CourseType : null;
}

export async function getAllCourseSlugs(): Promise<string[]> {
  await connectDB();
  const docs = await Course.find({ isPublished: true }, { slug: 1, _id: 0 }).lean();
  return (docs as { slug: string }[]).map((d) => d.slug);
}

export async function getTestimonials(type?: "course" | "webinar"): Promise<TestimonialType[]> {
  await connectDB();
  const filter: Record<string, unknown> = { isPublished: true };
  if (type) filter.type = type;
  const docs = await Testimonial.find(filter).sort({ createdAt: -1 }).lean();
  return serialize<TestimonialType[]>(docs);
}

export async function getWebinars(): Promise<WebinarType[]> {
  await connectDB();
  const docs = await Webinar.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
  return serialize<Record<string, unknown>[]>(docs).map(normalizeWebinar) as unknown as WebinarType[];
}

export async function getWebinarBySlug(slug: string): Promise<WebinarType | null> {
  await connectDB();
  const doc = await Webinar.findOne({ slug, isPublished: true }).lean();
  return doc ? normalizeWebinar(serialize<Record<string, unknown>>(doc)) as unknown as WebinarType : null;
}

export async function getAllWebinarSlugs(): Promise<string[]> {
  await connectDB();
  const docs = await Webinar.find({ isPublished: true }, { slug: 1, _id: 0 }).lean();
  return (docs as { slug: string }[]).map((d) => d.slug);
}

export async function getFirstWebinarSlug(): Promise<string | null> {
  await connectDB();
  const doc = await Webinar.findOne({ isPublished: true }, { slug: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return (doc as { slug: string } | null)?.slug ?? null;
}
