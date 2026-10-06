import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Mentor from "@/app/lib/models/Mentor";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const mentors = await Mentor.find({}).sort({ name: 1 }).lean();
  return NextResponse.json(mentors);
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
  if (typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "Mentor name is required." }, { status: 400 });
  }

  await connectDB();
  const mentor = await Mentor.create(body);
  return NextResponse.json(mentor, { status: 201 });
}
