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
      id: "microsoft-education",
      name: "Microsoft for Education",
      logoUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
    },
    {
      id: "reach-capital",
      name: "Reach Capital",
      logoUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
    },
    {
      id: "university-of-toronto",
      name: "University of Toronto",
      logoUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
    },
    {
      id: "google-for-education",
      name: "Google for Education",
      logoUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
    },
    {
      id: "sorbonne-university",
      name: "Sorbonne University",
      logoUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
    },
    {
      id: "aws-activate",
      name: "AWS Activate",
      logoUrl: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
    },
    {
      id: "london-business-school",
      name: "London Business School",
      logoUrl: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100"
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
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {partners.map((partner) => (
              <CarouselItem key={partner.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="p-4">
                  <div className="bg-white rounded-lg p-6 h-24 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={partner.logoUrl}
                      alt={`${partner.name} logo`}
                      className="max-h-12 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
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