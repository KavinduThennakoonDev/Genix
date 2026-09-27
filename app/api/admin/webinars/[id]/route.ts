import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Webinar from "@/app/lib/models/Webinar";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await connectDB();
  const webinar = await Webinar.findById(id).lean();
  if (!webinar) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(webinar);
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
  const webinar = await Webinar.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
  if (!webinar) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(webinar);
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await connectDB();
  const webinar = await Webinar.findByIdAndDelete(id).lean();
  if (!webinar) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
