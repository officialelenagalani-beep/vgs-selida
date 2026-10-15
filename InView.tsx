"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Marks its box with data-inview the first time it scrolls into view, so CSS
 * can play a one-off animation there (see app/vgs/vgs.css). Without
 * JavaScript nothing is marked and the decoration simply stays undrawn.
 */
export default function InView({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-inview", "");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute("data-inview", "");
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
