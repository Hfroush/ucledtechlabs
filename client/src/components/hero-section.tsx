import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import postits_on_a_table from "@assets/postits-on-a-table.webp";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${postits_on_a_table})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      
      {/* Content overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Are you building an <span className="text-accent">edtech product</span> that could change the way people learn and teach?
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
          Turn your bold EdTech idea into real‑world impact, backed by research. Our mission is to build accelerator programs that collectively help improve the way people learn all over the world, based on true academic methods and iterated through hundreds of entrepreneurs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => scrollToSection("applications")}
                className="px-8 py-4 rounded-lg font-semibold transition-colors text-lg h-auto text-white bg-accent hover:bg-[#cc6e00]"
              >
                Register Interest
              </Button>
            </TooltipTrigger>
            <TooltipContent>Be first to know when applications open for our next cohort</TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2 bg-accent"></span>
            100% Equity-Free
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2 bg-accent"></span>
            Evidence-Led Method
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2 bg-accent"></span>
            Global Network
          </div>
        </div>
      </div>
    </section>
  );
}