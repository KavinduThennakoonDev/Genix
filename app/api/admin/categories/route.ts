import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Category from "@/app/lib/models/Category";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const categories = await Category.find({}).sort({ name: 1 }).lean();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { name?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) {
    return NextResponse.json({ error: "Category name is required." }, { status: 400 });
  }

  await connectDB();
  try {
    const category = await Category.create({ name });
    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "This category already exists." }, { status: 409 });
    }
    throw err;
  }
}
