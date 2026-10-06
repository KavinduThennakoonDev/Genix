// Turns stored form values into reader-friendly text. Values that don't match the expected
// format (older free-text entries) are returned unchanged.

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-08-15" → "August 15, 2026". */
export function formatDisplayDate(value: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return value;
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12) return value;
  return `${MONTHS[month - 1]} ${day}, ${m[1]}`;
}

/** "19:00" → "7:00 PM". */
export function formatDisplayTime(value: string) {
  const m = /^(\d{2}):(\d{2})$/.exec(value);
  if (!m) return value;
  const hours = Number(m[1]);
  if (hours > 23) return value;
  const suffix = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${m[2]} ${suffix}`;
}
