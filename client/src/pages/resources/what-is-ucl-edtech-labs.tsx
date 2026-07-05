import { Link } from "wouter";
import ResourceLayout from "@/components/resource-layout";

const faq = [
  {
    question: "Is UCL EdTech Labs part of University College London?",
    answer:
      "Yes. UCL EdTech Labs is an accelerator initiative at University College London. Its curriculum is developed with UCL, including the UCL Institute of Education, ranked world #1 in Education (QS World University Rankings 2025).",
  },
  {
    question: "What stage of startup does UCL EdTech Labs accept?",
    answer:
      "The programme looks for startups with early traction, a testable prototype, or a solid research foundation. Idea-stage teams can be considered in exceptional cases where there is a strong argument for inclusion.",
  },
  {
    question: "Does UCL EdTech Labs only accept AI startups?",
    answer:
      "Recent cohorts, such as the Autumn 2025 London programme, focus on AI-first education startups — products that use machine learning, natural language processing, or other AI as a core feature rather than an add-on.",
  },
];

export default function WhatIsUclEdtechLabs() {
  return (
    <ResourceLayout slug="what-is-ucl-edtech-labs" faq={faq}>
      <p className="text-xl text-gray-600">
        UCL EdTech Labs is University College London's evidence-driven accelerator for
        education technology startups. It runs immersive, cohort-based programmes — primarily
        in London and Paris — that teach founders to validate their products using research
        methods from the learning sciences. Since launching, it has supported more than 300
        startups across 12 cohorts.
      </p>

      <h2>What does UCL EdTech Labs do?</h2>
      <p>
        The core of UCL EdTech Labs is its accelerator programme: a structured pathway that
        takes education technology founders from vision and business modelling through
        research methods, funding strategy, and pitching. Unlike most startup accelerators,
        every session is grounded in UCL research, and the emphasis throughout is on
        building products that measurably improve learning — and proving it with evidence.
      </p>
      <p>The programme is built around five pillars:</p>
      <ul>
        <li>
          <strong>Beyond traditional accelerators</strong> — immersive, cohort-based
          experiences that go deeper than a typical startup programme.
        </li>
        <li>
          <strong>A collaborative community</strong> — founders learn from seasoned experts
          and from each other, building lasting peer networks.
        </li>
        <li>
          <strong>World-leading curriculum</strong> — developed with UCL, blending research,
          entrepreneurship, and real-world application.
        </li>
        <li>
          <strong>Evidence-driven decisions</strong> — every startup validates assumptions
          using empirical insights and structured research methods.
        </li>
        <li>
          <strong>Global impact</strong> — founders are prepared to scale solutions that make
          meaningful contributions to education worldwide.
        </li>
      </ul>

      <h2>Who is behind UCL EdTech Labs?</h2>
      <p>
        UCL EdTech Labs draws on the expertise of the UCL Institute of Education (IOE),
        ranked world #1 in Education for 12 consecutive years (QS World University Rankings
        2025). The IOE is home to the UCL Knowledge Lab, an interdisciplinary research lab
        focused on AI and education, and its researchers co-authored UNESCO's first global
        guidance on generative AI in education. Delivery partners include the UCL Centre for
        Digital Innovation powered by AWS, EdTech Impact, and Startup Labs Global.
      </p>

      <h2>What results has the programme achieved?</h2>
      <p>
        Startups that have been through UCL EdTech Labs programmes have collectively reached
        over 8 million learners, raised more than £37M in funding across 28+ investment
        rounds, and built a combined valuation exceeding £500M. Portfolio companies include
        iSchool, Chatterbox, Graffinity, Moi Panda, LinkyThinks, and Spendsafe. See the full{" "}
        <Link href="/resources/accelerator-outcomes">outcomes breakdown</Link> and{" "}
        <Link href="/resources/portfolio-success-stories">portfolio stories</Link>.
      </p>

      <h2>Where does the programme run?</h2>
      <p>
        UCL EdTech Labs has delivered 6 cohorts in London, 5 in Paris, and 1 in Toronto,
        with a Dubai programme upcoming. Read more about the{" "}
        <Link href="/resources/global-programmes">programme locations</Link>.
      </p>

      <h2>How do I get involved?</h2>
      <p>
        Startups apply when a call for applications opens (the Autumn 2025 London call ran
        1–19 September 2025). Between calls, you can{" "}
        <Link href="/#applications">register interest</Link> to be notified when the next
        cohort opens. To understand what the selection panel looks for, read{" "}
        <Link href="/resources/how-to-apply">our application guide</Link> — or start with{" "}
        <Link href="/resources/how-the-accelerator-works">
          how the accelerator programme works
        </Link>
        .
      </p>
    </ResourceLayout>
  );
}
