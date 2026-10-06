import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMentor extends Document {
  name: string;
  title: string;
  photo: string;
  experience: string;
  bio: string;
  credentials: string[];
  linkedin: string;
  createdAt: Date;
  updatedAt: Date;
}

const MentorSchema = new Schema<IMentor>(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, default: "", trim: true },
    photo: { type: String, default: "" },
    experience: { type: String, default: "", trim: true },
    bio: { type: String, default: "" },
    credentials: [{ type: String }],
    linkedin: { type: String, default: "" },
  },
  { timestamps: true }
);

// Recompile on every load so schema changes apply during dev hot-reload (see Course model).
if (mongoose.models.Mentor) mongoose.deleteModel("Mentor");
const Mentor: Model<IMentor> = mongoose.model<IMentor>("Mentor", MentorSchema);

export default Mentor;
