import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Edge-compatible token verification using Web Crypto API
async function verifyEdgeToken(token: string, secret: string): Promise<boolean> {
  try {
    const decoded = atob(token.replace(/-/g, "+").replace(/_/g, "/"));
    const colonIdx = decoded.lastIndexOf(":");
    if (colonIdx === -1) return false;
    const payload = decoded.slice(0, colonIdx);
    const sig = decoded.slice(colonIdx + 1);

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigBytes = new Uint8Array(sig.match(/.{2}/g)!.map((b) => parseInt(b, 16)));
    return await crypto.subtle.verify("HMAC", key, sigBytes, enc.encode(payload));
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("genix_admin_token")?.value;
  const secret = process.env.ADMIN_SECRET ?? "";

  if (!token || !(await verifyEdgeToken(token, secret))) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
