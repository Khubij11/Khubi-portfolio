import { useState } from 'react';

const SECTORS: Record<string, { color: string; tagBg: string }> = {
  FinTech: { color: 'rgb(43,94,232)', tagBg: 'rgba(43,94,232,0.094)' },
  HealthTech: { color: 'rgb(20,194,194)', tagBg: 'rgba(20,194,194,0.12)' },
  DeepTech: { color: 'rgb(12,26,53)', tagBg: 'rgba(12,26,53,0.08)' },
  EdTech: { color: 'rgb(245,166,35)', tagBg: 'rgba(245,166,35,0.15)' },
  ClimaTech: { color: 'rgb(56,161,105)', tagBg: 'rgba(56,161,105,0.12)' },
  SaaS: { color: 'rgb(244,124,32)', tagBg: 'rgba(244,124,32,0.12)' },
};

const SYNDICATES = [
  { name: 'Fintech Alpha', logo: 'fintech-alpha', sector: 'FinTech', stage: 'Series A', desc: 'Reimagining payments for emerging markets', lead: 'Arjun Sharma', leadImg: 'arjun', closes: 'Closes 12 days', raised: '72% raised', pct: '72%', target: '₹5 Cr', members: '32', ticket: '₹5 L', hot: true },
  { name: 'HealthTech Beta', logo: 'healthtech-beta', sector: 'HealthTech', stage: 'Seed', desc: 'AI diagnostics at the point of care', lead: 'Priya Nair', leadImg: 'priya', closes: 'Closes 21 days', raised: '48% raised', pct: '48%', target: '₹2 Cr', members: '18', ticket: '₹2 L', hot: false },
  { name: 'Deep Tech Beta', logo: 'deeptech-beta', sector: 'DeepTech', stage: 'Pre-seed', desc: 'Quantum-safe cryptography for enterprise security', lead: 'Rohit Singh', leadImg: 'rohit', closes: 'Closes 30 days', raised: '30% raised', pct: '30%', target: '₹1.5 Cr', members: '14', ticket: '₹1 L', hot: false },
  { name: 'EdTech Gamma', logo: 'edtech-gamma', sector: 'EdTech', stage: 'Seed', desc: 'Personalised learning for Tier-2 India at scale', lead: 'Meera Iyer', leadImg: 'meera', closes: 'Closes 8 days', raised: '61% raised', pct: '61%', target: '₹3 Cr', members: '26', ticket: '₹3 L', hot: true },
  { name: 'Climate Ventures', logo: 'climate-ventures', sector: 'ClimaTech', stage: 'Series A', desc: 'Carbon credit infrastructure for Indian corporates', lead: 'Ananya Rao', leadImg: 'ananya', closes: 'Closes 18 days', raised: '55% raised', pct: '55%', target: '₹8 Cr', members: '41', ticket: '₹10 L', hot: false },
  { name: 'SaaS Collective', logo: 'saas-collective', sector: 'SaaS', stage: 'Pre-seed', desc: 'B2B supply chain visibility for Indian SMEs', lead: 'Vikram Mehta', leadImg: 'vikram', closes: 'Closes 4 days', raised: '85% raised', pct: '85%', target: '₹1 Cr', members: '11', ticket: '₹1 L', hot: true },
];

const LEADS = [
  { name: 'Arjun Sharma', img: 'arjun', sector: 'FinTech', deals: '5 deals' },
  { name: 'Priya Nair', img: 'priya', sector: 'HealthTech', deals: '3 deals' },
  { name: 'Rohit Singh', img: 'rohit', sector: 'DeepTech', deals: '4 deals' },
  { name: 'Meera Iyer', img: 'meera', sector: 'EdTech', deals: '2 deals' },
  { name: 'Ananya Rao', img: 'ananya', sector: 'ClimaTech', deals: '6 deals' },
  { name: 'Vikram Mehta', img: 'vikram', sector: 'SaaS', deals: '3 deals' },
];

const HOLDINGS = [
  { name: 'Fintech Alpha', logo: 'fintech-alpha', sector: 'FinTech', stage: 'Series A', lead: 'Arjun Sharma', leadImg: 'arjun', date: 'Mar 2023', invested: '₹5 L', value: '₹7.2 L', moic: '1.44x', irr: '+44%', status: 'Active' },
  { name: 'EdTech Gamma', logo: 'edtech-gamma', sector: 'EdTech', stage: 'Seed', lead: 'Meera Iyer', leadImg: 'meera', date: 'Jul 2023', invested: '₹3 L', value: '₹3.9 L', moic: '1.30x', irr: '+30%', status: 'Active' },
  { name: 'Climate Ventures', logo: 'climate-ventures', sector: 'ClimaTech', stage: 'Series A', lead: 'Ananya Rao', leadImg: 'ananya', date: 'Nov 2023', invested: '₹10 L', value: '₹10.8 L', moic: '1.08x', irr: '+8%', status: 'Active' },
  { name: 'SaaS Collective', logo: 'saas-collective', sector: 'SaaS', stage: 'Acquired', lead: 'Vikram Mehta', leadImg: 'vikram', date: 'Jan 2022', invested: '₹1 L', value: '₹2.1 L', moic: '2.10x', irr: '+110%', status: 'Exited' },
  { name: 'HealthTech Beta', logo: 'healthtech-beta', sector: 'HealthTech', stage: 'Seed', lead: 'Priya Nair', leadImg: 'priya', date: 'Sep 2023', invested: '₹2 L', value: '₹1.6 L', moic: '0.80x', irr: '-20%', status: 'Active' },
];

const STEPS = [
  { num: '01', title: 'Apply & Verify', body: 'Complete KYC and get accredited investor status in under 48 hours.', color: 'rgb(43,94,232)' },
  { num: '02', title: 'Join a Syndicate', body: 'Browse curated deals and request to join syndicates that match your thesis.', color: 'rgb(20,194,194)' },
  { num: '03', title: 'Commit Capital', body: 'Review the pitch deck, set your ticket size, and transfer funds securely.', color: 'rgb(245,166,35)' },
  { num: '04', title: 'Track Returns', body: 'Monitor your portfolio, receive updates, and exit when the time is right.', color: 'rgb(244,124,32)' },
];

const KPIS = [
  { label: 'Total Invested', value: '₹21 L', note: 'Across 5 syndicates', bg: '#fff', border: 'rgb(226,232,240)', color: 'rgb(26,26,46)' },
  { label: 'Current Value', value: '₹25.6 L', note: 'Mark-to-market', bg: '#fff', border: 'rgb(226,232,240)', color: 'rgb(43,94,232)' },
  { label: 'Unrealised Gain', value: '+₹4.6 L', note: 'Since inception', bg: 'rgb(240,255,244)', border: 'rgba(56,161,105,0.25)', color: 'rgb(56,161,105)' },
  { label: 'Portfolio IRR', value: '+22.1%', note: 'Blended, annualised', bg: 'rgb(240,255,244)', border: 'rgba(56,161,105,0.25)', color: 'rgb(56,161,105)' },
];

const PORTFOLIO_SECTORS = [
  { name: 'FinTech', pct: '38%', color: 'rgb(43,94,232)' },
  { name: 'EdTech', pct: '22%', color: 'rgb(245,166,35)' },
  { name: 'ClimaTech', pct: '18%', color: 'rgb(56,161,105)' },
  { name: 'HealthTech', pct: '14%', color: 'rgb(20,194,194)' },
  { name: 'SaaS', pct: '8%', color: 'rgb(244,124,32)' },
];

const ACTIVITY = [
  { text: 'Fintech Alpha raised Series B at 2× valuation', when: '2 days ago', color: 'rgb(43,94,232)', bg: 'rgb(238,242,255)' },
  { text: 'SaaS Collective acquisition completed — 2.1× return', when: '3 weeks ago', color: 'rgb(56,161,105)', bg: 'rgb(240,255,244)' },
  { text: 'EdTech Gamma Q3 investor update published', when: '1 month ago', color: 'rgb(245,166,35)', bg: 'rgb(255,244,237)' },
  { text: 'Climate Ventures new deal room open for members', when: '1 month ago', color: 'rgb(244,124,32)', bg: 'rgb(255,244,237)' },
  { text: 'KYC renewal completed for HealthTech Beta', when: '2 months ago', color: 'rgb(20,194,194)', bg: 'rgba(20,194,194,0.1)' },
];

const img = (n: string) => `url(/assets/klub/${n}.jpg)`;

const kicker = (color: string): React.CSSProperties => ({
  fontSize: 11,
  fontWeight: 800,
  lineHeight: '16.5px',
  letterSpacing: '1.54px',
  textTransform: 'uppercase',
  color,
});

export interface KlubSyndicateProps {
  startPage?: 'Syndicates' | 'My Portfolio';
  section?: 'Full' | 'Discovery' | 'Community';
  maxCards?: number;
  maxHoldings?: number;
}

export default function KlubSyndicate({ startPage = 'Syndicates', section = 'Full', maxCards = 0, maxHoldings = 0 }: KlubSyndicateProps) {
  const [tab, setTab] = useState(startPage);
  const [filter, setFilter] = useState('All');

  const showTop = section === 'Full' || section === 'Discovery';
  const showBottom = section === 'Full' || section === 'Community';

  const visible = filter === 'All' ? SYNDICATES : SYNDICATES.filter((s) => s.sector === filter);
  const cards = (maxCards ? visible.slice(0, maxCards) : visible).map((s) => ({
    ...s,
    color: SECTORS[s.sector].color,
    tagBg: SECTORS[s.sector].tagBg,
  }));
  const holdings = (maxHoldings ? HOLDINGS.slice(0, maxHoldings) : HOLDINGS).map((h) => ({
    ...h,
    color: SECTORS[h.sector].color,
    tagBg: SECTORS[h.sector].tagBg,
    irrColor: h.irr.charAt(0) === '-' ? 'rgb(229,62,62)' : 'rgb(56,161,105)',
    statusColor: h.status === 'Exited' ? 'rgb(74,85,104)' : 'rgb(56,161,105)',
    statusBg: h.status === 'Exited' ? 'rgb(237,242,247)' : 'rgb(240,255,244)',
  }));

  return (
    <div style={{ minHeight: '100%', background: 'rgb(248,249,251)', color: 'rgb(26,26,46)', fontFamily: '"Open Sans", -apple-system, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid rgb(226,232,240)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', gap: 32, padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgb(43,94,232)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: '#fff' }}>K</div>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.4px', color: 'rgb(26,26,46)' }}>klub</span>
            <span style={{ fontSize: 12, fontWeight: 400, color: 'rgb(113,128,150)', paddingLeft: 4 }}>Syndicate</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['Syndicates', 'My Portfolio', 'Deal Flow', 'Community'].map((label) => (
              <div
                key={label}
                onClick={() => setTab(label as 'Syndicates' | 'My Portfolio')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  color: label === tab ? 'rgb(43,94,232)' : 'rgb(74,85,104)',
                  background: label === tab ? 'rgb(238,242,255)' : 'transparent',
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 999, background: `${img('arjun')} center / cover no-repeat`, boxShadow: '0 0 0 2px rgb(226,232,240)' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 12, fontWeight: 700, lineHeight: '16px', color: 'rgb(26,26,46)' }}>Arjun Sharma</span>
                <span style={{ fontSize: 10, fontWeight: 400, lineHeight: '14.286px', color: 'rgb(113,128,150)' }}>Syndicate Member</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {tab === 'Syndicates' && (
        <div>
          {showTop && (
            <div>
              <div style={{ position: 'relative', background: 'rgb(12,26,53)', overflow: 'hidden' }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.5,
                    backgroundImage:
                      'radial-gradient(rgba(147,180,255,0.55) 1.5px, transparent 1.6px), radial-gradient(rgba(147,180,255,0.25) 1px, transparent 1.1px)',
                    backgroundSize: '96px 88px, 32px 30px',
                    backgroundPosition: '12px 10px, 0 0',
                  }}
                />
                <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '48px 32px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, background: 'rgba(43,94,232,0.35)' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, lineHeight: '16px', color: 'rgb(147,180,255)' }}>🚀 42 active syndicates · ₹14.8 Cr deployed</span>
                  </div>
                  <h1 style={{ margin: '12px 0 0', maxWidth: 460, fontSize: 36, fontWeight: 800, lineHeight: '45px', color: '#fff' }}>Co-invest in India's most promising startups</h1>
                  <p style={{ margin: '12px 0 24px', width: 448, fontSize: 14, fontWeight: 400, lineHeight: '20px', color: 'rgba(255,255,255,0.6)' }}>
                    Join curated syndicates led by experienced angel investors. Access deals typically reserved for top-tier VC networks.
                  </p>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ width: 180, padding: '10px 24px', borderRadius: 12, background: 'rgb(43,94,232)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#fff' }}>
                      Explore Syndicates
                    </div>
                    <div style={{ width: 142, padding: '10px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14, fontWeight: 700, lineHeight: '20px', color: 'rgba(255,255,255,0.75)' }}>
                      How it works
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#fff', borderBottom: '1px solid rgb(226,232,240)' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 32px', display: 'flex', gap: 40 }}>
                  {[
                    { value: '₹14.8 Cr', label: 'Capital Deployed', color: 'rgb(26,26,46)' },
                    { value: '42', label: 'Active Syndicates', color: 'rgb(244,124,32)' },
                    { value: '680+', label: 'Registered Members', color: 'rgb(20,194,194)' },
                    { value: '29', label: 'Startups Funded', color: 'rgb(56,161,105)' },
                    { value: '24%', label: 'Avg. IRR', color: 'rgb(245,166,35)' },
                  ].map((st) => (
                    <div key={st.label} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontSize: 20, fontWeight: 800, lineHeight: '28px', whiteSpace: 'nowrap', color: st.color }}>{st.value}</span>
                      <span style={{ fontSize: 11, fontWeight: 400, lineHeight: '15px', maxWidth: 76, color: 'rgb(113,128,150)' }}>{st.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px' }}>
            {showTop && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
                  <div>
                    <div style={kicker('rgb(43,94,232)')}>Open for Investment</div>
                    <div style={{ padding: '4px 0', fontSize: 20, fontWeight: 800, lineHeight: '28px', color: 'rgb(26,26,46)' }}>Active Syndicates</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {['All', 'FinTech', 'HealthTech', 'DeepTech', 'EdTech', 'ClimaTech', 'SaaS'].map((label) => (
                      <div
                        key={label}
                        onClick={() => setFilter(label)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 700,
                          lineHeight: '18px',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          color: label === filter ? '#fff' : 'rgb(74,85,104)',
                          background: label === filter ? 'rgb(43,94,232)' : '#fff',
                          border: `1px solid ${label === filter ? 'rgb(43,94,232)' : 'rgb(226,232,240)'}`,
                        }}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: 'rgb(113,128,150)' }}>
                    Showing {maxCards ? Math.min(maxCards, visible.length) : visible.length} of 42 syndicates
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 400, color: 'rgb(113,128,150)' }}>Sort by</span>
                    <div style={{ width: 114, height: 32.5, borderRadius: 8, border: '1px solid rgb(226,232,240)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px 0 13px', cursor: 'pointer' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'rgb(74,85,104)' }}>Closing Soon</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '20px 0', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 20 }}>
                  {cards.map((s) => (
                    <div key={s.name} style={{ borderRadius: 16, background: '#fff', border: '1px solid rgb(226,232,240)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                      <div style={{ display: 'flex', gap: 16, padding: '20px 20px 16px' }}>
                        <div style={{ width: 64, height: 64, flexShrink: 0, borderRadius: 12, background: `${img(s.logo)} center / cover no-repeat` }} />
                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                            <span style={{ fontSize: 14, fontWeight: 800, lineHeight: '19.25px', color: 'rgb(26,26,46)' }}>{s.name}</span>
                            {s.hot && (
                              <span style={{ flexShrink: 0, padding: '2px 8px', borderRadius: 999, background: 'rgb(255,244,237)', fontSize: 10, fontWeight: 700, lineHeight: '15px', color: 'rgb(244,124,32)' }}>🔥 Hot</span>
                            )}
                          </div>
                          <div style={{ padding: '4px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700, lineHeight: '15px', color: s.color, background: s.tagBg }}>{s.sector}</span>
                            <span style={{ fontSize: 10, fontWeight: 400, lineHeight: '15px', color: 'rgb(113,128,150)' }}>{s.stage}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <div style={{ paddingBottom: 16, fontSize: 12, fontWeight: 400, lineHeight: '20px', color: 'rgb(74,85,104)' }}>{s.desc}</div>
                        <div style={{ paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid rgb(226,232,240)', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 24, height: 24, borderRadius: 999, flexShrink: 0, background: `${img(s.leadImg)} center / cover no-repeat` }} />
                          <span style={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', color: 'rgb(26,26,46)' }}>{s.lead}</span>
                          <span style={{ flexGrow: 1, textAlign: 'right', fontSize: 12, fontWeight: 400, lineHeight: '16px', color: 'rgb(113,128,150)' }}>{s.closes}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 11, fontWeight: 700, lineHeight: '16.5px', color: 'rgb(26,26,46)' }}>{s.raised}</span>
                          <span style={{ fontSize: 11, fontWeight: 400, lineHeight: '16.5px', color: 'rgb(113,128,150)' }}>{s.target}</span>
                        </div>
                        <div style={{ padding: '6px 0 16px' }}>
                          <div style={{ height: 6, borderRadius: 999, background: 'rgb(226,232,240)', overflow: 'hidden' }}>
                            <div style={{ height: 6, borderRadius: 999, width: s.pct, background: s.color }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 20, paddingBottom: 20 }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 800, lineHeight: '20px', color: 'rgb(26,26,46)' }}>{s.members}</div>
                            <div style={{ fontSize: 10, fontWeight: 400, lineHeight: '15px', color: 'rgb(113,128,150)' }}>Members</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 800, lineHeight: '20px', color: 'rgb(26,26,46)' }}>{s.ticket}</div>
                            <div style={{ fontSize: 10, fontWeight: 400, lineHeight: '15px', color: 'rgb(113,128,150)' }}>Min. Ticket</div>
                          </div>
                        </div>
                        <div style={{ marginTop: 'auto', height: 32, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 12, fontWeight: 700, lineHeight: '16px', color: '#fff', background: s.color }}>
                          View Syndicate →
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showBottom && (
              <div>
                <div style={{ padding: '48px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={kicker('rgb(20,194,194)')}>People</div>
                      <div style={{ padding: '4px 0', fontSize: 20, fontWeight: 800, lineHeight: '28px', color: 'rgb(26,26,46)' }}>Top Syndicate Leads</div>
                    </div>
                    <a href="#" style={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: 'rgb(43,94,232)' }}>
                      View all →
                    </a>
                  </div>
                  <div style={{ padding: '20px 0 0', display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0,1fr))', gap: 16 }}>
                    {LEADS.map((p) => (
                      <div key={p.name} style={{ borderRadius: 16, background: '#fff', border: '1px solid rgb(226,232,240)', padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{ position: 'relative', width: 56, height: 56, marginBottom: 8 }}>
                          <div style={{ width: 56, height: 56, borderRadius: 999, background: `${img(p.img)} center / cover no-repeat` }} />
                          <div style={{ position: 'absolute', right: 1, bottom: 1, width: 11, height: 11, borderRadius: 999, background: 'rgb(56,161,105)', border: '2px solid #fff' }} />
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 700, lineHeight: '16px', color: 'rgb(26,26,46)' }}>{p.name}</div>
                        <div style={{ fontSize: 10, fontWeight: 400, lineHeight: '15px', color: 'rgb(113,128,150)' }}>{p.sector}</div>
                        <div style={{ marginTop: 6, padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700, lineHeight: '15px', color: SECTORS[p.sector].color, background: SECTORS[p.sector].tagBg }}>{p.deals}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '40px 0' }}>
                  <div style={{ borderRadius: 24, background: 'rgb(12,26,53)', padding: 40 }}>
                    <div style={{ textAlign: 'center', ...kicker('rgb(244,124,32)') }}>Getting Started</div>
                    <div style={{ padding: '8px 0', textAlign: 'center', fontSize: 24, fontWeight: 800, lineHeight: '32px', color: '#fff' }}>How Klub Syndicate works</div>
                    <div style={{ padding: '32px 0 0', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 24 }}>
                      {STEPS.map((st) => (
                        <div key={st.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                          <div style={{ width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: '#fff', background: st.color }}>{st.num}</div>
                          <div style={{ padding: '16px 0 8px', fontSize: 14, fontWeight: 800, lineHeight: '20px', color: '#fff' }}>{st.title}</div>
                          <div style={{ fontSize: 12, fontWeight: 400, lineHeight: '20px', color: 'rgba(255,255,255,0.6)' }}>{st.body}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'My Portfolio' && (
        <div>
          <div style={{ background: '#fff', borderBottom: '1px solid rgb(226,232,240)' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: 32 }}>
              <div style={kicker('rgb(43,94,232)')}>Overview</div>
              <div style={{ padding: '4px 0', fontSize: 30, fontWeight: 800, lineHeight: '42px', color: 'rgb(26,26,46)' }}>My Portfolio</div>
              <div style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: 'rgb(113,128,150)' }}>Updated as of Sep 4, 2026</div>
            </div>
          </div>

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 20 }}>
              {KPIS.map((k) => (
                <div key={k.label} style={{ borderRadius: 16, padding: 24, background: k.bg, border: `1px solid ${k.border}` }}>
                  <div style={{ fontSize: 11, fontWeight: 800, lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: 'rgb(113,128,150)' }}>{k.label}</div>
                  <div style={{ padding: '8px 0 4px', fontSize: 28, fontWeight: 800, lineHeight: '38px', color: k.color }}>{k.value}</div>
                  <div style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: 'rgb(113,128,150)' }}>{k.note}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: '40px 0', display: 'grid', gridTemplateColumns: '324px minmax(0,1fr)', gap: 24, alignItems: 'stretch' }}>
              <div style={{ borderRadius: 16, background: '#fff', border: '1px solid rgb(226,232,240)', padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 800, lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: 'rgb(113,128,150)' }}>Sector Allocation</div>
                <div style={{ padding: '20px 0 0' }}>
                  {PORTFOLIO_SECTORS.map((sec) => (
                    <div key={sec.name} style={{ paddingBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', color: 'rgb(26,26,46)' }}>{sec.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: 'rgb(113,128,150)' }}>{sec.pct}</span>
                      </div>
                      <div style={{ marginTop: 6, height: 6, borderRadius: 999, background: 'rgb(226,232,240)', overflow: 'hidden' }}>
                        <div style={{ height: 6, borderRadius: 999, width: sec.pct, background: sec.color }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '12px 0', display: 'flex', gap: 2, height: 12 }}>
                  {PORTFOLIO_SECTORS.map((sec) => (
                    <div key={sec.name} style={{ height: 12, borderRadius: 999, flexBasis: sec.pct, background: sec.color }} />
                  ))}
                </div>
                <div style={{ paddingTop: 12, display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
                  {PORTFOLIO_SECTORS.map((sec) => (
                    <div key={sec.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: sec.color }} />
                      <span style={{ fontSize: 11, fontWeight: 400, color: 'rgb(113,128,150)' }}>{sec.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderRadius: 16, background: '#fff', border: '1px solid rgb(226,232,240)', padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 800, lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: 'rgb(113,128,150)' }}>Recent Activity</div>
                <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {ACTIVITY.map((a) => (
                    <div key={a.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: a.bg }}>
                        <span style={{ width: 10, height: 10, borderRadius: 3, background: a.color }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: 'rgb(26,26,46)' }}>{a.text}</div>
                        <div style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: 'rgb(113,128,150)' }}>{a.when}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ borderRadius: 16, background: '#fff', border: '1px solid rgb(226,232,240)', overflow: 'hidden' }}>
              <div style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: 'rgb(113,128,150)' }}>Investments</div>
                  <div style={{ paddingTop: 4, fontSize: 20, fontWeight: 800, lineHeight: '28px', color: 'rgb(26,26,46)' }}>Holdings</div>
                </div>
                <div style={{ padding: '10px 18px', borderRadius: 10, border: '1px solid rgb(226,232,240)', fontSize: 12, fontWeight: 700, color: 'rgb(74,85,104)', cursor: 'pointer' }}>Export CSV</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2.2fr) minmax(0,1.4fr) 0.8fr 0.9fr 0.9fr 0.7fr 0.7fr 0.8fr', padding: '12px 24px', borderTop: '1px solid rgb(226,232,240)', borderBottom: '1px solid rgb(226,232,240)', background: 'rgb(248,249,251)', fontSize: 10, fontWeight: 800, letterSpacing: '0.55px', textTransform: 'uppercase', color: 'rgb(113,128,150)' }}>
                <div>Company</div>
                <div>Lead</div>
                <div>Date</div>
                <div>Invested</div>
                <div>Value</div>
                <div>MOIC</div>
                <div>IRR</div>
                <div style={{ textAlign: 'right' }}>Status</div>
              </div>
              {holdings.map((h) => (
                <div key={h.name} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2.2fr) minmax(0,1.4fr) 0.8fr 0.9fr 0.9fr 0.7fr 0.7fr 0.8fr', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid rgb(226,232,240)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 10, background: `${img(h.logo)} center / cover no-repeat` }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, lineHeight: '19.25px', color: 'rgb(26,26,46)' }}>{h.name}</div>
                      <div style={{ paddingTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700, lineHeight: '15px', color: h.color, background: h.tagBg }}>{h.sector}</span>
                        <span style={{ fontSize: 10, fontWeight: 400, color: 'rgb(113,128,150)' }}>{h.stage}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, flexShrink: 0, borderRadius: 999, background: `${img(h.leadImg)} center / cover no-repeat` }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'rgb(26,26,46)' }}>{h.lead}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 400, color: 'rgb(113,128,150)' }}>{h.date}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'rgb(26,26,46)' }}>{h.invested}</div>
                    <div style={{ fontSize: 10, color: 'rgb(113,128,150)' }}>Invested</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: 'rgb(26,26,46)' }}>{h.value}</div>
                    <div style={{ fontSize: 10, color: 'rgb(113,128,150)' }}>Current</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'rgb(26,26,46)' }}>{h.moic}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: h.irrColor }}>{h.irr}</div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700, lineHeight: '15px', color: h.statusColor, background: h.statusBg }}>{h.status}</span>
                  </div>
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2.2fr) minmax(0,1.4fr) 0.8fr 0.9fr 0.9fr 0.7fr 0.7fr 0.8fr', alignItems: 'center', padding: '18px 24px', background: 'rgb(248,249,251)' }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.55px', textTransform: 'uppercase', color: 'rgb(74,85,104)' }}>Total</div>
                <div />
                <div />
                <div style={{ fontSize: 14, fontWeight: 800, color: 'rgb(26,26,46)' }}>₹21 L</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'rgb(26,26,46)' }}>₹25.6 L</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'rgb(26,26,46)' }}>1.22x</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'rgb(56,161,105)' }}>+22.1%</div>
                <div />
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: '#fff', borderTop: '1px solid rgb(226,232,240)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, background: 'rgb(43,94,232)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff' }}>K</div>
            <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.3px', color: 'rgb(26,26,46)' }}>klub</span>
            <span style={{ fontSize: 12, fontWeight: 400, color: 'rgb(113,128,150)' }}>· Syndicate Platform · 2020</span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 400, color: 'rgb(113,128,150)' }}>For accredited investors only. Investments carry risk.</span>
        </div>
      </div>
    </div>
  );
}
