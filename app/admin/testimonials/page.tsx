"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUploader from "@/app/components/admin/ImageUploader";
import { useRouter } from "next/navigation";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
  photo: string;
  outcome: string;
  type: "course" | "webinar";
  isPublished: boolean;
}

const EMPTY: Omit<Testimonial, "_id"> = {
  name: "",
  role: "",
  quote: "",
  rating: 5,
  initials: "",
  photo: "",
  outcome: "",
  type: "course",
  isPublished: true,
};

export default function TestimonialsPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("action") === "new") setShowForm(true);
  }, []);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Omit<Testimonial, "_id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function fetchAll() {
    setLoading(true);
    const res = await fetch("/api/admin/testimonials");
    if (res.ok) setTestimonials(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchAll(); }, []);

  function openNew() { setEditing(null); setForm(EMPTY); setError(""); setShowForm(true); }
  function openEdit(t: Testimonial) { setEditing(t); setForm({ ...t }); setError(""); setShowForm(true); }
  function closeForm() { setShowForm(false); setEditing(null); router.replace("/admin/testimonials"); }
  function setField(key: string, val: unknown) { setForm((f) => ({ ...f, [key]: val })); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const url = editing ? `/api/admin/testimonials/${editing._id}` : "/api/admin/testimonials";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Save failed."); return; }
      await fetchAll();
      closeForm();
    } catch { setError("Network error."); } finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    await fetchAll();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-sm text-gray-400 mt-0.5">{testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={openNew} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">
          + Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading…</div>
      ) : testimonials.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <p className="text-gray-400 mb-4">No testimonials yet.</p>
          <button onClick={openNew} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">+ Add First</button>
        </div>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((t) => (
            <div key={t._id} className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden shrink-0">
                {t.photo ? (
                  <Image src={t.photo} alt={t.name} width={40} height={40} className="object-cover w-full h-full" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-orange-400">
                    {t.initials || t.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{t.name}</span>
                  <span className="text-xs text-gray-500">·</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${t.type === "webinar" ? "bg-blue-500/15 text-blue-400" : "bg-orange-500/15 text-orange-400"}`}>{t.type}</span>
                  {!t.isPublished && <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">Draft</span>}
                </div>
                <div className="text-xs text-gray-400">{t.role}</div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{t.quote}</p>
                {t.outcome && <p className="text-xs text-green-400 mt-0.5">{t.outcome}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(t)} className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">Edit</button>
                <button onClick={() => handleDelete(t._id)} className="px-3 py-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={closeForm} />
          <div className="w-full max-w-xl bg-gray-900 border-l border-gray-800 overflow-y-auto">
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
              <h2 className="text-base font-semibold text-white">{editing ? "Edit Testimonial" : "New Testimonial"}</h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}

              <ImageUploader value={form.photo} onChange={(url) => setField("photo", url)} label="Photo" />

              <div className="grid grid-cols-2 gap-4">
                <Field label="Name *">
                  <input className={inp} value={form.name} onChange={(e) => {
                    setField("name", e.target.value);
                    if (!editing) setField("initials", e.target.value.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2));
                  }} required />
                </Field>
                <Field label="Initials">
                  <input className={inp} value={form.initials} onChange={(e) => setField("initials", e.target.value)} placeholder="IP" maxLength={3} />
                </Field>
              </div>

              <Field label="Role *">
                <input className={inp} value={form.role} onChange={(e) => setField("role", e.target.value)} placeholder="DevOps Engineer, Company" required />
              </Field>

              <Field label="Quote *">
                <textarea className={inp} rows={4} value={form.quote} onChange={(e) => setField("quote", e.target.value)} required />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Rating (1–5)">
                  <input type="number" className={inp} min={1} max={5} step={0.5} value={form.rating} onChange={(e) => setField("rating", Number(e.target.value))} />
                </Field>
                <Field label="Type">
                  <select className={inp} value={form.type} onChange={(e) => setField("type", e.target.value)}>
                    <option value="course">Course</option>
                    <option value="webinar">Webinar</option>
                  </select>
                </Field>
              </div>

              <Field label="Outcome">
                <input className={inp} value={form.outcome} onChange={(e) => setField("outcome", e.target.value)} placeholder="Placed within 6 weeks of graduating" />
              </Field>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="pub-t" checked={form.isPublished} onChange={(e) => setField("isPublished", e.target.checked)} className="w-4 h-4 accent-orange-500" />
                <label htmlFor="pub-t" className="text-sm text-gray-300">Published</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium rounded-xl text-sm transition-colors">
                  {saving ? "Saving…" : editing ? "Save Changes" : "Create Testimonial"}
                </button>
                <button type="button" onClick={closeForm} className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm transition-colors">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-400">{label}</label>
      {children}
    </div>
  );
}

const inp = "w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors";
