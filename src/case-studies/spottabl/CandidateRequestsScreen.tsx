import { Avatar, LogoBadge, SCREEN_ROOT_COL } from './shared';

interface RequestCardData {
  logo: string;
  alt: string;
  title: string;
  status: string;
  statusColor: string;
  meta: string;
  footer: string;
  footerColor: string;
  emphasis?: boolean;
}

const requests: RequestCardData[] = [
  {
    logo: '/assets/logo-a.png',
    alt: 'Airmeet',
    title: 'Senior Software Developer',
    status: 'Your move',
    statusColor: '#1E30A1',
    meta: 'Airmeet · Bengaluru · ₹16–20 LPA',
    footer: 'Request sent to you 2 hours ago · expires in 5 days',
    footerColor: '#1A1D2E',
    emphasis: true,
  },
  {
    logo: '/assets/logo-razorpay.png',
    alt: 'Razorpay',
    title: 'Front-end Developer',
    status: 'In review',
    statusColor: '#B27E1A',
    meta: 'Razorpay · Hyderabad · ₹14–18 LPA',
    footer: 'With the hiring manager since 6 Mar · usually 4 days',
    footerColor: '#6B7089',
  },
  {
    logo: '/assets/logo-cred.png',
    alt: 'CRED',
    title: 'Full-stack Developer',
    status: 'Interview set',
    statusColor: '#1B7F4F',
    meta: 'Deloitte · Gurgaon · ₹15–19 LPA',
    footer: 'Round 2 on Thu 14 Mar, 4:00 PM · link sent',
    footerColor: '#1A1D2E',
  },
  {
    logo: '/assets/logo-kotak.png',
    alt: 'Kotak',
    title: 'Backend Developer',
    status: 'Closed',
    statusColor: '#9AA0B5',
    meta: 'Kotak · Remote · ₹18–22 LPA',
    footer: 'Role filled internally on 2 Mar',
    footerColor: '#6B7089',
  },
];

const detailFacts: { label: string; value: string; note: string }[] = [
  { label: 'Compensation', value: '₹16–20 LPA', note: 'Above your last stated range' },
  { label: 'Experience', value: '4–7 years', note: 'You have 6' },
  { label: 'Location', value: 'Bengaluru', note: 'Remote possible' },
];

const skillMatches = ['React', 'Node.js', 'System design'];

const acceptSteps: { text: string; muted?: string; done?: boolean }[] = [
  { text: 'Your profile goes to Airmeet — ', muted: 'name, resume and current CTC included', done: true },
  { text: 'Nikhil screens you, then books round 1 — typically within 3 days' },
  { text: 'Your 60-day notice period is shared up front, so no offer date slips later' },
  { text: 'You can withdraw at any stage, and Airmeet is told why' },
];

const tabs: [string, boolean][] = [
  ['Requested gigs 4', true],
  ['Assigned 3', false],
  ['Open roles 22', false],
  ['Past 3', false],
];

export default function CandidateRequestsScreen() {
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
        <div style={{ fontSize: 14, fontWeight: 600 }}>My jobs</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ fontSize: 11, color: '#9AA0B5' }}>Profile 80% complete</div>
          <Avatar initials="S" />
        </div>
      </div>
      <div style={{ flex: '0 0 46px', background: '#FFFFFF', borderBottom: '1px solid #E7E9F5', display: 'flex', alignItems: 'stretch', gap: 28, padding: '0 32px' }}>
        {tabs.map(([label, active]) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 12,
              fontWeight: active ? 600 : 400,
              color: active ? '#1E30A1' : '#6B7089',
              boxShadow: active ? 'inset 0 -2px 0 #1E30A1' : undefined,
            }}
          >
            {label}
          </div>
        ))}
      </div>
      <div style={{ flex: '1 1 auto', display: 'flex', minHeight: 0, padding: '24px 32px', gap: 20 }}>
        <div style={{ flex: '0 0 372px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5' }}>Waiting on you first</div>
          {requests.map((r, i) => (
            <div key={r.title}>
              {i === 1 && (
                <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5', margin: '8px 0 10px 0' }}>
                  Waiting on them
                </div>
              )}
              <div
                style={{
                  background: '#FFFFFF',
                  border: r.emphasis ? '1.5px solid #1E30A1' : '1px solid #E7E9F5',
                  borderRadius: 12,
                  padding: '16px 18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                    <LogoBadge src={r.logo} alt={r.alt} size={28} radius={8} />
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{r.title}</div>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: r.statusColor,
                    }}
                  >
                    {r.status}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#6B7089', marginTop: 5 }}>{r.meta}</div>
                <div style={{ fontSize: 11, color: r.footerColor, marginTop: 12, paddingTop: 12, borderTop: '1px solid #EFF1FA' }}>
                  {r.footer}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ flex: '1 1 auto', minWidth: 0, background: '#FFFFFF', border: '1px solid #E7E9F5', borderRadius: 12, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, padding: '22px 26px', borderBottom: '1px solid #EFF1FA' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <LogoBadge src="/assets/logo-a.png" alt="Airmeet" />
              <div>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>Senior Software Developer</div>
                <div style={{ fontSize: 12, color: '#6B7089', marginTop: 6 }}>Airmeet · requested by Nikhil Goswami, expert recruiter</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#6B7089', border: '1px solid #E7E9F5', borderRadius: 8, padding: '10px 14px' }}>
                Decline
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', background: '#1E30A1', borderRadius: 8, padding: '11px 18px' }}>
                Accept request
              </div>
            </div>
          </div>
          <div style={{ padding: '22px 26px', display: 'flex', gap: 30, borderBottom: '1px solid #EFF1FA' }}>
            {detailFacts.map((f) => (
              <div key={f.label} style={{ flex: '1 1 0' }}>
                <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5' }}>{f.label}</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 7 }}>{f.value}</div>
                <div style={{ fontSize: 11, color: '#6B7089', marginTop: 4 }}>{f.note}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '22px 26px', borderBottom: '1px solid #EFF1FA' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5' }}>Must have · you match 3 of 3</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              {skillMatches.map((s) => (
                <div key={s} style={{ fontSize: 11, fontWeight: 600, color: '#1E30A1', background: '#EFF1FA', borderRadius: 6, padding: '8px 12px' }}>
                  {s}
                </div>
              ))}
              <div style={{ fontSize: 11, fontWeight: 500, color: '#9AA0B5', border: '1px solid #E7E9F5', borderRadius: 6, padding: '8px 12px' }}>
                GraphQL — nice to have
              </div>
            </div>
          </div>
          <div style={{ padding: '22px 26px' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5' }}>What happens if you accept</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
              {acceptSteps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: s.done ? '#1E30A1' : undefined,
                      border: s.done ? undefined : '1px solid #D5D9E8',
                      marginTop: 5,
                      flex: '0 0 8px',
                    }}
                  />
                  <div style={{ fontSize: 12, color: s.done ? undefined : '#6B7089' }}>
                    {s.text}
                    {s.muted && <span style={{ color: '#6B7089' }}>{s.muted}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '20px 26px', borderTop: '1px solid #EFF1FA', background: '#FBFBFE', borderRadius: '0 0 12px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: '#D7DCFF',
                    color: '#1E30A1',
                    fontSize: 10,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  NG
                </div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>Nikhil Goswami</div>
                <div style={{ fontSize: 11, color: '#9AA0B5' }}>Expert recruiter · 41 placements</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#1E30A1' }}>Ask a question</div>
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: '#43463F', marginTop: 12 }}>
              &ldquo;They&apos;ve been looking for eight weeks and the team is three people. Your Node work is the reason I
              sent this one.&rdquo;
            </div>
            <div style={{ fontSize: 11, color: '#9AA0B5', marginTop: 10 }}>Usually replies within 4 hours</div>
          </div>
        </div>
      </div>
    </div>
  );
}
