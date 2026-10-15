"use client";

import { useState } from "react";
import { HONEYPOT_FIELD, HONEYPOT_STYLE } from "@/lib/honeypot";

const field =
  "w-full rounded-lg border border-white/25 bg-transparent px-4 py-3 text-[16px] text-white placeholder:text-white/40 outline-none transition-colors focus:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const label = "mb-1.5 block text-[14px] text-white/75";

/** "Book a demo" form. Sends to /api/v1/leads; the answer replaces the form. */
export default function LeadForm() {
  const [values, setValues] = useState({ name: "", shop_name: "", phone: "", city: "", email: "", barbers: "", message: "" });
  const [trap, setTrap] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, ...(trap ? { [HONEYPOT_FIELD]: trap } : {}) }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) setSent(true);
      else setError(json.error ?? "Το αίτημα δεν στάλθηκε. Δοκίμασε ξανά σε λίγο.");
    } catch {
      setError("Δεν υπάρχει σύνδεση. Έλεγξε το internet και δοκίμασε ξανά.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div role="status" className="rounded-2xl border border-white/25 p-8">
        <p className="text-[24px] font-semibold leading-snug">Το αίτημά σου στάλθηκε.</p>
        <p className="mt-3 max-w-[46ch] text-[16px] leading-relaxed text-white/75">
          Θα σε πάρουμε τηλέφωνο για να κανονίσουμε την παρουσίαση, στο {values.phone}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2" noValidate>
      <div style={HONEYPOT_STYLE} aria-hidden="true">
        <label htmlFor="vgs-hp">Αφήστε κενό</label>
        <input id="vgs-hp" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>
      <div>
        <label htmlFor="vgs-name" className={label}>Ονοματεπώνυμο</label>
        <input id="vgs-name" required autoComplete="name" maxLength={100} value={values.name} onChange={set("name")} className={field} />
      </div>
      <div>
        <label htmlFor="vgs-shop" className={label}>Όνομα καταστήματος</label>
        <input id="vgs-shop" required autoComplete="organization" maxLength={120} value={values.shop_name} onChange={set("shop_name")} className={field} />
      </div>
      <div>
        <label htmlFor="vgs-phone" className={label}>Τηλέφωνο</label>
        <input id="vgs-phone" required type="tel" inputMode="tel" autoComplete="tel" maxLength={20} value={values.phone} onChange={set("phone")} className={field} />
      </div>
      <div>
        <label htmlFor="vgs-city" className={label}>Περιοχή (προαιρετικό)</label>
        <input id="vgs-city" autoComplete="address-level2" maxLength={80} value={values.city} onChange={set("city")} className={field} />
      </div>
      <div>
        <label htmlFor="vgs-email" className={label}>Email (προαιρετικό)</label>
        <input id="vgs-email" type="email" inputMode="email" autoComplete="email" maxLength={254} value={values.email} onChange={set("email")} className={field} />
      </div>
      <div>
        <label htmlFor="vgs-barbers" className={label}>Πόσοι κουρείς δουλεύουν;</label>
        <select id="vgs-barbers" value={values.barbers} onChange={set("barbers")} className={`${field} bg-black [&>option]:bg-white [&>option]:text-black`}>
          <option value="">Διάλεξε</option>
          <option value="1">Μόνο εγώ</option>
          <option value="2-3">2 με 3</option>
          <option value="4+">4 ή περισσότεροι</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="vgs-msg" className={label}>Κάτι που θέλεις να ξέρουμε (προαιρετικό)</label>
        <textarea id="vgs-msg" rows={3} maxLength={1000} value={values.message} onChange={set("message")} className={`${field} resize-y`} />
      </div>
      {error && (
        <p role="alert" className="sm:col-span-2 rounded-lg bg-white px-4 py-3 text-[15px] text-black">
          {error}
        </p>
      )}
      <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[44ch] text-[13px] leading-relaxed text-white/60">
          Τα στοιχεία σου τα χρησιμοποιούμε μόνο για να επικοινωνήσουμε μαζί σου για την παρουσίαση.{" "}
          <a href="/vgs/privacy" className="underline underline-offset-2 hover:text-white">Πολιτική απορρήτου</a>
        </p>
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-white px-7 py-3.5 text-[16px] font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {sending ? "Αποστολή…" : "Στείλε το αίτημα"}
        </button>
      </div>
    </form>
  );
}
