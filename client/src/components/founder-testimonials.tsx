import { useState } from "react";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
}

const INITIAL_VISIBLE = 4;

export default function FounderTestimonials() {
  const [showAll, setShowAll] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: "1",
      quote: "After a few workshops things are beginning to fall into place. We've had a few good team sessions over the last few days and have made progress with stakeholder mapping and logic modelling for product, marketing & sales",
      name: "Andrea De Giorgio",
      title: "CEO & Co-founder",
      company: "eWorking"
    },
    {
      id: "2",
      quote: "The impact on our 'self-made assumption' was massive, we have to work a lot to build a robust logical structure around our evaluations and decisions",
      name: "Angela Newton",
      title: "Co-Founder",
      company: "Real Fast Reports"
    },
    {
      id: "3",
      quote: "We received HUGE value - we had a full team/board meeting yesterday to see how we can implement changes to our product and marketing strategy using the stakeholder mapping and research questioning",
      name: "Dan Rosenberg",
      title: "Founder",
      company: "LinkyThinks"
    },
    {
      id: "4",
      quote: "UCL EdTech Labs is the bridge between UCL and the EdTech ecosystem in London, Europe and beyond. The accelerator has helped us reach many key individuals, and it has been the root reason for our growth for the past year.",
      name: "Arum Tufan",
      title: "Founder",
      company: "Happy Student"
    },
    {
      id: "5",
      quote: "I learned the value of feedback, and the importance of compiling and using research data to guide decision-making.",
      name: "Arthur Vincent",
      title: "Founder/Director",
      company: "Planet Citizens"
    },
    {
      id: "6",
      quote: "The programme taught me how to apply research methods, use the innovation spiral effectively, and structure a compelling value proposition.",
      name: "Clare Daly",
      title: "Developer of Potential",
      company: "Dynamigo"
    },
    {
      id: "7",
      quote: "I now approach product development with a research-backed, data-driven mindset—using evidence to reinforce value and inform the development of new features.",
      name: "Kate Bodrova",
      title: "Co-Founder and CEO",
      company: "Amazy.uk"
    },
    {
      id: "8",
      quote: "I learned how to plan user testing logically by setting up clear scenarios and hypotheses, allowing us to gather meaningful insights from real users.",
      name: "Chayanon Lieng",
      title: "Founder",
      company: "Useless Land"
    }
  ];

  const visible = showAll ? testimonials : testimonials.slice(0, INITIAL_VISIBLE);

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Founders Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real feedback from founders who've experienced our evidence-led methodology firsthand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {visible.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start mb-4">
                <Quote className="text-primary h-8 w-8 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="flex items-center mt-6 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <img
                    src={`/avatars/${testimonial.name.toLowerCase().replace(/\s+/g, '-')}.png`}
                    alt={`${testimonial.name} headshot`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.parentElement?.querySelector('.fallback-initials');
                      if (fallback) {
                        (fallback as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="fallback-initials w-full h-full bg-primary/10 rounded-full hidden items-center justify-center">
                    <span className="text-primary font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                  <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length > INITIAL_VISIBLE && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="px-8"
            >
              {showAll ? "Show fewer" : `See all ${testimonials.length} testimonials`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
