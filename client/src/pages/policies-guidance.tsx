import SEOHead from "@/components/seo-head";

export default function PoliciesGuidance() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Policies & Guidance — UCL EdTech Labs"
        description="Key policies and guidance documents for UCL EdTech Labs accelerator programmes and services."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Policies & Guidance</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Key policies and guidance documents for UCL EdTech Labs programs and services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Program Policies</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Application and Selection</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>All applications are reviewed based on merit and potential impact in education</li>
            <li>Selection criteria focus on evidence-based approaches and academic rigor</li>
            <li>We are committed to diversity and inclusion in all program cohorts</li>
            <li>Applications are assessed by our academic and industry expert panel</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Code of Conduct</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>All participants must adhere to UCL's Student Code of Conduct</li>
            <li>Respectful and professional behavior is expected at all times</li>
            <li>Discrimination, harassment, or bullying will not be tolerated</li>
            <li>Participants must respect intellectual property rights</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Intellectual Property</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Participants retain ownership of their intellectual property</li>
            <li>UCL EdTech Labs does not take equity in participant companies</li>
            <li>Shared resources and methodologies remain property of UCL</li>
            <li>Confidentiality agreements protect sensitive information</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Academic Standards</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Research Ethics</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>All research activities must comply with UCL research ethics policies</li>
            <li>Data collection involving human subjects requires ethical approval</li>
            <li>Research integrity and responsible conduct are fundamental requirements</li>
            <li>Publication and dissemination must follow academic standards</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Evidence-Based Methodology</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>All solutions must be grounded in educational research</li>
            <li>Validation through rigorous testing and evaluation is required</li>
            <li>Impact measurement using appropriate academic frameworks</li>
            <li>Peer review and expert feedback are integral to the process</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Operational Policies</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Attendance and Participation</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Regular attendance at program sessions is mandatory</li>
            <li>Active participation in all activities is expected</li>
            <li>Advance notice required for any planned absences</li>
            <li>Completion of all assignments and deliverables</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Health and Safety</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>All participants must comply with UCL health and safety policies</li>
            <li>Report any incidents or concerns immediately</li>
            <li>Follow COVID-19 guidelines and protocols as applicable</li>
            <li>Ensure safe working practices in all activities</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Compliance</h2>
          <p className="text-gray-700 mb-4">
            UCL EdTech Labs operates in accordance with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Higher Education and Research Act 2017</li>
            <li>Equality Act 2010</li>
            <li>General Data Protection Regulation (GDPR)</li>
            <li>Academic Quality Code for Higher Education</li>
            <li>UCL's institutional policies and procedures</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact</h2>
          <p className="text-gray-700 mb-4">
            For questions about our policies or guidance, please contact:
          </p>
          <p className="text-gray-700 mb-4">
            Email: <a href="mailto:info@ucledtechlabs.com" className="text-accent hover:underline">info@ucledtechlabs.com</a>
          </p>

          <p className="text-sm text-gray-500 mt-8">
            Last updated: June 25, 2025
          </p>
        </div>
      </div>
    </div>
  );
}