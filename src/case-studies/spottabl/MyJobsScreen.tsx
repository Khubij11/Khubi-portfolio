import { Avatar, LogoBadge, SCREEN_ROOT } from './shared';

interface JobRowData {
  logo: string;
  alt: string;
  title: string;
  badge?: string;
  meta: string;
  flag?: { text: string; color: string };
  matches: number;
  qualified: { value: number; color?: string };
  inProcess: { value: number; color?: string };
  bars: { flex: number; color: string }[];
  action: { label: string; kind: 'primary' | 'outline' | 'muted' };
}

const jobs: JobRowData[] = [
  {
    logo: '/assets/logo-a.png',
    alt: 'Airmeet',
    title: 'Senior Software Developer',
    badge: 'Expert recruiter',
    meta: 'Airmeet · Bengaluru · 16–20 LPA · posted 6 days ago',
    flag: { text: '8 qualified profiles waiting on you for 7+ days', color: '#FA8231' },
    matches: 12,
    qualified: { value: 8, color: '#1E30A1' },
    inProcess: { value: 0, color: '#9AA0B5' },
    bars: [
      { flex: 12, color: '#1E30A1' },
      { flex: 8, color: '#2ECC71' },
      { flex: 22, color: '#E7E9F5' },
    ],
    action: { label: 'Screen 8 qualified', kind: 'primary' },
  },
  {
    logo: '/assets/logo-microsoft.png',
    alt: 'Microsoft',
    title: 'Product Designer',
    meta: 'Microsoft · Hyderabad · 22–28 LPA · posted 2 days ago',
    matches: 7,
    qualified: { value: 3, color: '#1E30A1' },
    inProcess: { value: 2 },
    bars: [
      { flex: 7, color: '#1E30A1' },
      { flex: 3, color: '#2ECC71' },
      { flex: 2, color: '#F5C252' },
      { flex: 18, color: '#E7E9F5' },
    ],
    action: { label: 'Review 3 qualified', kind: 'outline' },
  },
  {
    logo: '/assets/logo-deloitte.png',
    alt: 'Deloitte',
    title: 'Full-stack Developer',
    meta: 'Deloitte · Gurgaon · 14–18 LPA · posted 16 hours ago',
    flag: { text: 'Sourcing in progress — first matches usually land within 48 hours', color: '#6B7089' },
    matches: 2,
    qualified: { value: 0, color: '#9AA0B5' },
    inProcess: { value: 0, color: '#9AA0B5' },
    bars: [
      { flex: 2, color: '#1E30A1' },
      { flex: 28, color: '#E7E9F5' },
    ],
    action: { label: 'Get an expert recruiter', kind: 'muted' },
  },
];

function ActionButton({ label, kind }: { label: string; kind: 'primary' | 'outline' | 'muted' }) {
  const style: React.CSSProperties =
    kind === 'primary'
      ? { fontSize: 12, fontWeight: 600, color: '#FFFFFF', background: '#1E30A1', borderRadius: 8, padding: '11px 16px' }
      : kind === 'outline'
      ? { fontSize: 12, fontWeight: 600, color: '#1E30A1', border: '1px solid #C7CDF2', borderRadius: 8, padding: '10px 16px' }
      : { fontSize: 12, fontWeight: 500, color: '#6B7089', border: '1px solid #E7E9F5', borderRadius: 8, padding: '10px 16px' };
  return <div style={style}>{label}</div>;
}

function JobCard({ job }: { job: JobRowData }) {
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E7E9F5', borderRadius: 12, padding: '22px 26px', display: 'flex', alignItems: 'center', gap: 20 }}>
      <LogoBadge src={job.logo} alt={job.alt} />
      <div style={{ flex: '1 1 280px', minWidth: 0, marginRight: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{job.title}</div>
          {job.badge && (
            <div
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#1E30A1',
                background: '#D7DCFF',
                padding: '4px 9px',
                borderRadius: 20,
              }}
            >
              {job.badge}
            </div>
          )}
        </div>
        <div style={{ fontSize: 12, color: '#6B7089', marginTop: 9 }}>{job.meta}</div>
        {job.flag && (
          <div style={{ fontSize: 11, fontWeight: 500, color: job.flag.color, marginTop: 9 }}>{job.flag.text}</div>
        )}
      </div>
      <div style={{ flex: '0 0 300px' }}>
        <div style={{ display: 'flex', gap: 28 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1 }}>{job.matches}</div>
            <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5', marginTop: 7 }}>Matches</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1, color: job.qualified.color }}>{job.qualified.value}</div>
            <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5', marginTop: 7 }}>Qualified</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1, color: job.inProcess.color }}>{job.inProcess.value}</div>
            <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9AA0B5', marginTop: 7 }}>In process</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 14 }}>
          {job.bars.map((b, i) => (
            <div key={i} style={{ flex: `${b.flex} 1 0`, height: 5, borderRadius: 3, background: b.color }} />
          ))}
        </div>
      </div>
      <div style={{ flex: '0 0 200px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
        <ActionButton label={job.action.label} kind={job.action.kind} />
        <div style={{ fontSize: 16, color: '#9AA0B5', letterSpacing: '0.1em' }}>···</div>
      </div>
    </div>
  );
}

function SidebarIcon({ color }: { color: string }) {
  return <div style={{ width: 24, height: 24, borderRadius: 7, background: color }} />;
}

export default function MyJobsScreen() {
  return (
    <div style={SCREEN_ROOT}>
      <div
        style={{
          flex: '0 0 64px',
          background: '#FFFFFF',
          borderRight: '1px solid #E7E9F5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 22,
          padding: '18px 0',
        }}
      >
        <div style={{ width: 30, height: 30, borderRadius: 9, background: '#1E30A1' }} />
        <SidebarIcon color="#D7DCFF" />
        <SidebarIcon color="#EFF1FA" />
        <SidebarIcon color="#EFF1FA" />
        <SidebarIcon color="#EFF1FA" />
      </div>
      <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div
          style={{
            height: 56,
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
            <div
              style={{
                width: 220,
                height: 32,
                border: '1px solid #E7E9F5',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                fontSize: 12,
                color: '#9AA0B5',
              }}
            >
              Search jobs, candidates
            </div>
            <Avatar initials="SK" />
          </div>
        </div>
        <div style={{ flex: '1 1 auto', padding: '30px 32px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>Active jobs</div>
              <div style={{ fontSize: 12, color: '#6B7089', marginTop: 6 }}>3 open roles · 16 candidates qualified this week</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#1E30A1', border: '1px solid #C7CDF2', borderRadius: 8, padding: '9px 14px' }}>
                Connect network
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', background: '#1E30A1', borderRadius: 8, padding: '10px 16px' }}>
                Create job
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 26, borderBottom: '1px solid #E7E9F5' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1E30A1', paddingBottom: 12, borderBottom: '2px solid #1E30A1' }}>
              Active <span style={{ color: '#9AA0B5', fontWeight: 500 }}>3</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7089', paddingBottom: 12 }}>
              On hold <span style={{ color: '#9AA0B5' }}>0</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7089', paddingBottom: 12 }}>
              Drafts <span style={{ color: '#9AA0B5' }}>2</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7089', paddingBottom: 12 }}>
              Archived <span style={{ color: '#9AA0B5' }}>1</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {jobs.map((job) => (
              <JobCard key={job.title} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
