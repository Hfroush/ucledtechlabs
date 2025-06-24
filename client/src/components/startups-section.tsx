import { Badge } from "@/components/ui/badge";

interface Startup {
  id: string;
  name: string;
  description: string;
  category: string;
  funding: string;
  location: string;
  year: string;
  imageUrl: string;
  gradientClass: string;
}

export default function StartupsSection() {
  const startups: Startup[] = [
    {
      id: "learnflow",
      name: "LearnFlow",
      description: "AI-powered personalized learning platform that adapts to individual student needs in real-time.",
      category: "AI Education",
      funding: "$2.5M Raised",
      location: "London",
      year: "2023",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      gradientClass: "from-blue-500 to-purple-600"
    },
    {
      id: "educonnect",
      name: "EduConnect",
      description: "Virtual classroom platform connecting students globally with expert educators and cultural exchange.",
      category: "Virtual Learning",
      funding: "$1.8M Raised",
      location: "Toronto",
      year: "2023",
      imageUrl: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      gradientClass: "from-green-500 to-teal-600"
    },
    {
      id: "skillforge",
      name: "SkillForge",
      description: "Gamified skill assessment and certification platform for professional development and career growth.",
      category: "Professional Training",
      funding: "$3.2M Raised",
      location: "London",
      year: "2022",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      gradientClass: "from-orange-500 to-red-600"
    },
    {
      id: "mindbridge",
      name: "MindBridge",
      description: "Mental health and wellbeing platform specifically designed for students and educational institutions.",
      category: "Student Wellbeing",
      funding: "$1.5M Raised",
      location: "Paris",
      year: "2023",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      gradientClass: "from-purple-500 to-pink-600"
    },
    {
      id: "codecraft",
      name: "CodeCraft",
      description: "Interactive coding education platform with real-world project simulations and industry mentorship.",
      category: "Technical Training",
      funding: "$4.1M Raised",
      location: "Toronto",
      year: "2022",
      imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      gradientClass: "from-indigo-500 to-blue-600"
    },
    {
      id: "ecolearn",
      name: "EcoLearn",
      description: "Sustainability education platform teaching climate action through interactive simulations and real projects.",
      category: "Environmental Education",
      funding: "$2.8M Raised",
      location: "London",
      year: "2023",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      gradientClass: "from-teal-500 to-green-600"
    }
  ];

  return (
    <section id="startups" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet some of the innovative EdTech startups we've helped accelerate across our global programs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {startups.map((startup) => (
            <div key={startup.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`h-48 bg-gradient-to-br ${startup.gradientClass} relative`}>
                <img 
                  src={startup.imageUrl} 
                  alt={`${startup.name} team or workspace`} 
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white">
                    {startup.location} {startup.year}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{startup.name}</h3>
                <p className="text-gray-600 mb-4">{startup.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{startup.category}</span>
                  <span className="font-medium text-success">{startup.funding}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
