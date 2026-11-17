import type { ReactNode } from 'react';

// Shared pieces of the case-study overview, matching the layout first built for OsmO:
// a device beside the headline, a stats row and facts strip under it, three summary
// cards, context lines, stats beside the contents list, and in-section notes.

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--muted)',
};

const serifBody: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 300,
  color: 'var(--secondary)',
};

export type HeadStat = { value: string; label: string };
export type HeadFact = { label: string; value: string };

/** Stats row plus the Role / Team / Timeline / Platform strip, full width under the headline. */
export function HeaderStatsAndFacts({ stats, facts, note }: { stats: HeadStat[]; facts: HeadFact[]; note?: string }) {
  return (
    <div style={{ marginTop: 48 }}>
      <div className="cs-head-grid">
        {stats.map((m) => (
          <div key={m.label}>
            <div style={{ fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--sky)', lineHeight: 1, whiteSpace: 'nowrap' }}>{m.value}</div>
            <div style={{ ...kicker, fontSize: 12, marginTop: 10, whiteSpace: 'nowrap' }}>{m.label}</div>
          </div>
        ))}
      </div>
      {note && (
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--muted)', marginTop: 16 }}>{note}</div>
      )}
      <dl className="cs-head-grid" style={{ margin: '40px 0 0 0', padding: '18px 0', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
        {facts.map((m) => (
          <div key={m.label}>
            <dt style={{ ...kicker, fontSize: 12 }}>{m.label}</dt>
            <dd style={{ margin: '6px 0 0 0', fontSize: 15, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{m.value}</dd>
          </div>
        ))}
      </dl>
      <style>{`
        .cs-head-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 24px; }
        @media (max-width: 759px) {
          .cs-head-grid > div > div, .cs-head-grid dd { white-space: normal !important; }
        }
        @media (min-width: 760px) {
          .cs-head-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </div>
  );
}

/** A captured screen framed as a phone or a browser window, for beside the headline. */
export function HeaderDevice({ src, kind, alt }: { src: string; kind: 'phone' | 'web'; alt: string }) {
  if (kind === 'phone') {
    return (
      <div className="hd-phone" style={{ width: 260, padding: 8, background: '#0B0C10', borderRadius: 42, boxShadow: '0 30px 60px -28px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
        <img src={src} alt={alt} style={{ display: 'block', width: '100%', borderRadius: 34 }} />
      </div>
    );
  }
  return (
    <div className="hd-web" style={{ width: 600, borderRadius: 10, overflow: 'hidden', background: '#FFFFFF', boxShadow: '0 30px 60px -28px rgba(23,26,24,0.35), 0 0 0 1px rgba(23,26,24,0.08)' }}>
      <div style={{ display: 'flex', gap: 5, padding: '8px 10px', background: '#ECEEF0' }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 7, height: 7, borderRadius: 999, background: '#C4C8CC' }} />
        ))}
      </div>
      <img src={src} alt={alt} style={{ display: 'block', width: '100%' }} />
    </div>
  );
}

export type SummaryItem = { label: string; text: ReactNode };

/** Key phrase style inside summary cards. */
export const summaryEm: React.CSSProperties = { color: 'var(--ink)', fontWeight: 500 };

const SUMMARY_COLORS = ['var(--accent)', 'var(--accent)', 'var(--sky-deep)'];

/** The 30-second summary: three numbered cards, plus optional context lines (Users, Scope) below. */
export function OverviewSummary({ items, context }: { items: SummaryItem[]; context?: HeadFact[] }) {
  return (
    <div>
      <div style={kicker}>30-second summary</div>
      <ul className="cs-summary" style={{ listStyle: 'none', padding: 0, margin: '18px 0 0 0', display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        {items.map((item, i) => (
          <li key={item.label} style={{ background: '#FFFFFF', border: '1px solid var(--hairline)', borderTop: `3px solid ${SUMMARY_COLORS[i] ?? 'var(--accent)'}`, padding: '20px 22px 22px', boxShadow: '0 1px 2px rgba(23,26,24,0.04)' }}>
            <div style={{ ...kicker, color: SUMMARY_COLORS[i] ?? 'var(--accent)', display: 'flex', gap: 10 }}>
              <span style={{ color: 'var(--muted)' }}>0{i + 1}</span>
              {item.label}
            </div>
            <p style={{ ...serifBody, fontSize: 17, lineHeight: 1.6, margin: '12px 0 0 0' }}>{item.text}</p>
          </li>
        ))}
      </ul>
      {context && context.length > 0 && (
        <dl className="cs-context" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px 40px', margin: '32px 0 0 0' }}>
          {context.map((m) => (
            <div key={m.label}>
              <dt style={kicker}>{m.label}</dt>
              <dd style={{ margin: '6px 0 0 0', fontSize: 15, lineHeight: 1.5, color: 'var(--ink)', maxWidth: '60ch' }}>{m.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <style>{`
        @media (min-width: 900px) {
          .cs-summary { grid-template-columns: repeat(${items.length}, 1fr) !important; }
          .cs-context { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/** Compact stats shown under the sticky contents list on desktop. */
export function RailStats({ stats }: { stats: HeadStat[] }) {
  return (
    <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {stats.map((m) => (
        <div key={m.label}>
          <div style={{ fontSize: 20, fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--lilac-deep)', lineHeight: 1 }}>{m.value}</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--muted)', marginTop: 6, lineHeight: 1.35 }}>{m.label}</div>
        </div>
      ))}
    </div>
  );
}

/** The side notes (Process, Principles, Credits…) placed inside a section instead of at the page end. */
export function InlineNotes({ notes }: { notes: { title: string; body: ReactNode }[] }) {
  return (
    <div style={{ marginTop: 32, paddingLeft: 24, borderLeft: '1px solid var(--hairline)', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {notes.map((n) => (
        <div key={n.title}>
          <div style={kicker}>{n.title}</div>
          <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--secondary)', marginTop: 8, maxWidth: '52ch' }}>{n.body}</div>
        </div>
      ))}
    </div>
  );
}

/** A section-sized pull quote, accent rule on the left. */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote style={{ borderLeft: '2px solid var(--accent)', padding: '4px 0 4px 22px', margin: '40px 0 0 0' }}>
      <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(24px, 3vw, 30px)', lineHeight: 1.3, letterSpacing: '-0.02em', color: 'var(--ink)', margin: 0, maxWidth: '30ch' }}>
        {children}
      </p>
    </blockquote>
  );
}

/** A former stand-alone section kept as a tinted block inside a merged section (e.g. the reframe). */
export function TintedBlock({ label, heading, children }: { label: string; heading: string; children: ReactNode }) {
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid var(--hairline)', borderRadius: 8, padding: 'clamp(24px, 3.5vw, 36px)', boxShadow: '0 1px 2px rgba(23,26,24,0.04), 0 24px 40px -32px rgba(23,26,24,0.25)', marginTop: 32 }}>
      <div style={{ ...kicker, color: 'var(--accent)' }}>{label}</div>
      <h3 style={{ fontSize: 21, fontWeight: 600, letterSpacing: '-0.01em', margin: '12px 0 0 0' }}>{heading}</h3>
      {children}
    </div>
  );
}

/** Heading for a former section merged into another as a subsection. */
export function SubsectionHead({ label, heading }: { label: string; heading: string }) {
  return (
    <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--hairline)' }}>
      <div style={kicker}>{label}</div>
      <h3 style={{ fontSize: 21, fontWeight: 600, letterSpacing: '-0.01em', margin: '10px 0 0 0' }}>{heading}</h3>
    </div>
  );
}
