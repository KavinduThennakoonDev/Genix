import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

let cachedPromise = global._mongoosePromise;

export async function connectDB(): Promise<typeof mongoose> {
  if (!cachedPromise) {
    cachedPromise = mongoose.connect(MONGODB_URI as string, { bufferCommands: false });
    global._mongoosePromise = cachedPromise;
  }
  return cachedPromise;
}
