export default function MethodologySection() {
  const methodologies = [
    {
      step: 1,
      title: "Market Validation & Research",
      description: "Deep dive into your target market with comprehensive research methodologies and validation frameworks.",
      color: "bg-primary"
    },
    {
      step: 2,
      title: "Product Development",
      description: "Build scalable educational solutions using agile methodologies and user-centered design principles.",
      color: "bg-secondary"
    },
    {
      step: 3,
      title: "Go-to-Market Strategy",
      description: "Develop comprehensive launch strategies tailored to the education sector's unique requirements.",
      color: "bg-accent"
    },
    {
      step: 4,
      title: "Funding & Investment",
      description: "Access our network of education-focused investors and learn proven fundraising strategies.",
      color: "bg-success"
    },
    {
      step: 5,
      title: "Scaling & Growth",
      description: "Implement sustainable growth strategies with ongoing mentorship and community support.",
      color: "bg-red-500"
    }
  ];

  return (
    <section id="methodology" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Proven Methodology</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive approach combines research-backed methodologies with practical implementation to ensure your startup's success.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern learning environment with collaborative workspace" 
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div className="space-y-8">
            {methodologies.slice(0, 3).map((method) => (
              <div key={method.step} className="flex items-start">
                <div className={`flex-shrink-0 w-12 h-12 ${method.color} rounded-lg flex items-center justify-center mr-4`}>
                  <span className="text-white font-bold">{method.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Education innovation workshop with diverse participants" 
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div className="space-y-8 lg:order-1">
            {methodologies.slice(3).map((method) => (
              <div key={method.step} className="flex items-start">
                <div className={`flex-shrink-0 w-12 h-12 ${method.color} rounded-lg flex items-center justify-center mr-4`}>
                  <span className="text-white font-bold">{method.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
