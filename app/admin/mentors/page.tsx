"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUploader from "@/app/components/admin/ImageUploader";

interface Mentor {
  _id: string;
  name: string;
  title: string;
  photo: string;
  experience: string;
  bio: string;
  credentials: string[];
  linkedin: string;
}

const EMPTY: Omit<Mentor, "_id"> = {
  name: "",
  title: "",
  photo: "",
  experience: "",
  bio: "",
  credentials: [],
  linkedin: "",
};

const inp = "w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors";

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Mentor | null>(null);
  const [form, setForm] = useState<Omit<Mentor, "_id">>(EMPTY);
  const [credentialsText, setCredentialsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function fetchMentors() {
    setLoading(true);
    const res = await fetch("/api/admin/mentors");
    if (res.ok) setMentors(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchMentors(); }, []);

  function setField(key: string, val: unknown) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function openNew() {
    setEditing(null);
    setForm(EMPTY);
    setCredentialsText("");
    setError("");
    setShowForm(true);
  }

  function openEdit(m: Mentor) {
    setEditing(m);
    setForm({ ...m });
    setCredentialsText(m.credentials.join("\n"));
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditing(null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        credentials: credentialsText.split("\n").map((c) => c.trim()).filter(Boolean),
      };
      const url = editing ? `/api/admin/mentors/${editing._id}` : "/api/admin/mentors";
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Save failed."); return; }
      closeForm();
      fetchMentors();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(m: Mentor) {
    if (!confirm(`Delete mentor "${m.name}"? They will be removed from any course that uses them.`)) return;
    const res = await fetch(`/api/admin/mentors/${m._id}`, { method: "DELETE" });
    if (res.ok) fetchMentors();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Mentors</h1>
          <p className="text-sm text-gray-400 mt-1">Pick mentors for each course under the course form.</p>
        </div>
        <button onClick={openNew} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl text-sm transition-colors">
          + Add Mentor
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-white">{editing ? "Edit Mentor" : "New Mentor"}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-400">Name *</label>
              <input className={inp} value={form.name} onChange={(e) => setField("name", e.target.value)} required />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-400">Role / Title</label>
              <input className={inp} value={form.title} onChange={(e) => setField("title", e.target.value)} placeholder="Senior Cloud Engineer" />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-400">Experience</label>
              <input className={inp} value={form.experience} onChange={(e) => setField("experience", e.target.value)} placeholder="10+ years in DevOps" />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-400">LinkedIn URL</label>
              <input className={inp} value={form.linkedin} onChange={(e) => setField("linkedin", e.target.value)} placeholder="https://linkedin.com/in/..." />
            </div>
          </div>
          <ImageUploader value={form.photo} onChange={(url) => setField("photo", url)} label="Photo" />
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-400">Description</label>
            <textarea className={inp} rows={4} value={form.bio} onChange={(e) => setField("bio", e.target.value)} placeholder="Who they are and how they teach." />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-400">Certifications / Credentials (one per line)</label>
            <textarea className={inp} rows={4} value={credentialsText} onChange={(e) => setCredentialsText(e.target.value)} />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium rounded-xl text-sm transition-colors">
              {saving ? "Saving…" : "Save Mentor"}
            </button>
            <button type="button" onClick={closeForm} className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : mentors.length === 0 ? (
        <p className="text-sm text-gray-500">No mentors yet. Add your first mentor.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {mentors.map((m) => (
            <div key={m._id} className="flex gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-800">
                {m.photo && <Image src={m.photo} alt={m.name} fill sizes="64px" className="object-cover" unoptimized />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">{m.name}</p>
                <p className="truncate text-xs text-gray-400">{m.title}</p>
                <div className="mt-2 flex gap-3 text-xs">
                  <button onClick={() => openEdit(m)} className="text-orange-400 hover:text-orange-300">Edit</button>
                  <button onClick={() => handleDelete(m)} className="text-red-400 hover:text-red-300">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
