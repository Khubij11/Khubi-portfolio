import { useState, type CSSProperties } from 'react';
import OsmoIcon from '../../components/icons/OsmoIcon';

/* Full React port of the "OsmO Onboarding" Claude Design prototype — the phone
 * flow embedded throughout the OsmO case study. Styles are ported as raw CSS
 * text (via cssObj) rather than rewritten, to stay faithful to the original
 * and keep the port mechanical rather than reinterpreted. */
function cssObj(css: string): CSSProperties {
  const out: Record<string, string> = {};
  css.split(';').forEach((decl) => {
    const idx = decl.indexOf(':');
    if (idx === -1) return;
    const prop = decl.slice(0, idx).trim();
    const val = decl.slice(idx + 1).trim();
    if (!prop || !val) return;
    const camel = prop.replace(/-([a-z])/g, (_m, c: string) => c.toUpperCase());
    out[camel] = val;
  });
  return out as CSSProperties;
}

const glass = 'background: rgba(255,255,255,0.055); backdrop-filter: blur(24px) saturate(140%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), inset 0 0 0 1px rgba(255,255,255,0.055), 0 18px 32px rgba(0,0,0,0.26);';
const primaryBtn = 'border: none; border-radius: 999px; background: linear-gradient(145deg, #C8AF9B 0%, #AC9482 52%, #947E6D 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.32), 0 6px 15px rgba(172,148,130,0.17); color: #232531; font-weight: 700; letter-spacing: -0.408px; cursor: pointer;';
const disabledBtn = 'border: none; border-radius: 999px; background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.4); font-weight: 700; letter-spacing: -0.408px; cursor: not-allowed;';

function avatarSwatch(seed: number): CSSProperties {
  const hue = 24 + seed * 10;
  return {
    background: `linear-gradient(160deg, hsl(${hue} 34% 68%) 0%, hsl(${hue} 24% 46%) 100%)`,
  };
}

type ViewKey =
  | 'splash'
  | 'welcome'
  | 'profile'
  | 'otp'
  | 'concierge'
  | 'step'
  | 'done'
  | 'voice'
  | 'facts'
  | 'rules'
  | 'home'
  | 'ask'
  | 'tanya'
  | 'settings';

interface FlowState {
  view: ViewKey;
  step: number;
  fwd: number;
  seg: number;
  perms: boolean[];
  howOpen: boolean;
  copied: boolean;
  name: string;
  otp: number;
  lang: number;
  voice: number;
  tasks: number[];
  vcLines: boolean[];
  vcRec: boolean;
  chat: { me: boolean; text: string }[];
  factsOn: boolean[];
  srcOn: boolean[];
  teach: boolean[];
  rules: (boolean | null)[];
  own: string[];
  composerOpen: boolean;
  ruleDraft: string;
}

const VC_LINES = [
  "Hi, you've reached {name}. I can't pick up right now, but I'm listening.",
  "Tell me what it's about and I'll make sure it gets to them today.",
  "Thanks for calling — {name} will get back to you.",
];

const TASKS = [
  {
    chip: 'Book a table',
    ask: 'Book a table for two at Kaatan, 7:30 tonight.',
    reply: "On it. I'll call Kaatan and ask for 7:30 for two. I'll tell you the moment they confirm.",
    card: { title: 'Table for 2 at Kaatan', date: 'Tonight', time: '7:30pm', place: 'Indiranagar', pill: 'Calling' },
  },
  {
    chip: 'Chase a callback',
    ask: 'Chase the insurance people about my claim.',
    reply: "I'll ring them, quote your claim number and ask where it stands. If they need you, I'll say you'll call back.",
    card: { title: 'Insurance follow-up', date: 'Today', time: 'By 5pm', place: 'Outbound call', pill: 'Calling' },
  },
];

const FACTS = [
  { label: 'Address', value: '14 Brigade Road, Bengaluru 560001' },
  { label: 'Hours', value: '9am to 7pm, Monday to Saturday. Closed Sundays.' },
  { label: 'Parking', value: 'Street parking out front, free after 6pm.' },
  { label: 'Prices', value: 'Consultation ₹800. First visit includes the scan.' },
];

const SOURCES = [
  { name: 'yoursite.com', icon: 'VuesaxBoldTask' as const, read: 'Read 14 pages', idle: 'Add your website' },
  { name: 'menu.pdf', icon: 'VuesaxBoldCopy' as const, read: 'Read 2 pages', idle: 'Upload a PDF' },
  { name: 'faq.pdf', icon: 'VuesaxBoldCopy' as const, read: 'Read 6 pages', idle: 'Upload a PDF' },
];

const STEPS = [
  {
    key: 'voicemail',
    title: 'Turn off Live Voicemail',
    blurb: 'iOS answers before we can. Switching it off lets Tanya pick up what you miss.',
    sectionLabel: 'Where to find it',
    ladder: false,
    options: [
      { label: 'Settings › Apps › Phone', plain: true, sw: false, tag: '' },
      { label: 'Live Voicemail', plain: true, sw: false, tag: 'Turn off' },
    ],
    code: '',
    codeHint: '',
    footnote: '',
    primary: "I've turned it off",
    how: 'Live Voicemail transcribes callers on your device before the call reaches us. With it on, a call is never forwarded, so Tanya never hears it.',
  },
  {
    key: 'forwarding',
    title: 'Your phone rings first. Always.',
    blurb: 'Tanya only steps in when you can’t.',
    sectionLabel: '',
    ladder: true,
    options: [
      { label: 'Busy & missed calls', plain: false, sw: false, tag: 'Recommended' },
      { label: 'Only when busy', plain: false, sw: false, tag: '' },
      { label: 'Only when not answered', plain: false, sw: false, tag: '' },
    ],
    code: '**004*08035383579#',
    codeHint: 'Tells your carrier where missed calls go. Free, reversible.',
    footnote: '',
    primary: 'Dial to activate',
    how: 'This is a carrier code, not an app setting. Dialling it once tells your network where to send calls you don’t pick up. Dial ##67# any time to undo it.',
  },
  {
    key: 'permissions',
    title: 'Permissions',
    blurb: 'Control what this app can access on your phone',
    sectionLabel: '',
    ladder: false,
    options: [
      { label: 'Phone & call history', plain: false, sw: true, tag: '' },
      { label: 'Contacts', plain: false, sw: true, tag: '' },
      { label: 'Notifications', plain: false, sw: true, tag: '' },
    ],
    code: '',
    codeHint: '',
    footnote: 'You can change these anytime in your device settings',
    primary: 'Continue',
    how: 'Notifications are how a handled call reaches you. Phone and contacts let Tanya tell a known caller from an unknown one.',
  },
];

const SUGG = [
  { text: 'Loan and credit-card calls are the #1 spam category. One tap brushes them off automatically.', skip: 'Not for me' },
  { text: 'Tell mum and dad you love them and that you’ll call right back. Tap and pick their contacts.', skip: 'Not now' },
  { text: 'Every call from your partner becomes a fun, flirty moment.', skip: 'Not now' },
  { text: 'Delivery, friends, repair guys — when they ask where you live, Tanya tells them. Tap to add your address.', skip: 'Not now' },
];

const OWN_CALLS = [
  { title: 'Appointment with Dr Rajesh verma', date: '17th November', time: '8am to 8:30am', place: 'Brigade road', pill: 'Confirmed' },
  { title: 'Dinner reservation at Kaatan', date: '18th November', time: '8pm to 9:30pm', place: 'Indiranagar', pill: 'Pending' },
  { title: 'Appointment with Dr Rakesh', date: '21st November', time: '11am to 11:30am', place: 'Koramangala', pill: 'Confirmed' },
  { title: 'Callback with Anita from Sunrise Dental', date: '19th November', time: '10am to 10:15am', place: 'Phone call', pill: 'Pending' },
  { title: 'Unknown caller — loan offer, ended', date: '17th November', time: '11:47am · 9 sec', place: 'Blocked by Tanya', pill: 'Spam' },
];

export default function OsmoOnboardingFlow({
  startView = 'splash',
  startStep = 1,
}: {
  startView?: ViewKey;
  startStep?: number;
}) {
  const [s, setS] = useState<FlowState>(() => ({
    view: startView,
    step: startStep - 1,
    fwd: 0,
    seg: 0,
    perms: [true, true, true],
    howOpen: false,
    copied: false,
    name: '',
    otp: 0,
    lang: 0,
    voice: 1,
    tasks: [],
    vcLines: [false, false, false],
    vcRec: false,
    chat: [],
    factsOn: [true, true, true, false],
    srcOn: [true, false, false],
    teach: [false, false, false],
    rules: [null, null, null, null],
    own: [],
    composerOpen: false,
    ruleDraft: '',
  }));

  const go = (view: ViewKey, step = 0) => setS((p) => ({ ...p, view, step, howOpen: false, copied: false }));

  const i0 = Math.max(0, Math.min(2, s.step));
  const st = STEPS[i0];

  const STARTERS = ['Never give out', 'Always tell callers', 'If they ask about'];
  const draftBody = STARTERS.reduce((t, p) => (t.indexOf(p) === 0 ? t.slice(p.length) : t), s.ruleDraft.trim()).trim();
  const ruleReady = draftBody.length > 2;

  const suggAdded = s.rules.filter((v) => v === true).length;
  const decided = s.rules.filter((v) => v !== null).length;
  const added = suggAdded + s.own.length;

  const vcDone = s.vcLines.filter(Boolean).length;
  const factsOnCount = s.factsOn.filter(Boolean).length;
  const srcCount = s.srcOn.filter(Boolean).length;
  const factsKnown = factsOnCount + srcCount;

  const teachDefs = [
    { label: 'Record your voice', hint: vcDone === 3 ? 'Three lines recorded' : 'Three lines, about a minute', icon: 'VuesaxBoldMicrophone2' as const, to: 'voice' as ViewKey, done: vcDone === 3 },
    { label: 'Set our rules', hint: added ? `${added} rule${added === 1 ? '' : 's'} added` : 'Who gets through, what we decline', icon: 'VuesaxBoldSetting2' as const, to: 'rules' as ViewKey, done: added > 0 },
    { label: 'Teach us the facts', hint: factsKnown ? `${factsKnown} saved` : 'Hours, address, prices', icon: 'VuesaxBoldMessageText' as const, to: 'facts' as ViewKey, done: factsKnown > 0 },
  ].map((t) => ({
    ...t,
    pending: !t.done,
    rowStyle: cssObj(
      `border-radius: 14px; min-height: 60px; padding: 12px 14px; display: flex; align-items: center; gap: 12px; cursor: pointer; background: ${t.done ? 'rgba(35,196,156,0.09)' : 'rgba(255,255,255,0.07)'}; backdrop-filter: blur(24px) saturate(140%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px ${t.done ? 'rgba(35,196,156,0.24)' : 'rgba(255,255,255,0.05)'}, 0 6px 16px rgba(0,0,0,0.18);`
    ),
    badgeStyle: cssObj(`width: 34px; height: 34px; border-radius: 11px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: ${t.done ? 'rgba(35,196,156,0.16)' : 'rgba(172,148,130,0.16)'};`),
    chevOpacity: t.done ? 0 : 1,
  }));
  const doneCount = teachDefs.filter((t) => t.done).length;

  const taskCards = s.tasks.map((i) => TASKS[i].card);
  const allCards = taskCards.concat(OWN_CALLS as typeof taskCards);
  const pendingCount = allCards.filter((c) => c.pill === 'Pending').length;
  const visibleCards = allCards.filter((c) => (s.seg === 0 ? c.pill === 'Pending' || c.pill === 'Calling' : true));

  return (
    <div
      style={{
        position: 'relative',
        width: 390,
        height: 844,
        overflow: 'hidden',
        background:
          'radial-gradient(120% 85% at 88% 0%, rgba(172,148,130,0.17) 0%, rgba(172,148,130,0) 58%), radial-gradient(110% 80% at 4% 100%, rgba(104,124,178,0.20) 0%, rgba(104,124,178,0) 62%), #232531',
        borderRadius: 12,
        boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* status bar */}
      <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', fontSize: 15, fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em', zIndex: 4 }}>
        <span>9:41</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="17" height="11" viewBox="0 0 17 11" fill="#FFFFFF"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="5" width="3" height="6" rx="1" /><rect x="9" y="2.5" width="3" height="8.5" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="rgba(255,255,255,0.5)" /><rect x="2" y="2" width="15" height="8" rx="1.6" fill="#FFFFFF" /><path d="M22 4v4a2.2 2.2 0 0 0 0-4z" fill="rgba(255,255,255,0.5)" /></svg>
        </span>
      </div>

      {/* ---- splash ---- */}
      {s.view === 'splash' && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 106, top: 353, width: 205, height: 78, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: -2.8, top: 7.3, fontSize: 64, fontWeight: 700, whiteSpace: 'nowrap', lineHeight: 1, letterSpacing: '-0.05em', color: '#FFFFFF' }}>Osmo</div>
          </div>
          <div style={{ position: 'absolute', left: 92, top: 452, width: 206, fontSize: 24, fontWeight: 700, whiteSpace: 'nowrap', lineHeight: 1, letterSpacing: '-0.05em', color: '#FFFFFF' }}>reclaim your peace</div>
          <button onClick={() => go('welcome')} style={cssObj(`position: absolute; left: 40px; top: 730px; width: 310px; height: 58px; font-size: 17px; ${primaryBtn}`)}>
            Let's get started
          </button>
        </div>
      )}

      {/* ---- welcome ---- */}
      {s.view === 'welcome' && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 0, top: 72, width: 390, display: 'flex', justifyContent: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.05em', color: '#C8AF9B' }}>Osmo</div>
          </div>
          <div style={{ position: 'absolute', left: 24, top: 140, width: 342, textAlign: 'center', fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 50, fontWeight: 400, lineHeight: 0.98, letterSpacing: '-0.025em', color: '#F5EFE8' }}>
            We answer
            <br />
            the calls,
            <br />
            <span style={{ fontStyle: 'italic', color: '#C8AF9B' }}>so you don't.</span>
          </div>

          <div style={{ position: 'absolute', left: 24, top: 324, width: 342, borderRadius: 18, padding: 18, ...cssObj(glass) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, flexShrink: 0, ...avatarSwatch(0) }} />
              <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.015em', color: '#FFFFFF' }}>Tanya is on a call</div>
                <div style={{ fontSize: 12.5, color: '#9B9CA7', marginTop: 2 }}>Unknown number · 00:42</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 22, flexShrink: 0 }}>
                {[0, 0.14, 0.28, 0.42, 0.56].map((d) => (
                  <div key={d} style={{ width: 3, height: 22, borderRadius: 2, background: '#C8AF9B', animation: `osmo-bar 1.1s ease-in-out infinite`, animationDelay: `${d}s` }} />
                ))}
              </div>
            </div>
            <div style={{ marginTop: 16, paddingTop: 16, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)', fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: 19, lineHeight: 1.32, color: '#E7DED4' }}>
              &ldquo;He's busy right now — can I take a message?&rdquo;
            </div>
          </div>

          <div style={{ position: 'absolute', left: 24, top: 522, width: 342, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 30, height: 30, borderRadius: 999, flexShrink: 0, boxShadow: '0 0 0 2px #262834', marginLeft: i === 0 ? 0 : -9, ...avatarSwatch(i) }} />
              ))}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#C0A895' }}>2k+ on board</div>
          </div>

          <div style={{ position: 'absolute', left: 24, top: 580, width: 342, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8F8275' }}>
            <span>Answers</span>
            <span style={{ width: 2.5, height: 2.5, borderRadius: '50%', background: 'rgba(143,130,117,0.7)' }} />
            <span>Screens</span>
            <span style={{ width: 2.5, height: 2.5, borderRadius: '50%', background: 'rgba(143,130,117,0.7)' }} />
            <span>Calls for you</span>
          </div>

          <div style={{ position: 'absolute', left: 24, top: 616, width: 342, textAlign: 'center', fontSize: 16, lineHeight: 1.5, color: '#B4B5BF' }}>
            Unknown numbers, sales calls, the booking you keep putting off.
          </div>

          <button
            onClick={() => go('profile')}
            style={cssObj(
              `position: absolute; left: 24px; top: 716px; width: 342px; height: 62px; border: none; border-radius: 999px; font-size: 18px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; background: linear-gradient(145deg, #E2CDB8 0%, #C8AF9B 48%, #A78F7C 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.45), 0 10px 26px rgba(172,148,130,0.30); color: #201F27;`
            )}
          >
            <span>Meet OsmO</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      )}

      {/* ---- profile ---- */}
      {s.view === 'profile' && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 40, top: 104, width: 310, fontSize: 34, fontWeight: 600, lineHeight: 1.06, letterSpacing: '-0.042em', color: '#FFFFFF' }}>Complete profile</div>
          <div style={{ position: 'absolute', left: 40, top: 176, width: 310, fontSize: 15, lineHeight: 1.53, color: '#ADAEB9' }}>Just a first name. It's how we introduce ourselves when we answer.</div>

          <div
            onClick={() => setS((p) => ({ ...p, name: p.name ? '' : 'Priya' }))}
            style={{ position: 'absolute', left: 40, top: 252, width: 310, height: 60, borderRadius: 16, ...cssObj(glass), display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px', cursor: 'text' }}
          >
            <div style={{ width: 20, height: 20, flexShrink: 0, display: 'flex', color: '#82838F' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="3.6" /><path d="M5.5 19.2a6.8 6.8 0 0 1 13 0" /></svg>
            </div>
            <div style={{ flex: '1 1 auto', minWidth: 0, fontSize: 16, color: s.name ? '#FFFFFF' : '#82838F', fontWeight: s.name ? 500 : 400 }}>{s.name || 'Your name'}</div>
            {!s.name && <div style={{ width: 1.5, height: 22, background: '#C8AF9B' }} />}
          </div>

          <button
            onClick={() => s.name && go('otp')}
            style={cssObj(`position: absolute; left: 40px; top: 730px; width: 310px; height: 58px; font-size: 17px; display: flex; align-items: center; justify-content: center; gap: 10px; ${s.name ? primaryBtn : disabledBtn}`)}
          >
            Continue
          </button>
        </div>
      )}

      {/* ---- otp ---- */}
      {s.view === 'otp' && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 40, top: 104, width: 310, fontSize: 34, fontWeight: 600, lineHeight: 1.06, letterSpacing: '-0.042em', color: '#FFFFFF' }}>OTP verification</div>
          <div style={{ position: 'absolute', left: 40, top: 156, width: 310, fontSize: 15, lineHeight: 1.53, color: '#ADAEB9' }}>Enter the 6-digit code we texted you.</div>

          <div style={{ position: 'absolute', left: 40, top: 216, width: 310, borderRadius: 16, ...cssObj(glass), padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: '1 1 auto', minWidth: 0, fontSize: 15, fontWeight: 500, letterSpacing: '0.02em', color: '#FFFFFF' }}>+91 78340 87249</div>
              <div onClick={() => go('profile')} style={{ height: 32, padding: '0 4px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#C8AF9B', cursor: 'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                <span>Edit</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  onClick={() => setS((p) => ({ ...p, otp: p.otp === 6 ? 0 : 6 }))}
                  style={{ flex: '1 1 0', minWidth: 0, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, lineHeight: 1, cursor: 'pointer', color: '#FFFFFF', background: i < s.otp ? 'rgba(200,175,155,0.14)' : 'rgba(255,255,255,0.05)', boxShadow: `inset 0 0 0 1px ${i < s.otp ? 'rgba(200,175,155,0.5)' : 'rgba(255,255,255,0.09)'}` }}
                >
                  {i < s.otp ? '•' : ''}
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'absolute', left: 40, top: 366, width: 310, textAlign: 'center', fontSize: 13, color: '#9B9CA7' }}>
            Didn't get it? <span style={{ fontWeight: 600, color: '#C8AF9B' }}>Resend in 00:50</span>
          </div>

          <button
            onClick={() => s.otp >= 6 && go('concierge')}
            style={cssObj(`position: absolute; left: 40px; top: 730px; width: 310px; height: 58px; font-size: 17px; display: flex; align-items: center; justify-content: center; gap: 10px; ${s.otp >= 6 ? primaryBtn : disabledBtn}`)}
          >
            Verify
          </button>
        </div>
      )}

      {/* ---- concierge (voice pick) ---- */}
      {s.view === 'concierge' && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 40, top: 96, width: 310, fontSize: 34, fontWeight: 600, lineHeight: 1.06, letterSpacing: '-0.042em', color: '#FFFFFF' }}>Hire your phone concierge</div>
          <div style={{ position: 'absolute', left: 40, top: 176, width: 310, fontSize: 15, lineHeight: 1.53, color: '#ADAEB9' }}>Pick how you want your AI to sound when it answers calls for you.</div>

          <div style={{ position: 'absolute', left: 105, top: 246, width: 180, height: 40, borderRadius: 999, boxShadow: 'inset 0 0 0 1px rgba(200,175,155,0.45)', display: 'flex', alignItems: 'stretch', overflow: 'hidden' }}>
            {['English', 'Hindi'].map((l, i) => (
              <div
                key={l}
                onClick={() => setS((p) => ({ ...p, lang: i }))}
                style={{ flex: '1 1 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'pointer', fontWeight: s.lang === i ? 600 : 500, background: s.lang === i ? 'linear-gradient(145deg, #C8AF9B 0%, #AC9482 100%)' : 'transparent', color: s.lang === i ? '#232531' : '#C8AF9B' }}
              >
                {l}
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', left: 40, top: 298, width: 310, textAlign: 'center', fontSize: 12, lineHeight: 1.4, color: '#9B9CA7' }}>We can still switch between English and Hindi mid-call.</div>

          <div style={{ position: 'absolute', left: 40, top: 348, width: 310, display: 'flex', gap: 14 }}>
            {[
              { name: 'Rahul', desc: 'Calm, confident Indian male voice with professional warmth', seed: 2 },
              { name: 'Tanya', desc: 'Reassuring, friendly and calm Indian female voice', seed: 0 },
            ].map((v, i) => (
              <div
                key={v.name}
                onClick={() => setS((p) => ({ ...p, voice: i }))}
                style={{ flex: '1 1 0', minWidth: 0, borderRadius: 18, padding: 12, cursor: 'pointer', background: s.voice === i ? 'rgba(200,175,155,0.10)' : 'rgba(255,255,255,0.04)', boxShadow: `inset 0 0 0 ${s.voice === i ? '1.5px rgba(200,175,155,0.75)' : '1px rgba(255,255,255,0.07)'}` }}
              >
                <div style={{ width: '100%', height: 124, borderRadius: 12, ...avatarSwatch(v.seed) }} />
                <div style={{ fontSize: 17, fontWeight: 600, textAlign: 'center', letterSpacing: '-0.01em', color: '#FFFFFF', marginTop: 14 }}>{v.name}</div>
                <div style={{ fontSize: 12, lineHeight: 1.45, textAlign: 'center', color: '#B8B9C2', marginTop: 6 }}>{v.desc}</div>
                <div style={{ height: 38, borderRadius: 999, boxShadow: 'inset 0 0 0 1px rgba(200,175,155,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#C8AF9B', marginTop: 14, cursor: 'pointer' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5z" /></svg>
                  <span>Listen</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ position: 'absolute', left: 40, top: 684, width: 310, textAlign: 'center', fontSize: 12, lineHeight: 1.4, color: '#9B9CA7' }}>Want your own voice? Add it in Settings → Our voice.</div>

          <button onClick={() => go('step', 0)} style={cssObj(`position: absolute; left: 40px; top: 730px; width: 310px; height: 58px; font-size: 17px; display: flex; align-items: center; justify-content: center; gap: 10px; ${primaryBtn}`)}>
            Hire {s.voice === 0 ? 'Rahul' : 'Tanya'}
          </button>
        </div>
      )}

      {/* ---- step (3 onboarding technical steps) ---- */}
      {s.view === 'step' && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 40, top: 68, display: 'flex', alignItems: 'center', gap: 8 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: i === i0 ? 28 : 14, height: 4, borderRadius: 999, transition: 'width 260ms cubic-bezier(0.2,0.8,0.2,1)', background: i < i0 ? 'rgba(172,148,130,0.55)' : i === i0 ? 'linear-gradient(90deg, #C8AF9B 0%, #AC9482 100%)' : 'rgba(255,255,255,0.14)' }} />
            ))}
            <div style={{ fontSize: 12, fontWeight: 500, color: '#9B9CA7', marginLeft: 8 }}>Step {i0 + 1} of 3</div>
          </div>

          <div style={{ position: 'absolute', left: 40, top: 104, width: 321, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 324, fontSize: 34, fontWeight: 600, lineHeight: 1.06, letterSpacing: '-0.042em', color: '#FFFFFF' }}>{st.title}</div>
            <div style={{ alignSelf: 'stretch', fontSize: 15, fontWeight: 400, lineHeight: 1.53, letterSpacing: '-0.005em', color: '#ADAEB9' }}>{st.blurb}</div>
          </div>

          <div style={{ position: 'absolute', left: 40, top: 226, width: 310, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {st.sectionLabel && <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1, color: '#FFFFFF' }}>{st.sectionLabel}</div>}

            {st.ladder && (
              <div style={{ borderRadius: 16, ...cssObj(glass), padding: '20px 16px' }}>
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, background: '#2F313C', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B8B9C2', zIndex: 1 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="3.4" /><path d="M5.6 19a7 7 0 0 1 12.8 0" /></svg>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#FFFFFF' }}>Someone calls you</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 11, flexShrink: 0, background: '#3B3840', boxShadow: 'inset 0 0 0 1px #AC9482', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0A895', zIndex: 1 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="3" width="12" height="18" rx="2.5" /></svg>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>You ring first — level 1</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                        {['Busy', 'Declined', 'Missed'].map((tag) => (
                          <div key={tag} style={{ height: 24, padding: '0 10px', borderRadius: 999, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', fontSize: 12, color: 'rgba(255,255,255,0.72)' }}>
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, background: 'linear-gradient(160deg, #C8AF9B 0%, #8A7566 100%)', boxShadow: '0 3px 7px rgba(172,148,130,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#232531', zIndex: 1 }}>T</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#FFFFFF' }}>Only then: Tanya — level 2</div>
                  </div>
                </div>
              </div>
            )}

            {!st.ladder && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {st.options.map((o, i) => {
                  const on = !o.plain && !o.sw && i === s.fwd;
                  const swOn = o.sw ? s.perms[i] : false;
                  const pick = o.plain
                    ? undefined
                    : () => {
                        if (o.sw) setS((p) => ({ ...p, perms: p.perms.map((v, j) => (j === i ? !v : v)) }));
                        else setS((p) => ({ ...p, fwd: i }));
                      };
                  return (
                    <div
                      key={o.label}
                      onClick={pick}
                      style={{
                        width: 310,
                        minHeight: 48,
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '0 16px',
                        background: o.plain ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.055)',
                        backdropFilter: o.plain ? undefined : 'blur(24px) saturate(140%)',
                        boxShadow: o.plain ? 'inset 0 0 0 1px rgba(255,255,255,0.07)' : 'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 0 0 1px rgba(255,255,255,0.055), 0 18px 32px rgba(0,0,0,0.26)',
                        cursor: o.plain ? 'default' : 'pointer',
                      }}
                    >
                      {!o.plain && !o.sw && (
                        <div style={{ width: 20, height: 20, borderRadius: 1000, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 2px ${on ? 'rgb(148,130,118)' : 'rgb(155,156,167)'}` }}>
                          {on && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#948276' }} />}
                        </div>
                      )}
                      <div style={{ fontSize: 14, lineHeight: 1.5, fontWeight: on || swOn || o.plain ? 500 : 400, color: on || swOn || o.plain ? '#FFFFFF' : '#B8B9C2' }}>{o.label}</div>
                      {o.tag && (
                        <div style={{ marginLeft: 'auto', height: 28, padding: '0 12px', borderRadius: 8, background: '#948276', fontSize: 12, fontWeight: 600, color: '#171A18', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
                          {o.tag}
                        </div>
                      )}
                      {o.sw && (
                        <div style={{ marginLeft: 'auto', width: 46, height: 28, borderRadius: 999, flexShrink: 0, display: 'flex', alignItems: 'center', padding: 2, transition: 'background 200ms', background: swOn ? '#23C49C' : '#4F515E', justifyContent: swOn ? 'flex-end' : 'flex-start' }}>
                          <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 2px 5px rgba(0,0,0,0.28)' }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {st.code && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.4, color: '#FFFFFF' }}>
                  Activation code <span style={{ color: '#B8B9C2', fontWeight: 400 }}>· works on all carriers</span>
                </div>
                <div onClick={() => setS((p) => ({ ...p, copied: true }))} style={{ height: 56, borderRadius: 16, ...cssObj(glass), display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px 8px 16px', cursor: 'pointer' }}>
                  <div style={{ flex: '1 1 auto', minWidth: 0, fontSize: 14, fontWeight: 500, lineHeight: 1.5, color: '#FFFFFF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{st.code}</div>
                  <div style={{ flex: '0 0 auto', height: 40, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, fontWeight: 600, background: s.copied ? 'rgba(35,196,156,0.16)' : '#AC9482', color: s.copied ? '#3FD9B0' : '#232531' }}>
                    <OsmoIcon name="VuesaxBoldCopy" size={18} />
                    <span>{s.copied ? 'Copied' : 'Copy'}</span>
                  </div>
                </div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 500, textAlign: 'center', lineHeight: 1.4, color: '#B8B9C2' }}>
                  {s.copied ? 'Copied. Paste it in your phone dial to activate it' : st.codeHint}
                </div>
              </div>
            )}

            {st.footnote && <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 500, textAlign: 'center', lineHeight: 1.4, color: '#B8B9C2', marginTop: -8 }}>{st.footnote}</div>}

            <div onClick={() => setS((p) => ({ ...p, howOpen: !p.howOpen }))} style={{ borderRadius: 16, ...cssObj(glass), padding: 16, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: '1 1 auto', fontSize: 14, fontWeight: 500, lineHeight: 1.5, color: '#FFFFFF' }}>How it works?</div>
                <div style={{ width: 18, height: 18, flexShrink: 0, display: 'flex', color: '#B8B9C2', transition: 'transform 200ms', transform: `rotate(${s.howOpen ? '180deg' : '0deg'})` }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              </div>
              {s.howOpen && <div style={{ fontSize: 13, lineHeight: 1.55, color: '#B8B9C2', marginTop: 16 }}>{st.how}</div>}
            </div>
          </div>

          <button
            onClick={() => (i0 >= 2 ? go('done') : go('step', i0 + 1))}
            style={cssObj(`position: absolute; left: 40px; top: 710px; width: 310px; height: 58px; font-size: 17px; display: flex; align-items: center; justify-content: center; gap: 8px; ${primaryBtn}`)}
          >
            <span>{st.primary}</span>
            {st.key === 'forwarding' && (
              <div style={{ width: 18, height: 18, color: '#232531', display: 'flex' }}>
                <OsmoIcon name="VuesaxBoldCall" size={18} />
              </div>
            )}
          </button>
          <div onClick={() => (i0 >= 2 ? go('done') : go('step', i0 + 1))} style={{ position: 'absolute', left: 58, top: 776, width: 278, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 600, letterSpacing: '-0.408px', color: '#AC9482', textDecoration: 'underline', textUnderlineOffset: '3px', cursor: 'pointer' }}>
            Skip
          </div>
        </div>
      )}

      {/* ---- done ---- */}
      {s.view === 'done' && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 40, top: 68, width: 310 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(35,196,156,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3FD9B0' }}>
              <OsmoIcon name="VuesaxBoldTickCircle" size={24} />
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.05em', color: '#FFFFFF', marginTop: 20 }}>Tanya is answering</div>
            <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.35, color: '#B8B9C2', marginTop: 16 }}>That's everything OsmO needs. Calls you miss go to Tanya from now on.</div>
          </div>

          <div className="osmo-scroll" style={{ position: 'absolute', left: 0, top: 246, width: 390, height: 440, overflowY: 'auto', overflowX: 'hidden' }}>
            <div style={{ padding: '0 40px 24px 40px' }}>
              <div style={{ width: 310 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#C0A895' }}>Teach Tanya</div>
                  <div style={{ height: 22, padding: '0 8px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.75)' }}>Optional</div>
                  <span style={{ flexGrow: 1 }} />
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#B8B9C2' }}>{doneCount} of 3</div>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: '#B8B9C2', marginTop: 8 }}>We already work. These make us sound more like you.</div>
                {doneCount > 0 && (
                  <div style={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.08)', marginTop: 16, overflow: 'hidden' }}>
                    <div style={{ height: 4, borderRadius: 999, background: 'linear-gradient(90deg, #C8AF9B 0%, #AC9482 100%)', boxShadow: '0 0 10px rgba(172,148,130,0.5)', width: `${Math.round((doneCount / 3) * 100)}%`, transition: 'width 260ms' }} />
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20 }}>
                  {teachDefs.map((t) => (
                    <div key={t.label} onClick={() => go(t.to)} style={t.rowStyle}>
                      <div style={t.badgeStyle}>
                        {t.done ? (
                          <div style={{ width: 20, height: 20, color: '#3FD9B0', display: 'flex' }}><OsmoIcon name="VuesaxBoldTickCircle" size={20} /></div>
                        ) : (
                          <div style={{ width: 20, height: 20, display: 'flex', color: '#AC9482' }}><OsmoIcon name={t.icon} size={20} /></div>
                        )}
                      </div>
                      <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>{t.label}</div>
                        <div style={{ fontSize: 12, lineHeight: 1.4, marginTop: 2, color: 'rgba(255,255,255,0.78)' }}>{t.hint}</div>
                      </div>
                      <div style={{ width: 16, height: 16, flexShrink: 0, display: 'flex', color: '#B8B9C2', opacity: t.chevOpacity }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.5, color: '#B8B9C2', marginTop: 16 }}>
                  {doneCount === 0 ? 'Nothing here is required. Tanya is already answering.' : doneCount === 3 ? 'All three done.' : `${doneCount} of 3 done. The rest can wait.`}
                </div>
              </div>
            </div>
          </div>

          <button onClick={() => go('ask')} style={cssObj(`position: absolute; left: 40px; top: 710px; width: 310px; height: 58px; font-size: 17px; ${primaryBtn}`)}>
            See my calls
          </button>
          <div onClick={() => go('ask')} style={{ position: 'absolute', left: 58, top: 776, width: 278, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 600, letterSpacing: '-0.408px', color: '#AC9482', textDecoration: 'underline', textUnderlineOffset: '3px', cursor: 'pointer' }}>
            I'll do these later
          </div>
        </div>
      )}

      {/* ---- voice recording ---- */}
      {s.view === 'voice' && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 0, top: 54, width: 390, height: 72, display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div onClick={() => go('done')} style={{ position: 'relative', zIndex: 2, width: 44, height: 44, borderRadius: 12, background: 'rgba(172,148,130,0.14)', boxShadow: 'inset 0 0 0 1px rgba(172,148,130,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0A895', cursor: 'pointer', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 6-6 6 6 6" /></svg>
            </div>
            <div style={{ flex: '1 1 auto', textAlign: 'center', pointerEvents: 'none', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#FFFFFF', marginLeft: -44 }}>Your voice</div>
          </div>

          <div style={{ position: 'absolute', left: 24, top: 150, width: 342, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C0A895' }}>{vcDone === 3 ? 'All three recorded' : 'Read this out'}</div>
                <span style={{ flexGrow: 1 }} />
                <div style={{ fontSize: 12, fontWeight: 500, color: '#B8B9C2' }}>{vcDone} of 3</div>
              </div>
              <div style={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.08)', marginTop: 12, overflow: 'hidden' }}>
                <div style={{ height: 4, borderRadius: 999, background: 'linear-gradient(90deg, #C8AF9B 0%, #AC9482 100%)', boxShadow: '0 0 10px rgba(172,148,130,0.45)', width: `${Math.round((vcDone / 3) * 100)}%`, transition: 'width 260ms' }} />
              </div>
            </div>

            <div style={{ borderRadius: 16, ...cssObj(glass), padding: '24px 20px' }}>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: '#B8B9C2' }}>
                {vcDone === 3 ? 'We have everything we need to sound like you.' : `Line ${vcDone + 1} of 3 — say it the way you normally would.`}
              </div>
              <div style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.45, letterSpacing: '-0.015em', color: '#FFFFFF', marginTop: 12 }}>
                {VC_LINES[Math.min(2, vcDone)].replace('{name}', s.name || 'Priya')}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, height: 72 }}>
              {[0.3, 0.5, 0.36, 0.7, 0.95, 0.62, 0.4, 0.82, 1, 0.55, 0.34, 0.68, 0.92, 0.48, 0.76, 1, 0.58, 0.38, 0.66, 0.44, 0.3].map((peak, i) => (
                <div
                  key={i}
                  style={{
                    width: 4,
                    height: Math.round(12 + peak * 48),
                    borderRadius: 999,
                    flexShrink: 0,
                    transformOrigin: 'center',
                    background: s.vcRec ? 'linear-gradient(180deg, #C8AF9B 0%, #AC9482 100%)' : vcDone > 0 ? 'rgba(200,175,155,0.34)' : 'rgba(255,255,255,0.10)',
                    animation: s.vcRec ? `osmo-bar 900ms ease-in-out ${i * 45}ms infinite` : undefined,
                    transform: s.vcRec ? undefined : 'scaleY(0.42)',
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ position: 'absolute', left: 0, top: 560, width: 390, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div
              onClick={() =>
                setS((p) =>
                  p.vcRec
                    ? { ...p, vcRec: false, vcLines: p.vcLines.map((v, j) => (j === Math.min(2, p.vcLines.filter(Boolean).length) ? true : v)) }
                    : { ...p, vcRec: true }
                )
              }
              style={{ position: 'relative', width: 88, height: 88, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              {s.vcRec && <div style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'rgba(200,175,155,0.35)', animation: 'osmo-halo 1.6s ease-out infinite' }} />}
              <div style={{ position: 'relative', width: 72, height: 72, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(145deg, #C8AF9B 0%, #AC9482 52%, #947E6D 100%)', boxShadow: `inset 0 1px 0 rgba(255,255,255,0.32), 0 6px 15px rgba(172,148,130,${s.vcRec ? '0.34' : '0.17'})` }}>
                {s.vcRec ? <div style={{ width: 26, height: 26, borderRadius: 7, background: '#232531' }} /> : <div style={{ width: 26, height: 26, display: 'flex', color: '#232531' }}><OsmoIcon name="VuesaxBoldMicrophone2" size={24} /></div>}
              </div>
            </div>
            <div style={{ fontSize: 13, color: '#9B9CA7' }}>{s.vcRec ? 'Listening — tap to stop' : vcDone === 3 ? 'Tap to record any line again' : 'Tap to start'}</div>
          </div>

          <button
            onClick={() => vcDone === 3 && setS((p) => ({ ...p, view: 'done', teach: p.teach.map((v, j) => (j === 0 ? true : v)) }))}
            style={cssObj(`position: absolute; left: 40px; top: 730px; width: 310px; height: 58px; font-size: 17px; display: flex; align-items: center; justify-content: center; ${vcDone === 3 ? primaryBtn : disabledBtn}`)}
          >
            {vcDone === 3 ? 'Use this voice' : 'Record all three to continue'}
          </button>
        </div>
      )}

      {/* ---- facts ---- */}
      {s.view === 'facts' && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 0, top: 54, width: 390, height: 72, display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div onClick={() => go('done')} style={{ position: 'relative', zIndex: 2, width: 44, height: 44, borderRadius: 12, background: 'rgba(172,148,130,0.14)', boxShadow: 'inset 0 0 0 1px rgba(172,148,130,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0A895', cursor: 'pointer', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 6-6 6 6 6" /></svg>
            </div>
            <div style={{ flex: '1 1 auto', textAlign: 'center', pointerEvents: 'none', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#FFFFFF', marginLeft: -44 }}>Facts</div>
          </div>

          <div className="osmo-scroll" style={{ position: 'absolute', left: 0, top: 126, width: 390, height: 556, overflowY: 'auto', overflowX: 'hidden' }}>
            <div style={{ padding: 24 }}>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: '#B8B9C2' }}>
                {factsOnCount === 0 ? 'Things callers ask you all the time. We answer them so you don’t have to.' : `${factsOnCount} saved. We can answer these without ringing you.`}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
                {FACTS.map((x, i) => {
                  const on = s.factsOn[i];
                  return (
                    <div key={x.label} style={{ borderRadius: 14, padding: '14px 16px', background: on ? 'rgba(172,148,130,0.10)' : 'rgba(255,255,255,0.04)', boxShadow: `inset 0 1px 0 rgba(255,255,255,0.07), inset 0 0 0 1px ${on ? 'rgba(172,148,130,0.30)' : 'rgba(255,255,255,0.05)'}` }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C0A895' }}>{x.label}</div>
                          <div style={{ fontSize: 15, lineHeight: 1.45, marginTop: 4, color: on ? '#FFFFFF' : '#9B9CA7' }}>{x.value}</div>
                        </div>
                        <div
                          onClick={() => setS((p) => ({ ...p, factsOn: p.factsOn.map((v, j) => (j === i ? !v : v)) }))}
                          style={{ flexShrink: 0, height: 32, padding: '0 12px', borderRadius: 999, display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: on ? '#9B9CA7' : '#C8AF9B', background: on ? undefined : 'rgba(200,175,155,0.18)' }}
                        >
                          {on ? 'Remove' : 'Add'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#C0A895', marginTop: 28 }}>Or let us read it ourselves</div>
              <div style={{ borderRadius: 16, ...cssObj(glass), marginTop: 12, overflow: 'hidden' }}>
                {SOURCES.map((x, i) => {
                  const on = s.srcOn[i];
                  return (
                    <div
                      key={x.name}
                      onClick={() => setS((p) => ({ ...p, srcOn: p.srcOn.map((v, j) => (j === i ? !v : v)) }))}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer', boxShadow: i > 0 ? 'inset 0 1px 0 rgba(255,255,255,0.055)' : undefined }}
                    >
                      <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: on ? 'rgba(35,196,156,0.16)' : 'rgba(255,255,255,0.07)', color: on ? '#3FD9B0' : '#B8B9C2' }}>
                        <OsmoIcon name={x.icon} size={18} />
                      </div>
                      <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4, color: '#FFFFFF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{x.name}</div>
                        <div style={{ fontSize: 12, lineHeight: 1.4, marginTop: 2, color: on ? '#7FD9BC' : '#9B9CA7' }}>{on ? x.read : x.idle}</div>
                      </div>
                      <div style={{ flexShrink: 0, height: 28, padding: '0 12px', borderRadius: 999, display: 'flex', alignItems: 'center', fontSize: 12, fontWeight: 600, background: on ? 'rgba(35,196,156,0.15)' : 'rgba(200,175,155,0.18)', color: on ? '#3FD9B0' : '#C8AF9B' }}>
                        {on ? 'Learned' : 'Add'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', left: 0, bottom: 0, width: 390, padding: '16px 24px 32px 24px', background: 'linear-gradient(180deg, rgba(35,37,49,0) 0%, #232531 32%)' }}>
            <button
              onClick={() => go('done')}
              style={cssObj(`width: 100%; height: 58px; font-size: 17px; display: flex; align-items: center; justify-content: center; ${factsKnown > 0 ? primaryBtn : 'border: none; border-radius: 999px; background: transparent; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18); color: rgba(255,255,255,0.78); cursor: pointer;'}`)}
            >
              {factsKnown > 0 ? 'Save what we know' : 'Skip for now'}
            </button>
          </div>
        </div>
      )}

      {/* ---- rules ---- */}
      {s.view === 'rules' && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 0, top: 54, width: 390, height: 72, display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div onClick={() => go('done')} style={{ position: 'relative', zIndex: 2, width: 44, height: 44, borderRadius: 12, background: 'rgba(172,148,130,0.14)', boxShadow: 'inset 0 0 0 1px rgba(172,148,130,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0A895', cursor: 'pointer', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 6-6 6 6 6" /></svg>
            </div>
            <div style={{ flex: '1 1 auto', textAlign: 'center', pointerEvents: 'none', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#FFFFFF', marginLeft: -44 }}>Rules</div>
          </div>

          <div className="osmo-scroll" style={{ position: 'absolute', left: 0, top: 126, width: 390, height: 556, overflowY: 'auto', overflowX: 'hidden' }}>
            <div style={{ padding: '24px 24px 24px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0A895" strokeWidth="1.6" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M9.5 2.5c.35 2.6.9 4.3 1.9 5.3s2.7 1.55 5.3 1.9c-2.6.35-4.3.9-5.3 1.9s-1.55 2.7-1.9 5.3c-.35-2.6-.9-4.3-1.9-5.3s-2.7-1.55-5.3-1.9c2.6-.35 4.3-.9 5.3-1.9s1.55-2.7 1.9-5.3Z" /><path d="M18 14.5c.2 1.45.5 2.4 1.05 2.95S20.55 18.3 22 18.5c-1.45.2-2.4.5-2.95 1.05S18.2 21.05 18 22.5c-.2-1.45-.5-2.4-1.05-2.95S15.45 18.7 14 18.5c1.45-.2 2.4-.5 2.95-1.05S17.8 15.95 18 14.5Z" /></svg>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C0A895' }}>Tanya noticed</div>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: '#B8B9C2', marginTop: 8 }}>
                {(() => {
                  const parts: string[] = [];
                  if (s.own.length) parts.push(`${s.own.length} you wrote`);
                  if (decided === 0) parts.push('4 suggestions to decide on');
                  else if (decided < 4) parts.push(`${suggAdded} of 4 suggested added · ${4 - decided} left to decide`);
                  else parts.push(`${suggAdded} of 4 suggested added`);
                  return parts.join(' · ') + (added ? '. We follow these on every call.' : '. From the calls we have already taken.');
                })()}
              </div>

              {s.own.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
                  {s.own.map((t, i) => (
                    <div key={i} style={{ borderRadius: 12, padding: '14px 16px', background: 'rgba(172,148,130,0.10)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06), 0 8px 20px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ width: 20, height: 20, flexShrink: 0, display: 'flex', color: '#C0A895', marginTop: 1 }}>
                        <OsmoIcon name="VuesaxBoldTickCircle" size={20} />
                      </div>
                      <div style={{ flex: '1 1 auto', minWidth: 0, fontSize: 14, lineHeight: 1.5, color: '#FFFFFF' }}>{t}</div>
                      <div onClick={() => setS((p) => ({ ...p, own: p.own.filter((_x, j) => j !== i) }))} style={{ width: 44, height: 44, margin: '-12px -8px -12px 0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B8B9C2', cursor: 'pointer' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                {SUGG.map((g, i) => {
                  const v = s.rules[i];
                  return (
                    <div key={g.text} style={{ borderRadius: 12, padding: 16, background: v === true ? 'rgba(172,148,130,0.10)' : v === false ? '#2B2D38' : 'rgba(255,255,255,0.055)', backdropFilter: v === null ? 'blur(24px) saturate(140%)' : undefined, boxShadow: `inset 0 0 0 1px ${v === true ? 'rgba(172,148,130,0.35)' : 'rgba(255,255,255,0.06)'}, 0 8px 20px rgba(0,0,0,0.18)` }}>
                      <div style={{ fontSize: 14, lineHeight: 1.5, color: v === false ? 'rgba(255,255,255,0.72)' : '#FFFFFF' }}>{g.text}</div>
                      {v === null && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
                          <div onClick={() => setS((p) => ({ ...p, rules: p.rules.map((x, j) => (j === i ? true : x)) }))} style={{ height: 44, padding: '0 20px', borderRadius: 999, background: 'linear-gradient(145deg, #C8AF9B 0%, #AC9482 52%, #947E6D 100%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 5px 11px rgba(172,148,130,0.15)', display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 700, color: '#232531', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                            Add this rule
                          </div>
                          <div onClick={() => setS((p) => ({ ...p, rules: p.rules.map((x, j) => (j === i ? false : x)) }))} style={{ height: 44, padding: '0 20px', borderRadius: 999, background: 'transparent', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.78)', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                            {g.skip}
                          </div>
                        </div>
                      )}
                      {v !== null && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
                          <div style={{ height: 32, padding: '0 12px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, background: v === true ? 'rgba(172,148,130,0.18)' : 'rgba(255,255,255,0.06)', color: v === true ? '#C0A895' : '#B8B9C2' }}>
                            <OsmoIcon name={v === true ? 'VuesaxBoldTickCircle' : 'VuesaxBoldCloseCircle'} size={18} />
                            <span>{v === true ? 'Added' : 'Skipped'}</span>
                          </div>
                          <span style={{ flexGrow: 1 }} />
                          <div onClick={() => setS((p) => ({ ...p, rules: p.rules.map((x, j) => (j === i ? null : x)) }))} style={{ height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: '#C0A895', textDecoration: 'underline', textUnderlineOffset: '3px', cursor: 'pointer' }}>
                            Undo
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', left: 0, bottom: 0, width: 390, padding: '16px 24px 32px 24px', background: 'linear-gradient(180deg, rgba(35,37,49,0) 0%, #232531 32%)' }}>
            <button onClick={() => setS((p) => ({ ...p, composerOpen: true }))} style={cssObj(`width: 100%; height: 58px; font-size: 17px; ${primaryBtn}`)}>
              Teach Tanya a rule
            </button>
          </div>

          {s.composerOpen && (
            <>
              <div onClick={() => setS((p) => ({ ...p, composerOpen: false, ruleDraft: '' }))} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, background: 'rgba(11,12,16,0.6)', zIndex: 10 }} />
              <div style={{ position: 'absolute', left: 0, bottom: 0, width: 390, borderRadius: '24px 24px 0 0', background: '#292B36', boxShadow: '0 -12px 40px rgba(0,0,0,0.4)', padding: '12px 24px 32px 24px', zIndex: 11 }}>
                <div style={{ width: 40, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.25)', margin: '0 auto 20px auto' }} />
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#FFFFFF' }}>Teach Tanya a rule</div>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: '#B8B9C2', marginTop: 8 }}>Say it the way you'd say it to a person. We follow it on every call.</div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
                  {['Never give out…', 'Always tell callers…', 'If they ask about…'].map((p) => (
                    <div
                      key={p}
                      onClick={() => setS((prev) => ({ ...prev, ruleDraft: p.replace('…', ' ') }))}
                      style={{ height: 32, padding: '0 12px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.78)', cursor: 'pointer' }}
                    >
                      {p}
                    </div>
                  ))}
                </div>

                <textarea
                  value={s.ruleDraft}
                  onChange={(e) => setS((p) => ({ ...p, ruleDraft: e.target.value }))}
                  placeholder="Never give out my address"
                  style={{ width: '100%', height: 96, marginTop: 16, padding: '14px 16px', border: 'none', borderRadius: 16, background: 'rgba(255,255,255,0.055)', backdropFilter: 'blur(24px) saturate(140%)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)', fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.5, color: '#FFFFFF', resize: 'none', outline: 'none' }}
                />

                <button
                  onClick={() => ruleReady && setS((p) => ({ ...p, own: p.own.concat([p.ruleDraft.trim()]), composerOpen: false, ruleDraft: '' }))}
                  style={cssObj(`width: 100%; height: 58px; margin-top: 16px; font-size: 17px; ${ruleReady ? primaryBtn : disabledBtn}`)}
                >
                  Add this rule
                </button>
                <div onClick={() => setS((p) => ({ ...p, composerOpen: false, ruleDraft: '' }))} style={{ height: 44, marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600, color: '#C0A895', cursor: 'pointer' }}>
                  Cancel
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ---- home (calls) ---- */}
      {s.view === 'home' && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 137, top: 68, width: 117, fontSize: 32, fontWeight: 700, textAlign: 'center', lineHeight: 1, letterSpacing: '-0.042em', color: '#FFFFFF' }}>Calls</div>

          <div style={{ position: 'absolute', left: 20, top: 128, width: 350, display: 'flex', alignItems: 'flex-end', gap: 28, boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.09)' }}>
            {['Needs you', 'All calls'].map((l, i) => {
              const active = s.seg === i;
              return (
                <button
                  key={l}
                  onClick={() => setS((p) => ({ ...p, seg: i }))}
                  style={{ position: 'relative', background: 'transparent', border: 'none', padding: '0 2px 14px 2px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit', fontSize: 15, letterSpacing: '-0.01em', fontWeight: active ? 600 : 500, color: active ? '#FFFFFF' : '#9B9CA7' }}
                >
                  <span>{l}</span>
                  {i === 0 && pendingCount > 0 && (
                    <span style={{ minWidth: 20, height: 20, padding: '0 6px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, background: active ? 'rgba(172,148,130,0.22)' : 'rgba(255,255,255,0.09)', color: active ? '#D8C3B0' : '#B8B9C2' }}>
                      {pendingCount}
                    </span>
                  )}
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, borderRadius: '2px 2px 0 0', opacity: active ? 1 : 0, background: 'linear-gradient(90deg, #C8AF9B 0%, #AC9482 100%)', boxShadow: '0 0 10px rgba(172,148,130,0.45)' }} />
                </button>
              );
            })}
          </div>

          <div className="osmo-scroll" style={{ position: 'absolute', left: 0, top: 184, width: 390, height: 547, overflowY: 'auto', overflowX: 'hidden' }}>
            <div style={{ padding: '0 20px 24px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {visibleCards.map((c, ci) => {
                const pill = c.pill === 'Calling' ? 'Calling now' : c.pill;
                const pillColor =
                  c.pill === 'Spam' ? { background: 'rgba(251,44,54,0.15)', color: '#FF8A90' }
                  : c.pill === 'Calling' ? { background: 'rgba(200,175,155,0.20)', color: '#D8C4B4' }
                  : c.pill === 'Pending' ? { background: 'rgba(172,148,130,0.22)', color: '#D8C4B4' }
                  : { background: 'rgba(35,196,156,0.15)', color: '#3FD9B0' };
                return (
                  <div key={ci} style={{ position: 'relative', width: '100%', borderRadius: 16, background: 'rgba(255,255,255,0.055)', backdropFilter: 'blur(24px) saturate(140%)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04), 0 8px 20px rgba(0,0,0,0.18)', padding: 14, flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, ...avatarSwatch(ci) }} />
                      <div style={{ flex: '1 1 auto', minWidth: 0, fontSize: 13, fontWeight: 600, lineHeight: 1.35, letterSpacing: '-0.01em', color: '#FFFFFF' }}>{c.title}</div>
                      <div style={{ flexShrink: 0, height: 22, padding: '0 8px', borderRadius: 8, fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', ...pillColor }}>{pill}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 14, height: 14, color: '#B8B9C2', display: 'flex', flexShrink: 0 }}><OsmoIcon name="VuesaxLinearClock" size={14} /></div>
                        <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1, color: '#B8B9C2' }}>{c.date}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 12, height: 12, color: '#B8B9C2', display: 'flex', flexShrink: 0, margin: '0 1px' }}><OsmoIcon name="VuesaxLinearCalendar" size={12} /></div>
                        <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1, color: '#B8B9C2' }}>{c.time}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 12, height: 12, color: '#B8B9C2', display: 'flex', flexShrink: 0, margin: '0 1px' }}><OsmoIcon name="VuesaxLinearLocation" size={12} /></div>
                        <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1, color: '#B8B9C2' }}>{c.place}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                      {c.pill === 'Pending' && (
                        <>
                          <div style={{ flex: '1 1 0', minWidth: 0, height: 44, borderRadius: 8, background: 'rgba(35,196,156,0.14)', boxShadow: 'inset 0 0 0 1px rgba(35,196,156,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#3FD9B0', cursor: 'pointer' }}>
                            <OsmoIcon name="VuesaxBoldTickCircle" size={18} />
                            <span>Accept</span>
                          </div>
                          <div style={{ flex: '1 1 0', minWidth: 0, height: 44, borderRadius: 8, background: 'rgba(251,44,54,0.12)', boxShadow: 'inset 0 0 0 1px rgba(251,44,54,0.26)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#FF8A90', cursor: 'pointer' }}>
                            <OsmoIcon name="VuesaxBoldCloseCircle" size={18} />
                            <span>Decline</span>
                          </div>
                        </>
                      )}
                      {c.pill === 'Confirmed' && (
                        <>
                          <div style={{ flex: '1 1 0', minWidth: 0, height: 44, padding: '0 12px', borderRadius: 8, background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(16px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', cursor: 'pointer' }}>Add to calendar</div>
                          <div style={{ flex: '1 1 0', minWidth: 0, height: 44, padding: '0 12px', borderRadius: 8, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500, color: '#C7C8D0', whiteSpace: 'nowrap', overflow: 'hidden', cursor: 'pointer' }}>Call details</div>
                        </>
                      )}
                      {c.pill === 'Calling' && (
                        <>
                          <div style={{ flex: '1 1 auto', minWidth: 0, height: 44, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#C0A895' }}>
                            <div style={{ width: 7, height: 7, borderRadius: 999, flexShrink: 0, background: '#C8AF9B', animation: 'osmo-halo 1.4s ease-out infinite' }} />
                            <span>We'll tell you when it's done</span>
                          </div>
                          <div style={{ flex: '1 1 0', minWidth: 0, height: 44, padding: '0 12px', borderRadius: 8, background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(16px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', cursor: 'pointer' }}>Cancel</div>
                        </>
                      )}
                      {c.pill === 'Spam' && (
                        <>
                          <div style={{ flex: '1 1 0', minWidth: 0, height: 44, padding: '0 12px', borderRadius: 8, background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(16px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', cursor: 'pointer' }}>Block this number</div>
                          <div style={{ flex: '1 1 0', minWidth: 0, height: 44, padding: '0 12px', borderRadius: 8, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500, color: '#C7C8D0', whiteSpace: 'nowrap', overflow: 'hidden', cursor: 'pointer' }}>Call details</div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ---- ask ---- */}
      {s.view === 'ask' && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 0, top: 60, width: 390, fontSize: 32, fontWeight: 600, textAlign: 'center', lineHeight: 1.06, letterSpacing: '-0.042em', color: '#FFFFFF' }}>Ask AI</div>
          <div style={{ position: 'absolute', left: 20, top: 106, width: 350, fontSize: 14, lineHeight: 1.5, textAlign: 'center', color: '#B8B9C2' }}>Ask about anything Tanya has handled.</div>

          <div style={{ position: 'absolute', left: 20, top: 148, width: 350 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#C0A895' }}>Start with</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              {TASKS.map((t, i) => (
                <div
                  key={t.chip}
                  onClick={() => setS((p) => ({ ...p, chat: p.chat.concat([{ me: true, text: t.ask }, { me: false, text: t.reply }]), tasks: p.tasks.concat([i]) }))}
                  style={{ height: 40, padding: '0 16px', borderRadius: 999, background: 'rgba(200,175,155,0.13)', boxShadow: 'inset 0 0 0 1px rgba(200,175,155,0.34)', display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 500, color: '#EADFD4', whiteSpace: 'nowrap', cursor: 'pointer' }}
                >
                  {t.chip}
                </div>
              ))}
              <div
                onClick={() =>
                  setS((p) => ({
                    ...p,
                    chat: p.chat.concat([
                      { me: true, text: 'Who called today?' },
                      { me: false, text: 'Three. Anita from Sunrise Dental about your cleaning, one loan offer I ended, and your sister — I said you’d ring back.' },
                    ]),
                  }))
                }
                style={{ height: 40, padding: '0 16px', borderRadius: 999, background: 'rgba(200,175,155,0.13)', boxShadow: 'inset 0 0 0 1px rgba(200,175,155,0.34)', display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 500, color: '#EADFD4', whiteSpace: 'nowrap', cursor: 'pointer' }}
              >
                Who called today?
              </div>
            </div>
          </div>

          <div className="osmo-scroll" style={{ position: 'absolute', left: 0, top: 290, width: 390, height: 362, overflowY: 'auto', overflowX: 'hidden' }}>
            <div style={{ padding: '0 20px 16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { me: true, text: 'Did anyone call about the dental appointment?' },
                { me: false, text: 'Yes. Anita from Sunrise Dental called at 10:12am. She asked to move your cleaning to the 19th at 10am. I said you’d confirm — it’s waiting under Needs you.' },
                { me: true, text: 'Anything I missed yesterday?' },
                { me: false, text: 'Four calls. Two were loan offers and I ended them. Dr Rajesh’s office confirmed the 17th. Your sister called twice — I told her you’d ring back.' },
              ]
                .concat(s.chat)
                .map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.me ? 'flex-end' : 'flex-start' }}>
                    <div
                      style={{
                        maxWidth: 270,
                        padding: '14px 16px',
                        fontSize: 14,
                        lineHeight: 1.5,
                        borderRadius: m.me ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
                        background: m.me ? 'linear-gradient(145deg, #C8AF9B 0%, #AC9482 52%, #947E6D 100%)' : 'rgba(255,255,255,0.07)',
                        backdropFilter: m.me ? undefined : 'blur(24px) saturate(140%)',
                        boxShadow: m.me ? 'inset 0 1px 0 rgba(255,255,255,0.28), 0 6px 15px rgba(172,148,130,0.17)' : 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.05)',
                        color: m.me ? '#232531' : '#FFFFFF',
                        fontWeight: m.me ? 500 : 400,
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div style={{ position: 'absolute', left: 0, top: 652, width: 390, padding: '0 20px' }}>
            <div style={{ height: 56, borderRadius: 999, ...cssObj(glass), display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px 0 20px' }}>
              <div style={{ flex: '1 1 auto', minWidth: 0, fontSize: 15, color: '#82838F' }}>Ask Tanya something</div>
              <div style={{ width: 40, height: 40, borderRadius: 999, flexShrink: 0, background: 'linear-gradient(145deg, #C8AF9B 0%, #AC9482 52%, #947E6D 100%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.32), 0 6px 15px rgba(172,148,130,0.17)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#232531', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- tanya ---- */}
      {s.view === 'tanya' && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 0, top: 60, width: 390, fontSize: 32, fontWeight: 600, textAlign: 'center', lineHeight: 1.06, letterSpacing: '-0.042em', color: '#FFFFFF' }}>Tanya</div>

          <div className="osmo-scroll" style={{ position: 'absolute', left: 0, top: 122, width: 390, height: 600, overflowY: 'auto', overflowX: 'hidden' }}>
            <div style={{ padding: '0 20px 24px 20px' }}>
              <div style={{ borderRadius: 16, ...cssObj(glass), padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0, boxShadow: '0 3px 7px rgba(172,148,130,0.18)', ...avatarSwatch(0) }} />
                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                  <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em', color: '#FFFFFF' }}>We're answering</div>
                  <div style={{ fontSize: 13, lineHeight: 1.4, color: '#7FD9BC', marginTop: 2 }}>Forwarding active · {doneCount} of 3 personal touches added</div>
                </div>
              </div>

              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#C0A895', marginTop: 28 }}>Make us yours</div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: '#B8B9C2', marginTop: 8 }}>
                {doneCount === 0 ? 'Nothing here is required. These just make us sound less like software.' : doneCount === 3 ? 'All three done. We sound like you.' : `${doneCount} of 3 done. The rest can wait.`}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
                {teachDefs.map((t) => (
                  <div key={t.label} onClick={() => go(t.to)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', cursor: 'pointer' }}>
                    <div style={t.badgeStyle}>
                      {t.done ? (
                        <div style={{ width: 20, height: 20, color: '#3FD9B0', display: 'flex' }}><OsmoIcon name="VuesaxBoldTickCircle" size={20} /></div>
                      ) : (
                        <div style={{ width: 20, height: 20, display: 'flex', color: '#AC9482' }}><OsmoIcon name={t.icon} size={20} /></div>
                      )}
                    </div>
                    <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>{t.label}</div>
                      <div style={{ fontSize: 12, lineHeight: 1.4, marginTop: 2, color: 'rgba(255,255,255,0.78)' }}>{t.hint}</div>
                    </div>
                    <div style={{ width: 16, height: 16, flexShrink: 0, display: 'flex', color: '#82838F' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 12, lineHeight: 1.5, color: '#9B9CA7', marginTop: 16 }}>None of this is required. We work without any of it.</div>
            </div>
          </div>
        </div>
      )}

      {/* ---- settings ---- */}
      {s.view === 'settings' && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 0, top: 60, width: 390, fontSize: 32, fontWeight: 600, textAlign: 'center', lineHeight: 1.06, letterSpacing: '-0.042em', color: '#FFFFFF' }}>Settings</div>
          <div className="osmo-scroll" style={{ position: 'absolute', left: 0, top: 122, width: 390, height: 600, overflowY: 'auto', overflowX: 'hidden' }}>
            <div style={{ padding: '0 20px 24px 20px' }}>
              <div style={{ borderRadius: 16, ...cssObj(glass), padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, flexShrink: 0, background: 'linear-gradient(160deg, #C8AF9B 0%, #8A7566 100%)', boxShadow: '0 3px 7px rgba(172,148,130,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#232531' }}>T</div>
                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', color: '#FFFFFF' }}>Tanya is answering</div>
                  <div style={{ fontSize: 13, lineHeight: 1.4, color: '#7FD9BC', marginTop: 2 }}>Forwarding active on this number</div>
                </div>
              </div>

              {(
                [
                  { label: 'How we sound', rows: [
                    { label: 'Our voice', value: vcDone === 3 ? 'Recorded' : 'Not yet', hint: '', go: () => go('voice') },
                    { label: 'Rules', value: added ? String(added) : 'None yet', hint: 'What we do before we answer', go: () => go('rules') },
                    { label: 'Facts about you', value: factsKnown ? `${factsKnown} saved` : 'None yet', hint: '', go: () => go('facts') },
                  ]},
                  { label: 'Calls', rows: [
                    { label: 'Call forwarding', value: 'Active', hint: '', go: undefined },
                    { label: 'Blocked numbers', value: '12', hint: '', go: undefined },
                    { label: 'Live Voicemail', value: 'Off', hint: 'Has to stay off for us to pick up', go: undefined },
                  ]},
                  { label: 'Account', rows: [
                    { label: 'Plan', value: '$10/month', hint: '', go: undefined },
                    { label: 'Permissions', value: '', hint: 'Phone, contacts, notifications', go: undefined },
                    { label: 'Help', value: '', hint: '', go: undefined },
                  ]},
                ] as { label: string; rows: { label: string; value: string; hint: string; go?: () => void }[] }[]
              ).map((g) => (
                <div key={g.label} style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#C0A895', marginBottom: 12 }}>{g.label}</div>
                  <div style={{ borderRadius: 16, ...cssObj(glass), overflow: 'hidden' }}>
                    {g.rows.map((r, i) => (
                      <div key={r.label} onClick={r.go} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, padding: '14px 16px', cursor: r.go ? 'pointer' : 'default', boxShadow: i > 0 ? 'inset 0 1px 0 rgba(255,255,255,0.055)' : undefined }}>
                        <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                          <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, color: '#FFFFFF' }}>{r.label}</div>
                          {r.hint && <div style={{ fontSize: 12, lineHeight: 1.4, color: '#B8B9C2', marginTop: 2 }}>{r.hint}</div>}
                        </div>
                        {r.value && <div style={{ fontSize: 14, color: '#B8B9C2', flexShrink: 0 }}>{r.value}</div>}
                        <div style={{ width: 16, height: 16, flexShrink: 0, display: 'flex', color: '#82838F' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---- bottom tab bar (in-app views) ---- */}
      {(['home', 'ask', 'tanya', 'settings'] as ViewKey[]).includes(s.view) && (
        <div style={{ position: 'absolute', left: 24, top: 738, width: 342, height: 86, borderRadius: 24, ...cssObj(glass), boxShadow: '0 4px 4px rgba(0,0,0,0.25)', overflow: 'hidden', zIndex: 6 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 342, height: 86, display: 'flex', alignItems: 'flex-start', padding: '18px 8px 0 8px' }}>
            {[
              { label: 'Ask AI', icon: 'VuesaxBoldMessageText' as const, key: 'ask' as ViewKey },
              { label: 'Calls', icon: 'VuesaxBoldTask' as const, key: 'home' as ViewKey },
              { label: 'Tanya', icon: 'VuesaxBoldVoiceSquare' as const, key: 'tanya' as ViewKey },
              { label: 'Settings', icon: 'VuesaxBoldSetting2' as const, key: 'settings' as ViewKey },
            ].map((t) => (
              <div key={t.key} onClick={() => go(t.key)} style={{ flex: '1 1 0', minWidth: 0, height: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                <div style={{ width: 24, height: 24, display: 'flex', flexShrink: 0, color: s.view === t.key ? '#C0A895' : '#B8B9C2' }}>
                  <OsmoIcon name={t.icon} size={24} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 500, textAlign: 'center', whiteSpace: 'nowrap', lineHeight: 1.3, color: s.view === t.key ? '#C0A895' : '#B8B9C2' }}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ position: 'absolute', left: '50%', bottom: 8, transform: 'translateX(-50%)', width: 134, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.35)', zIndex: 5 }} />

      <style>{`
        .osmo-scroll::-webkit-scrollbar { width: 0; height: 0; }
        @keyframes osmo-bar { 0%, 100% { transform: scaleY(0.28); } 50% { transform: scaleY(1); } }
        @keyframes osmo-halo { 0% { transform: scale(1); opacity: 0.55; } 100% { transform: scale(1.55); opacity: 0; } }
      `}</style>
    </div>
  );
}
