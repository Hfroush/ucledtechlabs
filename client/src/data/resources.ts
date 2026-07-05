export type ResourceCategory =
  | "Accelerator Programme"
  | "Research & Methodology"
  | "Outcomes & Impact";

export interface ResourceMeta {
  slug: string;
  title: string;
  description: string;
  category: ResourceCategory;
  datePublished: string;
  readingTime: string;
}

export const resources: ResourceMeta[] = [
  // Accelerator Programme
  {
    slug: "what-is-ucl-edtech-labs",
    title: "What Is UCL EdTech Labs?",
    description:
      "UCL EdTech Labs is University College London's evidence-driven accelerator for education technology startups. Learn what it is, who it's for, and how it works.",
    category: "Accelerator Programme",
    datePublished: "2026-07-05",
    readingTime: "5 min read",
  },
  {
    slug: "how-the-accelerator-works",
    title: "How the UCL EdTech Labs Accelerator Programme Works",
    description:
      "A stage-by-stage guide to the UCL EdTech Labs accelerator: foundations, research methods, the AI in education stream, and investor readiness over a five-month programme.",
    category: "Accelerator Programme",
    datePublished: "2026-07-05",
    readingTime: "7 min read",
  },
  {
    slug: "how-to-apply",
    title: "How to Apply to UCL EdTech Labs: Application Guide",
    description:
      "What the UCL EdTech Labs application involves, the four selection criteria we assess, and practical tips for submitting a strong application.",
    category: "Accelerator Programme",
    datePublished: "2026-07-05",
    readingTime: "6 min read",
  },
  {
    slug: "global-programmes",
    title: "UCL EdTech Labs Programmes: London, Paris, Toronto, and Dubai",
    description:
      "Where UCL EdTech Labs runs its accelerator programmes — 6 cohorts in London, 5 in Paris, 1 in Toronto, and an upcoming Dubai programme.",
    category: "Accelerator Programme",
    datePublished: "2026-07-05",
    readingTime: "4 min read",
  },
  {
    slug: "ucl-edtech-labs-faq",
    title: "UCL EdTech Labs: Frequently Asked Questions",
    description:
      "Answers to the most common questions about the UCL EdTech Labs accelerator — eligibility, cost, format, selection criteria, and what startups get out of it.",
    category: "Accelerator Programme",
    datePublished: "2026-07-05",
    readingTime: "6 min read",
  },
  // Research & Methodology
  {
    slug: "evidence-based-edtech",
    title: "What Is Evidence-Based EdTech? Our Methodology Explained",
    description:
      "Evidence-based EdTech means validating product decisions with empirical research rather than intuition. Here is the five-step methodology UCL EdTech Labs teaches founders.",
    category: "Research & Methodology",
    datePublished: "2026-07-05",
    readingTime: "7 min read",
  },
  {
    slug: "research-methods-for-edtech-founders",
    title: "Research Methods for EdTech Founders: A Practical Guide",
    description:
      "How EdTech founders can use surveys, interviews, and structured tests from the learning sciences to validate their products — without a research degree.",
    category: "Research & Methodology",
    datePublished: "2026-07-05",
    readingTime: "8 min read",
  },
  {
    slug: "measuring-learning-outcomes",
    title: "How to Measure Learning Outcomes in EdTech Products",
    description:
      "The metrics that matter for EdTech products: learning outcomes, engagement, and impact measures that convince schools, buyers, and investors.",
    category: "Research & Methodology",
    datePublished: "2026-07-05",
    readingTime: "7 min read",
  },
  {
    slug: "running-edtech-pilots",
    title: "How to Run an EdTech Pilot That Generates Real Evidence",
    description:
      "A step-by-step guide to designing and running pilots with schools and learners that produce credible evidence of your product's impact.",
    category: "Research & Methodology",
    datePublished: "2026-07-05",
    readingTime: "8 min read",
  },
  {
    slug: "responsible-ai-in-education",
    title: "Responsible AI in Education: What EdTech Startups Need to Know",
    description:
      "How AI-first EdTech startups should handle privacy, bias, and educational impact — informed by UCL Institute of Education's work on UNESCO's global GenAI guidance.",
    category: "Research & Methodology",
    datePublished: "2026-07-05",
    readingTime: "7 min read",
  },
  // Outcomes & Impact
  {
    slug: "accelerator-outcomes",
    title: "UCL EdTech Labs Outcomes: The Results from 12 Cohorts",
    description:
      "The measurable outcomes of the UCL EdTech Labs accelerator: 300+ startups supported, 8M learners reached, £37M+ raised, and £500M+ in combined valuation.",
    category: "Outcomes & Impact",
    datePublished: "2026-07-05",
    readingTime: "5 min read",
  },
  {
    slug: "portfolio-success-stories",
    title: "EdTech Startups Accelerated by UCL EdTech Labs",
    description:
      "Meet the portfolio: iSchool, Chatterbox, Graffinity, Moi Panda, LinkyThinks, Spendsafe, and other startups that have been through UCL EdTech Labs programmes.",
    category: "Outcomes & Impact",
    datePublished: "2026-07-05",
    readingTime: "5 min read",
  },
];

export function getResource(slug: string): ResourceMeta {
  const resource = resources.find((r) => r.slug === slug);
  if (!resource) {
    throw new Error(`Unknown resource slug: ${slug}`);
  }
  return resource;
}

export function getRelated(slug: string, count = 3): ResourceMeta[] {
  const current = getResource(slug);
  const sameCategory = resources.filter(
    (r) => r.slug !== slug && r.category === current.category
  );
  const others = resources.filter(
    (r) => r.slug !== slug && r.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, count);
}
