import { Link } from "wouter";
import ResourceLayout from "@/components/resource-layout";

const faq = [
  {
    question: "Do I need a research background to use these methods?",
    answer:
      "No. The methods here are deliberately lean versions of learning-science techniques. The key is structure: written hypotheses, consistent questions, and honest analysis — not academic credentials.",
  },
  {
    question: "How many user interviews are enough?",
    answer:
      "For qualitative discovery, patterns typically stabilise after 5–8 interviews per user segment. If the last two interviews taught you nothing new, you have enough to act on.",
  },
  {
    question: "What ethical rules apply when researching learners?",
    answer:
      "Get informed consent (from parents or guardians for minors), collect only the data you need, store it securely, and be transparent about how it will be used. Research involving children carries heightened obligations around safeguarding and privacy.",
  },
];

export default function ResearchMethodsForEdtechFounders() {
  return (
    <ResourceLayout slug="research-methods-for-edtech-founders" faq={faq}>
      <p className="text-xl text-gray-600">
        EdTech founders don't need a PhD to do credible research. They need three lean
        methods used well: structured interviews to discover problems, surveys to size
        them, and small tests to check that the product actually helps. This guide covers
        how to use each — and the ethics that apply when your users are learners.
      </p>

      <h2>Start with a hypothesis, not a method</h2>
      <p>
        The most common research mistake founders make is starting with a tool ("let's send
        a survey") instead of a question. Write down the assumption your product depends on
        — "teachers will use this weekly", "students improve faster with feature X" — and
        pick the cheapest method that could prove it wrong. A research plan is just a list
        of your riskiest assumptions, each paired with a test.
      </p>

      <h2>Method 1: Structured interviews — for discovering problems</h2>
      <p>
        Interviews are the fastest way to understand how learners, teachers, and buyers
        actually experience the problem you're solving. To make them count:
      </p>
      <ul>
        <li>Ask about past behaviour ("walk me through the last time…"), not predictions ("would you use…")</li>
        <li>Use the same core questions across interviews so answers are comparable</li>
        <li>Interview each stakeholder group separately — in education, the buyer (school leader), deployer (teacher), and user (student) see different problems</li>
        <li>Record and summarise each interview the same day, tagging recurring themes</li>
      </ul>

      <h2>Method 2: Lean surveys — for sizing what you found</h2>
      <p>
        Once interviews surface a pattern, a short survey tells you how widespread it is.
        Keep surveys under ten questions, lead with the behavioural questions (not
        demographics), and pilot the survey on two or three people first to catch confusing
        wording. A survey that converts into answers is one where every question maps to a
        decision you'll make differently depending on the result.
      </p>

      <h2>Method 3: Small structured tests — for checking the product works</h2>
      <p>
        Usability tests, A/B comparisons, and short classroom pilots test whether the
        product delivers. The discipline that separates evidence from anecdote is deciding{" "}
        <em>before</em> the test what outcome you'll measure and what result would count as
        failure. For pilots with schools, see the dedicated guide to{" "}
        <Link href="/resources/running-edtech-pilots">
          running EdTech pilots that generate real evidence
        </Link>
        .
      </p>

      <h2>Research ethics: non-negotiable in education</h2>
      <p>
        Research with learners — especially children — carries obligations that consumer
        startups can ignore but EdTech startups cannot:
      </p>
      <ul>
        <li><strong>Informed consent</strong> — participants (and parents/guardians for minors) must understand what data you collect and why</li>
        <li><strong>Data minimisation</strong> — collect only what your research question needs, and store it securely</li>
        <li><strong>Transparency with schools</strong> — teachers and school leaders should see findings, including unflattering ones</li>
        <li><strong>Fairness</strong> — check that your product works across learner groups, not just the average (this matters doubly for AI products; see <Link href="/resources/responsible-ai-in-education">responsible AI in education</Link>)</li>
      </ul>
      <p>
        Handled well, ethics is a commercial asset: schools trust — and buy from — companies
        that treat their students' data with visible care.
      </p>

      <h2>How UCL EdTech Labs teaches this</h2>
      <p>
        Research methods are Stage 2 of the accelerator — founders learn practical methods
        without the jargon and build lean surveys, interviews, and tests that convert into
        answers, leaving with a research library and a live research plan. See{" "}
        <Link href="/resources/how-the-accelerator-works">
          how the accelerator programme works
        </Link>{" "}
        and the broader{" "}
        <Link href="/resources/evidence-based-edtech">evidence-based methodology</Link>.
      </p>
    </ResourceLayout>
  );
}
