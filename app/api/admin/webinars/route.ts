import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Webinar from "@/app/lib/models/Webinar";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const webinars = await Webinar.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(webinars);
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

  const existing = await Webinar.findOne({ slug: body.slug }).lean();
  if (existing) {
    return NextResponse.json({ error: "A webinar with this slug already exists." }, { status: 409 });
  }

  const webinar = await Webinar.create(body);
  return NextResponse.json(webinar, { status: 201 });
}
