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
      id: "ucl-edtech-labs",
      name: "UCL EdTech Labs",
      logoUrl: "/logo.jpg"
    },
    {
      id: "jisc",
      name: "Jisc",
      logoUrl: "https://www.jisc.ac.uk/sites/default/files/jisc-logo.svg"
    },
    {
      id: "innovate-uk",
      name: "Innovate UK",
      logoUrl: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/organisation/logo/1348/innovate-uk-logo.png"
    },
    {
      id: "british-council",
      name: "British Council",
      logoUrl: "https://www.britishcouncil.org/sites/default/files/british-council-logo.svg"
    },
    {
      id: "techstars",
      name: "Techstars",
      logoUrl: "https://www.techstars.com/content/themes/techstars/dist/images/techstars-logo-black.svg"
    },
    {
      id: "edtech-hub",
      name: "EdTech Hub",
      logoUrl: "https://edtechhub.org/wp-content/uploads/2020/06/cropped-EdTech-Hub-Logo-2020-Full-Colour-1.png"
    },
    {
      id: "reach-capital",
      name: "Reach Capital",
      logoUrl: "https://reachcap.com/wp-content/uploads/2021/03/reach-capital-logo.svg"
    },
    {
      id: "nesta",
      name: "Nesta",
      logoUrl: "https://www.nesta.org.uk/app/uploads/2022/09/nesta-logo.svg"
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