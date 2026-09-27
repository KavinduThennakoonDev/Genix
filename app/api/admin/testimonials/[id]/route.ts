import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Testimonial from "@/app/lib/models/Testimonial";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await connectDB();
  const testimonial = await Testimonial.findById(id).lean();
  if (!testimonial) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(testimonial);
}

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { id } = await params;
  await connectDB();
  const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
  if (!testimonial) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(testimonial);
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await connectDB();
  const testimonial = await Testimonial.findByIdAndDelete(id).lean();
  if (!testimonial) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
