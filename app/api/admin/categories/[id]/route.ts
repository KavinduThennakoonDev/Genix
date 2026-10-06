import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Category from "@/app/lib/models/Category";

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await connectDB();
  const category = await Category.findByIdAndDelete(id).lean();
  if (!category) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
