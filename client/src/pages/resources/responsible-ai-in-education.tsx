import { Link } from "wouter";
import ResourceLayout from "@/components/resource-layout";

const faq = [
  {
    question: "What does 'AI-first' mean in the UCL EdTech Labs selection criteria?",
    answer:
      "AI-first means your product uses machine learning, natural language processing, or other forms of artificial intelligence as a core feature — the product couldn't deliver its value without it — rather than as a marketing add-on.",
  },
  {
    question: "What is UNESCO's guidance on generative AI in education?",
    answer:
      "UNESCO published the first global guidance on generative AI in education, co-authored by researchers from the UCL Institute of Education. It sets out principles for the safe, equitable, and human-centred adoption of GenAI in teaching and learning.",
  },
  {
    question: "Do schools actually check AI products for these issues?",
    answer:
      "Increasingly, yes. UK schools are guided by the Department for Education and Ofsted — both advised by IOE experts — and procurement questionnaires now routinely cover data privacy, bias, and the role of teachers in AI-supported decisions.",
  },
];

export default function ResponsibleAiInEducation() {
  return (
    <ResourceLayout slug="responsible-ai-in-education" faq={faq}>
      <p className="text-xl text-gray-600">
        Responsible AI in education means building AI products that protect learner
        privacy, actively check for bias across learner groups, keep teachers in control of
        consequential decisions, and can demonstrate genuine educational impact. For EdTech
        startups, these aren't compliance chores — they're what schools, regulators, and
        serious investors now expect by default.
      </p>

      <h2>Why responsibility is a selection criterion, not a nice-to-have</h2>
      <p>
        UCL EdTech Labs explicitly selects for "research mindset and responsible
        development" — a commitment to evidence-based development and ethical
        considerations around privacy, bias, and educational impact. That reflects where
        the sector has moved: researchers at the UCL Institute of Education co-authored
        UNESCO's first global guidance on generative AI in education and regularly advise
        the OECD, Ofsted, and the UK Department for Education on the safe and effective use
        of AI in schools. The standards those bodies set flow directly into school
        procurement.
      </p>

      <h2>The four pillars of responsible AI in EdTech</h2>

      <h3>1. Privacy and data protection</h3>
      <p>
        Learner data — especially children's data — carries heightened legal and ethical
        obligations. Practical baseline: collect the minimum data your product needs, be
        explicit about what trains your models, keep learner data out of third-party model
        training unless contractually protected, and make consent understandable to
        parents, not just lawyers.
      </p>

      <h3>2. Bias and fairness</h3>
      <p>
        AI systems trained on historical data can perform differently across demographic
        groups, dialects, or prior-attainment levels — and in education those gaps compound
        over time. Responsible teams test model performance across learner groups, not just
        on average, and publish what they find. This is the same discipline as{" "}
        <Link href="/resources/measuring-learning-outcomes">
          measuring learning outcomes
        </Link>{" "}
        properly: the average hides the harm.
      </p>

      <h3>3. Human oversight</h3>
      <p>
        Consequential decisions — grading, placement, flagging a learner as struggling —
        should keep teachers in the loop with the ability to see, question, and override
        AI outputs. Products that position AI as the teacher's instrument, rather than
        their replacement, also sell better: teachers are the deployers who decide whether
        your product survives past the pilot.
      </p>

      <h3>4. Demonstrated educational impact</h3>
      <p>
        The most overlooked pillar: an AI feature that doesn't improve learning is a risk
        with no offsetting benefit. Responsible AI development means validating that the AI
        actually helps — through structured{" "}
        <Link href="/resources/running-edtech-pilots">pilots</Link> and honest{" "}
        <Link href="/resources/research-methods-for-edtech-founders">research methods</Link>.
      </p>

      <h2>How the accelerator supports AI-first startups</h2>
      <p>
        Stage 3 of the programme — the AIEd stream — is dedicated to cutting through AI
        hype: founders explore how AI plays out in real educational contexts, map the
        landscape with AWS architects from the UCL Centre for Digital Innovation, and leave
        with a deployment framework and a draft AI implementation plan. See{" "}
        <Link href="/resources/how-the-accelerator-works">
          how the accelerator programme works
        </Link>
        .
      </p>

      <h2>A practical checklist for founders</h2>
      <ul>
        <li>Map every data point you collect to a purpose; delete the rest</li>
        <li>Document how your models were trained and what data they saw</li>
        <li>Test outputs across learner groups before every major release</li>
        <li>Give teachers visibility and override on any consequential AI decision</li>
        <li>Run at least one structured pilot measuring learning impact, not just usage</li>
        <li>Write your safeguarding and data answers before procurement asks</li>
      </ul>
    </ResourceLayout>
  );
}
