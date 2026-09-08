import CaseStudyLayout, { type CSSection } from '../components/CaseStudyLayout';
import FitScale from '../components/FitScale';
import KlubSyndicate from './klub/KlubSyndicate';

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

const objectiveCol: React.CSSProperties = { flex: '1 1 180px', borderTop: '1px solid var(--ink)', paddingTop: 14 };

const archNode: React.CSSProperties = { fontSize: 11, textAlign: 'center', color: 'var(--muted)', border: '1px solid var(--hairline)', padding: '8px 4px' };

const sections: CSSection[] = [
  {
    id: 'kl-01',
    number: '01',
    title: 'Frame',
    heading: 'Three new people in a room built for one',
    body: (
      <>
        <p style={serifP}>
          A <strong style={{ fontWeight: 500 }}>syndicate lead</strong> sources deals. They are usually already
          founding or angel-investing, so they arrive with a network, a reputation and their own deal flow — and
          they want to bring people with them. <strong style={{ fontWeight: 500 }}>Syndicate members</strong> come
          in on the lead's judgement: they want exposure without doing the diligence themselves.{' '}
          <strong style={{ fontWeight: 500 }}>Investment firms</strong> use syndicates to diversify — smaller
          cheques, more brands, someone else at the front.
        </p>
        <p style={serifP}>
          All three sit alongside the solo patron the app was designed for, who invests alone and should never be
          made to care that any of this exists.
        </p>
      </>
    ),
  },
  {
    id: 'kl-02',
    number: '02',
    title: 'The brief',
    heading: "Digitise the syndicate, don't disturb the patron",
    body: (
      <>
        <p style={serifP}>
          "We need a syndicate platform on the existing patrons app without disrupting the current experience of our
          patron investors." Syndicates bring both demand and supply to revenue-based financing — but run by hand,
          they don't scale.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 30 }}>
          <div style={objectiveCol}>
            <div style={kicker}>Objective 01</div>
            <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--secondary)', marginTop: 12 }}>Digitise the syndicate: create one, build a team, invite members.</div>
          </div>
          <div style={objectiveCol}>
            <div style={kicker}>Objective 02</div>
            <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--secondary)', marginTop: 12 }}>Let a lead join a deal, commit, invite members and accept their investments.</div>
          </div>
          <div style={objectiveCol}>
            <div style={kicker}>Objective 03</div>
            <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--secondary)', marginTop: 12 }}>A landing page that explains syndicates well enough to drive signups.</div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'kl-03',
    number: '03',
    title: 'The reframe',
    heading: 'Not a new product — a new mode of an existing one',
    tinted: true,
    body: (
      <p style={{ ...serifP, margin: 0, maxWidth: '62ch' }}>
        Both obvious routes were dead. Rewamping the patrons app would confuse the people already investing in it. A
        separate syndicate product would force existing patrons through a second registration and onboarding, then
        make them juggle two places to manage one portfolio. What was left was the harder option: keep one app, one
        identity, one portfolio — and treat "investing with a syndicate" as another way to commit to a deal rather
        than a different app to live in. Every screen a solo patron already knew had to keep working untouched.
      </p>
    ),
  },
  {
    id: 'kl-04',
    number: '04',
    title: 'Evidence',
    heading: 'The pain points, as we heard them',
    body: (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}>
          {[
            'No digital way to onboard a syndicate or invest as one — everything happened offline, with a person in the middle.',
            "The patrons app couldn't be rebuilt around syndicates: a wholly new experience would confuse existing users.",
            'A standalone syndicate product meant a second registration, and two platforms for one set of investments.',
          ].map((t, i) => (
            <div key={t} style={{ display: 'flex', gap: 16, borderTop: '1px solid var(--hairline)', paddingTop: 14 }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'var(--muted)', flex: '0 0 22px' }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--secondary)' }}>{t}</span>
            </div>
          ))}
        </div>
        <p style={{ ...serifP, marginTop: 18 }}>
          Interviews with Klub's existing investor base, routed through the founders who held those relationships —
          8 to 10 patrons directly, plus the founders' own notes from meetings. This is a high-net-worth audience and
          a small one by design; the product serves the same crowd, so depth per conversation mattered more than
          volume.
        </p>
      </>
    ),
  },
  {
    id: 'kl-05',
    number: '05',
    title: 'Architecture',
    heading: 'One new branch, not a new tree',
    body: (
      <>
        <p style={serifP}>
          Syndicates entered the app as a single sibling of the sections patrons already used — deals, brands, the
          investment dashboard, rewards, profile. Nothing above it moved. Inside the branch sits everything new:
          discovery, the syndicate profile, team members, commitments and the syndicate's own deals.
        </p>
        <div style={{ marginTop: 30, overflowX: 'auto' }}>
          <div style={{ minWidth: 560 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ fontSize: 12, color: 'var(--ink)', border: '1px solid var(--ink)', padding: '10px 16px' }}>Patrons app</div>
            </div>
            <div style={{ height: 20, borderLeft: '1px solid var(--hairline)', width: 1, margin: '0 auto' }} />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', borderTop: '1px solid var(--hairline)', paddingTop: 16 }}>
              {['Home', 'Deals', 'Syndicates', 'Brands', 'Dashboard', 'Rewards', 'Profile'].map((n) => (
                <div key={n} style={n === 'Syndicates' ? { ...archNode, color: 'var(--ink)', border: '1px solid var(--accent)' } : archNode}>
                  {n}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 18 }}>
              {['Explore syndicates', 'Create a syndicate', 'Team members', 'Syndicate deals', 'Commitments'].map((n) => (
                <div key={n} style={{ fontSize: 11, color: 'var(--secondary)', border: '1px solid var(--hairline)', padding: '8px 10px' }}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="scroll-hint">Scroll to see the full diagram →</div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--muted)', marginTop: 12 }}>
          The whole feature is one branch deep, so a patron who ignores it never meets it.
        </div>
      </>
    ),
  },
  {
    id: 'kl-06',
    number: '06',
    title: 'The design',
    heading: 'Explain it before asking anyone to join it',
    body: (
      <>
        <p style={serifP}>
          Revenue-based financing is unfamiliar; syndicated RBF is unfamiliar twice over. So the entry point isn't a
          form — it's a page that answers, in order: what a syndicate is, what a lead gets, who is already doing it,
          and what other patrons think of it. Two actions, and they are honest about commitment: <em>join a syndicate</em>{' '}
          for members, <em>create a syndicate</em> for leads.
        </p>
        <div style={{ marginTop: 28 }}>
          <FitScale designWidth={1280}>
            <KlubSyndicate startPage="My Portfolio" maxHoldings={3} />
          </FitScale>
        </div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--muted)', marginTop: 12 }}>
          The member's side of the same app: one portfolio, whether a deal was taken solo or through a syndicate —
          so joining one never means a second place to look.
        </div>
        <p style={{ ...serifP, marginTop: 32 }}>
          Three promises carry the pitch, and each is a real mechanic rather than a slogan: rely on industry experts
          (a lead's insight and negotiated terms), fund your loved brands (private opportunities visible only to
          members), back the winners (join many syndicates, track returns, allocate accordingly). The proof
          underneath is evidence, not decoration — the brands syndicates have funded, the firms already
          participating, and video explainers for the parts a paragraph can't carry.
        </p>
        <p style={serifP}>
          The FAQ was designed as part of the funnel, not a support page: why become a lead, whether syndicates
          handle compliance, whether joining costs you control of your own decisions. Those are the objections that
          stop a signup, so they sit above the fold of the decision.
        </p>
      </>
    ),
  },
  {
    id: 'kl-07',
    number: '07',
    title: 'Status',
    heading: 'Where this got to',
    body: (
      <p style={serifP}>
        It shipped just before I left — architecture, flows for both the syndicate lead and the member, and the
        syndicates landing experience. I also designed the Klub website in the same stretch. Every screen here was
        reviewed and approved by stakeholders before it went out.
      </p>
    ),
  },
  {
    id: 'kl-08',
    number: '08',
    title: 'Reflection',
    heading: "What I'd do differently",
    body: (
      <p style={serifP}>
        I designed the explaining and the doing in one pass. Given the timeline again, I'd have tested the landing
        page against real patrons before drawing a single management screen — if people can't repeat back what a
        syndicate is, the rest of the flow is decoration.
      </p>
    ),
  },
];

export default function Klub() {
  return (
    <CaseStudyLayout
      kicker="Klub · Syndicates · 2021 — 22"
      title={
        <>
          <span style={{ color: 'var(--accent)' }}>Adding</span> group investing to an app built for one investor
        </>
      }
      summary="Klub finances local brands through revenue-based financing, funded by a community of patrons. Syndicates — a lead who sources a deal and members who back it together — were already happening, entirely offline, run by hand. The brief was to productise them inside the existing patrons app without unsettling the patrons already using it. So the design question wasn't “what does a syndicate product look like”; it was “how much new can one app absorb before it stops feeling like the app people already trust”."
      meta={[
        { label: 'Role', value: 'Product designer — owned the syndicate flow end to end' },
        { label: 'Team', value: 'Only designer, founder-led product' },
        { label: 'Timeframe', value: 'Roughly a year to the first version — 2019 to 2021 in total' },
        { label: 'Platform', value: 'Klub patrons app · web' },
        { label: 'Users', value: 'Syndicate leads, syndicate members and investment firms — on top of existing solo patrons' },
        { label: 'Scope', value: 'Owned the IA, flows, screens and the syndicates landing page. Did not own deal terms, compliance or the RBF model.' },
      ]}
      metrics={[
        { value: '1 app', label: 'No second product, no re-onboarding' },
        { value: '3', label: 'New user types served' },
        { value: '100+', label: 'Client companies today' },
      ]}
      hero={
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 380px', minWidth: 320 }}>
            <FitScale designWidth={1280}>
              <KlubSyndicate startPage="Syndicates" section="Discovery" maxCards={3} />
            </FitScale>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--muted)', marginTop: 14 }}>
              01 · Discovery — same nav, same identity, one more tab. Deals are filterable by sector and read at a
              glance.
            </div>
          </div>
          <div style={{ flex: '1 1 380px', minWidth: 320 }}>
            <FitScale designWidth={1280}>
              <KlubSyndicate startPage="Syndicates" section="Community" />
            </FitScale>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--muted)', marginTop: 14 }}>
              02 · Trust and onboarding — who leads these deals, and the four steps that answer "am I allowed to do
              this?" before anyone commits.
            </div>
          </div>
        </div>
      }
      sections={sections}
      notes={[
        {
          title: 'Sidenote',
          body: (
            <>
              The real constraint was other people's habits. Most of my decisions here were subtraction: what can
              syndicates <em>not</em> change about the app a patron already knows? That question resolved more
              arguments than any mockup did.
            </>
          ),
        },
        {
          title: 'Process',
          body: "Discover → define → ideate → design over 15 weeks: research and segmentation, information architecture, flows for the lead and member journeys, wireframes, then visual design on Klub's existing system (Open Sans, brand blue).",
        },
        {
          title: 'Principles',
          body: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div>01&nbsp; New capability, same furniture.</div>
              <div>02&nbsp; Never make an existing user re-register.</div>
              <div>03&nbsp; Explain the model before asking for money.</div>
            </div>
          ),
        },
      ]}
      prev={{ kicker: 'Next case study', label: 'Spottabl — three sides, one pipeline', to: '/work/spottabl' }}
      next={{ kicker: 'Back to', label: 'All work', to: '/' }}
    />
  );
}
