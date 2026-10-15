"use client";

import { useState, type CSSProperties } from "react";
import { PLANS, ANNUAL_MONTHS_PAID, annualPrice, formatEuro, type VgsPlan } from "@/lib/vgs-content";

/*
 * Pricing on the VGS APP page: three plans, monthly or annual (12 months for
 * the price of 10). The middle plan is the highlighted one (black card); the
 * third is marked "Σύντομα" and leads to the contact form instead of a sale.
 */

type Billing = "monthly" | "annual";

function Check({ dark }: { dark: boolean }) {
  return (
    <span aria-hidden="true" className={`mt-[0.55em] h-[7px] w-[7px] shrink-0 rotate-45 border ${dark ? "border-white" : "border-black"}`} />
  );
}

function PlanCard({ plan, billing }: { plan: VgsPlan; billing: Billing }) {
  const dark = Boolean(plan.popular);
  const annual = billing === "annual";
  const price = annual ? annualPrice(plan.monthly) : plan.monthly;
  const fullYear = plan.monthly * 12;

  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={`vgs-plan relative flex flex-col rounded-[28px] border p-7 sm:p-8 ${
        dark ? "vgs-dark border-black bg-black text-white" : "border-[#C5CBCD] bg-white text-[#34383B]"
      }`}
      style={dark ? { colorScheme: "dark" } : undefined}
    >
      <div className="flex flex-wrap items-center gap-2">
        <h3 id={`plan-${plan.id}`} className={`text-[22px] font-extrabold tracking-[-0.01em] ${dark ? "text-white" : "text-black"}`}>
          {plan.name}
        </h3>
        {plan.popular && (
          <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-black">Η πιο δημοφιλής επιλογή</span>
        )}
        {plan.comingSoon && (
          <span className="rounded-full border border-black px-3 py-1 text-[12px] font-semibold text-black">Σύντομα</span>
        )}
      </div>

      <p className={`mt-3 text-[15px] leading-[1.55] lg:min-h-[6.2em] ${dark ? "text-white/75" : "text-[#5E6467]"}`}>{plan.tagline}</p>

      <div className="mt-6">
        <p key={billing} className="vgs-price flex items-baseline gap-1.5">
          <span className={`text-[44px] font-extrabold leading-none tracking-[-0.03em] ${dark ? "text-white" : "text-black"}`}>
            {formatEuro(price)}€
          </span>
          <span className={`text-[15px] ${dark ? "text-white/70" : "text-[#5E6467]"}`}>{annual ? "/ χρόνο" : "/ μήνα"}</span>
        </p>
        <p className={`mt-2 min-h-[1.5em] text-[14px] ${dark ? "text-white/70" : "text-[#5E6467]"}`}>
          {annual ? (
            <>
              <span className="line-through">{formatEuro(fullYear)}€</span>
              <span className="ml-2">{12 - ANNUAL_MONTHS_PAID} μήνες δώρο</span>
            </>
          ) : (
            "Χωρίς καμία προμήθεια ανά κράτηση"
          )}
        </p>
      </div>

      {/* With a mouse, the pitch rests here and the full list unrolls over it
          when the card is pointed at (app/vgs/vgs.css). On touch screens both
          are simply shown, one under the other. */}
      <div className="vgs-plan-body mt-6 flex-1">
        <div className="vgs-plan-rest">
          <p className={`text-[15px] leading-[1.6] ${dark ? "text-white/85" : ""}`}>{plan.pitch}</p>
          <p aria-hidden="true" className={`vgs-plan-hint mt-5 items-center gap-2.5 text-[14px] font-semibold ${dark ? "text-white" : "text-black"}`}>
            <span className={`h-[7px] w-[7px] rotate-45 border ${dark ? "border-white" : "border-black"}`} />
            {plan.includesPrevious ? `Όλα του προηγούμενου και ${plan.features.length} ακόμα` : `Περιλαμβάνει ${plan.features.length} παροχές`}
          </p>
          {/* The wings of the V fill the resting card; they give way to the list. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 600 420"
            preserveAspectRatio="xMidYMax meet"
            className={`vgs-plan-mark h-0 min-h-0 w-full flex-1 pt-8 ${dark ? "opacity-30" : "opacity-[0.18]"}`}
          >
            <g fill="none" stroke={dark ? "#fff" : "#000"} strokeWidth="1" vectorEffect="non-scaling-stroke">
              <path d="M20 20 L200 80 L300 410 Z M580 20 L400 80 L300 410 Z" />
              <path d="M20 20 L214 130 M20 20 L232 190 M20 20 L258 270 M580 20 L386 130 M580 20 L368 190 M580 20 L342 270" />
            </g>
          </svg>
        </div>

        <div className="vgs-plan-details">
          {plan.includesPrevious && (
            <p className={`text-[14px] font-semibold ${dark ? "text-white" : "text-black"}`}>{plan.includesPrevious}</p>
          )}
          <ul className={`${plan.includesPrevious ? "mt-3" : ""} space-y-3 text-[15px] leading-[1.5]`}>
            {plan.features.map((f, i) => (
              <li key={f} className="flex gap-3" style={{ "--i": i + 1 } as CSSProperties}>
                <Check dark={dark} />
                <Benefit text={f} dark={dark} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <a
          href="#demo"
          className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-[16px] font-semibold transition-opacity hover:opacity-85 ${
            dark
              ? "bg-white text-black"
              : plan.comingSoon
                ? "border border-black text-black hover:bg-black hover:text-white"
                : "bg-black text-white"
          }`}
        >
          {plan.comingSoon ? "Θέλω να ενημερωθώ" : `Ξεκίνα με το ${plan.name}`}
        </a>
      </div>
    </article>
  );
}

/** "Result: how" -- the result in bold, the way it is done after it. */
function Benefit({ text, dark }: { text: string; dark: boolean }) {
  const cut = text.indexOf(": ");
  if (cut < 0) return <span>{text}</span>;
  return (
    <span>
      <span className={`font-semibold ${dark ? "text-white" : "text-black"}`}>{text.slice(0, cut)}.</span> {text.slice(cut + 2)}
    </span>
  );
}

export default function VgsPricing({ container }: { container: string }) {
  const [billing, setBilling] = useState<Billing>("monthly");

  const option = (value: Billing, label: string, extra?: string) => {
    const active = billing === value;
    return (
      <button
        type="button"
        aria-pressed={active}
        onClick={() => setBilling(value)}
        className={`rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors ${
          active ? "bg-black text-white" : "text-[#34383B] hover:text-black"
        }`}
      >
        {label}
        {extra && <span className={`ml-2 text-[13px] font-medium ${active ? "text-white/75" : "text-[#5E6467]"}`}>{extra}</span>}
      </button>
    );
  };

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-6 border-t border-[#C5CBCD]">
      <div className={`${container} py-20 lg:py-28`}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="pricing-title" className="max-w-[18ch] text-[32px] font-extrabold leading-[1.1] tracking-[-0.03em] text-black sm:text-[42px]">
              Επίλεξε το επίπεδο της επιτυχίας σου
            </h2>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.65]">
              Σταμάτα να δουλεύεις για το λογισμικό σου. Βάλε το λογισμικό να δουλεύει για εσένα, κράτα το 100% των κερδών σου και
              πάρε πίσω τον χρόνο σου.
            </p>
          </div>
          <div role="group" aria-label="Τρόπος πληρωμής" className="inline-flex self-start rounded-full border border-black bg-white p-1 lg:self-auto">
            {option("monthly", "Μηνιαία")}
            {option("annual", "Ετήσια", "2 μήνες δώρο")}
          </div>
        </div>

        <div className="vgs-plans mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} billing={billing} />
          ))}
        </div>

        <p className="mt-8 text-[14px] text-[#5E6467]">
          Όλες οι τιμές περιλαμβάνουν ΦΠΑ. Χωρίς προμήθεια σε κανένα πακέτο. Το στήσιμο του καταστήματος και τη μεταφορά των στοιχείων σου τα αναλαμβάνουμε εμείς.
        </p>
      </div>
    </section>
  );
}
