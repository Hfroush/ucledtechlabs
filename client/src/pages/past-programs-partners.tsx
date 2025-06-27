
import Navigation from "@/components/navigation";
import PastProgramsSection from "@/components/past-programs-section";
import PartnersSection from "@/components/partners-section";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";

import cityscape_cartoon from "@assets/cityscape cartoon_1751016300492.png";

export default function PastProgramsPartnersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Hero Section for Past Programs & Partners */}
      <section className="gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Our <span className="text-[#e58c00]">Global Network</span> of Success Stories
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                From London to Paris, Toronto to Dubai - discover the remarkable journey of our past programs and the incredible partners who make our global EdTech accelerator possible.
              </p>
              <div className="flex flex-wrap items-center gap-8 mt-8 text-sm">
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
            <div className="lg:text-right">
              <div className="relative">
                <img 
                  src={cityscape_cartoon} 
                  alt="Global cities representing our international EdTech accelerator programs across London, Paris, Toronto, and Dubai" 
                  className="rounded-xl shadow-2xl w-full max-w-lg ml-auto"
                />
              </div>
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
