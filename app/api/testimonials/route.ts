import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Testimonial from "@/app/lib/models/Testimonial";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  await connectDB();
  const filter: Record<string, unknown> = { isPublished: true };
  if (type === "course" || type === "webinar") filter.type = type;

  const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json(testimonials);
}
