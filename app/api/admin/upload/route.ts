import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type. Only images are allowed." }, { status: 400 });
  }

  const maxSize = 5 * 1024 * 1024; // 5 MB
  if (file.size > maxSize) {
    return NextResponse.json({ error: "File too large. Max 5 MB." }, { status: 400 });
  }

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  const cloudinaryConfigured = !!(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET);

  if (cloudinaryConfigured) {
    try {
      const { v2: cloudinary } = await import("cloudinary");
      cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
      });

      const bytes = await file.arrayBuffer();
      const dataUri = `data:${file.type};base64,${Buffer.from(bytes).toString("base64")}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "genixacademy",
        resource_type: "image",
      });

      return NextResponse.json({ url: result.secure_url });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Cloudinary upload failed.";
      return NextResponse.json({ error: `Cloudinary error: ${message}` }, { status: 500 });
    }
  }

  // Local fallback — development only
  if (isProduction) {
    return NextResponse.json(
      { error: "Image upload is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your environment variables." },
      { status: 503 }
    );
  }

  const bytes = await file.arrayBuffer();
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, filename), Buffer.from(bytes));

  return NextResponse.json({ url: `/uploads/${filename}` });
}
