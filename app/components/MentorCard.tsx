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

/** Mentor profile card, filled from the mentor entered in admin. */
export default function MentorCard({ mentor }: { mentor: MentorProfile }) {
  return (
    <div className="grid gap-6 rounded-3xl border border-genix-line bg-white p-6 shadow-card sm:grid-cols-[auto_1fr] sm:p-8">
      <div className="flex flex-col items-center gap-3 sm:items-start">
        {mentor.photo ? (
          <span className="relative h-24 w-24 overflow-hidden rounded-2xl sm:h-28 sm:w-28">
            <Image src={mentor.photo} alt={mentor.name} fill sizes="112px" className="object-cover" />
          </span>
        ) : (
          <span className="flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-genix-orange to-genix-blue text-2xl font-extrabold text-white sm:h-28 sm:w-28">
            {initialsOf(mentor.name)}
          </span>
        )}
        {mentor.linkedin && (
          <a
            href={mentor.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-genix-blue hover:underline"
          >
            <LinkedinIcon className="h-4 w-4" /> Connect on LinkedIn
          </a>
        )}
      </div>
      <div>
        <h3 className="text-xl font-bold text-genix-ink">{mentor.name}</h3>
        {mentor.title && <p className="text-sm font-semibold text-genix-orange-dark">{mentor.title}</p>}
        {mentor.experience && <p className="mt-1 text-xs font-medium text-genix-charcoal/65">{mentor.experience}</p>}
        {mentor.bio && <p className="mt-3 text-sm leading-relaxed text-genix-charcoal/85">{mentor.bio}</p>}
        {mentor.credentials.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {mentor.credentials.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full bg-genix-mist px-3 py-1.5 text-xs font-semibold text-genix-ink"
              >
                <BadgeCheckIcon className="h-3.5 w-3.5 text-genix-success" />
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
