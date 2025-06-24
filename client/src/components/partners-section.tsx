import { Badge } from "@/components/ui/badge";

interface Partner {
  id: string;
  name: string;
  type: "investor" | "mentor" | "institution" | "corporate";
  description: string;
  logoUrl: string;
  website?: string;
}

export default function PartnersSection() {
  const partners: Partner[] = [
    {
      id: "university-college-london",
      name: "University College London",
      type: "institution",
      description: "Leading research institution providing academic expertise and validation methodologies.",
      logoUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
    },
    {
      id: "microsoft-education",
      name: "Microsoft for Education",
      type: "corporate",
      description: "Technology partner providing Azure credits and educational tools for our startups.",
      logoUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
    },
    {
      id: "reach-capital",
      name: "Reach Capital",
      type: "investor",
      description: "EdTech-focused venture capital firm supporting our portfolio companies with funding.",
      logoUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
    },
    {
      id: "university-of-toronto",
      name: "University of Toronto",
      type: "institution",
      description: "Academic partner in Toronto providing research facilities and student talent pipeline.",
      logoUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
    },
    {
      id: "google-for-education",
      name: "Google for Education",
      type: "corporate",
      description: "Cloud platform partner offering Google Cloud credits and workspace solutions.",
      logoUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
    },
    {
      id: "sorbonne-university",
      name: "Sorbonne University",
      type: "institution",
      description: "French academic excellence partner contributing to European program development.",
      logoUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
    },
    {
      id: "aws-activate",
      name: "AWS Activate",
      type: "corporate",
      description: "Cloud infrastructure partner providing AWS credits and technical support for scaling.",
      logoUrl: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
    },
    {
      id: "london-business-school",
      name: "London Business School",
      type: "institution",
      description: "Business education expertise and entrepreneurship curriculum development partner.",
      logoUrl: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
    }
  ];

  const getPartnerTypeColor = (type: Partner["type"]) => {
    switch (type) {
      case "investor":
        return "bg-success text-white";
      case "mentor":
        return "bg-secondary text-white";
      case "institution":
        return "bg-primary text-white";
      case "corporate":
        return "bg-accent text-gray-900";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPartnerTypeLabel = (type: Partner["type"]) => {
    switch (type) {
      case "investor":
        return "Investment Partner";
      case "mentor":
        return "Mentor Network";
      case "institution":
        return "Academic Partner";
      case "corporate":
        return "Technology Partner";
      default:
        return "Partner";
    }
  };

  return (
    <section id="partners" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Partners & Supporters</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with leading institutions, investors, and technology companies to provide 
            comprehensive support for our startup community across all four global locations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div key={partner.id} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <Badge className={`${getPartnerTypeColor(partner.type)} mb-3`}>
                  {getPartnerTypeLabel(partner.type)}
                </Badge>
                <div className="h-16 mb-4 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                  <img 
                    src={partner.logoUrl} 
                    alt={`${partner.name} logo`} 
                    className="max-h-12 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{partner.name}</h3>
              <p className="text-gray-600 text-sm">{partner.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-50 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Partnership Benefits</h3>
            <div className="grid md:grid-cols-4 gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">$1M+</span>
                </div>
                <h4 className="font-semibold text-gray-900">Member Perks</h4>
                <p className="text-gray-600 text-sm">Free and discounted services</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">150+</span>
                </div>
                <h4 className="font-semibold text-gray-900">Expert Mentors</h4>
                <p className="text-gray-600 text-sm">Industry-leading guidance</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">4</span>
                </div>
                <h4 className="font-semibold text-gray-900">Global Hubs</h4>
                <p className="text-gray-600 text-sm">International network access</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">0%</span>
                </div>
                <h4 className="font-semibold text-gray-900">Equity Required</h4>
                <p className="text-gray-600 text-sm">100% equity-free program</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Interested in partnering with EduAccelerator to support the next generation of EdTech innovators?
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  );
}