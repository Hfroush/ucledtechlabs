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
}

export default function LogoCarousel() {
  const partners: Partner[] = [
    {
      id: "ucl-institute-education",
      name: "UCL Institute of Education",
      logoUrl: "/logos/ucl-institute-education.png"
    },
    {
      id: "santander-universities",
      name: "Santander Universities",
      logoUrl: "/logos/santander-universities.png"
    },
    {
      id: "ucl-engineering",
      name: "UCL Engineering",
      logoUrl: "/logos/ucl-engineering.png"
    },
    {
      id: "ucl-digital-innovation",
      name: "UCL Centre for Digital Innovation",
      logoUrl: "/logos/ucl-digital-innovation.png"
    },
    {
      id: "ucl-cee",
      name: "UCL Centre for Engineering Education",
      logoUrl: "/logos/ucl-cee.png"
    },
    {
      id: "ucl-school-management",
      name: "UCL School of Management",
      logoUrl: "/logos/ucl-school-management.png"
    },
    {
      id: "ideal-london",
      name: "IDEAL London",
      logoUrl: "/logos/ideal-london.png"
    },
    {
      id: "edtechx-europe",
      name: "EdTechX Europe",
      logoUrl: "/logos/edtechx-europe.png"
    },
    {
      id: "cergy-paris-universite",
      name: "CY Cergy Paris Université",
      logoUrl: "/logos/cergy-paris-universite.png"
    },
    {
      id: "essec-business-school",
      name: "ESSEC Business School",
      logoUrl: "/logos/essec-business-school.png"
    },
    {
      id: "val-d-oise",
      name: "Val d'Oise",
      logoUrl: "/logos/val-d-oise.png"
    },
    {
      id: "ile-de-france",
      name: "Île-de-France",
      logoUrl: "/logos/ile-de-france.png"
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
                  <div className="bg-white rounded-lg p-4 h-20 flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                    <img
                      src={partner.logoUrl}
                      alt={`${partner.name} logo`}
                      className="max-h-10 max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}