"use client";

import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
}

const inp = "w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function fetchCategories() {
    setLoading(true);
    const res = await fetch("/api/admin/categories");
    if (res.ok) setCategories(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchCategories(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Could not add category."); return; }
      setName("");
      fetchCategories();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(c: Category) {
    if (!confirm(`Delete the category "${c.name}"? Existing courses keep their current category text.`)) return;
    const res = await fetch(`/api/admin/categories/${c._id}`, { method: "DELETE" });
    if (res.ok) fetchCategories();
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold text-white">Categories</h1>
        <p className="text-sm text-gray-400 mt-1">Categories appear as a dropdown when you create or edit a course.</p>
      </div>

      <form onSubmit={handleAdd} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
        <label className="block text-xs font-medium text-gray-400" htmlFor="cat-name">New category</label>
        <div className="flex gap-3">
          <input
            id="cat-name"
            className={inp}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. AWS DevOps"
            required
          />
          <button
            type="submit"
            disabled={saving || !name.trim()}
            className="shrink-0 px-5 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium rounded-xl text-sm transition-colors"
          >
            Add
          </button>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl divide-y divide-gray-800">
        {loading ? (
          <p className="p-5 text-sm text-gray-500">Loading…</p>
        ) : categories.length === 0 ? (
          <p className="p-5 text-sm text-gray-500">No categories yet. Add one above.</p>
        ) : (
          categories.map((c) => (
            <div key={c._id} className="flex items-center justify-between px-5 py-3">
              <span className="text-sm text-white">{c.name}</span>
              <button onClick={() => handleDelete(c)} className="text-xs text-red-400 hover:text-red-300">
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
