import type { Metadata } from "next";
import VgsLanding from "@/components/vgs/VgsLanding";

const description =
  "Online κρατήσεις 24 ώρες το 24ωρο, υπενθυμίσεις, καρτέλα πελάτη, πόντοι, δωροκάρτες και συνδρομές. Το πρόγραμμα για κουρεία, στα ελληνικά, χωρίς προμήθεια ανά κράτηση.";

export const metadata: Metadata = {
  title: { absolute: "VGS APP | Κρατήσεις και πελάτες για κουρεία" },
  description,
  alternates: { canonical: "/vgs" },
  openGraph: {
    type: "website",
    locale: "el_GR",
    siteName: "VGS APP",
    title: "VGS APP | Κρατήσεις και πελάτες για κουρεία",
    description,
    url: "/vgs",
    images: [{ url: "/vgs/vgs-logo.png", width: 456, height: 557, alt: "VGS" }],
  },
  twitter: { card: "summary", title: "VGS APP", description, images: ["/vgs/vgs-logo.png"] },
  icons: { icon: "/vgs/vgs-icon-64.png", apple: "/vgs/vgs-apple-icon.png" },
  robots: { index: true, follow: true },
};

export default function VgsPage() {
  return <VgsLanding />;
}
