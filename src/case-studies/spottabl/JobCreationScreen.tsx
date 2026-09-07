import { SCREEN_ROOT_COL } from './shared';

interface StepData {
  label: string;
  state: 'done' | 'active' | 'todo';
}

const steps: StepData[] = [
  { label: 'The basics', state: 'done' },
  { label: 'Role & responsibilities', state: 'done' },
  { label: 'Skills & expertise', state: 'active' },
  { label: 'Assessment questions', state: 'todo' },
  { label: 'Team & owners', state: 'todo' },
];

const mustHave = ['React', 'Node.js', 'System design'];
const suggested = ['GraphQL', 'TypeScript', 'AWS', 'Team leadership'];

const previewRows: [string, string][] = [
  ['Compensation', '₹16–20 LPA'],
  ['Experience', '4–7 years'],
  ['Must have', '3 skills'],
  ['Hiring manager', 'Jaidev Sharma'],
];

export default function JobCreationScreen() {
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
          My jobs <span style={{ color: '#C4C8D8' }}>/</span> <span style={{ color: '#1A1D2E', fontWeight: 600 }}>New role</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 11, color: '#9AA0B5' }}>Saved a moment ago</div>
          <div style={{ fontSize: 11, fontWeight: 500, color: '#6B7089', border: '1px solid #E7E9F5', borderRadius: 8, padding: '8px 12px' }}>
            Preview as candidate
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 auto', display: 'flex', minHeight: 0 }}>
        <div
          style={{
            flex: '0 0 244px',
            background: '#FFFFFF',
            borderRight: '1px solid #E7E9F5',
            padding: '26px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
          }}
        >
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5' }}>Step 3 of 5</div>
            <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
              {[1, 1, 1, 0, 0].map((filled, i) => (
                <div key={i} style={{ flex: '1 1 0', height: 3, borderRadius: 2, background: filled ? '#1E30A1' : '#E7E9F5' }} />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {steps.map((s) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0' }}>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: s.state === 'done' ? '#2ECC71' : s.state === 'active' ? '#1E30A1' : undefined,
                    border: s.state === 'todo' ? '1px solid #D5D9E8' : undefined,
                  }}
                />
                <div style={{ fontSize: 12, fontWeight: s.state === 'active' ? 600 : undefined, color: s.state === 'todo' ? '#9AA0B5' : s.state === 'active' ? '#1E30A1' : '#6B7089' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', background: '#F7F8FC', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600 }}>Start from a template</div>
            <div style={{ fontSize: 11, lineHeight: 1.55, color: '#6B7089', marginTop: 6 }}>
              Senior Software Developer is in the library — 14 fields prefilled.
            </div>
          </div>
        </div>
        <div style={{ flex: '1 1 auto', padding: '28px 32px', display: 'flex', gap: 24, minWidth: 0 }}>
          <div style={{ flex: '1 1 auto', minWidth: 0 }}>
            <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em' }}>Skills &amp; expertise</div>
            <div style={{ fontSize: 12, color: '#6B7089', marginTop: 8 }}>
              Pick up to five must-haves. Everything else becomes a nice-to-have, so candidates can tell the difference.
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E7E9F5', borderRadius: 12, padding: '20px 22px', marginTop: 20 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5' }}>Must have · 3 of 5</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                {mustHave.map((s) => (
                  <div key={s} style={{ fontSize: 11, fontWeight: 600, color: '#FFFFFF', background: '#1E30A1', borderRadius: 6, padding: '8px 12px' }}>
                    {s}
                  </div>
                ))}
                <div style={{ fontSize: 11, fontWeight: 500, color: '#9AA0B5', border: '1px dashed #D5D9E8', borderRadius: 6, padding: '8px 12px' }}>
                  + Add skill
                </div>
              </div>
              <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5', marginTop: 22 }}>
                Suggested for this role
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                {suggested.map((s) => (
                  <div key={s} style={{ fontSize: 11, fontWeight: 500, color: '#1A1D2E', background: '#EFF1FA', borderRadius: 6, padding: '8px 12px' }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E7E9F5', borderRadius: 12, padding: '20px 22px', marginTop: 14 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5' }}>Experience</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, border: '1px solid #E7E9F5', borderRadius: 8, padding: '10px 16px' }}>4 yrs</div>
                <div style={{ fontSize: 12, color: '#9AA0B5' }}>to</div>
                <div style={{ fontSize: 13, fontWeight: 600, border: '1px solid #E7E9F5', borderRadius: 8, padding: '10px 16px' }}>7 yrs</div>
                <div style={{ fontSize: 11, color: '#6B7089', marginLeft: 8 }}>Widening this by a year adds ~18 matches</div>
              </div>
            </div>
          </div>
          <div style={{ flex: '0 0 268px', background: '#FFFFFF', border: '1px solid #E7E9F5', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5' }}>How candidates see it</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 14 }}>Senior Software Developer</div>
            <div style={{ fontSize: 11, color: '#6B7089', marginTop: 6 }}>Airmeet · Bengaluru · remote possible</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18, paddingTop: 18, borderTop: '1px solid #EFF1FA' }}>
              {previewRows.map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span style={{ color: '#9AA0B5' }}>{label}</span>
                  <span style={{ fontWeight: 600 }}>{value}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, lineHeight: 1.55, color: '#6B7089', marginTop: 18, paddingTop: 18, borderTop: '1px solid #EFF1FA' }}>
              Two fields still empty. Roles with all five filled get 2.3× more applications.
            </div>
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
        <div style={{ fontSize: 12, fontWeight: 500, color: '#6B7089' }}>Back</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#6B7089' }}>Save and finish later</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', background: '#1E30A1', borderRadius: 8, padding: '11px 20px' }}>
            Continue to assessment
          </div>
        </div>
      </div>
    </div>
  );
}
