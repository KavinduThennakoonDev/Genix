import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWebinar extends Document {
  slug: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  speakerName: string;
  registeredCount: string;
  avatarInitials: string[];
  gradient: string;
  heroImage: string;
  introImage: string;
  introVideoTitle: string;
  overview: string;
  bento: Record<string, unknown>;
  roadmap: { title: string; description: string }[];
  skills: { label: string; mark: string }[];
  topics: Record<string, unknown>[];
  status: "upcoming" | "completed" | "cancelled";
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WebinarSchema = new Schema<IWebinar>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    date: { type: String, default: "" },
    time: { type: String, default: "" },
    duration: { type: String, default: "60 Minutes" },
    speakerName: { type: String, default: "" },
    registeredCount: { type: String, default: "0 Registered" },
    avatarInitials: [{ type: String }],
    gradient: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    introImage: { type: String, default: "" },
    introVideoTitle: { type: String, default: "" },
    overview: { type: String, default: "" },
    bento: { type: Schema.Types.Mixed, default: {} },
    roadmap: { type: Schema.Types.Mixed, default: [] },
    skills: { type: Schema.Types.Mixed, default: [] },
    topics: { type: Schema.Types.Mixed, default: [] },
    status: { type: String, enum: ["upcoming", "completed", "cancelled"], default: "upcoming" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Webinar: Model<IWebinar> =
  mongoose.models.Webinar || mongoose.model<IWebinar>("Webinar", WebinarSchema);

export default Webinar;
