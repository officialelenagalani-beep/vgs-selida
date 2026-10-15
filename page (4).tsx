import type { Metadata } from "next";
import VgsSecurity from "@/components/vgs/VgsSecurity";

const description =
  "Πώς το VGS APP προστατεύει τα στοιχεία του κουρείου και των πελατών του: χωριστά δεδομένα για κάθε κατάστημα, ρόλοι, servers στην Ευρώπη, ιστορικό αλλαγών και εργαλεία για τον GDPR.";

export const metadata: Metadata = {
  title: { absolute: "Ασφάλεια και προσωπικά δεδομένα | VGS APP" },
  description,
  alternates: { canonical: "/vgs/security" },
  openGraph: {
    type: "website",
    locale: "el_GR",
    siteName: "VGS APP",
    title: "Ασφάλεια και προσωπικά δεδομένα | VGS APP",
    description,
    url: "/vgs/security",
    images: [{ url: "/vgs/vgs-logo.png", width: 456, height: 557, alt: "VGS" }],
  },
  icons: { icon: "/vgs/vgs-icon-64.png", apple: "/vgs/vgs-apple-icon.png" },
  robots: { index: true, follow: true },
};

export default function VgsSecurityPage() {
  return <VgsSecurity />;
}
