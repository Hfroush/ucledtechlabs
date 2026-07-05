import { Link } from "wouter";
import { Linkedin, Mail, MapPin } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import ContactForm from "@/components/contact-form";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact UCL EdTech Labs",
  "url": "https://ucledtechlabs.com/contact",
  "mainEntity": {
    "@type": "Organization",
    "name": "UCL EdTech Labs",
    "url": "https://ucledtechlabs.com",
    "email": "info@ucledtechlabs.com",
    "sameAs": ["https://www.linkedin.com/company/ucl-edtech-labs"],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@ucledtechlabs.com",
      "contactType": "Customer Service",
      "areaServed": ["GB", "FR", "CA", "AE"],
      "availableLanguage": "English",
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB",
    },
  },
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Contact UCL EdTech Labs — Get in Touch"
        description="Contact UCL EdTech Labs about our accelerator programmes, partnerships, or press enquiries. Email info@ucledtechlabs.com or use the contact form — we typically respond within one business day."
        structuredData={structuredData}
      />
      <Navigation />

      {/* Hero */}
      <section className="bg-[#1a3e72] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90">
            Questions about our programmes, partnerships, or press enquiries — we'd love to
            hear from you. We typically respond within one business day.
          </p>
        </div>
      </section>

      {/* Contact details */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 mb-4">
            <div className="bg-slate-50 rounded-xl p-6 text-center">
              <Mail className="w-8 h-8 text-[#e57c00] mx-auto mb-3" />
              <h2 className="font-bold text-gray-900 mb-1">Email</h2>
              <a
                href="mailto:info@ucledtechlabs.com"
                className="text-sm text-[#e57c00] hover:underline break-all"
              >
                info@ucledtechlabs.com
              </a>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 text-center">
              <Linkedin className="w-8 h-8 text-[#e57c00] mx-auto mb-3" />
              <h2 className="font-bold text-gray-900 mb-1">LinkedIn</h2>
              <a
                href="https://www.linkedin.com/company/ucl-edtech-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#e57c00] hover:underline"
              >
                UCL EdTech Labs
              </a>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 text-center">
              <MapPin className="w-8 h-8 text-[#e57c00] mx-auto mb-3" />
              <h2 className="font-bold text-gray-900 mb-1">Location</h2>
              <p className="text-sm text-gray-600">
                University College London
                <br />
                London, United Kingdom
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="bg-slate-50">
        <ContactForm />
      </div>

      {/* Common enquiries */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Looking for something specific?</h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>Applying to a programme?</strong> Read our{" "}
              <Link href="/resources/how-to-apply" className="text-[#e57c00] hover:underline">
                application guide
              </Link>{" "}
              or{" "}
              <Link href="/#applications" className="text-[#e57c00] hover:underline">
                register interest
              </Link>{" "}
              for the next cohort.
            </li>
            <li>
              <strong>Questions about the accelerator?</strong> Check the{" "}
              <Link href="/resources/ucl-edtech-labs-faq" className="text-[#e57c00] hover:underline">
                frequently asked questions
              </Link>
              .
            </li>
            <li>
              <strong>Partnership or sponsorship enquiries?</strong> Email us directly at{" "}
              <a href="mailto:info@ucledtechlabs.com" className="text-[#e57c00] hover:underline">
                info@ucledtechlabs.com
              </a>{" "}
              with the subject line "Partnership".
            </li>
            <li>
              <strong>Accessibility feedback?</strong> See our{" "}
              <Link href="/accessibility" className="text-[#e57c00] hover:underline">
                accessibility statement
              </Link>
              .
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}
