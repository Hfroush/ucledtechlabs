import { useEffect, useRef, useState } from "react";

const COUNT_DURATION = 1400;

// Split a figure like "£500M+" into prefix, number, and suffix so it can
// count up from zero while keeping its currency and unit markers.
function formatValue(value: string, progress: number) {
  const m = value.match(/^([^0-9]*)(\d+)(.*)$/);
  if (!m) return value;
  return m[1] + Math.round(parseInt(m[2], 10) * progress) + m[3];
}

export default function StatsSection() {
  const stats = [
    { value: "300+", label: "Startups Accelerated" },
    { value: "12", label: "Cohorts" },
    { value: "8M", label: "Learners Impacted" },
    { value: "£500M+", label: "Total Startup Valuation" },
    { value: "£37M+", label: "Funding Raised" },
    { value: "28+", label: "Investment Rounds" },
  ];

  const gridRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let raf = 0;
    // Same position-check trigger as ScrollReveal: a scroll listener can't
    // skip past the section the way an IntersectionObserver callback can on
    // fast scrolls or deep links.
    const cleanup = () => {
      removeEventListener("scroll", check);
      removeEventListener("resize", check);
    };
    const check = () => {
      if (grid.getBoundingClientRect().top >= window.innerHeight * 0.88) return;
      cleanup();
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / COUNT_DURATION);
        setProgress(1 - Math.pow(1 - t, 3)); // ease-out cubic
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    addEventListener("scroll", check, { passive: true });
    addEventListener("resize", check);
    check();
    return () => {
      cleanup();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={gridRef} data-reveal className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold text-primary mb-2 tabular-nums">
                {formatValue(stat.value, progress)}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
