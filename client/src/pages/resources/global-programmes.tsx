import { Link } from "wouter";
import ResourceLayout from "@/components/resource-layout";

const faq = [
  {
    question: "Which cities has UCL EdTech Labs run programmes in?",
    answer:
      "UCL EdTech Labs has run 6 cohorts in London, 5 in Paris, and 1 in Toronto — 12 cohorts in total — with a Dubai programme upcoming.",
  },
  {
    question: "Do I have to be based in the UK to join?",
    answer:
      "No. Cohorts have included startups from many countries, and recent London programmes run in a hybrid format that combines in-person sessions with remote delivery.",
  },
];

export default function GlobalProgrammes() {
  return (
    <ResourceLayout slug="global-programmes" faq={faq}>
      <p className="text-xl text-gray-600">
        UCL EdTech Labs runs accelerator programmes in four cities: London (6 cohorts),
        Paris (5 cohorts), Toronto (1 cohort), and an upcoming programme in Dubai. All
        programmes share the same evidence-driven methodology, adapted to each local
        education ecosystem.
      </p>

      <h2>London — the flagship programme</h2>
      <p>
        London is home to UCL EdTech Labs' flagship programme, run at University College
        London with six cohorts delivered to date. The most recent edition, the{" "}
        <Link href="/autumn-2025">Autumn 2025 cohort</Link>, focuses on AI-first education
        startups and runs October to January in a hybrid format, finishing during BETT week
        — the world's largest education technology exhibition, held in London each January.
        Founders work directly with UCL Institute of Education academics and AWS architects
        from the UCL Centre for Digital Innovation.
      </p>

      <h2>Paris — the European programme</h2>
      <p>
        UCL EdTech Labs has delivered five cohorts in Paris, working with French partners to
        support startups in the French and wider European EdTech ecosystems. Portfolio
        companies from the Paris programmes include Vittascience. See the{" "}
        <Link href="/paris">Paris programme page</Link> for current details.
      </p>

      <h2>Toronto — North America</h2>
      <p>
        One cohort has been delivered in Toronto, extending the programme's methodology to
        Canadian EdTech startups. Canadian portfolio companies include KnowledgeHook and
        Spendsafe.
      </p>

      <h2>Dubai — upcoming</h2>
      <p>
        A Dubai programme is in preparation, bringing the accelerator to the Middle East.{" "}
        <Link href="/#applications">Register interest</Link> to hear when it opens.
      </p>

      <h2>Is the programme the same in every city?</h2>
      <p>
        The core is identical everywhere: the evidence-driven curriculum described in{" "}
        <Link href="/resources/evidence-based-edtech">our methodology guide</Link>, covering
        vision and mission, business modelling, research methods and ethics, sustainable
        funding, and pitching. What changes is the local network — partners, mentors, and
        investors are drawn from each city's ecosystem, so startups build relationships in
        the market they're growing in.
      </p>

      <h2>Which programme should I apply to?</h2>
      <p>
        Apply to the programme in the market where you want to grow. If you're unsure,{" "}
        <Link href="/contact">contact the team</Link> — and read the{" "}
        <Link href="/resources/how-to-apply">application guide</Link> to understand the
        selection criteria, which are consistent across locations.
      </p>
    </ResourceLayout>
  );
}
