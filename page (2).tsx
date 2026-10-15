import type { Metadata } from "next";
import VgsLegal from "@/components/vgs/VgsLegal";
import { TERMS, plainText } from "@/lib/vgs-legal";

export const metadata: Metadata = {
  title: { absolute: `${TERMS.title} | VGS APP` },
  description: plainText(TERMS.intro),
  alternates: { canonical: TERMS.path },
  icons: { icon: "/vgs/vgs-icon-64.png", apple: "/vgs/vgs-apple-icon.png" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <VgsLegal doc={TERMS} />;
}
