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
    padding: '24px 0',
    borderBottom: '1px solid var(--hairline)',
    color: 'var(--ink)',
  };

  if (row.to) {
    return (
      <Link to={row.to} style={style}>
        {content}
      </Link>
    );
  }
  return <div style={style}>{content}</div>;
}
