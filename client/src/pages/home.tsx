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

export default function Home() {
  useEffect(() => {
    // Check if there's a hash in the URL and scroll to that section
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }

    // Announcement overlay functionality
    const showAnnouncement = () => {
      const overlay = document.getElementById('etl-topsheet');
      const backdrop = document.getElementById('etl-backdrop');
      
      if (overlay && backdrop) {
        overlay.classList.remove('translate-y-[-100%]', 'opacity-0');
        overlay.classList.add('translate-y-0', 'opacity-100');
        overlay.setAttribute('aria-hidden', 'false');
        backdrop.classList.remove('hidden');
      }
    };

    const hideAnnouncement = () => {
      const overlay = document.getElementById('etl-topsheet');
      const backdrop = document.getElementById('etl-backdrop');
      
      if (overlay && backdrop) {
        overlay.classList.add('translate-y-[-100%]', 'opacity-0');
        overlay.classList.remove('translate-y-0', 'opacity-100');
        overlay.setAttribute('aria-hidden', 'true');
        backdrop.classList.add('hidden');
      }
    };

    // Check if user has dismissed the announcement recently
    const hiddenTime = localStorage.getItem('etl-announcement-hidden');
    let shouldShow = true;
    if (hiddenTime) {
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - parseInt(hiddenTime) < sevenDays) {
        shouldShow = false;
      }
    }

    // Show announcement after 2 seconds if not recently dismissed
    const announcementTimer = shouldShow ? setTimeout(showAnnouncement, 2000) : null;

    // Bind close buttons
    const closeBtn = document.getElementById('etl-close');
    const dismissBtn = document.getElementById('etl-dismiss');
    const backdrop = document.getElementById('etl-backdrop');

    const handleClose = () => {
      hideAnnouncement();
      const dontShowCheckbox = document.getElementById('etl-dontshow') as HTMLInputElement;
      if (dontShowCheckbox?.checked) {
        localStorage.setItem('etl-announcement-hidden', Date.now().toString());
      }
    };

    closeBtn?.addEventListener('click', handleClose);
    dismissBtn?.addEventListener('click', handleClose);
    backdrop?.addEventListener('click', handleClose);

    return () => {
      closeBtn?.removeEventListener('click', handleClose);
      dismissBtn?.removeEventListener('click', handleClose);
      backdrop?.removeEventListener('click', handleClose);
      if (announcementTimer) clearTimeout(announcementTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      {/* Autumn '25 Applications Overlay */}
      <section id="etl-topsheet"
        className="fixed inset-x-0 top-32 z-[60] translate-y-[-100%] opacity-0 transition duration-500 will-change-transform"
        aria-hidden="true">
        {/* Backdrop */}
        <div id="etl-backdrop" className="hidden fixed inset-0 bg-black/25"></div>

        {/* Panel */}
        <div className="relative mx-auto max-w-screen-xl">
          <div className="mx-4 mt-3 rounded-2xl shadow-2xl ring-1 ring-black/5 bg-white overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Accent */}
              <div className="md:w-2 rounded-none md:rounded-l-2xl bg-[#FF6C0E]"></div>

              {/* Content */}
              <div className="flex-1 p-6 md:p-8">
                <p className="uppercase tracking-wide text-xs font-semibold text-slate-500">
                  Announcement
                </p>
                <h2 className="mt-1 text-2xl md:text-3xl font-bold text-slate-900">AIEd cohort update: Startup applications closed.</h2>
                <p className="mt-2 text-slate-600">Register interest below to join the waitlist for future cohorts and events.</p>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <a href="/apply"
                     className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-white bg-[#FF6C0E] hover:bg-[#e55a00] transition-colors">
                    Apply Now
                  </a>
                  <a href="/autumn-2025"
                     className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-[#FF6C0E] bg-white border-2 border-[#FF6C0E] hover:bg-[#FF6C0E] hover:text-white transition-colors">
                    Learn More
                  </a>
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                    <input id="etl-dontshow" type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                    Don't show again for 7 days
                  </label>
                  <button id="etl-dismiss"
                          className="ml-auto text-sm font-medium text-slate-500 hover:text-slate-700">
                    Dismiss
                  </button>
                </div>
              </div>

              {/* Close (X) */}
              <button id="etl-close" aria-label="Close announcement"
                      className="absolute right-3 top-3 rounded-full p-2 text-slate-500 hover:bg-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
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
