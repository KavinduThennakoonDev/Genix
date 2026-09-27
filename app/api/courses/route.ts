import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Course from "@/app/lib/models/Course";

export async function GET() {
  await connectDB();
  const courses = await Course.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(courses);
}
