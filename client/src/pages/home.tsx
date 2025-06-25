import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import LogoCarousel from "@/components/logo-carousel";

import MethodologySection from "@/components/methodology-section";
import PastProgramsSection from "@/components/past-programs-section";
import StartupsSection from "@/components/startups-section";
import PartnersSection from "@/components/partners-section";
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
      <PastProgramsSection />
      <StartupsSection />
      <PartnersSection />
      <ApplicationForms />
      <Footer />
    </div>
  );
}
