import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Menu } from "lucide-react";
import { Link } from "wouter";
import uclLogo from "@assets/ucl-logo.webp";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
      setIsOpen(false);
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-[1000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/" onClick={() => {
                  if (window.location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}>
                  <img
                    src={uclLogo}
                    alt="UCL EdTech Labs"
                    className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Go to homepage</TooltipContent>
            </Tooltip>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => scrollToSection("methodology")}
                    className="nav-underline text-gray-700 hover:text-primary transition-colors"
                  >
                    Methodology
                  </button>
                </TooltipTrigger>
                <TooltipContent>Learn about our evidence-led program approach</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => scrollToSection("startups")}
                    className="nav-underline text-gray-700 hover:text-primary transition-colors"
                  >
                    Startups
                  </button>
                </TooltipTrigger>
                <TooltipContent>See the EdTech startups in our portfolio</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/autumn-2025" className="nav-underline text-gray-700 hover:text-primary transition-colors">
                    London
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Autumn 2025 London cohort details</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/paris" className="nav-underline text-gray-700 hover:text-primary transition-colors">
                    Paris
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Paris cohort details</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/past-programs-partners" className="nav-underline text-gray-700 hover:text-primary transition-colors">
                    Supporters
                  </Link>
                </TooltipTrigger>
                <TooltipContent>View past programs and our partners</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/resources" className="nav-underline text-gray-700 hover:text-primary transition-colors">
                    Resources
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Guides and FAQs on the programme and methodology</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/about" className="nav-underline text-gray-700 hover:text-primary transition-colors">
                    About
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Who we are and what we do</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => scrollToSection("applications")}
                    className="bg-accent text-white hover:bg-accent/90 motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md"
                  >
                    Register Interest
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Be first to know when applications open</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Open navigation menu</TooltipContent>
                </Tooltip>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
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
                  <Link
                    href="/autumn-2025"
                    className="block text-left text-gray-700 hover:text-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    London
                  </Link>
                  <Link
                    href="/paris"
                    className="block text-left text-gray-700 hover:text-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Paris
                  </Link>
                  <Link
                    href="/past-programs-partners"
                    className="block text-left text-gray-700 hover:text-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Supporters and Programs
                  </Link>
                  <Link
                    href="/resources"
                    className="block text-left text-gray-700 hover:text-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Resources
                  </Link>
                  <Link
                    href="/about"
                    className="block text-left text-gray-700 hover:text-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-left text-gray-700 hover:text-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                  <Button
                    onClick={() => {
                      scrollToSection("applications");
                      setIsOpen(false);
                    }}
                    className="bg-accent text-white hover:bg-accent/90 w-full mt-4"
                  >
                    Register Interest
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
