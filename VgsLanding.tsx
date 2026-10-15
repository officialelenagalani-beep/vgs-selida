import type { CSSProperties, ReactNode } from "react";
import PhoneMock from "./PhoneMock";
import LeadForm from "./LeadForm";
import VgsFrame, { vgsContainer } from "./VgsFrame";
import VgsPricing from "./VgsPricing";
import InView from "./InView";
import { BookingLinkVisual, TeamCalendarVisual, CustomerCardVisual, RevenueVisual } from "./ShowcaseVisuals";
import { vgsJsonLd } from "@/lib/vgs-seo";
import { FAQ } from "@/lib/vgs-content";

// The demo shops' websites, each published on its own.
const DEMO_INDEPENDENCE_URL = "https://vgs11.vercel.app/manos";
// Set NEXT_PUBLIC_DEMO_AUTOPILOT_URL in Vercel once the Autopilot demo is online.
const DEMO_AUTOPILOT_URL = process.env.NEXT_PUBLIC_DEMO_AUTOPILOT_URL ?? "";

/*
 * VGS APP presentation page (/vgs).
 * Palette: mineral paper #EDEFEE, white panels, true black #000, graphite
 * #34383B for text, steel #5E6467 for quiet text, rule #C5CBCD. No accent
 * colour: the brand is black and white, like the mark. Typeface: Commissioner.
 *
 * Written about the RESULT in the shop, not about the program: "sell the
 * hole, not the drill". Every heading says what changes for the owner (full
 * chairs, a quiet phone, customers who come back, money he can see); how the
 * program does it comes second. No invented numbers.
 *
 * Order: the result (hero) -> the result in four figures -> four changes,
 * each with a screen -> a day in the shop -> money stays yours (comparison)
 * -> what it costs -> how to start -> data -> questions -> contact.
 */

const container = vgsContainer;
const delay = (d: string) => ({ "--d": d }) as CSSProperties;

const btnDark =
  "inline-flex items-center justify-center rounded-full bg-black px-7 py-4 text-[16px] font-semibold text-white transition-opacity hover:opacity-85 active:scale-[0.98]";
const btnLine =
  "inline-flex items-center justify-center rounded-full border border-black px-7 py-4 text-[16px] font-semibold text-black transition-colors hover:bg-black hover:text-white active:scale-[0.98]";
const h2 = "text-[34px] font-extrabold leading-[1.08] tracking-[-0.03em] text-black sm:text-[46px]";
const lead = "mt-5 max-w-[58ch] text-[18px] leading-[1.65]";

/** The wings of the V, drawn line by line when the page opens. */
function Facets({ className }: { className?: string }) {
  const tipL: [number, number] = [20, 30];
  const tipR: [number, number] = [580, 30];
  const fanL: Array<[number, number]> = [[200, 110], [214, 170], [232, 236], [258, 330]];
  const fanR: Array<[number, number]> = [[400, 110], [386, 170], [368, 236], [342, 330]];
  return (
    <svg viewBox="0 0 600 620" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="#000" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <path className="vgs-draw" pathLength={1} d="M20 30 L200 110 L300 600 Z" />
        <path className="vgs-draw" pathLength={1} d="M580 30 L400 110 L300 600 Z" />
        {fanL.map(([x, y], i) => (
          <line key={`l${x}`} className="vgs-draw" pathLength={1} style={delay(`${0.35 + i * 0.12}s`)} x1={tipL[0]} y1={tipL[1]} x2={x} y2={y} />
        ))}
        {fanR.map(([x, y], i) => (
          <line key={`r${x}`} className="vgs-draw" pathLength={1} style={delay(`${0.35 + i * 0.12}s`)} x1={tipR[0]} y1={tipR[1]} x2={x} y2={y} />
        ))}
      </g>
    </svg>
  );
}

const FACTS = [
  { big: "0€", small: "προμήθεια: κάθε ευρώ μένει στο ταμείο σου" },
  { big: "24/7", small: "ραντεβού, ακόμα κι όταν είσαι κλειστά" },
  { big: "0", small: "τηλέφωνα για να κλείσει ένα ραντεβού" },
  { big: "100%", small: "οι πελάτες σου μένουν δικοί σου" },
];

const SHOWCASE: Array<{ id: string; title: string; body: string; points: string[]; visual: ReactNode }> = [
  {
    id: "bookings",
    title: "Το τηλέφωνο σταματά να σε διακόπτει στη μέση του κουρέματος",
    body: "Ο πελάτης κλείνει μόνος του από το Instagram ή το Google, ακόμα και στις 12 τα μεσάνυχτα. Εσύ τελειώνεις το κούρεμα και βρίσκεις το ραντεβού ήδη στο πρόγραμμα.",
    points: [
      "Δεν χάνεις πελάτη επειδή δεν πρόλαβες να το σηκώσεις",
      "Ποτέ δύο πελάτες για την ίδια ώρα, ποτέ λάθος στο τετράδιο",
      "Λιγότερες άδειες καρέκλες: ο πελάτης παίρνει υπενθύμιση πριν έρθει",
    ],
    visual: <BookingLinkVisual />,
  },
  {
    id: "team",
    title: "Το μαγαζί δουλεύει σωστά, ακόμα κι όταν λείπεις",
    body: "Κάθε κουρέας ξέρει το πρόγραμμά του. Εσύ βλέπεις όλη τη μέρα του μαγαζιού από το κινητό σου, όπου κι αν βρίσκεσαι.",
    points: [
      "Τέλος οι μπερδεμένες ώρες ανάμεσα στους κουρείς",
      "Τα έσοδα τα βλέπεις εσύ, όχι οι υπάλληλοι",
      "Ξέρεις ποιος άλλαξε ένα ραντεβού και πότε",
    ],
    visual: <TeamCalendarVisual />,
  },
  {
    id: "loyalty",
    title: "Ο πελάτης που ήρθε μία φορά, ξανάρχεται",
    body: "Ένας τακτικός πελάτης αξίζει περισσότερο από δέκα περαστικούς. Το πρόγραμμα θυμάται τον καθένα και τον φέρνει πίσω πριν σε ξεχάσει.",
    points: [
      "Μαζεύει πόντους, οπότε έχει λόγο να μην πάει στο διπλανό",
      "Όταν αργεί, του θυμίζουμε ότι ήρθε η ώρα για κούρεμα",
      "Σταθερό εισόδημα κάθε μήνα από συνδρομές και δωροκάρτες",
    ],
    visual: <CustomerCardVisual />,
  },
  {
    id: "numbers",
    title: "Ξέρεις πόσα βγάζεις, χωρίς τετράδιο και κομπιουτεράκι",
    body: "Βλέπεις τι πάει καλά και τι όχι, και αποφασίζεις με νούμερα, όχι με το μάτι.",
    points: [
      "Ποιος κουρέας και ποια υπηρεσία φέρνουν τα περισσότερα",
      "Αν ο μήνας πάει καλύτερα από τον προηγούμενο",
      "Το αρχείο για τον λογιστή, με ένα κλικ",
    ],
    visual: <RevenueVisual />,
  },
];

/** A day in the shop with VGS APP: what happens, hour by hour, on its own. */
const DAY: Array<{ time: string; text: string }> = [
  { time: "08:30", text: "Οι πελάτες της ημέρας έχουν ήδη πάρει υπενθύμιση. Κανείς δεν ξεχνά το ραντεβού του." },
  { time: "11:00", text: "Κουρεύεις χωρίς διακοπές. Στο μεταξύ τρία ραντεβού κλείστηκαν μόνα τους." },
  { time: "15:00", text: "Ένας πελάτης ακυρώνει. Η ώρα ανοίγει αμέσως στη σελίδα σου και την κλείνει άλλος." },
  { time: "18:30", text: "Ένας πελάτης που είχε έξι εβδομάδες να φανεί παίρνει μήνυμα «ήρθε η ώρα για κούρεμα» και κλείνει για Σάββατο." },
  { time: "21:00", text: "Κλείνεις το μαγαζί και βλέπεις στο κινητό πόσα έβγαλες σήμερα." },
  { time: "23:40", text: "Ενώ κοιμάσαι, κάποιος κλείνει ραντεβού για αύριο το πρωί." },
];

const COMPARE: Array<{ topic: string; vgs: string; other: string }> = [
  { topic: "Πόσα σου μένουν", vgs: "Όλα. Σταθερή μηνιαία τιμή, όσα ραντεβού κι αν κάνεις.", other: "Ένα ποσοστό από κάθε νέο πελάτη πάει στην πλατφόρμα." },
  { topic: "Πού σε βρίσκουν", vgs: "Στη δική σου σελίδα, με το δικό σου όνομα. Μόνο εσένα.", other: "Σε μια λίστα, δίπλα στα άλλα κουρεία της περιοχής." },
  { topic: "Ποιανού είναι οι πελάτες", vgs: "Δικοί σου, με όλα τα στοιχεία τους, για πάντα.", other: "Της πλατφόρμας. Αν φύγεις, μένουν εκεί." },
  { topic: "Ποιος σε βοηθά", vgs: "Άνθρωπος που μιλά ελληνικά και ξέρει το μαγαζί σου.", other: "Ένα γενικό κέντρο υποστήριξης." },
];

const STEPS = [
  { title: "Μιλάμε και βλέπεις το πρόγραμμα", body: "Σε μια σύντομη παρουσίαση σου δείχνουμε πώς θα δουλεύει για το δικό σου μαγαζί." },
  { title: "Στήνουμε το κατάστημά σου", body: "Υπηρεσίες, τιμές, ωράριο και κουρείς. Εσύ μας λες, εμείς τα περνάμε." },
  { title: "Μοιράζεις τον σύνδεσμο κράτησης", body: "Στο Instagram, στο Google και στο WhatsApp. Από εκεί και πέρα τα ραντεβού μπαίνουν μόνα τους." },
];

const SECURITY = [
  { title: "Κάθε μαγαζί βλέπει μόνο τα δικά του", body: "Ο server ελέγχει σε κάθε κίνηση σε ποιο κατάστημα ανήκεις." },
  { title: "Δεδομένα στην Ευρώπη", body: "Βάση δεδομένων στη Φρανκφούρτη, με κρυπτογραφημένη σύνδεση." },
  { title: "Έτοιμο για τον GDPR", body: "Εξαγωγή και διαγραφή στοιχείων πελάτη με ένα κουμπί." },
];

function Bullet({ dark = false }: { dark?: boolean }) {
  return <span aria-hidden="true" className={`mt-[0.55em] h-[7px] w-[7px] shrink-0 rotate-45 border ${dark ? "border-white" : "border-black"}`} />;
}

export default function VgsLanding() {
  return (
    <VgsFrame home>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: vgsJsonLd() }} />
      <main id="main">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className={`${container} grid items-center gap-14 pb-16 pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-20`}>
          <div className="lg:col-span-7">
            <p style={delay("0s")} className="vgs-rise inline-flex items-center gap-2.5 rounded-full border border-[#C5CBCD] bg-white px-4 py-1.5 text-[14px] text-[#34383B]">
              <span aria-hidden="true" className="h-[7px] w-[7px] rotate-45 bg-black" />
              Για κουρεία, χωρίς καμία προμήθεια
            </p>
            <h1 style={delay("0.06s")} className="vgs-rise mt-6 max-w-[15ch] text-[44px] font-extrabold leading-[1.02] tracking-[-0.04em] text-black sm:text-[60px] lg:text-[72px]">
              Γεμάτες καρέκλες, χωρίς να σηκώνεις το τηλέφωνο.
            </h1>
            <p style={delay("0.16s")} className="vgs-rise mt-7 max-w-[52ch] text-[18px] leading-[1.6] sm:text-[20px]">
              Οι πελάτες σου κλείνουν μόνοι τους, έρχονται στην ώρα τους και ξαναγυρίζουν. Εσύ κρατάς το ψαλίδι, και όλα τα κέρδη
              μένουν σε σένα.
            </p>
            <div style={delay("0.26s")} className="vgs-rise mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#demo" className={btnDark}>Κλείσε μια παρουσίαση</a>
              <a href="#pricing" className={btnLine}>Δες τις τιμές</a>
            </div>
            <p style={delay("0.34s")} className="vgs-rise mt-5 text-[14px] text-[#5E6467]">
              Η παρουσίαση γίνεται στο μαγαζί σου ή online και δεν σε δεσμεύει σε τίποτα.
            </p>
          </div>
          <div className="relative lg:col-span-5">
            <Facets className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.16]" />
            <div className="relative motion-safe:animate-fadeUp motion-safe:opacity-0">
              <PhoneMock />
            </div>
          </div>
        </section>

        {/* ── Facts ────────────────────────────────────────────────────── */}
        <section aria-label="Με μια ματιά" className="border-y border-[#C5CBCD] bg-white">
          <dl className={`${container} grid grid-cols-2 lg:grid-cols-4`}>
            {FACTS.map((f, i) => (
              <div
                key={f.big}
                className={`py-8 lg:px-8 ${i % 2 === 1 ? "border-l border-[#C5CBCD] pl-6" : ""} ${i > 0 ? "lg:border-l lg:border-[#C5CBCD]" : "lg:pl-0"} ${i > 1 ? "border-t border-[#C5CBCD] lg:border-t-0" : ""}`}
              >
                <dt className="sr-only">{f.small}</dt>
                <dd>
                  <span className="block text-[36px] font-extrabold leading-none tracking-[-0.03em] text-black sm:text-[44px]">{f.big}</span>
                  <span className="mt-2 block text-[15px] leading-snug text-[#5E6467]">{f.small}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── What it does, shown ──────────────────────────────────────── */}
        <section id="features" aria-labelledby="features-title" className="scroll-mt-16">
          <div className={`${container} pb-8 pt-24 lg:pt-32`}>
            <h2 id="features-title" className={`${h2} max-w-[20ch]`}>Τι αλλάζει στο μαγαζί σου</h2>
            <p className={lead}>Λιγότερη τρεχάλα, περισσότερα κουρέματα, πελάτες που ξανάρχονται. Ένα πρόγραμμα που δουλεύει για σένα, όχι εσύ για αυτό.</p>
          </div>
          <div className={`${container} space-y-24 pb-24 pt-12 lg:space-y-32 lg:pb-32`}>
            {SHOWCASE.map((s, i) => (
              <article key={s.id} aria-labelledby={`show-${s.id}`} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <h3 id={`show-${s.id}`} className="text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] text-black sm:text-[34px]">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[48ch] text-[17px] leading-[1.65]">{s.body}</p>
                  <ul className="mt-6 space-y-3 text-[16px] leading-[1.5]">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <Bullet />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                  <div className="rounded-[32px] bg-[#E2E6E5] px-6 py-12 sm:px-10">{s.visual}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── A day in the shop ─────────────────────────────────────────── */}
        <section aria-labelledby="day-title" className="border-t border-[#C5CBCD] bg-white">
          <div className={`${container} grid gap-12 py-24 lg:grid-cols-12 lg:py-28`}>
            <div className="lg:col-span-4">
              <h2 id="day-title" className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] text-black sm:text-[38px]">
                Μια μέρα στο μαγαζί σου
              </h2>
              <p className="mt-5 max-w-[34ch] text-[17px] leading-[1.65]">Όλα αυτά γίνονται μόνα τους. Εσύ απλώς κουρεύεις.</p>
            </div>
            <InView className="lg:col-span-8">
              <ol className="relative border-l border-black">
                {DAY.map((d, i) => (
                  <li key={d.time} className="relative pb-9 pl-8 last:pb-0" style={{ "--i": i } as CSSProperties}>
                    <span aria-hidden="true" className="vgs-steps-dot absolute -left-[5.5px] top-[0.4em] h-[10px] w-[10px] border border-black bg-white" />
                    <p className="text-[15px] font-extrabold tabular-nums tracking-[-0.01em] text-black">{d.time}</p>
                    <p className="mt-1 max-w-[56ch] text-[17px] leading-[1.6]">{d.text}</p>
                  </li>
                ))}
              </ol>
            </InView>
          </div>
        </section>

        {/* ── Comparison ───────────────────────────────────────────────── */}
        <section aria-labelledby="compare-title" className="vgs-dark bg-black text-white" style={{ colorScheme: "dark" }}>
          <div className={`${container} py-24 lg:py-32`}>
            <h2 id="compare-title" className="max-w-[20ch] text-[34px] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[46px]">
              Κάθε ευρώ μένει στο δικό σου ταμείο
            </h2>
            <p className="mt-5 max-w-[58ch] text-[18px] leading-[1.65] text-white/70">
              Οι πλατφόρμες με προμήθεια κερδίζουν από κάθε πελάτη σου και τον δείχνουν και στο διπλανό κουρείο. Με το VGS APP
              ο πελάτης, το όνομα και τα κέρδη μένουν δικά σου.
            </p>
            <div className="mt-14 overflow-hidden rounded-[24px] border border-white/15">
              <table className="w-full border-collapse text-left text-[15px]">
                <caption className="sr-only">Σύγκριση VGS APP με πλατφόρμες που παίρνουν προμήθεια</caption>
                <thead>
                  <tr className="border-b border-white/15">
                    <th scope="col" className="hidden w-[22%] px-6 py-5 font-medium text-white/60 md:table-cell"><span className="sr-only">Θέμα</span></th>
                    <th scope="col" className="bg-white px-6 py-5 text-[17px] font-extrabold text-black">VGS APP</th>
                    <th scope="col" className="px-6 py-5 text-[17px] font-semibold text-white/70">Πλατφόρμες με προμήθεια</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((c) => (
                    <tr key={c.topic} className="border-b border-white/15 last:border-0 align-top">
                      <th scope="row" className="hidden px-6 py-5 font-semibold text-white md:table-cell">{c.topic}</th>
                      <td className="bg-white px-6 py-5 leading-[1.55] text-black">
                        <span className="mb-1 block text-[13px] font-semibold text-[#5E6467] md:hidden">{c.topic}</span>
                        {c.vgs}
                      </td>
                      <td className="px-6 py-5 leading-[1.55] text-white/65">
                        <span className="mb-1 block text-[13px] font-semibold text-white/45 md:hidden">{c.topic}</span>
                        {c.other}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Plans ────────────────────────────────────────────────────── */}
        <VgsPricing container={container} />

        {/* ── How to start ─────────────────────────────────────────────── */}
        <section id="start" aria-labelledby="start-title" className="scroll-mt-16 border-t border-[#C5CBCD] bg-white">
          <div className={`${container} py-24 lg:py-32`}>
            <h2 id="start-title" className={h2}>Πώς ξεκινάς</h2>
            <p className={lead}>Σε λίγες μέρες τα ραντεβού μπαίνουν μόνα τους. Εσύ δεν στήνεις τίποτα: το αναλαμβάνουμε εμείς.</p>
            <InView className="mt-16">
              {/* One line joins the three steps; it draws itself when the steps come into view. */}
              <div aria-hidden="true" className="relative mb-10 hidden h-3 lg:block">
                <span className="vgs-steps-line absolute left-0 right-0 top-1/2 h-px bg-black" />
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{ "--i": i, left: `calc(${i} * (100% + 2.5rem) / 3)` } as CSSProperties}
                    className="vgs-steps-dot absolute top-1/2 -mt-[5px] h-[10px] w-[10px] border border-black bg-white"
                  />
                ))}
              </div>
              <ol className="grid gap-12 lg:grid-cols-3 lg:gap-10">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[auto_1fr] gap-x-5">
                    <span aria-hidden="true" className="text-[56px] font-extrabold leading-[0.9] tracking-[-0.04em] text-black">{i + 1}</span>
                    <div>
                      <h3 className="text-[21px] font-semibold leading-snug text-black">{s.title}</h3>
                      <p className="mt-2 max-w-[40ch] text-[16px] leading-[1.6]">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </InView>
            <p className="mt-16 max-w-[60ch] border-l-2 border-black pl-5 text-[17px] leading-[1.65]">
              Δες πώς φαίνεται στους πελάτες σου: η ιστοσελίδα ενός κουρείου στο{" "}
              <a href={DEMO_INDEPENDENCE_URL} target="_blank" rel="noopener" className="font-semibold text-black underline underline-offset-4 hover:no-underline">Independence</a> και μια
              πιο πλούσια στο{" "}
              {DEMO_AUTOPILOT_URL ? (
                <a href={DEMO_AUTOPILOT_URL} target="_blank" rel="noopener" className="font-semibold text-black underline underline-offset-4 hover:no-underline">Autopilot</a>
              ) : (
                <span className="font-semibold text-black">Autopilot</span>
              )}. Και τα
              δύο είναι παραδείγματα με φανταστικά στοιχεία.
            </p>
          </div>
        </section>

        {/* ── Security ─────────────────────────────────────────────────── */}
        <section aria-labelledby="security-title" className="border-t border-[#C5CBCD]">
          <div className={`${container} grid gap-12 py-24 lg:grid-cols-12 lg:py-28`}>
            <div className="lg:col-span-4">
              <h2 id="security-title" className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] text-black sm:text-[38px]">
                Τα στοιχεία των πελατών σου, ασφαλή
              </h2>
              <a href="/vgs/security" className="mt-6 inline-block text-[16px] font-semibold text-black underline underline-offset-4 hover:no-underline">
                Πώς προστατεύουμε τα δεδομένα
              </a>
            </div>
            <ul className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
              {SECURITY.map((s) => (
                <li key={s.title} className="border-t border-black pt-5">
                  <h3 className="text-[18px] font-semibold leading-snug text-black">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6]">{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Questions ────────────────────────────────────────────────── */}
        <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16 border-t border-[#C5CBCD] bg-white">
          <div className={`${container} grid gap-12 py-24 lg:grid-cols-12 lg:py-32`}>
            <div className="lg:col-span-4">
              <h2 id="faq-title" className={h2}>Ερωτήσεις</h2>
              <p className="mt-5 max-w-[34ch] text-[17px] leading-[1.65]">
                Δεν βρίσκεις αυτό που ψάχνεις;{" "}
                <a href="#demo" className="font-semibold text-black underline underline-offset-4 hover:no-underline">Ρώτα μας</a>.
              </p>
            </div>
            <div className="divide-y divide-[#C5CBCD] border-y border-[#C5CBCD] lg:col-span-8">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-semibold text-black [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                      <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-black" />
                      <span className="absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-black transition-transform group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[62ch] text-[17px] leading-[1.65]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────── */}
        <section id="demo" aria-labelledby="demo-title" className="scroll-mt-16 bg-black text-white" style={{ colorScheme: "dark" }}>
          <div className={`${container} grid gap-12 py-24 lg:grid-cols-12 lg:py-32`}>
            <div className="lg:col-span-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/vgs/vgs-mark-white.png" alt="" width={76} height={64} className="h-14 w-auto" />
              <h2 id="demo-title" className="mt-8 max-w-[14ch] text-[36px] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-[48px]">
                Κλείσε μια παρουσίαση
              </h2>
              <p className="mt-5 max-w-[40ch] text-[17px] leading-[1.65] text-white/75">
                Άφησε τα στοιχεία σου και θα σε πάρουμε τηλέφωνο. Η παρουσίαση γίνεται στο μαγαζί σου ή online, και δεν σε δεσμεύει σε
                τίποτα.
              </p>
              <ul className="mt-8 space-y-3 text-[16px] text-white/85">
                {["Σύντομη και χωρίς τεχνικά", "Βλέπεις τι θα αλλάξει στο δικό σου μαγαζί", "Καμία υποχρέωση"].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Bullet dark />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <LeadForm />
            </div>
          </div>
        </section>
      </main>
    </VgsFrame>
  );
}
