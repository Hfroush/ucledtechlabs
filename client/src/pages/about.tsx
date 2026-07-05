import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

const stats = [
  { value: "300+", label: "Startups Accelerated" },
  { value: "12", label: "Cohorts" },
  { value: "8M", label: "Learners Impacted" },
  { value: "£500M+", label: "Total Startup Valuation" },
  { value: "£37M+", label: "Funding Raised" },
  { value: "28+", label: "Investment Rounds" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About UCL EdTech Labs",
  "url": "https://ucledtechlabs.com/about",
  "mainEntity": {
    "@type": "Organization",
    "name": "UCL EdTech Labs",
    "url": "https://ucledtechlabs.com",
    "logo": "https://ucledtechlabs.com/favicon.svg",
    "description":
      "UCL EdTech Labs is an evidence-driven accelerator for education technology startups at University College London. It has supported 300+ startups across 12 cohorts in London, Paris, and Toronto.",
    "parentOrganization": {
      "@type": "CollegeOrUniversity",
      "name": "University College London",
      "url": "https://www.ucl.ac.uk",
    },
    "sameAs": ["https://www.linkedin.com/company/ucl-edtech-labs"],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@ucledtechlabs.com",
      "contactType": "Customer Service",
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB",
    },
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="About UCL EdTech Labs — Who We Are and What We Do"
        description="UCL EdTech Labs is University College London's evidence-driven accelerator for education technology startups. 300+ startups accelerated across 12 cohorts in London, Paris, and Toronto."
        structuredData={structuredData}
      />
      <Navigation />

      {/* Hero */}
      <section className="bg-[#1a3e72] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About UCL EdTech Labs</h1>
          <p className="text-xl leading-relaxed opacity-90">
            UCL EdTech Labs is University College London's evidence-driven accelerator for
            education technology startups. We help founders build products that measurably
            improve learning — and prove it with research.
          </p>
        </div>
      </section>

      {/* Who we are */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-gray-700 mb-4">
              UCL EdTech Labs runs accelerator programmes for education technology startups,
              grounded in the research expertise of University College London. Since our first
              cohort, we have supported more than 300 startups across 12 cohorts in London,
              Paris, and Toronto, with a Dubai programme upcoming. Companies that have been
              through our programmes have reached over 8 million learners, raised more than
              £37M in funding across 28+ investment rounds, and built a combined valuation
              exceeding £500M.
            </p>
            <p className="text-gray-700 mb-4">
              What makes us different is our academic foundation. Our curriculum is developed
              with UCL — including the UCL Institute of Education, ranked world #1 in Education
              for 12 consecutive years (QS World University Rankings 2025) and home to the UCL
              Knowledge Lab, an interdisciplinary research lab focused on AI and education.
              IOE researchers co-authored UNESCO's first global guidance on generative AI in
              education and regularly advise the OECD, Ofsted, and the UK Department for
              Education.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              Our mission is to transform education through innovation backed by evidence. Too
              many education products are built on intuition alone. We equip founders with the
              research methods of the learning sciences so every product decision — from
              product-market fit to learning impact — is validated with empirical insight, not
              guesswork.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What We Do</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>
                <strong>Accelerator programmes</strong> — immersive, cohort-based programmes in
                London and Paris that take startups through vision, business modelling,
                research methods, funding, and pitching.{" "}
                <Link href="/resources/how-the-accelerator-works" className="text-[#e57c00] hover:underline">
                  See how the programme works
                </Link>
                .
              </li>
              <li>
                <strong>Evidence-based methodology</strong> — a five-step curriculum grounded in
                UCL research that teaches founders to prove and improve their products.{" "}
                <Link href="/resources/evidence-based-edtech" className="text-[#e57c00] hover:underline">
                  Read about our methodology
                </Link>
                .
              </li>
              <li>
                <strong>Expert networks</strong> — access to UCL academics, product leaders,
                experienced operators, and delivery partners including the UCL Centre for
                Digital Innovation powered by AWS, EdTech Impact, and Startup Labs Global.
              </li>
              <li>
                <strong>Investor readiness</strong> — support in turning validated learning
                into impact metrics and investor-ready narratives.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Our Track Record
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link href="/resources/accelerator-outcomes" className="text-[#e57c00] hover:underline font-medium">
              Explore our outcomes and impact in detail →
            </Link>
          </p>
        </div>
      </section>

      {/* Programmes */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Where We Operate</h2>
          <p className="text-gray-700 mb-6">
            UCL EdTech Labs has delivered programmes in four cities:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-1">London</h3>
              <p className="text-sm text-gray-600">
                6 cohorts — our flagship programme, run at UCL.{" "}
                <Link href="/autumn-2025" className="text-[#e57c00] hover:underline">
                  Latest London programme
                </Link>
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-1">Paris</h3>
              <p className="text-sm text-gray-600">
                5 cohorts delivered with French partners.{" "}
                <Link href="/paris" className="text-[#e57c00] hover:underline">
                  Paris programme
                </Link>
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-1">Toronto</h3>
              <p className="text-sm text-gray-600">1 cohort delivered in Canada.</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-1">Dubai</h3>
              <p className="text-sm text-gray-600">Upcoming programme.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1a3e72] to-[#2d5aa0] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to know more?</h2>
          <p className="text-lg opacity-90 mb-8">
            Browse our guides and FAQs, or get in touch with the team directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resources"
              className="bg-[#FF6C0E] hover:bg-[#e55a00] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Explore Resources
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-[#1a3e72] px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
