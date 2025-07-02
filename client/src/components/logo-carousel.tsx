import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Partner logos - using text placeholders for now

interface Partner {
  id: string;
  name: string;
  website: string;
}

export default function LogoCarousel() {
  const partners: Partner[] = [
    {
      id: "ucl-institute-education",
      name: "UCL Institute of Education",
      website: "https://www.ucl.ac.uk/ioe/"
    },
    {
      id: "santander-universities",
      name: "Santander Universities",
      website: "https://www.santander.com/en/about-us/sustainability/santander-universities"
    },
    {
      id: "ucl-engineering",
      name: "UCL Engineering",
      website: "https://www.ucl.ac.uk/engineering/"
    },
    {
      id: "ucl-digital-innovation",
      name: "UCL Centre for Digital Innovation",
      website: "https://www.ucl.ac.uk/digital-innovation/"
    },
    {
      id: "ucl-cee",
      name: "UCL Centre for Engineering Education",
      website: "https://www.ucl.ac.uk/engineering/study/undergraduate-study/centre-engineering-education"
    },
    {
      id: "ucl-school-management",
      name: "UCL School of Management",
      website: "https://www.mgmt.ucl.ac.uk/"
    },
    {
      id: "ideal-london",
      name: "IDEAL London",
      website: "https://www.ideallondon.co.uk/"
    },
    {
      id: "cergy-paris-universite",
      name: "CY Cergy Paris Université",
      website: "https://www.cyu.fr/"
    },
    {
      id: "essec-business-school",
      name: "ESSEC Business School",
      website: "https://www.essec.edu/"
    },
    {
      id: "val-d-oise",
      name: "Val d'Oise",
      website: "https://www.valdoise.fr/"
    },
    {
      id: "ile-de-france",
      name: "Île-de-France",
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
                    <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                      {partner.name}
                    </span>
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