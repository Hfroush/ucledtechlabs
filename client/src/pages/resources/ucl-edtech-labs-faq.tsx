import { Link } from "wouter";
import ResourceLayout from "@/components/resource-layout";

const faq = [
  {
    question: "What is UCL EdTech Labs?",
    answer:
      "UCL EdTech Labs is University College London's evidence-driven accelerator for education technology startups. It has supported 300+ startups across 12 cohorts in London, Paris, and Toronto.",
  },
  {
    question: "Who can apply to the accelerator?",
    answer:
      "Education technology startups with early traction, a testable prototype, or a solid research foundation. Recent cohorts focus on AI-first products, where AI is a core feature rather than an add-on.",
  },
  {
    question: "How long does the programme last?",
    answer:
      "Around five months from application to showcase. The Autumn 2025 London cohort opened applications in September, ran October to January, and finished with a final day during BETT week.",
  },
  {
    question: "Is the programme in-person or online?",
    answer:
      "The recent London programme runs in a hybrid format: in-person sessions at UCL in London combined with remote delivery, so international founders can take part.",
  },
  {
    question: "What will my startup get out of the programme?",
    answer:
      "A validated logic model, a live research plan, an AI deployment framework, an investor-ready pitch deck, and impact metrics — plus access to UCL academics, AWS architects, and an international founder network.",
  },
  {
    question: "What are the selection criteria?",
    answer:
      "Four criteria: an AI-first product approach; traction, a testable prototype, or a research foundation; a research mindset and commitment to responsible development; and team capacity to execute during the programme.",
  },
  {
    question: "Who delivers the sessions?",
    answer:
      "UCL academics, product leaders, and experienced operators, with delivery partners including the UCL Institute of Education, the UCL Centre for Digital Innovation powered by AWS, EdTech Impact, and Startup Labs Global.",
  },
  {
    question: "What results have previous startups achieved?",
    answer:
      "Alumni have collectively reached 8 million learners, raised over £37M across 28+ investment rounds, and built a combined valuation exceeding £500M. Portfolio companies include iSchool, Chatterbox, Graffinity, and Atom Learning.",
  },
  {
    question: "Where do the programmes run?",
    answer:
      "London (6 cohorts), Paris (5 cohorts), and Toronto (1 cohort), with a Dubai programme upcoming.",
  },
  {
    question: "How do I apply?",
    answer:
      "Apply through the application form on ucledtechlabs.com when a call is open. Between calls, register your interest on the homepage to be notified when the next cohort opens.",
  },
  {
    question: "How do I contact UCL EdTech Labs?",
    answer:
      "Email info@ucledtechlabs.com, use the contact form on the website, or reach out via LinkedIn. The team typically responds within one business day.",
  },
];

export default function UclEdtechLabsFaq() {
  return (
    <ResourceLayout slug="ucl-edtech-labs-faq" faq={faq}>
      <p className="text-xl text-gray-600">
        Everything founders most often ask about the UCL EdTech Labs accelerator, in one
        place — eligibility, format, selection criteria, outcomes, and how to apply. If your
        question isn't answered below, <Link href="/contact">contact the team</Link>{" "}
        directly.
      </p>
      <p>
        For deeper dives, see the full guides on{" "}
        <Link href="/resources/how-the-accelerator-works">how the programme works</Link>,{" "}
        <Link href="/resources/how-to-apply">how to apply</Link>, and{" "}
        <Link href="/resources/accelerator-outcomes">the outcomes from 12 cohorts</Link>.
      </p>
    </ResourceLayout>
  );
}
