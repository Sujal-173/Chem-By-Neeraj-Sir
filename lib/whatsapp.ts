/**
 * This project stores the WhatsApp contact link as a full URL in
 * NEXT_PUBLIC_CONTACT_WHATSAPP (e.g. "https://wa.me/919876543210"), not a
 * bare phone number. This appends a pre-filled message to that link,
 * handling the case where it already has query params.
 */
export function buildWhatsAppUrl(baseWhatsAppUrl: string, message: string): string {
  const encoded = encodeURIComponent(message);
  const separator = baseWhatsAppUrl.includes("?") ? "&" : "?";
  return `${baseWhatsAppUrl}${separator}text=${encoded}`;
}

const RESOURCE_TYPE_LABEL: Record<string, string> = {
  chapterWise: "Chapter-wise Notes",
  fullNotes: "Full Notes",
  printed: "Printed Notes",
  pdf: "PDF Notes",
};

/**
 * The message a "Buy on WhatsApp" button sends for a specific note —
 * includes enough detail that Neeraj Sir can confirm and quote a price
 * without back-and-forth.
 */
export function buildNoteEnquiryMessage(note: {
  title: string;
  resourceType: string;
  classLevel: string;
  subject: string;
  priceDisplay?: string;
}): string {
  const typeLabel = RESOURCE_TYPE_LABEL[note.resourceType] || note.resourceType;
  const subjectLabel = note.subject === "chemistry" ? "Chemistry" : "Biology";
  const lines = [
    `Hi Neeraj Sir, I'd like to buy these notes:`,
    ``,
    `📘 ${note.title}`,
    `${typeLabel} · Class ${note.classLevel} ${subjectLabel}`,
  ];
  if (note.priceDisplay) lines.push(`Price: ${note.priceDisplay}`);
  lines.push(``, `Please share payment details.`);
  return lines.join("\n");
}
