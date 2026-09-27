"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "@/app/img/logo.png";
import Button from "./Button";
import Container from "./Container";
import { MenuIcon, XIcon } from "./icons";

/** Sticky floating pill nav, mirrors the template's rounded top nav bar. */
export default function Header({ webinarSlug = "aws-devops-career-webinar" }: { webinarSlug?: string }) {
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Webinar", href: `/webinar/${webinarSlug}` },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-genix-line bg-white px-4 py-2.5 shadow-sm sm:px-5">
          <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
            <Image src={logo} alt="Genix Academy" className="h-8 w-auto sm:h-9" priority />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-genix-charcoal transition-colors hover:bg-genix-mist hover:text-genix-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <Button href="/courses" size="md" variant="primary">
              Enroll Now
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-genix-ink lg:hidden"
          >
            {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="mt-2 flex flex-col gap-1 rounded-2xl border border-genix-line bg-white p-3 shadow-sm lg:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-genix-charcoal hover:bg-genix-mist"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/courses" size="md" variant="primary" className="mt-1 w-full">
              Enroll Now
            </Button>
          </div>
        )}
      </Container>
    </header>
  );
}
