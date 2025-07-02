import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import postits_on_a_table from "@assets/postits on a table.png";

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Check if WebP is supported and preload appropriate image
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    const img = new Image();
    img.onload = () => setImageLoaded(true);
    
    // Use WebP if supported, otherwise fallback to PNG
    if (supportsWebP()) {
      img.src = '/postits-on-a-table.webp'; // You'll need to create this
    } else {
      img.src = postits_on_a_table;
    }
  }, []);
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#1a1a1a' // Fallback color while loading
      }}
    >
      {/* Background image with loading state */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: imageLoaded ? `url(${postits_on_a_table})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll'
        }}
      />
      
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 animate-pulse" />
      )}
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      
      {/* Content overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Are you building an <span className="text-[#e58c00]">edtech product</span> that could change the way people learn and teach?
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
          Turn your bold EdTech idea into real‑world impact, backed by research. Our mission is to build accelerator programs that collectively help improve the way people learn all over the world, based on true academic methods and iterated through hundreds of entrepreneurs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            onClick={() => scrollToSection("apply")}
            className="px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors text-lg h-auto text-[#ffffff] bg-[#e57c00]"
          >
            Register Interest
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
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
    </section>
  );
}