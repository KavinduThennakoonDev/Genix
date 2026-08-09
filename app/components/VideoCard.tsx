"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayIcon } from "./icons";

/**
 * Poster + play-button video card. No real video asset is wired up yet — pass `image` for a
 * (placeholder) poster photo, and `src` with a real hosted video/YouTube embed when available.
 */
export default function VideoCard({
  title,
  subtitle,
  gradient = "from-genix-ink via-genix-ink-soft to-genix-blue-dark",
  className = "",
  src,
  image,
}: {
  title: string;
  subtitle?: string;
  gradient?: string;
  className?: string;
  src?: string;
  image?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing && src) {
    return (
      <div className={`overflow-hidden rounded-3xl bg-black ${className}`}>
        <video src={src} controls autoPlay className="h-full w-full" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => src && setPlaying(true)}
      className={`group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl p-8 text-left ${
        image ? "bg-genix-ink" : `bg-linear-to-br ${gradient}`
      } ${className}`}
    >
      {image && (
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div
        className={`absolute inset-0 ${
          image
            ? "bg-linear-to-t from-genix-ink via-genix-ink/40 to-genix-ink/10"
            : "bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]"
        }`}
      />
      <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white text-genix-ink shadow-soft transition-transform group-hover:scale-110">
        <PlayIcon className="ml-1 h-6 w-6" />
      </span>
      {(title || subtitle) && (
        <div className="relative z-10 mt-5 text-center text-white">
          <p className="text-base font-bold">{title}</p>
          {subtitle && <p className="mt-1 text-sm text-white/70">{subtitle}</p>}
        </div>
      )}
    </button>
  );
}
