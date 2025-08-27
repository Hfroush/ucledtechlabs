import { useState, useEffect } from "react";

export default function AcceleratorLanding() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    startup: '',
    website: '',
    oneliner: '',
    stage: '',
    criteria: [] as string[],
    problem: '',
    approach: '',
    consent: false
  });

  // FAQ state
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Character counters
  const [problemCount, setProblemCount] = useState(0);
  const [approachCount, setApproachCount] = useState(0);

  // Scroll effects
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const [navBlur, setNavBlur] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const viewportHeight = window.innerHeight;
      
      // Back to top button
      setShowBackToTop(scrolled > 300);
      
      // Mobile CTA
      setShowMobileCTA(scrolled > viewportHeight);
      
      // Nav blur effect
      setNavBlur(scrolled > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    alert('Application submitted successfully! We\'ll be in touch within 48 hours.');
    setShowModal(false);
    setFormData({
      name: '',
      email: '',
      startup: '',
      website: '',
      oneliner: '',
      stage: '',
      criteria: [],
      problem: '',
      approach: '',
      consent: false
    });
  };

  const handleCriteriaChange = (criterion: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      criteria: checked 
        ? [...prev.criteria, criterion]
        : prev.criteria.filter(c => c !== criterion)
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openApplication = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const toggleFaq = (faqId: string) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
  };

  return (
    <div className="bg-white text-gray-700 antialiased">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBlur ? 'backdrop-blur-md bg-white/90' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <div className="text-xl font-bold text-indigo-900">UCL EdTech Labs</div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#programme" className="text-sm font-medium text-gray-700 hover:text-indigo-900 transition-colors">Programme</a>
                <a href="#ai-stream" className="text-sm font-medium text-gray-700 hover:text-indigo-900 transition-colors">AI 101 Stream</a>
                <a href="#timeline" className="text-sm font-medium text-gray-700 hover:text-indigo-900 transition-colors">Timeline</a>
                <a href="#criteria" className="text-sm font-medium text-gray-700 hover:text-indigo-900 transition-colors">Criteria</a>
                <a href="#workshops" className="text-sm font-medium text-gray-700 hover:text-indigo-900 transition-colors">Workshops</a>
                <a href="#faqs" className="text-sm font-medium text-gray-700 hover:text-indigo-900 transition-colors">FAQs</a>
                <button onClick={openApplication} className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">Apply</button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="text-gray-700 hover:text-indigo-900">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden backdrop-blur-md bg-white/90">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#programme" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-900">Programme</a>
              <a href="#ai-stream" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-900">AI 101 Stream</a>
              <a href="#timeline" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-900">Timeline</a>
              <a href="#criteria" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-900">Criteria</a>
              <a href="#workshops" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-900">Workshops</a>
              <a href="#faqs" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-900">FAQs</a>
              <button onClick={openApplication} className="block px-3 py-2 text-sm font-medium bg-orange-600 text-white rounded-lg mx-3">Apply</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-indigo-900 mb-6">
              Accelerate your AI edtech startup at UCL.
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Oct–Jan 2026 • London + Hybrid • Evidence-driven, founder-focused.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button onClick={openApplication} className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Apply Now
              </button>
              <button className="border-2 border-indigo-900 text-indigo-900 hover:bg-indigo-900 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300">
                View Programme PDF
              </button>
            </div>
            
            {/* Trust row */}
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-sm text-gray-700">Powered by</div>
              <div className="flex items-center space-x-6">
                <div className="w-16 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">IOE</div>
                <div className="w-16 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">CDI</div>
                <div className="w-20 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">Base KX</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Evidence-Driven</h3>
              <p className="text-gray-700">Turn research into adoption and revenue.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Product Velocity</h3>
              <p className="text-gray-700">Tight feedback loops, faster learning.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Expert Network</h3>
              <p className="text-gray-700">UCL academics, product leaders, operators.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Funding Prep</h3>
              <p className="text-gray-700">Investor-ready narrative, clean metrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Overview */}
      <section id="programme" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Programme Overview</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A structured pathway from application to market-ready product
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-orange-600 font-bold text-sm mb-2">STAGE 1</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Application & Selection</h3>
              <p className="text-gray-700">Rigorous selection process focusing on AI-first approach, research mindset, and execution capacity.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-orange-600 font-bold text-sm mb-2">STAGE 2</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Foundations</h3>
              <p className="text-gray-700">Core workshops on research methodology, product development, and responsible AI implementation.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-orange-600 font-bold text-sm mb-2">STAGE 3</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Research Method</h3>
              <p className="text-gray-700">Evidence-based validation frameworks to test assumptions and measure impact.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-orange-600 font-bold text-sm mb-2">STAGE 4</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4" id="ai-stream">AI 101 Stream</h3>
              <p className="text-gray-700">Technical deep-dive into machine learning, natural language processing, and educational applications.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-orange-600 font-bold text-sm mb-2">STAGE 5</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Applying the Method</h3>
              <p className="text-gray-700">Real-world implementation, user testing, and iterative improvement with mentor support.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-orange-600 font-bold text-sm mb-2">OUTCOME</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Market Ready</h3>
              <p className="text-gray-700">Launch with validated product, clear metrics, and investor-ready materials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Programme Timeline</h2>
            <p className="text-xl text-gray-700">Four months of intensive development</p>
          </div>
          
          <div className="relative">
            <div className="flex flex-wrap justify-between items-center">
              {[
                { month: 'August', desc: 'Applications Open' },
                { month: 'September', desc: 'Selection Process' },
                { month: 'October', desc: 'Programme Begins' },
                { month: 'December', desc: 'Mid-Programme Review' },
                { month: 'January', desc: 'Demo Day' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center mb-8 lg:mb-0">
                  <div className="w-6 h-6 bg-orange-600 rounded-full border-4 border-white shadow-lg mb-4"></div>
                  <div className="text-center">
                    <div className="font-bold text-indigo-900">{item.month}</div>
                    <div className="text-sm text-gray-700">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selection Criteria */}
      <section id="criteria" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Selection Criteria</h2>
            <p className="text-xl text-gray-700">What we're looking for in applicants</p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                title: "AI-first product approach",
                desc: "Your product uses machine learning, natural language processing, or other forms of artificial intelligence as a core feature, not just an add-on."
              },
              {
                title: "Traction, prototype, or research foundation",
                desc: "You have early users, a working prototype, or solid research backing your approach. We don't fund ideas on napkins."
              },
              {
                title: "Research mindset and responsible development",
                desc: "You're committed to evidence-based development and ethical considerations around privacy, bias, and educational impact."
              },
              {
                title: "Team capacity to execute",
                desc: "You have the technical skills and time commitment to make meaningful progress during the four-month programme."
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-lg">
                <div className="w-6 h-6 bg-orange-600 rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-indigo-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops & Partners */}
      <section id="workshops" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Workshops & Partners</h2>
            <p className="text-xl text-gray-700">Learn from the best in education and technology</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'IOE', title: 'Institute of Education', desc: 'World-leading education research and pedagogy expertise' },
              { name: 'CDI', title: 'Centre for Digital Innovation', desc: 'Technology innovation and digital transformation' },
              { name: 'Base KX', title: 'BaseKX', desc: 'Startup acceleration and venture building' },
              { name: 'Labs', title: 'EdTech Labs', desc: 'Product development and go-to-market strategy' }
            ].map((partner, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gray-300 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-600">{partner.name}</span>
                </div>
                <h3 className="font-bold text-indigo-900 mb-2">{partner.title}</h3>
                <p className="text-sm text-gray-700">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-700">Everything you need to know about the programme</p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                id: 'faq-1',
                question: 'Who should apply to this programme?',
                answer: 'Early-stage founders building AI-first education products. You should have technical skills, early traction or research foundation, and the capacity to commit to a four-month intensive programme.'
              },
              {
                id: 'faq-2',
                question: 'Do I need a working prototype to apply?',
                answer: 'Not necessarily. We accept applications with early traction, working prototypes, or solid research foundations. What matters is demonstrating progress beyond just an idea.'
              },
              {
                id: 'faq-3',
                question: 'Is this programme fully remote or in-person?',
                answer: 'It\'s hybrid. Key workshops and mentor sessions happen in London, but much of the work can be done remotely. We expect regular in-person attendance for maximum benefit.'
              },
              {
                id: 'faq-4',
                question: 'What kind of AI technologies do you support?',
                answer: 'Machine learning, natural language processing, computer vision, adaptive learning systems, and other forms of artificial intelligence applied to education. We\'re technology-agnostic but focus on meaningful implementation.'
              },
              {
                id: 'faq-5',
                question: 'How much does the programme cost?',
                answer: 'The programme is free for accepted startups. We take no equity. Our goal is to accelerate impactful education technology, not generate returns from programme fees.'
              },
              {
                id: 'faq-6',
                question: 'What happens after the programme ends?',
                answer: 'You\'ll have access to our alumni network, ongoing mentor relationships, and potential funding introductions. Many graduates continue collaborating with UCL researchers and labs.'
              },
              {
                id: 'faq-7',
                question: 'Can international teams apply?',
                answer: 'Yes, but at least one team member should be able to attend regular sessions in London. We welcome global perspectives on education challenges.'
              },
              {
                id: 'faq-8',
                question: 'What\'s the time commitment?',
                answer: 'Expect 10-15 hours per week including workshops, mentor meetings, and programme work. It\'s designed for founders who are working on their startup full-time or have significant availability.'
              }
            ].map((faq) => (
              <div key={faq.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button 
                  className="w-full text-left p-6 focus:outline-none hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-indigo-900">{faq.question}</h3>
                    <svg 
                      className={`w-5 h-5 text-orange-600 transform transition-transform ${openFaq === faq.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            If you're building for learning, we'll help you learn faster.
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Apply—it's cheaper than guesswork.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button onClick={openApplication} className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Your Application
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-indigo-900 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300">
              Download Programme Outline (PDF)
            </button>
          </div>
          
          <p className="text-sm opacity-75">
            Questions? Email <a href="mailto:edtechlabs@ucl.example" className="underline hover:no-underline">edtechlabs@ucl.example</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-xl font-bold mb-2">UCL EdTech Labs</div>
              <div className="text-sm opacity-75">© 2025 University College London</div>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm opacity-75 hover:opacity-100 transition-opacity">Privacy</a>
              <a href="#" className="text-sm opacity-75 hover:opacity-100 transition-opacity">Terms</a>
              <div className="flex space-x-4">
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Sticky Mobile CTA */}
      {showMobileCTA && (
        <div className="fixed bottom-0 left-0 right-0 bg-orange-600 p-4 z-40 md:hidden">
          <div className="flex gap-3">
            <button onClick={openApplication} className="flex-1 bg-white text-orange-600 text-center py-3 rounded-lg font-semibold">Apply Now</button>
            <button className="flex-1 bg-indigo-900 text-white text-center py-3 rounded-lg font-semibold">PDF</button>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-indigo-900">Apply to UCL EdTech Labs</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startup" className="block text-sm font-medium text-gray-700 mb-2">Startup Name *</label>
                    <input 
                      type="text" 
                      id="startup" 
                      value={formData.startup}
                      onChange={(e) => setFormData(prev => ({ ...prev, startup: e.target.value }))}
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input 
                      type="url" 
                      id="website" 
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="oneliner" className="block text-sm font-medium text-gray-700 mb-2">One-liner description *</label>
                  <input 
                    type="text" 
                    id="oneliner" 
                    value={formData.oneliner}
                    onChange={(e) => setFormData(prev => ({ ...prev, oneliner: e.target.value }))}
                    required 
                    placeholder="Describe your startup in one sentence" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-2">Current Stage *</label>
                  <select 
                    id="stage" 
                    value={formData.stage}
                    onChange={(e) => setFormData(prev => ({ ...prev, stage: e.target.value }))}
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  >
                    <option value="">Select stage</option>
                    <option value="idea">Idea stage</option>
                    <option value="research">Research/validation</option>
                    <option value="prototype">Prototype</option>
                    <option value="early-traction">Early traction</option>
                    <option value="scaling">Scaling</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Which criteria do you meet? *</label>
                  <div className="space-y-2">
                    {[
                      { value: 'ai-first', label: 'AI-first product approach' },
                      { value: 'traction', label: 'Have traction, prototype, or research foundation' },
                      { value: 'research-mindset', label: 'Research mindset and responsible development' },
                      { value: 'execution', label: 'Team capacity to execute' }
                    ].map((criterion) => (
                      <label key={criterion.value} className="flex items-start">
                        <input 
                          type="checkbox" 
                          checked={formData.criteria.includes(criterion.value)}
                          onChange={(e) => handleCriteriaChange(criterion.value, e.target.checked)}
                          className="mt-1 mr-3"
                        />
                        <span className="text-sm text-gray-700">{criterion.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-2">What problem are you solving? (100 words) *</label>
                  <textarea 
                    id="problem" 
                    value={formData.problem}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, problem: e.target.value }));
                      setProblemCount(e.target.value.length);
                    }}
                    required 
                    rows={4} 
                    maxLength={500} 
                    placeholder="Describe the educational problem your startup addresses..." 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  />
                  <div className="text-xs text-gray-500 mt-1">{problemCount}/500 characters</div>
                </div>
                
                <div>
                  <label htmlFor="approach" className="block text-sm font-medium text-gray-700 mb-2">How does your approach work? (100 words) *</label>
                  <textarea 
                    id="approach" 
                    value={formData.approach}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, approach: e.target.value }));
                      setApproachCount(e.target.value.length);
                    }}
                    required 
                    rows={4} 
                    maxLength={500} 
                    placeholder="Explain your solution and how AI is integral to it..." 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  />
                  <div className="text-xs text-gray-500 mt-1">{approachCount}/500 characters</div>
                </div>
                
                <div>
                  <label className="flex items-start">
                    <input 
                      type="checkbox" 
                      checked={formData.consent}
                      onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                      required 
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm text-gray-700">I consent to UCL EdTech Labs storing and processing this application data for programme selection purposes. *</span>
                  </label>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                    Submit Application
                  </button>
                  <button type="button" onClick={closeModal} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}