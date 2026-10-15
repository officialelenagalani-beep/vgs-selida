import { Commissioner } from "next/font/google";
import "./vgs.css";

// Commissioner: drawn by a Greek type designer, with full Greek support.
const commissioner = Commissioner({
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600", "800"],
  variable: "--font-vgs",
  display: "swap",
});

/** The VGS APP presentation page has its own look, separate from the Medusa site. */
export default function VgsLayout({ children }: { children: React.ReactNode }) {
  return <div className={commissioner.variable}>{children}</div>;
}
