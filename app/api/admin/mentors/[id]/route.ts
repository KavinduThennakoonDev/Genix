import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Mentor from "@/app/lib/models/Mentor";

type Ctx = { params: Promise<{ id: string }> };

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
  const mentor = await Mentor.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
  if (!mentor) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(mentor);
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await connectDB();
  const mentor = await Mentor.findByIdAndDelete(id).lean();
  if (!mentor) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
