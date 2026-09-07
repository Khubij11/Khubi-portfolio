import type { CSSProperties, ReactNode } from 'react';

// Static port of `WF Savings Mobile.dc.html` — three phone mockups (A/B/C)
// laid out side by side. Not prototyped; each phone scrolls inside its frame.

const label12: CSSProperties = { fontSize: 10.5, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#A8A29E' };

function PhoneFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ width: 412, flexShrink: 0 }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#A8A29E', marginBottom: 16 }}>{label}</div>
      <div style={{ boxSizing: 'border-box', width: 412, height: 748, border: '11px solid #1C1917', borderRadius: 46, overflowY: 'auto', overflowX: 'hidden', background: '#F1EFEA', boxShadow: '0 8px 24px rgba(28,25,23,0.18)' }}>
        {children}
      </div>
    </div>
  );
}

function Masthead() {
  return (
    <div style={{ background: '#D71E28', borderBottom: '3px solid #FFCD41', padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', color: '#FFFFFF' }}>WELLS FARGO</div>
      <span style={{ flexGrow: 1 }} />
      <div style={{ width: 24, height: 24, borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="9" r="3.4" /><path d="M5.5 20c0-3.3 2.9-5.2 6.5-5.2s6.5 1.9 6.5 5.2" /></svg>
      </div>
    </div>
  );
}

function Stepper({ value }: { value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 3 }}>
      <div style={{ flexGrow: 1, minWidth: 0, fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em' }}>{value}</div>
      <div style={{ width: 38, height: 38, borderRadius: 9, border: '1px solid #E7E5E4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#57534E" strokeWidth="2.2" strokeLinecap="round"><path d="M6 12h12" /></svg>
      </div>
      <div style={{ width: 38, height: 38, borderRadius: 9, border: '1px solid #E7E5E4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#57534E" strokeWidth="2.2" strokeLinecap="round"><path d="M12 6v12M6 12h12" /></svg>
      </div>
    </div>
  );
}

function ScreenA() {
  return (
    <PhoneFrame label="A · Step 4 — Pay yourself first">
      <Masthead />
      <div style={{ position: 'sticky', top: 0, background: '#FFFFFF', borderBottom: '1px solid #E7E5E4', padding: '14px 18px 12px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#57534E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12H5M11 6l-6 6 6 6" /></svg>
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#D71E28' }}>Step 4 of 7 · Savings</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 1 }}>Pay yourself first</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A8A29E' }}>To spend</div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', color: '#0E7A42' }}>$1,980</div>
          </div>
        </div>
        <div style={{ height: 3, background: '#EDE9E1', marginTop: 11, overflow: 'hidden' }}>
          <div style={{ height: 3, background: '#D71E28', width: '57%' }} />
        </div>
      </div>

      <div style={{ padding: '16px 0 20px 0' }}>
        <div style={{ background: '#fff', borderTop: '1px solid #E7E5E4', borderBottom: '1px solid #E7E5E4', padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ minWidth: 0 }}>
              <div style={label12}>Saving for</div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 21, fontWeight: 700, letterSpacing: '-0.025em', marginTop: 3 }}>Emergency fund</div>
            </div>
            <div style={{ flexShrink: 0, fontSize: 12.5, fontWeight: 700, color: '#57534E', textDecoration: 'underline', textUnderlineOffset: '3px', paddingTop: 16 }}>Change</div>
          </div>

          <div style={{ marginTop: 20 }}>
            <div style={label12}>Target amount</div>
            <Stepper value="$12,000" />
          </div>
          <div style={{ marginTop: 18 }}>
            <div style={label12}>Target date</div>
            <Stepper value="May 2028" />
          </div>

          <div style={{ ...label12, marginTop: 20 }}>Where should it go?</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: '1.5px solid #D71E28', background: '#FDF2F2', marginTop: 9 }}>
            <div style={{ width: 19, height: 19, borderRadius: 999, flexShrink: 0, border: '1.5px solid #D71E28', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 9, height: 9, borderRadius: 999, background: '#D71E28' }} />
            </div>
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Way2Save Savings</div>
              <div style={{ fontSize: 12, color: '#78716C', marginTop: 1 }}>Ending in 3300</div>
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700, flexShrink: 0 }}>$8,680</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderBottom: '1px solid #E7E5E4', padding: 18, marginTop: 14 }}>
          <div style={label12}>Monthly savings</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em' }}>$500</div>
            <div style={{ padding: '5px 11px', borderRadius: 999, background: '#E3EDE6', color: '#0E7A42', fontSize: 12, fontWeight: 700 }}>20% of take-home</div>
          </div>
          <div style={{ height: 4, borderRadius: 999, background: '#E7E5E4', marginTop: 20, position: 'relative' }}>
            <div style={{ height: 4, borderRadius: 999, background: '#0E7A42', width: '20%' }} />
            <div style={{ position: 'absolute', left: '20%', top: -6, width: 16, height: 16, borderRadius: 999, background: '#0E7A42', border: '2px solid #fff', boxShadow: '0 0 0 1px #0E7A42', transform: 'translateX(-50%)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
            <span style={{ fontSize: 12, color: '#A8A29E' }}>$0</span>
            <span style={{ fontSize: 12, color: '#A8A29E' }}>$2,480</span>
          </div>
        </div>

        <div style={{ padding: '0 18px', marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 13, borderRadius: 12, padding: '16px 18px', background: '#FDF6EE', border: '1px solid #EFD9BC' }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: '#C06A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4l9 16H3zM12 10v4" /></svg>
            </div>
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: '#8A4E08' }}>At $500 a month you reach $12,000 in Sep 2028 — 4 months later than your target.</div>
              <div style={{ display: 'inline-block', marginTop: 10, padding: '9px 14px', borderRadius: 9, background: '#fff', border: '1px solid #EFD9BC', fontSize: 12.5, fontWeight: 700, color: '#8A4E08' }}>Save $600 a month to hit it</div>
            </div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#57534E', textDecoration: 'underline', textUnderlineOffset: '3px', marginTop: 16 }}>Skip for now — I'll set this up later</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#0E7A42', borderRadius: 12, padding: '18px 20px', marginTop: 16 }}>
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div style={{ ...label12, color: 'rgba(255,255,255,0.72)' }}>Available to spend</div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 30, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', marginTop: 2 }}>$1,980</div>
            </div>
            <div style={{ width: 34, height: 34, borderRadius: 999, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L19 7" /></svg>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 11, marginTop: 16 }}>
            <div style={{ padding: '17px 26px', borderRadius: 11, background: '#fff', border: '1px solid #E7E5E4', fontSize: 14.5, fontWeight: 700, flexShrink: 0 }}>Back</div>
            <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: 17, borderRadius: 11, background: '#D71E28', color: '#fff', fontSize: 14.5, fontWeight: 700 }}>
              Continue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenB() {
  return (
    <PhoneFrame label="B · Dashboard — your goals">
      <Masthead />
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E7E5E4', padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 999, background: '#0E7A42', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: '#FFFFFF' }}>RA</div>
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Rosita Alvarez</div>
            <div style={{ fontSize: 11.5, color: '#78716C' }}>December · 8 days left</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A8A29E' }}>Left</div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', color: '#0E7A42' }}>$330</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 0 20px 0' }}>
        <div style={{ padding: '0 18px' }}>
          <div style={{ background: '#0E7A42', borderRadius: 12, padding: 20 }}>
            <div style={{ ...label12, color: 'rgba(255,255,255,0.72)' }}>Available to spend</div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 40, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.1, color: '#fff', marginTop: 3 }}>$330</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', marginTop: 5 }}>$1,450 spent of $1,780 planned</div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '16px 18px', marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div><div style={{ fontSize: 11.5, color: '#78716C' }}>Income</div><div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 17, fontWeight: 700 }}>$5,240</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontSize: 11.5, color: '#78716C' }}>Saved</div><div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 17, fontWeight: 700, color: '#0E7A42' }}>$500</div></div>
              <div style={{ textAlign: 'right' }}><div style={{ fontSize: 11.5, color: '#78716C' }}>Fixed</div><div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 17, fontWeight: 700 }}>$2,760</div></div>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '16px 18px', marginTop: 12 }}>
            <div style={label12}>My savings</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.5, color: '#57534E', marginTop: 8 }}>Saving for school, a vacation, or a home?</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 11, fontSize: 13, fontWeight: 700, color: '#D71E28' }}>
              Create a savings plan
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 24 }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Your goals</div>
            <div style={{ fontSize: 12.5, color: '#78716C' }}>$500 a month</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, padding: '0 18px', marginTop: 12 }}>
          <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '15px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: '#EFEDE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0E7A42" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20V10M12 20V5M19 20v-7" /></svg>
              </div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Emergency fund</div>
                <div style={{ fontSize: 11.5, color: '#A8A29E', marginTop: 1 }}>Way2Save Savings ···3300</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 4 }}><path d="M9 6l6 6-6 6" /></svg>
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 12 }}>$2,000 <span style={{ fontSize: 14, fontWeight: 500, color: '#A8A29E' }}>of $12,000</span></div>
            <div style={{ height: 5, background: '#EDE9E1', borderRadius: 999, marginTop: 10, overflow: 'hidden' }}>
              <div style={{ height: 5, borderRadius: 999, background: '#0E7A42', width: '17%' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 11 }}>
              <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, color: '#0E7A42', background: '#E9F0EB' }}>On pace</span>
              <span style={{ fontSize: 11.5, color: '#A8A29E' }}>Target Mar 2029 · $350/mo</span>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #EFD9BC', borderRadius: 12, padding: '15px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: '#FDF6EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C06A0A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-6 8 6v9H4zM10 20v-5h4v5" /></svg>
              </div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Home down payment</div>
                <div style={{ fontSize: 11.5, color: '#A8A29E', marginTop: 1 }}>Way2Save Savings ···3300</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 4 }}><path d="M9 6l6 6-6 6" /></svg>
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 12 }}>$6,680 <span style={{ fontSize: 14, fontWeight: 500, color: '#A8A29E' }}>of $15,000</span></div>
            <div style={{ height: 5, background: '#EDE9E1', borderRadius: 999, marginTop: 10, overflow: 'hidden' }}>
              <div style={{ height: 5, borderRadius: 999, background: '#C06A0A', width: '45%' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 11 }}>
              <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, color: '#C06A0A', background: '#FDF1E7' }}>Behind — needs $640/mo</span>
            </div>
            <div style={{ fontSize: 11.5, color: '#A8A29E', marginTop: 7 }}>Target Oct 2027 · $150/mo</div>
          </div>

          <div style={{ border: '1.5px dashed #DAD5CB', borderRadius: 12, padding: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#78716C', fontSize: 13.5, fontWeight: 500 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>Add a goal
          </div>
        </div>

        <div style={{ padding: '0 18px' }}>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 24 }}>Spending by category</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            <div style={{ background: '#fff', border: '1px solid #F3C9C9', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: '#FDECEC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D71E28" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v8a2 2 0 0 0 4 0V3M8 11v10M17 3c-1.5 1-2 2.5-2 4s.5 3 2 4M17 3v18" /></svg>
                </div>
                <span style={{ flexGrow: 1, minWidth: 0, fontSize: 13.5, fontWeight: 700 }}>Dining Out</span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14.5, fontWeight: 700, color: '#D71E28', flexShrink: 0 }}>$280</span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14.5, fontWeight: 500, color: '#A8A29E', flexShrink: 0 }}>/ $280</span>
              </div>
              <div style={{ height: 5, background: '#EDE9E1', borderRadius: 999, marginTop: 11, overflow: 'hidden' }}>
                <div style={{ height: 5, borderRadius: 999, background: '#D71E28', width: '100%' }} />
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: '#EFEDE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#57534E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.5 10h10L20 7H6M9.5 19h.01M17 19h.01" /></svg>
                </div>
                <span style={{ flexGrow: 1, minWidth: 0, fontSize: 13.5, fontWeight: 700 }}>Groceries</span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14.5, fontWeight: 700, flexShrink: 0 }}>$485</span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14.5, fontWeight: 500, color: '#A8A29E', flexShrink: 0 }}>/ $520</span>
              </div>
              <div style={{ height: 5, background: '#EDE9E1', borderRadius: 999, marginTop: 11, overflow: 'hidden' }}>
                <div style={{ height: 5, borderRadius: 999, background: '#C06A0A', width: '93%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenC() {
  return (
    <PhoneFrame label="C · Goal detail">
      <Masthead />
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E7E5E4', padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#57534E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12H5M11 6l-6 6 6 6" /></svg>
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Home down payment</div>
            <div style={{ fontSize: 11.5, color: '#78716C' }}>Way2Save Savings ···3300</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 18px 20px 18px' }}>
        <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 36, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.1 }}>$6,680</div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 500, color: '#A8A29E' }}>of $15,000</div>
          </div>
          <div style={{ height: 9, background: '#EDE9E1', borderRadius: 999, marginTop: 18, overflow: 'hidden' }}>
            <div style={{ height: 9, borderRadius: 999, background: '#C06A0A', width: '45%' }} />
          </div>
          <div style={{ position: 'relative', height: 22, marginTop: 2 }}>
            <div style={{ position: 'absolute', left: '22%', top: 0 }}>
              <div style={{ width: 1, height: 8, background: '#A8A29E' }} />
              <div style={{ fontSize: 11, color: '#A8A29E', marginTop: 3, transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>Target Oct 2027</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 13, borderRadius: 12, padding: '16px 18px', marginTop: 13, background: '#FDF6EE', border: '1px solid #EFD9BC' }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: '#C06A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4l9 16H3zM12 10v4" /></svg>
          </div>
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#8A4E08' }}>Behind your target date</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.55, color: '#8A4E08', marginTop: 3 }}>At $150 a month you reach $15,000 in Sep 2031, after your Oct 2027 target. Raise it to $640 a month to stay on time.</div>
          </div>
        </div>

        <div style={{ background: '#F5F3EE', border: '1px solid #EDE9E1', borderRadius: 12, padding: 18, marginTop: 13 }}>
          <div style={label12}>This goal</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 13 }}><span style={{ fontSize: 13, color: '#57534E' }}>Monthly contribution</span><span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700 }}>$150</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9 }}><span style={{ fontSize: 13, color: '#57534E' }}>Months remaining</span><span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700 }}>56</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9 }}><span style={{ fontSize: 13, color: '#57534E' }}>Projected completion</span><span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700 }}>Sep 2031</span></div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: 18, marginTop: 13 }}>
          <div style={label12}>Contributions</div>
          {[
            { date: 'Dec 1', amount: '$150', divider: 'transparent' },
            { date: 'Nov 1', amount: '$150', divider: '#F0EEE9' },
            { date: 'Oct 1', amount: '$150', divider: '#F0EEE9' },
            { date: 'Sep 1', amount: '$250', divider: '#F0EEE9' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderTop: `1px solid ${c.divider}` }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: '#EFEDE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#57534E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v13M6 13l6 6 6-6" /></svg>
              </div>
              <span style={{ flexGrow: 1, minWidth: 0, fontSize: 13.5, fontWeight: 500, color: '#57534E' }}>Automatic transfer</span>
              <span style={{ fontSize: 12, color: '#A8A29E', flexShrink: 0 }}>{c.date}</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{c.amount}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: '1 1 0', textAlign: 'center', padding: 12, background: '#fff', border: '1px solid #E7E5E4', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>Edit goal</div>
            <div style={{ flex: '1 1 0', textAlign: 'center', padding: 12, background: '#fff', border: '1px solid #E7E5E4', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>Pause</div>
            <div style={{ flex: '1 1 0', textAlign: 'center', padding: 12, background: '#fff', border: '1px solid #E7E5E4', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>Withdraw</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: 17, borderRadius: 11, background: '#D71E28', color: '#fff', fontSize: 14.5, fontWeight: 700 }}>
            Adjust monthly amount
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

export default function WFSavingsMobile() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'flex-start', width: 'max-content', background: 'transparent', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#292524' }}>
      <ScreenA />
      <ScreenB />
      <ScreenC />
    </div>
  );
}
