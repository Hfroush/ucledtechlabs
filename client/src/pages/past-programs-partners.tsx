
import Navigation from "@/components/navigation";
import PastProgramsSection from "@/components/past-programs-section";
import PartnersSection from "@/components/partners-section";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

import cityscape_cartoon from "@assets/cityscape-cartoon.webp";

export default function PastProgramsPartnersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead
        title="Past Programmes & Partners — UCL EdTech Labs"
        description="Explore past UCL EdTech Labs accelerator cohorts and the partners and supporters behind the programme across London, Paris, and Toronto."
      />
      <Navigation />

      {/* Hero Section for Past Programs & Partners */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden text-white"
        style={{
          backgroundImage: `url(${cityscape_cartoon})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        
        {/* Content overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Our <span className="text-[#e58c00]">Global Network</span> of Partners and Supporters
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
            From London to Paris, Toronto to Dubai - discover the remarkable journey of our past programs and the incredible partners who make our global EdTech accelerator possible.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-2 bg-[#e59c00]"></span>
              12+ Cohorts Completed
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-2 bg-[#e59c00]"></span>
              300+ Startups Supported
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-2 bg-[#e59c00]"></span>
              £37M+ Funding Raised
            </div>
          </div>
        </div>
      </section>

      <div className="pt-0">
        <PastProgramsSection />
        <PartnersSection />
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}
