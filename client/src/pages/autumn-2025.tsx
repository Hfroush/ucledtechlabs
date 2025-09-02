import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function Autumn2025() {
  useEffect(() => {
    // Scroll reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(element => {
      observer.observe(element);
    });

    // Timeline progress indicator
    const handleScroll = () => {
      const timeline = document.getElementById('timeline-section');
      if (timeline) {
        const rect = timeline.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          const dots = timeline.querySelectorAll('.timeline-dot');
          dots.forEach((dot, index) => {
            setTimeout(() => {
              dot.classList.add('animate-pulse');
            }, index * 200);
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    const handleBackToTop = () => {
      if (window.pageYOffset > 300) {
        backToTop?.classList.add('show');
      } else {
        backToTop?.classList.remove('show');
      }
    };

    window.addEventListener('scroll', handleBackToTop);

    // Mobile sticky CTA
    const mobileCTA = document.getElementById('mobile-cta');
    let ctaShown = false;
    const handleMobileCTA = () => {
      const scrolled = window.pageYOffset;
      const viewportHeight = window.innerHeight;

      if (scrolled > viewportHeight && !ctaShown && window.innerWidth < 768) {
        mobileCTA?.classList.remove('translate-y-full');
        ctaShown = true;
      } else if (scrolled <= viewportHeight && ctaShown) {
        mobileCTA?.classList.add('translate-y-full');
        ctaShown = false;
      }
    };

    window.addEventListener('scroll', handleMobileCTA);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleBackToTop);
      window.removeEventListener('scroll', handleMobileCTA);
    };
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "UCL EdTech Labs",
        "url": "https://ucledtechlabs.com",
        "logo": "https://ucledtechlabs.com/logo.png",
        "description": "AI-first education technology accelerator at University College London"
      },
      {
        "@type": "Event",
        "name": "UCL EdTech Labs Autumn '25 Accelerator",
        "description": "Evidence-driven accelerator programme for AI-first education startups",
        "startDate": "2025-10-01",
        "endDate": "2026-01-31",
        "location": {
          "@type": "Place",
          "name": "University College London",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "London",
            "addressCountry": "UK"
          }
        },
        "organizer": {
          "@type": "Organization",
          "name": "UCL EdTech Labs"
        },
        "applicationDeadline": "2025-09-19"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead
        title="UCL EdTech Labs Autumn '25 — Call for AI EdTech Startups"
        description="Oct–Jan 2026 accelerator in London. Evidence-driven pathway for AI-first education startups. Apply by early September."
        structuredData={structuredData}
      />
      <Navigation />
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-[#1a3e72]">
        {/* Background Image */}
        <img 
          src="/attached_assets/UCL-Welcome-2024-04.jpg_1756365039242.jpg"
          alt="UCL Welcome Building"
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => {
            console.log('Image failed to load:', e);
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-[#1a3e72]/50 z-10"></div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white scroll-reveal opacity-0 animate-fade-in">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Accelerate your <span className="text-[#FF6C0E]">AI edtech startup</span> at UCL.
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Oct–Jan 2026 • London + Hybrid • Evidence-driven, founder-focused.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a 
              href="#apply" 
              className="bg-[#FF6C0E] hover:bg-[#e55a00] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Apply Now
            </a>
            <a 
              href="#programme" 
              className="border-2 border-white text-white hover:bg-white hover:text-[#1a3e72] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Learn More
            </a>
          </div>

          <div className="text-sm text-white/90 mb-4">
            Application deadline: <span className="font-semibold text-[#FF6C0E]">19 September 2025</span>
          </div>
        </div>
      </section>
      {/* Value Props */}
      <section className="py-20 bg-white scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3e72] mb-4">Why Choose UCL EdTech Labs</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-[#FF6C0E]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF6C0E]/20">
                <svg className="w-8 h-8 text-[#FF6C0E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1a3e72] mb-2">Validation First</h3>
              <p className="text-gray-600">Evidence that drives traction and revenue.</p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-[#FF6C0E]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF6C0E]/20">
                <svg className="w-8 h-8 text-[#FF6C0E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1a3e72] mb-2">Product Velocity</h3>
              <p className="text-gray-600">Tight feedback loops, faster learning.</p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-[#FF6C0E]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF6C0E]/20">
                <svg className="w-8 h-8 text-[#FF6C0E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1a3e72] mb-2">Expert Direction</h3>
              <p className="text-gray-600">UCL academics, product leaders, operators.</p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-[#FF6C0E]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF6C0E]/20">
                <svg className="w-8 h-8 text-[#FF6C0E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1a3e72] mb-2">Pitch Ready</h3>
              <p className="text-gray-600">Investor-ready stories, impact metrics.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Programme Overview */}
      <section id="programme" className="py-20 bg-slate-50 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3e72] mb-4">Programme Overview</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A structured pathway to market-ready outcomes</p>
          </div>

          {/* Mobile and Tablet Layout */}
          <div className="grid md:grid-cols-2 gap-8 lg:hidden">
            {/* Stage 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-[#FF6C0E] font-bold text-sm mb-2">STAGE 1</div>
              <h3 className="text-xl font-bold text-[#1a3e72] mb-4">Setting the Foundations</h3>
              <ul className="text-gray-600 space-y-2">
                <li>🔑 Clarity from day one. Cut the noise and get crystal clear on who you serve, why it matters, and how you’ll measure success.</li>
                <li>• Map your users and stakeholders with precision</li>
                <li>• Pressure-test your assumptions before they cost you</li>
                <li>You leave with: A sharp logic model, a focused mission, and the tools to align your team and story.</li>
              </ul>
            </div>

            {/* Stage 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-[#FF6C0E] font-bold text-sm mb-2">STAGE 2</div>
              <h3 className="text-xl font-bold text-[#1a3e72] mb-4">The Research Method</h3>
              <ul className="text-gray-600 space-y-2">
                <li>🔍 Decisions powered by evidence, not guesswork. Learn a repeatable system for testing ideas, gathering insights, and avoiding expensive mistakes.</li>
                <li>• Master practical methods without the jargon</li>
                <li>• Build lean surveys, interviews, and tests that actually convert into answers</li>
                <li>You leave with: A research library, a live research plan, and the confidence to validate any big bet.</li>
              </ul>
            </div>

            {/* Stage 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-[#FF6C0E] font-bold text-sm mb-2">STAGE 3</div>
              <h3 className="text-xl font-bold text-[#1a3e72] mb-4">AIEd Stream</h3>
              <ul className="text-gray-600 space-y-2">
                <li>⚡ Cut through the AI hype — deploy what matters. Understand what’s real, what’s possible, and how to build AI into your product roadmap.</li>
                <li>• Explore how AI plays out in real educational contexts</li>
                <li>• Map the landscape with AWS architects</li>
                <li>You leave with: A deployment framework, a bank of real use cases, and a draft AI implementation plan.</li>
              </ul>
            </div>

            {/* Stage 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-[#FF6C0E] font-bold text-sm mb-2">STAGE 4</div>
              <h3 className="text-xl font-bold text-[#1a3e72] mb-4">Applying the Method</h3>

              <ul className="text-gray-600 space-y-2">
                <li>🎤 Turn validation into a story investors can’t ignore. It’s not just about the outcomes — it’s about the story you build around it.</li>
                <li>• Shape a sales narrative that lands with partners and investors</li>
                <li>• End with funding insights you can run with tomorrow</li>
                <li>You leave with: An investor-ready pitch deck, impact metrics that matter, and a clear growth path.</li>
              </ul>
            </div>
          </div>

          {/* Desktop Layout - Stage 4 Centered */}
          <div className="hidden lg:block">
            {/* First Row - Stages 1, 2, 3 */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              {/* Stage 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-[#FF6C0E] font-bold text-sm mb-2">STAGE 1</div>
                <h3 className="text-xl font-bold text-[#1a3e72] mb-4">Setting the Foundations</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>🔑 Clarity from day one. Cut the noise and get crystal clear on who you serve, why it matters, and how you'll measure success.</li>
                  <li>• Map your users and stakeholders with precision</li>
                  <li>• Pressure-test your assumptions before they cost you</li>
                  <li>You leave with: A sharp logic model, a focused mission, and the tools to align your team and story.</li>
                </ul>
              </div>

              {/* Stage 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-[#FF6C0E] font-bold text-sm mb-2">STAGE 2</div>
                <h3 className="text-xl font-bold text-[#1a3e72] mb-4">The Research Method</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>🔍 Decisions powered by evidence, not guesswork. Learn a repeatable system for testing ideas, gathering insights, and avoiding expensive mistakes.</li>
                  <li>• Master practical methods without the jargon</li>
                  <li>• Build lean surveys, interviews, and tests that actually convert into answers</li>
                  <li>You leave with: A research library, a live research plan, and the confidence to validate any big bet.</li>
                </ul>
              </div>

              {/* Stage 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-[#FF6C0E] font-bold text-sm mb-2">STAGE 3</div>
                <h3 className="text-xl font-bold text-[#1a3e72] mb-4">AIEd Stream</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>⚡ Cut through the AI hype — deploy what matters. Understand what's real, what's possible, and how to build AI into your product roadmap.</li>
                  <li>• Explore how AI plays out in real educational contexts</li>
                  <li>• Map the landscape with AWS architects</li>
                  <li>You leave with: A deployment framework, a bank of real use cases, and a draft AI implementation plan.</li>
                </ul>
              </div>
            </div>

            {/* Second Row - Stage 4 Centered */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-[#FF6C0E] font-bold text-sm mb-2">STAGE 4</div>
                  <h3 className="text-xl font-bold text-[#1a3e72] mb-4">Applying the Method</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>🎤 Turn validation into a story investors can't ignore. It's not just about the outcomes — it's about the story you build around it.</li>
                    <li>• Shape a sales narrative that lands with partners and investors</li>
                    <li>• End with funding insights you can run with tomorrow</li>
                    <li>You leave with: An investor-ready pitch deck, impact metrics that matter, and a clear growth path.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Timeline */}
      <section id="timeline-section" className="py-20 bg-white scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3e72] mb-4">Programme Timeline</h2>
            <p className="text-xl text-gray-600">Five months from application to showcase</p>
          </div>

          {/* Mobile Timeline - Vertical Layout */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#1a3e72]"></div>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-[#FF6C0E] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0 relative z-10">
                    1
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-lg flex-1">
                    <div className="font-bold text-[#1a3e72] text-lg">September</div>
                    <div className="text-sm text-gray-600">Call Opens</div>
                    <div className="text-xs text-gray-500 mt-1">Sept 1-19</div>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-[#FF6C0E] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0 relative z-10">
                    2
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-lg flex-1">
                    <div className="font-bold text-[#1a3e72] text-lg">October</div>
                    <div className="text-sm text-gray-600">Foundations</div>
                    <div className="text-xs text-gray-500 mt-1">Kick-off & Setup</div>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-[#FF6C0E] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0 relative z-10">
                    3
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-lg flex-1">
                    <div className="font-bold text-[#1a3e72] text-lg">November</div>
                    <div className="text-sm text-gray-600">Research Method</div>
                    <div className="text-xs text-gray-500 mt-1">+ AI 101 Stream</div>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-[#FF6C0E] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0 relative z-10">
                    4
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-lg flex-1">
                    <div className="font-bold text-[#1a3e72] text-lg">December</div>
                    <div className="text-sm text-gray-600">Applying Method</div>
                    <div className="text-xs text-gray-500 mt-1">Implementation</div>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-[#FF6C0E] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0 relative z-10">
                    5
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-lg flex-1">
                    <div className="font-bold text-[#1a3e72] text-lg">January</div>
                    <div className="text-sm text-gray-600">Final Day</div>
                    <div className="text-xs text-gray-500 mt-1">BETT '26 Week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Timeline - Horizontal Layout */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="flex justify-between items-center">
                <div className="timeline-dot flex flex-col items-center relative">
                  <div className="w-6 h-6 bg-[#FF6C0E] rounded-full border-4 border-white shadow-lg mb-4"></div>
                  <div className="text-center">
                    <div className="font-bold text-[#1a3e72]">September</div>
                    <div className="text-sm text-gray-600">Call Opens</div>
                    <div className="text-xs text-gray-500">Sept 1-19</div>
                  </div>
                  <div className="absolute top-3 left-full w-20 h-0.5 bg-[#1a3e72]"></div>
                </div>

                <div className="timeline-dot flex flex-col items-center relative">
                  <div className="w-6 h-6 bg-[#FF6C0E] rounded-full border-4 border-white shadow-lg mb-4"></div>
                  <div className="text-center">
                    <div className="font-bold text-[#1a3e72]">October</div>
                    <div className="text-sm text-gray-600">Foundations</div>
                    <div className="text-xs text-gray-500">Kick-off & Setup</div>
                  </div>
                  <div className="absolute top-3 left-full w-20 h-0.5 bg-[#1a3e72]"></div>
                </div>

                <div className="timeline-dot flex flex-col items-center relative">
                  <div className="w-6 h-6 bg-[#FF6C0E] rounded-full border-4 border-white shadow-lg mb-4"></div>
                  <div className="text-center">
                    <div className="font-bold text-[#1a3e72]">November</div>
                    <div className="text-sm text-gray-600">Research Method</div>
                    <div className="text-xs text-gray-500">+ AI 101 Stream</div>
                  </div>
                  <div className="absolute top-3 left-full w-20 h-0.5 bg-[#1a3e72]"></div>
                </div>

                <div className="timeline-dot flex flex-col items-center relative">
                  <div className="w-6 h-6 bg-[#FF6C0E] rounded-full border-4 border-white shadow-lg mb-4"></div>
                  <div className="text-center">
                    <div className="font-bold text-[#1a3e72]">December</div>
                    <div className="text-sm text-gray-600">Applying Method</div>
                    <div className="text-xs text-gray-500">Implementation</div>
                  </div>
                  <div className="absolute top-3 left-full w-20 h-0.5 bg-[#1a3e72]"></div>
                </div>

                <div className="timeline-dot flex flex-col items-center">
                  <div className="w-6 h-6 bg-[#FF6C0E] rounded-full border-4 border-white shadow-lg mb-4"></div>
                  <div className="text-center">
                    <div className="font-bold text-[#1a3e72]">January</div>
                    <div className="text-sm text-gray-600">Final Day</div>
                    <div className="text-xs text-gray-500">BETT '26 Week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Selection Criteria */}
      <section className="py-20 bg-slate-50 scroll-reveal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3e72] mb-4">Selection Criteria</h2>
            <p className="text-xl text-gray-600">What we're looking for in applicants</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-6 h-6 bg-[#FF6C0E] rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#1a3e72] mb-2">AI-first product approach</h3>
                <p className="text-gray-600">Your product uses machine learning, natural language processing, or other forms of artificial intelligence as a core feature, not just an add-on.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-6 h-6 bg-[#FF6C0E] rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#1a3e72] mb-2">Traction, testable prototype, or research foundation</h3>
                <p className="text-gray-600">You have early users, a working prototype, or solid research backing your approach. Exceptions require strong selector case.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-6 h-6 bg-[#FF6C0E] rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#1a3e72] mb-2">Research mindset and responsible development</h3>
                <p className="text-gray-600">You're committed to evidence-based development and ethical considerations around privacy, bias, and educational impact.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-6 h-6 bg-[#FF6C0E] rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#1a3e72] mb-2">Team capacity to execute during programme</h3>
                <p className="text-gray-600">You have the technical skills and time commitment to make meaningful progress during the programme.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Workshops & Partners */}
      <section className="py-20 bg-white scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3e72] mb-4">Delivery Partners</h2>
            <p className="text-xl text-gray-600">Learn from the best in education and technology</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 rounded-2xl mx-auto mb-4 overflow-hidden shadow-md">
                <img 
                  src="/attached_assets/ioe-logo-standalone-blue_1756459020645.png" 
                  alt="UCL Institute of Education" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-[#1a3e72] mb-2">Institute of Education</h3>
              <p className="text-sm text-gray-600">World #1 in Education (12 years running, QS 2025). Home to UCL Knowledge Lab, and contributors to UNESCO's global guidance on GenAI in education.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-16 rounded-2xl mx-auto mb-4 overflow-hidden shadow-md">
                <img 
                  src="/attached_assets/Screenshot 2025-08-29 at 13.14.46_1756458918577.png" 
                  alt="UCL Centre for Digital Innovation powered by AWS" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-[#1a3e72] mb-2">Centre for Digital Innovation powered by AWS</h3>
              <p className="text-sm text-gray-600">Cloud architecture, data pipelines, and security patterns aligned with enterprise expectations.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-20 h-16 rounded-2xl mx-auto mb-4 overflow-hidden shadow-md">
                <img 
                  src="/attached_assets/edtech impact_1756458967959.png" 
                  alt="Edtech Impact" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-[#1a3e72] mb-2">Edtech Impact</h3>
              <p className="text-sm text-gray-600">The leading independent reviews and quality framework for EdTech. Helps schools compare, choose, and trust products.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 overflow-hidden shadow-md">
                <img 
                  src="/attached_assets/Screenshot 2025-08-29 at 13.11.56_1756458740146.png" 
                  alt="Startup Labs Global" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-[#1a3e72] mb-2">Startup Labs Global</h3>
              <p className="text-sm text-gray-600">Selection, coaching, and an evidence-driven playbook that turns validation into product velocity and investor-ready stories.</p>
            </div>
          </div>
        </div>
      </section>
      {/* IOE AIEd Leadership */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 scroll-reveal">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3e72] mb-4">IOE's AIEd Leadership</h2>
            <p className="text-xl text-gray-600">Why UCL Institute of Education gives us an unfair advantage</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#FF6C0E] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a3e72] mb-3">World #1 in Education Research</h3>
                  <p className="text-gray-600 leading-relaxed">
                    <strong>World #1 in Education (QS 2025)</strong> — consistent depth and scale in education research & impact.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3">
                    <strong>UCL Knowledge Lab</strong> — interdisciplinary lab focused on AI and education, co-design, and real-world deployment.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#1a3e72] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a3e72] mb-3">Global Policy Influence</h3>
                  <p className="text-gray-600 leading-relaxed">
                    <strong>Global policy influence</strong> — IOE researchers co-authored UNESCO's first global guidance on GenAI in education, shaping responsible adoption.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3">
                    <strong>OECD & UK government advisory</strong> — IOE experts regularly advise the OECD, Ofsted, and the Department for Education on the safe and effective use of AI and digital technologies in schools.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6C0E] to-[#1a3e72] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a3e72] mb-3">EdTech Startup Track Record</h3>
                  <p className="text-gray-600 leading-relaxed">
                    <strong>EdTech startup track record</strong> — UCL EdTech Labs has already supported 500+ startups through its accelerator programmes in London and Paris. This track record shows that UCL doesn't just generate ideas — it scales companies that transform learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Application CTA */}
      <section className="py-20 bg-gradient-to-br from-[#1a3e72] to-[#2d5aa0] text-white scroll-reveal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to accelerate your AI edtech startup?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join UCL's evidence-driven accelerator programme.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a 
              href="#apply" 
              className="bg-[#FF6C0E] hover:bg-[#e55a00] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Apply Now - Deadline Sep 19
            </a>
          </div>

          <p className="text-sm opacity-75">
            Questions? Email <a href="mailto:edtechlabs@ucl.ac.uk" className="underline hover:no-underline">info@ucledtechlabs.com</a>
          </p>
        </div>
      </section>
      <Footer />
      {/* Back to Top Button */}
      <button 
        id="backToTop" 
        className="fixed bottom-8 right-8 bg-[#FF6C0E] hover:bg-[#e55a00] text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 transform translate-y-full opacity-0"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
      {/* Mobile Sticky CTA */}
      <div id="mobile-cta" className="fixed bottom-0 left-0 right-0 bg-[#FF6C0E] p-4 z-40 md:hidden transform translate-y-full transition-transform">
        <a 
          href="#apply" 
          className="block w-full bg-white text-[#FF6C0E] text-center py-3 rounded-lg font-semibold"
        >
          Apply Now
        </a>
      </div>
      <style>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }

        .scroll-reveal.animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-fade-in {
          animation: fadeInUp 1.2s ease-out forwards;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        #backToTop.show {
          transform: translateY(0);
          opacity: 1;
        }

        /* Ensure navigation stays above hero */
        nav {
          z-index: 1000;
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-reveal,
          .animate-fade-in,
          .transition-all,
          .transform {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}