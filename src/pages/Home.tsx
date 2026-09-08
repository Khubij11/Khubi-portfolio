import { Link } from 'react-router-dom';
import WorkRow, { WorkTableHeader, type WorkRowData } from '../components/WorkRow';

const complexData: WorkRowData[] = [
  {
    year: '2024 — 26',
    title: 'Wells Fargo — financial health tools',
    owned: 'Owned the financial health surfaces end to end — not the scoring behind them.',
    platform: 'Web · Enterprise',
    outcome: 'A redesign approved and queued for release',
    evidence: 'Approved',
    to: '/work/wells-fargo-financial-health',
  },
  {
    year: '2025',
    title: 'Wells Fargo — AI tool for PMs',
    owned: 'Owned the flow and the screens — not retrieval, indexing or model behaviour.',
    platform: 'Web · Internal',
    outcome: 'An answer a PM can repeat out loud',
    evidence: 'Shipped internally',
    to: '/work/wells-fargo-ai-tool',
  },
  {
    year: '2021 — 22',
    title: 'Klub — syndicates on the patron platform',
    owned: 'Productised the syndicate flow inside the existing patrons app, without disrupting it.',
    platform: 'Web app',
    outcome: 'Offline syndicate deals made self-serve',
    evidence: 'Shipped',
    to: '/work/klub',
  },
];

const systemsScale: WorkRowData[] = [
  {
    year: '2019 — 21',
    title: 'Spottabl — three sides, one pipeline',
    owned: 'Design across the admin platform, the SaaS hiring product and the consumer site.',
    platform: 'Web',
    outcome: 'One vocabulary across three products',
    evidence: 'Shipped',
    to: '/work/spottabl',
  },
];

const zeroToOne: WorkRowData[] = [
  {
    year: '2025',
    title: 'Wells Fargo — AI tool for PMs',
    owned: 'What it could claim, how it showed uncertainty, where a human had to decide.',
    platform: 'Web · Internal',
    outcome: 'First internal tool built by the India team',
    evidence: 'Shipped',
    to: '/work/wells-fargo-ai-tool',
  },
  {
    year: '2023',
    title: 'Cars24 — Refer & Earn',
    owned: 'Owned lead submission and the status system — not rates or valuation.',
    platform: 'iOS · Android',
    outcome: 'Cars on platform up 21%',
    evidence: 'Shipped · measured',
    to: '/work/cars24-refer-earn',
  },
  {
    year: '2022',
    title: 'Cars24 — Challan payments',
    owned: 'Owned the payment flow end to end, including trust states.',
    platform: 'iOS · Android',
    outcome: '16,193 visitors in the first 8 days; 4,422 challans paid',
    evidence: 'Shipped · measured',
    to: '/work/cars24-challans',
  },
];

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--muted)',
};

function IllustrationCard() {
  return (
    <div
      style={{
        minWidth: 0,
        position: 'relative',
        zIndex: 2,
        marginTop: 'clamp(-140px, calc(-140px + (1100px - 100vw) * 0.6), -48px)',
        padding: '22px 24px 20px 24px',
        background: 'linear-gradient(168deg, #FBFAF7 0%, #F1EFE9 100%)',
        borderRadius: 3,
        boxShadow: '0 30px 46px -30px rgba(23,26,24,0.4), inset 0 1px 0 rgba(255,255,255,0.9)',
        transform: 'rotate(-0.7deg)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -11,
          left: '50%',
          transform: 'translateX(-50%) rotate(2.4deg)',
          width: 92,
          height: 22,
          background: 'rgba(190,66,41,0.16)',
          borderLeft: '1px dashed rgba(190,66,41,0.35)',
          borderRight: '1px dashed rgba(190,66,41,0.35)',
        }}
      />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--muted)' }}>
        Off the clock
      </div>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 300,
          fontSize: 'clamp(26px, 2.6vw, 34px)',
          lineHeight: 1.06,
          letterSpacing: '-0.03em',
          margin: '10px 0 0 0',
          color: 'var(--ink)',
        }}
      >
        I <span style={{ color: 'var(--accent)' }}>design</span>,<br />
        <span style={{ color: 'var(--sky-deep)' }}>bake</span> &amp; <span style={{ color: 'var(--green)' }}>garden</span>.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 26, alignItems: 'end' }}>
        <div>
          <div style={{ height: 84, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <img
              src="/assets/illo-whisk.png"
              alt="Whisk in a mixing bowl"
              style={{ display: 'block', height: 84, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 10px rgba(23,26,24,0.14))' }}
            />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, lineHeight: 1.5, letterSpacing: '0.04em', color: 'var(--secondary)', marginTop: 8 }}>
            Timer's on. The cakes rise.
          </div>
        </div>
        <div>
          <div style={{ height: 84, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 4 }}>
            <img
              src="/assets/illo-plant.png"
              alt="Monstera in a two-tone pot"
              style={{ display: 'block', height: 92, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 10px rgba(23,26,24,0.14))' }}
            />
            <img
              src="/assets/illo-spade.png"
              alt="Garden spade"
              style={{ display: 'block', height: 50, width: 'auto', flex: '0 0 auto', marginBottom: 4, objectFit: 'contain', filter: 'drop-shadow(0 6px 8px rgba(23,26,24,0.16))' }}
            />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, lineHeight: 1.5, letterSpacing: '0.04em', color: 'var(--secondary)', marginTop: 8 }}>
            The coriander keeps me humble.
          </div>
        </div>
      </div>
    </div>
  );
}

function GroupHeading({ title, note }: { title: string; note: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
      <h2 style={{ fontSize: 'clamp(22px, 2.2vw, 27px)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0 }}>{title}</h2>
      <span style={{ fontSize: 14, color: 'var(--muted)', maxWidth: '62ch' }}>{note}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ margin: '0 auto', maxWidth: 1344, padding: '0 clamp(20px, 5vw, 72px) 96px' }}>
      {/* Hero */}
      <section style={{ position: 'relative', padding: '64px 24px 64px 0', marginRight: 'calc(-1 * clamp(20px, 5vw, 72px))', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            right: '-2%',
            top: 10,
            width: 'clamp(160px, 19vw, 260px)',
            aspectRatio: '1',
            borderRadius: '50%',
            backgroundImage:
              'repeating-linear-gradient(58deg, rgba(190,66,41,0.55) 0 7px, rgba(190,66,41,0) 7px 17px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '-34%',
            top: 560,
            width: '42%',
            maxWidth: 300,
            aspectRatio: '1.6 / 1',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(123,166,201,0.20), rgba(123,166,201,0) 76%)',
            filter: 'blur(18px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-4%',
            top: 210,
            width: '46%',
            aspectRatio: '1.25 / 1',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(12,129,57,0.30), rgba(12,129,57,0) 74%)',
            filter: 'blur(24px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '16%',
            bottom: '-6%',
            width: '44%',
            aspectRatio: '2 / 1',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(190,66,41,0.16), rgba(190,66,41,0) 74%)',
            filter: 'blur(22px)',
          }}
        />

        <h1
          style={{
            position: 'relative',
            margin: '18px 0 0 0',
            fontFamily: 'var(--font-serif)',
            fontWeight: 300,
            fontSize: 'clamp(40px, 6vw, 88px)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: 'var(--ink)',
            maxWidth: '62%',
          }}
        >
          <span style={{ display: 'block' }}>
            <span style={{ color: 'var(--accent)' }}>Product</span> designer
          </span>
          <span style={{ display: 'block' }}>who untangles</span>
          <span style={{ display: 'block', fontStyle: 'italic', color: 'var(--secondary)' }}>complicated things</span>
        </h1>

        <div
          className="hero-grid"
          style={{
            position: 'relative',
            marginTop: 52,
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(300px, 0.85fr)',
            gap: '48px 64px',
            alignItems: 'start',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 'clamp(19px, 1.9vw, 25px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.32, margin: 0, maxWidth: '30ch' }}>
              Products can be complicated. Using them shouldn't be.
            </p>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 300,
                fontSize: 19,
                lineHeight: 1.62,
                color: 'var(--secondary)',
                margin: '20px 0 0 0',
                maxWidth: '52ch',
              }}
            >
              Seven years of taking products from messy questions to usable interfaces — most useful when the
              constraint isn't visual, but the system is complicated and the stakes are real.
            </div>
          </div>

          <IllustrationCard />
        </div>
      </section>

      {/* Work index */}
      <section style={{ padding: '88px 0 0 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', borderBottom: '1px solid var(--ink)', paddingBottom: 14 }}>
          <span style={kicker}>Selected work</span>
          <span style={{ ...kicker, color: 'var(--muted)' }}>6 projects · 2019 — 2026</span>
        </div>

        <div style={{ paddingTop: 44 }}>
          <GroupHeading title="Making complex data legible" note="Dense information, made actionable" />
          <WorkTableHeader />
          {complexData.map((r) => (
            <WorkRow key={r.title} row={r} />
          ))}
        </div>

        <div style={{ paddingTop: 56 }}>
          <GroupHeading title="Systems and scale" note="Across teams, not inside one feature" />
          <WorkTableHeader />
          {systemsScale.map((r) => (
            <WorkRow key={r.title} row={r} />
          ))}
        </div>

        <div style={{ paddingTop: 56 }}>
          <GroupHeading title="0 → 1 under constraint" note="No existing product, usually no time" />
          <WorkTableHeader />
          {zeroToOne.map((r) => (
            <WorkRow key={r.title + r.owned} row={r} />
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 32px', alignItems: 'baseline', padding: '26px 0 0 0' }}>
          <span style={{ ...kicker, flex: '0 0 88px' }}>Evidence key</span>
          <span style={{ fontSize: 13, color: 'var(--secondary)' }}>
            <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: 999, background: '#DCF0E4', border: '1px solid #A8D5BC', marginRight: 7, verticalAlign: 'baseline' }} />
            <span style={{ color: 'var(--ink)' }}>Shipped · measured</span> — live, with numbers
          </span>
          <span style={{ fontSize: 13, color: 'var(--secondary)' }}>
            <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: 999, background: '#DDF0F4', border: '1px solid #A6D4DE', marginRight: 7, verticalAlign: 'baseline' }} />
            <span style={{ color: 'var(--ink)' }}>Shipped</span> — live, not instrumented
          </span>
          <span style={{ fontSize: 13, color: 'var(--secondary)' }}>
            <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: 999, background: '#FBEEDC', border: '1px solid #E8CFA4', marginRight: 7, verticalAlign: 'baseline' }} />
            <span style={{ color: 'var(--ink)' }}>Approved</span> — signed off, not yet live
          </span>
          <span style={{ fontSize: 13, color: 'var(--secondary)' }}>
            <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: 999, background: '#F0EAF7', border: '1px solid #D5C4E8', marginRight: 7, verticalAlign: 'baseline' }} />
            <span style={{ color: 'var(--ink)' }}>Concept</span> — self-initiated
          </span>
        </div>
      </section>

      {/* Writing */}
      <section style={{ padding: '72px 0 0 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', borderBottom: '1px solid var(--ink)', paddingBottom: 14 }}>
          <span style={kicker}>Writing</span>
          <span style={{ ...kicker, color: 'var(--muted)' }}>On Medium</span>
        </div>
        <a
          href="https://medium.com/@khubi.brahmbhatt/designing-in-the-age-of-instant-answers-9fb5a3dec812"
          target="_blank"
          rel="noopener"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', alignItems: 'flex-start', padding: '24px 0', borderBottom: '1px solid var(--hairline)', color: 'var(--ink)' }}
        >
          <span style={{ flex: '0 0 72px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', paddingTop: 4 }}>Sep 2026</span>
          <span style={{ flex: '1 1 420px' }}>
            <span style={{ display: 'block', fontSize: 19, fontWeight: 500, letterSpacing: '-0.02em' }}>
              Designing in the Age of Instant Answers
            </span>
            <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 17, lineHeight: 1.6, color: 'var(--secondary)', marginTop: 8, maxWidth: '58ch' }}>
              On losing tolerance for the blank page — and the rule I now keep: no AI in the first 20 minutes of a
              project, so I still have an opinion before the tool offers one.
            </span>
          </span>
          <span style={{ flex: '0 0 150px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--secondary)', paddingTop: 4 }}>4 min read</span>
          <span style={{ flex: '0 0 20px', color: 'var(--muted)', paddingTop: 3 }}>↗</span>
        </a>
      </section>

      {/* Footer */}
      <footer style={{ display: 'flex', flexWrap: 'wrap', gap: 32, borderTop: '1px solid var(--ink)', marginTop: 88, paddingTop: 22 }}>
        <div style={{ flex: '1 1 220px' }}>
          <div style={kicker}>Elsewhere</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14, alignItems: 'flex-start' }}>
            <a href="https://linkedin.com/in/khubijoshi" style={{ fontSize: 15, color: 'var(--ink)' }}>
              LinkedIn
            </a>
            <Link to="/resume" style={{ fontSize: 15, color: 'var(--ink)' }}>
              Read the résumé
            </Link>
          </div>
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <div style={kicker}>Open to</div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--secondary)', margin: '14px 0 0 0', maxWidth: '44ch' }}>
            Senior and lead product design roles, Bangalore or remote. <Link to="/contact">Freelance</Link> in the
            meantime.
          </p>
        </div>
        <div style={{ flex: '1 1 280px' }}>
          <div style={kicker}>Get in touch</div>
          <a href="mailto:khubi.brahmbhatt@gmail.com" style={{ display: 'inline-block', fontSize: 'clamp(17px, 1.8vw, 22px)', fontWeight: 400, letterSpacing: '-0.02em', marginTop: 12, color: 'var(--ink)' }}>
            khubi.brahmbhatt@gmail.com
          </a>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--muted)', marginTop: 18 }}>
            © 2026 Khubi Brahmbhatt
          </div>
        </div>
      </footer>
    </main>
  );
}
