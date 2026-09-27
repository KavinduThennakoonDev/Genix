import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourse extends Document {
  slug: string;
  title: string;
  category: string;
  status: string;
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
  bento: Record<string, unknown>;
  roadmap: { title: string; description: string }[];
  skills: { label: string; mark: string }[];
  curriculum: Record<string, unknown>[];
  certification: Record<string, unknown>;
  pricing: {
    currency: string;
    originalPrice: number;
    discountedPrice: number;
    earlyBirdDeadline: string;
    promoCode: string;
    paymentOptions: string[];
  };
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, default: "" },
    status: { type: String, default: "Enrolling Now" },
    duration: { type: String, default: "" },
    totalHours: { type: String, default: "" },
    gradient: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    introImage: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    heroDescription: { type: String, default: "" },
    studentsEnrolled: { type: String, default: "" },
    avatarInitials: [{ type: String }],
    overview: { type: String, default: "" },
    introVideoTitle: { type: String, default: "" },
    studentResultsStats: { type: Schema.Types.Mixed, default: [] },
    placementCompanyNames: [{ type: String }],
    bento: { type: Schema.Types.Mixed, default: {} },
    roadmap: { type: Schema.Types.Mixed, default: [] },
    skills: { type: Schema.Types.Mixed, default: [] },
    curriculum: { type: Schema.Types.Mixed, default: [] },
    certification: { type: Schema.Types.Mixed, default: {} },
    pricing: {
      currency: { type: String, default: "USD" },
      originalPrice: { type: Number, default: 0 },
      discountedPrice: { type: Number, default: 0 },
      earlyBirdDeadline: { type: String, default: "" },
      promoCode: { type: String, default: "" },
      paymentOptions: [{ type: String }],
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);

export default Course;
