import { Link } from "wouter";
import ResourceLayout from "@/components/resource-layout";

const startups = [
  {
    name: "iSchool",
    description:
      "Interactive programming and AI education for 6–18-year-olds, delivered across online and offline settings.",
  },
  {
    name: "Chatterbox",
    description:
      "Online language training powered by refugees and marginalised professionals — impact-driven corporate learning combined with inclusive employment.",
  },
  {
    name: "Graffinity",
    description:
      "AI-supported knowledge maps that visualise students' thinking and aid formative assessment.",
  },
  {
    name: "Moi Panda",
    description:
      "A \"super-app\" combining social networking with learning missions for young children and parents.",
  },
  {
    name: "LinkyThinks",
    description:
      "Online English tutoring and creative resources supporting children's thinking skills.",
  },
  {
    name: "Spendsafe",
    description:
      "Canada's first Mastercard-backed financial education platform for ages 6–18, combining a secure prepaid card with real-time AI coaching and parent-child tools.",
  },
];

const faq = [
  {
    question: "How many startups are in the UCL EdTech Labs portfolio?",
    answer:
      "More than 300 startups have been through UCL EdTech Labs programmes across 12 cohorts in London, Paris, and Toronto.",
  },
  {
    question: "What sectors do UCL EdTech Labs startups work in?",
    answer:
      "The portfolio spans AI and programming education, language learning, formative assessment, early-years learning, tutoring, and financial literacy — for learners from early childhood through to professional education.",
  },
];

export default function PortfolioSuccessStories() {
  return (
    <ResourceLayout slug="portfolio-success-stories" faq={faq}>
      <p className="text-xl text-gray-600">
        More than 300 startups have been accelerated by UCL EdTech Labs, spanning AI
        education, language learning, formative assessment, and financial literacy.
        Together they have reached over 8 million learners and raised more than £37M.
        Here are some of the companies in the portfolio.
      </p>

      <h2>Featured portfolio companies</h2>
      {startups.map((s) => (
        <div key={s.name}>
          <h3>{s.name}</h3>
          <p>{s.description}</p>
        </div>
      ))}
      <p>
        Other portfolio companies include KnowledgeHook, Atom Learning, and Vittascience —
        spanning the London, Paris, and Toronto programmes.
      </p>

      <h2>What do these startups have in common?</h2>
      <p>
        Beyond education, the common thread is evidence. Every startup in the programme
        validates its assumptions using structured research methods — from user interviews
        to classroom pilots — and leaves with impact metrics that stand up to scrutiny from
        schools and investors alike. That approach is described in{" "}
        <Link href="/resources/evidence-based-edtech">
          what is evidence-based EdTech?
        </Link>
      </p>

      <h2>What does the portfolio look like in numbers?</h2>
      <p>
        300+ startups, 8M learners reached, £37M+ raised across 28+ investment rounds, and
        £500M+ in combined valuation. The full breakdown is in{" "}
        <Link href="/resources/accelerator-outcomes">
          UCL EdTech Labs outcomes: the results from 12 cohorts
        </Link>
        .
      </p>

      <h2>Could your startup be next?</h2>
      <p>
        If you're building an evidence-led education product — especially an AI-first one —
        read <Link href="/resources/how-to-apply">how to apply</Link> or{" "}
        <Link href="/#applications">register interest</Link> for the next cohort.
      </p>
    </ResourceLayout>
  );
}
