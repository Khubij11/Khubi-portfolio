import { BreadcrumbBar, SCREEN_ROOT_COL } from './shared';

interface MatchCardData {
  name: string;
  role: string;
  score: string;
  scoreColor: string;
  selected?: boolean;
  facts: { text: string; color?: string; bold?: boolean }[];
}

const matches: MatchCardData[] = [
  {
    name: 'Pooja Sharma',
    role: 'Senior Software Engineer · Amazon',
    score: '92%',
    scoreColor: '#1E30A1',
    selected: true,
    facts: [
      { text: 'Available now', color: '#2ECC71', bold: true },
      { text: '₹18 LPA ask' },
      { text: '9 yrs · React' },
    ],
  },
  {
    name: 'Saurabh Rao',
    role: 'Sr. Frontend Developer · HopScotch',
    score: '88%',
    scoreColor: '#1E30A1',
    facts: [{ text: '15 days notice' }, { text: '₹17 LPA ask' }, { text: '7 yrs · Vue' }],
  },
  {
    name: "Ayesha D'souza",
    role: 'Member of Technical Staff 2 · Flipkart',
    score: '81%',
    scoreColor: '#6B7089',
    facts: [{ text: '60 days notice', color: '#FA8231', bold: true }, { text: '₹14 LPA ask' }, { text: '4 yrs · React' }],
  },
];

const matchTags = ['Match 80%+', 'Available now'];
const filterChips = ['Bengaluru', '+ Filter'];

export default function CandidateMatchesScreen() {
  return (
    <div style={SCREEN_ROOT_COL}>
      <BreadcrumbBar crumbs={['My jobs', 'Senior Software Developer']} avatarInitials="SK" />
      <div style={{ flex: '0 0 auto', background: '#FFFFFF', borderBottom: '1px solid #E7E9F5', padding: '18px 32px 0 32px' }}>
        <div style={{ display: 'flex', gap: 26 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1E30A1', paddingBottom: 12, borderBottom: '2px solid #1E30A1' }}>
            Matches <span style={{ color: '#9AA0B5', fontWeight: 500 }}>12</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7089', paddingBottom: 12 }}>
            Qualified <span style={{ color: '#9AA0B5' }}>8</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7089', paddingBottom: 12 }}>
            In process <span style={{ color: '#9AA0B5' }}>0</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7089', paddingBottom: 12 }}>
            Rejected <span style={{ color: '#9AA0B5' }}>3</span>
          </div>
        </div>
      </div>
      <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {matchTags.map((t) => (
            <div key={t} style={{ fontSize: 11, fontWeight: 600, color: '#1E30A1', background: '#D7DCFF', borderRadius: 20, padding: '6px 12px' }}>
              {t}
            </div>
          ))}
          {filterChips.map((t) => (
            <div key={t} style={{ fontSize: 11, fontWeight: 500, color: '#6B7089', border: '1px solid #E7E9F5', borderRadius: 20, padding: '6px 12px' }}>
              {t}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: '#6B7089' }}>Sorted by best match</div>
      </div>
      <div style={{ flex: '1 1 auto', display: 'flex', gap: 20, padding: '0 32px 28px 32px', minHeight: 0 }}>
        <div style={{ flex: '0 0 404px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {matches.map((m) => (
            <div
              key={m.name}
              style={{
                background: '#FFFFFF',
                border: `1px solid ${m.selected ? '#1E30A1' : '#E7E9F5'}`,
                borderRadius: 12,
                padding: '18px 20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: '#6B7089', marginTop: 5 }}>{m.role}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: m.scoreColor }}>{m.score}</div>
              </div>
              <div style={{ display: 'flex', gap: 14, marginTop: 14 }}>
                {m.facts.map((f, i) => (
                  <div key={i} style={{ fontSize: 11, color: f.color ?? '#6B7089', fontWeight: f.bold ? 600 : undefined }}>
                    {f.color && f.bold ? <span style={{ color: f.color, fontWeight: 600 }}>{f.text}</span> : f.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ fontSize: 11, color: '#6B7089', padding: '4px 4px 0 4px' }}>9 more matches</div>
        </div>
        <div
          style={{
            flex: '1 1 auto',
            background: '#FFFFFF',
            border: '1px solid #E7E9F5',
            borderRadius: 12,
            padding: '24px 26px',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Pooja Sharma</div>
              <div style={{ fontSize: 12, color: '#6B7089', marginTop: 6 }}>Senior Software Engineer at Amazon · Bengaluru</div>
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#1E30A1',
                background: '#D7DCFF',
                padding: '5px 10px',
                borderRadius: 20,
              }}
            >
              From your network
            </div>
          </div>
          <div style={{ display: 'flex', gap: 34, marginTop: 24, paddingBottom: 22, borderBottom: '1px solid #EFF1FA' }}>
            {[
              { label: 'Availability', value: 'Immediate', color: '#2ECC71' },
              { label: 'Expectation', value: '₹18 LPA' },
              { label: 'Band fit', value: 'Within 16–20' },
              { label: 'Experience', value: '9 years' },
            ].map((f) => (
              <div key={f.label}>
                <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5' }}>{f.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: f.color, marginTop: 7 }}>{f.value}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5' }}>Why she matched</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              {['React · 9 yrs', 'E-commerce domain', 'Team lead, 6 reports', 'B.Tech, IIT Bombay'].map((t) => (
                <div key={t} style={{ fontSize: 11, fontWeight: 500, color: '#1A1D2E', background: '#EFF1FA', borderRadius: 6, padding: '7px 11px' }}>
                  {t}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: '#6B7089', marginTop: 18, maxWidth: '52ch' }}>
              Nikhil Goswami, expert recruiter: &ldquo;Screened on 14 March. Strong on system design, wants a product team
              rather than platform. Open to a 30-minute call this week.&rdquo;
            </div>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 12, paddingTop: 22, borderTop: '1px solid #EFF1FA' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', background: '#1E30A1', borderRadius: 8, padding: '11px 18px' }}>
              Move to screening
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#6B7089', border: '1px solid #E7E9F5', borderRadius: 8, padding: '10px 16px' }}>
              Pass with reason
            </div>
            <div style={{ fontSize: 11, color: '#9AA0B5', marginLeft: 'auto' }}>Next match: Saurabh Rao</div>
          </div>
        </div>
      </div>
    </div>
  );
}
