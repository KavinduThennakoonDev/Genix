"use client";

import { useState, type FormEvent } from "react";
import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import Button from "@/app/components/Button";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { CheckCircleIcon } from "@/app/components/icons";
import { TextField, SelectField, TextAreaField, CheckboxField } from "@/app/components/form/fields";
import type { Course } from "@/app/data/courses";

const EXPERIENCE_LEVELS = ["Fresher / Student", "0–1 Years", "1–3 Years", "3–5 Years", "5+ Years"];
const QUALIFICATIONS = ["High School", "Diploma", "Bachelor's Degree", "Master's Degree", "Other"];
const BATCHES = ["Weekday Batch", "Weekend Batch", "Flexible / Either"];
const LEARNING_MODES = ["Online", "Hybrid"];
const REFERRAL_SOURCES = ["Facebook", "Instagram", "TikTok", "YouTube", "LinkedIn", "Google Search", "Friend / Referral", "Other"];

interface Props {
  course: Course;
  courseList: { slug: string; title: string }[];
}

/** Course Registration Form — posts to /api/course-registration. */
export default function CourseRegistrationForm({ course, courseList }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;

    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/course-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Section tone="light" id="register">
        <Container>
          <RevealOnScroll className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-3xl border border-genix-line bg-genix-mist p-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-genix-success/15 text-genix-success">
              <CheckCircleIcon className="h-7 w-7" />
            </span>
            <h2 className="text-2xl font-bold text-genix-ink">You&rsquo;re Registered! 🎉</h2>
            <p className="text-sm text-genix-charcoal/80">
              Thanks for registering for {course.title}. Our admissions team will reach out over WhatsApp or email
              within 24 hours to confirm your seat and next steps.
            </p>
          </RevealOnScroll>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="light" id="register">
      <Container>
        <RevealOnScroll className="mx-auto max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="Register Now"
            title="Reserve Your Seat in"
            highlight={course.title}
            description="Fill out the form below and our admissions team will follow up to confirm your batch and answer any questions."
          />

          <form onSubmit={handleSubmit} className="mt-10 grid gap-5 rounded-3xl border border-genix-line bg-white p-6 shadow-card sm:grid-cols-2 sm:p-8">
            <TextField label="Full Name" name="fullName" required placeholder="Jane Doe" />
            <TextField label="Email Address" type="email" name="email" required placeholder="jane@example.com" />
            <TextField label="WhatsApp Number" name="whatsapp" required placeholder="+94 7X XXX XXXX" />
            <TextField label="Phone Number" name="phone" placeholder="+94 7X XXX XXXX" />
            <TextField label="Country" name="country" required placeholder="Sri Lanka" />
            <TextField label="City" name="city" required placeholder="Colombo" />
            <TextField label="Current Job Title" name="jobTitle" placeholder="e.g. QA Engineer, Student, Support Analyst" />

            <SelectField label="Experience Level" name="experienceLevel" required defaultValue="">
              <option value="" disabled>
                Select your experience level
              </option>
              {EXPERIENCE_LEVELS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </SelectField>

            <SelectField label="Highest Qualification" name="qualification" required defaultValue="">
              <option value="" disabled>
                Select your qualification
              </option>
              {QUALIFICATIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </SelectField>

            <SelectField label="Interested Course" name="interestedCourse" required defaultValue={course.slug}>
              {courseList.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </SelectField>

            <SelectField label="Preferred Batch" name="preferredBatch" required defaultValue="">
              <option value="" disabled>
                Select a preferred batch
              </option>
              {BATCHES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </SelectField>

            <SelectField label="Learning Mode" name="learningMode" required defaultValue="">
              <option value="" disabled>
                Online or Hybrid?
              </option>
              {LEARNING_MODES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </SelectField>

            <SelectField label="How Did You Hear About Us?" name="referralSource" required defaultValue="">
              <option value="" disabled>
                Select an option
              </option>
              {REFERRAL_SOURCES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </SelectField>

            <TextAreaField
              label="Questions or Comments"
              name="comments"
              placeholder="Anything you'd like us to know before we reach out?"
              className="sm:col-span-2"
            />

            <div className="sm:col-span-2">
              <CheckboxField
                name="consent"
                checked={consent}
                onChange={setConsent}
                required
                label={
                  <>
                    I agree to be contacted by Genix Academy via email, phone, or WhatsApp regarding this
                    registration, and I accept the Privacy Policy and Terms of Service.
                  </>
                }
              />
            </div>

            {status === "error" && (
              <p className="text-sm font-medium text-red-500 sm:col-span-2">
                Something went wrong submitting your registration. Please try again.
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={status === "submitting" || !consent}
              className="sm:col-span-2 justify-center"
            >
              {status === "submitting" ? "Submitting…" : "Register Now"}
            </Button>
          </form>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
