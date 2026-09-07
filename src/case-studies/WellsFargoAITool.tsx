import CaseStudyLayout, { type CSSection } from '../components/CaseStudyLayout';
import WFCodeDiscovery from './wells-fargo-ai/WFCodeDiscovery';

const serifP: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 300,
  fontSize: 18,
  lineHeight: 1.65,
  color: 'var(--secondary)',
  margin: '16px 0 0 0',
  maxWidth: '65ch',
};

const h3: React.CSSProperties = { fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', margin: '26px 0 0 0' };
const p10: React.CSSProperties = { ...serifP, margin: '10px 0 0 0' };
const mono15: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: 15 };

const sections: CSSection[] = [
  {
    id: 'ai-01',
    number: '01',
    title: 'Frame',
    heading: 'A research problem that looked like a search problem',
    body: (
      <>
        <p style={serifP}>
          The tool's job is simple to state: let a PM ask a question about the bank's systems and get back something
          they can act on — scope a piece of work, answer an engineer, or brief a room — without reading the
          codebase or booking someone who has.
        </p>
        <p style={serifP}>
          What shipped is a discovery surface with four ways in — a quick lookup, a detailed search, an API spec
          view, and a generated mindmap — sitting over an index of the bank's repositories.
        </p>
      </>
    ),
  },
  {
    id: 'ai-02',
    number: '02',
    title: 'The brief',
    heading: 'What was asked for',
    body: (
      <>
        <p style={serifP}>
          PMs were blocked on engineers. Any question that touched implementation — does this already exist, which
          service owns it, what would it take — went into a queue or a Slack thread, and the alternative was hours
          of reading documentation that was either out of date or written for a different reader. The ask was to
          give PMs a way to answer these questions themselves.
        </p>
        <p style={serifP}>Stated that way, it reads like a search box over the repositories.</p>
      </>
    ),
  },
  {
    id: 'ai-03',
    number: '03',
    title: 'The reframe',
    heading: 'What the problem actually was',
    tinted: true,
    body: (
      <>
        <p style={{ ...serifP, margin: 0, maxWidth: '62ch' }}>
          PMs weren't short of information. The documentation existed — that was the problem. There was too much of
          it, written by engineers for engineers, and no way to tell which parts were still true. Hours of research
          produced a tentative answer the PM still wouldn't say out loud in front of engineering.
        </p>
        <p style={{ ...serifP, maxWidth: '62ch' }}>
          So the thing being asked for wasn't retrieval. It was warrant — an answer solid enough to repeat in a
          meeting, to put in a doc, or to build a scoping decision on. That distinction changed what the tool had to
          do: a search engine's job is to find the right thing; this tool's job was to hand back an answer{' '}
          <em>and</em> the grounds for believing it, in a form the PM could forward to an engineer as easily as act
          on.
        </p>
        <p style={{ ...serifP, maxWidth: '62ch' }}>
          Which reframes failure too. The failure mode isn't a poor result — a PM can tell when nothing useful came
          back. The failure mode is a confident, plausible, slightly wrong answer that a PM repeats in a planning
          meeting. Everything in the design is arranged against that one outcome.
        </p>
      </>
    ),
  },
  {
    id: 'ai-04',
    number: '04',
    title: 'Evidence',
    heading: 'How I know that',
    body: (
      <>
        <p style={serifP}>
          [Where this came from: how many PMs you spoke to, what you asked, what you watched them do. If you sat
          with someone during a scoping cycle, say so — the observation that they had the answer but wouldn't commit
          to it is the strongest thing you have.]
        </p>
        <p style={serifP}>
          Before this, the answer lived in whatever channel you could reach: Confluence pages that documented a
          decision at the time it was made, and engineers you asked directly about what had changed since. Neither
          is wrong — both just put the burden on knowing who to ask, and on that person being free.
        </p>
      </>
    ),
  },
  {
    id: 'ai-05',
    number: '05',
    title: 'The constraints',
    heading: 'What shaped every decision',
    body: (
      <>
        <h3 style={h3}>The reader can't check the answer.</h3>
        <p style={p10}>
          This is the inversion that made it different from designing a normal search product. A developer tool can
          afford to be wrong occasionally, because the developer will notice. A PM won't. So the tool couldn't be
          allowed to summarise without showing what it summarised — the source had to travel with the claim, every
          time, not behind a "view source" affordance that nobody clicks.
        </p>
        <h3 style={h3}>The index is always behind.</h3>
        <p style={p10}>
          The codebase changes daily; any index is a snapshot. That gap can't be designed away, so it had to be
          stated. An answer that's silently three weeks old is worse than no answer, because it's indistinguishable
          from a current one.
        </p>
        <h3 style={h3}>It shouldn't finish the thought.</h3>
        <p style={p10}>
          The tool could plausibly have answered "can we build this" — and it would have been wrong often enough to
          be dangerous, because that question depends on roadmap, capacity, and risk it has no view of. The design
          had to stop short of the decision and hand it over, without feeling evasive.
        </p>
        <h3 style={h3}>Access and provenance</h3>
        <p style={p10}>
          Index scope and permission rules sat with engineering, so I won't characterise them here — the design
          assumed every answer had to carry its source so a PM could check it against what they were allowed to see.
        </p>
        <p style={{ ...serifP, marginTop: 24 }}>
          Together those ruled out the shape this product usually takes: one box, one answer, phrased with
          confidence. What was left was a tool that shows its work.
        </p>
      </>
    ),
  },
  {
    id: 'ai-06',
    number: '06',
    title: 'The design',
    heading: 'Screens as answers',
    body: (
      <>
        <h3 style={h3}>Choosing the shape of the answer before asking the question.</h3>
        <p style={p10}>
          Four modes sit above the search field — quick search, detailed search, API spec, and mindmap — and you
          pick one first. The practical reason is that they return different things. The real reason is expectation:
          choosing "quick search" is the PM agreeing to a shallow answer, so a short result reads as the deal they
          made rather than the tool falling short. One box would have promised the same depth to every question.
        </p>
        <h3 style={h3}>Scope before query.</h3>
        <p style={p10}>
          Application context and repository are set before the search runs. Narrowing is partly a retrieval need,
          but it does something else — it makes the answer attributable. A result from a named repository is a
          thing a PM can bring to the team that owns it. A result from "the codebase" is not.
        </p>
        <h3 style={h3}>Freshness sits in the filter row, not a footnote.</h3>
        <p style={p10}>
          "Last indexed" is on the same line as the other search parameters, at the same weight. It's a search
          parameter because staleness is something you decide about before you trust a result, not something you
          discover afterwards.
        </p>
        <h3 style={h3}>The code is the answer; the prose is a pointer.</h3>
        <p style={p10}>
          Results return the actual source with the relevant line highlighted, in the file it lives in. The claim
          and the evidence for it are the same object, so there's no gap between them for a summary to go wrong in.
          A PM who can't read the code can still copy it to someone who can — which is the realistic use, and the
          design supports it rather than pretending otherwise.
        </p>
        <h3 style={h3}>Related searches, because research is iterative.</h3>
        <p style={p10}>
          Chips at the foot of a result give the next question. The first query is rarely the right one when you
          don't yet have the vocabulary of the system you're asking about, and a dead end with no exit sends the PM
          back to Slack — the exact behaviour the tool exists to replace.
        </p>
        <h3 style={h3}>The mindmap is the artefact, not the answer.</h3>
        <p style={p10}>
          Search settles a question. The mindmap produces something a PM can take into a room — a model of how
          parts of a system relate, which is what they were building by hand out of documentation in the first
          place. It's the one output meant to leave the tool.
        </p>
      </>
    ),
  },
  {
    id: 'ai-07',
    number: '07',
    title: 'Impact',
    heading: 'What shipped',
    body: (
      <>
        <p style={serifP}>
          It shipped internally right before I left. PMs across India and the US were using it, and it was the
          first internal tool built by the India team — I left too early to have usage numbers for it.
        </p>
        <p style={serifP}>
          I have no numbers for it. It was an internal tool shipped shortly before I left, and nobody was
          instrumenting adoption — so what I can honestly claim is the design and the reasoning behind it, not a
          measured result.
        </p>
      </>
    ),
  },
  {
    id: 'ai-08',
    number: '08',
    title: 'Reflection',
    heading: "What I'd do differently",
    body: (
      <>
        <p style={serifP}>
          The search field assumes you already know the name of the thing you're looking for. Every screen I
          designed works beautifully for a PM who can type <span style={mono15}>FormattedProcessorFactoryInitializer</span> —
          and that PM is the one who least needed the tool. The person the brief was actually about doesn't know the
          identifier; they know the capability, in customer language, and no amount of good retrieval bridges that
          if the entry point demands the engineering word.
        </p>
        <p style={serifP}>
          I'd start the next version from a capability rather than an identifier — ask what the customer does, and
          let the tool find the code — and I'd have caught it earlier by testing with a PM new to a system instead
          of one who already knew it.
        </p>
      </>
    ),
  },
];

export default function WellsFargoAITool() {
  return (
    <CaseStudyLayout
      kicker="Wells Fargo · 2025"
      title={
        <>
          <span style={{ color: 'var(--accent)' }}>An</span> answer a PM can repeat out loud
        </>
      }
      summary="Product managers at Wells Fargo were spending hours reading documentation to answer questions engineers could answer in a sentence. We built an internal tool that searches the bank's code repositories and returns an answer. I designed the surface — what it could claim, how it showed uncertainty, and where a human had to decide."
      meta={[
        { label: 'Role', value: 'Product designer — designed the tool end to end' },
        { label: 'Team', value: 'Only designer, with a PM and the engineering team' },
        { label: 'Timeframe', value: '3 weeks' },
        { label: 'Platform', value: 'Web · Internal' },
        { label: 'Scope', value: 'Owned the flow and the screens. Did not own retrieval, indexing, or model behaviour.' },
        { label: '', value: 'Screens redrawn and repository names replaced under NDA.' },
      ]}
      metrics={[
        { value: '4', label: 'Modes before one question' },
        { value: '0', label: 'Answers without a source' },
        { value: '1', label: 'Freshness stamp, always in view' },
      ]}
      hero={
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>
              Working prototype
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 16, lineHeight: 1.6, color: 'var(--secondary)' }}>
              Pick a mode, edit the query, hit Search. Try "Create Mindmap", and search "wire" for the no-result state.
            </div>
          </div>
          <div style={{ width: '100%', background: '#F8F9FA', border: '1px solid var(--hairline)' }}>
            <WFCodeDiscovery />
          </div>
        </>
      }
      heroCaption="The shipped discovery surface, rendered live: mode first, scope and freshness in the filter row, and results that return the source rather than a summary of it. The mode cards and the query field are interactive."
      sections={sections}
      notes={[
        {
          title: 'Constraints',
          body: "The person reading the answer usually can't verify it. The index lags the codebase. The tool had to stop short of the decision.",
        },
        {
          title: 'Credits',
          body: 'One PM and the engineering team. I owned the flow and the screens.',
        },
        {
          title: 'Principles',
          body: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div>01&nbsp; Show the source, not the summary.</div>
              <div>02&nbsp; Say how old the answer is.</div>
              <div>03&nbsp; Stop before the decision.</div>
            </div>
          ),
        },
      ]}
      prev={{ kicker: 'Next case study', label: 'Wells Fargo — financial health tools', to: '/work/wells-fargo-financial-health' }}
      next={{ kicker: 'Back to', label: 'All work', to: '/' }}
    />
  );
}
