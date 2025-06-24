import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import ProgramsSection from "@/components/programs-section";
import MethodologySection from "@/components/methodology-section";
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
      <MethodologySection />
      <ProgramsSection />
      <StartupsSection />
      <PartnersSection />
      <ApplicationForms />
      <Footer />
    </div>
  );
}
