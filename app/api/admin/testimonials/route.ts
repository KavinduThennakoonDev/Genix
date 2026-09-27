import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Testimonial from "@/app/lib/models/Testimonial";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(testimonials);
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.name || !body.role || !body.quote) {
    return NextResponse.json({ error: "name, role, and quote are required." }, { status: 400 });
  }

  await connectDB();
  const testimonial = await Testimonial.create(body);
  return NextResponse.json(testimonial, { status: 201 });
}
