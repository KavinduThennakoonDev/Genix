import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Webinar from "@/app/lib/models/Webinar";

export async function GET() {
  await connectDB();
  const webinars = await Webinar.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(webinars);
}
