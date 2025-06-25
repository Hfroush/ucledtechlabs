import { Badge } from "@/components/ui/badge";

interface PastProgram {
  id: string;
  cohortNumber: number;
  year: string;
  location: string;
  startupCount: number;
  totalFunding: string;
  demoDay: string;
  highlights: string[];
  featuredStartups: {
    name: string;
    description: string;
    outcome: string;
  }[];
}

export default function PastProgramsSection() {
  const pastPrograms: PastProgram[] = [
    {
      id: "cohort-12-2024",
      cohortNumber: 12,
      year: "2024",
      location: "London",
      startupCount: 15,
      totalFunding: "£8.2M",
      demoDay: "November 2024",
      highlights: [
        "3 startups acquired",
        "Average 60% revenue growth",
        "2 partnerships with major publishers"
      ],
      featuredStartups: [
        {
          name: "LearnFlow",
          description: "AI-powered adaptive learning platform for K-12 mathematics",
          outcome: "Raised £2.1M Series A, deployed in 200+ schools"
        },
        {
          name: "SkillBridge",
          description: "VR training platform for technical education",
          outcome: "Acquired by Pearson Education for £15M"
        }
      ]
    },
    {
      id: "cohort-11-2024",
      cohortNumber: 11,
      year: "2024",
      location: "Paris",
      startupCount: 12,
      totalFunding: "€6.8M",
      demoDay: "July 2024",
      highlights: [
        "2 unicorn potential companies",
        "85% retention rate",
        "Cross-border expansion to 8 countries"
      ],
      featuredStartups: [
        {
          name: "EduMetrics",
          description: "Learning analytics platform for higher education institutions",
          outcome: "€3.2M funding, partnership with Sorbonne University"
        },
        {
          name: "ClassroomAI",
          description: "Automated assessment and feedback system",
          outcome: "Deployed across 50+ French universities"
        }
      ]
    },
    {
      id: "cohort-10-2024",
      cohortNumber: 10,
      year: "2024",
      location: "Toronto",
      startupCount: 18,
      totalFunding: "CAD $9.5M",
      demoDay: "March 2024",
      highlights: [
        "Record-breaking demo day",
        "4 international partnerships",
        "Average team size doubled"
      ],
      featuredStartups: [
        {
          name: "MindfulEd",
          description: "Mental health and wellbeing platform for students",
          outcome: "CAD $4.1M Series A, 100K+ active users"
        },
        {
          name: "CodeCraft",
          description: "Gamified programming education for children",
          outcome: "Licensing deal with Canadian Ministry of Education"
        }
      ]
    }
  ];

  const getLocationColor = (location: string) => {
    switch (location) {
      case "London":
        return "bg-blue-500 text-white";
      case "Paris":
        return "bg-purple-500 text-white";
      case "Toronto":
        return "bg-red-500 text-white";
      case "Dubai":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <section id="past-programs" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Recent Program Success</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our latest cohorts demonstrate the real-world impact of evidence-led EdTech development, 
            with startups raising significant funding and making measurable educational impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {pastPrograms.map((program) => (
            <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge className={getLocationColor(program.location)}>
                      {program.location}
                    </Badge>
                    <span className="text-sm text-gray-500">{program.demoDay}</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">#{program.cohortNumber}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Cohort {program.cohortNumber} - {program.year}
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{program.startupCount}</div>
                    <div className="text-sm text-gray-600">Startups</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-success">{program.totalFunding}</div>
                    <div className="text-sm text-gray-600">Total Raised</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Highlights</h4>
                <ul className="space-y-2 mb-6">
                  {program.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600 text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="font-semibold text-gray-900 mb-3">Featured Startups</h4>
                <div className="space-y-4">
                  {program.featuredStartups.map((startup, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <h5 className="font-semibold text-gray-900 text-sm">{startup.name}</h5>
                      <p className="text-xs text-gray-600 mb-1">{startup.description}</p>
                      <p className="text-xs text-success font-medium">{startup.outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Program Alumni Network</h3>
            <div className="grid md:grid-cols-4 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">300+</div>
                <div className="text-gray-600">Alumni Founders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">85%</div>
                <div className="text-gray-600">Still Operating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">45</div>
                <div className="text-gray-600">Countries Reached</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">8M+</div>
                <div className="text-gray-600">Learners Impacted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}