import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import { resources, ResourceCategory } from "@/data/resources";

const SITE_URL = "https://ucledtechlabs.com";

const categories: ResourceCategory[] = [
  "Accelerator Programme",
  "Research & Methodology",
  "Outcomes & Impact",
];

const categoryIntros: Record<ResourceCategory, string> = {
  "Accelerator Programme":
    "How the UCL EdTech Labs accelerator works, who it's for, and how to apply.",
  "Research & Methodology":
    "Practical guides to evidence-based product development, drawn from our UCL-grounded curriculum.",
  "Outcomes & Impact":
    "The measurable results of our programmes and the startups behind them.",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "UCL EdTech Labs Resources",
  "url": `${SITE_URL}/resources`,
  "description":
    "Guides, FAQs, and articles on the UCL EdTech Labs accelerator, evidence-based EdTech methodology, and startup outcomes.",
  "hasPart": resources.map((r) => ({
    "@type": "Article",
    "headline": r.title,
    "url": `${SITE_URL}/resources/${r.slug}`,
    "description": r.description,
    "datePublished": r.datePublished,
  })),
};

export default function ResourcesIndex() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Resources — Guides & FAQs | UCL EdTech Labs"
        description="Guides, FAQs, and articles on the UCL EdTech Labs accelerator programme, evidence-based EdTech research methodology, and startup outcomes."
        structuredData={structuredData}
      />
      <Navigation />

      <section className="bg-[#1a3e72] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
          <p className="text-xl opacity-90">
            Guides, FAQs, and articles on our accelerator programme, evidence-based
            methodology, and the outcomes our startups achieve.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {categories.map((category) => (
          <section key={category} className="mb-16 last:mb-0" aria-labelledby={category}>
            <h2 id={category} className="text-3xl font-bold text-gray-900 mb-2">
              {category}
            </h2>
            <p className="text-gray-600 mb-8">{categoryIntros[category]}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources
                .filter((r) => r.category === category)
                .map((r) => (
                  <Link
                    key={r.slug}
                    href={`/resources/${r.slug}`}
                    className="block bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-bold text-gray-900 mb-2 leading-snug">{r.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{r.description}</p>
                    <span className="text-xs text-gray-500">{r.readingTime}</span>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </div>
  );
}
