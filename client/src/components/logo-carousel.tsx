
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Partner {
  id: string;
  name: string;
  website: string;
  logoUrl: string;
}

export default function LogoCarousel() {
  const partners: Partner[] = [
    {
      id: "ucl-institute-education",
      name: "UCL Institute of Education",
      website: "https://www.ucl.ac.uk/ioe/",
      logoUrl: "/logos/ucl-institute-education.png"
    },
    {
      id: "santander-universities",
      name: "Santander Universities",
      website: "https://www.santander.com/en/about-us/sustainability/santander-universities",
      logoUrl: "/logos/santander-universities.png"
    },
    {
      id: "ucl-engineering",
      name: "UCL Engineering Faculty",
      website: "https://www.ucl.ac.uk/engineering/",
      logoUrl: "/logos/ucl-engineering-new.png"
    },
    {
      id: "ucl-digital-innovation",
      name: "UCL Centre for Digital Innovation",
      website: "https://www.ucl.ac.uk/digital-innovation/",
      logoUrl: "/logos/ucl-digital-innovation-aws.png"
    },
    {
      id: "ucl-cee",
      name: "UCL Centre for Engineering Education",
      website: "https://www.ucl.ac.uk/engineering/study/undergraduate-study/centre-engineering-education",
      logoUrl: "/logos/ucl-cee-new.png"
    },
    {
      id: "ucl-school-management",
      name: "UCL School of Management",
      website: "https://www.mgmt.ucl.ac.uk/",
      logoUrl: "/logos/ucl-school-management-new.png"
    },
    {
      id: "ideal-london",
      name: "IDEAL London",
      website: "https://www.ideallondon.co.uk/",
      logoUrl: "/logos/ideal-london-updated.png"
    },
    {
      id: "dohe-global",
      name: "DOHE Global",
      website: "#",
      logoUrl: "/logos/dohe-global.png"
    },
    {
      id: "london-edtechweek",
      name: "London EdTech Week",
      website: "#",
      logoUrl: "/logos/london-edtechweek.png"
    },
    {
      id: "cergy-paris-universite",
      name: "CY Cergy Paris Université",
      website: "https://www.cyu.fr/",
      logoUrl: "/logos/cy-cergy-paris.png"
    },
    {
      id: "essec-business-school",
      name: "ESSEC Business School",
      website: "https://www.essec.edu/",
      logoUrl: "/logos/essec-business-school.png"
    },
    {
      id: "val-d-oise",
      name: "Val d'Oise",
      website: "https://www.valdoise.fr/",
      logoUrl: "/logos/val-d-oise.png"
    },
    {
      id: "ile-de-france",
      name: "Île-de-France",
      website: "https://www.iledefrance.fr/",
      logoUrl: "/logos/ile-de-france.png"
    },
    {
      id: "ree-engineering-education",
      name: "REE - Re-imagining Engineering Education",
      website: "#",
      logoUrl: "/logos/ree-engineering-education.png"
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
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.fallback-text')) {
                          const fallback = document.createElement('span');
                          fallback.className = 'text-xs font-medium text-gray-700 text-center leading-tight fallback-text';
                          fallback.textContent = partner.name;
                          parent.appendChild(fallback);
                        }
                      }}
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
