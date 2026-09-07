import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

const kickerStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--muted)',
};

export interface MetaItem {
  label: string;
  value: ReactNode;
}

export interface Metric {
  value: string;
  label: string;
  color?: string;
}

export interface CSSection {
  id: string;
  number: string;
  title: string;
  heading: string;
  body: ReactNode;
  tinted?: boolean;
}

export interface CSNote {
  title: string;
  body: ReactNode;
}

export interface PrevNext {
  kicker: string;
  label: string;
  to: string;
}

export default function CaseStudyLayout({
  kicker,
  title,
  summary,
  meta,
  metrics,
  hero,
  heroCaption,
  sections,
  notes,
  prev,
  next,
}: {
  kicker: string;
  title: ReactNode;
  summary: string;
  meta: MetaItem[];
  metrics?: Metric[];
  hero?: ReactNode;
  heroCaption?: string;
  sections: CSSection[];
  notes?: CSNote[];
  prev?: PrevNext;
  next?: PrevNext;
}) {
  const [active, setActive] = useState(sections[0]?.id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
          setActive(top.target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    sections.forEach((s) => {
      const el = sectionRefs.current[s.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <main style={{ margin: '0 auto', maxWidth: 1344, padding: '0 clamp(20px, 5vw, 72px) 96px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px 40px', padding: '72px 0 0 0' }}>
        <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          {meta.map((m) => (
            <div key={m.label}>
              <div style={kickerStyle}>{m.label}</div>
              <div style={{ fontSize: 15, color: 'var(--ink)', marginTop: 6 }}>{m.value}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: '1 1 520px' }}>
          <div style={kickerStyle}>{kicker}</div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 3.8vw, 50px)',
              lineHeight: 1.06,
              letterSpacing: '-0.035em',
              margin: '12px 0 0 0',
              maxWidth: '22ch',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontSize: 20,
              lineHeight: 1.6,
              color: 'var(--secondary)',
              margin: '26px 0 0 0',
              maxWidth: '58ch',
            }}
          >
            {summary}
          </p>
          {metrics && metrics.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px 56px', marginTop: 44 }}>
              {metrics.map((m) => (
                <div key={m.label}>
                  <div style={{ fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 400, letterSpacing: '-0.03em', color: m.color ?? 'var(--sky)', lineHeight: 1 }}>
                    {m.value}
                  </div>
                  <div style={{ ...kickerStyle, marginTop: 12 }}>{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--hairline)', marginTop: 56 }} />

      {hero && (
        <div style={{ marginTop: 40 }}>
          {hero}
          {heroCaption && (
            <div style={{ ...kickerStyle, textTransform: 'none', letterSpacing: '0.02em', marginTop: 16 }}>{heroCaption}</div>
          )}
        </div>
      )}

      <div className="cs-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 40, marginTop: 72, alignItems: 'flex-start' }}>
        <aside
          className="cs-rail"
          style={{
            flex: '0 0 184px',
            position: 'sticky',
            top: 24,
            alignSelf: 'flex-start',
            maxHeight: 'calc(100vh - 48px)',
            overflowY: 'auto',
          }}
        >
          <div style={{ ...kickerStyle, borderBottom: '1px solid var(--ink)', paddingBottom: 12 }}>Contents</div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 14 }}>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: '5px 0',
                  fontSize: 14,
                  color: active === s.id ? 'var(--accent)' : 'var(--secondary)',
                  borderLeft: `2px solid ${active === s.id ? 'var(--accent)' : 'transparent'}`,
                  paddingLeft: 10,
                  marginLeft: -12,
                }}
              >
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>{s.number}</span>
                {s.title}
              </a>
            ))}
          </div>
        </aside>

        <div className="cs-main" style={{ flex: '1 1 300px', minWidth: 0, maxWidth: 640 }}>
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              ref={(el) => {
                sectionRefs.current[s.id] = el;
              }}
              style={
                s.tinted
                  ? { background: '#E6EDF2', borderLeft: '3px solid var(--accent)', padding: '28px 32px', marginBottom: 56 }
                  : { paddingBottom: 56 }
              }
            >
              <div style={{ ...kickerStyle, color: s.tinted ? 'var(--accent)' : 'var(--muted)' }}>
                {s.number} — {s.title}
              </div>
              <h2 style={{ fontSize: 25, fontWeight: 500, letterSpacing: '-0.025em', margin: '14px 0 0 0' }}>{s.heading}</h2>
              <div style={{ marginTop: 16 }}>{s.body}</div>
            </section>
          ))}

          {notes && notes.length > 0 && (
            <div style={{ marginTop: 24, paddingLeft: 24, borderLeft: '1px solid var(--hairline)', display: 'flex', flexDirection: 'column', gap: 28 }}>
              {notes.map((n) => (
                <div key={n.title}>
                  <div style={kickerStyle}>{n.title}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--secondary)', marginTop: 8, maxWidth: '52ch' }}>{n.body}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(prev || next) && (
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', borderTop: '1px solid var(--ink)', marginTop: 72, paddingTop: 24 }}>
          {prev ? (
            <Link to={prev.to} style={{ color: 'var(--ink)' }}>
              <div style={kickerStyle}>{prev.kicker}</div>
              <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em', marginTop: 8 }}>{prev.label} →</div>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={next.to} style={{ color: 'var(--ink)', textAlign: 'right' }}>
              <div style={kickerStyle}>{next.kicker}</div>
              <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em', marginTop: 8 }}>{next.label} →</div>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}

      <style>{`
        @media (max-width: 1140px) {
          .cs-rail { position: static; max-height: none; flex: 0 0 100%; }
        }
        @media (min-width: 1141px) {
          .cs-row { flex-wrap: nowrap; }
        }
      `}</style>
    </main>
  );
}
