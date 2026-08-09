import { NextResponse } from "next/server";

/**
 * Webinar registration submission handler.
 *
 * Currently validates the payload and logs it server-side, returning a success response —
 * self-contained with no external dependency. To go live, replace the `// TODO` block below
 * with a real integration (e.g. send via Resend/SendGrid, write to a database or Google Sheet,
 * or forward to a CRM/webinar platform webhook).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const requiredFields = ["fullName", "email", "whatsapp", "referralSource", "consent"];
  const missing = requiredFields.filter((field) => !body[field]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof body.email !== "string" || !emailPattern.test(body.email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  // TODO: replace with a real integration — email notification, database write, or CRM webhook.
  console.log("[webinar-registration] New submission:", body);

  return NextResponse.json({ success: true });
}
