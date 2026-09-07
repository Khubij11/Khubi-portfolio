import { BreadcrumbBar, SCREEN_ROOT_COL } from './shared';

interface StageData {
  label: string;
  barColor: string;
  sub?: string;
  subColor?: string;
  subBold?: boolean;
  mutedLabel?: boolean;
}

const stages: StageData[] = [
  { label: 'Screened', barColor: '#1E30A1', sub: '14 Mar · Nikhil', subColor: '#9AA0B5' },
  { label: 'HR screening', barColor: '#1E30A1', sub: '15 Mar · Pranita', subColor: '#9AA0B5' },
  { label: 'Interview round 1', barColor: '#F5C252', sub: 'Awaiting feedback · 2 days', subColor: '#FA8231', subBold: true },
  { label: 'Assignment', barColor: '#E7E9F5', mutedLabel: true },
  { label: 'Offer', barColor: '#E7E9F5', mutedLabel: true },
];

interface QueueCardData {
  name: string;
  note: string;
  noteColor: string;
  noteBold?: boolean;
  active?: boolean;
}

const queue: QueueCardData[] = [
  { name: 'Pooja Sharma', note: 'Round 1 feedback due', noteColor: '#FA8231', noteBold: true, active: true },
  { name: 'Saurabh Rao', note: 'Assignment sent · 15 Mar', noteColor: '#6B7089' },
  { name: "Ayesha D'souza", note: 'HR screening scheduled', noteColor: '#6B7089' },
  { name: 'Rahul Bharadwaj', note: 'Offer drafted', noteColor: '#2ECC71', noteBold: true },
];

interface TimelineEntry {
  dot: string;
  connector?: boolean;
  title: string;
  meta: string;
  quote?: string;
  action?: string;
}

const timeline: TimelineEntry[] = [
  {
    dot: '#F5C252',
    connector: true,
    title: 'Waiting on interviewer feedback',
    meta: 'Anupam Dixit · reminded once, 2 days open',
    action: 'Nudge again',
  },
  {
    dot: '#1E30A1',
    connector: true,
    title: 'Moved to interview round 1',
    meta: 'Pranita Kaur, HR · 15 March',
    quote:
      '“Communication is strong and she has led a team of six. Wants product work over platform — worth testing on system design.”',
  },
  {
    dot: '#2ECC71',
    title: 'Qualified from matches',
    meta: 'Nikhil Goswami, expert recruiter · 14 March',
  },
];

export default function JobCandidatesScreen() {
  return (
    <div style={SCREEN_ROOT_COL}>
      <BreadcrumbBar crumbs={['Senior Software Developer', 'Pooja Sharma']} avatarInitials="SK" />
      <div style={{ flex: '0 0 auto', background: '#FFFFFF', borderBottom: '1px solid #E7E9F5', padding: '22px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {stages.map((s) => (
            <div key={s.label} style={{ flex: '1 1 0' }}>
              <div style={{ height: 4, borderRadius: 2, background: s.barColor }} />
              <div style={{ fontSize: 11, fontWeight: s.mutedLabel ? 500 : 600, color: s.mutedLabel ? '#9AA0B5' : undefined, marginTop: 10 }}>
                {s.label}
              </div>
              {s.sub && (
                <div style={{ fontSize: 10, color: s.subColor, fontWeight: s.subBold ? 600 : undefined, marginTop: 4 }}>{s.sub}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: '1 1 auto', display: 'flex', gap: 20, padding: '24px 32px 28px 32px', minHeight: 0 }}>
        <div style={{ flex: '0 0 268px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5' }}>In process · 4</div>
          {queue.map((q) => (
            <div
              key={q.name}
              style={{
                background: '#FFFFFF',
                border: `1px solid ${q.active ? '#1E30A1' : '#E7E9F5'}`,
                borderRadius: 10,
                padding: '14px 16px',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600 }}>{q.name}</div>
              <div style={{ fontSize: 11, color: q.noteColor, fontWeight: q.noteBold ? 600 : undefined, marginTop: 6 }}>{q.note}</div>
            </div>
          ))}
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              paddingBottom: 20,
              borderBottom: '1px solid #EFF1FA',
            }}
          >
            <div>
              <div style={{ fontSize: 17, fontWeight: 600 }}>Pooja Sharma</div>
              <div style={{ fontSize: 12, color: '#6B7089', marginTop: 6 }}>
                Interview round 1 · with Anupam Dixit, 15 March 11:00 AM
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', background: '#1E30A1', borderRadius: 8, padding: '11px 18px' }}>
              Add round 1 feedback
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 22 }}>
            {timeline.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: '0 0 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.dot }} />
                  {t.connector && <div style={{ flex: '1 1 auto', width: 1, background: '#EFF1FA', marginTop: 6 }} />}
                </div>
                <div style={{ flex: '1 1 auto' }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: '#6B7089', marginTop: 6 }}>{t.meta}</div>
                  {t.quote && (
                    <div
                      style={{
                        fontSize: 12,
                        lineHeight: 1.6,
                        color: '#43463F',
                        background: '#F7F8FC',
                        borderRadius: 8,
                        padding: '12px 14px',
                        marginTop: 10,
                        maxWidth: '54ch',
                      }}
                    >
                      {t.quote}
                    </div>
                  )}
                  {t.action && (
                    <div style={{ fontSize: 11, color: '#1E30A1', fontWeight: 600, marginTop: 8 }}>{t.action}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
