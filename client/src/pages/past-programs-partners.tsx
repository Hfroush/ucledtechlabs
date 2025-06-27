
import Navigation from "@/components/navigation";
import PastProgramsSection from "@/components/past-programs-section";
import PartnersSection from "@/components/partners-section";
import Footer from "@/components/footer";

export default function PastProgramsPartnersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <div className="pt-20">
        <PastProgramsSection />
        <PartnersSection />
      </div>
      <Footer />
    </div>
  );
}
