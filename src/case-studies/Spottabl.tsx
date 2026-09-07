import CaseStudyLayout, { type CSSection } from '../components/CaseStudyLayout';
import { ScaleFrame } from './spottabl/shared';
import MyJobsScreen from './spottabl/MyJobsScreen';
import CandidateMatchesScreen from './spottabl/CandidateMatchesScreen';
import JobCandidatesScreen from './spottabl/JobCandidatesScreen';
import AddCandidatesScreen from './spottabl/AddCandidatesScreen';
import MyNetworkScreen from './spottabl/MyNetworkScreen';
import JobCreationScreen from './spottabl/JobCreationScreen';
import CandidateRequestsScreen from './spottabl/CandidateRequestsScreen';

const serifP: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 300,
  fontSize: 18,
  lineHeight: 1.65,
  color: 'var(--secondary)',
  margin: '16px 0 0 0',
  maxWidth: '65ch',
};

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--muted)',
};

const caption: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.05em',
  color: 'var(--muted)',
  marginTop: 12,
};

const objectives = [
  { n: '01', text: 'Digitise the process — JD, sourcing, rounds, feedback.' },
  { n: '02', text: 'A marketplace where companies and recruiters find each other.' },
  { n: '03', text: 'A library of role-ready job descriptions to speed up job creation.' },
];

const painPoints = [
  { n: '01', text: 'No digital way to check how far a candidate has got in the interview process.' },
  { n: '02', text: "No way to connect a recruiter's own database to the HR platform except manual upload." },
  { n: '03', text: 'Job descriptions too vague to tell a candidate whether the role is for them — so fewer, weaker applications.' },
  { n: '04', text: 'Hours spent following up with companies about candidate status by phone or email.' },
];

const systemSwatches = [
  { color: '#2C3BC9', label: 'Action' },
  { color: '#F4643C', label: 'Decide' },
  { color: '#FBBB53', label: 'Waiting' },
  { color: '#171A2E', label: 'Type' },
];

const sections: CSSection[] = [
  {
    id: 'sp-01',
    number: '01',
    title: 'Frame',
    heading: 'Three users who need the same fact at different times',
    body: (
      <>
        <p style={serifP}>
          Companies want qualified candidates, fast, without wading through a mailbox of near-misses. Recruiters are
          paid on placements, so they need visibility into which of their candidates is moving and which is stuck.
          Candidates want to know one thing after applying: am I still in this?
        </p>
        <p style={serifP}>
          Designing for three sides at once meant the same underlying stage — screening, interviewing, offer — had
          to make sense in three different vocabularies without becoming three different products.
        </p>
      </>
    ),
  },
  {
    id: 'sp-02',
    number: '02',
    title: 'The brief',
    heading: 'Build a marketplace, digitise the process',
    body: (
      <>
        <p style={serifP}>
          A recruiter network where specialists could pick up roles from companies they wanted to work with — and,
          alongside it, digitise the recruitment process end to end: job description creation, sourcing, interview
          rounds and feedback, so the whole thing could be monitored in one place instead of chased across channels.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 30 }}>
          {objectives.map((o) => (
            <div key={o.n} style={{ flex: '1 1 180px', borderTop: '1px solid var(--ink)', paddingTop: 14 }}>
              <div style={kicker}>Objective {o.n}</div>
              <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--secondary)', marginTop: 12 }}>{o.text}</div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'sp-03',
    number: '03',
    title: 'The reframe',
    heading: "The bottleneck wasn't sourcing. It was status.",
    tinted: true,
    body: (
      <p style={{ ...serifP, margin: 0, maxWidth: '62ch' }}>
        Every pain point we heard was the same pain point wearing a different hat: nobody could see where a
        candidate stood without asking a person. Recruiters chased companies by phone and email; companies
        re-explained vague job descriptions; candidates waited. Turnaround time wasn't lost in finding people — it
        was lost in the gaps between updates. So the product's job was to make one candidate's state legible to all
        three sides at once, and everything else — matching, the JD library, the network — hangs off that.
      </p>
    ),
  },
  {
    id: 'sp-04',
    number: '04',
    title: 'Evidence',
    heading: 'The pain points, as we heard them',
    body: (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}>
          {painPoints.map((p) => (
            <div key={p.n} style={{ display: 'flex', gap: 16, borderTop: '1px solid var(--hairline)', paddingTop: 14 }}>
              <span style={{ ...kicker, textTransform: 'none', flex: '0 0 22px' }}>{p.n}</span>
              <span style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--secondary)' }}>{p.text}</span>
            </div>
          ))}
        </div>
        <div style={{ ...serifP, maxWidth: '65ch' }}>
          Daily contact with around 30 recruiters plus our in-house team, and interviews with founders of several
          early-stage startups — running through the year of discovery and design before the first version shipped.
        </div>
      </>
    ),
  },
  {
    id: 'sp-05',
    number: '05',
    title: 'The cuts',
    heading: 'Relevance over volume',
    body: (
      <>
        <p style={serifP}>
          The obvious marketplace move is to maximise applications. We did the opposite: a company sees matches and
          qualified counts, not a mailbox. That decision set the interface — every job card leads with how many
          candidates are actually screened and how many are in process, and the primary action is &ldquo;screen
          qualified profiles&rdquo;, never &ldquo;view all applicants&rdquo;.
        </p>
        <p style={serifP}>
          What didn&rsquo;t make it: structured feedback to the candidate after a rejection. Spottabl had a
          candidate-facing product too, and rejection is the moment a candidate most wants to know why — it&rsquo;s
          also feedback the market almost never gives. I argued for it and it was deferred; it remains the piece
          I&rsquo;d put back first.
        </p>
      </>
    ),
  },
  {
    id: 'sp-06',
    number: '06',
    title: 'The design',
    heading: 'One candidate, one timeline, three readers',
    body: (
      <>
        <p style={serifP}>
          The candidate view is the spine of the product: a list of people on the left, one person's full timeline
          on the right — who moved them, when, what was said, what's needed next. Availability and notice period sit
          next to the name, because they are the two facts that decide whether a shortlist is real.
        </p>
        <div style={{ marginTop: 28 }}>
          <ScaleFrame height={380} scale={0.5}>
            <CandidateMatchesScreen />
          </ScaleFrame>
        </div>
        <div style={caption}>
          Candidate matches — the four facts that decide a shortlist sit at the top of the panel, and passing on
          someone requires a reason.
        </div>

        <p style={serifP}>
          Once someone is in the pipeline, the same person is read through one timeline: which stage they're at, who
          moved them, what was said, and what is needed next. Feedback is captured at the stage it belongs to, so
          &ldquo;rejected&rdquo; always carries a reason and nobody has to reconstruct a decision from memory.
        </p>
        <div style={{ marginTop: 28 }}>
          <ScaleFrame height={380} scale={0.5}>
            <JobCandidatesScreen />
          </ScaleFrame>
        </div>
        <div style={caption}>
          Job candidates — the stage rail says where the pipeline is stuck and who owes the next move; the history
          below says why.
        </div>

        <p style={serifP}>
          Recruiters arrive with their own book — spreadsheets, resumes, a LinkedIn network — and the old answer to
          that was a manual upload. So the product takes candidates the way recruiters actually hold them: bulk
          resume upload, a pasted LinkedIn URL, a connected network, or manual entry when it's one person. Whatever
          the source, it lands as the same candidate object.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 28 }}>
          <ScaleFrame height={380} scale={0.5}>
            <AddCandidatesScreen />
          </ScaleFrame>
          <ScaleFrame height={380} scale={0.5}>
            <MyNetworkScreen />
          </ScaleFrame>
        </div>
        <div style={caption}>
          Add candidates and my network — four ways in, one candidate record out, and a source you connect once.
        </div>

        <p style={serifP}>
          The vague job description gets answered upstream, with structure instead of a blank text box: role and
          responsibilities, experience band, compensation, location, must-have skills and assessment questions —
          each a field, each reusable. That's what makes a role legible to a candidate later, and it's why the JD
          library was worth building.
        </p>
        <div style={{ marginTop: 28 }}>
          <ScaleFrame height={380} scale={0.5}>
            <JobCreationScreen />
          </ScaleFrame>
        </div>
        <div style={caption}>
          Job creation — five steps, one section at a time, and a live preview of what a candidate will actually
          read.
        </div>

        <p style={serifP}>
          Candidates get the same object again, stripped to what they are allowed to see: curated roles, the jobs
          they've been shortlisted for, earning potential and notice-period fit stated up front, and the live status
          of every application.
        </p>
        <div style={{ marginTop: 28 }}>
          <ScaleFrame height={380} scale={0.5}>
            <CandidateRequestsScreen />
          </ScaleFrame>
        </div>
        <div style={caption}>
          Candidate side — every request sorted by whose move it is, and accepting one says exactly what it costs.
        </div>
      </>
    ),
  },
  {
    id: 'sp-07',
    number: '07',
    title: 'The system',
    heading: 'What made three products feel like one',
    body: (
      <>
        <p style={serifP}>
          A single style guide — Montserrat throughout, a primary blue for actions, orange for anything that needs a
          decision, yellow for waiting — plus one card anatomy and one status vocabulary reused across the company
          platform, the recruiter product and the candidate site. New screens got cheaper to design as the system
          settled, which is the only reason a 15-week timeline covered three surfaces.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 28 }}>
          {systemSwatches.map((s) => (
            <div key={s.label} style={{ flex: '1 1 120px' }}>
              <div style={{ height: 56, background: s.color }} />
              <div style={{ ...kicker, marginTop: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'sp-08',
    number: '08',
    title: 'Reflection',
    heading: "What I'd do differently",
    body: (
      <p style={serifP}>
        The status vocabulary assumed companies would keep the pipeline current — the one behaviour the product
        couldn't enforce. I'd design for stale data as a first-class state next time: show when a stage was last
        touched, and make nudging a company a one-tap action instead of a phone call. What I can say for certain is
        that it made our in-house team's work materially smoother — I left before the first version reached a scale
        worth quoting, so I'll leave the rest unclaimed.
      </p>
    ),
  },
];

export default function Spottabl() {
  return (
    <CaseStudyLayout
      kicker="Spottabl · recruiter marketplace · 2019 — 21"
      title={
        <>
          <span style={{ color: 'var(--accent)' }}>Three</span> sides of a hiring marketplace, one shared pipeline
        </>
      }
      summary="Spottabl connects startups that are hiring with specialist recruiters who can fill the role. The hard part was never the matching — it was that every party tracked the same candidate somewhere else: a company in its ATS, a recruiter in a spreadsheet, a candidate in their inbox. I designed one pipeline object that all three sides read, so “where is this candidate” stopped being a phone call."
      meta={[
        { label: 'Role', value: 'UI/UX designer — early team member, zero to one' },
        { label: 'Team', value: 'Only designer, working directly with the CPO and CTO' },
        { label: 'Timeframe', value: 'Roughly a year to the first version — 2019 to 2021 in total' },
        { label: 'Platform', value: 'Web · SaaS marketplace' },
        { label: 'Users', value: 'Three sides — companies, recruiters and candidates' },
        { label: 'Scope', value: 'Owned the flows, the interface system and the style guide. Did not own the matching engine or pricing.' },
      ]}
      metrics={[
        { value: '3', label: 'Sides, one pipeline' },
        { value: '100+', label: 'Client companies today' },
        { value: '3,000+', label: 'Recruiters on the platform today' },
      ]}
      hero={
        <ScaleFrame height={507} scale={0.6666} maxWidth={800}>
          <MyJobsScreen />
        </ScaleFrame>
      }
      heroCaption="My jobs — one row per role, three numbers, one action. The card only speaks up when a role needs something."
      sections={sections}
      notes={[
        {
          title: 'Sidenote',
          body: 'A marketplace has to be worth using before either side is full. Early on there were more roles than qualified recruiters, so the interface had to look honest when a job had two matches, not twelve — empty and thin states got designed first, not last.',
        },
        {
          title: 'Process',
          body: 'Discover → define → ideate → design, over 15 weeks: research and user segmentation, then flows for the company and recruiter sides, then wireframes, then the visual system.',
        },
        {
          title: 'Principles',
          body: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div>01&nbsp; Relevance over volume.</div>
              <div>02&nbsp; One object, three vocabularies.</div>
              <div>03&nbsp; No status that needs a phone call.</div>
            </div>
          ),
        },
      ]}
      prev={{ kicker: 'Next case study', label: 'Klub — syndicates on the patron platform', to: '/work/klub' }}
      next={{ kicker: 'Back to', label: 'All work', to: '/' }}
    />
  );
}
