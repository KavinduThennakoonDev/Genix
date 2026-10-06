export interface CurriculumTopic {
  title: string;
  subtopics: string[];
}

export interface CurriculumModule {
  title: string;
  outcome: string;
  topics: CurriculumTopic[];
}

export interface Pricing {
  currency: string;
  originalPrice: number;
  discountedPrice: number;
  earlyBirdDeadline: string;
  promoCode: string;
  paymentOptions: string[];
}

export interface Course {
  slug: string;
  title: string;
  category: string;
  status?: string;
  duration: string;
  totalHours: string;
  gradient: string;
  heroImage: string;
  introImage: string;
  shortDescription: string;
  heroDescription: string;
  studentsEnrolled: string;
  avatarInitials: string[];
  overview: string;
  introVideoTitle: string;
  studentResultsStats: { value: number; suffix: string; label: string }[];
  placementCompanyNames: string[];
  bento: {
    timeCommitment: string;
    whatYoullLearn: string[];
    whoShouldJoin: string[];
    careerOpportunities: string[];
    salaryPotential: string;
    learningOutcomes: string[];
  };
  roadmap: { title: string; description: string }[];
  skills: { label: string; mark: string }[];
  curriculum: CurriculumModule[];
  certification: {
    title: string;
    description: string;
    skillsValidated: string[];
    careerValue: string;
  };
  pricing: Pricing;
  /** ISO date string, or null when no deadline is set. */
  enrollmentDeadline: string | null;
  /** Mentors assigned in admin. Populated on the course page. */
  mentors: MentorProfile[];
}

/** A mentor who runs a course, as stored in admin and shown on the course page. */
export interface MentorProfile {
  _id?: string;
  name: string;
  title: string;
  photo: string;
  experience: string;
  bio: string;
  credentials: string[];
  linkedin: string;
}
