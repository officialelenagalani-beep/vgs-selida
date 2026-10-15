/*
 * Still pictures of real VGS APP screens, drawn in HTML so they stay sharp.
 * They are decoration for sighted readers (aria-hidden); the text next to
 * each one says the same thing in words. The shop and people are invented.
 */

const panel = "rounded-[22px] border border-[#C5CBCD] bg-white shadow-[0_30px_60px_-40px_rgba(0,0,0,0.45)]";

/** 1. Your own booking link, shared everywhere. */
export function BookingLinkVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[460px]">
      <div className={`${panel} p-6 pb-12`}>
        <p className="text-[12px] text-[#5E6467]">Ο σύνδεσμος κράτησης του μαγαζιού σου</p>
        <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-[#C5CBCD] px-4 py-3">
          <span className="truncate text-[14px] font-semibold text-black">kourio-alexi.gr/kratisi</span>
          <span className="shrink-0 rounded-full bg-black px-3 py-1 text-[12px] font-semibold text-white">Αντιγραφή</span>
        </div>
        <p className="mt-6 text-[12px] text-[#5E6467]">Online κρατήσεις αυτής της εβδομάδας</p>
        <div className="mt-3 flex h-24 items-end gap-2">
          {[
            ["Δευ", 9],
            ["Τρί", 14],
            ["Τετ", 12],
            ["Πέμ", 17],
            ["Παρ", 21],
            ["Σάβ", 24],
          ].map(([d, n]) => (
            <div key={d} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className="w-full rounded-t-md bg-black" style={{ height: `${(Number(n) / 24) * 100}%` }} />
              <span className="text-[11px] text-[#5E6467]">{d}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-8 -left-3 rounded-2xl bg-black px-4 py-3 text-white shadow-[0_18px_36px_-18px_rgba(0,0,0,0.6)] sm:-left-8">
        <p className="text-[12px] text-white/70">Νέα κράτηση, 02:14</p>
        <p className="text-[14px] font-semibold">Νίκος Π., Skin fade</p>
        <p className="text-[12px] text-white/70">Πέμπτη 10:30 με τον Αλέξη</p>
      </div>
    </div>
  );
}

/** 2. The team's day, side by side. */
const TEAM = [
  { name: "Αλέξης", blocks: [[0, 2, "Γιώργος Μ."], [2, 1, "Πέτρος Α."], [4, 2, "Κώστας Λ."]] },
  { name: "Νίκος", blocks: [[1, 2, "Σάκης Τ."], [3, 1, "Διάλειμμα", "break"], [4, 1, "Μάριος Ζ."]] },
  { name: "Γιώργος", blocks: [[0, 1, "Ηλίας Κ."], [2, 2, "Άρης Ν."], [5, 1, "Λευτέρης Φ."]] },
] as const;
const HOURS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

export function TeamCalendarVisual() {
  return (
    <div aria-hidden="true" className={`${panel} mx-auto w-full max-w-[500px] p-5`}>
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-semibold text-black">Τετάρτη 15 Οκτωβρίου</p>
        <p className="text-[12px] text-[#5E6467]">17 ραντεβού</p>
      </div>
      <div className="mt-4 grid grid-cols-[44px_repeat(3,1fr)] gap-x-2">
        <span />
        {TEAM.map((b) => (
          <span key={b.name} className="pb-2 text-center text-[12px] font-semibold text-black">{b.name}</span>
        ))}
        <div className="relative" style={{ height: 6 * 40 }}>
          {HOURS.map((h, i) => (
            <span key={h} className="absolute left-0 text-[10px] text-[#5E6467]" style={{ top: i * 40 - 6 }}>{h}</span>
          ))}
        </div>
        {TEAM.map((b) => (
          <div key={b.name} className="relative rounded-lg bg-[#EDEFEE]/60" style={{ height: 6 * 40 }}>
            {b.blocks.map(([start, len, who, kind]) => (
              <span
                key={`${start}-${who}`}
                className={`absolute inset-x-1 rounded-md px-2 py-1 text-[11px] leading-tight ${
                  kind === "break" ? "border border-dashed border-[#A9AFB2] text-[#5E6467]" : "bg-black text-white"
                }`}
                style={{ top: start * 40 + 2, height: len * 40 - 4 }}
              >
                {who}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** 3. A customer who comes back. */
export function CustomerCardVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[460px]">
      <div className={`${panel} p-6 pb-12`}>
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-[15px] font-semibold text-white">ΓΜ</span>
          <div>
            <p className="text-[16px] font-semibold text-black">Γιώργος Μανωλάκης</p>
            <p className="text-[12px] text-[#5E6467]">Πελάτης από τον Μάρτιο, 14 επισκέψεις</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            ["Κάθε", "3 εβδ."],
            ["Πόντοι", "240"],
            ["Συνδρομή", "Ενεργή"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-[#C5CBCD] px-2 py-3">
              <p className="text-[11px] text-[#5E6467]">{k}</p>
              <p className="mt-0.5 text-[15px] font-semibold text-black">{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[12px] text-[#5E6467]">Πόντοι μέχρι το δωρεάν κούρεμα</p>
        <div className="mt-2 h-2 rounded-full bg-[#EDEFEE]">
          <span className="block h-2 w-[80%] rounded-full bg-black" />
        </div>
        <p className="mt-5 rounded-xl bg-[#EDEFEE] px-4 py-3 text-[13px] leading-snug text-black">
          Σημείωση: προτιμά ψαλίδι στο πάνω μέρος, όχι gel.
        </p>
      </div>
      <div className="absolute -bottom-8 -right-3 max-w-[250px] rounded-2xl bg-black px-4 py-3 text-white shadow-[0_18px_36px_-18px_rgba(0,0,0,0.6)] sm:-right-8">
        <p className="text-[12px] text-white/70">Αυτόματο email</p>
        <p className="text-[14px] font-semibold leading-snug">Γιώργο, ήρθε η ώρα για το επόμενο κούρεμα</p>
      </div>
    </div>
  );
}

/** 4. Revenue at a glance. */
const WEEKS = [62, 70, 66, 81, 77, 92, 88, 100];
export function RevenueVisual() {
  return (
    <div aria-hidden="true" className={`${panel} mx-auto w-full max-w-[500px] p-6`}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[12px] text-[#5E6467]">Έσοδα Οκτωβρίου</p>
          <p className="mt-1 text-[30px] font-extrabold leading-none tracking-[-0.03em] text-black">4.860 €</p>
        </div>
        <span className="rounded-full border border-black px-3 py-1 text-[12px] font-semibold text-black">+12% από τον Σεπτέμβριο</span>
      </div>
      <div className="mt-6 flex h-28 items-end gap-2">
        {WEEKS.map((h, i) => (
          <span key={i} className={`flex-1 rounded-t-md ${i === WEEKS.length - 1 ? "bg-black" : "bg-[#C5CBCD]"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-6 space-y-2.5 border-t border-[#C5CBCD] pt-5">
        {[
          ["Αλέξης", "1.920 €", 100],
          ["Νίκος", "1.610 €", 84],
          ["Γιώργος", "1.330 €", 69],
        ].map(([n, v, w]) => (
          <div key={n} className="grid grid-cols-[72px_1fr_64px] items-center gap-3 text-[13px]">
            <span className="text-black">{n}</span>
            <span className="h-2 rounded-full bg-[#EDEFEE]">
              <span className="block h-2 rounded-full bg-black" style={{ width: `${w}%` }} />
            </span>
            <span className="text-right tabular-nums text-[#5E6467]">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
