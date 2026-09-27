import Image from "next/image";
import Link from "next/link";
import logo from "@/app/img/logo.png";
import Container from "./Container";
import { FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon, MapPinIcon, PhoneIcon, YoutubeIcon } from "./icons";

const COMPANY_LINKS = [
  { label: "Why Genix Academy", href: "/#why-genix" },
  { label: "Student Success Stories", href: "/#success-stories" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Footer({ webinarSlug = "aws-devops-career-webinar" }: { webinarSlug?: string }) {
  const EXPLORE_LINKS = [
    { label: "Home", href: "/" },
    { label: "All Courses", href: "/courses" },
    { label: "AWS DevOps Course", href: "/courses/aws-devops" },
    { label: "Azure DevOps Course", href: "/courses/azure-devops" },
    { label: "Free Webinar", href: `/webinar/${webinarSlug}` },
  ];

  return (
    <footer id="contact" className="bg-genix-ink text-white">
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image src={logo} alt="Genix Academy" className="h-9 w-auto brightness-0 invert" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              Genix Academy trains aspiring DevOps engineers through live, mentor-led classes,
              real-world projects, and dedicated placement support — turning career changers into
              confident, hireable cloud professionals.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[LinkedinIcon, InstagramIcon, YoutubeIcon, FacebookIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-genix-orange"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white/50">Explore</p>
            <ul className="mt-4 flex flex-col gap-3">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/75 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white/50">Company</p>
            <ul className="mt-4 flex flex-col gap-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/75 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white/50">Get in Touch</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-genix-orange" />
                hello@genixacademy.com
              </li>
              <li className="flex items-start gap-2.5">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-genix-orange" />
                +94 7X XXX XXXX
              </li>
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-genix-orange" />
                Colombo, Sri Lanka (Live Online Classes Worldwide)
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Genix Academy. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
