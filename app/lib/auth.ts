import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE = "genix_admin_token";

function sign(payload: string): string {
  return createHmac("sha256", process.env.ADMIN_SECRET!).update(payload).digest("hex");
}

export function createToken(): string {
  const payload = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const sig = sign(payload);
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    const colonIdx = decoded.lastIndexOf(":");
    if (colonIdx === -1) return false;
    const payload = decoded.slice(0, colonIdx);
    const sig = decoded.slice(colonIdx + 1);
    const expected = sign(payload);
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  return verifyToken(token);
}

type RouteHandler = (req: Request, ctx: { params: Promise<Record<string, string>> }) => Promise<NextResponse>;

export function withAuth(handler: RouteHandler): RouteHandler {
  return async (req, ctx) => {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return handler(req, ctx);
  };
}

export const COOKIE_NAME = COOKIE;
