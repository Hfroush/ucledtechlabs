import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  const programs = [
    { name: "London Program", href: "#programs" },
    { name: "Paris Program", href: "#programs" },
    { name: "Toronto Program", href: "#programs" },
    { name: "Dubai Program", href: "#programs" },
  ];

  const resources = [
    { name: "Methodology", href: "#methodology" },
    { name: "Success Stories", href: "#startups" },
    { name: "Mentor Network", href: "#" },
    { name: "Alumni Community", href: "#" },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId.replace("#", ""));
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-3xl font-bold text-[#c57e00]">UCL Edtech Labs</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Transforming education through innovation. Join our global community of EdTech entrepreneurs making learning accessible, engaging, and effective worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-gray-300">
              {programs.map((program) => (
                <li key={program.name}>
                  <button 
                    onClick={() => scrollToSection(program.href)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {program.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <button 
                    onClick={() => scrollToSection(resource.href)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {resource.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2025 UCL Edtech Labs. All rights reserved. Transforming education, one startup at a time.</p>
        </div>
      </div>
    </footer>
  );
}
