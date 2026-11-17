import { Link } from 'react-router-dom';
import { evidenceColor } from './EvidenceChip';

// Every text column opens on one shared 26px line (title / platform / status), so the
// second lines (description / domain / outcome) also start level.
const FIRST_LINE = 26;
const META_LINE: React.CSSProperties = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: `${FIRST_LINE}px`, height: FIRST_LINE, whiteSpace: 'nowrap' };

export interface WorkRowData {
  year: string;
  title: string;
  owned: string;
  platform: string;
  /** Industry or product domain, shown under the platform. */
  domain?: string;
  outcome: string;
  evidence: string;
  to?: string;
  /** Kind-of-work tags — the old category groupings, kept as chips once the list went date-wise. */
  tags?: string[];
  /** Composed thumbnail shown in place of the old Year column. */
  thumb?: WorkThumbData;
}

export interface WorkThumbData {
  /** Screen capture from the case study itself. */
  src: string;
  /** 'phone' frames the screen as a phone; 'web' as a browser window. */
  kind: 'phone' | 'web';
  /** Two-stop background tint, light to slightly deeper. */
  tint: [string, string];
}

const THUMB_W = 200;
const THUMB_H = 125;

function WorkThumb({ src, kind, tint }: WorkThumbData) {
  return (
    <span
      className="work-thumb"
      style={{
        position: 'relative',
        display: 'block',
        width: THUMB_W,
        height: THUMB_H,
        borderRadius: 6,
        overflow: 'hidden',
        background: `linear-gradient(155deg, ${tint[0]} 0%, ${tint[1]} 100%)`,
      }}
    >
      {kind === 'phone' ? (
        <span
          className="work-thumb-device"
          style={{
            position: 'absolute',
            left: '50%',
            top: 12,
            width: 92,
            marginLeft: -46,
            padding: 3,
            background: '#0B0C10',
            borderRadius: 14,
            boxShadow: '0 16px 26px -14px rgba(23,26,24,0.55)',
          }}
        >
          <img src={src} alt="" loading="lazy" style={{ display: 'block', width: '100%', borderRadius: 11 }} />
        </span>
      ) : (
        <span
          className="work-thumb-device"
          style={{
            position: 'absolute',
            left: 20,
            top: 18,
            width: 220,
            borderRadius: '5px 5px 0 0',
            overflow: 'hidden',
            background: '#FFFFFF',
            boxShadow: '0 16px 26px -14px rgba(23,26,24,0.45), 0 0 0 1px rgba(23,26,24,0.06)',
          }}
        >
          <span style={{ display: 'flex', gap: 3, padding: '4px 6px', background: '#ECEEF0' }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: 4, height: 4, borderRadius: 999, background: '#C4C8CC' }} />
            ))}
          </span>
          <img src={src} alt="" loading="lazy" style={{ display: 'block', width: '100%' }} />
        </span>
      )}
    </span>
  );
}

// Tinted like EvidenceChip, but a separate hue family so the two kinds of pill
// on a row — outcome evidence vs. kind-of-work tag — read as different things.
const TAG_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  'Complex data': { color: '#8A3620', bg: '#F6E4DE', border: '#E8BDAE' },
  '0 → 1': { color: '#2C4F6B', bg: '#E4EDF3', border: '#BCD3E2' },
  'Systems & scale': { color: '#6B5B1F', bg: '#F3EFDE', border: '#DCD2A8' },
};

function CategoryTag({ label }: { label: string }) {
  const s = TAG_STYLES[label] ?? { color: 'var(--muted)', bg: 'transparent', border: 'var(--hairline)' };
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-ui)',
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 999,
        padding: '3px 10px',
      }}
    >
      {label}
    </span>
  );
}

export function WorkTableHeader() {
  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-ui)',
    fontSize: 13,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--muted)',
  };
  return (
    <div
      className="work-table-header"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px 24px',
        padding: '0 0 10px 0',
        ...labelStyle,
      }}
    >
      <span className="work-thumb-col" style={{ flex: `0 0 ${THUMB_W}px` }} />
      <span style={{ flex: '1 1 320px' }}>Project · what I owned</span>
      <span style={{ flex: '0 0 190px', whiteSpace: 'nowrap' }}>Platform · domain</span>
      <span style={{ flex: '1 1 240px' }}>Outcome · evidence</span>
      <span style={{ flex: '0 0 20px' }} />
    </div>
  );
}

export default function WorkRow({ row }: { row: WorkRowData }) {
  const content = (
    <>
      <span className="work-thumb-col" style={{ flex: `0 0 ${THUMB_W}px` }}>
        {row.thumb && <WorkThumb {...row.thumb} />}
      </span>
      <span style={{ flex: '1 1 320px' }}>
        <span style={{ display: 'block', fontSize: 19, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: `${FIRST_LINE}px` }}>
          {row.title}
        </span>
        <span
          style={{
            display: 'block',
            fontSize: 14,
            lineHeight: 1.55,
            color: 'var(--secondary)',
            marginTop: 6,
            maxWidth: '52ch',
          }}
        >
          {row.owned}
        </span>
        <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginTop: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', marginRight: 6 }}>
            {row.year}
            <span className="work-platform-inline"> · {row.platform}</span>
          </span>
          {row.tags?.map((t) => (
            <CategoryTag key={t} label={t} />
          ))}
        </span>
      </span>
      <span className="work-meta-col" style={{ flex: '0 0 190px' }}>
        <span style={{ ...META_LINE, color: 'var(--secondary)' }}>{row.platform}</span>
        {row.domain && (
          <span style={{ display: 'block', marginTop: 6, fontSize: 14, lineHeight: 1.45, color: 'var(--secondary)' }}>{row.domain}</span>
        )}
      </span>
      <span style={{ flex: '1 1 240px' }}>
        <span style={{ ...META_LINE, display: 'flex', alignItems: 'center', gap: 7, color: 'var(--secondary)' }}>
          <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: 999, background: evidenceColor(row.evidence), flex: '0 0 auto' }} />
          {row.evidence}
        </span>
        <span style={{ display: 'block', marginTop: 6, fontSize: 15, lineHeight: 1.45, color: 'var(--ink)' }}>{row.outcome}</span>
      </span>
      <span className="work-arrow" style={{ flex: '0 0 20px', color: 'var(--muted)', lineHeight: `${FIRST_LINE}px` }}>{row.to ? '→' : ''}</span>
    </>
  );

  const style: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px 24px',
    alignItems: 'flex-start',
    padding: '24px 12px 24px 9px',
    margin: '0 -12px',
    borderBottom: '1px solid var(--hairline)',
    borderLeft: '3px solid transparent',
    color: 'var(--ink)',
    borderRadius: 4,
    transition: 'background-color 150ms ease, border-color 150ms ease',
  };

  if (row.to) {
    return (
      <Link to={row.to} className="work-row" style={style}>
        {content}
      </Link>
    );
  }
  return <div style={style}>{content}</div>;
}
