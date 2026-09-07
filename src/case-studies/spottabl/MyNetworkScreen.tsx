import { SCREEN_ROOT_COL } from './shared';

interface SourceChipData {
  title: string;
  sub: string;
  status: 'connected' | 'dashed';
}

const sourceChips: SourceChipData[] = [
  { title: 'LinkedIn', sub: '214 contacts · synced 2h ago', status: 'connected' },
  { title: 'Google Contacts', sub: '34 contacts · synced 2h ago', status: 'connected' },
  { title: 'Naukri', sub: 'Not connected', status: 'dashed' },
];

interface NetworkRowData {
  name: string;
  note: string;
  source: string;
  lastContact: string;
  fit: string;
  fitColor?: string;
  fitMuted?: boolean;
  action: string;
  actionKind: 'primary' | 'outline';
}

const rows: NetworkRowData[] = [
  { name: 'Shreya Kulkarni', note: 'Frontend Engineer at Razorpay · 6 yrs', source: 'LinkedIn', lastContact: '3 weeks ago', fit: 'Senior SWE · 91%', action: 'Add to role', actionKind: 'primary' },
  { name: 'Aditya Menon', note: 'Full-stack at Zeta · 5 yrs · placed by you in 2020', source: 'LinkedIn', lastContact: '2 months ago', fit: 'Senior SWE · 84%', action: 'Add to role', actionKind: 'primary' },
  { name: 'Meera Joshi', note: 'Engineering Manager at Cred · 9 yrs', source: 'Google', lastContact: 'Never', fit: 'No open match', fitMuted: true, action: 'Message', actionKind: 'outline' },
  { name: 'Vikram Desai', note: 'SDE III at Amazon · 7 yrs · open to work', source: 'LinkedIn', lastContact: '5 days ago', fit: 'Senior SWE · 78%', action: 'Add to role', actionKind: 'primary' },
  { name: 'Sana Qureshi', note: 'Product Engineer at Groww · 4 yrs', source: 'LinkedIn', lastContact: '1 week ago', fit: 'Senior SWE · 74%', action: 'Add to role', actionKind: 'primary' },
  { name: 'Harsh Bhatia', note: 'Platform Engineer at Meesho · 8 yrs', source: 'LinkedIn', lastContact: '4 months ago', fit: 'No open match', fitMuted: true, action: 'Message', actionKind: 'outline' },
  { name: 'Divya Raman', note: 'SDE II at Postman · 5 yrs · placed by you in 2021', source: 'Google', lastContact: '6 weeks ago', fit: 'Senior SWE · 69%', action: 'Add to role', actionKind: 'primary' },
];

const filterPills = [
  { label: 'All 248', active: true },
  { label: 'Open to work 61', active: false },
  { label: 'Placed before 12', active: false },
];

function RowAction({ label, kind }: { label: string; kind: 'primary' | 'outline' }) {
  const style: React.CSSProperties =
    kind === 'primary'
      ? { fontSize: 11, fontWeight: 600, color: '#FFFFFF', background: '#1E30A1', borderRadius: 8, padding: '9px 0', textAlign: 'center' }
      : { fontSize: 11, fontWeight: 600, color: '#1E30A1', border: '1px solid #C7CDF2', borderRadius: 8, padding: '8px 0', textAlign: 'center' };
  return <div style={{ flex: '0 0 108px', ...style }}>{label}</div>;
}

export default function MyNetworkScreen() {
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
        <div style={{ fontSize: 14, fontWeight: 600 }}>My network</div>
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
            Search your network
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', background: '#1E30A1', borderRadius: 8, padding: '10px 16px' }}>
            Invite by email
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 auto', padding: '28px 32px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em' }}>248 people you can source from</div>
            <div style={{ fontSize: 12, color: '#6B7089', marginTop: 8 }}>
              Connect a source once. After that, adding a candidate to a role is one click.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {filterPills.map((p) => (
              <div
                key={p.label}
                style={
                  p.active
                    ? { fontSize: 11, fontWeight: 600, color: '#1E30A1', background: '#EFF1FA', borderRadius: 20, padding: '8px 14px' }
                    : { fontSize: 11, fontWeight: 500, color: '#6B7089', border: '1px solid #E7E9F5', borderRadius: 20, padding: '8px 14px' }
                }
              >
                {p.label}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          {sourceChips.map((s) => (
            <div
              key={s.title}
              style={{
                flex: '1 1 0',
                background: '#FFFFFF',
                border: s.status === 'dashed' ? '1px dashed #C7CDF2' : '1px solid #E7E9F5',
                borderRadius: 12,
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{s.title}</div>
                <div style={{ fontSize: 11, color: '#6B7089', marginTop: 5 }}>{s.sub}</div>
              </div>
              {s.status === 'connected' ? (
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#1B7F4F' }}>
                  Connected
                </div>
              ) : (
                <div style={{ fontSize: 11, fontWeight: 600, color: '#1E30A1' }}>Connect</div>
              )}
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
              gap: 24,
              padding: '13px 22px',
              borderBottom: '1px solid #EFF1FA',
              fontSize: 10,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#9AA0B5',
            }}
          >
            <div style={{ flex: '1 1 auto' }}>Person</div>
            <div style={{ flex: '0 0 108px' }}>Source</div>
            <div style={{ flex: '0 0 96px' }}>Last contact</div>
            <div style={{ flex: '0 0 128px' }}>Best fit right now</div>
            <div style={{ flex: '0 0 108px' }} />
          </div>
          {rows.map((r, i) => (
            <div
              key={r.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                padding: '15px 22px',
                borderBottom: i === rows.length - 1 ? undefined : '1px solid #EFF1FA',
              }}
            >
              <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: '#6B7089', marginTop: 4 }}>{r.note}</div>
              </div>
              <div style={{ flex: '0 0 108px', fontSize: 11, color: '#6B7089' }}>{r.source}</div>
              <div style={{ flex: '0 0 96px', fontSize: 11, color: '#6B7089' }}>{r.lastContact}</div>
              <div style={{ flex: '0 0 128px', fontSize: 11, fontWeight: r.fitMuted ? 400 : 600, color: r.fitMuted ? '#9AA0B5' : undefined }}>
                {r.fit}
              </div>
              <RowAction label={r.action} kind={r.actionKind} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
