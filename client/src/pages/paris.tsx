import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

import parisHeroImage from "@assets/image_1758614630354.png";

// Paris-specific content based on provided JSON
const parisContent = {
  meta: {
    title: "CY EdTech Labs — Paris (Cergy) | UCL EdTech Labs",
    description: "12-week research-led EdTech acceleration in Paris (Cergy), delivered by CY Cergy Paris University in partnership with UCL. Workshops, mentoring, lab access, real-world pilots."
  },
  hero: {
    eyebrow: "Paris • CY Cergy Paris University",
    title: "CY EdTech Labs — EdTech acceleration, powered by research",
    subtitle: "12-week programme in partnership with UCL to build evidence-led products and real-world adoption.",
    badges: [
      "Next session: 23 Sep 2025 (Cergy)",
      "Applications closed: 16 May 2025",
      "Session 6"
    ],
    ctas: [
      { label: "Download brochure (EN, PDF)", href: "https://cytransfer.cyu.fr/medias/fichier/eng-brochure-cy-edtech-labs-sfp-sfp_1742483578922-pdf?ID_FICHE=110956&INLINE=FALSE", variant: "secondary" },
      { label: "Call for applications (FR, PDF)", href: "https://cytransfer.cyu.fr/medias/fichier/session6-appel-a-candidature-2-1-_1742483956999-pdf?ID_FICHE=110956&INLINE=FALSE", variant: "secondary" },
      { label: "Email CY Transfer", href: "mailto:cy.transfer@cyu.fr" }
    ]
  },
  who: {
    title: "Programme open to",
    items: ["Start-ups", "SMEs", "Intrapreneurship", "Student entrepreneurs"]
  },
  overview: {
    title: "What you'll get",
    paragraphs: [
      "An acceleration journey that blends academic rigor with entrepreneurial execution. Delivered by CY Cergy Paris University with UCL as core partner, you'll align product decisions to reliable analysis and evidence so you can scale sustainably.",
      "Across 12 weeks, join masterclasses from UCL, the CY Alliance and EdTech France; get tailored mentoring; and access CYU & USPN labs in Education Sciences and AI/Robotics alongside real-world testing sites in schools, higher education, and company environments."
    ]
  },
  programme: {
    title: "Programme highlights",
    bullets: [
      "12 weeks of workshops and masterclasses from UCL, CY Alliance and EdTech France",
      "Personalised support focused on your concept, product and current needs",
      "Privileged access to CYU & USPN labs (Education Sciences, AI/Robotics)",
      "Run pilots in real-world learning contexts (schools, HE, and workplace)"
    ]
  },
  benefits: {
    title: "Benefits",
    bullets: [
      "Guidance from a large community of researchers and entrepreneurs",
      "Training to ground decisions in robust evidence and analysis",
      "Put educational research at the core of product development",
      "Access to extensive datasets and high-performance prototyping platforms",
      "Define methodologies and indicators to measure product performance",
      "Test your concept/product in authentic learning settings"
    ]
  },
  key_dates: {
    title: "Key dates — Session 6",
    items: [
      { label: "Applications close", value: "16 May 2025" },
      { label: "Results", value: "End-May / early June 2025" },
      { label: "Closure day (Session 5)", value: "4 June 2025 — Cergy" },
      { label: "Programme start", value: "23 September 2025 — Cergy" }
    ]
  },
  fees: {
    title: "Fees",
    note: "Some masterclasses may be in English.",
    rows: [
      { tier: "ETI-PME", price: "€1,000" },
      { tier: "Startup (< 2 years) or pre-incorporation", price: "€600" },
      { tier: "Student entrepreneur (not supported by CY Entreprendre)", price: "€300" },
      { tier: "Student entrepreneur (supported by CY Entreprendre)", price: "Free" }
    ]
  },
  supporters: {
    title: "Our Supporters",
    items: [
      "Région Île-de-France",
      "Bpifrance",
      "Banque des Territoires",
      "Conseil départemental du Val d'Oise",
      "EdTech France",
      "La Turbine"
    ]
  },
  downloads: {
    title: "Downloads",
    items: [
      { label: "Brochure (EN, PDF)", href: "https://cytransfer.cyu.fr/medias/fichier/eng-brochure-cy-edtech-labs-sfp-sfp_1742483578922-pdf?ID_FICHE=110956&INLINE=FALSE" },
      { label: "Call for applications (FR, PDF)", href: "https://cytransfer.cyu.fr/medias/fichier/session6-appel-a-candidature-2-1-_1742483956999-pdf?ID_FICHE=110956&INLINE=FALSE" }
    ]
  },
  contact: {
    title: "Contact",
    lines: [
      "cy.transfer@cyu.fr",
      "Applications: isabelle.hoefkens@cyu.fr",
      "+33 (0)7 76 54 11 34",
      "Maison de la Recherche Annie Ernaux, 33 Boulevard du Port, 95000 Cergy, France"
    ]
  }
};

// Paris-specific hero section component
function ParisHeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${parisHeroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      
      {/* Content overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <p className="text-sm md:text-base font-semibold text-blue-200 mb-4 uppercase tracking-wider">
          {parisContent.hero.eyebrow}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {parisContent.hero.title}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
          {parisContent.hero.subtitle}
        </p>
        
        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {parisContent.hero.badges.map((badge, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              {badge}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 max-w-4xl mx-auto">
          {parisContent.hero.ctas.map((cta, index) => (
            <a
              key={index}
              href={cta.href}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors text-center ${
                cta.variant === 'secondary'
                  ? 'bg-white/10 border-2 border-white/20 text-white hover:bg-white/20'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
              {...(cta.href.startsWith('http') ? { 
                target: '_blank', 
                rel: 'noopener noreferrer',
                'aria-label': `${cta.label} (opens in new tab)`
              } : {})}
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section component for consistent styling
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

// Programme open to section
function WhoSection() {
  return (
    <Section className="bg-slate-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8">
        {parisContent.who.title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {parisContent.who.items.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="font-semibold text-slate-900">{item}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// Overview section
function OverviewSection() {
  return (
    <Section className="bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8">
        {parisContent.overview.title}
      </h2>
      <div className="max-w-4xl mx-auto space-y-6 text-lg text-slate-600 leading-relaxed">
        {parisContent.overview.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}

// Programme highlights section
function ProgrammeSection() {
  return (
    <Section className="bg-slate-50">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {parisContent.programme.title}
          </h2>
          <ul className="space-y-4">
            {parisContent.programme.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-orange-500 mt-3 mr-4 flex-shrink-0"></span>
                <span className="text-slate-600">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {parisContent.benefits.title}
          </h2>
          <ul className="space-y-4">
            {parisContent.benefits.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-3 mr-4 flex-shrink-0"></span>
                <span className="text-slate-600">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

// Key dates section
function KeyDatesSection() {
  return (
    <Section className="bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8">
        {parisContent.key_dates.title}
      </h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {parisContent.key_dates.items.map((item, index) => (
          <div key={index} className="bg-slate-50 p-6 rounded-lg">
            <div className="font-semibold text-slate-900 mb-2">{item.label}</div>
            <div className="text-orange-600 font-bold">{item.value}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// Fees section
function FeesSection() {
  return (
    <Section className="bg-slate-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
        {parisContent.fees.title}
      </h2>
      <p className="text-center text-slate-600 mb-8">{parisContent.fees.note}</p>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full" aria-label="Programme fees by category">
            <thead className="bg-slate-100">
              <tr>
                <th scope="col" className="px-6 py-4 text-left font-semibold text-slate-900">Category</th>
                <th scope="col" className="px-6 py-4 text-right font-semibold text-slate-900">Fee</th>
              </tr>
            </thead>
            <tbody>
              {parisContent.fees.rows.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-6 py-4 text-slate-900">{row.tier}</td>
                  <td className="px-6 py-4 text-right font-bold text-orange-600">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

// Supporters section
function SupportersSection() {
  return (
    <Section className="bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8">
        {parisContent.supporters.title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {parisContent.supporters.items.map((supporter, index) => (
          <div key={index} className="bg-slate-50 p-4 rounded-lg text-center">
            <div className="font-medium text-slate-700 text-sm">{supporter}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// Downloads and Contact section
function DownloadsContactSection() {
  return (
    <Section className="bg-slate-50">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            {parisContent.downloads.title}
          </h3>
          <ul className="space-y-3">
            {parisContent.downloads.items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="text-orange-600 hover:text-orange-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} (opens in new tab)`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            {parisContent.contact.title}
          </h3>
          <div className="space-y-2">
            {parisContent.contact.lines.map((line, index) => (
              <div key={index} className="text-slate-600">
                {line.includes('@') ? (
                  <a 
                    href={`mailto:${line}`} 
                    className="text-orange-600 hover:text-orange-700"
                    aria-label={`Send email to ${line}`}
                  >
                    {line}
                  </a>
                ) : (
                  line
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function Paris() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Handle hash links if any
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

  // Structured data for the Paris programme
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": "CY EdTech Labs",
    "description": parisContent.meta.description,
    "url": "https://ucledtechlabs.com/paris",
    "provider": [
      {
        "@type": "University",
        "name": "CY Cergy Paris University",
        "url": "https://www.cyu.fr/"
      },
      {
        "@type": "University", 
        "name": "University College London",
        "url": "https://www.ucl.ac.uk/"
      }
    ],
    "offers": parisContent.fees.rows.map(row => ({
      "@type": "Offer",
      "name": row.tier,
      "price": row.price === "Free" ? "0" : row.price.replace(/[€\s,]/g, ""),
      "priceCurrency": "EUR"
    })),
    "startDate": "2025-09-23",
    "endDate": "2025-12-15",
    "courseMode": "blended",
    "educationalLevel": "Professional Development",
    "teaches": ["EdTech", "Educational Research", "Product Development", "AI in Education"]
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead
        title={parisContent.meta.title}
        description={parisContent.meta.description}
        structuredData={structuredData}
      />
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">
        <ParisHeroSection />
        <WhoSection />
        <OverviewSection />
        <ProgrammeSection />
        <KeyDatesSection />
        <FeesSection />
        <SupportersSection />
        <DownloadsContactSection />
      </main>
      <Footer />
    </div>
  );
}