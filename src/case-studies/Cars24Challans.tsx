import CaseStudyLayout, { type CSSection } from '../components/CaseStudyLayout';
import ScaledPhone from '../components/ScaledPhone';
import ChallanScreen from './cars24-challan/ChallanScreen';

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

function TwoUp({ screens, note, notes }: { screens: Array<'landing' | 'pending' | 'select' | 'paid' | 'whatsapp' | 'summary1' | 'summary2' | 'verify' | 'empty'>; note?: string; notes?: Array<{ title: string; body: string }> }) {
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 30, alignItems: 'flex-start' }}>
        {screens.map((s) => (
          <ScaledPhone key={s}>
            <ChallanScreen screen={s} />
          </ScaledPhone>
        ))}
        {notes && (
          <div style={{ flex: '1 1 180px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {notes.map((n) => (
              <div key={n.title} style={{ borderTop: '1px solid var(--ink)', paddingTop: 12 }}>
                <div style={kicker}>{n.title}</div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--secondary)', marginTop: 8 }}>{n.body}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {note && <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--muted)', marginTop: 12 }}>{note}</div>}
    </>
  );
}

const sections: CSSection[] = [
  {
    id: 'ch-01',
    number: '01',
    title: 'Business need',
    heading: 'Increase organic visits from potential car sellers',
    body: (
      <p style={serifP}>
        The route we took was to solve a core problem car owners already face, rather than to advertise harder. Do
        that and you establish loyalty and stickiness with people who will be selling a car in the future — which
        is the only audience the business actually needs.
      </p>
    ),
  },
  {
    id: 'ch-02',
    number: '02',
    title: 'The brief',
    heading: 'Simplify and expedite settling a challan',
    body: (
      <p style={serifP}>
        "Create a user-centric platform that simplifies and expedites the process of settling challans, providing a
        hassle-free experience for users." Two verbs worth separating: <em>simplify</em> is a design problem,{' '}
        <em>expedite</em> is an operations one — and only one of them was mine to solve.
      </p>
    ),
  },
  {
    id: 'ch-03',
    number: '03',
    title: 'Our user',
    heading: 'Wider than "a car owner"',
    body: (
      <p style={serifP}>
        Challan payment products serve individuals, businesses, government agencies, legal bodies and non-profits.
        They all rely on the same thing: settling fines, taxes, bills and fees without a physical visit and without
        paperwork. The breadth is the design constraint — a fleet manager and a first-time owner have to be served
        by the same screen.
      </p>
    ),
  },
  {
    id: 'ch-04',
    number: '04',
    title: 'TL;DR',
    heading: 'What users and data each told us',
    body: (
      <>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginTop: 28 }}>
          <div style={{ flex: '1 1 240px', borderTop: '1px solid var(--ink)', paddingTop: 16 }}>
            <div style={kicker}>Things users told us</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--secondary)' }}>"Can Cars24 be used after the purchase of my car as well?"</div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--secondary)' }}>They need one platform to pay challans across India.</div>
            </div>
          </div>
          <div style={{ flex: '1 1 240px', borderTop: '1px solid var(--ink)', paddingTop: 16 }}>
            <div style={kicker}>Things data told us</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--secondary)' }}>Organic visits from potential sellers needed to go up.</div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--secondary)' }}>In 2022 the challan-payment market carried a revenue possibility of ₹7,563.6 crore.</div>
            </div>
          </div>
        </div>
        <p style={{ ...serifP, margin: '26px 0 0 0' }}>
          The two sides agreed, which doesn't happen often: users wanted a reason to come back after buying, and the
          business needed exactly that.
        </p>
      </>
    ),
  },
  {
    id: 'ch-05',
    number: '05',
    title: 'The flow',
    heading: 'Five steps, one input',
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 26 }}>
        {[
          'Cars24 periodically notifies users to check their challans.',
          'The user enters the vehicle registration number they want to check.',
          'They see every pending and paid challan against that vehicle.',
          'They settle the challans with Cars24.',
          "If they opted for Cars24's assistance, they're notified when the challans are settled.",
        ].map((t, i) => (
          <div key={t} style={{ display: 'flex', gap: 16, borderTop: '1px solid var(--hairline)', paddingTop: 14 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'var(--muted)', flex: '0 0 22px' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--secondary)' }}>{t}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'ch-06',
    number: '06',
    title: 'Getting in',
    heading: 'One field, no login',
    body: (
      <>
        <p style={serifP}>
          The banner carries the three USPs so someone can decide in a glance whether this page is for them. Below
          it, a single field: only the vehicle number is required, because the phone number is already registered.
          Verification then happens without asking for that number again — one tap on the number Truecaller already
          knows.
        </p>
        <TwoUp
          screens={['landing', 'verify']}
          notes={[
            { title: 'USPs', body: 'Check status, pay and manage, get assistance — on the banner, not buried in a features list.' },
            { title: 'Easy login', body: 'Vehicle number only; the phone number is already on file.' },
            { title: 'Easy verification', body: 'No re-entering the mobile number, so login costs one tap.' },
          ]}
        />
      </>
    ),
  },
  {
    id: 'ch-07',
    number: '07',
    title: 'Listing & detail',
    heading: 'Outstanding, new, and the ones that went to court',
    body: (
      <>
        <p style={serifP}>
          Users can access and pay both outstanding and new challans in the app. And when a challan goes unpaid for
          90 days and becomes a court challan, they keep the ability to pay through the app — the service extends
          past the online-challan stage, which is exactly where most products hand you back to a queue.
        </p>
        <TwoUp
          screens={['pending', 'paid']}
          notes={[
            { title: 'Reg no', body: "Kept at the top and editable, so checking a second vehicle doesn't mean logging out and back in." },
            { title: 'Card design', body: 'Fine, offence, issue date and the one action — in that order, so the card is readable at a glance.' },
          ]}
        />
        <p style={{ ...serifP, marginTop: 32 }}>
          The warning strip sits above the tabs rather than inside a card. It's the one piece of copy on the screen
          that isn't about a transaction, and it earns its place: not paying is a criminal offence, and most people
          don't know that.
        </p>
      </>
    ),
  },
  {
    id: 'ch-08',
    number: '08',
    title: 'Paying',
    heading: 'Be honest about the fee, and about the wait',
    body: (
      <>
        <p style={serifP}>
          Cars24 charges an agent fee, so the summary shows it as a line rather than folding it into a total — with
          "Why agent fee?" right there for anyone who wants the reasoning. VRN and WhatsApp number sit at the top for
          verification before money moves.
        </p>
        <p style={serifP}>
          Selecting several challans and paying once saves real time. But online challans settle in two days and
          court challans take around thirty, so a combined payment splits into two labelled groups with their own
          timelines — one total, two honest promises.
        </p>
        <TwoUp screens={['select', 'summary1', 'summary2']} note="Select, review, and the split-settlement summary for a mixed batch." />
      </>
    ),
  },
  {
    id: 'ch-09',
    number: '09',
    title: 'No challans',
    heading: 'Give the good outcome something to do',
    body: (
      <>
        <p style={serifP}>
          An empty state here is the best possible result, so it isn't treated as an error. Users can share their
          challan-free status with friends and family — a small piece of pride, and the only place in the flow where
          the product asks for something instead of giving.
        </p>
        <TwoUp screens={['empty']} notes={[{ title: 'WhatsApp updates', body: 'Challans arrive on a schedule nobody controls, so the product offers to tell you instead of asking you to check. Opt-in sits on the registration card, where the number already is.' }]} />
      </>
    ),
  },
];

export default function Cars24Challans() {
  return (
    <CaseStudyLayout
      kicker="Cars24 · Challan payments · 2022"
      title={
        <>
          <span style={{ color: 'var(--accent)' }}>A</span> reason to open a car-selling app when you're not selling
          a car
        </>
      }
      summary="Cars24 needed more organic visits from people who might sell a car one day. Traffic challans turned out to be the way in: a real problem car owners already have, on a schedule nobody controls. Solve it well and the app earns a reason to be opened between transactions — which is where loyalty and stickiness actually come from."
      meta={[
        { label: 'Role', value: 'Product designer — owned the challan flow end to end' },
        { label: 'Team', value: '2 designers — me and an intern — with a PM and engineering' },
        { label: 'Timeframe', value: '2022' },
        { label: 'Platform', value: 'Cars24 app · iOS, Android and web' },
        { label: 'Users', value: 'Individuals, businesses, government agencies, legal bodies and non-profits' },
        { label: 'Scope', value: 'Owned the flows, screens and the eChallan landing page. Did not own agent operations, fee structure or the government integrations.' },
      ]}
      metrics={[
        { value: '16,193', label: 'Visitors in 8 days post-launch', color: 'var(--accent)' },
        { value: '4,422', label: 'Users who paid a challan online', color: 'var(--accent)' },
        { value: '₹2,36,697', label: 'In challans settled', color: 'var(--accent)' },
      ]}
      hero={
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
          <ScaledPhone>
            <ChallanScreen screen="landing" />
          </ScaledPhone>
          <ScaledPhone>
            <ChallanScreen screen="pending" />
          </ScaledPhone>
          <ScaledPhone>
            <ChallanScreen screen="summary1" />
          </ScaledPhone>
          <ScaledPhone>
            <ChallanScreen screen="empty" />
          </ScaledPhone>
        </div>
      }
      heroCaption="Entry, listing, payment, and the state everyone wants to be in."
      sections={sections}
      prev={{ kicker: 'Next case study', label: 'Klub — syndicates on the patron platform', to: '/work/klub' }}
      next={{ kicker: 'Back to', label: 'All work', to: '/' }}
    />
  );
}
