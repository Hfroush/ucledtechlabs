import { Badge } from "@/components/ui/badge";

// London partner logos
const santanderLogo = "/logos/santander-universities.png";
const uclEducationLogo = "/logos/ucl-institute-education.png";
const uclEngineeringLogo = "/logos/ucl-engineering-new.png";
const uclDigitalLogo = "/logos/ucl-digital-innovation-aws.png";
const uclCeeLogo = "/logos/ucl-cee-new.png";
const uclManagementLogo = "/logos/ucl-school-management-new.png";
const idealLondonLogo = "/logos/ideal-london-updated.png";
const doheGlobalLogo = "/logos/dohe-global.png";
const londonEdtechWeekLogo = "/logos/london-edtechweek.png";

// Paris partner logos
const uclEducationParis = "/logos/ucl-institute-education.png";
const cyUniversiteLogo = "/logos/cy-cergy-paris.png";
const uclEngineeringParis = "/logos/ucl-engineering-new.png";
const essecLogo = "/logos/essec-business-school.png";
const valOiseLogo = "/logos/val-d-oise.png";
const laTurbineLogo = "/logos/la-turbine.png";
const bpiFranceLogo = "/logos/bpifrance.png";
const edtechFranceLogo = "/logos/edtech-france.png";
const ileDeFranceLogo = "/logos/ile-de-france.png";

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
      id: "cohort-6-london",
      cohortNumber: 6,
      year: "2024",
      location: "London",
      startupCount: 0,
      totalFunding: "",
      demoDay: "",
      highlights: [],
      featuredStartups: [
        {
          name: "Atom Learning",
          description: "$25 million Series A, led by SoftBank Vision Fund 2 — marking it as one of the largest-ever EdTech Series A rounds in the UK, fuelled by its AI‑powered adaptive learning platform for primary students",
          outcome: "Adopted by 500+ UK schools and 100,000+ pupils — with Atom Prime free for schools and disadvantaged students, and over 90,000 children regularly using the platform"
        },
        {
          name: "Chatterbox",
          description: "£1.5 million pre‑seed round led by GMG Ventures (alongside All Turtles, Softbank, Guardian Ventures) to scale its refugee-powered language training for corporates like Unilever, PwC, and British Red Cross",
          outcome: "Social impact mission embedded in business — exclusively hires coaches from refugee or marginalised backgrounds, offering professional teaching roles and improving workplace cultural intelligence at B Corp clients; founded by Mursal Hedayat MBE, Forbes 30‑Under‑30 & Next Billion EdTech Prize winner"
        }
      ]
    },
    {
      id: "cohort-5-paris",
      cohortNumber: 5,
      year: "2024",
      location: "Paris",
      startupCount: 0,
      totalFunding: "",
      demoDay: "",
      highlights: [],
      featuredStartups: [
        {
          name: "Vittascience",
          description: "300,000+ teachers & students engaged — since its 2018 launch, Vittascience's coding & AI platform has been adopted widely across France, making STEM education accessible from middle school through high school",
          outcome: "Partnered with STMicroelectronics to launch embedded AI kit — in September 2024, they released a beginner‑friendly AI toolkit built around STM32 microcontrollers for classrooms, marking their fifth co‑developed STEM kit"
        },
        {
          name: "Infolab.ai",
          description: "Innovation in AI-powered educational agents — founded in Tallinn in 2024, Infolab.ai builds LLM-based tutors that help educators understand student learning deeply and support tailored instruction",
          outcome: "Committed to impact measurement — actively conducting research and case studies to quantify how their AI solutions improve teaching efficiency and student outcomes, ensuring the platform delivers real-world educational benefits"
        }
      ]
    },
    
  ];

  const getLocationColor = (location: string) => {
    switch (location) {
      case "London":
        return "bg-blue-500 text-white";
      case "Paris":
        return "bg-purple-500 text-white";
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
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Program Snapshot</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our latest cohorts demonstrate the real-world impact of evidence-led EdTech development, 
            with startups raising significant funding and making measurable educational impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
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
                  {program.location !== "London" && program.location !== "Paris" && (
                    <span className="text-2xl font-bold text-primary">#{program.cohortNumber}</span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {program.location === "London" ? "6 Cohorts" : 
                   program.location === "Paris" ? "5 Cohorts" : 
                   `Cohort ${program.cohortNumber}`}
                </h3>
                
                {program.location === "London" ? (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={santanderLogo}
                        alt="Santander Universities"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={uclEducationLogo}
                        alt="UCL Institute of Education"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={uclEngineeringLogo}
                        alt="UCL Engineering"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={uclDigitalLogo}
                        alt="UCL Centre for Digital Innovation powered by AWS"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={uclCeeLogo}
                        alt="UCL Centre for Engineering Education"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={uclManagementLogo}
                        alt="UCL School of Management"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={idealLondonLogo}
                        alt="IDEAL London"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={doheGlobalLogo}
                        alt="DOHE Global"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={londonEdtechWeekLogo}
                        alt="London EdTech Week"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                  </div>
                ) : program.location === "Paris" ? (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={uclEducationParis}
                        alt="UCL Institute of Education"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={cyUniversiteLogo}
                        alt="CY Cergy Paris Université"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={uclEngineeringParis}
                        alt="UCL Engineering"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={essecLogo}
                        alt="ESSEC Business School"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={valOiseLogo}
                        alt="Val d'Oise le département"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={laTurbineLogo}
                        alt="La Turbine"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={bpiFranceLogo}
                        alt="bpifrance"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={edtechFranceLogo}
                        alt="EdTech France"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <img
                        src={ileDeFranceLogo}
                        alt="Île-de-France"
                        className="h-10 mx-auto object-contain"
                      />
                    </div>
                  </div>
                ) : (
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
                )}
              </div>

              <div className="p-6">
                {program.highlights.length > 0 && (
                  <>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <ul className="space-y-2 mb-6">
                      {program.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <h4 className="font-semibold text-gray-900 mb-3">Featured Startups</h4>
                <div className="space-y-4">
                  {program.featuredStartups.map((startup, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <h5 className="font-semibold text-gray-900 text-sm mb-2">{startup.name}</h5>
                      <p className="text-xs text-gray-600 mb-2 leading-relaxed">{startup.description}</p>
                      <p className="text-xs text-success font-medium leading-relaxed">{startup.outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}