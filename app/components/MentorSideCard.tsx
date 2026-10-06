import Image from "next/image";
import { BadgeCheckIcon, LinkedinIcon } from "./icons";
import type { MentorProfile } from "@/app/data/courses";

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/** Mentor card for the course page: large photo on top, then role, bio, credentials and LinkedIn. */
export default function MentorSideCard({ mentor }: { mentor: MentorProfile }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-genix-line bg-white shadow-card">
      <div className="relative aspect-4/3 w-full bg-genix-mist">
        {mentor.photo ? (
          <Image
            src={mentor.photo}
            alt={mentor.name}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-genix-orange to-genix-blue text-5xl font-extrabold text-white">
            {initialsOf(mentor.name)}
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-genix-ink shadow-sm">
          Your Mentor
        </span>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div>
          <h3 className="text-xl font-extrabold text-genix-ink">{mentor.name}</h3>
          {mentor.title && <p className="mt-0.5 text-sm font-semibold text-genix-orange-dark">{mentor.title}</p>}
          {mentor.experience && (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-genix-mist px-3 py-1 text-xs font-semibold text-genix-ink">
              {mentor.experience}
            </p>
          )}
        </div>

        {mentor.bio && <p className="text-sm leading-relaxed text-genix-charcoal/85">{mentor.bio}</p>}

        {mentor.credentials.length > 0 && (
          <ul className="flex flex-col gap-2 border-t border-genix-line pt-4">
            {mentor.credentials.slice(0, 4).map((c) => (
              <li key={c} className="flex items-start gap-2 text-xs font-medium text-genix-ink">
                <BadgeCheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-genix-success" />
                {c}
              </li>
            ))}
          </ul>
        )}

        {mentor.linkedin && (
          <a
            href={mentor.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-genix-line px-4 py-2 text-xs font-semibold text-genix-blue transition-colors hover:border-genix-blue"
          >
            <LinkedinIcon className="h-4 w-4" /> Connect on LinkedIn
          </a>
        )}
      </div>
    </article>
  );
}
