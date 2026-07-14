import type { CSSProperties } from "react";
import { Rocket, Users, GraduationCap, BarChart3, Globe, type LucideIcon } from "lucide-react";
import spotline_on_founder from "@assets/spotline-on-founder.webp";

const pillars: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Rocket,
    title: "Beyond Traditional Accelerators",
    body: "Immersive, cohort-based experiences that go deeper than a typical startup programme."
  },
  {
    icon: Users,
    title: "A Collaborative Community",
    body: "Founders learn from seasoned experts and from each other, building lasting peer networks."
  },
  {
    icon: GraduationCap,
    title: "World-Leading Curriculum",
    body: "Developed with UCL, blending research, entrepreneurship, and real-world application."
  },
  {
    icon: BarChart3,
    title: "Evidence-Driven Decisions",
    body: "Every startup validates assumptions using empirical insights and structured research methods."
  },
  {
    icon: Globe,
    title: "Global Impact",
    body: "We prepare founders to scale solutions that make meaningful contributions to education worldwide."
  }
];

export default function MethodologySection() {
  const methodologies = [
    {
      step: 1,
      title: "Vision, Mission & Purpose",
      description: "When entering the world of entrepreneurship, we often hear the words Vision, Mission and Purpose. But what do they actually mean, how are they different and why are they important?"
    },
    {
      step: 2,
      title: "Business Modelling & Customer Development",
      description: "Our business modelling approach provides you with the tools to grow a sustainable education technology business by ensuring you have the best product-market fit."
    },
    {
      step: 3,
      title: "EdTech Research Methods & Ethics",
      description: "You will be given an overview of research methods in the learning sciences, in order to understand the best way to start proving and improving your product."
    },
    {
      step: 4,
      title: "Sustainable Funding",
      description: "You will hear about the funding journey of experienced edtech entrepreneurs to understand the options for you, while learning the ways a successful startup raises money."
    },
    {
      step: 5,
      title: "Pitching & Storytelling",
      description: "You'll learn how to successfully communicate with strong positioning and a clear narrative — whether pitching for investment, selling to clients, or presenting at an event."
    }
  ];

  return (
    <section id="methodology" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div data-reveal className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Proven Methodology</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We go beyond the typical accelerator. Every session is grounded in UCL research, designed to help you build a product that actually works — and proves it.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              data-reveal
              style={{ "--rd": `${index * 0.06}s` } as CSSProperties}
              className="flex items-start gap-4 p-5 rounded-xl bg-white border border-gray-200/70 shadow-sm motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center" aria-hidden="true">
                <pillar.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{pillar.title}</h3>
                <p className="text-sm text-gray-600">{pillar.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image + all 5 steps */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div data-reveal>
            <img
              src={spotline_on_founder}
              alt="Founder working in a collaborative learning session"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div data-reveal style={{ "--rd": "0.1s" } as CSSProperties} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">What you'll cover</h3>
            {methodologies.map((method) => (
              <div key={method.step} className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-sm">{method.step}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-1">{method.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
