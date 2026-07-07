
import Navigation from "@/components/navigation";
import PastProgramsSection from "@/components/past-programs-section";
import PartnersSection from "@/components/partners-section";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function PastProgramsPartnersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead
        title="Past Programmes & Partners — UCL EdTech Labs"
        description="Explore past UCL EdTech Labs accelerator cohorts and the partners and supporters behind the programme across London, Paris, and Toronto."
      />
      <Navigation />

      {/* Hero Section for Past Programs & Partners */}
      <section className="relative w-full py-24 md:py-32 flex items-center justify-center overflow-hidden bg-[#1a3e72] text-white">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true"></span>
            Supporters &amp; past programmes
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight text-balance">
            Our <span className="text-accent">global network</span> of partners and supporters
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed text-white/90">
            From London to Paris, discover the partners and institutions who make our
            evidence-led EdTech accelerator possible.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-white/90">
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full mr-2 bg-accent" aria-hidden="true"></span>
              12+ Cohorts Completed
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full mr-2 bg-accent" aria-hidden="true"></span>
              300+ Startups Supported
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full mr-2 bg-accent" aria-hidden="true"></span>
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
