import { Badge } from "@/components/ui/badge";

interface Partner {
  id: string;
  name: string;
  type: "investor" | "mentor" | "institution" | "corporate" | "government" | "delivery" | "coworking";
  description: string;
  logoUrl: string;
  website?: string;
}

export default function PartnersSection() {
  const partners: Partner[] = [
    {
      id: "ucl",
      name: "University College London",
      type: "institution",
      description: "World's #1 ranked education faculty (QS World University Rankings). Leading global education research and teacher training institution with unparalleled expertise in educational innovation.",
      logoUrl: "/logos/ucl.png",
      website: "https://www.ucl.ac.uk/ioe/"
    },
    {
      id: "ucl-cdi",
      name: "Centre for Digital Innovation (UCL)",
      type: "institution", 
      description: "Powered by AWS, driving digital transformation in education through cutting-edge research and industry partnerships.",
      logoUrl: "/logos/ucl-digital-innovation.png",
      website: "https://www.ucl.ac.uk/digital-innovation/"
    },
    {
      id: "ucl-cee",
      name: "Centre for Engineering Education (UCL)",
      type: "institution",
      description: "Advancing engineering education through innovative teaching methods, curriculum development, and educational technology.",
      logoUrl: "/logos/ucl-engineering-education.png", 
      website: "https://www.ucl.ac.uk/engineering/"
    },
    {
      id: "santander",
      name: "Santander Universities",
      type: "corporate",
      description: "Global banking partner supporting education and entrepreneurship initiatives across 40 countries with over 1,200 university partnerships.",
      logoUrl: "/logos/santander-universities.png",
      website: "https://www.santander.com/en/about-us/santander-universities"
    },
    {
      id: "ile-de-france",
      name: "Île-de-France Region",
      type: "government",
      description: "Leading European region supporting innovation and digital transformation in education, home to world-class universities and research institutions.",
      logoUrl: "/logos/ile-de-france.png",
      website: "https://www.iledefrance.fr/"
    },
    {
      id: "cy-cergy",
      name: "CY Cergy Paris Université",
      type: "institution",
      description: "Leading French university with strong focus on innovation, entrepreneurship, and international collaboration in education technology.",
      logoUrl: "/logos/cy-cergy-paris.png",
      website: "https://www.cyu.fr/"
    },
    {
      id: "startup-labs",
      name: "Startup Labs",
      type: "delivery",
      description: "Innovation accelerator and mentorship organization supporting early-stage startups with expert guidance, resources, and network connections.",
      logoUrl: "/logos/startup-labs.png", 
      website: "https://startuplabs.com/"
    },
    {
      id: "ideal-london",
      name: "IDEALondon",
      type: "coworking",
      description: "Innovation hub fostering collaboration between academics, entrepreneurs, and industry leaders to accelerate educational innovation.",
      logoUrl: "/logos/ideal-london.png",
      website: "https://www.ideallondon.co.uk/"
    }
  ];

  const getTypeColor = (type: Partner["type"]) => {
    switch (type) {
      case "institution":
        return "bg-blue-100 text-blue-800";
      case "corporate":
        return "bg-green-100 text-green-800";
      case "investor":
        return "bg-purple-100 text-purple-800";
      case "mentor":
        return "bg-orange-100 text-orange-800";
      case "government":
        return "bg-red-100 text-red-800";
      case "delivery":
        return "bg-yellow-100 text-yellow-800";
      case "coworking":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: Partner["type"]) => {
    switch (type) {
      case "institution":
        return "Academic Institution";
      case "corporate":
        return "Corporate Partner";
      case "investor":
        return "Investment Partner";
      case "mentor":
        return "Mentor Organization";
      case "government":
        return "Regional Government";
      case "delivery":
        return "Delivery Partner";
      case "coworking":
        return "Co-working Partner";
      default:
        return "Partner";
    }
  };

  return (
    <section id="partners" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Some of our Partners
</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with the world's leading educational institutions, including the #1 ranked education faculty globally, 
            along with innovative organizations driving digital transformation in learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                      <img 
                        src={partner.logoUrl} 
                        alt={`${partner.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {partner.name}
                      </h3>
                      <Badge className={`text-xs ${getTypeColor(partner.type)}`}>
                        {getTypeLabel(partner.type)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {partner.description}
              </p>

              {partner.website && (
                <div className="pt-4 border-t border-gray-100">
                  <a 
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm font-medium hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Visit website
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}