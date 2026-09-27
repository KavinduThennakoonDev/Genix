import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Registration from "@/app/lib/models/Registration";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await connectDB();
  const reg = await Registration.findById(id).lean();
  if (!reg) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(reg);
}

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { status?: string; notes?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const allowed = ["new", "contacted", "enrolled", "rejected"];
  if (body.status && !allowed.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
  }

  const { id } = await params;
  await connectDB();
  const reg = await Registration.findByIdAndUpdate(
    id,
    { $set: { ...(body.status && { status: body.status }), ...(body.notes !== undefined && { notes: body.notes }) } },
    { new: true }
  ).lean();
  if (!reg) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(reg);
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await connectDB();
  const reg = await Registration.findByIdAndDelete(id).lean();
  if (!reg) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
