import { Link } from "wouter";
import ResourceLayout from "@/components/resource-layout";

const faq = [
  {
    question: "Why does evidence matter in EdTech specifically?",
    answer:
      "Education buyers — schools, universities, and parents — increasingly demand proof that products improve learning before purchasing. Evidence also protects learners: an ineffective product costs students time they don't get back.",
  },
  {
    question: "Does evidence-based mean running randomised controlled trials?",
    answer:
      "No. Evidence-based development is a spectrum. Early-stage startups start with structured interviews, surveys, and small pilots, building towards more rigorous designs as the product and company mature.",
  },
];

export default function EvidenceBasedEdtech() {
  return (
    <ResourceLayout slug="evidence-based-edtech" faq={faq}>
      <p className="text-xl text-gray-600">
        Evidence-based EdTech means making product decisions — what to build, for whom, and
        how to measure success — based on empirical research rather than intuition. At UCL
        EdTech Labs, this is taught as a five-step methodology grounded in UCL research,
        covering vision, business modelling, research methods, funding, and pitching.
      </p>

      <h2>Why do most EdTech products fail to show impact?</h2>
      <p>
        Most education products are built on plausible intuitions: founders assume that if
        something feels engaging, learning follows. But learning science consistently shows
        that engagement and learning are not the same thing, and products that never test
        their assumptions rarely discover the gap until schools stop renewing. The
        alternative is to treat every major product assumption as a hypothesis and test it —
        the same discipline researchers apply, adapted to startup speed.
      </p>

      <h2>The five steps of the UCL EdTech Labs methodology</h2>

      <h3>1. Vision, Mission &amp; Purpose</h3>
      <p>
        Vision, mission, and purpose are often used interchangeably, but they answer
        different questions — where you're going, what you do, and why it matters. Getting
        them precise aligns the team and defines what "success" means before you try to
        measure it.
      </p>

      <h3>2. Business Modelling &amp; Customer Development</h3>
      <p>
        A sustainable education business needs genuine product-market fit. This step gives
        founders the tools to map customers and stakeholders — which in education often
        differ from users (a school buys, a teacher deploys, a student uses) — and validate
        that the model works for all of them.
      </p>

      <h3>3. EdTech Research Methods &amp; Ethics</h3>
      <p>
        Founders get an overview of research methods in the learning sciences to understand
        the best way to start proving and improving their product — along with the ethical
        obligations that come with researching real learners. This is the heart of the
        methodology; our{" "}
        <Link href="/resources/research-methods-for-edtech-founders">
          practical guide to research methods
        </Link>{" "}
        goes deeper.
      </p>

      <h3>4. Sustainable Funding</h3>
      <p>
        Founders hear the funding journeys of experienced EdTech entrepreneurs to understand
        their options — grants, revenue, angel and venture capital — and learn how successful
        startups actually raise money in this sector.
      </p>

      <h3>5. Pitching &amp; Storytelling</h3>
      <p>
        Evidence only creates value when it's communicated. The final step teaches founders
        to communicate with strong positioning and a clear narrative — whether pitching for
        investment, selling to clients, or presenting at an event.
      </p>

      <h2>What does evidence-based development look like in practice?</h2>
      <ul>
        <li>Every big product bet starts as a written, testable hypothesis</li>
        <li>
          Lean research instruments — surveys, interviews, usability tests — replace
          opinion-driven debates (see{" "}
          <Link href="/resources/research-methods-for-edtech-founders">research methods</Link>)
        </li>
        <li>
          Pilots with real learners are designed to produce credible findings, not just
          testimonials (see{" "}
          <Link href="/resources/running-edtech-pilots">running EdTech pilots</Link>)
        </li>
        <li>
          Success is defined by learning outcomes, not vanity metrics (see{" "}
          <Link href="/resources/measuring-learning-outcomes">measuring learning outcomes</Link>)
        </li>
      </ul>

      <h2>Does this approach actually pay off commercially?</h2>
      <p>
        Yes — evidence drives traction and revenue, not just academic credibility. Proof of
        impact shortens procurement conversations with schools, differentiates products in
        crowded markets, and gives investors metrics they can trust. Startups from UCL
        EdTech Labs' 12 cohorts have raised over £37M and reached 8 million learners; see{" "}
        <Link href="/resources/accelerator-outcomes">the full outcomes</Link>.
      </p>
    </ResourceLayout>
  );
}
