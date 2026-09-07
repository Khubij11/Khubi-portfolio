const STYLES: Record<string, { color: string; bg: string; border: string }> = {
  'Shipped · measured': { color: '#0B5030', bg: '#DCF0E4', border: '#A8D5BC' },
  Shipped: { color: '#0E5C6B', bg: '#DDF0F4', border: '#A6D4DE' },
  'Shipped internally': { color: '#1B4B75', bg: '#E3EDF7', border: '#B4CFE7' },
  Approved: { color: '#8A5410', bg: '#FBEEDC', border: '#E8CFA4' },
  Concept: { color: '#5B3E82', bg: '#F0EAF7', border: '#D5C4E8' },
};

export default function EvidenceChip({ label }: { label: string }) {
  const s = STYLES[label] ?? STYLES.Concept;
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-ui)',
        fontSize: 12,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.09em',
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 999,
        padding: '5px 12px',
        marginTop: 10,
      }}
    >
      {label}
    </span>
  );
}
