import { StarIcon } from "./icons";

/** Row of filled/half stars plus the numeric rating, used on testimonials and the reviews strip. */
export default function StarRating({
  rating,
  showNumber = true,
  className = "",
}: {
  rating: number;
  showNumber?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5 text-genix-orange">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${i < Math.round(rating) ? "opacity-100" : "opacity-25"}`}
          />
        ))}
      </div>
      {showNumber && <span className="text-sm font-semibold text-genix-ink">{rating.toFixed(1)}</span>}
    </div>
  );
}
