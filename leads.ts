/** Demo requests from the VGS APP page -- validation (pure). */
import { isPlainEmailAddress } from "@/lib/notifications/email-templates";

export const LEAD_BARBER_OPTIONS = ["1", "2-3", "4+"] as const;
export type LeadBarbers = (typeof LEAD_BARBER_OPTIONS)[number];

export interface LeadInput {
  name: string;
  shop_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  barbers: LeadBarbers | null;
  message: string | null;
}

// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function text(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.replace(CONTROL, "").replace(/[ \t]+/g, " ").trim();
  return t || null;
}

/** Returns the cleaned input, or a message about the field that needs fixing. */
export function parseLead(body: Record<string, unknown>): { ok: true; lead: LeadInput } | { ok: false; error: string } {
  const name = text(body.name);
  if (!name || name.length < 2 || name.length > 100) return { ok: false, error: "Γράψε το ονοματεπώνυμό σου." };
  const shop = text(body.shop_name);
  if (!shop || shop.length < 2 || shop.length > 120) return { ok: false, error: "Γράψε το όνομα του καταστήματος." };
  const phone = text(body.phone);
  if (!phone || !/^[0-9+ ]{8,20}$/.test(phone)) return { ok: false, error: "Γράψε ένα τηλέφωνο επικοινωνίας." };
  const email = text(body.email);
  if (email && (email.length > 254 || !isPlainEmailAddress(email))) return { ok: false, error: "Το email δεν φαίνεται σωστό. Διόρθωσέ το ή άφησέ το κενό." };
  const city = text(body.city);
  if (city && city.length > 80) return { ok: false, error: "Η περιοχή είναι πολύ μεγάλη." };
  const barbers = typeof body.barbers === "string" && (LEAD_BARBER_OPTIONS as readonly string[]).includes(body.barbers) ? (body.barbers as LeadBarbers) : null;
  const message = typeof body.message === "string" ? body.message.replace(CONTROL, "").trim() : "";
  if (message.length > 1000) return { ok: false, error: "Το μήνυμα είναι πολύ μεγάλο (έως 1000 χαρακτήρες)." };
  return { ok: true, lead: { name, shop_name: shop, phone, email, city, barbers, message: message || null } };
}

// ── Follow-up (admin page /admin/leads, platform owner only) ───────────────

export const LEAD_STATUSES = ["new", "contacted", "won", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS_EL: Record<LeadStatus, string> = {
  new: "Νέο",
  contacted: "Σε επικοινωνία",
  won: "Πελάτης",
  lost: "Δεν προχώρησε",
};

export interface Lead extends LeadInput {
  id: string;
  status: LeadStatus;
  notes: string | null;
  next_contact_on: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadUpdate {
  status: LeadStatus;
  notes: string | null;
  next_contact_on: string | null;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isRealDate(v: string): boolean {
  if (!ISO_DATE.test(v)) return false;
  const d = new Date(`${v}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
}

/** Validates what the owner changes on a request (status, notes, call-back date). */
export function parseLeadUpdate(body: unknown): { ok: true; update: LeadUpdate } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Μη έγκυρα στοιχεία." };
  const b = body as Record<string, unknown>;
  const status = typeof b.status === "string" && (LEAD_STATUSES as readonly string[]).includes(b.status) ? (b.status as LeadStatus) : null;
  if (!status) return { ok: false, error: "Διάλεξε κατάσταση." };
  const notes = typeof b.notes === "string" ? b.notes.replace(CONTROL, "").trim() : "";
  if (notes.length > 2000) return { ok: false, error: "Οι σημειώσεις είναι πολύ μεγάλες (έως 2000 χαρακτήρες)." };
  const next = typeof b.next_contact_on === "string" ? b.next_contact_on.trim() : "";
  if (next && !isRealDate(next)) return { ok: false, error: "Η ημερομηνία επανεπικοινωνίας δεν είναι σωστή." };
  return { ok: true, update: { status, notes: notes || null, next_contact_on: next || null } };
}
