import type { CSSProperties } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useMagnetic from "@/hooks/use-magnetic";
import postits_on_a_table from "@assets/postits-on-a-table.webp";

const trustPoints = ["100% Equity-Free", "Evidence-Led Method", "Global Network"];

const delay = (s: number) => ({ "--rd": `${s}s` }) as CSSProperties;

export default function HeroSection() {
  const magneticRef = useMagnetic<HTMLButtonElement>();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 md:pt-24 md:pb-20 text-center">
        <span data-reveal className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true"></span>
          UCL's evidence-led EdTech accelerator
        </span>

        <h1 data-reveal style={delay(0.08)} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 text-balance max-w-5xl mx-auto mb-6">
          Are you building an <span className="text-accent">edtech product</span> that could change the way people learn and teach?
        </h1>

        <p data-reveal style={delay(0.12)} className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
          Turn your bold EdTech idea into real‑world impact, backed by research. Our mission is to build accelerator programs that collectively help improve the way people learn all over the world, based on true academic methods and iterated through hundreds of entrepreneurs.
        </p>

        <div data-reveal style={delay(0.16)} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                ref={magneticRef}
                onClick={() => scrollToSection("applications")}
                className="px-8 py-4 rounded-full font-semibold transition-colors text-base md:text-lg h-auto text-white bg-accent hover:bg-accent/90 hover:shadow-lg"
              >
                Register Interest
              </Button>
            </TooltipTrigger>
            <TooltipContent>Be first to know when applications open for our next cohort</TooltipContent>
          </Tooltip>
        </div>

        <div data-reveal style={delay(0.2)} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-600 mb-14">
          {trustPoints.map((point) => (
            <div key={point} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden="true" />
              {point}
            </div>
          ))}
        </div>

        <div data-reveal style={delay(0.24)} className="relative max-w-6xl mx-auto">
          <img
            src={postits_on_a_table}
            alt="Founders collaborating at a UCL EdTech Labs workshop"
            className="w-full rounded-2xl md:rounded-3xl object-cover aspect-[16/10] md:aspect-[21/9] ring-1 ring-black/5 shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
