"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUploader from "@/app/components/admin/ImageUploader";
import { COURSE_DURATION_OPTIONS, COURSE_HOURS_OPTIONS, withCurrentOption } from "@/app/lib/options";
import { useRouter } from "next/navigation";

interface Course {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  duration: string;
  totalHours: string;
  heroImage: string;
  shortDescription: string;
  heroDescription: string;
  overview: string;
  pricing: {
    currency: string;
    originalPrice: number;
    discountedPrice: number;
    earlyBirdDeadline: string;
    promoCode: string;
    paymentOptions: string[];
  };
  enrollmentDeadline: string | null;
  mentors: string[];
  isPublished: boolean;
}

const EMPTY: Omit<Course, "_id"> = {
  title: "",
  slug: "",
  category: "",
  status: "Enrolling Now",
  duration: "12 Weeks",
  totalHours: "120+ Hours",
  heroImage: "",
  shortDescription: "",
  heroDescription: "",
  overview: "",
  pricing: { currency: "USD", originalPrice: 0, discountedPrice: 0, earlyBirdDeadline: "", promoCode: "", paymentOptions: [] },
  enrollmentDeadline: "",
  mentors: [],
  isPublished: true,
};

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [mentorOptions, setMentorOptions] = useState<{ _id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("action") === "new") setShowForm(true);
  }, []);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState<Omit<Course, "_id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function fetchCourses() {
    setLoading(true);
    const res = await fetch("/api/admin/courses");
    if (res.ok) setCourses(await res.json());
    setLoading(false);
  }

  async function fetchCategories() {
    const res = await fetch("/api/admin/categories");
    if (res.ok) setCategories(await res.json());
  }

  async function fetchMentorOptions() {
    const res = await fetch("/api/admin/mentors");
    if (res.ok) setMentorOptions(await res.json());
  }

  useEffect(() => { fetchCourses(); fetchCategories(); fetchMentorOptions(); }, []);

  function openNew() {
    setEditing(null);
    setForm(EMPTY);
    setError("");
    setShowForm(true);
  }

  function openEdit(c: Course) {
    setEditing(c);
    setForm({ ...c, enrollmentDeadline: toLocalInput(c.enrollmentDeadline), mentors: c.mentors ?? [] });
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditing(null);
    router.replace("/admin/courses");
  }

  function setField(key: string, val: unknown) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function setPricingField(key: string, val: unknown) {
    setForm((f) => ({ ...f, pricing: { ...f.pricing, [key]: val } }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const url = editing ? `/api/admin/courses/${editing._id}` : "/api/admin/courses";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          enrollmentDeadline: form.enrollmentDeadline ? new Date(form.enrollmentDeadline).toISOString() : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Save failed."); return; }
      await fetchCourses();
      closeForm();
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this course?")) return;
    await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
    await fetchCourses();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Courses</h1>
          <p className="text-sm text-gray-400 mt-0.5">{courses.length} course{courses.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={openNew} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">
          + Add Course
        </button>
      </div>

      {/* Course list */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading…</div>
      ) : courses.length === 0 ? (
        <EmptyState onAdd={openNew} />
      ) : (
        <div className="grid gap-4">
          {courses.map((c) => (
            <div key={c._id} className="flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                {c.heroImage ? (
                  <Image src={c.heroImage} alt={c.title} width={64} height={48} className="object-cover w-full h-full" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white truncate">{c.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${c.isPublished ? "bg-green-500/15 text-green-400" : "bg-gray-700 text-gray-400"}`}>
                    {c.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{c.slug} · {c.status} · {c.duration}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  ${c.pricing?.discountedPrice ?? 0} {c.pricing?.currency ?? "USD"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(c)} className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">Edit</button>
                <button onClick={() => handleDelete(c._id)} className="px-3 py-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide-over form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={closeForm} />
          <div className="w-full max-w-xl bg-gray-900 border-l border-gray-800 overflow-y-auto">
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
              <h2 className="text-base font-semibold text-white">{editing ? "Edit Course" : "New Course"}</h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}

              <ImageUploader value={form.heroImage} onChange={(url) => setField("heroImage", url)} label="Hero Image" />

              <Field label="Title *" required>
                <input className={inp} value={form.title} onChange={(e) => { setField("title", e.target.value); if (!editing) setField("slug", slugify(e.target.value)); }} required />
              </Field>

              <Field label="Slug *" required>
                <input className={inp} value={form.slug} onChange={(e) => setField("slug", e.target.value)} required />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Category">
                  <select className={inp} value={form.category} onChange={(e) => setField("category", e.target.value)}>
                    <option value="">{categories.length ? "Select a category" : "No categories yet, add one under Categories"}</option>
                    {withCurrentOption(categories.map((c) => c.name), form.category).map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Status">
                  <select className={inp} value={form.status} onChange={(e) => setField("status", e.target.value)}>
                    <option>Enrolling Now</option>
                    <option>Coming Soon</option>
                    <option>Closed</option>
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Duration">
                  <select className={inp} value={form.duration} onChange={(e) => setField("duration", e.target.value)}>
                    {withCurrentOption(COURSE_DURATION_OPTIONS, form.duration).map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Total Hours">
                  <select className={inp} value={form.totalHours} onChange={(e) => setField("totalHours", e.target.value)}>
                    {withCurrentOption(COURSE_HOURS_OPTIONS, form.totalHours).map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Short Description">
                <textarea className={inp} rows={2} value={form.shortDescription} onChange={(e) => setField("shortDescription", e.target.value)} />
              </Field>

              <Field label="Hero Description">
                <textarea className={inp} rows={3} value={form.heroDescription} onChange={(e) => setField("heroDescription", e.target.value)} />
              </Field>

              <Field label="Mentors (who conducts this course)">
                {(() => {
                  const selected = form.mentors ?? [];
                  const available = mentorOptions.filter((m) => !selected.includes(m._id));
                  const byId = new Map(mentorOptions.map((m) => [m._id, m.name]));
                  return (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {selected.length === 0 && <p className="text-xs text-gray-500">No mentors selected yet.</p>}
                        {selected.map((id) => (
                          <span key={id} className="inline-flex items-center gap-2 rounded-full bg-orange-500/15 px-3 py-1 text-sm text-orange-300">
                            {byId.get(id) ?? "Removed mentor"}
                            <button
                              type="button"
                              onClick={() => setField("mentors", selected.filter((x) => x !== id))}
                              className="text-orange-300 hover:text-white"
                              aria-label="Remove mentor"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <select
                        className={inp}
                        value=""
                        disabled={mentorOptions.length === 0}
                        onChange={(e) => {
                          const id = e.target.value;
                          if (id) setField("mentors", [...selected, id]);
                        }}
                      >
                        <option value="">
                          {mentorOptions.length === 0
                            ? "No mentors yet, add them under Mentors first"
                            : available.length === 0
                              ? "All mentors are selected"
                              : "Select a mentor to add…"}
                        </option>
                        {available.map((m) => (
                          <option key={m._id} value={m._id}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                  );
                })()}
              </Field>

              <Field label="Overview">
                <textarea className={inp} rows={4} value={form.overview} onChange={(e) => setField("overview", e.target.value)} />
              </Field>

              <div className="border border-gray-800 rounded-xl p-4 space-y-3">
                <p className="text-sm font-medium text-gray-300">Pricing</p>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Original Price">
                    <input type="number" className={inp} value={form.pricing.originalPrice} onChange={(e) => setPricingField("originalPrice", Number(e.target.value))} />
                  </Field>
                  <Field label="Discounted Price">
                    <input type="number" className={inp} value={form.pricing.discountedPrice} onChange={(e) => setPricingField("discountedPrice", Number(e.target.value))} />
                  </Field>
                </div>
                <Field label="Promo Code">
                  <input className={inp} value={form.pricing.promoCode} onChange={(e) => setPricingField("promoCode", e.target.value)} />
                </Field>
                <Field label="Early Bird Deadline">
                  <input type="date" className={inp} value={form.pricing.earlyBirdDeadline} onChange={(e) => setPricingField("earlyBirdDeadline", e.target.value)} />
                </Field>
              </div>

              <Field label="Enrollment Deadline (drives the home page countdown banner)">
                <input type="datetime-local" className={inp} value={form.enrollmentDeadline ?? ""} onChange={(e) => setField("enrollmentDeadline", e.target.value)} />
              </Field>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="published" checked={form.isPublished} onChange={(e) => setField("isPublished", e.target.checked)} className="w-4 h-4 accent-orange-500" />
                <label htmlFor="published" className="text-sm text-gray-300">Published</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium rounded-xl text-sm transition-colors">
                  {saving ? "Saving…" : editing ? "Save Changes" : "Create Course"}
                </button>
                <button type="button" onClick={closeForm} className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <p className="text-gray-400 mb-4">No courses yet. Seed from static data or add one manually.</p>
      <button onClick={onAdd} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">
        + Add First Course
      </button>
    </div>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-400">
        {label}{required && <span className="text-orange-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inp = "w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors";

/** Converts an ISO date from the API into the value a datetime-local input expects (local time). */
function toLocalInput(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
