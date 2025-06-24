import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <img 
              src="@assets/UCL_Standalone_Edtech Labs_1750772002603.png" 
              alt="UCL EdTech Labs" 
              className="h-8 w-auto"
            />
            <span className="text-2xl font-bold text-primary">UCL Edtech Labs</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection("programs")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Programs
              </button>
              <button 
                onClick={() => scrollToSection("methodology")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Methodology
              </button>
              <button 
                onClick={() => scrollToSection("startups")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Startups
              </button>
              <button 
                onClick={() => scrollToSection("partners")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Partners
              </button>
              <Button 
                onClick={() => scrollToSection("apply")}
                className="bg-primary text-white hover:bg-blue-700"
              >
                Apply Now
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <button 
                    onClick={() => scrollToSection("programs")}
                    className="text-left text-gray-700 hover:text-primary transition-colors py-2"
                  >
                    Programs
                  </button>
                  <button 
                    onClick={() => scrollToSection("methodology")}
                    className="text-left text-gray-700 hover:text-primary transition-colors py-2"
                  >
                    Methodology
                  </button>
                  <button 
                    onClick={() => scrollToSection("startups")}
                    className="text-left text-gray-700 hover:text-primary transition-colors py-2"
                  >
                    Startups
                  </button>
                  <button 
                    onClick={() => scrollToSection("partners")}
                    className="text-left text-gray-700 hover:text-primary transition-colors py-2"
                  >
                    Partners
                  </button>
                  <Button 
                    onClick={() => scrollToSection("apply")}
                    className="bg-primary text-white hover:bg-blue-700 w-full mt-4"
                  >
                    Apply Now
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
