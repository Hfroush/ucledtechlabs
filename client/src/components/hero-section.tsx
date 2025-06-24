import { Button } from "@/components/ui/button";

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
              Transform Education Through <span className="text-accent">Innovation</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Join our 12-week accelerator program across London, Paris, Toronto, and Dubai. 
              100% equity-free with $1M worth of member perks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection("apply")}
                className="bg-accent text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors text-lg h-auto"
              >
                Apply to Current Program
              </Button>
              <Button 
                onClick={() => scrollToSection("apply")}
                variant="outline"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all text-lg h-auto"
              >
                Register Interest
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-8 mt-8 text-sm">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-success rounded-full mr-2"></span>
                100% Equity-Free
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-success rounded-full mr-2"></span>
                $1M Member Perks
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-success rounded-full mr-2"></span>
                Global Network
              </div>
            </div>
          </div>
          <div className="lg:text-right">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Educational technology startup workspace" 
              className="rounded-xl shadow-2xl w-full max-w-lg ml-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
