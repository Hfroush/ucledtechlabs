import { Link } from "wouter";
import ResourceLayout from "@/components/resource-layout";

const faq = [
  {
    question: "How many startups has UCL EdTech Labs supported?",
    answer:
      "More than 300 startups across 12 cohorts — 6 in London, 5 in Paris, and 1 in Toronto.",
  },
  {
    question: "How much funding have UCL EdTech Labs startups raised?",
    answer:
      "Alumni startups have raised more than £37M across 28+ investment rounds, with a combined valuation exceeding £500M.",
  },
  {
    question: "How many learners have portfolio startups reached?",
    answer:
      "Startups that have been through UCL EdTech Labs programmes have collectively reached over 8 million learners worldwide.",
  },
];

export default function AcceleratorOutcomes() {
  return (
    <ResourceLayout slug="accelerator-outcomes" faq={faq}>
      <p className="text-xl text-gray-600">
        Across 12 cohorts, UCL EdTech Labs has accelerated more than 300 education
        technology startups. Those companies have collectively reached over 8 million
        learners, raised more than £37M in funding across 28+ investment rounds, and built
        a combined valuation exceeding £500M.
      </p>

      <h2>The numbers at a glance</h2>
      <ul>
        <li><strong>300+</strong> startups accelerated</li>
        <li><strong>12</strong> cohorts delivered (London 6, Paris 5, Toronto 1)</li>
        <li><strong>8M</strong> learners impacted by portfolio products</li>
        <li><strong>£500M+</strong> total startup valuation</li>
        <li><strong>£37M+</strong> funding raised by alumni</li>
        <li><strong>28+</strong> investment rounds closed</li>
      </ul>

      <h2>What do these outcomes mean?</h2>

      <h3>Learner reach: the impact measure</h3>
      <p>
        Eight million learners is the outcome the programme is ultimately designed for. The
        methodology pushes startups to build products that measurably improve learning —
        reach at this scale means evidence-based products finding their way into real
        classrooms and homes across multiple countries. How startups get there is covered
        in{" "}
        <Link href="/resources/measuring-learning-outcomes">
          measuring learning outcomes
        </Link>
        .
      </p>

      <h3>Funding and valuation: the commercial measure</h3>
      <p>
        £37M+ raised across 28+ rounds, and £500M+ in combined valuation, reflect the
        programme's core thesis: evidence drives traction and revenue. Startups leave the
        programme with validated impact metrics and investor-ready narratives — Stage 4 of{" "}
        <Link href="/resources/how-the-accelerator-works">the programme</Link> is dedicated
        to exactly this.
      </p>

      <h3>Cohort scale: the consistency measure</h3>
      <p>
        Twelve cohorts across three cities — with Dubai upcoming — show the model repeats
        beyond a single ecosystem. Each city keeps the same evidence-driven curriculum
        while plugging startups into a local network of mentors, partners, and investors.
        See{" "}
        <Link href="/resources/global-programmes">
          where UCL EdTech Labs runs its programmes
        </Link>
        .
      </p>

      <h2>Which startups are behind these numbers?</h2>
      <p>
        Portfolio companies include iSchool, Chatterbox, Graffinity, Moi Panda, LinkyThinks,
        Spendsafe, KnowledgeHook, Atom Learning, and Vittascience — spanning AI education,
        language learning, formative assessment, and financial literacy. Meet them in{" "}
        <Link href="/resources/portfolio-success-stories">
          EdTech startups accelerated by UCL EdTech Labs
        </Link>
        .
      </p>

      <h2>Want to be part of the next cohort?</h2>
      <p>
        Read <Link href="/resources/how-to-apply">how to apply</Link> and{" "}
        <Link href="/#applications">register interest</Link> to hear when applications
        open.
      </p>
    </ResourceLayout>
  );
}
