import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import LogoCarousel from "@/components/logo-carousel";

import MethodologySection from "@/components/methodology-section";
import StartupsSection from "@/components/startups-section";
import FounderTestimonials from "@/components/founder-testimonials";
import ApplicationForms from "@/components/application-forms";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
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
