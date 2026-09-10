import type { ReactNode } from 'react';
import CaseStudyLayout, { type CSSection } from '../components/CaseStudyLayout';
import FitScale from '../components/FitScale';
import IOSDevice from '../components/IOSFrame';
import WFFinancialHealthFlow from './wells-fargo/WFFinancialHealthFlow';

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

function EmbedFrame({ children, designWidth = 1180 }: { children: ReactNode; designWidth?: number }) {
  return (
    <div style={{ width: '100%', overflow: 'hidden', background: '#F7F5F0', border: '1px solid var(--hairline)' }}>
      <FitScale designWidth={designWidth}>{children}</FitScale>
    </div>
  );
}

function BeforeShot({ src, alt, note }: { src: string; alt: string; note: string }) {
  return (
    <div>
      <img src={src} alt={alt} style={{ width: '100%', display: 'block', border: '1px solid var(--hairline)' }} />
      <div style={caption}>{note}</div>
    </div>
  );
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: 193, height: 420, flex: '0 0 auto' }}>
      <div style={{ width: 402, minWidth: 402, height: 874, transform: 'scale(0.48)', transformOrigin: 'top left' }}>
        <IOSDevice width={402} height={874}>
          <div style={{ paddingTop: 54, minHeight: '100%', background: '#F4F2ED' }}>{children}</div>
        </IOSDevice>
      </div>
    </div>
  );
}

const sections: CSSection[] = [
  {
    id: 'wf-01',
    number: '01',
    title: 'Frame',
    heading: 'A tool for money that people avoided opening',
    body: (
      <p style={serifP}>
        The section's job is simple to state: show a customer where their money is going, and help them decide what to
        do about it. What we designed is a budget set in four steps — choose the accounts to watch, confirm what comes
        in, review what is already committed, cap what is left — that ends on a dashboard they live with, inside the
        bank they already use. Savings goals sit beside it as their own object, not a step inside it.
      </p>
    ),
  },
  {
    id: 'wf-02',
    number: '02',
    title: 'The brief',
    heading: 'What Wells Fargo asked for',
    body: (
      <p style={serifP}>
        The section wasn't being used. It had been designed a long time ago, and it showed — dense screens, a lot of
        numbers, and a workflow that asked people to understand the whole thing before it gave them anything. The ask
        was straightforward: make it something people actually want to open.
      </p>
    ),
  },
  {
    id: 'wf-03',
    number: '03',
    title: 'The reframe',
    heading: 'What the problem actually was',
    tinted: true,
    body: (
      <>
        <p style={{ ...serifP, maxWidth: '62ch' }}>
          The obvious reading was that it looked dated. That was true, but it wasn't the reason nobody used it.
        </p>
        <p style={{ ...serifP, maxWidth: '62ch' }}>
          The section showed everything at once and prioritised nothing. Every number was given equal weight, so a
          customer opening it had to decide what mattered before they could act on anything. Dense isn't the same as
          informative — and when the information is someone's own money, the cost of not understanding it isn't
          confusion, it's avoidance.
        </p>
        <p style={{ ...serifP, maxWidth: '62ch' }}>
          The second thing changed how we approached it. The majority of Wells Fargo's customers are Boomers and Gen X.
          That audience doesn't churn through new finance apps looking for a better one — they consolidate. They want to
          see everything in one place they already trust, and they'd rather it be clear than clever.
        </p>
        <p style={{ ...serifP, maxWidth: '62ch' }}>
          So the goal wasn't to modernise the section into something that felt like a startup app. It was to make the
          place they already came to actually legible. Less to look at, in a sensible order, with the next action
          obvious.
        </p>
      </>
    ),
  },
  {
    id: 'wf-04',
    number: '04',
    title: 'Evidence',
    heading: 'How I know that',
    body: (
      <>
        <p style={serifP}>
          We looked outward first. I went through the neobanks — the US challengers and a lot of the Indian ones, where
          the category has moved fastest — to see how they were handling the same job: showing someone their financial
          position and getting them to act on it.
        </p>
        <p style={serifP}>
          They're good at it, and almost none of it transferred. Their patterns assume a customer who downloaded a new
          app on purpose and will tolerate novelty to get something better. Wells Fargo's customers are the opposite:
          they're here because they already trust the bank, and anything unfamiliar reads as risk rather than progress.
          Several of the moves I liked most were ones we deliberately didn't make.
        </p>
        <p style={serifP}>
          On evidence, I should be straight: the section had effectively no usage to analyse, and detailed customer data
          wasn't shared with the India team. So the case for change rested on the audit itself — walking the existing
          flow, counting what it asked of a customer, and reading it against the bank's own design system — rather than
          on behavioural data I didn't have.
        </p>

        <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', margin: '30px 0 0 0' }}>What was there before</h3>
        <p style={{ ...serifP, marginTop: 10 }}>
          The audit is the clearest argument in this project, so it's worth seeing. Four separate tools — Spending
          Report, Budget Watch, Graphical Analysis, My Savings Plan — each with its own page, its own vocabulary and its
          own idea of what mattered. Nothing was broken. Everything was simply shown at once, in whatever order the data
          arrived.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 28 }}>
          <BeforeShot
            src="/assets/wf-before/money-map.png"
            alt="Wells Fargo My Money Map before the redesign — four panels showing My Spending Report, Budget Watch, My Savings Plan and a resource library"
            note="My Money Map — four tools on one page, none prioritised. Savings sits bottom-left, below the fold."
          />
          <BeforeShot
            src="/assets/wf-before/spending-report.png"
            alt="Wells Fargo My Spending Report with Budget Watch before the redesign — a dense summary table of categories by month"
            note="My Spending Report — five columns per category, and “what's left” is a row in the middle of a table."
          />
          <BeforeShot
            src="/assets/wf-before/budget-goals.png"
            alt="Wells Fargo budget goals bar chart before the redesign — ten categories as horizontal bars"
            note="Budget goals — ten categories in source order, so the one over budget is findable, not visible."
          />
          <BeforeShot
            src="/assets/wf-before/edit-budget-watch.jpeg"
            alt="Wells Fargo Edit Budget Watch before the redesign — a long list of per-category monthly goal input fields"
            note="Edit Budget Watch — every subcategory its own field, all on one screen, all at once."
          />
        </div>
      </>
    ),
  },
  {
    id: 'wf-05',
    number: '05',
    title: 'The constraints',
    heading: 'What shaped every decision',
    body: (
      <>
        <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', margin: '26px 0 0 0' }}>You can't move one part of a bank.</h3>
        <p style={{ ...serifP, marginTop: 10 }}>
          Changing a single section in the Wells Fargo system means untangling everything it shares with the rest of the
          app first. So the redesign had to be built almost entirely from components that already existed — the
          improvement had to come from what we showed and in what order, not from new UI.
        </p>
        <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', margin: '26px 0 0 0' }}>It couldn't stand out.</h3>
        <p style={{ ...serifP, marginTop: 10 }}>
          A section that looked like a different product would read as untrustworthy to this audience, and would have
          broken the consistency the rest of the app depends on. The design had to feel like the same bank, only
          clearer.
        </p>
        <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', margin: '26px 0 0 0' }}>Data security capped the feature set.</h3>
        <p style={{ ...serifP, marginTop: 10 }}>
          We couldn't ask customers to upload much, or lean on the kind of data-hungry personalisation the neobanks use.
          Anything that made the tools smarter had to work from what the bank already held.
        </p>
        <p style={{ ...serifP, marginTop: 24 }}>
          Those three together ruled out most of what a redesign usually reaches for. What was left was sequence,
          hierarchy and language — deciding what a customer sees first, what they see at all, and what it's called. That
          turned out to be enough, and it's the part I'd argue matters most anyway.
        </p>
      </>
    ),
  },
  {
    id: 'wf-06',
    number: '06',
    title: 'The design',
    heading: 'Screens as answers',
    body: (
      <>
        <p style={serifP}>
          The first decision was to stop showing the whole picture at once. Setting a budget became a sequence of four
          steps, each holding one decision, and the start screen says out loud what all four will ask for — choose the
          accounts to watch, confirm what comes in, review what is already committed, then cap what is left — so nobody
          has to understand the model before they get anything back.
        </p>
        <p style={serifP}>
          The one thing we kept from the old product was its front door. My Money Map was the only place that put
          spending, budget and savings side by side, and customers already knew it as home — so the redesign opens there
          rather than dropping someone straight into a wizard. It answers "what do you already know about me" before it
          asks for anything: twelve months of money out, a spending trend, current savings. The budget is a door off
          that page, not the price of entry.
        </p>
        <p style={serifP}>
          The order carries an opinion. Money in, then what is already committed, then what is left to cap — each step
          narrows the same figure rather than introducing a new idea. A panel beside every step keeps the running answer
          in view — money in, left after bills, left to spend — and updates it as amounts change, so a customer sees the
          consequence of a number while they are setting it, not two screens later.
        </p>
        <p style={serifP}>
          Language did the rest. Sections are named for what a customer would say — fixed costs, spending money, what's
          left — and the last step answers the only question that matters at the end: does this add up. On the
          dashboard, categories are sorted by how much of the budget they've used, so the thing worth looking at is at
          the top instead of being findable.
        </p>

        <div style={{ marginTop: 32 }}>
          <EmbedFrame>
            <WFFinancialHealthFlow view="intro" showChrome={false} />
          </EmbedFrame>
          <div style={caption}>The start screen states all four questions before asking for anything — the cost of starting is legible up front.</div>
        </div>

        <div style={{ marginTop: 28 }}>
          <EmbedFrame>
            <WFFinancialHealthFlow view="setup" step={1} showChrome={false} />
          </EmbedFrame>
          <div style={caption}>Step 1 picks the accounts to watch. Continue stays off until at least one is chosen, and the panel carries the running answer through every step.</div>
        </div>

        <div style={{ marginTop: 28 }}>
          <EmbedFrame>
            <WFFinancialHealthFlow view="setup" step={3} showChrome={false} />
          </EmbedFrame>
          <div style={caption}>Regular payments are listed with their date and payee and totalled for the customer — read-only here, with the route to change them named.</div>
        </div>

        <div style={{ marginTop: 28 }}>
          <EmbedFrame>
            <WFFinancialHealthFlow view="setup" step={4} showChrome={false} />
          </EmbedFrame>
          <div style={caption}>The last step caps categories against what you usually spend. Finish set-up disables, with a plain reason, if the limits exceed what is there.</div>
        </div>
      </>
    ),
  },
  {
    id: 'wf-06b',
    number: '07',
    title: 'Savings goals',
    heading: 'The number that disappeared',
    body: (
      <>
        <p style={serifP}>
          My first version told a customer to pay themselves first inside the budget wizard, and then produced a number
          that went nowhere. $500 a month was subtracted and never appeared again — no name, no target, no date, no
          destination account. Worse, it asked for the goal twice: once at the start and again in the middle, while a
          separate one-step form did the same job. I had treated budgets and savings goals as one flow when they are two
          different objects with different lifecycles.
        </p>
        <p style={serifP}>
          The fix was to make savings a durable object rather than a subtraction. A goal gets a name, a target, a date
          and a savings account, so the money has somewhere to be and something to be for. It gets a permanent section
          on the dashboard, placed above spending by category — the same argument the setup flow makes with its
          ordering, held after setup ends. And it gets its own entry point — the dashboard button and the savings rail
          card — so nobody walks a budget flow to open a savings plan, and the goal is never asked for twice.
        </p>
        <p style={serifP}>
          Pace does the work the old slider couldn't: at $150 a month you reach $3,000 in November 2028, four months
          after your July 2028 target. It's amber, not red — a customer who saves less than they hoped hasn't made an
          error, and this audience reads red as having done something wrong. And when a new goal needs more than is
          spare, the shortfall is stated as a number and the customer chooses their own cuts, with fixed costs visibly
          locked and the action disabled, with a plain reason, until the arithmetic works.
        </p>

        <div style={{ marginTop: 32 }}>
          <EmbedFrame>
            <WFFinancialHealthFlow view="add" seeded showChrome={false} />
          </EmbedFrame>
          <div style={caption}>A goal is two inputs. The monthly amount is derived, and the source account, date and end month are stated as a list rather than a sentence to parse.</div>
        </div>

        <div style={{ marginTop: 28 }}>
          <EmbedFrame>
            <WFFinancialHealthFlow view="fit" seeded showChrome={false} />
          </EmbedFrame>
          <div style={caption}>When the goal does not fit, the shortfall is a number and the customer picks their own cuts — fixed costs locked, a live counter, and the action off until the arithmetic works. Lower a limit to watch it turn on.</div>
        </div>

        <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', margin: '40px 0 0 0' }}>On a phone</h3>
        <p style={{ ...serifP, marginTop: 10 }}>
          Nothing is redrawn for small screens. The two-column layouts wrap, so the running-total panel falls below the
          form it summarises and the side rail lands under the content — the primary action is never pushed off-screen.
          The only concession is the top nav, which collapses to a menu button rather than wrapping five desktop items.
          One decision per screen was already the rule, so the phone needed less furniture rather than a different
          structure.
        </p>
        <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 20, marginTop: 32, justifyContent: 'center', alignItems: 'flex-start' }}>
          <PhoneFrame>
            <WFFinancialHealthFlow view="setup" step={1} showChrome={false} compact />
          </PhoneFrame>
          <PhoneFrame>
            <WFFinancialHealthFlow view="dash" seeded showChrome={false} compact />
          </PhoneFrame>
          <PhoneFrame>
            <WFFinancialHealthFlow view="add" seeded showChrome={false} compact />
          </PhoneFrame>
        </div>
        <div style={{ ...caption, marginTop: 16 }}>
          Account choice, the budget dashboard and the add-goal form at phone width. The rail drops below the content,
          the money-flow ledger stacks, and the steppers keep their 48px targets. Each screen scrolls inside its frame.
        </div>
      </>
    ),
  },
  {
    id: 'wf-07',
    number: '08',
    title: 'Status',
    heading: 'Where it got to',
    body: (
      <>
        <p style={serifP}>
          The redesign was reviewed, approved and released, and usage of the section rose 1.2% against the flat baseline
          we started from. Every screen cleared an accessibility review before sign-off, which was a condition of
          shipping anything here.
        </p>
        <p style={serifP}>
          The honest measure is narrow. A 1.2% lift is real movement on a number that had not moved at all, but it is
          small, and I would not claim the sequence alone did it. Screen count stayed close to where it started — the
          win was the savings plan flow, where reworking the form took three screens out of the path. Most of the change
          was in what each screen asked for and in what order, not in how many there were.
        </p>
      </>
    ),
  },
  {
    id: 'wf-08',
    number: '09',
    title: 'Reflection',
    heading: "What I'd do differently",
    body: (
      <p style={serifP}>
        I'd push to define what "engagement" meant before design started. We inherited a flat number for the section and
        treated it as the problem statement, which made every improvement arguable after the fact. If I'd instrumented
        specific behaviours instead — who finishes setup, who comes back to the dashboard, who changes an amount once
        it's live — I'd be able to say which of these changes did the work, rather than describing a redesign and
        trusting the reader to believe it helped.
      </p>
    ),
  },
];

export default function WellsFargoFinancialHealth() {
  return (
    <CaseStudyLayout
      kicker="Wells Fargo · 2024"
      title={
        <>
          <span style={{ color: 'var(--accent)' }}>Financial</span> health tools
        </>
      }
      summary="Wells Fargo's financial health tools had been built years earlier and barely touched since. Engagement was flat. I led the redesign of the section, working end-to-end from the initial audit through to approved screens."
      meta={[
        { label: 'Role', value: 'Design lead — led the redesign end to end' },
        { label: 'Team', value: '3 designers (2 juniors I mentored) and 1 PM, with developers on call for design reviews' },
        { label: 'Timeframe', value: '8 months' },
        { label: 'Platform', value: 'Web · responsive' },
        { label: 'Scope', value: 'Audit through to approved screens, handed to engineering. Did not own the scoring model or the underlying account data.' },
        { label: '', value: 'Screens redrawn and figures simplified under NDA.' },
      ]}
      metrics={[
        { value: '7', label: 'Steps, one decision each' },
        { value: '+1.2%', label: 'Tool usage after launch' },
        { value: '1', label: 'Figure always in view' },
      ]}
      afterMetrics={
        <>
          <p style={{ ...serifP, maxWidth: '58ch', margin: '26px 0 0 0' }}>
            The constraint that shaped everything: I couldn't add UI. Every screen had to be assembled from components
            the bank already shipped, so the improvement had to come from sequence, hierarchy and language — what a
            customer sees first, what they see at all, and what it's called.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 22 }}>
            <a href="#wf-03" style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '10px 16px', border: '1px solid var(--ink)', color: 'var(--ink)' }}>Read the reframe →</a>
            <a href="#wf-06" style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '10px 16px', border: '1px solid var(--hairline)', color: 'var(--secondary)' }}>See the design decisions →</a>
          </div>
        </>
      }
      hero={
        <>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={kicker}>Working prototype</div>
              <div style={{ ...kicker, textTransform: 'none', color: 'var(--secondary)' }}>
                Everything is live — pick accounts, set limits, add a goal, resolve a shortfall.
              </div>
            </div>
            <EmbedFrame>
              <WFFinancialHealthFlow showChrome={false} />
            </EmbedFrame>
            <div style={caption}>
              Rebuilt in code: real state, real arithmetic. Set the budget from the start screen, then add a savings
              goal from the dashboard — change any number and every dependent figure recalculates.
            </div>
          </div>
        </>
      }
      sections={sections}
      notes={[
        {
          title: 'Constraints',
          body: 'The redesign had to be assembled from components the bank already shipped — a shared system means a new pattern here would have to be paid for everywhere. The work was sequence, hierarchy and language.',
        },
        {
          title: 'Credits',
          body: "One PM, two junior designers I mentored, and the bank's design-system and accessibility teams, who reviewed everything before sign-off. I owned the audit, the flows, the screens and the copy.",
        },
        {
          title: 'Principles',
          body: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div>01&nbsp; One decision per screen.</div>
              <div>02&nbsp; Sequence is the argument.</div>
              <div>03&nbsp; Name it what a customer would call it.</div>
            </div>
          ),
        },
      ]}
      prev={{ kicker: 'Next case study', label: 'Klub — syndicates on the patron platform', to: '/work/klub' }}
      next={{ kicker: 'Back to', label: 'All work', to: '/' }}
    />
  );
}
