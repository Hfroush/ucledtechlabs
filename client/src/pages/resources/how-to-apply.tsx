import { Link } from "wouter";
import ResourceLayout from "@/components/resource-layout";

const faq = [
  {
    question: "When do applications open?",
    answer:
      "Applications open when a new cohort is announced. For the Autumn 2025 London programme, the call ran from 1 to 19 September 2025. Register interest on the homepage to be notified when the next call opens.",
  },
  {
    question: "Can I save my application and finish it later?",
    answer:
      "Yes. The application form supports saving a draft, so you can return and complete it before the deadline.",
  },
  {
    question: "Do I need existing revenue to apply?",
    answer:
      "No. The selection panel looks for traction, a testable prototype, or a solid research foundation — revenue is one form of traction but not a requirement.",
  },
];

export default function HowToApply() {
  return (
    <ResourceLayout slug="how-to-apply" faq={faq}>
      <p className="text-xl text-gray-600">
        Applying to UCL EdTech Labs involves a four-step online application covering your
        company, founding team, product, and evidence base. Applications are assessed
        against four criteria: an AI-first product approach, traction or a testable
        prototype or research foundation, a research mindset with responsible development,
        and team capacity to execute during the programme.
      </p>

      <h2>What does the application involve?</h2>
      <p>
        The application is a multi-step online form on this site (available at{" "}
        <Link href="/apply">ucledtechlabs.com/apply</Link> when a call is open). Expect to
        provide:
      </p>
      <ul>
        <li>Company basics — name, website, location, and stage</li>
        <li>Founder and team details</li>
        <li>Your EdTech domain, product description, and how AI features in it</li>
        <li>Traction indicators such as users, pilots, or revenue</li>
        <li>Research evidence supporting your approach, with optional file uploads</li>
        <li>A pitch deck, if you have one</li>
      </ul>
      <p>
        You can save a draft and return to it, and the form is designed to meet WCAG 2.1 AA
        accessibility standards.
      </p>

      <h2>What are the selection criteria?</h2>
      <p>The selection panel assesses four things:</p>
      <ol>
        <li>
          <strong>AI-first product approach.</strong> Your product uses machine learning,
          natural language processing, or other forms of artificial intelligence as a core
          feature — not just an add-on.
        </li>
        <li>
          <strong>Traction, testable prototype, or research foundation.</strong> You have
          early users, a working prototype, or solid research backing your approach.
          Exceptions are possible but require a strong case.
        </li>
        <li>
          <strong>Research mindset and responsible development.</strong> You're committed to
          evidence-based development and to ethical considerations around privacy, bias,
          and educational impact.
        </li>
        <li>
          <strong>Team capacity to execute.</strong> You have the technical skills and time
          commitment to make meaningful progress during the programme.
        </li>
      </ol>

      <h2>How can I make my application stronger?</h2>
      <ul>
        <li>
          <strong>Be specific about the learning problem.</strong> Applications that name a
          precise learner group and a measurable problem stand out over generic "education
          is broken" framing.
        </li>
        <li>
          <strong>Show your evidence, however early.</strong> A small pilot, structured user
          interviews, or relevant published research all count. The programme exists to
          strengthen your evidence — you don't need a finished efficacy study. See{" "}
          <Link href="/resources/running-edtech-pilots">how to run an EdTech pilot</Link>.
        </li>
        <li>
          <strong>Explain why AI is core, not cosmetic.</strong> Describe what your product
          could not do without AI, and how you handle the risks — our guide to{" "}
          <Link href="/resources/responsible-ai-in-education">responsible AI in education</Link>{" "}
          covers what reviewers care about.
        </li>
        <li>
          <strong>Be honest about team bandwidth.</strong> The programme is immersive;
          panels favour teams that can commit the time over teams with impressive CVs but
          no availability.
        </li>
      </ul>

      <h2>What happens after I apply?</h2>
      <p>
        Applications are reviewed after the call closes, and selected startups are invited
        to join the cohort starting the following month — for the Autumn 2025 cohort,
        applications closed 19 September and the programme kicked off in October. The
        programme then runs for around four months; see{" "}
        <Link href="/resources/how-the-accelerator-works">
          how the accelerator programme works
        </Link>{" "}
        for the stage-by-stage breakdown.
      </p>

      <h2>What if applications are closed right now?</h2>
      <p>
        <Link href="/#applications">Register your interest</Link> and you'll be contacted
        when the next call opens. If you have questions in the meantime,{" "}
        <Link href="/contact">contact the team</Link> or check the{" "}
        <Link href="/resources/ucl-edtech-labs-faq">FAQ</Link>.
      </p>
    </ResourceLayout>
  );
}
