const PHONE: React.CSSProperties = {
  position: 'relative',
  width: 390,
  height: 844,
  background: '#F5F6F7',
  borderRadius: 22,
  overflow: 'hidden',
  boxShadow: '0 24px 48px -20px rgba(0,0,0,0.55)',
  fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
};

function StatusBar() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px 6px 22px', background: '#FFFFFF' }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#17283A' }}>12:45 AM</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill="#17283A">
          <rect x="0" y="7.5" width="2.6" height="3.5" rx="0.8" />
          <rect x="4.3" y="5.5" width="2.6" height="5.5" rx="0.8" />
          <rect x="8.6" y="3" width="2.6" height="8" rx="0.8" />
          <rect x="12.9" y="0.5" width="2.6" height="10.5" rx="0.8" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="#17283A" strokeOpacity="0.4" />
          <rect x="2" y="2" width="16" height="8" rx="1.6" fill="#17283A" />
          <path d="M23 4.2v3.6a2 2 0 0 0 0-3.6z" fill="#17283A" fillOpacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

function TopBar({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 22px 20px 22px', background: '#FFFFFF' }}>
      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="#17283A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 1L2 10l8 9" />
      </svg>
      <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', color: '#17283A' }}>{title}</span>
    </div>
  );
}

function RegCard() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', borderRadius: 9, padding: '16px 18px', boxShadow: '0 1px 4px rgba(23,40,58,0.08)' }}>
      <span>
        <span style={{ display: 'block', fontSize: 12, color: '#7C8996' }}>Registration no</span>
        <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: '#17283A', marginTop: 5 }}>KA51 - MM8203</span>
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', color: '#F26A1B' }}>CHANGE</span>
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="#F26A1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 1l5 5-5 5" />
        </svg>
      </span>
    </div>
  );
}

function WarningBanner() {
  return (
    <img
      src="/assets/c24-warning-bg.png"
      alt="Not paying challan on time is a criminal offence"
      style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 7, marginTop: 16 }}
    />
  );
}

function Tabs({ active }: { active: 'pending' | 'paid' }) {
  const pill = (isActive: boolean): React.CSSProperties => ({
    fontSize: 13,
    fontWeight: isActive ? 600 : 500,
    color: isActive ? '#1F5FC4' : '#4A5866',
    background: '#FFFFFF',
    border: `1px solid ${isActive ? '#2E6BD8' : '#E1E6EA'}`,
    borderRadius: 7,
    padding: '11px 15px',
  });
  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
      <span style={pill(active === 'pending')}>Pending Challans</span>
      <span style={pill(active === 'paid')}>Paid Challans</span>
    </div>
  );
}

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="11" fill="#25D366" />
      <path d="M11 5.4a5.6 5.6 0 0 0-4.78 8.52L5.5 16.6l2.76-.72A5.6 5.6 0 1 0 11 5.4z" fill="#FFFFFF" />
      <path
        d="M9.1 8.3c.16-.36.33-.37.49-.38h.4c.13 0 .3-.02.45.35l.55 1.34c.05.12.08.26 0 .4l-.23.35c-.7.1-.15.2-.06.36.1.17.42.68.9 1.1.6.54 1.11.71 1.28.79.16.08.26.07.36-.03l.42-.47c.12-.13.22-.09.36-.04l1.19.56c.17.08.28.12.32.19.04.07.04.4-.11.79-.15.38-.79.73-1.1.76-.32.03-.61.14-2.06-.44-1.75-.7-2.83-2.5-2.92-2.62-.09-.12-.69-.94-.69-1.79 0-.85.45-1.26.61-1.43z"
        fill="#25D366"
      />
    </svg>
  );
}

interface CardData {
  fine: string;
  offence: string;
  extra?: string;
  paid?: boolean;
  selected?: boolean;
  short?: boolean;
}

function ChallanCard({ fine, offence, extra, paid, selected, short }: CardData) {
  return (
    <div style={{ position: 'relative', background: '#FFFFFF', borderRadius: 9, boxShadow: '0 1px 4px rgba(23,40,58,0.08)', overflow: selected ? 'visible' : 'hidden', width: selected ? 324 : undefined }}>
      {selected && (
        <div style={{ position: 'absolute', right: -30, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, borderRadius: 4, background: '#1F6FEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 5l3.4 3.4L11 1.6" />
          </svg>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '14px 16px 12px 16px' }}>
        <span>
          <span style={{ display: 'block', fontSize: 11, color: '#8E9AA5' }}>Challan No:</span>
          <span style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#17283A', marginTop: 3 }}>#UPI24894385629562</span>
        </span>
        <span style={{ background: '#F1F3F5', borderRadius: 5, padding: '6px 10px', textAlign: 'right', flex: '0 0 auto' }}>
          <span style={{ display: 'block', fontSize: 10, color: '#8E9AA5' }}>Issue Date</span>
          <span style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#17283A', marginTop: 2 }}>12 Dec 2022</span>
        </span>
      </div>
      {!short && (
        <div style={{ borderTop: '1px solid #EDF0F2', padding: '14px 16px 14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#17283A' }}>{paid ? 'Fine Paid' : 'Fine Amount'}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: paid ? '#12A150' : '#E8402A' }}>{fine}</span>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: '#17283A', marginTop: 10 }}>
            <span style={{ fontWeight: 700 }}>Offence</span> - {offence}
            {extra && <span style={{ fontWeight: 700, color: '#1F5FC4' }}> {extra}</span>}
          </div>
          {paid && <div style={{ fontSize: 12, color: '#4A5866', marginTop: 10 }}>Paid via: Online</div>}
        </div>
      )}
      {!short && !selected && (
        <div style={{ borderTop: '1px dashed #D8DEE3', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 16px 14px 16px' }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', color: '#F26A1B' }}>MORE INFO</span>
          {!paid && <span style={{ background: '#FFE9D8', borderRadius: 6, padding: '11px 26px', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', color: '#F26A1B' }}>PAY NOW</span>}
        </div>
      )}
    </div>
  );
}

function BottomCTA({ label }: { label: string }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#FFFFFF', padding: '14px 18px 24px 18px', boxShadow: '0 -6px 18px -8px rgba(23,40,58,0.18)' }}>
      <div style={{ background: '#EF6612', borderRadius: 8, textAlign: 'center', padding: '17px 0', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', color: '#FFFFFF' }}>{label}</div>
    </div>
  );
}

function SummaryLineRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ fontSize: bold ? 13.5 : 12.5, color: '#17283A' }}>{label}</span>
      <span style={{ fontSize: bold ? 13.5 : 12.5, fontWeight: 700, color: '#17283A' }}>{value}</span>
    </div>
  );
}

export type ChallanScreenName = 'empty' | 'pending' | 'select' | 'paid' | 'whatsapp' | 'summary1' | 'summary2' | 'landing' | 'verify';

export default function ChallanScreen({ screen = 'pending' }: { screen?: ChallanScreenName }) {
  if (screen === 'empty') {
    return (
      <div style={PHONE}>
        <StatusBar />
        <TopBar title="My Challans" />
        <div style={{ padding: '18px 18px 0 18px' }}>
          <RegCard />
          <Tabs active="pending" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '62px 22px 0 22px' }}>
            <img src="/assets/c24-badge.png" alt="Challan-free badge" style={{ width: 138, height: 'auto', display: 'block' }} />
            <div style={{ fontSize: 18, fontWeight: 700, color: '#17283A', marginTop: 30 }}>No challans!</div>
            <div style={{ fontSize: 13, lineHeight: 1.55, color: '#4A5866', textAlign: 'center', marginTop: 12, maxWidth: '30ch' }}>
              It looks like you have no challans to worry about.
            </div>
            <div style={{ fontSize: 11, lineHeight: 1.6, color: '#8E9AA5', textAlign: 'center', marginTop: 16, maxWidth: '34ch' }}>
              Thank you for being a responsible citizen. Drive safely and enjoy the journey! Share the badge to set an example for others
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 18, right: 18, bottom: 24 }}>
          <div style={{ background: '#EF6612', borderRadius: 8, textAlign: 'center', padding: '17px 0', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', color: '#FFFFFF' }}>SHARE</div>
        </div>
      </div>
    );
  }

  if (screen === 'pending') {
    return (
      <div style={PHONE}>
        <StatusBar />
        <TopBar title="My Challans" />
        <div style={{ padding: '18px 18px 0 18px' }}>
          <RegCard />
          <WarningBanner />
          <Tabs active="pending" />
          <div style={{ fontSize: 14, fontWeight: 700, color: '#17283A', marginTop: 24 }}>Recently added (2)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 14 }}>
            <ChallanCard fine="₹25,000" offence="Disobey of lawful direction in case of an accident or damaging property" />
            <ChallanCard fine="₹25,000" offence="Disobey of lawful direction in case of an accident or damaging property" extra="+1 more" />
          </div>
        </div>
        <BottomCTA label="PAY MULTIPLE CHALLANS" />
      </div>
    );
  }

  if (screen === 'select') {
    return (
      <div style={PHONE}>
        <StatusBar />
        <TopBar title="My Challans" />
        <div style={{ padding: '18px 18px 0 18px' }}>
          <RegCard />
          <WarningBanner />
          <Tabs active="pending" />
          <div style={{ fontSize: 14, fontWeight: 700, color: '#17283A', marginTop: 24 }}>Recently added (2)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 14, marginRight: -30 }}>
            <ChallanCard fine="₹25,000" offence="Disobey of lawful direction in case of an accident or damaging property" selected />
            <ChallanCard fine="" offence="" short />
          </div>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#FFFFFF', boxShadow: '0 -6px 18px -8px rgba(23,40,58,0.18)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 18px 14px 18px' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#17283A' }}>5 Challans are selected</span>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', color: '#F26A1B' }}>CLEAR</span>
          </div>
          <div style={{ padding: '0 18px 24px 18px' }}>
            <div style={{ background: '#EF6612', borderRadius: 8, textAlign: 'center', padding: '17px 0', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', color: '#FFFFFF' }}>PAY CHALLANS</div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'paid') {
    return (
      <div style={PHONE}>
        <StatusBar />
        <TopBar title="My Challans" />
        <div style={{ padding: '18px 18px 0 18px' }}>
          <RegCard />
          <WarningBanner />
          <Tabs active="paid" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 22 }}>
            <ChallanCard fine="₹25,000" offence="Disobey of lawful direction in case of an accident or damaging property" paid />
            <ChallanCard fine="₹25,000" offence="Disobey of lawful direction in case of an accident or damaging property" paid />
          </div>
        </div>
        <BottomCTA label="PAY MULTIPLE CHALLANS" />
      </div>
    );
  }

  if (screen === 'whatsapp') {
    return (
      <div style={PHONE}>
        <StatusBar />
        <TopBar title="My Challans" />
        <div style={{ padding: '18px 18px 0 18px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: 9, boxShadow: '0 1px 4px rgba(23,40,58,0.08)', padding: '16px 18px 14px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>
                <span style={{ display: 'block', fontSize: 12, color: '#7C8996' }}>Registration no</span>
                <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: '#17283A', marginTop: 5 }}>KA51 - MM8203</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', color: '#F26A1B' }}>CHANGE</span>
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="#F26A1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 1l5 5-5 5" />
                </svg>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: '#F7F9FA', borderRadius: 7, padding: '10px 12px', marginTop: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <WhatsAppIcon />
                <span style={{ fontSize: 12, lineHeight: 1.4, color: '#17283A' }}>Receive challan updates on WhatsApp?</span>
              </span>
              <span style={{ flex: '0 0 auto', position: 'relative', width: 42, height: 24, borderRadius: 999, background: '#1F6FEB' }}>
                <span style={{ position: 'absolute', right: 3, top: 3, width: 18, height: 18, borderRadius: '50%', background: '#FFFFFF' }} />
              </span>
            </div>
          </div>
          <Tabs active="pending" />
          <div style={{ fontSize: 14, fontWeight: 700, color: '#17283A', marginTop: 24 }}>Recently added (2)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 14 }}>
            <ChallanCard fine="₹25,000" offence="Offence name is not available" />
            <ChallanCard fine="₹25,000" offence="Disobey of lawful direction in case of an accident or damaging property" extra="+1 more" />
          </div>
        </div>
        <BottomCTA label="PAY MULTIPLE CHALLANS" />
      </div>
    );
  }

  if (screen === 'summary1') {
    return (
      <div style={PHONE}>
        <StatusBar />
        <TopBar title="Payment Summary" />
        <div style={{ padding: '18px 18px 0 18px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: 9, boxShadow: '0 1px 4px rgba(23,40,58,0.08)', padding: '16px 16px 14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#4A5866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2.5" y="3" width="13" height="13" rx="2.5" />
                  <path d="M6.5 3V1.8h5V3" />
                  <path d="M6 9.4l2.2 2.2L12.4 7" />
                </svg>
                <span style={{ fontSize: 13, color: '#4A5866' }}>VRN no</span>
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#17283A' }}>KA51 - MM8203</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#4A5866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.2 2.4h2.6l1.3 3.2-1.6 1a8 8 0 0 0 4.9 4.9l1-1.6 3.2 1.3v2.6a1.4 1.4 0 0 1-1.5 1.4A13.2 13.2 0 0 1 2.8 3.9 1.4 1.4 0 0 1 4.2 2.4z" />
                </svg>
                <span style={{ fontSize: 13, color: '#4A5866' }}>Phone no.</span>
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#17283A' }}>+91 9786467474</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F7F9FA', borderRadius: 7, padding: '9px 12px', marginTop: 16 }}>
              <WhatsAppIcon size={18} />
              <span style={{ fontSize: 11.5, color: '#4A5866' }}>We will send challan updates on WhatsApp</span>
            </div>
          </div>

          <div style={{ fontSize: 14, marginTop: 24 }}>
            <span style={{ fontWeight: 700, color: '#17283A' }}>Payment summary</span> <span style={{ color: '#8E9AA5' }}>(1 Challan)</span>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 9, boxShadow: '0 1px 4px rgba(23,40,58,0.08)', overflow: 'hidden', marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '14px 16px 12px 16px' }}>
              <span>
                <span style={{ display: 'block', fontSize: 11, color: '#8E9AA5' }}>Challan No:</span>
                <span style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#17283A', marginTop: 3 }}>#UPI24894385629562</span>
              </span>
              <span style={{ flex: '0 0 auto', background: '#EAF2FE', borderRadius: 5, padding: '5px 12px', fontSize: 11.5, fontWeight: 600, color: '#1F5FC4' }}>Online</span>
            </div>
            <div style={{ borderTop: '1px solid #EDF0F2', padding: '13px 16px' }}>
              <div style={{ fontSize: 12, lineHeight: 1.5, color: '#17283A' }}>
                <span style={{ fontWeight: 700 }}>Offence</span> - Disobey of lawful direction in case of an accident or damaging property
              </div>
            </div>
            <div style={{ borderTop: '1px dashed #D8DEE3', padding: '13px 16px 15px 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
              <SummaryLineRow label="Challan Amount" value="₹2,500" />
              <SummaryLineRow label="Agent fee" value="₹100" />
              <SummaryLineRow label="GST (18%)" value="₹450" />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: '#FFFFFF', borderRadius: 9, boxShadow: '0 1px 4px rgba(23,40,58,0.08)', padding: '15px 16px', marginTop: 16 }}>
            <span style={{ fontSize: 12.5, color: '#4A5866' }}>Why agent fee?</span>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="#17283A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 7h15" />
              <path d="M11 2l5 5-5 5" />
            </svg>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 9, boxShadow: '0 1px 4px rgba(23,40,58,0.08)', padding: '15px 16px 16px 16px', marginTop: 16 }}>
            <SummaryLineRow label="Challan total" value="₹3,050" />
            <div style={{ marginTop: 11 }}>
              <SummaryLineRow label="Platform fee" value="₹50" />
            </div>
            <div style={{ borderTop: '1px dashed #D8DEE3', marginTop: 14, paddingTop: 14 }}>
              <SummaryLineRow label="Total amount" value="₹3,100" bold />
            </div>
          </div>
        </div>
        <BottomCTA label="PAY CHALLAN (₹3,100)" />
      </div>
    );
  }

  if (screen === 'summary2') {
    return (
      <div style={PHONE}>
        <div style={{ padding: '22px 18px 0 18px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: 9, boxShadow: '0 1px 4px rgba(23,40,58,0.08)', padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ fontSize: 13, color: '#4A5866' }}>VRN</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#17283A' }}>DL01SA10101</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 14 }}>
              <span style={{ fontSize: 13, color: '#4A5866' }}>Mobile No.</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#17283A' }}>+91 1234567890</span>
            </div>
          </div>

          <div style={{ fontSize: 14, marginTop: 24 }}>
            <span style={{ fontWeight: 700, color: '#17283A' }}>Payment summary</span> <span style={{ color: '#8E9AA5' }}>(2 Challan)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11, marginTop: 18 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flex: '0 0 auto', marginTop: 1 }}>
              <circle cx="11" cy="10.5" r="8" stroke="#1F5FC4" strokeWidth="1.6" />
              <path d="M3 10.5h16M11 2.5c-2.6 2.4-2.6 13.6 0 16M11 2.5c2.6 2.4 2.6 13.6 0 16" stroke="#1F5FC4" strokeWidth="1.4" />
              <circle cx="17.5" cy="17.5" r="4.6" fill="#FFC400" />
              <path d="M16 17.4a1.6 1.6 0 1 0 3.2 0 1.6 1.6 0 0 0-3.2 0zM19.1 18.6l1.5 1.5" stroke="#17283A" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span>
              <span style={{ display: 'block', fontSize: 13.5, fontWeight: 700, color: '#17283A' }}>Online settlement</span>
              <span style={{ display: 'block', fontSize: 11.5, color: '#4A5866', marginTop: 3 }}>Online challans would be settled in 2 days</span>
            </span>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 9, boxShadow: '0 1px 4px rgba(23,40,58,0.08)', overflow: 'hidden', marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '14px 16px 12px 16px' }}>
              <span>
                <span style={{ display: 'block', fontSize: 11, color: '#8E9AA5' }}>Challan No:</span>
                <span style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#17283A', marginTop: 3 }}>#UPI24894385629562</span>
              </span>
              <span style={{ flex: '0 0 auto', background: '#FFEFD4', borderRadius: 5, padding: '5px 11px', fontSize: 11.5, fontWeight: 600, color: '#C97A0A' }}>Settlement Pending</span>
            </div>
            <div style={{ borderTop: '1px solid #EDF0F2', padding: '13px 16px' }}>
              <div style={{ fontSize: 12, lineHeight: 1.5, color: '#17283A' }}>
                <span style={{ fontWeight: 700 }}>Offence</span> - Disobey of lawful direction in case of an accident or damaging property
              </div>
            </div>
            <div style={{ borderTop: '1px dashed #D8DEE3', padding: '13px 16px 15px 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
              <SummaryLineRow label="Challan Amount" value="₹2,500" />
              <SummaryLineRow label="Agent fee" value="₹100" />
              <SummaryLineRow label="GST (18%)" value="₹360" />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11, marginTop: 20 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flex: '0 0 auto', marginTop: 1 }}>
              <path d="M2.5 9.2L12 3.6l9.5 5.6" stroke="#1F5FC4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.6 9.6v9.4M9.5 9.6v9.4M14.5 9.6v9.4M19.4 9.6v9.4" stroke="#1F5FC4" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M2 20.4h20" stroke="#1F5FC4" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span>
              <span style={{ display: 'block', fontSize: 13.5, fontWeight: 700, color: '#17283A' }}>Offline settlement</span>
              <span style={{ display: 'block', fontSize: 11.5, color: '#4A5866', marginTop: 3 }}>Offline challans are settled in around 30 days</span>
            </span>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 9, boxShadow: '0 1px 4px rgba(23,40,58,0.08)', overflow: 'hidden', marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '14px 16px 12px 16px' }}>
              <span>
                <span style={{ display: 'block', fontSize: 11, color: '#8E9AA5' }}>Challan No:</span>
                <span style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#17283A', marginTop: 3 }}>#UPI24894385629562</span>
              </span>
              <span style={{ flex: '0 0 auto', background: '#FFEFD4', borderRadius: 5, padding: '5px 11px', fontSize: 11.5, fontWeight: 600, color: '#C97A0A' }}>Settlement Pending</span>
            </div>
            <div style={{ borderTop: '1px solid #EDF0F2', padding: '13px 16px' }}>
              <div style={{ fontSize: 12, lineHeight: 1.5, color: '#17283A' }}>
                <span style={{ fontWeight: 700 }}>Offence</span> - Disobey of lawful direction in case of an accident or damaging property
              </div>
            </div>
            <div style={{ borderTop: '1px dashed #D8DEE3', padding: '13px 16px 15px 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
              <SummaryLineRow label="Challan Amount" value="₹2,500" />
              <SummaryLineRow label="Agent fee" value="₹500" />
              <SummaryLineRow label="GST (18%)" value="₹360" />
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 9, boxShadow: '0 1px 4px rgba(23,40,58,0.08)', padding: '15px 16px', marginTop: 18 }}>
            <SummaryLineRow label="Challan total" value="₹6,420" />
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'landing') {
    return (
      <div style={{ ...PHONE, background: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 8px 20px' }}>
          <span style={{ width: 11, height: 11, background: '#17283A', borderRadius: 2 }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#17283A' }}>12:30</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="#17283A">
              <path d="M7.5 9.6L1 4.1a10 10 0 0 1 13 0L7.5 9.6z" />
            </svg>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="#17283A">
              <path d="M14 1v9H1L14 1z" />
            </svg>
            <svg width="10" height="12" viewBox="0 0 10 12" fill="#17283A">
              <rect x="0" y="0.5" width="9" height="11" rx="1.6" />
            </svg>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 12px 20px' }}>
          <img src="/assets/c24-logo.png" alt="CARS24" style={{ width: 74, height: 'auto', display: 'block' }} />
          <span style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#17283A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5.2 3h3.1l1.6 3.9-1.9 1.2a9.7 9.7 0 0 0 5.9 5.9l1.2-1.9L19 13.7v3.1a1.7 1.7 0 0 1-1.8 1.7A16 16 0 0 1 3.5 4.8 1.7 1.7 0 0 1 5.2 3z" />
            </svg>
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="#17283A" strokeWidth="1.8" strokeLinecap="round">
              <path d="M1 2h20M1 8h20M1 14h20" />
            </svg>
          </span>
        </div>
        <img
          src="/assets/c24-hero-banner.png"
          alt="Check &amp; Pay Traffic eChallan Online — check status, pay and manage, get assistance"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <div style={{ padding: '18px 20px 0 20px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#17283A' }}>Enter vehicle number</div>
          <div style={{ border: '1px solid #DDE3E8', borderRadius: 8, padding: '15px 16px', marginTop: 14, fontSize: 13.5, color: '#98A3AD' }}>Eg. DL11AD3345</div>
          <div style={{ background: '#EF6612', borderRadius: 8, textAlign: 'center', padding: '17px 0', marginTop: 16, fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', color: '#FFFFFF' }}>
            GET CHALLAN DETAILS
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#17283A', marginTop: 30 }}>How to Check &amp; Pay Traffic Challan?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginTop: 20 }}>
            {[
              { img: '/assets/c24-step1.png', step: 'Step 1', desc: 'Enter registration number' },
              { img: '/assets/c24-step2.png', step: 'Step 2', desc: 'View all challan details' },
              { img: '/assets/c24-step3.png', step: 'Step 3', desc: 'Pay with Cars24' },
            ].map((s) => (
              <div key={s.step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <img src={s.img} alt={s.desc} style={{ width: 62, height: 62, display: 'block' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#17283A', marginTop: 12 }}>{s.step}</span>
                <span style={{ fontSize: 12.5, lineHeight: 1.5, color: '#4A5866', marginTop: 8 }}>{s.desc}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#17283A', marginTop: 30 }}>What is traffic eChallan?</div>
        </div>
      </div>
    );
  }

  // verify
  return (
    <div style={{ ...PHONE, background: '#FFFFFF' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img
          src="/assets/c24-hero-banner.png"
          alt=""
          style={{ position: 'absolute', left: 0, top: 46, width: '100%', height: 'auto', display: 'block', filter: 'blur(16px)', transform: 'scale(1.12)' }}
        />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 46, background: '#F1EEE9', filter: 'blur(10px)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 336, bottom: 0, background: '#FBFAF8', filter: 'blur(12px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(23,40,58,0.14)' }} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#FFFFFF', borderRadius: '14px 14px 22px 22px', padding: '26px 22px 0 22px' }}>
        <div style={{ fontSize: 19, fontWeight: 700, color: '#17283A' }}>Hi, Kshitij Kumar</div>
        <div style={{ fontSize: 13.5, lineHeight: 1.55, color: '#4A5866', marginTop: 10, maxWidth: '30ch' }}>To continue, please verify your mobile number</div>
        <div style={{ background: '#EF6612', borderRadius: 8, textAlign: 'center', padding: '17px 0', marginTop: 22, fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', color: '#FFFFFF' }}>
          PROCEED WITH 7348676904
        </div>
        <div style={{ textAlign: 'center', padding: '22px 0', fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', color: '#4A5866' }}>ENTER DETAILS MANUALLY</div>
        <div style={{ borderTop: '1px solid #EDF0F2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '14px 0 0 0' }}>
          <span style={{ fontSize: 9.5, lineHeight: 1.55, color: '#6B7784' }}>
            By continuing you consent to share your name and number with <span style={{ fontWeight: 700, color: '#17283A' }}>CARS24</span>, and agree to{' '}
            <span style={{ fontWeight: 700, color: '#17283A' }}>CARS24</span>'s{' '}
            <a href="#" style={{ fontWeight: 500, color: '#1F5FC4', textDecoration: 'underline' }}>
              privacy policy
            </a>{' '}
            and{' '}
            <a href="#" style={{ fontWeight: 500, color: '#1F5FC4', textDecoration: 'underline' }}>
              terms of service
            </a>
          </span>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="#6B7784" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}>
            <path d="M1 1l7 7 7-7" />
          </svg>
        </div>
        <div style={{ textAlign: 'center', padding: '20px 0 26px 0', fontSize: 12.5, color: '#4A5866' }}>
          Instant Verification by <span style={{ fontWeight: 700, color: '#17283A' }}>Truecaller</span>
        </div>
      </div>
    </div>
  );
}
