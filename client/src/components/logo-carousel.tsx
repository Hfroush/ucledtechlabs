import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
}

export default function LogoCarousel() {
  const partners: Partner[] = [
    {
      id: "ucl-institute-education",
      name: "UCL Institute of Education",
      logoUrl: "/logos/ucl-institute-education.png",
      website: "https://www.ucl.ac.uk/ioe/"
    },
    {
      id: "santander-universities",
      name: "Santander Universities",
      logoUrl: "/logos/santander-universities.png",
      website: "https://www.santander.com/en/about-us/sustainability/santander-universities"
    },
    {
      id: "ucl-engineering",
      name: "UCL Engineering",
      logoUrl: "/logos/ucl-engineering.png",
      website: "https://www.ucl.ac.uk/engineering/"
    },
    {
      id: "ucl-digital-innovation",
      name: "UCL Centre for Digital Innovation",
      logoUrl: "/logos/ucl-digital-innovation.png",
      website: "https://www.ucl.ac.uk/digital-innovation/"
    },
    {
      id: "ucl-cee",
      name: "UCL Centre for Engineering Education",
      logoUrl: "/logos/ucl-cee.png",
      website: "https://www.ucl.ac.uk/engineering/study/undergraduate-study/centre-engineering-education"
    },
    {
      id: "ucl-school-management",
      name: "UCL School of Management",
      logoUrl: "/logos/ucl-school-management.png",
      website: "https://www.mgmt.ucl.ac.uk/"
    },
    {
      id: "ideal-london",
      name: "IDEAL London",
      logoUrl: "/logos/ideal-london.png",
      website: "https://www.ideallondon.co.uk/"
    },
    {
      id: "edtechx-europe",
      name: "EdTechX Europe",
      logoUrl: "/logos/edtechx-europe.png",
      website: "https://www.edtechxeurope.com/"
    },
    {
      id: "cergy-paris-universite",
      name: "CY Cergy Paris Université",
      logoUrl: "/logos/cergy-paris-universite.png",
      website: "https://www.cyu.fr/"
    },
    {
      id: "essec-business-school",
      name: "ESSEC Business School",
      logoUrl: "/logos/essec-business-school.png",
      website: "https://www.essec.edu/"
    },
    {
      id: "val-d-oise",
      name: "Val d'Oise",
      logoUrl: "/logos/val-d-oise.png",
      website: "https://www.valdoise.fr/"
    },
    {
      id: "ile-de-france",
      name: "Île-de-France",
      logoUrl: "/logos/ile-de-france.png",
      website: "https://www.iledefrance.fr/"
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Trusted by Leading Organizations</h2>
          <p className="text-gray-600">Our partners and supporters across the global EdTech ecosystem</p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {[...partners, ...partners].map((partner, index) => (
              <CarouselItem key={`${partner.id}-${index}`} className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                <div className="p-2">
                  <a 
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-lg p-4 h-20 flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300 cursor-pointer"
                    title={`Visit ${partner.name}`}
                  >
                    <img
                      src={partner.logoUrl}
                      alt={`${partner.name} logo`}
                      className="max-h-10 max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                      loading="lazy"
                    />
                  </a>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}