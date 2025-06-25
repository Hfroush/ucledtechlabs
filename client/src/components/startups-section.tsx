import { Badge } from "@/components/ui/badge";

interface Startup {
  id: string;
  name: string;
  description: string;
  sector: string;
  keyMetric: string;
  gradientClass: string;
}

export default function StartupsSection() {
  const startups: Startup[] = [
    {
      id: "ischool",
      name: "iSchool",
      description: "Offers interactive programming and AI education for 6–18-year-olds across online/offline settings",
      sector: "EdTech – coding & AI for youth",
      keyMetric: "Over 26,000 students, 1 million training hours, and 10 million lines of code written; raised US $4.5 million",
      gradientClass: "from-blue-500 to-purple-600"
    },
    {
      id: "moi-panda",
      name: "Moi Panda",
      description: "A \"super-app\" combining social networking with learning missions for young children and parents",
      sector: "Early childhood EdTech – global digital citizenship",
      keyMetric: "100% user satisfaction, 100% friend-making rate, winner of EdTechX Mission Driven Award 2024",
      gradientClass: "from-green-500 to-teal-600"
    },
    {
      id: "chatterbox",
      name: "Chatterbox",
      description: "Delivers online language training powered by refugees and marginalised professionals, providing both impact-driven corporate learning and inclusive employment",
      sector: "Language learning & workforce inclusion",
      keyMetric: "Raised £1.5 million pre-seed; clients include Unilever, PwC, and the British Red Cross; recognised with awards from the Next Billion EdTech Prize and Forbes 30 Under 30",
      gradientClass: "from-pink-500 to-rose-600"
    },
    {
      id: "graffinity",
      name: "Graffinity",
      description: "Develops AI-supported knowledge maps to visualize students' thinking and aid formative assessment",
      sector: "AI-powered active learning tools",
      keyMetric: "Won a share of £1 million in UK Government/Department for Education AI competition",
      gradientClass: "from-orange-500 to-red-600"
    },
    {
      id: "linkythinks",
      name: "LinkyThinks",
      description: "Offers online English tutoring and creative resources supporting thinking skills",
      sector: "Literacy & creative thinking education",
      keyMetric: "Worked with 2,000+ schools and tens of thousands of teachers",
      gradientClass: "from-indigo-500 to-blue-600"
    },
    {
      id: "knowledgehook",
      name: "KnowledgeHook",
      description: "Provides a gamified, curriculum-aligned platform (ClassOS) that helps teachers deliver effective math instruction through real-time student feedback and actionable insights",
      sector: "EdTech – K–12 mathematics learning",
      keyMetric: "Raised $20 million Series A; supports 300,000+ students and over 100 school boards across Canada, the US, Mexico, and the UK",
      gradientClass: "from-yellow-500 to-orange-600"
    }
  ];

  return (
    <section id="startups" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our alumni are transforming education worldwide, from AI-powered learning platforms 
            to inclusive language training, each validated through rigorous academic methodology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {startups.map((startup) => (
            <div
              key={startup.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${startup.gradientClass} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
              
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {startup.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {startup.sector}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {startup.description}
                </p>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Key Achievements</span>
                    <span className="text-sm font-medium text-gray-700 leading-relaxed">{startup.keyMetric}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors flex items-center gap-1">
                    Learn more
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}