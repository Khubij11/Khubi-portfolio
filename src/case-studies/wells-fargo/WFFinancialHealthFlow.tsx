import { useMemo, useState, type CSSProperties } from 'react';

/* ------------------------------------------------------------------ *
 * WF Financial Health Flow
 * React port of the "WF Financial Health Flow" Claude Design prototype.
 * Six views (intro / setup / dash / add / fit / limits), real state and
 * real arithmetic. Ported verbatim from the .dc.html DCLogic component.
 * ------------------------------------------------------------------ */

type CatKey = 'Groceries' | 'Dining out' | 'Shopping' | 'Transport' | 'Health and fitness';
type CatMap = Record<CatKey, number>;

const CATS: CatKey[] = ['Groceries', 'Dining out', 'Shopping', 'Transport', 'Health and fitness'];
const SUGGESTED: CatMap = { Groceries: 600, 'Dining out': 200, Shopping: 150, Transport: 180, 'Health and fitness': 90 };
const USUAL: CatMap = { Groceries: 615, 'Dining out': 240, Shopping: 130, Transport: 165, 'Health and fitness': 85 };
const SPENT: CatMap = { Groceries: 648, 'Dining out': 265, Shopping: 96, Transport: 120, 'Health and fitness': 60 };
const FIXED = [
  { name: 'Rent', value: 1850, note: 'Paid on the 1st · Sacramento Property Co.' },
  { name: 'Utilities', value: 240, note: 'Paid on the 5th · SMUD and PG&E' },
  { name: 'Car payment', value: 310, note: 'Paid on the 10th · Wells Fargo Auto' },
  { name: 'Phone and internet', value: 145, note: 'Paid on the 12th · Verizon' },
  { name: 'Insurance', value: 815, note: 'Paid on the 20th · health, auto, home' },
];
const ADJUSTABLE: CatKey[] = ['Groceries', 'Dining out', 'Shopping', 'Transport'];
const ACCOUNTS = [
  { name: 'Everyday Checking ···4892', note: 'Your pay arrives here · most of your spending', balance: 3120 },
  { name: 'Joint Checking ···1177', note: 'Shared with Miguel Alvarez', balance: 890 },
  { name: 'Platinum Card ···6034', note: 'Credit card · spending counts towards limits', balance: -640 },
  { name: 'Way2Save Savings ···3300', note: 'Savings · money moved here is not spending', balance: 2640 },
];
const FIXED_TOTAL = FIXED.reduce((a, f) => a + f.value, 0);
const SPENT_TOTAL = CATS.reduce((a, k) => a + SPENT[k], 0);

type ViewKey = 'intro' | 'setup' | 'dash' | 'add' | 'fit' | 'limits';

interface Goal {
  name: string;
  saved: number;
  target: number;
  monthly: number;
  dueMonths: number;
  pausedMonthly?: number;
}

export interface WFFinancialHealthFlowProps {
  view?: ViewKey;
  step?: number;
  seeded?: boolean;
  showChrome?: boolean;
  compact?: boolean;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function monthLabel(offset: number) {
  const m = 8 + offset;
  return MONTHS[((m % 12) + 12) % 12] + ' ' + (2026 + Math.floor(m / 12));
}
function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

/* shared style atoms ------------------------------------------------- */
const card: CSSProperties = { background: '#FFFFFF', border: '1px solid #E3E0DA', borderRadius: 8 };
const publicSans = "'Public Sans', system-ui, sans-serif";
const num: CSSProperties = { fontFamily: publicSans, fontVariantNumeric: 'tabular-nums' };
const redBtn: CSSProperties = { border: 'none', borderRadius: 8, background: '#D71E28', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer' };
const ghostPill: CSSProperties = {
  padding: '8px 16px', border: '1px solid #D71E28', borderRadius: 8, background: '#FFFFFF',
  fontSize: 14, fontWeight: 700, color: '#D71E28', cursor: 'pointer',
};
const stepBtn = (size: number): CSSProperties => ({
  flex: `0 0 ${size}px`, width: size, height: size, border: '1px solid #D71E28', borderRadius: 8,
  background: '#FFFFFF', fontSize: 20, fontWeight: 700, color: '#D71E28', cursor: 'pointer',
});
const kicker: CSSProperties = { fontSize: 12, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#A8A29E' };
const hairline: CSSProperties = { height: 1, background: '#F0EEE9', margin: '24px 0' };

function BackLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: 0, border: 'none', background: 'transparent', fontSize: 14, fontWeight: 700, color: '#D71E28', cursor: 'pointer' }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12H5M11 6l-6 6 6 6" />
      </svg>
      {label}
    </button>
  );
}

export default function WFFinancialHealthFlow({
  view: startView = 'intro',
  step: startStep = 1,
  seeded = false,
  showChrome = true,
  compact = false,
}: WFFinancialHealthFlowProps) {
  const initial = () => ({
    view: startView as ViewKey,
    setupStep: startStep,
    banner: '',
    goals: (seeded
      ? [
          { name: 'Emergency fund', saved: 2000, target: 12000, monthly: 350, dueMonths: 30, paused: false },
          { name: 'Mauritius trip', saved: 640, target: 3000, monthly: 90, dueMonths: 22, paused: false },
        ]
      : []) as Goal[],
    accounts: [true, false, true, false],
    income: 5240,
    limits: { ...SUGGESTED } as CatMap,
    pending: { ...SUGGESTED } as CatMap,
    draftName: 'Sardinia trip',
    draftTarget: 9000,
    draftMonths: 12,
  });

  const [s, setS] = useState(initial);
  type S = ReturnType<typeof initial>;
  const set = (patch: Partial<S> | ((p: S) => Partial<S>)) =>
    setS((p) => ({ ...p, ...(typeof patch === 'function' ? patch(p) : patch) }));
  const reset = () => setS(initial());

  const c = compact;
  const gut = c ? 16 : 32;
  const pad = {
    hero: c ? '24px 16px 32px 16px' : '40px 32px 48px 32px',
    page: c ? '24px 16px 32px 16px' : '32px 32px 40px 32px',
    rail: c ? '0 16px 32px 16px' : '8px 32px 40px 32px',
    bar: c ? '12px 16px' : '16px 32px',
    crumb: c ? '12px 16px' : '12px 32px',
    foot: c ? '24px 16px 32px 16px' : '24px 32px 32px 32px',
    card: c ? 16 : 24,
    row: c ? '16px' : '16px 24px',
  };

  const v = useMemo(() => {
    const monthly = Math.ceil(s.draftTarget / s.draftMonths / 5) * 5;
    const committed = s.goals.reduce((a, g) => a + g.monthly, 0);
    const limitsTotal = CATS.reduce((a, k) => a + s.limits[k], 0);
    const spare = s.income - FIXED_TOTAL - committed - limitsTotal;
    const shortfall = Math.max(0, monthly - spare);
    const freedPending = ADJUSTABLE.reduce((a, k) => a + (s.limits[k] - s.pending[k]), 0);
    const stillToFind = Math.max(0, shortfall - freedPending);
    const covered = stillToFind === 0;
    const left = s.income - FIXED_TOTAL - committed - SPENT_TOTAL;

    const goals = s.goals.map((g, i) => {
      const paused = g.monthly === 0;
      const monthsNeeded = Math.ceil((g.target - g.saved) / Math.max(1, g.monthly));
      const behind = !paused && monthsNeeded > g.dueMonths;
      const gap = Math.abs(monthsNeeded - g.dueMonths);
      const pill = paused
        ? { label: 'Paused', bg: '#F0EEE9', ink: '#57534E' }
        : behind
        ? { label: 'Behind pace', bg: '#FBF1DF', ink: '#6B4405' }
        : { label: 'On pace', bg: '#E8F3EC', ink: '#24503A' };
      return {
        name: g.name,
        pillLabel: pill.label,
        pillBg: pill.bg,
        pillInk: pill.ink,
        pauseLabel: paused ? 'Resume' : 'Pause',
        togglePause: () =>
          set((p) => ({
            banner: paused
              ? g.name + ' has started again. ' + fmt(g.pausedMonthly || 100) + ' will move on the 1st of next month.'
              : g.name + ' is paused. No money will move until you resume it. The ' + fmt(g.saved) + ' already saved stays where it is.',
            goals: p.goals.map((x, j) =>
              j === i
                ? { ...x, monthly: paused ? x.pausedMonthly || 100 : 0, pausedMonthly: paused ? x.pausedMonthly : x.monthly }
                : x,
            ),
          })),
        remove: () =>
          set((p) => ({
            banner:
              g.name +
              ' has been removed. No more money will move to it. The ' +
              fmt(g.saved) +
              ' already saved stays in Way2Save Savings ···3300.',
            goals: p.goals.filter((_x, j) => j !== i),
          })),
        savedText: fmt(g.saved),
        targetText: fmt(g.target),
        pct: Math.min(100, Math.round((g.saved / g.target) * 100)) + '%',
        barColor: paused ? '#C9C4B8' : behind ? '#B26B00' : '#0E7A42',
        paceText: paused
          ? 'Nothing is moving to this goal at the moment. Resume it whenever you like.'
          : behind
          ? 'Behind pace. At ' + fmt(g.monthly) + ' a month you reach ' + fmt(g.target) + ' in ' + monthLabel(monthsNeeded) + ', ' + gap + ' month' + (gap === 1 ? '' : 's') + ' after your ' + monthLabel(g.dueMonths) + ' target.'
          : gap > 0
          ? 'On pace. At ' + fmt(g.monthly) + ' a month you reach ' + fmt(g.target) + ' in ' + monthLabel(monthsNeeded) + ', ' + gap + ' month' + (gap === 1 ? '' : 's') + ' before your ' + monthLabel(g.dueMonths) + ' target.'
          : 'On pace. At ' + fmt(g.monthly) + ' a month you reach ' + fmt(g.target) + ' in ' + monthLabel(g.dueMonths) + ', your target month.',
        source: paused ? 'No transfer set' : fmt(g.monthly) + ' from Everyday Checking ···4892 on the 1st.',
      };
    });

    const breachedRaw = CATS.filter((k) => SPENT[k] > s.limits[k]);
    const overTotal = breachedRaw.reduce((a, k) => a + (SPENT[k] - s.limits[k]), 0);
    const breached = breachedRaw.map((k) => ({
      name: k,
      nameLower: k.toLowerCase(),
      overText: fmt(SPENT[k] - s.limits[k]),
      line: fmt(SPENT[k]) + ' spent of ' + fmt(s.limits[k]),
    }));
    const withinCount = CATS.length - breachedRaw.length;

    const pct = (x: number) => Math.max(0, Math.round((x / s.income) * 100)) + '%';
    const flowSegs = [
      { label: 'Bills and fixed costs', value: FIXED_TOTAL, color: '#57534E' },
      { label: 'Savings goals', value: committed, color: '#0E7A42' },
      { label: 'Spent so far', value: SPENT_TOTAL, color: '#C9C4B8' },
      { label: 'Left to spend', value: Math.max(0, left), color: '#EDE9E1' },
    ].map((f) => ({ label: f.label, valueText: fmt(f.value), width: pct(f.value), color: f.color }));

    const cutRows = FIXED.slice(0, 3)
      .map((f) => ({
        name: f.name,
        note: 'Fixed cost — cannot be changed here',
        nameInk: '#44403C',
        locked: true,
        valueText: fmt(f.value),
        dec: () => {},
        inc: () => {},
      }))
      .concat(
        ADJUSTABLE.map((k) => ({
          name: k,
          note: 'Spent ' + fmt(SPENT[k]) + ' so far this month',
          nameInk: '#292524',
          locked: false,
          valueText: fmt(s.pending[k]),
          dec: () => set((p) => ({ pending: { ...p.pending, [k]: Math.max(0, p.pending[k] - 10) } })),
          inc: () => set((p) => ({ pending: { ...p.pending, [k]: Math.min(p.limits[k], p.pending[k] + 10) } })),
        })),
      );

    const limitRows = CATS.map((k) => {
      const over = SPENT[k] - s.limits[k];
      return {
        name: k,
        pct: Math.min(100, Math.round((SPENT[k] / s.limits[k]) * 100)) + '%',
        barColor: over > 0 ? '#D71E28' : '#0E7A42',
        line:
          over > 0
            ? fmt(SPENT[k]) + ' spent — ' + fmt(over) + ' over your ' + fmt(s.limits[k]) + ' limit'
            : fmt(SPENT[k]) + ' spent — ' + fmt(-over) + ' left of your ' + fmt(s.limits[k]) + ' limit',
        limitText: fmt(s.limits[k]),
        dec: () => set((p) => ({ limits: { ...p.limits, [k]: Math.max(0, p.limits[k] - 10) } })),
        inc: () => set((p) => ({ limits: { ...p.limits, [k]: p.limits[k] + 10 } })),
      };
    });

    const addGoal = (newLimits: CatMap | null) => {
      set((p) => ({
        view: 'dash',
        limits: newLimits || p.limits,
        pending: { ...(newLimits || p.limits) },
        banner:
          p.draftName +
          ' has started. ' +
          fmt(monthly) +
          ' will move from Everyday Checking ···4892 on 1 October 2026.' +
          (newLimits ? ' Your new spending limits apply from October too.' : ''),
        goals: p.goals.concat([{ name: p.draftName, saved: 0, target: p.draftTarget, monthly, dueMonths: p.draftMonths }]),
        draftName: 'New goal',
        draftTarget: 3000,
        draftMonths: 12,
      }));
    };

    const setupSpare = s.income - FIXED_TOTAL - CATS.reduce((a, k) => a + s.limits[k], 0);
    const chosenCount = s.accounts.filter(Boolean).length;
    const primaryIdx = s.accounts.indexOf(true);
    const acctLabel = primaryIdx > -1 ? ACCOUNTS[primaryIdx].name : 'no account chosen';
    const setupSide = [
      null,
      {
        label: chosenCount === 0 ? 'No accounts chosen yet' : chosenCount === 1 ? '1 account chosen' : chosenCount + ' accounts chosen',
        value: '',
        ink: '#292524',
        list: true,
        body: chosenCount === 0 ? 'Choose at least one account to carry on.' : 'You can add or drop an account later.',
        note: 'Nothing is saved until you finish all four steps.',
        next: 'Continue',
      },
      {
        label: 'Money in each month',
        value: fmt(s.income),
        ink: '#292524',
        list: false,
        body: 'This is what we will measure everything else against. If your pay changes, you can update it any time.',
        note: 'Nothing is saved until you finish all four steps.',
        next: 'Continue',
      },
      {
        label: 'Left after bills',
        value: fmt(s.income - FIXED_TOTAL),
        ink: '#292524',
        list: false,
        body: fmt(FIXED_TOTAL) + ' of your ' + fmt(s.income) + ' goes on bills and fixed costs. The rest is yours to divide up.',
        note: 'Step 4 is the last one.',
        next: 'Continue',
      },
      {
        label: 'Left to spend each month',
        value: fmt(setupSpare),
        ink: setupSpare < 0 ? '#6B4405' : '#0E7A42',
        list: false,
        body:
          setupSpare < 0
            ? 'Your limits add up to more than you have. Lower a limit until this figure is zero or above.'
            : 'After your bills and these limits you would have ' + fmt(setupSpare) + ' a month unspoken for. You can put that towards a savings goal later.',
        note: 'You can change any limit later.',
        next: 'Finish set-up',
      },
    ][s.setupStep]!;

    const steps: { key: ViewKey; label: string }[] = [
      { key: 'intro', label: 'Start' },
      { key: 'setup', label: 'Set a budget' },
      { key: 'dash', label: 'My budget' },
      { key: 'add', label: 'Add a savings goal' },
      { key: 'fit', label: "Goal doesn't fit" },
      { key: 'limits', label: 'Spending limits' },
    ];

    return {
      monthly,
      spare,
      shortfall,
      freedPending,
      stillToFind,
      covered,
      left,
      goals,
      breached,
      overTotal,
      withinCount,
      flowSegs,
      cutRows,
      limitRows,
      addGoal,
      setupSpare,
      chosenCount,
      acctLabel,
      setupSide,
      steps,
      isIntro: s.view === 'intro',
      isSetup: s.view === 'setup',
      isDash: s.view === 'dash',
      isAdd: s.view === 'add' || (s.view === 'fit' && shortfall <= 0),
      isFit: s.view === 'fit' && shortfall > 0,
      isLimits: s.view === 'limits',
      hasGoals: s.goals.length > 0,
      crumb: { intro: 'Set a budget', setup: 'Set a budget', dash: 'My budget', add: 'Add a savings goal', fit: 'Add a savings goal', limits: 'Spending limits' }[s.view],
      railSavedText: fmt(s.goals.reduce((a, g) => a + g.saved, 0)),
      railSavedSub: s.goals.length === 0 ? 'no savings goals yet' : 'saved across ' + s.goals.length + ' goal' + (s.goals.length === 1 ? '' : 's'),
      leftText: fmt(left),
      leftSub: 'That is about ' + fmt(left / 21) + ' a day for the 21 days left in September, after your bills and savings.',
      incomeText: fmt(s.income),
      breachTitle: breached.length ? 'Where you went over' : 'Your spending limits',
      consequence: breached.length
        ? 'Together you are ' + fmt(overTotal) + ' over your limits this month. That came out of your left-to-spend, which is now ' + fmt(left) + ' for the remaining 21 days.'
        : 'You are within every limit this month. You have ' + fmt(left) + ' left to spend for the remaining 21 days.',
      withinNote: withinCount > 0 ? 'Your other ' + withinCount + ' categor' + (withinCount === 1 ? 'y is' : 'ies are') + ' within their limits.' : '',
      draftTargetText: fmt(s.draftTarget),
      draftDateText: monthLabel(s.draftMonths),
      draftMonthsText: s.draftMonths + ' months from now',
      draftMonthlyText: fmt(monthly),
      spareText: fmt(Math.max(0, spare)),
      fitIntro:
        s.draftName +
        ' needs ' +
        fmt(monthly) +
        ' a month. After your bills, your other goals and your spending limits, you have ' +
        fmt(Math.max(0, spare)) +
        ' a month spare. You need to find ' +
        fmt(shortfall) +
        ' a month.',
      findLabel: covered ? 'You have found it' : 'Still to find each month',
      findText: covered ? fmt(0) : fmt(stillToFind),
      findInk: covered ? '#0E7A42' : '#6B4405',
      findBody: covered
        ? 'Your changes free up ' + fmt(freedPending) + ' a month. ' + s.draftName + ' can start on 1 October 2026 at ' + fmt(monthly) + ' a month.'
        : 'You have freed up ' + fmt(freedPending) + ' a month so far. Lower a limit above, or move the target date later.',
      confirmEnabled: covered,
      confirmNote: covered
        ? 'Your new limits and this goal both start on 1 October 2026.'
        : 'You can start this goal once you have found ' + fmt(stillToFind) + ' a month.',
      limitsSummary:
        'Your limits add up to ' +
        fmt(CATS.reduce((a, k) => a + s.limits[k], 0)) +
        ' a month. You have ' +
        fmt(s.income - FIXED_TOTAL - committed) +
        ' a month after bills and savings.',
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s, compact]);

  /* ------------------------------------------------------------------ *
   * Render
   * ------------------------------------------------------------------ */
  const navItems = compact
    ? []
    : [
        { label: 'Accounts', caret: true },
        { label: 'Brokerage', caret: false },
        { label: 'Transfer & Pay', caret: true },
        { label: 'Plan & Learn', caret: true, on: true },
        { label: 'Security & Support', caret: true },
      ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#292524' }}>
      {showChrome && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ ...kicker, marginRight: 6 }}>Flow</div>
          {v.steps.map((st) => (
            <button
              key={st.key}
              onClick={() => set({ view: st.key })}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                ...(s.view === st.key
                  ? { border: '1px solid #292524', background: '#292524', color: '#FFFFFF' }
                  : { border: '1px solid #E0DCD3', background: '#FFFFFF', color: '#44403C' }),
              }}
            >
              {st.label}
            </button>
          ))}
          <span style={{ flexGrow: 1 }} />
          <button
            onClick={() =>
              set({
                view: 'dash',
                banner: '',
                goals: [
                  { name: 'Emergency fund', saved: 2000, target: 12000, monthly: 350, dueMonths: 30 },
                  { name: 'Mauritius trip', saved: 640, target: 3000, monthly: 90, dueMonths: 22 },
                ],
              })
            }
            style={{ ...ghostPill, padding: '8px 16px', borderRadius: 999, fontSize: 12 }}
          >
            Load a set-up account
          </button>
          <button onClick={reset} style={{ ...ghostPill, padding: '8px 16px', borderRadius: 999, fontSize: 12 }}>
            Reset
          </button>
        </div>
      )}

      <div style={{ width: '100%', background: '#F4F2ED', overflow: 'hidden' }}>
        {/* top bar */}
        <div style={{ background: '#D71E28', borderBottom: '3px solid #FFCD41', padding: pad.bar, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 16px' }}>
          <div style={{ ...num, fontSize: 20, fontWeight: 700, letterSpacing: '0.01em', color: '#FFFFFF' }}>WELLS FARGO</div>
          <span style={{ flexGrow: 1 }} />
          {!compact && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" /></svg>
              <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.35)' }} />
              <div style={{ position: 'relative', display: 'flex' }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="m2 7 10 6 10-6" /></svg>
                <div style={{ position: 'absolute', top: -6, right: -7, minWidth: 17, height: 17, borderRadius: 999, background: '#FFCD41', color: '#292524', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>3</div>
              </div>
              <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.35)' }} />
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
              <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.35)' }} />
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3.4" /><path d="M5.6 19a7 7 0 0 1 12.8 0" /></svg>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#FFFFFF' }}>Welcome, Rosita</div>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </div>
        </div>

        {/* nav row */}
        <div style={{ background: '#FFFFFF', borderBottom: '1px solid #D6D3D1', padding: `0 ${gut}px`, display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
          {compact && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#292524" strokeWidth="2.2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#292524' }}>Menu</div>
            </div>
          )}
          {navItems.map((n) => (
            <div
              key={n.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: compact ? 16 : '16px 24px',
                fontSize: 14,
                cursor: 'pointer',
                ...(n.on ? { fontWeight: 700, color: '#292524', boxShadow: 'inset 0 -3px 0 #D71E28' } : { color: '#44403C' }),
              }}
            >
              <span>{n.label}</span>
              {n.caret && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#57534E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              )}
            </div>
          ))}
        </div>

        {/* breadcrumb */}
        <div style={{ background: '#E7E5E1', borderBottom: '1px solid #D6D3D1', padding: pad.crumb, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#57534E"><path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3z" /></svg>
          <div style={{ fontSize: 14, color: '#57534E' }}>Account Summary</div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A8A29E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#292524' }}>{v.crumb}</div>
        </div>

        {/* content + rail */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '3 1 460px', minWidth: 0 }}>
            {v.isIntro && <IntroView pad={pad} onStart={() => set({ view: 'setup', setupStep: 1 })} onSkip={() => set({ view: 'dash' })} />}
            {v.isSetup && (
              <SetupView
                pad={pad}
                s={s}
                v={v}
                set={set}
                onBack={() => set((p) => (p.setupStep === 1 ? { view: 'intro' } : { setupStep: p.setupStep - 1 }))}
                onNext={() => {
                  if (s.setupStep === 1 && v.chosenCount === 0) return;
                  if (s.setupStep < 4) set((p) => ({ setupStep: p.setupStep + 1 }));
                  else if (v.setupSpare >= 0) set({ view: 'dash', banner: 'Your budget is set. We will keep it up to date as money comes in and out.' });
                }}
              />
            )}
            {v.isDash && <DashView pad={pad} s={s} v={v} onAddGoal={() => set({ view: 'add', banner: '' })} onLimits={() => set({ view: 'limits', banner: '' })} />}
            {v.isAdd && (
              <AddView
                pad={pad}
                s={s}
                v={v}
                set={set}
                onBack={() => set({ view: 'dash' })}
                onStart={() => {
                  if (v.monthly <= v.spare) v.addGoal(null);
                  else set((p) => ({ view: 'fit', pending: { ...p.limits } }));
                }}
              />
            )}
            {v.isFit && (
              <FitView
                pad={pad}
                v={v}
                onBack={() => set({ view: 'add' })}
                onConfirm={() => {
                  if (v.covered) v.addGoal({ ...s.pending });
                }}
                onPushDate={() => set((p) => ({ view: 'add', draftMonths: p.draftMonths + 12 }))}
              />
            )}
            {v.isLimits && (
              <LimitsView
                pad={pad}
                v={v}
                onBack={() => set({ view: 'dash' })}
                onSave={() => set((p) => ({ view: 'dash', pending: { ...p.limits }, banner: 'Your spending limits are saved. They apply from 1 October 2026.' }))}
              />
            )}
          </div>

          {/* rail */}
          <div style={{ flex: '1 1 280px', minWidth: 260, padding: pad.rail, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ ...card, padding: pad.card }}>
              <div style={{ ...num, fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>My savings plan</div>
              <div style={{ marginTop: 16 }}>
                <div style={{ ...num, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: '#0E7A42', lineHeight: 1.15 }}>{v.railSavedText}</div>
                <div style={{ fontSize: 14, color: '#78716C', marginTop: 4 }}>{v.railSavedSub}</div>
              </div>
              {v.hasGoals ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                  {v.goals.map((g) => {
                    const ink = g.pillLabel === 'Paused' ? '#A8A29E' : g.pillLabel === 'Behind pace' ? '#B26B00' : '#0E7A42';
                    return (
                      <div key={g.name}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{g.name}</div>
                          <span style={{ flexGrow: 1 }} />
                          <div style={{ fontSize: 14, fontWeight: 700, color: ink }}>{g.pillLabel}</div>
                        </div>
                        <div style={{ height: 8, borderRadius: 4, background: '#EDE9E1', marginTop: 8, overflow: 'hidden' }}>
                          <div style={{ height: 8, borderRadius: 4, background: ink, width: g.pct }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ fontSize: 14, lineHeight: 1.5, color: '#57534E', marginTop: 16 }}>
                  Saving for school, a holiday or a home? A savings goal moves the money for you each month.
                </div>
              )}
            </div>

            <div style={{ ...card, padding: pad.card }}>
              <div style={{ ...num, fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>Money out this month</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 16 }}>
                {CATS.map((k, i) => (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
                    <div style={{ width: 9, height: 9, borderRadius: 999, flexShrink: 0, background: ['#7A1D16', '#D71E28', '#E07B1F', '#F0B429', '#C9C4B8'][i] }} />
                    <div style={{ fontSize: 14, color: '#44403C' }}>{k}</div>
                    <span style={{ flexGrow: 1 }} />
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#292524' }}>{fmt(SPENT[k])}</div>
                  </div>
                ))}
              </div>
              <div style={{ ...hairline, margin: '16px 0' }} />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <div style={{ fontSize: 14, color: '#57534E' }}>Total out</div>
                <span style={{ flexGrow: 1 }} />
                <div style={{ ...num, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>{fmt(SPENT_TOTAL)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div style={{ background: '#FFFFFF', borderTop: '1px solid #D6D3D1', padding: pad.foot }}>
          <div style={{ ...num, fontSize: 16, fontWeight: 700 }}>Account disclosures</div>
          <div style={{ fontSize: 12, color: '#57534E', marginTop: 8 }}>Deposit products offered by Wells Fargo Bank, N.A. Member FDIC. Equal Housing Lender.</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16, fontSize: 12, color: '#57534E' }}>
            <span>Online Security Guarantee</span>
            <span>Privacy, Security, Cookies &amp; Legal</span>
            <span>Ad Choices</span>
            <span>Contact Us</span>
            <span>Locations</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== *
 * Views
 * ================================================================== */
type Pad = {
  hero: string; page: string; rail: string; bar: string; crumb: string; foot: string; card: number; row: string;
};

function IntroView({ pad, onStart, onSkip }: { pad: Pad; onStart: () => void; onSkip: () => void }) {
  const steps = [
    { n: '1', title: 'Which accounts to watch', body: 'Pick the accounts you spend from. We only look at those.' },
    { n: '2', title: 'What comes in', body: 'We show you the pay we already see arriving. You confirm it.' },
    { n: '3', title: 'What is already spoken for', body: 'Rent, utilities, insurance and other set payments, added up for you.' },
    { n: '4', title: 'What you want to cap', body: 'Set a monthly limit on a few everyday categories. We do the arithmetic.' },
  ];
  return (
    <div style={{ padding: pad.hero }}>
      <div style={{ maxWidth: 720 }}>
        <div style={kicker}>Set a budget</div>
        <div style={{ ...num, fontSize: 40, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, marginTop: 16 }}>
          See what is left to spend each month
        </div>
        <div style={{ fontSize: 20, lineHeight: 1.5, color: '#44403C', marginTop: 16, maxWidth: '60ch' }}>
          We will ask you four things. It takes about two minutes, and you can change any of it later.
        </div>

        <div style={{ ...card, padding: pad.card, marginTop: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}>
          <div>
            <div style={{ fontSize: 14, color: '#57534E' }}>What you end up with</div>
            <div style={{ ...num, fontSize: 32, fontWeight: 700, letterSpacing: '-0.022em', lineHeight: 1.15, color: '#0E7A42', marginTop: 4 }}>$1,864</div>
            <div style={{ fontSize: 14, color: '#57534E' }}>left to spend, updated daily</div>
          </div>
          <div style={{ flex: '1 1 220px', minWidth: 0 }}>
            <div style={{ height: 12, borderRadius: 8, background: '#EDE9E1', overflow: 'hidden', display: 'flex', gap: 4 }}>
              <div style={{ height: 12, background: '#57534E', width: '53%' }} />
              <div style={{ height: 12, background: '#0E7A42', width: '8%' }} />
              <div style={{ height: 12, background: '#C9C4B8', width: '23%' }} />
            </div>
            <div style={{ fontSize: 14, color: '#78716C', marginTop: 8 }}>Bills · savings · spent so far · left</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 24 }}>
          {steps.map((i) => (
            <div key={i.n} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: '#FFFFFF', border: '1px solid #E7E5E4', padding: pad.row }}>
              <div style={{ width: 34, height: 34, borderRadius: 999, background: '#F4F2ED', border: '1px solid #E0DCD3', display: 'flex', alignItems: 'center', justifyContent: 'center', ...num, fontSize: 14, fontWeight: 700, color: '#57534E', flexShrink: 0 }}>
                {i.n}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{i.title}</div>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: '#57534E', marginTop: 3 }}>{i.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24 }}>
          <button onClick={onStart} style={{ ...redBtn, padding: '16px 32px', fontSize: 16 }}>Set a budget</button>
          <button onClick={onSkip} style={{ padding: 0, border: 'none', background: 'transparent', fontSize: 16, fontWeight: 700, color: '#D71E28', textDecoration: 'underline', textUnderlineOffset: 4, cursor: 'pointer' }}>
            Not right now
          </button>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: '#78716C', marginTop: 24, maxWidth: '62ch' }}>
          Savings goals stay separate from your monthly spending. Setting one up does not change the other.
        </div>
      </div>
    </div>
  );
}

function SetupView({
  pad, s, v, set, onBack, onNext,
}: {
  pad: Pad;
  s: { setupStep: number; income: number; accounts: boolean[]; limits: CatMap };
  v: any;
  set: (p: any) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const step = s.setupStep;
  const titles = ['', 'Which accounts should this budget watch?', 'What comes in each month?', 'Your regular payments', 'What do you want to cap?'];
  const blurbs = [
    '',
    'Pick the accounts you spend from. Tap a row to include or leave out an account.',
    'This is the pay we can see arriving in ' + v.acctLabel + '.',
    'The recurring payments you have set up in Bill Pay, plus anything else we see leaving on the same date each month. We have added them up so you do not have to.',
    'Pick a monthly limit for each everyday category. We suggest what you usually spend — change any of them.',
  ];
  const side = v.setupSide;
  const nextDisabled = (step === 1 && v.chosenCount === 0) || (step === 4 && v.setupSpare < 0);

  return (
    <div style={{ padding: pad.page }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <BackLink label={step === 1 ? 'Back to start' : 'Back a step'} onClick={onBack} />
        <span style={{ flexGrow: 1 }} />
        <div style={{ fontSize: 12, fontWeight: 700, color: '#78716C' }}>Step {step} of 4</div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ height: 5, flexGrow: 1, borderRadius: 4, background: i <= step ? '#D71E28' : '#E0DCD3' }} />
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start', marginTop: 24 }}>
        <div style={{ flex: '1 1 420px', minWidth: 0 }}>
          <div style={{ ...num, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{titles[step]}</div>
          <div style={{ fontSize: 16, lineHeight: 1.5, color: '#57534E', marginTop: 8, maxWidth: '66ch' }}>{blurbs[step]}</div>

          {step === 1 && (
            <>
              <div style={{ ...card, marginTop: 24 }}>
                {ACCOUNTS.map((a, i) => (
                  <div
                    key={a.name}
                    onClick={() => set((p: any) => ({ accounts: p.accounts.map((val: boolean, j: number) => (j === i ? !val : val)) }))}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: pad.row,
                      borderBottom: '1px solid #F0EEE9',
                      cursor: 'pointer',
                      background: s.accounts[i] ? '#FBFAF8' : '#FFFFFF',
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 4,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...(s.accounts[i] ? { background: '#0E7A42', border: '1px solid #0E7A42' } : { background: '#FFFFFF', border: '1.5px solid #A8A29E' }),
                      }}
                    >
                      {s.accounts[i] && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                      )}
                    </div>
                    <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{a.name}</div>
                      <div style={{ fontSize: 14, lineHeight: 1.5, color: '#78716C', marginTop: 4 }}>{a.note}</div>
                    </div>
                    <div style={{ ...num, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap', color: a.balance < 0 ? '#57534E' : '#292524' }}>
                      {(a.balance < 0 ? '−$' : '$') + Math.abs(a.balance).toLocaleString('en-US')}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: '#57534E', marginTop: 16 }}>
                Money moving between two accounts you have chosen is not counted as spending.
              </div>
            </>
          )}

          {step === 2 && (
            <div style={{ ...card, padding: pad.card, marginTop: 24 }}>
              <div style={kicker}>We found this coming in</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 999, background: '#E8F3EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0E7A42" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Payroll — Mercy General Hospital</div>
                  <div style={{ fontSize: 14, color: '#78716C', marginTop: 4 }}>Paid on the 1st and the 15th, every month</div>
                </div>
                <span style={{ flexGrow: 1 }} />
                <div style={{ ...num, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>$5,240</div>
              </div>
              <div style={hairline} />
              <div style={{ fontSize: 14, fontWeight: 700 }}>Is that right?</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 }}>
                <button onClick={() => set((p: any) => ({ income: Math.max(500, p.income - 20) }))} style={{ ...stepBtn(48) }}>−</button>
                <div style={{ flex: '1 1 auto', minWidth: 0, textAlign: 'center', ...num, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>{v.incomeText}</div>
                <button onClick={() => set((p: any) => ({ income: p.income + 20 }))} style={{ ...stepBtn(48) }}>+</button>
                <div style={{ fontSize: 14, color: '#78716C' }}>a month, after tax</div>
              </div>
            </div>
          )}

          {step === 3 && (
            <>
              <div style={{ ...card, marginTop: 24 }}>
                {FIXED.map((f) => (
                  <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: pad.row, borderBottom: '1px solid #F0EEE9' }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{f.name}</div>
                      <div style={{ fontSize: 14, color: '#A8A29E', marginTop: 4 }}>{f.note}</div>
                    </div>
                    <span style={{ flexGrow: 1 }} />
                    <div style={{ ...num, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>{fmt(f.value)}</div>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: pad.row }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Bills and fixed costs each month</div>
                  <span style={{ flexGrow: 1 }} />
                  <div style={{ ...num, fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em' }}>{fmt(FIXED_TOTAL)}</div>
                </div>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: '#57534E', marginTop: 16 }}>
                To change or cancel one of these, go to Transfer &amp; Pay → Bill Pay. Anything you change there shows up here next month.
              </div>
            </>
          )}

          {step === 4 && (
            <div style={{ ...card, marginTop: 24 }}>
              {CATS.map((k) => (
                <div key={k} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 16px', padding: pad.row, borderBottom: '1px solid #F0EEE9' }}>
                  <div style={{ flex: '1 1 150px', minWidth: 0, fontSize: 16, fontWeight: 700 }}>{k}</div>
                  <div style={{ flex: '1 1 150px', fontSize: 14, color: '#57534E' }}>You usually spend about {fmt(USUAL[k])} a month</div>
                  <div style={{ flex: '0 0 auto', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                      onClick={() => set((p: any) => ({ limits: { ...p.limits, [k]: Math.max(0, p.limits[k] - 10) }, pending: { ...p.pending, [k]: Math.max(0, p.limits[k] - 10) } }))}
                      style={{ ...stepBtn(44) }}
                    >
                      −
                    </button>
                    <div style={{ width: 88, textAlign: 'center', ...num, fontSize: 20, fontWeight: 700 }}>{fmt(s.limits[k])}</div>
                    <button
                      onClick={() => set((p: any) => ({ limits: { ...p.limits, [k]: p.limits[k] + 10 }, pending: { ...p.pending, [k]: p.limits[k] + 10 } }))}
                      style={{ ...stepBtn(44) }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: '1 1 300px', minWidth: 280 }}>
          <div style={{ ...card, padding: pad.card }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#57534E' }}>{side.label}</div>
            {!side.list && (
              <div style={{ ...num, fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginTop: 8, color: side.ink }}>{side.value}</div>
            )}
            <div style={{ fontSize: 14, lineHeight: 1.5, color: '#57534E', marginTop: 8 }}>{side.body}</div>
            <div style={hairline} />
            <button
              onClick={onNext}
              style={{
                width: '100%',
                padding: 16,
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 700,
                ...(nextDisabled ? { background: '#E7E5E4', color: '#A8A29E', cursor: 'not-allowed' } : { background: '#D71E28', color: '#FFFFFF', cursor: 'pointer' }),
              }}
            >
              {side.next}
            </button>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: '#78716C', marginTop: 8 }}>{side.note}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashView({
  pad, s, v, onAddGoal, onLimits,
}: {
  pad: Pad;
  s: { banner: string };
  v: any;
  onAddGoal: () => void;
  onLimits: () => void;
}) {
  return (
    <div style={{ padding: pad.page, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {s.banner && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: pad.row, borderRadius: 10, background: '#E8F3EC', border: '1px solid #CBE3D5' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E7A42" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M20 6 9 17l-5-5" /></svg>
          <div style={{ fontSize: 16, lineHeight: 1.5, color: '#24503A' }}>{s.banner}</div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
        <div>
          <div style={{ ...num, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>My budget</div>
          <div style={{ fontSize: 14, color: '#78716C', marginTop: 4 }}>September 2026 · 21 days left · {v.acctLabel}</div>
        </div>
      </div>

      <div style={{ ...card, display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
        <div style={{ flex: '1 1 260px', minWidth: 240, padding: 24, borderRight: '1px solid #F0EEE9' }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#57534E' }}>Left to spend</div>
          <div style={{ ...num, fontSize: 32, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.02, color: '#0E7A42', marginTop: 8 }}>{v.leftText}</div>
          <div style={{ fontSize: 16, lineHeight: 1.5, color: '#57534E', marginTop: 8 }}>{v.leftSub}</div>
        </div>
        <div style={{ flex: '2 1 420px', minWidth: 300, padding: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#57534E' }}>Where this month's {v.incomeText} is going</div>
          <div style={{ height: 16, borderRadius: 8, background: '#EDE9E1', marginTop: 16, overflow: 'hidden', display: 'flex', gap: 4 }}>
            {v.flowSegs.map((f: any) => (
              <div key={f.label} style={{ height: 16, width: f.width, background: f.color }} />
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16, marginTop: 16 }}>
            {v.flowSegs.map((f: any) => (
              <div key={f.label}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 4, background: f.color, flexShrink: 0 }} />
                  <div style={{ fontSize: 12, color: '#57534E' }}>{f.label}</div>
                </div>
                <div style={{ ...num, fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', marginTop: 4 }}>{f.valueText}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* savings goals */}
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 16px' }}>
          <div style={{ ...num, fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>Savings goals</div>
          <span style={{ flexGrow: 1 }} />
          <button onClick={onAddGoal} style={{ ...redBtn, padding: '12px 16px', fontSize: 14, whiteSpace: 'nowrap' }}>Add a savings goal</button>
        </div>
        {v.hasGoals ? (
          <div style={{ ...card, marginTop: 16 }}>
            {v.goals.map((g: any) => (
              <div key={g.name} style={{ padding: pad.card, borderBottom: '1px solid #F0EEE9' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em', minWidth: 0 }}>{g.name}</div>
                  <span style={{ flexGrow: 1 }} />
                  <div style={{ padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: g.pillBg, color: g.pillInk }}>{g.pillLabel}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                  <div style={{ ...num, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>{g.savedText}</div>
                  <div style={{ fontSize: 14, color: '#78716C' }}>saved of {g.targetText}</div>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: '#EDE9E1', marginTop: 8, overflow: 'hidden' }}>
                  <div style={{ height: 8, borderRadius: 4, background: g.barColor, width: g.pct }} />
                </div>
                <div style={{ fontSize: 16, lineHeight: 1.5, color: '#57534E', marginTop: 16 }}>{g.paceText}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 24 }}>
                  <div style={{ fontSize: 14, color: '#78716C', minWidth: 0 }}>{g.source}</div>
                  <span style={{ flexGrow: 1 }} />
                  <div style={{ display: 'flex', gap: 8, flex: '0 0 auto' }}>
                    <button onClick={g.togglePause} style={ghostPill}>{g.pauseLabel}</button>
                    <button onClick={g.remove} style={ghostPill}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ ...card, padding: pad.card, marginTop: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>You have no savings goals yet.</div>
            <div style={{ fontSize: 16, lineHeight: 1.5, color: '#57534E', marginTop: 8, maxWidth: '66ch' }}>
              A savings goal moves a set amount into savings each month. It is separate from your spending limits, and you can stop it whenever you like.
            </div>
          </div>
        )}
      </div>

      {/* breached / limits */}
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 16px' }}>
          <div style={{ ...num, fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>{v.breachTitle}</div>
          <span style={{ flexGrow: 1 }} />
          <button onClick={onLimits} style={{ ...redBtn, padding: '12px 16px', fontSize: 14, whiteSpace: 'nowrap' }}>Spending limits</button>
        </div>
        <div style={{ ...card, marginTop: 16 }}>
          {v.breached.map((b: any) => (
            <div key={b.name} style={{ padding: pad.row, borderBottom: '1px solid #F0EEE9' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px 12px', flexWrap: 'wrap' }}>
                <div style={{ ...num, fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', color: '#B3151E', lineHeight: 1.15 }}>{b.overText}</div>
                <div style={{ fontSize: 16, color: '#292524' }}>over your {b.nameLower} limit</div>
                <span style={{ flexGrow: 1 }} />
              </div>
              <div style={{ fontSize: 14, color: '#78716C', marginTop: 4 }}>{b.line}</div>
            </div>
          ))}
          <div style={{ padding: '4px 24px 22px 24px', fontSize: 16, lineHeight: 1.5, color: '#57534E' }}>{v.consequence}</div>
        </div>
        {v.withinNote && <div style={{ fontSize: 14, color: '#78716C', marginTop: 8 }}>{v.withinNote}</div>}
      </div>
    </div>
  );
}

function AddView({
  pad, s, v, set, onBack, onStart,
}: {
  pad: Pad;
  s: { draftName: string };
  v: any;
  set: (p: any) => void;
  onBack: () => void;
  onStart: () => void;
}) {
  return (
    <div style={{ padding: pad.page }}>
      <BackLink label="Back to my budget" onClick={onBack} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start', marginTop: 16 }}>
        <div style={{ flex: '1 1 420px', minWidth: 0 }}>
          <div style={{ ...num, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>Add a savings goal</div>
          <div style={{ fontSize: 16, color: '#57534E', marginTop: 8 }}>Tell us the amount and the date. We work out the monthly amount.</div>

          <div style={{ ...card, padding: pad.card, marginTop: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>What are you saving for?</label>
            <input
              value={s.draftName}
              onChange={(e) => set({ draftName: e.target.value })}
              style={{ width: '100%', marginTop: 8, padding: '12px 16px', border: '1px solid #A8A29E', borderRadius: 8, fontSize: 16, fontFamily: "'DM Sans', sans-serif", color: '#292524', outline: 'none' }}
            />

            <div style={hairline} />

            <label style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>How much do you want to save?</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
              <button onClick={() => set((p: any) => ({ draftTarget: Math.max(500, p.draftTarget - 500) }))} style={{ ...stepBtn(48) }}>−</button>
              <div style={{ flex: '1 1 auto', minWidth: 0, textAlign: 'center', ...num, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>{v.draftTargetText}</div>
              <button onClick={() => set((p: any) => ({ draftTarget: p.draftTarget + 500 }))} style={{ ...stepBtn(48) }}>+</button>
            </div>

            <div style={hairline} />

            <label style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>When do you want it by?</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
              <button onClick={() => set((p: any) => ({ draftMonths: Math.max(2, p.draftMonths - 1) }))} style={{ ...stepBtn(48) }}>−</button>
              <div style={{ flex: '1 1 auto', minWidth: 0, textAlign: 'center', ...num, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>{v.draftDateText}</div>
              <button onClick={() => set((p: any) => ({ draftMonths: p.draftMonths + 1 }))} style={{ ...stepBtn(48) }}>+</button>
            </div>
            <div style={{ fontSize: 14, color: '#78716C', marginTop: 8 }}>{v.draftMonthsText}</div>
          </div>
        </div>

        <div style={{ flex: '1 1 300px', minWidth: 280 }}>
          <div style={{ ...card, padding: pad.card }}>
            <div style={{ fontSize: 14, color: '#57534E' }}>You would save</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
              <div style={{ ...num, fontSize: 32, fontWeight: 700, letterSpacing: '-0.022em', lineHeight: 1.15 }}>{v.draftMonthlyText}</div>
              <div style={{ fontSize: 16, color: '#57534E' }}>a month</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 24 }}>
              {[
                ['From', 'Everyday Checking ···4892'],
                ['On', 'The 1st of each month'],
                ['Between', 'October 2026 and ' + v.draftDateText],
              ].map(([k, val]) => (
                <div key={k} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                  <div style={{ flex: '0 0 64px', fontSize: 14, color: '#78716C' }}>{k}</div>
                  <div style={{ flex: '1 1 auto', minWidth: 0, fontSize: 14, color: '#292524' }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={hairline} />
            <div style={{ fontSize: 14, lineHeight: 1.5, color: '#57534E' }}>
              You have {v.spareText} a month spare after your bills, your other goals and your spending limits.
            </div>
            <button onClick={onStart} style={{ ...redBtn, width: '100%', marginTop: 16, padding: 16, fontSize: 16 }}>Start this goal</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FitView({
  pad, v, onBack, onConfirm, onPushDate,
}: {
  pad: Pad;
  v: any;
  onBack: () => void;
  onConfirm: () => void;
  onPushDate: () => void;
}) {
  return (
    <div style={{ padding: pad.page }}>
      <BackLink label="Back to the goal" onClick={onBack} />
      <div style={{ ...num, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, marginTop: 16 }}>This goal needs more than you have spare</div>
      <div style={{ fontSize: 16, lineHeight: 1.5, color: '#292524', marginTop: 8, maxWidth: '72ch' }}>{v.fitIntro}</div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start', marginTop: 24 }}>
        <div style={{ flex: '1 1 420px', minWidth: 0, ...card }}>
          <div style={{ padding: '16px 24px 14px 22px' }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Lower a spending limit to make room</div>
            <div style={{ fontSize: 14, color: '#57534E', marginTop: 4 }}>You choose what to change. Nothing changes until you confirm.</div>
          </div>
          {v.cutRows.map((r: any) => (
            <div key={r.name} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 16px', padding: pad.row, borderTop: '1px solid #F0EEE9' }}>
              <div style={{ flex: '1 1 190px', minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: r.nameInk }}>{r.name}</div>
                <div style={{ fontSize: 12, color: '#78716C', marginTop: 4 }}>{r.note}</div>
              </div>
              <span style={{ flexGrow: 1 }} />
              {r.locked ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
                  <div style={{ width: 110, textAlign: 'right', ...num, fontSize: 20, fontWeight: 700, color: '#57534E' }}>{r.valueText}</div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button onClick={r.dec} style={{ ...stepBtn(44) }}>−</button>
                  <div style={{ width: 100, textAlign: 'center', ...num, fontSize: 20, fontWeight: 700 }}>{r.valueText}</div>
                  <button onClick={r.inc} style={{ ...stepBtn(44) }}>+</button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ flex: '1 1 300px', minWidth: 280, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...card, padding: pad.card }}>
            <div style={{ fontSize: 14, color: '#57534E' }}>{v.findLabel}</div>
            <div style={{ ...num, fontSize: 32, fontWeight: 700, letterSpacing: '-0.022em', lineHeight: 1.15, marginTop: 4, color: v.findInk }}>{v.findText}</div>
            <div style={{ fontSize: 16, lineHeight: 1.5, color: '#57534E', marginTop: 16 }}>{v.findBody}</div>
            <div style={hairline} />
            <button
              onClick={onConfirm}
              style={{
                width: '100%',
                padding: 16,
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 700,
                ...(v.confirmEnabled ? { background: '#D71E28', color: '#FFFFFF', cursor: 'pointer' } : { background: '#E7E5E4', color: '#A8A29E', cursor: 'not-allowed' }),
              }}
            >
              Start this goal
            </button>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: '#78716C', marginTop: 8 }}>{v.confirmNote}</div>
            <button onClick={onPushDate} style={{ ...ghostPill, width: '100%', marginTop: 16, padding: 12 }}>Move the date later instead</button>
          </div>

          <div style={{ ...card, padding: pad.card }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Would rather talk it through?</div>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: '#57534E', marginTop: 8 }}>A Wells Fargo banker can look at this with you. No charge.</div>
            <button style={{ ...ghostPill, width: '100%', marginTop: 16, padding: 12 }}>Book time with a banker</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LimitsView({
  pad, v, onBack, onSave,
}: {
  pad: Pad;
  v: any;
  onBack: () => void;
  onSave: () => void;
}) {
  return (
    <div style={{ padding: pad.page }}>
      <BackLink label="Back to my budget" onClick={onBack} />
      <div style={{ ...num, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, marginTop: 16 }}>Spending limits</div>
      <div style={{ fontSize: 16, lineHeight: 1.5, color: '#57534E', marginTop: 8, maxWidth: '72ch' }}>
        One set of limits for Everyday Checking ···4892. Change a limit whenever you like — it applies from next month. Your savings goals are separate and are not affected.
      </div>

      <div style={{ ...card, marginTop: 24 }}>
        {v.limitRows.map((r: any) => (
          <div key={r.name} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 16px', padding: pad.row, borderBottom: '1px solid #F0EEE9' }}>
            <div style={{ flex: '1 1 150px', minWidth: 0, fontSize: 16, fontWeight: 700 }}>{r.name}</div>
            <div style={{ flex: '2 1 200px', minWidth: 180 }}>
              <div style={{ height: 10, borderRadius: 4, background: '#EDE9E1', overflow: 'hidden' }}>
                <div style={{ height: 10, borderRadius: 4, background: r.barColor, width: r.pct }} />
              </div>
              <div style={{ fontSize: 14, color: '#57534E', marginTop: 8 }}>{r.line}</div>
            </div>
            <div style={{ flex: '0 0 auto', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={r.dec} style={{ ...stepBtn(44) }}>−</button>
              <div style={{ width: 88, textAlign: 'center', ...num, fontSize: 20, fontWeight: 700 }}>{r.limitText}</div>
              <button onClick={r.inc} style={{ ...stepBtn(44) }}>+</button>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: pad.row }}>
          <div style={{ fontSize: 16, lineHeight: 1.5, color: '#292524' }}>{v.limitsSummary}</div>
          <span style={{ flexGrow: 1 }} />
          <button onClick={onSave} style={{ ...redBtn, padding: pad.row, fontSize: 16, flexShrink: 0 }}>Save limits</button>
        </div>
      </div>
      <div style={{ fontSize: 14, color: '#78716C', marginTop: 8 }}>Bills and fixed costs are not listed here. They are set by your standing payments.</div>
    </div>
  );
}
