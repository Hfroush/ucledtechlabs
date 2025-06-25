import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
}

export default function FounderTestimonials() {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      quote: "After a few workshops things are beginning to fall into place. We've had a few good team sessions over the last few days and have made progress with stakeholder mapping and logic modelling for product, marketing & sales",
      name: "Andrea De Giorgio",
      title: "CEO & Co-founder",
      company: "eWorking",
      avatar: "/avatars/andrea-de-giorgio.png"
    },
    {
      id: "2",
      quote: "The impact on our 'self-made assumption' was massive, we have to work a lot to build a robust logical structure around our evaluations and decisions",
      name: "Angela Newton",
      title: "Co-Founder",
      company: "Real Fast Reports",
      avatar: "/avatars/angela-newton.png"
    },
    {
      id: "3",
      quote: "We received HUGE value - we had a full team/board meeting yesterday to see how we can implement changes to our product and marketing strategy using the stakeholder mapping and research questioning",
      name: "Dan Rosenberg",
      title: "Founder",
      company: "LinkyThinks",
      avatar: "/avatars/dan-rosenberg.png"
    },
    {
      id: "4",
      quote: "UCL EdTech Labs is the bridge between UCL and the EdTech ecosystem in London, Europe and beyond. The accelerator has helped us reach many key individuals, and it has been the root reason for our growth for the past year.",
      name: "Arum Tufan",
      title: "Founder",
      company: "Happy Student",
      avatar: "/avatars/arum-tufan.png"
    },
    {
      id: "5",
      quote: "I learned the value of feedback, and the importance of compiling and using research data to guide decision-making.",
      name: "Arthur Vincent",
      title: "Founder/Director",
      company: "Planet Citizens",
      avatar: "/avatars/arthur-vincent.png"
    },
    {
      id: "6",
      quote: "The programme taught me how to apply research methods, use the innovation spiral effectively, and structure a compelling value proposition.",
      name: "Clare Daly",
      title: "Developer of Potential",
      company: "Dynamigo",
      avatar: "/avatars/clare-daly.png"
    },
    {
      id: "7",
      quote: "I now approach product development with a research-backed, data-driven mindset—using evidence to reinforce value and inform the development of new features.",
      name: "Kate Bodrova",
      title: "Co-Founder and CEO",
      company: "Amazy.uk",
      avatar: "/avatars/kate-bodrova.png"
    },
    {
      id: "8",
      quote: "I learned how to plan user testing logically by setting up clear scenarios and hypotheses, allowing us to gather meaningful insights from real users.",
      name: "Chayanon Lieng",
      title: "Founder",
      company: "Useless Land",
      avatar: "/avatars/chayanon-lieng.png"
    }
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Founders Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real feedback from founders who've experienced our evidence-led methodology firsthand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start mb-4">
                <Quote className="text-primary h-8 w-8 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center mt-6 pt-4 border-t border-gray-100">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                  <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}