import { SCREEN_ROOT_COL } from './shared';

interface SourceCardData {
  title: string;
  sub: string;
  active?: boolean;
}

const sources: SourceCardData[] = [
  { title: 'Resume upload', sub: 'Drop up to 50 files', active: true },
  { title: 'LinkedIn URL', sub: 'Paste one profile' },
  { title: 'My network', sub: '248 connected' },
  { title: 'Manual entry', sub: 'For a single person' },
];

interface ParsedRowData {
  name: string;
  note: string;
  noteColor?: string;
  file: string;
  status: string;
  statusColor: string;
  tinted?: boolean;
}

const parsed: ParsedRowData[] = [
  { name: 'Ananya Rao', note: 'SDE II at Flipkart · 5 yrs · Bengaluru', file: 'ananya_rao.pdf', status: 'Complete', statusColor: '#1B7F4F' },
  { name: 'Rohan Mehta', note: 'Backend Engineer at Swiggy · 4 yrs · Pune', file: 'rohan-cv.docx', status: 'Complete', statusColor: '#1B7F4F' },
  {
    name: 'Priya Nair',
    note: 'No compensation or notice period found',
    noteColor: '#B27E1A',
    file: 'priya_n.pdf',
    status: '2 fields',
    statusColor: '#B27E1A',
    tinted: true,
  },
  { name: 'Karthik Iyer', note: 'Already in your pipeline for this role', file: 'k-iyer.pdf', status: 'Duplicate', statusColor: '#9AA0B5' },
  { name: 'Neha Sethi', note: 'Senior Engineer at Dunzo · 6 yrs · Bengaluru', file: 'neha_sethi.pdf', status: 'Complete', statusColor: '#1B7F4F' },
  {
    name: 'Arjun Pillai',
    note: 'No current company found in file',
    noteColor: '#B27E1A',
    file: 'arjun-resume.pdf',
    status: '1 field',
    statusColor: '#B27E1A',
    tinted: true,
  },
];

export default function AddCandidatesScreen() {
  return (
    <div style={SCREEN_ROOT_COL}>
      <div
        style={{
          flex: '0 0 56px',
          background: '#FFFFFF',
          borderBottom: '1px solid #E7E9F5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
        }}
      >
        <div style={{ fontSize: 13, color: '#6B7089' }}>
          My jobs <span style={{ color: '#C4C8D8' }}>/</span> Senior Software Developer{' '}
          <span style={{ color: '#C4C8D8' }}>/</span> <span style={{ color: '#1A1D2E', fontWeight: 600 }}>Add candidates</span>
        </div>
        <div style={{ fontSize: 11, color: '#9AA0B5' }}>14 added · 3 need review</div>
      </div>
      <div style={{ flex: '1 1 auto', display: 'flex', minHeight: 0, padding: '28px 32px', gap: 24 }}>
        <div style={{ flex: '1 1 auto', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em' }}>Add candidates</div>
          <div style={{ fontSize: 12, color: '#6B7089', marginTop: 8 }}>
            Four ways in. Whichever you use, they land as the same candidate record.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 20 }}>
            {sources.map((s) => (
              <div
                key={s.title}
                style={{
                  background: '#FFFFFF',
                  border: s.active ? '1.5px solid #1E30A1' : '1px solid #E7E9F5',
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, color: s.active ? '#1E30A1' : undefined }}>{s.title}</div>
                <div style={{ fontSize: 11, lineHeight: 1.5, color: '#6B7089', marginTop: 6 }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              flex: '1 1 auto',
              background: '#FFFFFF',
              border: '1px solid #E7E9F5',
              borderRadius: 12,
              marginTop: 16,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 22px',
                borderBottom: '1px solid #EFF1FA',
              }}
            >
              <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5' }}>
                Parsed from 14 resumes
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#1E30A1' }}>Review 3</div>
            </div>
            {parsed.map((p, i) => (
              <div
                key={p.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  padding: '14px 22px',
                  borderBottom: i === parsed.length - 1 ? undefined : '1px solid #EFF1FA',
                  background: p.tinted ? '#FCFBF3' : undefined,
                }}
              >
                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: p.noteColor ?? '#6B7089', marginTop: 4 }}>{p.note}</div>
                </div>
                <div style={{ flex: '0 0 120px', fontSize: 11, color: '#6B7089' }}>{p.file}</div>
                <div
                  style={{
                    flex: '0 0 92px',
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: p.statusColor,
                  }}
                >
                  {p.status}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '0 0 268px', background: '#FFFFFF', border: '1px solid #E7E9F5', borderRadius: 12, padding: '20px 22px', alignSelf: 'flex-start' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5' }}>Where they land</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
            {[
              ['Stage', 'Sourced'],
              ['Owner', 'You'],
              ['Visible to', 'Hiring manager'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                <span style={{ color: '#9AA0B5' }}>{label}</span>
                <span style={{ fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, lineHeight: 1.55, color: '#6B7089', marginTop: 18, paddingTop: 18, borderTop: '1px solid #EFF1FA' }}>
            Candidates with compensation filled reach screening 2 days sooner.
          </div>
        </div>
      </div>
      <div
        style={{
          flex: '0 0 64px',
          background: '#FFFFFF',
          borderTop: '1px solid #E7E9F5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
        }}
      >
        <div style={{ fontSize: 12, color: '#6B7089' }}>1 duplicate will be skipped</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#6B7089' }}>Fix 3 fields first</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', background: '#1E30A1', borderRadius: 8, padding: '11px 20px' }}>
            Add 13 to pipeline
          </div>
        </div>
      </div>
    </div>
  );
}
