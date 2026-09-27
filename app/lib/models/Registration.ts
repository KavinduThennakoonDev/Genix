import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRegistration extends Document {
  type: "course" | "webinar";
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  city: string;
  experienceLevel: string;
  qualification: string;
  interestedCourse: string;
  preferredBatch: string;
  learningMode: string;
  referralSource: string;
  consent: boolean;
  webinarSlug: string;
  notes: string;
  status: "new" | "contacted" | "enrolled" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    type: { type: String, enum: ["course", "webinar"], required: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    whatsapp: { type: String, default: "" },
    country: { type: String, default: "" },
    city: { type: String, default: "" },
    experienceLevel: { type: String, default: "" },
    qualification: { type: String, default: "" },
    interestedCourse: { type: String, default: "" },
    preferredBatch: { type: String, default: "" },
    learningMode: { type: String, default: "" },
    referralSource: { type: String, default: "" },
    consent: { type: Boolean, default: false },
    webinarSlug: { type: String, default: "" },
    notes: { type: String, default: "" },
    status: { type: String, enum: ["new", "contacted", "enrolled", "rejected"], default: "new" },
  },
  { timestamps: true }
);

const Registration: Model<IRegistration> =
  mongoose.models.Registration ||
  mongoose.model<IRegistration>("Registration", RegistrationSchema);

export default Registration;
