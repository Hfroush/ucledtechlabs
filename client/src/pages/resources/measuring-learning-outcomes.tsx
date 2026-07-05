import { Link } from "wouter";
import ResourceLayout from "@/components/resource-layout";

const faq = [
  {
    question: "What is the difference between engagement and learning outcomes?",
    answer:
      "Engagement measures whether people use the product (time on task, sessions, completion). Learning outcomes measure whether users know or can do more as a result. A product can score highly on engagement while teaching nothing — which is why buyers increasingly ask for outcome evidence.",
  },
  {
    question: "What outcome evidence do school buyers actually ask for?",
    answer:
      "Typically: evidence of learning gains in a context similar to theirs, independent reviews or certifications (such as EdTech Impact), and safeguarding/data-privacy compliance. The stronger the evidence, the shorter the procurement conversation.",
  },
];

export default function MeasuringLearningOutcomes() {
  return (
    <ResourceLayout slug="measuring-learning-outcomes" faq={faq}>
      <p className="text-xl text-gray-600">
        To measure learning outcomes in an EdTech product, define the specific knowledge or
        skill your product improves, measure it before and after use with a consistent
        instrument, and separate genuine learning gains from engagement metrics like time on
        task. Outcome evidence — not usage data — is what convinces schools, buyers, and
        investors.
      </p>

      <h2>Why engagement metrics aren't enough</h2>
      <p>
        Daily active users, session length, and completion rates tell you people use your
        product; they don't tell you anyone learned anything. Education buyers know this. A
        procurement lead comparing two products will discount "students love it" in favour
        of "students improved by X on this measure". Engagement metrics still matter — no
        one learns from a product they abandon — but they're a precondition for impact, not
        proof of it.
      </p>

      <h2>Step 1: Define the outcome precisely</h2>
      <p>
        "Improves maths" is not measurable; "improves fluency in single-digit
        multiplication for Year 3 pupils" is. A good outcome definition names the learner
        group, the specific skill or knowledge, and the timeframe. This is the logic-model
        work UCL EdTech Labs founders do in Stage 1 of{" "}
        <Link href="/resources/how-the-accelerator-works">the accelerator</Link>: getting
        crystal clear on who you serve and how you'll measure success.
      </p>

      <h2>Step 2: Choose a credible measure</h2>
      <ul>
        <li>
          <strong>Existing validated assessments</strong> — standardised tests or published
          instruments are most credible because no one suspects you designed them to
          flatter your product
        </li>
        <li>
          <strong>Curriculum-aligned tasks</strong> — teacher-marked work aligned to the
          curriculum, marked consistently before and after
        </li>
        <li>
          <strong>In-product measures</strong> — useful for rapid iteration, but treat them
          as internal signals unless they're validated against external measures
        </li>
      </ul>

      <h2>Step 3: Compare against something</h2>
      <p>
        A before/after gain means little on its own — students improve over a term anyway.
        Credibility comes from comparison: a comparable class not using the product, a
        waitlist group that starts later, or published norms for expected progress. You
        don't need a full randomised trial to start; you need an honest answer to "compared
        to what?". Our guide to{" "}
        <Link href="/resources/running-edtech-pilots">running EdTech pilots</Link> covers
        how to structure this in a real school.
      </p>

      <h2>Step 4: Report the metrics that matter to each audience</h2>
      <ul>
        <li>
          <strong>Schools and teachers</strong> care about learning gains, time saved, and
          fit with their curriculum and safeguarding requirements
        </li>
        <li>
          <strong>Investors</strong> care about impact metrics tied to growth — retention
          driven by results, procurement wins driven by evidence
        </li>
        <li>
          <strong>Your own team</strong> needs leading indicators: which features correlate
          with the outcome gains you've validated
        </li>
      </ul>
      <p>
        Turning validated outcomes into an investor-ready story is exactly what Stage 4 of
        the accelerator covers — impact metrics that matter, wrapped in a narrative that
        lands. Independent frameworks help too: UCL EdTech Labs' delivery partner EdTech
        Impact provides independent reviews that help schools compare and trust products.
      </p>

      <h2>Common pitfalls</h2>
      <ul>
        <li>Claiming causation from correlation ("our users score higher" — did stronger students self-select?)</li>
        <li>Measuring immediately after use only — learning that doesn't persist isn't learning</li>
        <li>Reporting only the average — check whether gains hold across learner groups</li>
        <li>Changing the measure between studies so results can't be compared</li>
      </ul>
      <p>
        For the foundations behind all of this, start with{" "}
        <Link href="/resources/evidence-based-edtech">what is evidence-based EdTech?</Link>
      </p>
    </ResourceLayout>
  );
}
