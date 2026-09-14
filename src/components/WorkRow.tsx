import { Link } from 'react-router-dom';
import EvidenceChip from './EvidenceChip';

export interface WorkRowData {
  year: string;
  title: string;
  owned: string;
  platform: string;
  outcome: string;
  evidence: string;
  to?: string;
  /** Kind-of-work tags — the old category groupings, kept as chips once the list went date-wise. */
  tags?: string[];
}

function CategoryTag({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-ui)',
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--muted)',
        border: '1px solid var(--hairline)',
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
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px 24px',
        borderTop: '1px solid var(--ink)',
        marginTop: 18,
        padding: '12px 0 10px 0',
        ...labelStyle,
      }}
    >
      <span style={{ flex: '0 0 72px' }}>Year</span>
      <span style={{ flex: '1 1 360px' }}>Project · what I owned</span>
      <span style={{ flex: '0 0 150px' }}>Platform</span>
      <span style={{ flex: '1 1 240px' }}>Outcome · evidence</span>
      <span style={{ flex: '0 0 20px' }} />
    </div>
  );
}

export default function WorkRow({ row }: { row: WorkRowData }) {
  const content = (
    <>
      <span
        style={{
          flex: '0 0 72px',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--muted)',
          paddingTop: 4,
        }}
      >
        {row.year}
      </span>
      <span style={{ flex: '1 1 360px' }}>
        <span style={{ display: 'block', fontSize: 19, fontWeight: 500, letterSpacing: '-0.02em' }}>
          {row.title}
        </span>
        <span
          style={{
            display: 'block',
            fontSize: 14,
            lineHeight: 1.55,
            color: 'var(--secondary)',
            marginTop: 7,
            maxWidth: '52ch',
          }}
        >
          {row.owned}
        </span>
        {row.tags && row.tags.length > 0 && (
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 9 }}>
            {row.tags.map((t) => (
              <CategoryTag key={t} label={t} />
            ))}
          </span>
        )}
      </span>
      <span
        style={{
          flex: '0 0 150px',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--secondary)',
          paddingTop: 4,
        }}
      >
        {row.platform}
      </span>
      <span style={{ flex: '1 1 240px' }}>
        <span style={{ display: 'block', fontSize: 14, color: 'var(--secondary)' }}>{row.outcome}</span>
        <EvidenceChip label={row.evidence} />
      </span>
      <span style={{ flex: '0 0 20px', color: 'var(--muted)', paddingTop: 3 }}>{row.to ? '→' : ''}</span>
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
