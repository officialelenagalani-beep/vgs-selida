import type { Metadata } from "next";
import VgsLegal from "@/components/vgs/VgsLegal";
import { PRIVACY, plainText } from "@/lib/vgs-legal";

export const metadata: Metadata = {
  title: { absolute: `${PRIVACY.title} | VGS APP` },
  description: plainText(PRIVACY.intro),
  alternates: { canonical: PRIVACY.path },
  icons: { icon: "/vgs/vgs-icon-64.png", apple: "/vgs/vgs-apple-icon.png" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <VgsLegal doc={PRIVACY} />;
}
