import { ReactNode } from "react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import { getResource, getRelated } from "@/data/resources";

export interface FAQItem {
  question: string;
  answer: string;
}

interface ResourceLayoutProps {
  slug: string;
  /** Q&A pairs rendered as an FAQ section and emitted as FAQPage structured data. */
  faq?: FAQItem[];
  children: ReactNode;
}

const SITE_URL = "https://ucledtechlabs.com";

export default function ResourceLayout({ slug, faq, children }: ResourceLayoutProps) {
  const meta = getResource(slug);
  const related = getRelated(slug);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "headline": meta.title,
      "description": meta.description,
      "datePublished": meta.datePublished,
      "dateModified": meta.datePublished,
      "url": `${SITE_URL}/resources/${meta.slug}`,
      "mainEntityOfPage": `${SITE_URL}/resources/${meta.slug}`,
      "author": {
        "@type": "Organization",
        "name": "UCL EdTech Labs",
        "url": SITE_URL,
      },
      "publisher": {
        "@type": "Organization",
        "name": "UCL EdTech Labs",
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/favicon.svg`,
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Resources", "item": `${SITE_URL}/resources` },
        { "@type": "ListItem", "position": 3, "name": meta.title, "item": `${SITE_URL}/resources/${meta.slug}` },
      ],
    },
  ];

  if (faq && faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "mainEntity": faq.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": { "@type": "Answer", "text": item.answer },
      })),
    });
  }

  const structuredData = { "@context": "https://schema.org", "@graph": graph };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={`${meta.title} | UCL EdTech Labs`}
        description={meta.description}
        structuredData={structuredData}
      />
      <Navigation />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-[#e57c00]">Home</Link>
              <span className="mx-1" aria-hidden="true">/</span>
            </li>
            <li>
              <Link href="/resources" className="hover:text-[#e57c00]">Resources</Link>
              <span className="mx-1" aria-hidden="true">/</span>
            </li>
            <li aria-current="page" className="text-gray-700">{meta.title}</li>
          </ol>
        </nav>

        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#e57c00] mb-3">
            {meta.category}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{meta.title}</h1>
          <p className="text-sm text-gray-500">
            By UCL EdTech Labs · Published{" "}
            <time dateTime={meta.datePublished}>
              {new Date(meta.datePublished).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>{" "}
            · {meta.readingTime}
          </p>
        </header>

        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-[#e57c00]">
          {children}
        </div>

        {/* FAQ section */}
        {faq && faq.length > 0 && (
          <section className="mt-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faq.map((item) => (
                <div key={item.question} className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <aside className="mt-12 bg-gradient-to-br from-[#1a3e72] to-[#2d5aa0] text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Building an EdTech startup?</h2>
          <p className="opacity-90 mb-6">
            Join UCL's evidence-driven accelerator programme and prove your product works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#applications"
              className="bg-[#FF6C0E] hover:bg-[#e55a00] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Register Interest
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-[#1a3e72] px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </aside>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-12" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Related Guides
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/resources/${r.slug}`}
                  className="block bg-slate-50 rounded-xl p-5 hover:shadow-md transition-shadow"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#e57c00] mb-2">
                    {r.category}
                  </p>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug">{r.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  );
}
