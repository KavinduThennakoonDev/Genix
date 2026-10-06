// Shared dropdown choices for admin forms. Client-safe (no database imports).

export const COURSE_DURATION_OPTIONS = [
  "4 Weeks",
  "6 Weeks",
  "8 Weeks",
  "10 Weeks",
  "12 Weeks",
  "16 Weeks",
  "20 Weeks",
  "24 Weeks",
];

export const COURSE_HOURS_OPTIONS = [
  "40+ Hours",
  "60+ Hours",
  "80+ Hours",
  "100+ Hours",
  "120+ Hours",
  "150+ Hours",
  "200+ Hours",
];

export const WEBINAR_DURATION_OPTIONS = ["30 Minutes", "45 Minutes", "60 Minutes", "90 Minutes", "120 Minutes"];

/** Keeps a saved value selectable even if it is no longer in the preset list (e.g. older records). */
export function withCurrentOption(options: string[], current: string) {
  return current && !options.includes(current) ? [current, ...options] : options;
}
