import SEOHead from "@/components/seo-head";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Disclaimer — UCL EdTech Labs"
        description="Important information regarding the use of the UCL EdTech Labs website, services, and the information it provides."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Disclaimer</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Important information regarding the use of UCL EdTech Labs website and services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">General Information</h2>
          <p className="text-gray-700 mb-4">
            The information contained in this website is for general information purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">No Professional Advice</h2>
          <p className="text-gray-700 mb-4">
            The information on this website is not intended to constitute professional advice. Users should seek appropriate professional advice before taking any action based on the information contained on this website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">External Links</h2>
          <p className="text-gray-700 mb-4">
            Our website may contain links to external websites. We have no control over the content and nature of these sites and the links to other websites do not imply a recommendation for all the content found on these sites.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Program Participation</h2>
          <p className="text-gray-700 mb-4">
            Participation in UCL EdTech Labs programs does not guarantee business success, funding, or any specific outcomes. Past performance of program participants is not indicative of future results.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            In no event will UCL EdTech Labs be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website or our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to Disclaimer</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to modify this disclaimer at any time. Changes will be posted on this page with an updated revision date.
          </p>

          <p className="text-sm text-gray-500 mt-8">
            Last updated: June 25, 2025
          </p>
        </div>
      </div>
    </div>
  );
}