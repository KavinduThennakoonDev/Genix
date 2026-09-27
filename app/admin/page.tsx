import { connectDB } from "@/app/lib/db";
import Course from "@/app/lib/models/Course";
import Testimonial from "@/app/lib/models/Testimonial";
import Webinar from "@/app/lib/models/Webinar";
import Registration from "@/app/lib/models/Registration";
import Link from "next/link";
import SeedButton from "@/app/components/admin/SeedButton";

async function getStats() {
  try {
    await connectDB();
    const [courses, testimonials, webinars, registrations, newRegs] = await Promise.all([
      Course.countDocuments(),
      Testimonial.countDocuments(),
      Webinar.countDocuments(),
      Registration.countDocuments(),
      Registration.countDocuments({ status: "new" }),
    ]);
    return { courses, testimonials, webinars, registrations, newRegs };
  } catch {
    return { courses: 0, testimonials: 0, webinars: 0, registrations: 0, newRegs: 0 };
  }
}

async function getRecentRegistrations() {
  try {
    await connectDB();
    return await Registration.find({}).sort({ createdAt: -1 }).limit(5).lean();
  } catch {
    return [];
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recent = await getRecentRegistrations();

  const cards = [
    { label: "Courses", value: stats.courses, href: "/admin/courses", color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "Webinars", value: stats.webinars, href: "/admin/webinars", color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Testimonials", value: stats.testimonials, href: "/admin/testimonials", color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "Registrations", value: stats.registrations, href: "/admin/registrations", color: "text-green-400", bg: "bg-green-500/10", badge: stats.newRegs > 0 ? `${stats.newRegs} new` : undefined },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Overview of your Genix Academy content.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${c.bg} mb-3`}>
              <span className={`text-lg font-bold ${c.color}`}>{c.value}</span>
            </div>
            <div className="text-sm text-gray-400">{c.label}</div>
            {c.badge && (
              <span className="mt-1 inline-block text-xs font-medium bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full">
                {c.badge}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h2 className="text-base font-semibold text-white mb-3">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: "Add Course", href: "/admin/courses?action=new" },
              { label: "Add Webinar", href: "/admin/webinars?action=new" },
              { label: "Add Testimonial", href: "/admin/testimonials?action=new" },
            ].map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="flex items-center justify-between px-4 py-2.5 bg-gray-800 hover:bg-gray-750 rounded-xl text-sm text-white transition-colors"
              >
                {a.label}
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h2 className="text-base font-semibold text-white mb-3">Seed Database</h2>
          <p className="text-sm text-gray-400 mb-4">
            Populate MongoDB with the static course, webinar, and testimonial data from the codebase.
          </p>
          <SeedButton />
        </div>
      </div>

      {/* Recent registrations */}
      {recent.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Recent Registrations</h2>
            <Link href="/admin/registrations" className="text-sm text-orange-400 hover:text-orange-300">
              View all →
            </Link>
          </div>
          <div className="space-y-2">
            {recent.map((r) => (
              <div key={String(r._id)} className="flex items-center justify-between px-4 py-2.5 bg-gray-800 rounded-xl">
                <div>
                  <div className="text-sm font-medium text-white">{r.fullName}</div>
                  <div className="text-xs text-gray-400">{r.email} · {r.type}</div>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: "bg-blue-500/15 text-blue-400",
    contacted: "bg-yellow-500/15 text-yellow-400",
    enrolled: "bg-green-500/15 text-green-400",
    rejected: "bg-red-500/15 text-red-400",
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[status] ?? "bg-gray-700 text-gray-300"}`}>
      {status}
    </span>
  );
}

