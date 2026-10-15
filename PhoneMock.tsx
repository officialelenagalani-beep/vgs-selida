/**
 * A still picture of the real booking screen, drawn in HTML so it stays sharp
 * and can be read by screen readers as a description, not as controls.
 * The shop is fictional.
 */
const DAYS = [
  { d: "Τρι", n: 14 },
  { d: "Τετ", n: 15, on: true },
  { d: "Πέμ", n: 16 },
  { d: "Παρ", n: 17 },
];
const SLOTS: Array<{ t: string; state?: "taken" | "picked" }> = [
  { t: "10:00", state: "taken" },
  { t: "10:45" },
  { t: "11:30", state: "picked" },
  { t: "12:15", state: "taken" },
  { t: "17:00" },
  { t: "17:45" },
];

export default function PhoneMock() {
  return (
    <figure className="relative mx-auto w-[280px] sm:w-[300px]" aria-label="Η οθόνη κράτησης στο κινητό του πελάτη: διαλέγει υπηρεσία, μέρα και ώρα και κλείνει.">
      <div className="rounded-[44px] bg-black p-[10px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)]">
        <div className="relative overflow-hidden rounded-[34px] bg-white text-black" aria-hidden="true">
          <div className="mx-auto mt-2 h-[22px] w-[96px] rounded-full bg-black" />
          {/* The booking goes through: a notice slides in from the top of the screen. */}
          <div className="vgs-booked absolute inset-x-3 top-9 z-10 flex items-center gap-2.5 rounded-2xl bg-black px-3.5 py-2.5 text-white shadow-[0_12px_24px_-12px_rgba(0,0,0,0.6)]">
            <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
              <path d="M3 8.5l3 3 7-7" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[11.5px] leading-tight">
              <span className="block font-semibold">Το ραντεβού κλείστηκε</span>
              <span className="block text-white/70">Τετάρτη 15, 11:30 με τον Αλέξη</span>
            </span>
          </div>
          <div className="px-5 pb-6 pt-4">
            <p className="text-[11px] text-[#5E6467]">Κουρείο Αλέξη, Πάτρα</p>
            <p className="mt-1 text-[19px] font-extrabold leading-tight tracking-[-0.02em]">Κλείσε ραντεβού</p>

            <div className="mt-4 rounded-2xl border border-[#D9DDDF] p-3">
              <p className="text-[13px] font-semibold">Κούρεμα και γένια</p>
              <p className="text-[11px] text-[#5E6467]">45 λεπτά, 18 €</p>
            </div>

            <p className="mt-4 text-[11px] text-[#5E6467]">Οκτώβριος</p>
            <div className="mt-1.5 grid grid-cols-4 gap-1.5">
              {DAYS.map((x) => (
                <div
                  key={x.n}
                  className={`rounded-xl py-2 text-center ${x.on ? "bg-black text-white" : "border border-[#D9DDDF]"}`}
                >
                  <p className="text-[10px] leading-none opacity-70">{x.d}</p>
                  <p className="mt-1 text-[15px] font-semibold leading-none">{x.n}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[11px] text-[#5E6467]">Ελεύθερες ώρες με τον Αλέξη</p>
            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
              {SLOTS.map((s) =>
                s.state === "picked" ? (
                  // Starts as a free slot; the customer taps it and it turns black.
                  <div key={s.t} className="relative rounded-lg border border-[#D9DDDF] py-2 text-center text-[12px]">
                    {s.t}
                    <span className="vgs-tap pointer-events-none absolute inset-0 rounded-lg bg-black" />
                    <span className="vgs-pick absolute inset-0 flex items-center justify-center rounded-lg bg-black font-semibold text-white">{s.t}</span>
                  </div>
                ) : (
                  <div
                    key={s.t}
                    className={`rounded-lg py-2 text-center text-[12px] ${
                      s.state === "taken" ? "text-[#A9AFB2] line-through" : "border border-[#D9DDDF]"
                    }`}
                  >
                    {s.t}
                  </div>
                ),
              )}
            </div>

            <div className="vgs-ready mt-5 rounded-xl bg-black py-3 text-center text-[13px] font-semibold text-white">Κλείσε στις 11:30</div>
            <p className="mt-2 text-center text-[10px] text-[#5E6467]">Θα λάβεις υπενθύμιση την προηγούμενη μέρα</p>
          </div>
        </div>
      </div>
    </figure>
  );
}
