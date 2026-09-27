import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import Course from "@/app/lib/models/Course";
import Testimonial from "@/app/lib/models/Testimonial";
import Webinar from "@/app/lib/models/Webinar";
import { courses } from "@/app/data/seed-courses";
import { testimonials, webinarTestimonials } from "@/app/data/seed-testimonials";
import { webinars } from "@/app/data/seed-webinars";

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const results: Record<string, unknown> = {};

  // Seed courses
  for (const course of courses) {
    await Course.findOneAndUpdate(
      { slug: course.slug },
      { ...course, isPublished: true },
      { upsert: true, new: true }
    );
  }
  results.courses = courses.length;

  // Seed testimonials
  for (const t of testimonials) {
    await Testimonial.findOneAndUpdate(
      { name: t.name, role: t.role },
      { ...t, type: "course", isPublished: true },
      { upsert: true, new: true }
    );
  }
  for (const t of webinarTestimonials) {
    await Testimonial.findOneAndUpdate(
      { name: t.name, role: t.role },
      { ...t, type: "webinar", isPublished: true },
      { upsert: true, new: true }
    );
  }
  results.testimonials = testimonials.length + webinarTestimonials.length;

  // Seed webinars
  for (const w of webinars) {
    await Webinar.findOneAndUpdate(
      { slug: w.slug },
      { ...w, status: "upcoming", isPublished: true },
      { upsert: true, new: true }
    );
  }
  results.webinars = webinars.length;

  return NextResponse.json({ success: true, seeded: results });
}
