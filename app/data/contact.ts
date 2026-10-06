/** Admissions contact details. Digits only (no +, spaces) for wa.me links. */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "94703161203";

/** Formats the digits for display, e.g. 94703161203 → +94 70 316 1203. */
export const WHATSAPP_DISPLAY = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 4)} ${WHATSAPP_NUMBER.slice(4, 7)} ${WHATSAPP_NUMBER.slice(7)}`;

/** Opens a WhatsApp chat with the admissions team, optionally with a prefilled message. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const BOOK_CALL_MESSAGE = "Hi Genix Academy, I'd like to book a free career call.";
