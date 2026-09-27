"use client";

import { useState } from "react";

export default function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  async function handleSeed() {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setResult(`Error: ${data.error}`);
      } else {
        setResult(`Seeded: ${data.seeded.courses} courses, ${data.seeded.webinars} webinars, ${data.seeded.testimonials} testimonials.`);
      }
    } catch {
      setResult("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleSeed}
        disabled={loading}
        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors"
      >
        {loading ? "Seeding…" : "Seed from Static Data"}
      </button>
      {result && (
        <p className={`text-xs ${result.startsWith("Error") ? "text-red-400" : "text-green-400"}`}>
          {result}
        </p>
      )}
    </div>
  );
}
