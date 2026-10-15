import type { ReactNode } from "react";
import MobileMenu from "./MobileMenu";

/*
 * The frame shared by the VGS APP pages (/vgs and /vgs/security): paper
 * background, Commissioner, black focus ring, skip link, a header that stays
 * at the top while scrolling (with a menu that folds on phones), and the
 * footer. On the main page the menu jumps to sections of the same page; on
 * the other pages the same links lead back to those sections.
 */

export const vgsContainer = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";

const NAV = [
  { hash: "#features", label: "Λειτουργίες" },
  { hash: "#pricing", label: "Τιμές" },
  { hash: "#start", label: "Πώς ξεκινάς" },
  { hash: "#faq", label: "Ερωτήσεις" },
];

function Mark({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/vgs/vgs-mark.png" alt="" width={38} height={32} className={className} />;
}

export default function VgsFrame({ children, home = false }: { children: ReactNode; home?: boolean }) {
  const base = home ? "" : "/vgs";
  const year = new Date().getFullYear();
  return (
    <div className="vgs-root min-h-screen overflow-x-clip bg-[#EDEFEE] text-[#34383B] antialiased" style={{ fontFamily: "var(--font-vgs), system-ui, sans-serif", colorScheme: "light" }}>
      {/* The site-wide focus ring is white (dark Medusa site); here it must be black, and white again on black areas. */}
      <style>{`.vgs-root :focus-visible{outline:2px solid #000;outline-offset:3px}.vgs-root #demo :focus-visible,.vgs-root .vgs-dark :focus-visible{outline-color:#fff}.vgs-root ::selection{background:#000;color:#fff}`}</style>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-white">
        Μετάβαση στο περιεχόμενο
      </a>

      <header className="sticky top-0 z-50 border-b border-[#C5CBCD]/70 bg-[#EDEFEE]/85 backdrop-blur-md supports-[backdrop-filter]:bg-[#EDEFEE]/70">
        <div className={`${vgsContainer} flex h-16 items-center justify-between gap-6`}>
          <a href="/vgs" className="flex items-center gap-2.5 text-black">
            <Mark className="h-7 w-auto" />
            <span className="text-[18px] font-extrabold tracking-[-0.01em]">VGS APP</span>
          </a>

          <nav aria-label="Κύριο μενού" className="hidden items-center gap-7 text-[15px] lg:flex">
            {NAV.map((n) => (
              <a key={n.hash} href={`${base}${n.hash}`} className="text-[#34383B] transition-colors hover:text-black">
                {n.label}
              </a>
            ))}
            <a href="/vgs/security" className="text-[#34383B] transition-colors hover:text-black">Ασφάλεια</a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`${base}#demo`}
              className="hidden rounded-full bg-black px-5 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-85 sm:inline-flex"
            >
              Κλείσε παρουσίαση
            </a>
            {/* Phones and tablets: the same links in a menu that folds open. */}
            <MobileMenu
              summary={
              <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-black [&::-webkit-details-marker]:hidden">
                <span className="sr-only">Μενού</span>
                <span aria-hidden="true" className="relative block h-3 w-4">
                  <span className="vgs-menu-bar absolute left-0 top-0 h-[1.5px] w-4 bg-black" />
                  <span className="vgs-menu-bar absolute bottom-0 left-0 h-[1.5px] w-4 bg-black" />
                </span>
              </summary>
              }
            >
              <nav aria-label="Μενού" className="absolute right-0 top-12 w-[min(84vw,300px)] rounded-2xl border border-[#C5CBCD] bg-white p-2 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]">
                {NAV.map((n) => (
                  <a key={n.hash} href={`${base}${n.hash}`} className="block rounded-xl px-4 py-3 text-[16px] text-black hover:bg-[#EDEFEE]">
                    {n.label}
                  </a>
                ))}
                <a href="/vgs/security" className="block rounded-xl px-4 py-3 text-[16px] text-black hover:bg-[#EDEFEE]">Ασφάλεια</a>
                <a href={`${base}#demo`} className="mt-1 block rounded-xl bg-black px-4 py-3 text-center text-[16px] font-semibold text-white">
                  Κλείσε παρουσίαση
                </a>
              </nav>
            </MobileMenu>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-[#C5CBCD] bg-[#EDEFEE]">
        <div className={`${vgsContainer} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <a href="/vgs" className="flex items-center gap-2.5 text-black">
              <Mark className="h-7 w-auto" />
              <span className="text-[18px] font-extrabold tracking-[-0.01em]">VGS APP</span>
            </a>
            <p className="mt-4 max-w-[36ch] text-[15px] leading-[1.6] text-[#5E6467]">
              Το πρόγραμμα κρατήσεων και πελατών για κουρεία. Φτιαγμένο στην Ελλάδα, στα ελληνικά.
            </p>
          </div>
          <nav aria-label="Το πρόγραμμα" className="lg:col-span-3">
            <p className="text-[14px] font-semibold text-black">Το πρόγραμμα</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li><a href={`${base}#features`} className="hover:text-black">Λειτουργίες</a></li>
              <li><a href={`${base}#pricing`} className="hover:text-black">Τιμές</a></li>
              <li><a href={`${base}#faq`} className="hover:text-black">Ερωτήσεις</a></li>
            </ul>
          </nav>
          <nav aria-label="Σύνδεσμοι" className="lg:col-span-4">
            <p className="text-[14px] font-semibold text-black">Εμπιστοσύνη και επικοινωνία</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li><a href="/vgs/security" className="hover:text-black">Ασφάλεια και δεδομένα</a></li>
              <li><a href={`${base}#demo`} className="hover:text-black">Επικοινωνία</a></li>
              <li><a href="/vgs/terms" className="hover:text-black">Όροι χρήσης</a></li>
              <li><a href="/vgs/privacy" className="hover:text-black">Πολιτική απορρήτου</a></li>
              <li><a href="/vgs/dpa" className="hover:text-black">Σύμβαση επεξεργασίας δεδομένων</a></li>
            </ul>
          </nav>
        </div>
        <div className="border-t border-[#C5CBCD]">
          <p className={`${vgsContainer} py-6 text-[13px] text-[#5E6467]`}>© {year} VGS. Με επιφύλαξη παντός δικαιώματος.</p>
        </div>
      </footer>
    </div>
  );
}
