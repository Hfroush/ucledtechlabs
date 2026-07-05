import { Link } from "wouter";
import ResourceLayout from "@/components/resource-layout";

const faq = [
  {
    question: "How long is the UCL EdTech Labs accelerator?",
    answer:
      "The most recent London programme runs for roughly five months from application to showcase: applications in September, programme delivery October to January, finishing with a final day during BETT week in January.",
  },
  {
    question: "Is the programme in-person or remote?",
    answer:
      "The Autumn 2025 London programme runs in a hybrid format — in-person sessions in London combined with remote delivery.",
  },
  {
    question: "What do startups have at the end of the programme?",
    answer:
      "By the final stage, startups leave with a sharp logic model, a live research plan and research library, an AI deployment framework, an investor-ready pitch deck, and impact metrics that matter to buyers and investors.",
  },
];

export default function HowTheAcceleratorWorks() {
  return (
    <ResourceLayout slug="how-the-accelerator-works" faq={faq}>
      <p className="text-xl text-gray-600">
        The UCL EdTech Labs accelerator is a five-month, cohort-based programme that takes
        education technology startups through four stages: setting the foundations, learning
        the research method, an AI in education stream, and applying the method to build an
        investor-ready story. It combines UCL's research expertise with practical startup
        coaching, delivered in London in a hybrid format.
      </p>

      <h2>What are the four stages of the programme?</h2>

      <h3>Stage 1 — Setting the Foundations</h3>
      <p>
        The programme starts with clarity: who do you serve, why does it matter, and how
        will you measure success? Founders map their users and stakeholders with precision
        and pressure-test their assumptions before those assumptions become expensive.
        Startups leave this stage with a sharp logic model, a focused mission, and the tools
        to align their team and story.
      </p>

      <h3>Stage 2 — The Research Method</h3>
      <p>
        The heart of the programme is a repeatable system for testing ideas and gathering
        insights, so decisions are powered by evidence rather than guesswork. Founders learn
        practical research methods without the jargon, and build lean surveys, interviews,
        and tests that convert into real answers. Startups leave with a research library, a
        live research plan, and the confidence to validate any big bet. For a deeper look,
        see our guide to{" "}
        <Link href="/resources/research-methods-for-edtech-founders">
          research methods for EdTech founders
        </Link>
        .
      </p>

      <h3>Stage 3 — The AIEd Stream</h3>
      <p>
        The AI in education stream cuts through the AI hype. Founders explore how AI plays
        out in real educational contexts and map the technology landscape with AWS
        architects from the UCL Centre for Digital Innovation. Startups leave with a
        deployment framework, a bank of real use cases, and a draft AI implementation plan.
        Related reading:{" "}
        <Link href="/resources/responsible-ai-in-education">
          responsible AI in education
        </Link>
        .
      </p>

      <h3>Stage 4 — Applying the Method</h3>
      <p>
        The final stage turns validation into a story investors can't ignore. Founders shape
        a sales narrative that lands with partners and investors, and finish with funding
        insights they can act on immediately. Startups leave with an investor-ready pitch
        deck, impact metrics that matter, and a clear growth path.
      </p>

      <h2>What does the timeline look like?</h2>
      <p>Using the Autumn 2025 London cohort as the model:</p>
      <ul>
        <li><strong>September</strong> — call for applications opens (1–19 September)</li>
        <li><strong>October</strong> — kick-off and Stage 1: Foundations</li>
        <li><strong>November</strong> — Stage 2: Research Method, plus the AI 101 stream</li>
        <li><strong>December</strong> — Stage 4: Applying the Method</li>
        <li><strong>January</strong> — final day and showcase, timed with BETT week</li>
      </ul>

      <h2>Who delivers the programme?</h2>
      <p>
        Sessions are delivered by UCL academics, product leaders, and experienced operators,
        with four delivery partners: the UCL Institute of Education (world #1 in Education,
        QS 2025), the UCL Centre for Digital Innovation powered by AWS, EdTech Impact, and
        Startup Labs Global.
      </p>

      <h2>How is this different from other accelerators?</h2>
      <p>
        Most accelerators focus on fundraising mechanics and demo days. UCL EdTech Labs is
        built around a different premise: in education, the products that win long-term are
        the ones that can prove they work. The programme's methodology — described in{" "}
        <Link href="/resources/evidence-based-edtech">
          what is evidence-based EdTech?
        </Link>{" "}
        — treats research evidence as a growth asset that drives traction, procurement
        decisions, and investment.
      </p>

      <h2>How do I join the next cohort?</h2>
      <p>
        Read the <Link href="/resources/how-to-apply">application guide</Link>, check the{" "}
        <Link href="/resources/ucl-edtech-labs-faq">FAQ</Link>, and{" "}
        <Link href="/#applications">register interest</Link> to be notified when the next
        call opens.
      </p>
    </ResourceLayout>
  );
}
