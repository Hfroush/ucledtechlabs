import spotline_on_founder from "@assets/spotline on founder.png";
import presenting from "@assets/presenting.png";
export default function MethodologySection() {
  const methodologies = [
    {
      step: 1,
      title: "Vision, Mission & Purpose",
      description: "When entering the world of entrepreneurship, we often hear the words Vision, Mission and Purpose. But what do they actually mean, how are they different and why are they important?",
      color: "bg-primary"
    },
    {
      step: 2,
      title: "Business modelling & customer development",
      description: "Our business modelling approach provides you with the tools to grow a sustainable education technology business by ensuring you have the best product-market fit",
      color: "bg-secondary"
    },
    {
      step: 3,
      title: "Education technology research methods & ethics",
      description: "You will be given an overview of research methods in the learning sciences, in order to understand the best way to start proving and improving your product",
      color: "bg-accent"
    },
    {
      step: 4,
      title: "Sustainable Funding",
      description: "You will hear about the funding journey of experienced edtech entrepreneurs to understand the options for you, while learning the ways a successful startup raises money",
      color: "bg-success"
    },
    {
      step: 5,
      title: "Pitching & Storytelling",
      description: "You'll learn how to successfully communicate with strong positioning and a clear narrative. Whether pitching for investment, selling to potential clients or presenting at an event.",
      color: "bg-red-500"
    }
  ];

  return (
    <section id="methodology" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Proven Methodology</h2>
          <div className="text-lg text-gray-600 max-w-4xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🚀</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-left">Beyond Traditional Accelerators</h3>
                <p>We offer immersive, cohort-based experiences that go deeper than the typical startup programme.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="text-2xl">🤝</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">A Collaborative Community</h3>
                <p>Founders learn from seasoned experts and from each other—building lasting peer networks.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="text-2xl">🧠</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-left">World-Leading Methodology</h3>
                <p>Developed with University College London, our curriculum blends research, entrepreneurship, and real-world application.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Evidence-Driven Decisions</h3>
                <p>Every startup is guided to validate assumptions using empirical insights and structured research methods.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="text-2xl">🌍</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Global Impact</h3>
                <p>We prepare founders to scale solutions that make sustainable, meaningful contributions to education—locally and internationally.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <img 
              src={spotline_on_founder} 
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
              src={presenting} 
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
