import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getFirstWebinarSlug } from "./lib/queries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Genix Academy | Become a Job-Ready DevOps Engineer",
    template: "%s | Genix Academy",
  },
  description:
    "Genix Academy trains aspiring DevOps engineers through live mentor-led classes, real-world AWS & Azure projects, and dedicated placement support. Enroll in the AWS DevOps Masterclass today.",
  keywords: [
    "DevOps course",
    "AWS DevOps training",
    "Azure DevOps course",
    "DevOps bootcamp",
    "Genix Academy",
    "learn DevOps online",
    "DevOps career change",
  ],
  openGraph: {
    title: "Genix Academy | Become a Job-Ready DevOps Engineer",
    description:
      "Live mentor-led DevOps training with real-world projects, certification, and placement support.",
    siteName: "Genix Academy",
    type: "website",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const webinarSlug = await getFirstWebinarSlug().catch(() => null) ?? "aws-devops-career-webinar";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-genix-ink">
        <Header webinarSlug={webinarSlug} />
        <main className="flex-1">{children}</main>
        <Footer webinarSlug={webinarSlug} />
      </body>
    </html>
  );
}
