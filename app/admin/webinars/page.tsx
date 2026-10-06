"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUploader from "@/app/components/admin/ImageUploader";
import { useRouter } from "next/navigation";
import { WEBINAR_DURATION_OPTIONS, withCurrentOption } from "@/app/lib/options";

interface Webinar {
  _id: string;
  title: string;
  slug: string;
  date: string;
  time: string;
  duration: string;
  speakerName: string;
  registeredCount: string;
  heroImage: string;
  overview: string;
  status: "upcoming" | "completed" | "cancelled";
  isPublished: boolean;
}

const EMPTY: Omit<Webinar, "_id"> = {
  title: "",
  slug: "",
  date: "",
  time: "",
  duration: "60 Minutes",
  speakerName: "",
  registeredCount: "0 Registered",
  heroImage: "",
  overview: "",
  status: "upcoming",
  isPublished: true,
};

export default function WebinarsPage() {
  const router = useRouter();
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("action") === "new") setShowForm(true);
  }, []);
  const [editing, setEditing] = useState<Webinar | null>(null);
  const [form, setForm] = useState<Omit<Webinar, "_id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function fetchAll() {
    setLoading(true);
    const res = await fetch("/api/admin/webinars");
    if (res.ok) setWebinars(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchAll(); }, []);

  function openNew() { setEditing(null); setForm(EMPTY); setError(""); setShowForm(true); }
  function openEdit(w: Webinar) { setEditing(w); setForm({ ...w }); setError(""); setShowForm(true); }
  function closeForm() { setShowForm(false); setEditing(null); router.replace("/admin/webinars"); }
  function setField(key: string, val: unknown) { setForm((f) => ({ ...f, [key]: val })); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const url = editing ? `/api/admin/webinars/${editing._id}` : "/api/admin/webinars";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Save failed."); return; }
      await fetchAll();
      closeForm();
    } catch { setError("Network error."); } finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this webinar?")) return;
    await fetch(`/api/admin/webinars/${id}`, { method: "DELETE" });
    await fetchAll();
  }

  const statusColors: Record<string, string> = {
    upcoming: "bg-blue-500/15 text-blue-400",
    completed: "bg-green-500/15 text-green-400",
    cancelled: "bg-red-500/15 text-red-400",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Webinars</h1>
          <p className="text-sm text-gray-400 mt-0.5">{webinars.length} webinar{webinars.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={openNew} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">
          + Add Webinar
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading…</div>
      ) : webinars.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <p className="text-gray-400 mb-4">No webinars yet.</p>
          <button onClick={openNew} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">+ Add First</button>
        </div>
      ) : (
        <div className="grid gap-4">
          {webinars.map((w) => (
            <div key={w._id} className="flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                {w.heroImage ? (
                  <Image src={w.heroImage} alt={w.title} width={64} height={48} className="object-cover w-full h-full" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white truncate">{w.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[w.status] ?? "bg-gray-700 text-gray-400"}`}>{w.status}</span>
                  {!w.isPublished && <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">Draft</span>}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{w.date} · {w.time} · {w.duration}</div>
                <div className="text-xs text-gray-500">{w.speakerName} · {w.registeredCount}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(w)} className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">Edit</button>
                <button onClick={() => handleDelete(w._id)} className="px-3 py-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">Delete</button>
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
              <h2 className="text-base font-semibold text-white">{editing ? "Edit Webinar" : "New Webinar"}</h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}

              <ImageUploader value={form.heroImage} onChange={(url) => setField("heroImage", url)} label="Hero Image" />

              <Field label="Title *">
                <input className={inp} value={form.title} onChange={(e) => { setField("title", e.target.value); if (!editing) setField("slug", slugify(e.target.value)); }} required />
              </Field>

              <Field label="Slug *">
                <input className={inp} value={form.slug} onChange={(e) => setField("slug", e.target.value)} required />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Date">
                  <input type="date" className={inp} value={form.date} onChange={(e) => setField("date", e.target.value)} />
                </Field>
                <Field label="Time">
                  <input type="time" className={inp} value={form.time} onChange={(e) => setField("time", e.target.value)} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Duration">
                  <select className={inp} value={form.duration} onChange={(e) => setField("duration", e.target.value)}>
                    {withCurrentOption(WEBINAR_DURATION_OPTIONS, form.duration).map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Registered Count">
                  <input className={inp} value={form.registeredCount} onChange={(e) => setField("registeredCount", e.target.value)} placeholder="180+ Registered" />
                </Field>
              </div>

              <Field label="Speaker Name">
                <input className={inp} value={form.speakerName} onChange={(e) => setField("speakerName", e.target.value)} placeholder="Nuwan Perera, Lead DevOps Mentor" />
              </Field>

              <Field label="Overview">
                <textarea className={inp} rows={4} value={form.overview} onChange={(e) => setField("overview", e.target.value)} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Status">
                  <select className={inp} value={form.status} onChange={(e) => setField("status", e.target.value)}>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </Field>
                <div className="flex items-end pb-2">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="pub-w" checked={form.isPublished} onChange={(e) => setField("isPublished", e.target.checked)} className="w-4 h-4 accent-orange-500" />
                    <label htmlFor="pub-w" className="text-sm text-gray-300">Published</label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium rounded-xl text-sm transition-colors">
                  {saving ? "Saving…" : editing ? "Save Changes" : "Create Webinar"}
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

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
