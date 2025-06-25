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
      id: "university-college-london",
      name: "University College London",
      logoUrl: "/logo.jpg"
    },
    {
      id: "microsoft",
      name: "Microsoft",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png"
    },
    {
      id: "google",
      name: "Google",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png"
    },
    {
      id: "amazon-aws",
      name: "AWS",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png"
    },
    {
      id: "university-of-toronto",
      name: "University of Toronto",
      logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/256px-Utoronto_coa.svg.png"
    },
    {
      id: "sorbonne-university",
      name: "Sorbonne University",
      logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Sorbonne_University_logo.svg/256px-Sorbonne_University_logo.svg.png"
    },
    {
      id: "imperial-college",
      name: "Imperial College London",
      logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Imperial_College_London_crest.svg/256px-Imperial_College_London_crest.svg.png"
    },
    {
      id: "cambridge",
      name: "University of Cambridge",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/University_of_Cambridge_coat_of_arms_official.svg/256px-University_of_Cambridge_coat_of_arms_official.svg.png"
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