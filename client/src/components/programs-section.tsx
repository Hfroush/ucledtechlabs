import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, MapPin } from "lucide-react";

interface Program {
  id: string;
  city: string;
  name: string;
  description: string;
  nextCohort: string;
  startupCount: number;
  duration: string;
  status: "open" | "soon";
  imageUrl: string;
}

export default function ProgramsSection() {
  const [selectedCity, setSelectedCity] = useState("all");

  const programs: Program[] = [
    {
      id: "london",
      city: "London",
      name: "London Program",
      description: "Join Europe's leading EdTech hub with access to top-tier investors and educational institutions.",
      nextCohort: "March 2024",
      startupCount: 15,
      duration: "12-Week Intensive",
      status: "open",
      imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: "paris",
      city: "Paris",
      name: "Paris Program",
      description: "Experience France's vibrant startup ecosystem with access to EU markets and funding opportunities.",
      nextCohort: "June 2024",
      startupCount: 12,
      duration: "12-Week Intensive",
      status: "soon",
      imageUrl: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: "dubai",
      city: "Dubai",
      name: "Dubai Program",
      description: "Enter the Middle East's innovation hub with access to emerging markets and regional partnerships.",
      nextCohort: "September 2024",
      startupCount: 10,
      duration: "12-Week Intensive",
      status: "soon",
      imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    }
  ];

  const cities = ["all", "london", "paris", "dubai"];
  
  const filteredPrograms = selectedCity === "all" 
    ? programs 
    : programs.filter(program => program.id === selectedCity);

  const scrollToApply = () => {
    const section = document.getElementById("apply");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="programs" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Global Programs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our 12-week accelerator programs are designed to transform educational startups across four major innovation hubs.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-2 shadow-sm flex flex-wrap gap-2">
            {cities.map((city) => (
              <Button
                key={city}
                onClick={() => setSelectedCity(city)}
                variant={selectedCity === city ? "default" : "ghost"}
                className={selectedCity === city ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}
              >
                {city === "all" ? "All Cities" : city.charAt(0).toUpperCase() + city.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 relative">
                <img 
                  src={program.imageUrl} 
                  alt={`${program.city} cityscape`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant={program.status === "open" ? "default" : "secondary"}
                    className={program.status === "open" ? "bg-success text-white" : "bg-accent text-gray-900"}
                  >
                    {program.status === "open" ? "Applications Open" : "Opening Soon"}
                  </Badge>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{program.name}</h3>
                  <MapPin className="text-primary text-xl" />
                </div>
                <p className="text-gray-600 mb-6">{program.description}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Calendar className="text-primary mr-3 h-5 w-5" />
                    <span className="text-gray-700">Next Cohort: {program.nextCohort}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="text-primary mr-3 h-5 w-5" />
                    <span className="text-gray-700">{program.startupCount} Startups per Cohort</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="text-primary mr-3 h-5 w-5" />
                    <span className="text-gray-700">{program.duration}</span>
                  </div>
                </div>
                <Button 
                  onClick={scrollToApply}
                  className={`w-full py-3 font-semibold ${
                    program.status === "open" 
                      ? "bg-primary text-white hover:bg-blue-700" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {program.status === "open" ? `Apply to ${program.city} Program` : "Register Interest"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
