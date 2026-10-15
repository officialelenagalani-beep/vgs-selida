"use client";

import { useRef, type ReactNode } from "react";

/** The folding menu on phones: closes itself once a link inside it is chosen. */
export default function MobileMenu({ summary, children }: { summary: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement | null>(null);
  return (
    <details
      ref={ref}
      className="vgs-menu relative lg:hidden"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) ref.current?.removeAttribute("open");
      }}
    >
      {summary}
      {children}
    </details>
  );
}
