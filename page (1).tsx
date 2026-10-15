import type { Metadata } from "next";
import VgsLegal from "@/components/vgs/VgsLegal";
import { DPA, plainText } from "@/lib/vgs-legal";

export const metadata: Metadata = {
  title: { absolute: `${DPA.title} | VGS APP` },
  description: plainText(DPA.intro),
  alternates: { canonical: DPA.path },
  icons: { icon: "/vgs/vgs-icon-64.png", apple: "/vgs/vgs-apple-icon.png" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <VgsLegal doc={DPA} />;
}
