import { Link } from "wouter";
import ResourceLayout from "@/components/resource-layout";

const faq = [
  {
    question: "How long should an EdTech pilot run?",
    answer:
      "Long enough for the novelty effect to wear off and real usage patterns to emerge — typically a half-term to a full term (6–12 weeks) in schools. Shorter pilots measure excitement, not impact.",
  },
  {
    question: "Should pilots be free?",
    answer:
      "A free pilot is fine if it has a defined end date and a pre-agreed decision point. Open-ended free usage teaches the school your product is worth £0 and teaches you nothing about willingness to pay.",
  },
  {
    question: "What if the pilot results are negative?",
    answer:
      "Negative results are information — they tell you what to fix before scaling, and sharing them honestly builds enormous trust with schools. A startup that hides bad results eventually gets found out by a buyer who ran their own evaluation.",
  },
];

export default function RunningEdtechPilots() {
  return (
    <ResourceLayout slug="running-edtech-pilots" faq={faq}>
      <p className="text-xl text-gray-600">
        An EdTech pilot generates real evidence when it is designed like a study, not a
        free trial: a defined learner group, a pre-agreed outcome measure, a comparison
        point, and a fixed timeframe. Run this way, a single term in one school can produce
        findings credible enough to support procurement decisions and investor
        conversations.
      </p>

      <h2>Why most pilots produce nothing usable</h2>
      <p>
        The typical pilot is an open-ended free trial: a school agrees to "try" the
        product, some teachers use it, and three months later the startup has anecdotes and
        a testimonial but no evidence. The pilot fails at the design stage — nobody agreed
        what would be measured, against what baseline, or what result would count as
        success. Everything below is about fixing that before the pilot starts.
      </p>

      <h2>Step 1: Agree the question before the pilot starts</h2>
      <p>
        Write a one-page pilot plan with the school covering: which classes or learners
        take part, what outcome will be measured (see{" "}
        <Link href="/resources/measuring-learning-outcomes">
          measuring learning outcomes
        </Link>
        ), how long the pilot runs, and — critically — what happens at the end. A pilot with
        a pre-agreed decision point ("if X improves, we discuss a paid rollout") converts;
        a pilot without one drifts.
      </p>

      <h2>Step 2: Build in a comparison</h2>
      <p>
        Ask the school to identify a comparable class or year group not using the product,
        or use a staggered start where half the classes begin later. This is usually easy
        for schools to accommodate and transforms the credibility of your findings — you
        can now answer "compared to what?".
      </p>

      <h2>Step 3: Support the teachers, then get out of the way</h2>
      <ul>
        <li>Train teachers before the start, not during week three</li>
        <li>Check in weekly to fix blockers — usage failures are product findings too</li>
        <li>
          Resist the urge to intervene beyond what a paying customer would receive;
          otherwise you're measuring your support effort, not your product
        </li>
      </ul>

      <h2>Step 4: Collect data ethically</h2>
      <p>
        Pilots involve real learners, so research ethics apply: informed consent (via
        parents/guardians for minors), data minimisation, secure storage, and transparency
        with the school about how data will be used. Our{" "}
        <Link href="/resources/research-methods-for-edtech-founders">
          research methods guide
        </Link>{" "}
        covers this in detail — and for AI products there are additional obligations covered
        in{" "}
        <Link href="/resources/responsible-ai-in-education">
          responsible AI in education
        </Link>
        .
      </p>

      <h2>Step 5: Analyse honestly and share everything</h2>
      <p>
        Compare outcomes against the baseline you agreed, report gains and gaps, and check
        whether results hold across learner groups rather than just on average. Share the
        full findings with the school — including what didn't work. Schools talk to each
        other; a reputation for honest evidence is one of the strongest sales assets an
        EdTech startup can build.
      </p>

      <h2>Turning pilot evidence into growth</h2>
      <p>
        A well-run pilot produces three assets: outcome data for your next procurement
        conversation, impact metrics for investors, and a prioritised list of product
        improvements. Turning that evidence into a story that lands with partners and
        investors is Stage 4 of{" "}
        <Link href="/resources/how-the-accelerator-works">
          the UCL EdTech Labs accelerator
        </Link>{" "}
        — and it's how alumni have collectively raised{" "}
        <Link href="/resources/accelerator-outcomes">over £37M</Link>.
      </p>
    </ResourceLayout>
  );
}
