"use client";

import { useEffect, useState } from "react";

interface Registration {
  _id: string;
  type: "course" | "webinar";
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  city: string;
  experienceLevel: string;
  qualification: string;
  interestedCourse: string;
  preferredBatch: string;
  learningMode: string;
  referralSource: string;
  webinarSlug: string;
  notes: string;
  status: "new" | "contacted" | "enrolled" | "rejected";
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-400",
  contacted: "bg-yellow-500/15 text-yellow-400",
  enrolled: "bg-green-500/15 text-green-400",
  rejected: "bg-red-500/15 text-red-400",
};

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selected, setSelected] = useState<Registration | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  async function fetchAll() {
    setLoading(true);
    const params = new URLSearchParams();
    if (typeFilter) params.set("type", typeFilter);
    if (statusFilter) params.set("status", statusFilter);
    const res = await fetch(`/api/admin/registrations?${params}`);
    if (res.ok) setRegistrations(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchAll(); }, [typeFilter, statusFilter]);

  async function updateStatus(id: string, status: string) {
    setUpdatingStatus(true);
    const res = await fetch(`/api/admin/registrations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setRegistrations((rs) => rs.map((r) => (r._id === id ? updated : r)));
      if (selected?._id === id) setSelected(updated);
    }
    setUpdatingStatus(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this registration?")) return;
    await fetch(`/api/admin/registrations/${id}`, { method: "DELETE" });
    setRegistrations((rs) => rs.filter((r) => r._id !== id));
    if (selected?._id === id) setSelected(null);
  }

  const counts = {
    total: registrations.length,
    new: registrations.filter((r) => r.status === "new").length,
    course: registrations.filter((r) => r.type === "course").length,
    webinar: registrations.filter((r) => r.type === "webinar").length,
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Registrations</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          {counts.total} total · {counts.course} course · {counts.webinar} webinar
          {counts.new > 0 && <span className="ml-2 text-xs font-medium bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full">{counts.new} new</span>}
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
        >
          <option value="">All Types</option>
          <option value="course">Course</option>
          <option value="webinar">Webinar</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="enrolled">Enrolled</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="flex gap-5">
        {/* List */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="text-center py-16 text-gray-400">Loading…</div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-16 text-gray-400">No registrations found.</div>
          ) : (
            <div className="space-y-2">
              {registrations.map((r) => (
                <button
                  key={r._id}
                  onClick={() => setSelected(r)}
                  className={`w-full text-left flex items-center gap-4 px-4 py-3 rounded-2xl border transition-colors ${
                    selected?._id === r._id
                      ? "bg-orange-500/10 border-orange-500/30"
                      : "bg-gray-900 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white truncate">{r.fullName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${r.type === "webinar" ? "bg-blue-500/15 text-blue-400" : "bg-orange-500/15 text-orange-400"}`}>{r.type}</span>
                    </div>
                    <div className="text-xs text-gray-400 truncate">{r.email}</div>
                    {r.interestedCourse && <div className="text-xs text-gray-500 truncate">{r.interestedCourse}</div>}
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[r.status] ?? "bg-gray-700 text-gray-400"}`}>{r.status}</span>
                    <span className="text-xs text-gray-600">{new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-80 shrink-0 bg-gray-900 border border-gray-800 rounded-2xl p-5 self-start sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white">Details</h2>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <Row label="Name" value={selected.fullName} />
              <Row label="Email" value={selected.email} />
              <Row label="WhatsApp" value={selected.whatsapp} />
              <Row label="Country" value={`${selected.city}${selected.city && selected.country ? ", " : ""}${selected.country}`} />
              <Row label="Experience" value={selected.experienceLevel} />
              <Row label="Qualification" value={selected.qualification} />
              {selected.interestedCourse && <Row label="Course" value={selected.interestedCourse} />}
              {selected.preferredBatch && <Row label="Batch" value={selected.preferredBatch} />}
              {selected.learningMode && <Row label="Mode" value={selected.learningMode} />}
              <Row label="Referral" value={selected.referralSource} />
              <Row label="Date" value={new Date(selected.createdAt).toLocaleString()} />
            </div>

            <div className="mb-4">
              <label className="block text-xs text-gray-400 mb-1">Status</label>
              <div className="flex flex-wrap gap-2">
                {["new", "contacted", "enrolled", "rejected"].map((s) => (
                  <button
                    key={s}
                    disabled={updatingStatus}
                    onClick={() => updateStatus(selected._id, s)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                      selected.status === s
                        ? `${STATUS_COLORS[s]} border-current`
                        : "border-gray-700 text-gray-400 hover:border-gray-500"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleDelete(selected._id)}
              className="w-full py-2 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
            >
              Delete Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-2">
      <span className="text-gray-500 w-24 shrink-0">{label}</span>
      <span className="text-gray-300 break-all">{value}</span>
    </div>
  );
}
