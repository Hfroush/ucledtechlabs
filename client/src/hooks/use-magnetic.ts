import { useEffect, useRef } from "react";

const PULL = 0.32;
const MAX = 6;
const LIFT = 2;

// Magnetic button: leans a few px toward the cursor and springs back on
// leave. Touch devices and reduced-motion users are excluded. Attach the
// returned ref to the element.
export default function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    el.style.transition =
      "transform 0.18s cubic-bezier(0.22, 0.61, 0.36, 1), background-color 0.15s ease, color 0.15s ease, box-shadow 0.18s ease";
    const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v));

    const onMove = (e: MouseEvent) => {
      const b = el.getBoundingClientRect();
      const dx = clamp((e.clientX - (b.left + b.width / 2)) * PULL);
      const dy = clamp((e.clientY - (b.top + b.height / 2)) * PULL) - LIFT;
      el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.style.transform = "";
    };
  }, []);

  return ref;
}
