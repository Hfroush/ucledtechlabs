import { Button } from "@/components/ui/button";

import postits_on_a_table from "@assets/postits on a table.png";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="gradient-primary text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Are you building an <span className="text-[#e58c00]">edtech product</span> that could change the way people learn and teach?
            </h1>
            <p className="text-xl mb-8 text-blue-100">Turn your bold EdTech idea into real‑world impact, backed by research. Our mission is to build accelerator programs that collectively help improve the way people learn all over the world, based on true academic methods and iterated through hundreds of entrepreneurs. We will guide you through our powerful and effective methodology to build successful learning and teaching products as well as introduce you to the most suitable and successful mentors.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection("apply")}
                className="px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors text-lg h-auto text-[#ffffff] bg-[#e57c00]"
              >
                Register Interest
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-8 mt-8 text-sm">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2 bg-[#e59c00]"></span>
                100% Equity-Free
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2 bg-[#e59c00]"></span>
                Evidence-Led Method
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2 bg-[#e59c00]"></span>
                Global Network
              </div>
            </div>
          </div>
          <div className="lg:text-right">
            <div className="relative">
              <img 
                src={postits_on_a_table} 
                alt="Collaborative workshop with educators and entrepreneurs" 
                className="rounded-xl shadow-2xl w-full max-w-lg ml-auto"
              />
              {/* Alternative: EdTech SVG illustration */}
              {/* <img 
                src="/hero-edtech.svg" 
                alt="EdTech innovation and learning technology" 
                className="rounded-xl shadow-2xl w-full max-w-lg ml-auto"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
