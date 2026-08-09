import Image from "next/image";
import StarRating from "./StarRating";
import { QuoteIcon } from "./icons";
import type { Testimonial } from "@/app/data/testimonials";

/** Student success-story card: photo (or initials fallback), quote, rating, and a career-outcome chip. */
export default function TestimonialCard({ testimonial, className = "" }: { testimonial: Testimonial; className?: string }) {
  return (
    <div className={`flex h-full flex-col justify-between rounded-2xl border border-genix-line bg-white p-6 shadow-card sm:p-7 ${className}`}>
      <div>
        <QuoteIcon className="h-7 w-9 text-genix-orange/30" />
        <p className="mt-4 text-[15px] leading-relaxed text-genix-charcoal">&ldquo;{testimonial.quote}&rdquo;</p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-genix-line pt-5">
        <div className="flex items-center gap-3">
          {testimonial.photo ? (
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
              <Image src={testimonial.photo} alt={testimonial.name} fill sizes="44px" className="object-cover" />
            </span>
          ) : (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-genix-blue to-genix-orange text-sm font-bold text-white">
              {testimonial.initials}
            </span>
          )}
          <div>
            <p className="text-sm font-bold text-genix-ink">{testimonial.name}</p>
            <p className="text-xs text-genix-charcoal/70">{testimonial.role}</p>
          </div>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>
      {testimonial.outcome && (
        <p className="mt-3 rounded-lg bg-genix-success/10 px-3 py-2 text-xs font-semibold text-genix-success">
          {testimonial.outcome}
        </p>
      )}
    </div>
  );
}
