import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Registration from "@/app/lib/models/Registration";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const requiredFields = [
    "fullName",
    "email",
    "whatsapp",
    "country",
    "city",
    "experienceLevel",
    "qualification",
    "interestedCourse",
    "preferredBatch",
    "learningMode",
    "referralSource",
    "consent",
  ];

  const missing = requiredFields.filter((field) => !body[field]);
  if (missing.length > 0) {
    return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof body.email !== "string" || !emailPattern.test(body.email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  await connectDB();
  await Registration.create({ ...body, type: "course", consent: body.consent === true || body.consent === "on" || body.consent === "true" });

  return NextResponse.json({ success: true });
}
