"use client";

import { useState, type FormEvent } from "react";
import Container from "@/app/components/Container";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import Button from "@/app/components/Button";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import { CheckCircleIcon } from "@/app/components/icons";
import { TextField, SelectField, CheckboxField } from "@/app/components/form/fields";
import type { Webinar } from "@/app/data/webinars";

const REFERRAL_SOURCES = ["Facebook", "Instagram", "TikTok", "Friend", "YouTube", "LinkedIn", "Other"];

/** Webinar Registration Form — Name, Email, WhatsApp, Referral Source. Posts to /api/webinar-registration. */
export default function WebinarRegistrationForm({ webinar }: { webinar: Webinar }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;

    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/webinar-registration", {
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
      <Section tone="mist" id="register">
        <Container>
          <RevealOnScroll className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-3xl border border-genix-line bg-white p-10 text-center shadow-card">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-genix-success/15 text-genix-success">
              <CheckCircleIcon className="h-7 w-7" />
            </span>
            <h2 className="text-2xl font-bold text-genix-ink">You&rsquo;re Registered! 🎉</h2>
            <p className="text-sm text-genix-charcoal/80">
              Thanks for registering for {webinar.title}. We&rsquo;ll send the join link to your WhatsApp and email
              before the session starts.
            </p>
          </RevealOnScroll>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="mist" id="register">
      <Container>
        <RevealOnScroll className="mx-auto max-w-xl">
          <SectionHeading
            align="center"
            eyebrow="Save Your Seat"
            title="Register for the"
            highlight="Free Webinar"
            description="Takes less than a minute — we'll send you the join link and a reminder before it starts."
          />

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5 rounded-3xl border border-genix-line bg-white p-6 shadow-card sm:p-8">
            <TextField label="Full Name" name="fullName" required placeholder="Jane Doe" />
            <TextField label="Email Address" type="email" name="email" required placeholder="jane@example.com" />
            <TextField label="WhatsApp Number" name="whatsapp" required placeholder="+94 7X XXX XXXX" />

            <SelectField label="How Did You Hear About This Webinar?" name="referralSource" required defaultValue="">
              <option value="" disabled>
                Select an option
              </option>
              {REFERRAL_SOURCES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </SelectField>

            <CheckboxField
              name="consent"
              checked={consent}
              onChange={setConsent}
              required
              label="I agree to be contacted by Genix Academy via email or WhatsApp about this webinar and future courses."
            />

            {status === "error" && (
              <p className="text-sm font-medium text-red-500">
                Something went wrong submitting your registration. Please try again.
              </p>
            )}

            <Button type="submit" size="lg" disabled={status === "submitting" || !consent} className="justify-center">
              {status === "submitting" ? "Submitting…" : "Register for Free"}
            </Button>
          </form>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
