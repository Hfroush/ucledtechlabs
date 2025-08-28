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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Stage 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-[#FF6C0E] font-bold text-sm mb-2">STAGE 1</div>
              <h3 className="text-xl font-bold text-[#1a3e72] mb-4">Setting the Foundations</h3>
              <ul className="text-gray-600 space-y-2">
                <li>🔑 Clarity from day one.Cut the noise and get crystal clear on who you serve, why it matters, and how you’ll measure success.</li>
                <li>• Map your users and stakeholders with precision</li>
                <li>• Pressure-test your assumptions before they cost you</li>
                <li>You leave with: A sharp logic model, a focused mission, and the tools to align your team and story.</li>
              </ul>
            </div>

            {/* Stage 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-[#FF6C0E] font-bold text-sm mb-2">STAGE 2</div>
              <h3 className="text-xl font-bold text-[#1a3e72] mb-4">The Research Method</h3>
              <div className="text-sm text-gray-500 mb-3">4 weeks</div>
              <ul className="text-gray-600 space-y-2">
                <li>• Research Methods Masterclass (3×2h)</li>
                <li>• Tool-Kit tutorials (surveys, interviews)</li>
                <li>• Methodology Clinics (4×1h)</li>
                <li>• Outcomes: Research Library, Research Question, Research Plan, templates</li>
              </ul>
            </div>

            {/* Stage 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-[#FF6C0E] font-bold text-sm mb-2">STAGE 3</div>
              <h3 className="text-xl font-bold text-[#1a3e72] mb-4">AI 101 Stream</h3>
              <div className="text-sm text-gray-500 mb-3">3–4 weeks, integrated</div>
              <ul className="text-gray-600 space-y-2">
                <li>• AI Deployment in Educational Contexts (IOE, 2h)</li>
                <li>• AI 101: Landscape, Use Cases & Implementation (CDI AWS Solutions Architect, 2h)</li>
                <li>• Product Development 101 (CDI, 2h)</li>
                <li>• Outcomes: Deployment framework, use-case inventory, draft implementation roadmap</li>
              </ul>
            </div>

            {/* Stage 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-[#FF6C0E] font-bold text-sm mb-2">STAGE 4</div>
              <h3 className="text-xl font-bold text-[#1a3e72] mb-4">Applying the Method</h3>
              <div className="text-sm text-gray-500 mb-3">4 weeks</div>
              <ul className="text-gray-600 space-y-2">
                <li>• Sales Narrative Workshop (2h)</li>
                <li>• Final Day: Funding & Investment Strategy (in-person, 6h)</li>
                <li>• Outcomes: Elevator pitch & deck, evidence cycles integrated into roadmap, VLE workspace</li>
              </ul>
            </div>

            {/* Final Showcase */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-2 border-[#FF6C0E]">
              <div className="text-[#FF6C0E] font-bold text-sm mb-2">FINALE</div>
              <h3 className="text-xl font-bold text-[#1a3e72] mb-4">Final Day & Showcase</h3>
              <div className="text-sm text-gray-500 mb-3">BETT '26 Week</div>
              <ul className="text-gray-600 space-y-2">
                <li>• Demo Day presentation</li>
                <li>• Investor pitch sessions</li>
                <li>• Network with education industry leaders</li>
                <li>• Launch market-ready product</li>
              </ul>
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
          
          <div className="relative">
            <div className="flex flex-wrap justify-between items-center">
              <div className="timeline-dot flex flex-col items-center mb-8 lg:mb-0 relative">
                <div className="w-6 h-6 bg-[#FF6C0E] rounded-full border-4 border-white shadow-lg mb-4"></div>
                <div className="text-center">
                  <div className="font-bold text-[#1a3e72]">September</div>
                  <div className="text-sm text-gray-600">Call Opens</div>
                  <div className="text-xs text-gray-500">Sept 1-19</div>
                </div>
                <div className="hidden lg:block absolute top-3 left-full w-20 h-0.5 bg-[#1a3e72]"></div>
              </div>
              
              <div className="timeline-dot flex flex-col items-center mb-8 lg:mb-0 relative">
                <div className="w-6 h-6 bg-[#FF6C0E] rounded-full border-4 border-white shadow-lg mb-4"></div>
                <div className="text-center">
                  <div className="font-bold text-[#1a3e72]">October</div>
                  <div className="text-sm text-gray-600">Foundations</div>
                  <div className="text-xs text-gray-500">Kick-off & Setup</div>
                </div>
                <div className="hidden lg:block absolute top-3 left-full w-20 h-0.5 bg-[#1a3e72]"></div>
              </div>
              
              <div className="timeline-dot flex flex-col items-center mb-8 lg:mb-0 relative">
                <div className="w-6 h-6 bg-[#FF6C0E] rounded-full border-4 border-white shadow-lg mb-4"></div>
                <div className="text-center">
                  <div className="font-bold text-[#1a3e72]">November</div>
                  <div className="text-sm text-gray-600">Research Method</div>
                  <div className="text-xs text-gray-500">+ AI 101 Stream</div>
                </div>
                <div className="hidden lg:block absolute top-3 left-full w-20 h-0.5 bg-[#1a3e72]"></div>
              </div>
              
              <div className="timeline-dot flex flex-col items-center mb-8 lg:mb-0 relative">
                <div className="w-6 h-6 bg-[#FF6C0E] rounded-full border-4 border-white shadow-lg mb-4"></div>
                <div className="text-center">
                  <div className="font-bold text-[#1a3e72]">December</div>
                  <div className="text-sm text-gray-600">Applying Method</div>
                  <div className="text-xs text-gray-500">Implementation</div>
                </div>
                <div className="hidden lg:block absolute top-3 left-full w-20 h-0.5 bg-[#1a3e72]"></div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3e72] mb-4">Workshops & Partners</h2>
            <p className="text-xl text-gray-600">Learn from the best in education and technology</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 rounded-2xl mx-auto mb-4 overflow-hidden shadow-md">
                <img 
                  src="/ucl-main-building.jpg" 
                  alt="UCL Main Building" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-[#1a3e72] mb-2">Institute of Education</h3>
              <p className="text-sm text-gray-600">World-leading education research and pedagogy expertise</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gray-300 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-600">CDI</span>
              </div>
              <h3 className="font-bold text-[#1a3e72] mb-2">Centre for Digital Innovation</h3>
              <p className="text-sm text-gray-600">Technology innovation and digital transformation</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gray-300 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">Base KX</span>
              </div>
              <h3 className="font-bold text-[#1a3e72] mb-2">BaseKX</h3>
              <p className="text-sm text-gray-600">Startup acceleration and venture building</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gray-300 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">Labs</span>
              </div>
              <h3 className="font-bold text-[#1a3e72] mb-2">EdTech Labs</h3>
              <p className="text-sm text-gray-600">Product development and go-to-market strategy</p>
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
            Questions? Email <a href="mailto:edtechlabs@ucl.ac.uk" className="underline hover:no-underline">edtechlabs@ucl.ac.uk</a>
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