import { useEffect } from "react";
import { useLocation } from "wouter";

// Reveals [data-reveal] elements by adding the `in` class as they reach the
// viewport's reveal line; the transition itself lives in index.css, gated on
// prefers-reduced-motion. A plain scroll listener (not IntersectionObserver)
// on purpose: a fast scroll or deep link can jump an element across the whole
// viewport between observer callbacks, leaving it stranded invisible, while a
// position check on every scroll event reveals anything at or above the line
// — including content already scrolled past. Mounted once in App; re-scans on
// every route change so any page can opt in with a data-reveal attribute.
export default function ScrollReveal() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"));
    if (!els.length) return;

    const cleanup = () => {
      removeEventListener("scroll", check);
      removeEventListener("resize", check);
    };
    const check = () => {
      els = els.filter((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
          el.classList.add("in");
          return false;
        }
        return true;
      });
      if (!els.length) cleanup();
    };

    addEventListener("scroll", check, { passive: true });
    addEventListener("resize", check);
    check();
    return cleanup;
  }, [location]);

  return null;
}
