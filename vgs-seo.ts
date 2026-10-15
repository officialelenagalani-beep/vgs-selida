import { FAQ, PLANS } from "@/lib/vgs-content";
import { publicSiteUrl } from "@/lib/site-url";

/**
 * Search-engine data (schema.org JSON-LD) for the VGS APP page: what the
 * product is, and its questions and answers, so Google can show them as
 * such. Built from the same FAQ the page shows, so the two never disagree.
 * `<` is escaped so the text can never close the <script> tag it sits in.
 */
export function vgsJsonLd(): string {
  const site = publicSiteUrl();
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "VGS APP",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "el",
      description:
        "Πρόγραμμα κρατήσεων και πελατών για κουρεία: online κρατήσεις, υπενθυμίσεις, καρτέλα πελάτη, πόντοι, δωροκάρτες και συνδρομές.",
      ...(site ? { url: `${site}/vgs` } : {}),
      offers: PLANS.filter((p) => !p.comingSoon).map((p) => ({
        "@type": "Offer",
        name: p.name,
        price: p.monthly,
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: p.monthly,
          priceCurrency: "EUR",
          unitCode: "MON",
          valueAddedTaxIncluded: true,
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
