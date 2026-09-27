import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Course from "@/app/lib/models/Course";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const courses = await Course.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(courses);
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

  if (!body.title || !body.slug) {
    return NextResponse.json({ error: "title and slug are required." }, { status: 400 });
  }

  await connectDB();

  const existing = await Course.findOne({ slug: body.slug }).lean();
  if (existing) {
    return NextResponse.json({ error: "A course with this slug already exists." }, { status: 409 });
  }

  const course = await Course.create(body);
  return NextResponse.json(course, { status: 201 });
}
