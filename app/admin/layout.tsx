import type { Metadata } from "next";
import AdminShell from "@/app/components/admin/AdminShell";

export const metadata: Metadata = { title: "Admin — Genix Academy" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
