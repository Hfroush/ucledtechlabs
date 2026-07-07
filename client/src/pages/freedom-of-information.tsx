import SEOHead from "@/components/seo-head";

export default function FreedomOfInformation() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Freedom of Information — UCL EdTech Labs"
        description="How to access information held by UCL EdTech Labs under the Freedom of Information Act 2000, as part of University College London."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Freedom of Information</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Information about accessing UCL EdTech Labs information under the Freedom of Information Act 2000.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">About the Freedom of Information Act</h2>
          <p className="text-gray-700 mb-4">
            As part of University College London, UCL EdTech Labs is subject to the Freedom of Information Act 2000 (FOIA). This Act gives you the right to ask for information held by public authorities.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Making a Request</h2>
          <p className="text-gray-700 mb-4">
            To make a Freedom of Information request, you should:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Put your request in writing (email is acceptable)</li>
            <li>Include your name and correspondence address</li>
            <li>Describe the information you want</li>
            <li>Be as specific as possible about what information you require</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Submit Your Request</h2>
          <p className="text-gray-700 mb-4">
            Send your Freedom of Information request to:
          </p>
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="text-gray-700">
              <strong>Email:</strong> <a href="mailto:data-protection@ucl.ac.uk" className="text-accent hover:underline">data-protection@ucl.ac.uk</a><br/>
              <strong>Subject:</strong> Freedom of Information Request - UCL EdTech Labs<br/>
              <strong>Post:</strong><br/>
              Data Protection Officer<br/>
              University College London<br/>
              Gower Street<br/>
              London WC1E 6BT
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Response Times</h2>
          <p className="text-gray-700 mb-4">
            We aim to respond to all Freedom of Information requests within 20 working days of receipt, as required by the Act.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Fees</h2>
          <p className="text-gray-700 mb-4">
            Most Freedom of Information requests are free. However, if the cost of processing your request exceeds £450, we may charge you for the cost of providing the information or refuse to provide it.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Publication Scheme</h2>
          <p className="text-gray-700 mb-4">
            As part of UCL, we follow UCL's publication scheme which sets out the classes of information we publish routinely. You can view UCL's publication scheme on their main website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Exemptions</h2>
          <p className="text-gray-700 mb-4">
            Some information may be exempt from disclosure under the Freedom of Information Act, including:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Personal information about third parties</li>
            <li>Information provided in confidence</li>
            <li>Information that would prejudice commercial interests</li>
            <li>Information relating to ongoing investigations</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Appeals</h2>
          <p className="text-gray-700 mb-4">
            If you are not satisfied with our response, you can ask for an internal review. If you remain dissatisfied, you can appeal to the Information Commissioner's Office.
          </p>

          <p className="text-sm text-gray-500 mt-8">
            Last updated: June 25, 2025
          </p>
        </div>
      </div>
    </div>
  );
}