import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Registration from "@/app/lib/models/Registration";

export async function GET(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");

  const filter: Record<string, string> = {};
  if (type === "course" || type === "webinar") filter.type = type;
  if (status) filter.status = status;

  await connectDB();
  const registrations = await Registration.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json(registrations);
}
