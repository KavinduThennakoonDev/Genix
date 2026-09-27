import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
  photo: string;
  outcome: string;
  type: "course" | "webinar";
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    quote: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    initials: { type: String, required: true },
    photo: { type: String, default: "" },
    outcome: { type: String, default: "" },
    type: { type: String, enum: ["course", "webinar"], default: "course" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
