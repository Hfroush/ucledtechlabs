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
      id: "edtechx-london",
      name: "EdTechX London",
      website: "https://www.edtechxeurope.com/",
      logoUrl: "/logos/edtechx-london.png"
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
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, partnerName: string) => {
    const target = e.target as HTMLImageElement;
    const parent = target.parentElement;

    // Hide the broken image
    target.style.display = 'none';

    // Add fallback text if not already present
    if (parent && !parent.querySelector('.fallback-text')) {
      const fallback = document.createElement('div');
      fallback.className = 'fallback-text text-xs font-medium text-gray-700 text-center leading-tight px-2';
      fallback.textContent = partnerName;
      parent.appendChild(fallback);
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Trusted by leading organizations across the global EdTech ecosystem
          </p>
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
                    className="flex h-16 items-center justify-center px-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                    title={`Visit ${partner.name}`}
                  >
                    <img 
                      src={partner.logoUrl} 
                      alt={`${partner.name} logo`}
                      className="h-full w-full object-contain"
                      onError={(e) => handleImageError(e, partner.name)}
                      loading="lazy"
                      onLoad={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'block';
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