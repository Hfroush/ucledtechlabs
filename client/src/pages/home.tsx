import { useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import LogoCarousel from "@/components/logo-carousel";
import MethodologySection from "@/components/methodology-section";
import StartupsSection from "@/components/startups-section";
import FounderTestimonials from "@/components/founder-testimonials";
import ApplicationForms from "@/components/application-forms";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead
        title="UCL EdTech Labs — Evidence-Led EdTech Accelerator"
        description="UCL EdTech Labs is University College London's evidence-driven accelerator for education technology startups. 300+ startups accelerated across London, Paris, Toronto, and Dubai."
      />
      <Navigation />
      <HeroSection />
      <StatsSection />
      <LogoCarousel />
      <MethodologySection />
      <StartupsSection />
      <FounderTestimonials />
      <ApplicationForms />
      <Footer />
    </div>
  );
}
