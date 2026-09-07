import CaseStudyLayout, { type CSSection } from '../components/CaseStudyLayout';
import PhoneScreen from '../components/PhoneScreen';
import {
  BackgroundShadow,
  Container2,
  BackgroundShadow6,
  Container,
  BackgroundShadow3,
  BackgroundShadow2,
  BackgroundShadow5,
  BackgroundShadow4,
} from '../figma/cars24-components';

const serifP: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 300,
  fontSize: 18,
  lineHeight: 1.65,
  color: 'var(--secondary)',
  margin: '16px 0 0 0',
  maxWidth: '65ch',
};

const flowStep: React.CSSProperties = {
  flex: '0 0 auto',
  fontSize: 12,
  lineHeight: 1.35,
  color: 'var(--ink)',
  border: '1px solid var(--ink)',
  padding: '10px 12px',
  width: 104,
};

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--muted)',
};

const th: React.CSSProperties = {
  textAlign: 'left',
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--muted)',
  padding: '0 0 10px 0',
  borderBottom: '1px solid var(--ink)',
};

const td: React.CSSProperties = { fontSize: 14, color: 'var(--ink)', padding: '14px 0', borderBottom: '1px solid var(--hairline)' };
const tdMuted: React.CSSProperties = { ...td, color: 'var(--secondary)' };

const priorityRows = [
  { problem: 'No digital tracking of offline leads', c: 5, i: 4, f: 5, score: 100, cut: false },
  { problem: 'Dealer feels they’re oversharing customer data', c: 4, i: 4, f: 4, score: 64, cut: false },
  { problem: 'Duplicate leads found late in the process', c: 3, i: 3, f: 2, score: 18, cut: false },
  { problem: 'In-app chat with the buyer team — cut', c: 2, i: 2, f: 1, score: 4, cut: true },
];

const sections: CSSection[] = [
  {
    id: 'beat-01',
    number: '01',
    title: 'Frame',
    heading: 'Four kinds of dealer, one shared frustration',
    body: (
      <>
        <p style={serifP}>
          New car dealers, used car dealers, used car brokers and freelancers — all on the Cars24 dealer app, all
          with very different businesses. New and used dealers can buy a mismatched car and resell it themselves;
          brokers and freelancers cannot, so their only options are to pass the lead to another dealer or approach
          the customer directly.
        </p>
        <p style={serifP}>
          They span mid-20s to late 50s, urban and rural India, and a wide range of tech confidence — from people
          who live in the app to people who still prefer a phone call. That range set the bar: whatever I designed
          had to be legible to the least tech-savvy dealer on the platform.
        </p>
      </>
    ),
  },
  {
    id: 'beat-02',
    number: '02',
    title: 'The brief',
    heading: 'What Cars24 asked for',
    body: (
      <>
        <p style={serifP}>
          "How can we help dealers generate revenue from leads that aren't aligned with their target market?" A
          monetisation question, framed as a referral programme: build a way for dealers to hand mismatched leads to
          Cars24 and earn commission on them.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start', marginTop: 32 }}>
          <PhoneScreen Component={Container} />
          <p style={{ flex: '1 1 200px', fontSize: 14, lineHeight: 1.65, color: 'var(--secondary)', margin: 0, maxWidth: '42ch' }}>
            The commission promise — up to 3% on every completed purchase, all makes accepted — was never the weak
            link. Dealers wanted it. The handover was what failed.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'beat-03',
    number: '03',
    title: 'The reframe',
    heading: 'The leads already existed — they were being lost, not missed',
    tinted: true,
    body: (
      <p style={{ ...serifP, margin: 0, color: 'var(--secondary)' }}>
        Dealers were already sharing mismatched leads with Cars24 — by phone, offline, to their C24 representative.
        None of it was tracked, and leads were being lost to plain human error. Meanwhile the number of cars on the
        platform had fallen 13.7%. So the problem was not a missing incentive or a missing entry point: it was an
        untracked handover. Digitise the handover and make its state visible, and the supply problem and the
        monetisation problem get solved by the same design.
      </p>
    ),
  },
  {
    id: 'beat-04',
    number: '04',
    title: 'Evidence',
    heading: 'How I know that',
    body: (
      <>
        <p style={serifP}>Two sources, and they agreed. Dealers said what they wanted; platform data said what was quietly going wrong.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginTop: 30 }}>
          <div style={{ flex: '1 1 240px', borderTop: '1px solid var(--ink)', paddingTop: 14 }}>
            <div style={kicker}>What dealers told us</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
              <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--secondary)' }}>
                They want a way to monetise leads that don't suit their customers' needs.
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--secondary)' }}>They need more cars on the platform.</div>
            </div>
          </div>
          <div style={{ flex: '1 1 240px', borderTop: '1px solid var(--ink)', paddingTop: 14 }}>
            <div style={kicker}>What the data told us</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
              <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--secondary)' }}>
                Cars on the platform had dropped <span style={{ color: 'var(--accent)' }}>13.7%</span>.
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--secondary)' }}>
                Offline lead-sharing had no digital tracking, and leads were being lost to human error.
              </div>
            </div>
          </div>
        </div>
        <div style={{ ...serifP, maxWidth: '65ch' }}>
          Roughly 80 dealers — verbal interviews at a Bangalore dealer meetup, after a digital questionnaire went
          unanswered.
        </div>
      </>
    ),
  },
  {
    id: 'beat-05',
    number: '05',
    title: 'The cuts',
    heading: 'What I prioritised, and what I dropped',
    body: (
      <>
        <p style={serifP}>
          Privacy was the constraint that shaped the form. Dealers will hand over a lead but resent feeling like they
          are handing over their book. So submission asks for a phone number and almost nothing else — registration
          and name are optional, and the app fills what it can. Everything scored on criticality × impact ×
          frequency; in-app chat with the buyer team lost and was cut.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', marginTop: 26 }}>
            <thead>
              <tr>
                <th style={th}>Problem</th>
                <th style={th}>Critical</th>
                <th style={th}>Impact</th>
                <th style={th}>Freq.</th>
                <th style={th}>Score</th>
              </tr>
            </thead>
            <tbody>
              {priorityRows.map((r) => (
                <tr key={r.problem}>
                  <td style={r.cut ? tdMuted : td}>{r.problem}</td>
                  <td style={r.cut ? tdMuted : tdMuted}>{r.c}</td>
                  <td style={r.cut ? tdMuted : tdMuted}>{r.i}</td>
                  <td style={r.cut ? tdMuted : tdMuted}>{r.f}</td>
                  <td style={{ ...tdMuted, color: r.cut ? 'var(--muted)' : 'var(--accent)' }}>{r.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'beat-06',
    number: '06',
    title: 'The design',
    heading: 'One lead object, one visible state',
    body: (
      <>
        <p style={serifP}>
          The flow is deliberately short: share a lead, let the database check for duplicates, confirm the seller's
          contact detail — then the lead is either rejected with a reason or verified, and from there converted with
          a commission payout or not converted with a reason. No dead ends: every terminal state carries an
          explanation.
        </p>
        <div style={{ marginTop: 30, overflowX: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 620 }}>
            <div style={flowStep}>Lead sharing</div>
            <span style={{ color: 'var(--muted)', fontSize: 12 }}>→</span>
            <div style={flowStep}>Duplicate check</div>
            <span style={{ color: 'var(--muted)', fontSize: 12 }}>→</span>
            <div style={flowStep}>Seller contact</div>
            <span style={{ color: 'var(--muted)', fontSize: 12 }}>→</span>
            <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: '0 0 auto', fontSize: 12, color: 'var(--secondary)', border: '1px solid var(--hairline)', padding: '8px 10px', width: 100 }}>Rejected</div>
                <span style={{ color: 'var(--muted)', fontSize: 12 }}>→</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>reason shown</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: '0 0 auto', fontSize: 12, color: 'var(--ink)', border: '1px solid var(--sky)', padding: '8px 10px', width: 100 }}>Verified</div>
                <span style={{ color: 'var(--muted)', fontSize: 12 }}>→</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--sky-deep)' }}>converted → payout</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: '0 0 auto', width: 100 }} />
                <span style={{ color: 'var(--muted)', fontSize: 12 }}>→</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>not converted → reason</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--muted)', marginTop: 12 }}>
          The flow, after the cuts. Profile creation sits before this and only happens once.
        </div>
        <p style={serifP}>
          In the interface that becomes a colour-coded state bar and exactly one next action — talk to the customer,
          share the booking link, or nothing at all because Cars24 owns the next move. A card never says "in
          progress" without saying who is holding it.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start', marginTop: 32 }}>
          <PhoneScreen Component={BackgroundShadow3} />
          <p style={{ flex: '1 1 200px', fontSize: 14, lineHeight: 1.65, color: 'var(--secondary)', margin: 0, maxWidth: '42ch' }}>
            My leads — five states, five colours. The state bar is the fastest read on the screen, and the button
            below it is the only thing to do.
          </p>
        </div>
        <p style={serifP}>
          Submission is three fields, only one of them required. Confirmation states the lead strength immediately,
          so a weak lead gets corrected before it enters the funnel rather than dying quietly inside it. Negotiation
          shows the offer history, because "offer not accepted" is useless to a dealer who cannot see the number.
        </p>
        <div style={{ marginTop: 32 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <PhoneScreen Component={BackgroundShadow2} />
            <PhoneScreen Component={BackgroundShadow5} />
            <PhoneScreen Component={BackgroundShadow4} />
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--muted)', marginTop: 12 }}>
          Submitted · in negotiation · deal closed. Each ends with the same question answered: what happens next.
        </div>
      </>
    ),
  },
  {
    id: 'beat-07',
    number: '07',
    title: 'Impact',
    heading: 'What changed after launch',
    body: (
      <>
        <p style={serifP}>
          Cars on the platform rose 21% and active users 11%. The result I care about most is the third one: leads
          that came through this flow converted 17% better than leads from the B2C platform — a dealer-qualified
          lead is simply a better lead, and the flow made those leads visible for the first time.
        </p>
        <p style={serifP}>
          It also widened who could participate: because submission needs no extensive onboarding, non-dealer users
          can share a lead too. Measured over the three months after launch; nothing else of substance shipped in
          that window — only minor UI work on the dealer app.
        </p>
      </>
    ),
  },
  {
    id: 'beat-08',
    number: '08',
    title: 'Reflection',
    heading: "What I'd do differently",
    body: (
      <p style={serifP}>
        I designed the status states before checking which ones operations could reliably emit, so some of what I
        drew had to collapse into a vaguer state late in the build. Next time I'd map the data the business can
        actually confirm before designing the states I'd like to show — a status is only as honest as the reporting
        behind it.
      </p>
    ),
  },
];

export default function Cars24ReferEarn() {
  return (
    <CaseStudyLayout
      kicker="Cars24 · Refer & Earn · 2023"
      title={
        <>
          <span style={{ color: 'var(--accent)' }}>Giving</span> dealers a way to sell the leads they can't use
        </>
      }
      summary="Dealers on Cars24 constantly meet sellers outside their own market segment — wrong make, wrong price band, wrong city. They were passing those leads to Cars24 by phone and WhatsApp, untracked, and a lot of them simply vanished. I designed in-app lead submission and a status system so a dealer can hand over a lead in under a minute and follow it to payout without calling anyone."
      meta={[
        { label: 'Role', value: 'Product designer — owned the flow end to end' },
        { label: 'Team', value: '2 designers — me and an intern — with a PM and engineering' },
        { label: 'Timeframe', value: '4 weeks, from September 2023' },
        { label: 'Platform', value: 'Cars24 dealer app · iOS · Android' },
        { label: 'Users', value: 'Four dealer types — NCD, UCD, UC brokers and freelancers' },
        { label: 'Scope', value: 'Owned lead submission and the status system — not rates or valuation.' },
      ]}
      metrics={[
        { value: '+21%', label: 'Cars on the platform' },
        { value: '+11%', label: 'Active users' },
        { value: '+17%', label: 'Conversion vs. B2C leads' },
      ]}
      hero={
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', alignItems: 'flex-end' }}>
          <PhoneScreen Component={BackgroundShadow} />
          <PhoneScreen Component={Container2} />
          <PhoneScreen Component={BackgroundShadow6} />
        </div>
      }
      heroCaption="Home, submission and lead status — the three points a dealer actually returns to."
      sections={sections}
      notes={[
        {
          title: 'Sidenote',
          body: 'Privacy: dealers guard their customer relationships. Asking for less than we wanted was the price of getting anything at all. Status could also only be as granular as operations could reliably report — anything unconfirmed collapsed into one honest state rather than a guess.',
        },
        {
          title: 'On evidence',
          body: 'Dealer conversations plus platform data. Roughly 80 dealers, interviewed in person at a Bangalore dealer meetup. The written questionnaire we sent first got almost nothing back, so I went to them.',
        },
        {
          title: 'Principles',
          body: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div>01&nbsp; Ask for the least data that still works.</div>
              <div>02&nbsp; Never show a state without a next action.</div>
              <div>03&nbsp; An honest vague state beats a precise guess.</div>
            </div>
          ),
        },
      ]}
      prev={{ kicker: 'Next case study', label: 'Spottabl — three sides, one pipeline', to: '/work/spottabl' }}
      next={{ kicker: 'Back to', label: 'All work', to: '/' }}
    />
  );
}
