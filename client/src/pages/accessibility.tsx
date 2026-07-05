import SEOHead from "@/components/seo-head";

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Accessibility Statement — UCL EdTech Labs"
        description="UCL EdTech Labs' accessibility statement and our commitment to WCAG 2.1 AA conformance for people with disabilities."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Accessibility Statement</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            UCL EdTech Labs is committed to ensuring digital accessibility for people with disabilities.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Commitment</h2>
          <p className="text-gray-700 mb-4">
            We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure we provide equal access to all our users.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conformance Status</h2>
          <p className="text-gray-700 mb-4">
            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at the AA level. These guidelines explain how to make web content more accessible to people with disabilities.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Measures to Support Accessibility</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Include accessibility as part of our mission statement</li>
            <li>Integrate accessibility into our procurement practices</li>
            <li>Provide continual accessibility training for our staff</li>
            <li>Assign clear accessibility goals and responsibilities</li>
            <li>Employ formal accessibility quality assurance methods</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Feedback</h2>
          <p className="text-gray-700 mb-4">
            We welcome your feedback on the accessibility of our website. Please let us know if you encounter accessibility barriers:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Email: <a href="mailto:info@ucledtechlabs.com" className="text-[#e57c00] hover:underline">info@ucledtechlabs.com</a></li>
            <li>Subject line: Website Accessibility</li>
          </ul>

          <p className="text-gray-700 mb-4">
            We try to respond to feedback within 5 business days.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Technical Specifications</h2>
          <p className="text-gray-700 mb-4">
            Accessibility of our website relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>HTML</li>
            <li>WAI-ARIA</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>

          <p className="text-sm text-gray-500 mt-8">
            This statement was created on June 25, 2025.
          </p>
        </div>
      </div>
    </div>
  );
}