import { useRef, useState, type CSSProperties, type ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Icon paths (ported verbatim from the `const I = {...}` icon set in the
// original .dc.html prototype).
// ---------------------------------------------------------------------------
const I = {
  home: 'M4 11l8-6 8 6v9H4zM10 20v-5h4v5',
  car: 'M3 13l2-5.5A2 2 0 0 1 6.9 6h10.2a2 2 0 0 1 1.9 1.5L21 13v4h-3M6 17H3v-4M3 13h18',
  shield: 'M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z',
  bolt: 'M13 3L5 14h6l-1 7 8-11h-6z',
  dollar: 'M12 3v18M16 7c0-1.7-1.8-3-4-3S8 5.3 8 7s1.8 3 4 3 4 1.3 4 3-1.8 3-4 3-4-1.3-4-3',
  phone: 'M7 3h4l1.5 4-2 1.5a10 10 0 0 0 5 5L17 11l4 1.5V17a2 2 0 0 1-2 2A16 16 0 0 1 5 5a2 2 0 0 1 2-2z',
  cart: 'M3 4h2l2.5 10h10L20 7H6M9.5 19h.01M17 19h.01',
  film: 'M4 4h16v16H4zM4 9h16M4 15h16M9 4v16M15 4v16',
  utensils: 'M6 3v8a2 2 0 0 0 4 0V3M8 11v10M17 3c-1.5 1-2 2.5-2 4s.5 3 2 4M17 3v18',
  bag: 'M5 8h14l-1 12H6L5 8zM8.5 8V6a3.5 3.5 0 0 1 7 0v2',
  heart: 'M12 20s-7-4.5-7-9.5A3.9 3.9 0 0 1 12 7a3.9 3.9 0 0 1 7 3.5C19 15.5 12 20 12 20z',
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-3.9 3.6-6 8-6s8 2.1 8 6',
  wallet: 'M3 8h18v11H3zM3 8l2-4h12l2 4M16 13h2',
  trend: 'M4 17l5-6 4 3 6-8M15 6h5v5',
  chart: 'M5 20V10M12 20V5M19 20v-7',
  down: 'M12 5v13M6 13l6 6 6-6',
  tag: 'M4 8h16v12H4zM8 8V5h8v3',
  check: 'M5 12l5 5L19 7',
  alert: 'M12 4l9 16H3zM12 10v4',
};

const STEPS = [
  { name: 'Setup', headline: "Let's set up your monthly budget", sub: "A few quick steps: confirm your income, lock in fixed costs, set a savings goal, then split what's left. We'll flag anything that doesn't add up." },
  { name: 'Income', headline: "What's your monthly income?", sub: 'This is your income anchor — every other number is measured against it. Toggle off any deposit that isn\'t reliable income.' },
  { name: 'Fixed Expenses', headline: 'Lock in your fixed costs', sub: 'These recur every month. Adjust any amount — your remaining budget updates instantly.' },
  { name: 'Savings', headline: 'Pay yourself first', sub: 'Set aside savings before you divide up spending money. Drag to see how it changes what\'s left.' },
  { name: 'Allocate', headline: 'Divide up your spending money', sub: '' },
  { name: 'Review', headline: 'Review your budget', sub: "Here's the whole plan. We check that everything adds up before you activate it." },
  { name: 'Monitor', headline: 'Budget dashboard', sub: '' },
];

const CTA = ['Start budget setup', 'Continue to fixed expenses', 'Continue to savings', 'Continue to allocation', 'Review my budget', 'Activate this budget'];

const SPENT: Record<string, number> = { Groceries: 485, Transportation: 265, Entertainment: 225, 'Dining Out': 280, Shopping: 90, Healthcare: 60, 'Personal Care': 45 };
const TXNS: Record<string, number> = { Groceries: 18, Transportation: 9, Entertainment: 6, 'Dining Out': 14, Shopping: 4, Healthcare: 2, 'Personal Care': 3 };

const STATEMENT = [
  { date: 'Dec 22', name: "Trader Joe's", cat: 'Groceries', amount: '$64.20' },
  { date: 'Dec 21', name: 'Shell #4417', cat: 'Transportation', amount: '$38.90' },
  { date: 'Dec 20', name: 'Rialto Cinema', cat: 'Entertainment', amount: '$25.00' },
  { date: 'Dec 19', name: 'Nopalito', cat: 'Dining Out', amount: '$71.45' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function monthLabel(n: number) {
  const m = 8 + Math.round(n);
  return MONTHS[((m % 12) + 12) % 12] + ' ' + (2026 + Math.floor(m / 12));
}
const SUGGESTIONS = ['Emergency fund', 'Home', 'Travel'];
const SAVINGS_ACCOUNTS = [
  { name: 'Way2Save Savings', last4: '3300', balance: '$8,680.00' },
  { name: 'Platinum Savings', last4: '9120', balance: '$1,240.55' },
];

function fmt(n: number) {
  return (n < 0 ? '−$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US');
}
function pctStr(a: number, b: number) {
  return b <= 0 ? '0%' : Math.max(0, Math.min(100, Math.round((a / b) * 100))) + '%';
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Deposit { name: string; meta: string; amount: number; on: boolean; icon: string }
interface FixedItem { name: string; amount: number; icon: string }
interface CatItem { name: string; amount: number; last: number; icon: string }
interface Goal { id: string; name: string; account: number; target: number; saved: number; monthly: number; months: number; contribs: [string, number][] }
interface Draft { name: string; target: number; months: number; account: number }

// ---------------------------------------------------------------------------
// Small UI atoms
// ---------------------------------------------------------------------------
function Ic({ path, size = 17, stroke = '#57534E', sw = 1.6, style }: { path: string; size?: number; stroke?: string; sw?: number; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d={path} />
    </svg>
  );
}

function IconBox({ path, bg = '#EFEDE7', box = 34, size = 17, stroke = '#57534E', sw = 1.6 }: { path: string; bg?: string; box?: number; size?: number; stroke?: string; sw?: number }) {
  return (
    <div style={{ width: box, height: box, borderRadius: 9, flexShrink: 0, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Ic path={path} size={size} stroke={stroke} sw={sw} />
    </div>
  );
}

function Toggle({ on, onClick, w = 46, h = 27, thumb = 21 }: { on: boolean; onClick: () => void; w?: number; h?: number; thumb?: number }) {
  return (
    <div
      onClick={onClick}
      style={{ width: w, height: h, borderRadius: 999, flexShrink: 0, cursor: 'pointer', background: on ? '#0E7A42' : '#DAD5CB', padding: 3, display: 'flex', justifyContent: on ? 'flex-end' : 'flex-start', transition: 'background 180ms ease' }}
    >
      <div style={{ width: thumb, height: thumb, borderRadius: 999, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </div>
  );
}

function AccountRadio({ name, last4, balance, selected, onClick, balanceSize = 19, padding = '18px 20px' }: { name: string; last4: string; balance: string; selected: boolean; onClick: () => void; balanceSize?: number; padding?: string }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 14, padding, borderRadius: 12, cursor: 'pointer', border: `1.5px solid ${selected ? '#D71E28' : '#E7E5E4'}`, background: selected ? '#FDF2F2' : '#FFFFFF' }}>
      <div style={{ width: 20, height: 20, borderRadius: 999, flexShrink: 0, border: `1.5px solid ${selected ? '#D71E28' : '#DAD5CB'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 10, height: 10, borderRadius: 999, background: selected ? '#D71E28' : 'transparent' }} />
      </div>
      <div style={{ flexGrow: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700 }}>{name}</div>
        <div style={{ fontSize: 12.5, color: '#78716C', marginTop: 2 }}>Ending in {last4}</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A8A29E' }}>Available</div>
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: balanceSize, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 2 }}>{balance}</div>
      </div>
    </div>
  );
}

function Stepper({ value, onDown, onUp, size = 34 }: { value: ReactNode; onDown: () => void; onUp: () => void; size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 7 }}>
      <div style={{ flexGrow: 1, minWidth: 0, fontFamily: 'Poppins, sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.025em' }}>{value}</div>
      <div onClick={onDown} style={{ width: size, height: size, borderRadius: 8, border: '1px solid #E7E5E4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
        <Ic path="M6 12h12" size={14} stroke="#57534E" sw={2.2} />
      </div>
      <div onClick={onUp} style={{ width: size, height: size, borderRadius: 8, border: '1px solid #E7E5E4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
        <Ic path="M12 6v12M6 12h12" size={14} stroke="#57534E" sw={2.2} />
      </div>
    </div>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <div onClick={onClick} title="Remove" style={{ position: 'absolute', right: 7, top: 7, width: 18, height: 18, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0.3 }}>
      <Ic path="M6 6l12 12M18 6L6 18" size={10} stroke="#57534E" sw={2.6} />
    </div>
  );
}

export interface WFBudgetPrototypeProps {
  startStep?: number;
  onStep?: (step: number) => void;
}

export default function WFBudgetPrototype({ startStep, onStep }: WFBudgetPrototypeProps) {
  const [step, setStep] = useState(startStep != null ? startStep : 0);
  const [account, setAccount] = useState(0);
  const [cadence, setCadence] = useState<'Weekly' | 'Monthly' | 'Yearly'>('Monthly');
  const [deposits, setDeposits] = useState<Deposit[]>([
    { name: 'Payroll Deposit', meta: 'Bi-weekly · Last deposit Dec 15', amount: 2620, on: true, icon: I.wallet },
    { name: 'Payroll Deposit', meta: 'Bi-weekly · Last deposit Dec 1', amount: 2620, on: true, icon: I.wallet },
    { name: 'Freelance Payment', meta: 'Monthly · Last deposit Dec 10', amount: 850, on: false, icon: I.trend },
  ]);
  const [fixed, setFixed] = useState<FixedItem[]>([
    { name: 'Rent / Mortgage', amount: 1850, icon: I.home },
    { name: 'Car Payment', amount: 425, icon: I.car },
    { name: 'Insurance', amount: 180, icon: I.shield },
    { name: 'Utilities', amount: 145, icon: I.bolt },
    { name: 'Subscriptions', amount: 85, icon: I.dollar },
    { name: 'Phone Bill', amount: 75, icon: I.phone },
  ]);
  const [savings, setSavings] = useState(500);
  const [cats, setCats] = useState<CatItem[]>([
    { name: 'Groceries', amount: 520, last: 485, icon: I.cart },
    { name: 'Transportation', amount: 300, last: 265, icon: I.car },
    { name: 'Entertainment', amount: 200, last: 175, icon: I.film },
    { name: 'Dining Out', amount: 280, last: 310, icon: I.utensils },
    { name: 'Shopping', amount: 220, last: 240, icon: I.bag },
    { name: 'Healthcare', amount: 150, last: 110, icon: I.heart },
    { name: 'Personal Care', amount: 110, last: 75, icon: I.person },
  ]);
  const [monFilter, setMonFilter] = useState('All');
  const [sort, setSort] = useState<'budget used' | 'amount spent' | 'name'>('budget used');
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [statementOpen, setStatementOpen] = useState(false);
  const [alerts, setAlerts] = useState([true, true, false]);
  const [view, setView] = useState<'home' | 'flow' | 'goal' | 'standalone'>(startStep != null ? 'flow' : 'home');
  const [budgetSet, setBudgetSet] = useState(startStep != null);
  const [openGoal, setOpenGoal] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>({ name: '', target: 12000, months: 20, account: 0 });
  const [goals, setGoals] = useState<Goal[]>([
    { id: 'ef', name: 'Emergency fund', account: 0, target: 12000, saved: 2000, monthly: 350, months: 30, contribs: [['Dec 1', 350], ['Nov 1', 350], ['Oct 1', 350], ['Sep 1', 350]] },
    { id: 'home', name: 'Home down payment', account: 0, target: 15000, saved: 6680, monthly: 150, months: 13, contribs: [['Dec 1', 150], ['Nov 1', 150], ['Oct 1', 150], ['Sep 1', 250]] },
    { id: 'vac', name: 'Vacation fund', account: 1, target: 3000, saved: 3000, monthly: 0, months: 0, contribs: [['Dec 1', 250], ['Nov 1', 250], ['Oct 1', 250], ['Sep 1', 250]] },
  ]);
  const [focusKey, setFocusKey] = useState<string | null>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const lastFocused = useRef<HTMLInputElement | null>(null);

  function focusRef(key: string, i: number) {
    return (el: HTMLInputElement | null) => {
      if (!el) return;
      if (focusKey === key && focusIndex === i && lastFocused.current !== el) {
        lastFocused.current = el;
        el.focus();
        el.select();
      }
    };
  }

  const mult = cadence === 'Weekly' ? 1 / 4.345 : cadence === 'Yearly' ? 12 : 1;
  const d = (n: number) => n * mult;
  const raw = (n: number) => n / mult;
  const parse = (v: string) => {
    const n = parseFloat(String(v).replace(/[^0-9.]/g, ''));
    return isNaN(n) ? 0 : n;
  };
  const D = (n: number) => fmt(d(n));

  function goalPace(g: { target: number; saved: number; monthly: number; months: number }, rate?: number | null) {
    const remaining = Math.max(0, g.target - g.saved);
    const r = rate != null ? rate : g.monthly;
    const monthsAt = r > 0 ? Math.ceil(remaining / r) : null;
    const needed = g.months > 0 ? Math.ceil(remaining / g.months) : 0;
    return {
      remaining,
      rate: r,
      monthsAt,
      needed,
      complete: remaining <= 0,
      behind: monthsAt === null || monthsAt > g.months,
      gap: monthsAt === null ? null : monthsAt - g.months,
      completion: monthsAt === null ? '—' : monthLabel(monthsAt),
      targetLabel: monthLabel(g.months),
    };
  }

  function go(i: number) {
    const n = Math.max(0, Math.min(6, i));
    setStep(n);
    setView('flow');
    setOpenGoal(null);
    setBudgetSet((b) => b || n === 6);
    if (onStep) onStep(n);
  }

  function updateFixed(i: number, patch: Partial<FixedItem>) {
    setFixed((list) => {
      const next = list.slice();
      next[i] = { ...next[i], ...patch };
      return next;
    });
  }
  function updateCat(i: number, patch: Partial<CatItem>) {
    setCats((list) => {
      const next = list.slice();
      next[i] = { ...next[i], ...patch };
      return next;
    });
  }
  function addFixedRow() {
    const next = [...fixed, { name: '', amount: 0, icon: I.tag }];
    lastFocused.current = null;
    setFixed(next);
    setFocusKey('fixed');
    setFocusIndex(next.length - 1);
  }
  function addCatRow() {
    const next = [...cats, { name: '', amount: 0, last: 0, icon: I.tag }];
    lastFocused.current = null;
    setCats(next);
    setFocusKey('cats');
    setFocusIndex(next.length - 1);
  }
  function setGoalPatch(i: number, patch: Partial<Goal>) {
    setGoals((list) => {
      const next = list.slice();
      next[i] = { ...next[i], ...patch };
      return next;
    });
  }
  function setDraftPatch(patch: Partial<Draft>) {
    setDraft((dr) => ({ ...dr, ...patch }));
  }

  // -------------------------------------------------------------------------
  // Derived values (port of renderVals())
  // -------------------------------------------------------------------------
  const st = step;
  const isFlow = view === 'flow';
  const isHomeView = view === 'home';
  const onGoal = view === 'goal';
  const onStandalone = view === 'standalone';
  const gi = goals.findIndex((x) => x.id === openGoal);
  const og = gi > -1 ? goals[gi] : goals[0];
  const income = deposits.reduce((s, dp) => s + (dp.on ? dp.amount : 0), 0);
  const fixedT = fixed.reduce((s, f) => s + f.amount, 0);
  const leftAfterFixed = income - fixedT;
  const savingsVal = Math.max(0, Math.min(savings, leftAfterFixed));
  const available = leftAfterFixed - savingsVal;
  const allocated = cats.reduce((s, c) => s + c.amount, 0);
  const toAssign = available - allocated;
  const balances = toAssign >= 0;

  const next = () => {
    if (st === 5 && !balances) return;
    go(st + 1);
  };
  const prev = () => go(st - 1);

  const gDraft = draft;
  const dp = goalPace({ target: gDraft.target, saved: 0, monthly: savingsVal, months: gDraft.months }, onStandalone ? null : savingsVal);
  const op = goalPace(og);

  const monSpent = cats.reduce((s, c) => s + (SPENT[c.name] || 0), 0);
  const overCount = cats.filter((c) => (SPENT[c.name] || 0) > c.amount).length;

  let rows = cats.map((c) => {
    const spent = SPENT[c.name] || 0;
    const ratio = c.amount > 0 ? spent / c.amount : 1;
    const over = spent > c.amount;
    const near = !over && ratio >= 0.9;
    const color = over ? '#D71E28' : near ? '#C06A0A' : '#0E7A42';
    return {
      origName: c.name,
      name: c.name || 'Unnamed category',
      amount: c.amount,
      spentRaw: spent,
      ratio,
      icon: c.icon,
      status: over ? fmt(spent - c.amount) + ' over' : near ? 'Near limit' : 'On track',
      bucket: over ? 'Over' : near ? 'Near limit' : 'On track',
      pillColor: color,
      pillBg: over ? '#FDECEC' : near ? '#FDF1E7' : '#E9F0EB',
      iconBg: over ? '#FDECEC' : '#EFEDE7',
      iconColor: over ? '#D71E28' : '#57534E',
      cardBorder: over ? '#F3C9C9' : '#E7E5E4',
      spent: D(spent),
      planned: D(c.amount),
      spentColor: over ? '#D71E28' : '#292524',
      barColor: color,
      barPct: pctStr(spent, c.amount),
      remaining: D(c.amount - spent),
      remainColor: over ? '#D71E28' : '#0E7A42',
      txns: String(TXNS[c.name] || 0),
      pace: D(spent / 22) + '/day',
      open: openRow === c.name,
    };
  });
  if (monFilter !== 'All') rows = rows.filter((r) => r.bucket === monFilter);
  if (sort === 'budget used') rows = rows.slice().sort((a, b) => b.ratio - a.ratio);
  else if (sort === 'amount spent') rows = rows.slice().sort((a, b) => b.spentRaw - a.spentRaw);
  else rows = rows.slice().sort((a, b) => a.name.localeCompare(b.name));

  const stepList = STEPS.map((s, i) => ({
    num: String(i + 1),
    label: s.name,
    done: i < st,
    pending: i >= st,
    ring: i < st ? '#0E7A42' : i === st ? '#D71E28' : '#DAD5CB',
    dotBg: i < st ? '#0E7A42' : 'transparent',
    numColor: i === st ? '#D71E28' : '#A8A29E',
    color: i === st ? '#D71E28' : i < st ? '#292524' : '#A8A29E',
    weight: i === st ? 700 : i < st ? 500 : 400,
    line: i === 6 ? 'transparent' : i < st ? '#0E7A42' : '#E3DFD6',
  }));

  const eyebrow = isHomeView ? 'Overview' : onGoal ? 'Savings goal' : onStandalone ? 'My savings' : 'Step ' + (st + 1) + ' · ' + STEPS[st].name;
  const headline = isHomeView ? 'My Money Map' : onGoal ? og.name : onStandalone ? 'Create a savings plan' : STEPS[st].headline;
  const sub = isHomeView
    ? 'Summary of your selected accounts as of Dec 22, 2026.'
    : onGoal
    ? ''
    : onStandalone
    ? "Name it, set a target, pick where it lives. You can change any of this later."
    : st === 4
    ? 'Spread ' + D(available) + ' across your categories. The meter shows what\'s still unassigned.'
    : STEPS[st].sub;
  const hasSub = isHomeView || onStandalone || (isFlow && st !== 6);
  const progressPct = Math.round(((st + 1) / 7) * 100) + '%';

  const isSetup = isFlow && st === 0;
  const isIncome = isFlow && st === 1;
  const isFixed = isFlow && st === 2;
  const isSavings = isFlow && st === 3;
  const isAllocate = isFlow && st === 4;
  const isReview = isFlow && st === 5;
  const isMonitor = isFlow && st === 6;
  const isGoalView = onGoal;
  const isStandalone = onStandalone;
  const showProgress = isFlow;
  const noBudget = !budgetSet;
  const showGoalBlock = (isFlow && st === 3) || onStandalone;
  const showChangeName = isFlow && st === 3;
  const showDerived = (isFlow && st === 3) || onStandalone;
  const showFooterNav = isFlow && st > 0 && st < 6;
  const showBackLink = !isFlow && !isHomeView;

  const fIncome = D(income);
  const fFixed = D(fixedT);
  const fFixedNeg = '−' + D(fixedT);
  const fSavings = D(savingsVal);
  const fSavingsNeg = '−' + D(savingsVal);
  const fLeftAfterFixed = D(leftAfterFixed);
  const fAvailable = D(available);
  const fAllocated = D(allocated);
  const fToAssign = D(toAssign);
  const fToAssignAbs = D(Math.abs(toAssign));
  const allocPct = pctStr(allocated, available);
  const allocColor = balances ? '#0E7A42' : '#D71E28';
  const assignLabel = balances ? 'Still to assign' : 'Over budget by';
  const assignColor = balances ? '#292524' : '#D71E28';
  const leftColor = leftAfterFixed < 0 ? '#D71E28' : '#0E7A42';
  const fixedSharePct = pctStr(fixedT, income);
  const fixedShareColor = fixedT / Math.max(income, 1) > 0.6 ? '#D71E28' : '#57534E';
  const savingsSharePct = pctStr(savingsVal, leftAfterFixed);
  const savingsIncomePct = pctStr(savingsVal, income);
  const savingsMax = String(Math.max(10, leftAfterFixed));
  const splitFixed = pctStr(fixedT, income);
  const splitSavings = pctStr(savingsVal, income);
  const cadenceLabel = cadence;
  const cadenceLower = cadence.toLowerCase();

  const accountsList = [
    { name: 'Everyday Checking', last4: '4892', balance: '$8,450.32' },
    { name: 'Premier Checking', last4: '7231', balance: '$12,890.15' },
  ];

  const balanceBg = balances ? '#E3EDE6' : '#FDECEC';
  const balanceBorder = balances ? '#CADCD0' : '#F3C9C9';
  const balanceIconBg = balances ? '#0E7A42' : '#D71E28';
  const balanceIcon = balances ? I.check : I.alert;
  const balanceColor = balances ? '#0B5030' : '#8E1B1B';
  const balanceSubColor = balances ? '#3C8A5C' : '#B14343';
  const balanceTitle = balances ? 'Your budget balances' : "Your budget doesn't balance";
  const balanceSub = balances ? D(toAssign) + ' is still unassigned — everything adds up.' : "You've allocated " + D(Math.abs(toAssign)) + ' more than you have to spend. Adjust a category to continue.';

  const reviewCards = [
    { label: cadence + ' income', value: D(income), color: '#292524' },
    { label: 'Fixed costs', value: D(fixedT), color: '#292524' },
    { label: 'Savings', value: D(savingsVal), color: '#0E7A42' },
    { label: 'Spending budget', value: D(allocated), color: balances ? '#292524' : '#D71E28' },
  ];
  const reviewRows = cats.map((c, i) => ({ name: c.name || 'Unnamed category', icon: c.icon, amount: D(c.amount), divider: i === 0 ? 'transparent' : '#F0EEE9' }));

  const fMonAvailable = D(allocated - monSpent);
  const spentLine = D(monSpent) + ' spent of ' + D(allocated) + ' planned this month';
  const usagePct = pctStr(monSpent, allocated);
  const hasOver = overCount > 0;
  const overLabel = overCount + (overCount === 1 ? ' category over' : ' categories over');
  const monStats = [
    { label: 'Income', value: D(income), icon: I.wallet },
    { label: 'Fixed + saved', value: D(fixedT + savingsVal), icon: I.chart },
    { label: 'Spent so far', value: D(monSpent), icon: I.down },
  ];
  const monFilters = ['All', 'Over', 'Near limit', 'On track'];

  const homeSpent = fmt(monSpent);
  const homeTrendRaw: [string, number, boolean][] = [
    ['Jun', 1180, false], ['Jul', 1620, true], ['Aug', 1340, false], ['Sep', 1290, false], ['Oct', 1710, true], ['Nov', 1405, false], ['Dec', monSpent, false],
  ];
  const homeTrend = homeTrendRaw.map((t) => ({
    label: t[0],
    h: Math.max(4, Math.round((t[1] / 1800) * 84)) + 'px',
    color: t[0] === 'Dec' ? '#8C1D2C' : t[2] ? '#FCCC44' : '#0E7A42',
  }));
  const homeOutTotal = fmt(4215);
  const homeOut = [
    { label: 'Fixed costs', value: fmt(2760), color: '#8C1D2C' },
    { label: 'Groceries', value: fmt(485), color: '#D71E28' },
    { label: 'Dining out', value: fmt(280), color: '#F0801A' },
    { label: 'Everything else', value: fmt(690), color: '#FCCC44' },
  ];
  const budgetWatchLine = overCount > 0 ? overCount + (overCount === 1 ? ' category needs' : ' categories need') + ' attention this month.' : 'Nothing over budget this month.';
  const homeBudget = cats
    .map((c) => {
      const spent = SPENT[c.name] || 0;
      return { c, spent, ratio: spent / Math.max(c.amount, 1) };
    })
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 3)
    .map((r) => ({
      name: r.c.name,
      figure: fmt(r.spent) + ' of ' + fmt(r.c.amount),
      pct: pctStr(r.spent, r.c.amount),
      color: r.spent > r.c.amount ? '#D71E28' : r.ratio >= 0.9 ? '#C06A0A' : '#0E7A42',
    }));
  const homeGoals = goals.map((g) => {
    const p = goalPace(g);
    return {
      id: g.id,
      name: g.name,
      short: p.complete ? 'Reached' : p.behind ? 'Behind' : 'On pace',
      pillColor: p.complete ? '#0E7A42' : p.behind ? '#C06A0A' : '#0E7A42',
      barColor: p.complete ? '#0E7A42' : p.behind ? '#C06A0A' : '#0E7A42',
      barPct: pctStr(g.saved, g.target),
    };
  });
  const homeResources = ['Take the tour', 'Frequently asked questions', 'Download history as Excel', 'Savings & retirement strategies', 'Smarter credit centre', 'Financial education centre'];
  const goalsSaved = fmt(goals.reduce((s, g) => s + g.saved, 0));
  const goalsTarget = fmt(goals.reduce((s, g) => s + g.target, 0));
  const goalsMonthly = fmt(goals.reduce((s, g) => s + g.monthly, 0));

  const goalRows = goals.map((g) => {
    const p = goalPace(g);
    return {
      id: g.id,
      name: g.name,
      account: SAVINGS_ACCOUNTS[g.account].name + ' ···' + SAVINGS_ACCOUNTS[g.account].last4,
      figure: fmt(g.saved) + ' of ' + fmt(g.target),
      barPct: pctStr(g.saved, g.target),
      barColor: p.complete ? '#0E7A42' : p.behind ? '#C06A0A' : '#0E7A42',
      status: p.complete ? 'Goal reached' : p.behind ? 'Behind — needs ' + fmt(p.needed) + '/mo' : 'On pace',
      pillColor: p.complete ? '#0E7A42' : p.behind ? '#C06A0A' : '#0E7A42',
      pillBg: p.complete ? '#E3EDE6' : p.behind ? '#FDF1E7' : '#E9F0EB',
      iconBg: p.complete ? '#E3EDE6' : '#EFEDE7',
      icon: p.complete ? I.check : I.chart,
      dateLine: p.complete ? 'Completed · ready to use' : 'Target ' + p.targetLabel + ' · ' + fmt(g.monthly) + '/mo',
    };
  });

  const gAccounts = SAVINGS_ACCOUNTS.map((a, i) => ({ ...a, selected: gDraft.account === i }));

  const derivedText = onStandalone
    ? 'You have ' + D(available) + ' left after fixed costs. Saving ' + fmt(dp.needed) + ' a month gets you there by ' + dp.targetLabel + '.'
    : dp.rate <= 0
    ? "Set an amount above and we'll tell you when you reach " + fmt(gDraft.target) + '.'
    : 'At ' + D(savingsVal) + ' a month you reach ' + fmt(gDraft.target) + ' in ' + dp.completion + (dp.gap != null && dp.gap > 0 ? ' — ' + dp.gap + (dp.gap === 1 ? ' month' : ' months') + ' later than your target.' : ' — on track for your ' + dp.targetLabel + ' target.');
  const derivedShort = dp.gap != null && dp.gap > 0 && !onStandalone;
  const shortfallLabel = 'Save ' + fmt(dp.needed) + ' a month to hit it';
  const derivedBg = onStandalone ? '#F5F3EE' : dp.gap != null && dp.gap > 0 ? '#FDF6EE' : '#E9F0EB';
  const derivedBorder = onStandalone ? '#E7E5E4' : dp.gap != null && dp.gap > 0 ? '#EFD9BC' : '#CADCD0';
  const derivedColor = onStandalone ? '#57534E' : dp.gap != null && dp.gap > 0 ? '#8A4E08' : '#0B5030';
  const derivedIconBg = onStandalone ? '#DAD5CB' : dp.gap != null && dp.gap > 0 ? '#C06A0A' : '#0E7A42';
  const derivedIcon = onStandalone ? I.chart : dp.gap != null && dp.gap > 0 ? I.alert : I.check;

  const dAccount = SAVINGS_ACCOUNTS[og.account].name + ' ···' + SAVINGS_ACCOUNTS[og.account].last4;
  const dSaved = fmt(og.saved);
  const dTarget = 'of ' + fmt(og.target);
  const dBarPct = pctStr(og.saved, og.target);
  const dBarColor = op.complete ? '#0E7A42' : op.behind ? '#C06A0A' : '#0E7A42';
  const dPct = pctStr(og.saved, og.target);
  const dComplete = op.complete;
  const dOngoing = !op.complete;
  const dPaceBg = op.complete ? '#E3EDE6' : op.behind ? '#FDF6EE' : '#E9F0EB';
  const dPaceBorder = op.complete ? '#CADCD0' : op.behind ? '#EFD9BC' : '#CADCD0';
  const dPaceColor = op.complete ? '#0B5030' : op.behind ? '#8A4E08' : '#0B5030';
  const dPaceIconBg = op.complete ? '#0E7A42' : op.behind ? '#C06A0A' : '#0E7A42';
  const dPaceIcon = op.complete ? I.check : op.behind ? I.alert : I.check;
  const dPaceTitle = op.complete ? 'You reached your goal' : op.behind ? 'Behind your target date' : 'On pace';
  const dPaceText = op.complete
    ? fmt(og.target) + ' is ready in ' + SAVINGS_ACCOUNTS[og.account].name + '. Use it, or roll it into a new goal.'
    : op.behind
    ? 'At ' + fmt(og.monthly) + ' a month you reach ' + fmt(og.target) + ' in ' + op.completion + ', after your ' + op.targetLabel + ' target. Raise it to ' + fmt(op.needed) + ' a month to stay on time.'
    : 'At ' + fmt(og.monthly) + ' a month you reach ' + fmt(og.target) + ' in ' + op.completion + ', ahead of your ' + op.targetLabel + ' target.';
  const dTargetMark = pctStr(Math.min(og.months, 60), 60);
  const dContribs = og.contribs.map((c, i) => ({ date: c[0] + ', 2026', amount: fmt(c[1]), divider: i === 0 ? 'transparent' : '#F0EEE9' }));
  const dSummary = [
    { label: 'Monthly contribution', value: fmt(og.monthly) },
    { label: 'Months remaining', value: op.complete ? '0' : String(op.monthsAt == null ? '—' : op.monthsAt) },
    { label: 'Projected completion', value: op.complete ? 'Complete' : op.completion },
  ];
  const dPauseLabel = og.monthly > 0 ? 'Pause contributions' : 'Resume contributions';

  const ctaLabel = CTA[st] || '';
  const ctaBg = st === 5 ? (balances ? '#0E7A42' : '#A8A29E') : '#D71E28';
  const ctaOpacity = st === 5 && !balances ? 0.6 : 1;

  const openStandalone = () => {
    setView('standalone');
    setDraft({ name: '', target: 12000, months: 20, account: 0 });
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  const label12 = { fontSize: 10.5, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase' as const, color: '#A8A29E' };

  return (
    <div className="wfp" style={{ width: 1084, display: 'flex', flexDirection: 'column', background: '#F1EFEA', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#292524' }}>
      <style>{`
        .wfp input[type="text"] { font-family: Poppins, sans-serif; border: none; background: transparent; padding: 0; outline: none; color: #292524; }
        .wfp input[type="text"]::placeholder { color: #C5C0B8; }
        .wfp input[type="text"]:focus::placeholder { color: #DDD9D2; }
        .wfp input[type="range"] { -webkit-appearance: none; appearance: none; height: 4px; border-radius: 999px; background: #E7E5E4; outline: none; }
        .wfp input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 999px; background: #0E7A42; border: 2px solid #fff; box-shadow: 0 0 0 1px #0E7A42; cursor: grab; }
        .wfp input[type="range"]::-moz-range-thumb { width: 14px; height: 14px; border-radius: 999px; background: #0E7A42; border: 2px solid #fff; cursor: grab; }
      `}</style>

      {/* Masthead */}
      <div style={{ background: '#D71E28', borderBottom: '4px solid #FFCD41' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '13px 26px' }}>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 19, fontWeight: 700, letterSpacing: '0.02em', color: '#FFFFFF' }}>WELLS FARGO</div>
          <span style={{ flexGrow: 1 }} />
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.35)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 26, height: 26, borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="9" r="3.4" /><path d="M5.5 20c0-3.3 2.9-5.2 6.5-5.2s6.5 1.9 6.5 5.2" /></svg>
            </div>
            <span style={{ fontSize: 13.5, color: '#FFFFFF' }}>Welcome, Rosita</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 34, padding: '0 26px 11px 26px' }}>
          {['Accounts', 'Brokerage', 'Transfer & Pay', 'Plan & Learn', 'Security & Support'].map((label) => (
            <span key={label} style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.9)' }}>{label}</span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {/* Sidebar */}
        <div style={{ width: 270, flexShrink: 0, background: '#FFFFFF', borderRight: '1px solid #E7E5E4', padding: '22px 20px 20px 20px', display: 'flex', flexDirection: 'column' }}>
          <div onClick={() => { setView('home'); setOpenGoal(null); }} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <div style={{ width: 42, height: 42, borderRadius: 999, flexShrink: 0, background: '#0E7A42', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.02em' }}>RA</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', color: '#292524' }}>Rosita Alvarez</div>
              <div style={{ fontSize: 11.5, color: '#78716C', marginTop: 1 }}>Everyday Checking ···4892</div>
            </div>
          </div>

          {showProgress && (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 30 }}>
                <span style={label12}>Setup progress</span>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: '#292524' }}>{st + 1} of 7</span>
              </div>
              <div style={{ height: 3, background: '#EDE9E1', marginTop: 8, overflow: 'hidden' }}>
                <div style={{ height: 3, background: '#D71E28', width: progressPct, transition: 'width 220ms ease' }} />
              </div>

              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', marginTop: 20 }}>
                {stepList.map((s, i) => (
                  <div key={s.label} onClick={() => go(i)} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, height: 42, cursor: 'pointer' }}>
                    <div style={{ position: 'absolute', left: 11, top: 32, width: 1, height: 20, background: s.line }} />
                    <div style={{ width: 23, height: 23, borderRadius: 999, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${s.ring}`, background: s.dotBg, color: s.numColor, fontSize: 11, fontWeight: 600 }}>
                      {s.done ? <Ic path={I.check} size={12} stroke="#FFFFFF" sw={3} /> : s.num}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: s.weight, color: s.color }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {isHomeView && (
            <div style={{ marginTop: 28 }}>
              <div style={label12}>Accounts in this report</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 9 }}>EVERYDAY CHECKING ···4892</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 5 }}>WAY2SAVE SAVINGS ···3300</div>
              <div style={{ fontSize: 12.5, color: '#57534E', marginTop: 10, textDecoration: 'underline', textUnderlineOffset: '3px', cursor: 'pointer' }}>Edit accounts</div>
            </div>
          )}

          <div style={{ flexGrow: 1, minHeight: 28 }} />

          <div style={{ background: '#F5F3EE', border: '1px solid #EDE9E1', borderRadius: 12, padding: 16 }}>
            <div style={label12}>This month</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}><span style={{ fontSize: 13, color: '#57534E' }}>Income</span><span style={{ fontSize: 13, fontWeight: 700 }}>{fIncome}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}><span style={{ fontSize: 13, color: '#57534E' }}>Fixed costs</span><span style={{ fontSize: 13, fontWeight: 700 }}>{fFixedNeg}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}><span style={{ fontSize: 13, color: '#57534E' }}>Savings</span><span style={{ fontSize: 13, fontWeight: 700 }}>{fSavingsNeg}</span></div>
            <div style={{ height: 1, background: '#E3DFD6', margin: '12px 0' }} />
            <div style={label12}>To spend</div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 26, fontWeight: 700, color: '#0E7A42', letterSpacing: '-0.02em', marginTop: 4 }}>{fAvailable}</div>
            <div style={{ height: 5, background: '#E3DFD6', borderRadius: 999, marginTop: 10, overflow: 'hidden' }}>
              <div style={{ height: 5, borderRadius: 999, background: '#0E7A42', width: allocPct }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7 }}><span style={{ fontSize: 11, color: '#A8A29E' }}>{fAllocated} allocated</span><span style={{ fontSize: 11, color: '#A8A29E' }}>{fToAssign} left</span></div>
          </div>
        </div>

        {/* Main */}
        <div style={{ flexGrow: 1, minWidth: 0, padding: '34px 36px 40px 36px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#D71E28' }}>{eyebrow}</div>
              <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 35, fontWeight: 400, letterSpacing: '-0.015em', lineHeight: 1.14, margin: '12px 0 0 0' }}>{headline}</h1>
            </div>
            {isMonitor && (
              <div style={{ textAlign: 'right', flexShrink: 0, paddingTop: 30 }}>
                <div style={{ fontSize: 13, color: '#78716C' }}>December 2024</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#292524' }}>8 days left</div>
              </div>
            )}
          </div>
          {hasSub && <p style={{ fontSize: 15.5, lineHeight: 1.55, color: '#78716C', margin: '12px 0 0 0', maxWidth: 545 }}>{sub}</p>}

          {isSetup && (
            <div style={{ marginTop: 30 }}>
              <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '22px 24px' }}>
                <div style={{ fontSize: 14.5, fontWeight: 700 }}>What are you saving for?</div>
                <div style={{ fontSize: 13, color: '#78716C', marginTop: 3 }}>Name it now and the rest of the budget works toward it. You can change this later.</div>
                <input type="text" placeholder="Name this goal" value={gDraft.name} onChange={(e) => setDraftPatch({ name: e.target.value })} style={{ fontFamily: 'Poppins, sans-serif', fontSize: 21, fontWeight: 700, letterSpacing: '-0.02em', width: '100%', marginTop: 12, paddingBottom: 10, borderBottom: '1px solid #E7E5E4' }} />
                <div style={{ display: 'flex', gap: 8, marginTop: 13 }}>
                  {SUGGESTIONS.map((s) => {
                    const active = gDraft.name === s;
                    return (
                      <div key={s} onClick={() => setDraftPatch({ name: s })} style={{ padding: '8px 15px', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontWeight: 700, color: active ? '#FFFFFF' : '#57534E', background: active ? '#292524' : '#FFFFFF', border: `1px solid ${active ? '#292524' : '#E7E5E4'}` }}>{s}</div>
                    );
                  })}
                </div>
              </div>

              <div style={{ fontSize: 14, fontWeight: 500, color: '#57534E', marginTop: 26 }}>Which account are we budgeting?</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                {accountsList.map((a, i) => (
                  <AccountRadio key={a.name} name={a.name} last4={a.last4} balance={a.balance} selected={account === i} onClick={() => setAccount(i)} />
                ))}
              </div>

              <div style={{ fontSize: 14, fontWeight: 500, color: '#57534E', marginTop: 26 }}>Budget cadence</div>
              <div style={{ display: 'inline-flex', gap: 0, background: '#EDE9E1', borderRadius: 11, padding: 4, marginTop: 12 }}>
                {(['Weekly', 'Monthly', 'Yearly'] as const).map((c) => {
                  const active = cadence === c;
                  return (
                    <div key={c} onClick={() => setCadence(c)} style={{ minWidth: 100, textAlign: 'center', padding: '11px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: active ? 700 : 500, color: active ? '#D71E28' : '#78716C', background: active ? '#FFFFFF' : 'transparent', boxShadow: active ? '0 1px 3px rgba(0,0,0,0.10)' : 'none' }}>{c}</div>
                  );
                })}
              </div>

              <div onClick={next} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 26, padding: 19, borderRadius: 11, background: '#D71E28', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                Start budget setup
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
              </div>
            </div>
          )}

          {isIncome && (
            <div style={{ marginTop: 26 }}>
              <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={label12}>{cadenceLabel} income anchor</div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 42, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginTop: 4 }}>{fIncome}</div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                  <div onClick={() => setDeposits((list) => { const n = list.slice(); n[2] = { ...n[2], on: false }; return n; })} style={{ width: 44, height: 44, borderRadius: 9, border: '1px solid #E7E5E4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Ic path="M6 12h12" size={16} stroke="#57534E" sw={2} />
                  </div>
                  <div onClick={() => setDeposits((list) => { const n = list.slice(); n[2] = { ...n[2], on: true }; return n; })} style={{ width: 44, height: 44, borderRadius: 9, border: '1px solid #E7E5E4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Ic path="M12 6v12M6 12h12" size={16} stroke="#57534E" sw={2} />
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: 24 }}>Detected recurring deposits</div>
              <div style={{ fontSize: 13, color: '#78716C', marginTop: 3 }}>Found in your account. Toggling these updates your anchor above.</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 14 }}>
                {deposits.map((dep, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 18px', background: dep.on ? '#FFFFFF' : '#FAF9F6', border: '1px solid #E7E5E4', borderRadius: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: '#EFEDE7', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: dep.on ? 1 : 0.45 }}>
                      <Ic path={dep.icon} size={17} />
                    </div>
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: dep.on ? '#292524' : '#A8A29E' }}>{dep.name}</div>
                      <div style={{ fontSize: 12.5, color: '#A8A29E', marginTop: 2 }}>{dep.meta}</div>
                    </div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700, flexShrink: 0, color: dep.on ? '#292524' : '#C5C0B8' }}>{D(dep.amount)}</div>
                    <Toggle on={dep.on} onClick={() => updateDeposit(i, { on: !dep.on })} />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#E3EDE6', borderRadius: 12, padding: '22px 24px', marginTop: 18 }}>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ ...label12, color: '#3C8A5C' }}>Confirmed {cadenceLower} income</div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 34, fontWeight: 700, letterSpacing: '-0.03em', color: '#0E7A42', marginTop: 3 }}>{fIncome}</div>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: 999, background: '#0E7A42', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Ic path={I.check} size={19} stroke="#fff" sw={2.6} />
                </div>
              </div>
            </div>
          )}

          {isFixed && (
            <div style={{ marginTop: 26 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {fixed.map((f, i) => (
                  <div key={i} style={{ position: 'relative', background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: 13 }}>
                    <IconBox path={f.icon} />
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <input type="text" ref={focusRef('fixed', i)} placeholder="Name this cost" value={f.name} onChange={(e) => updateFixed(i, { name: e.target.value })} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: '#57534E', width: '100%' }} />
                      <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 2 }}>
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>$</span>
                        <input type="text" value={String(Math.round(d(f.amount)))} onChange={(e) => updateFixed(i, { amount: raw(parse(e.target.value)) })} style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', width: '100%' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                      <div onClick={() => updateFixed(i, { amount: f.amount + 25 })} style={{ width: 27, height: 27, borderRadius: 7, border: '1px solid #E7E5E4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Ic path="M12 6v12M6 12h12" size={13} stroke="#57534E" sw={2.2} />
                      </div>
                      <div onClick={() => updateFixed(i, { amount: Math.max(0, f.amount - 25) })} style={{ width: 27, height: 27, borderRadius: 7, border: '1px solid #E7E5E4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Ic path="M6 12h12" size={13} stroke="#57534E" sw={2.2} />
                      </div>
                    </div>
                    <RemoveBtn onClick={() => setFixed(fixed.filter((_, j) => j !== i))} />
                  </div>
                ))}
                <div onClick={addFixedRow} style={{ border: '1.5px dashed #DAD5CB', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, cursor: 'pointer', color: '#78716C', fontSize: 14, fontWeight: 500, minHeight: 78 }}>
                  <Ic path="M12 5v14M5 12h14" size={15} stroke="currentColor" sw={2} />Add a fixed cost
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '20px 24px', marginTop: 18 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
                  <span style={label12}>Fixed costs claim this much of your income</span>
                  <span style={{ fontSize: 15, fontWeight: 700, flexShrink: 0 }}>{fixedSharePct}</span>
                </div>
                <div style={{ height: 9, background: '#EDE9E1', borderRadius: 999, marginTop: 12, overflow: 'hidden' }}>
                  <div style={{ height: 9, borderRadius: 999, background: fixedShareColor, width: fixedSharePct, transition: 'width 200ms ease' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 16 }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#78716C' }}>Total fixed</div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 27, fontWeight: 700, letterSpacing: '-0.025em', marginTop: 2 }}>{fFixed}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, color: '#78716C' }}>Left for savings &amp; spending</div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 27, fontWeight: 700, letterSpacing: '-0.025em', color: leftColor, marginTop: 2 }}>{fLeftAfterFixed}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isHomeView && (
            <div style={{ marginTop: 26 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>My spending</div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>{homeSpent}</div>
                      <div style={{ fontSize: 11, color: '#A8A29E' }}>Dec to date</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 84, marginTop: 18 }}>
                    {homeTrend.map((t, i) => (
                      <div key={i} style={{ flex: '1 1 0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <div style={{ width: '100%', height: t.h, borderRadius: '3px 3px 0 0', background: t.color }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 7 }}>
                    {homeTrend.map((t, i) => (
                      <div key={i} style={{ flex: '1 1 0', textAlign: 'center', fontSize: 10.5, color: '#A8A29E' }}>{t.label}</div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: '#0E7A42' }} /><span style={{ fontSize: 11, color: '#78716C' }}>At or below average</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: '#FCCC44' }} /><span style={{ fontSize: 11, color: '#78716C' }}>Over average</span></div>
                  </div>
                </div>

                <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '20px 22px' }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Money out, 12-month average</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 16 }}>
                    <div style={{ position: 'relative', width: 108, height: 108, flexShrink: 0, borderRadius: 999, background: 'conic-gradient(#8C1D2C 0 65.5%, #D71E28 65.5% 77%, #F0801A 77% 83.6%, #FCCC44 83.6% 100%)' }}>
                      <div style={{ position: 'absolute', left: 22, top: 22, width: 64, height: 64, borderRadius: 999, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontSize: 10, color: '#A8A29E' }}>Total</div>
                        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em' }}>{homeOutTotal}</div>
                      </div>
                    </div>
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      {homeOut.map((o) => (
                        <div key={o.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                          <span style={{ width: 8, height: 8, borderRadius: 999, flexShrink: 0, background: o.color }} />
                          <span style={{ flexGrow: 1, minWidth: 0, fontSize: 12.5, color: '#57534E' }}>{o.label}</span>
                          <span style={{ fontSize: 12.5, fontWeight: 700, flexShrink: 0 }}>{o.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>My budget</div>
                    {budgetSet && <div onClick={() => go(6)} style={{ fontSize: 12.5, fontWeight: 700, color: '#D71E28', cursor: 'pointer', flexShrink: 0 }}>View all →</div>}
                  </div>

                  {noBudget && (
                    <>
                      <div style={{ fontSize: 13.5, lineHeight: 1.6, color: '#78716C', marginTop: 10 }}>You haven't set a budget yet. We'll pre-fill it from your last 12 months of spending — you can change any number.</div>
                      <div onClick={() => go(0)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: 15, borderRadius: 11, background: '#D71E28', color: '#fff', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', marginTop: 16 }}>
                        Start a budget
                        <Ic path="M4 12h15M13 6l6 6-6 6" size={16} stroke="#fff" sw={2} />
                      </div>
                    </>
                  )}

                  {budgetSet && (
                    <>
                      <div style={{ fontSize: 12.5, color: '#78716C', marginTop: 8 }}>{budgetWatchLine}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 14 }}>
                        {homeBudget.map((b) => (
                          <div key={b.name}>
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                              <span style={{ fontSize: 12.5, color: '#57534E' }}>{b.name}</span>
                              <span style={{ fontSize: 12.5, fontWeight: 700, color: b.color, flexShrink: 0 }}>{b.figure}</span>
                            </div>
                            <div style={{ height: 5, background: '#EDE9E1', borderRadius: 999, marginTop: 6, overflow: 'hidden' }}>
                              <div style={{ height: 5, borderRadius: 999, background: b.color, width: b.pct }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>My savings plan</div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#0E7A42' }}>{goalsSaved}</div>
                      <div style={{ fontSize: 11, color: '#A8A29E' }}>of {goalsTarget}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                    {homeGoals.map((g) => (
                      <div key={g.id} onClick={() => { setView('goal'); setOpenGoal(g.id); }} style={{ cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                          <span style={{ fontSize: 12.5, fontWeight: 700 }}>{g.name}</span>
                          <span style={{ fontSize: 12, color: g.pillColor, fontWeight: 700, flexShrink: 0 }}>{g.short}</span>
                        </div>
                        <div style={{ height: 5, background: '#EDE9E1', borderRadius: 999, marginTop: 6, overflow: 'hidden' }}>
                          <div style={{ height: 5, borderRadius: 999, background: g.barColor, width: g.barPct }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div onClick={openStandalone} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, fontSize: 13, fontWeight: 700, color: '#D71E28', cursor: 'pointer' }}>
                    Create a savings plan
                    <Ic path="M4 12h15M13 6l6 6-6 6" size={14} stroke="currentColor" sw={2} />
                  </div>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '20px 22px', marginTop: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>Resource library</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px 24px', marginTop: 14 }}>
                  {homeResources.map((r) => (
                    <div key={r} style={{ fontSize: 13, color: '#57534E', textDecoration: 'underline', textUnderlineOffset: '3px', cursor: 'pointer' }}>{r}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showBackLink && (
            <div onClick={() => { setView('flow'); setStep(6); setOpenGoal(null); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, fontSize: 13.5, fontWeight: 700, color: '#57534E', cursor: 'pointer' }}>
              <Ic path="M20 12H5M11 6l-6 6 6 6" size={15} stroke="currentColor" sw={2} />Back to dashboard
            </div>
          )}

          {showGoalBlock && (
            <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '22px 24px', marginTop: 26 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={label12}>Saving for</div>
                  <input type="text" placeholder="Name this goal" value={gDraft.name} onChange={(e) => setDraftPatch({ name: e.target.value })} style={{ fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', width: '100%', marginTop: 3 }} />
                </div>
                {showChangeName && (
                  <div onClick={() => go(0)} style={{ flexShrink: 0, fontSize: 13, fontWeight: 700, color: '#57534E', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px', paddingTop: 18 }}>Change</div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 22 }}>
                <div>
                  <div style={label12}>Target amount</div>
                  <Stepper value={fmt(gDraft.target)} onDown={() => setDraftPatch({ target: Math.max(500, gDraft.target - 500) })} onUp={() => setDraftPatch({ target: gDraft.target + 500 })} />
                </div>
                <div>
                  <div style={label12}>Target date</div>
                  <Stepper value={monthLabel(gDraft.months)} onDown={() => setDraftPatch({ months: Math.max(1, gDraft.months - 1) })} onUp={() => setDraftPatch({ months: gDraft.months + 1 })} />
                </div>
              </div>

              <div style={{ ...label12, marginTop: 22 }}>Where should it go?</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
                {gAccounts.map((a, i) => (
                  <AccountRadio key={a.name} name={a.name} last4={a.last4} balance={a.balance} selected={a.selected} onClick={() => setDraftPatch({ account: i })} balanceSize={17} padding="15px 18px" />
                ))}
              </div>
            </div>
          )}

          {isSavings && (
            <div style={{ marginTop: 16 }}>
              <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '22px 24px' }}>
                <div style={label12}>{cadenceLabel} savings</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 4 }}>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em' }}>{fSavings}</div>
                  <div style={{ padding: '6px 13px', borderRadius: 999, background: '#E3EDE6', color: '#0E7A42', fontSize: 13, fontWeight: 700 }}>{savingsSharePct} of take-home</div>
                </div>
                <input type="range" min={0} max={Number(savingsMax)} step={10} value={savingsVal} onChange={(e) => setSavings(parse(e.target.value))} style={{ width: '100%', marginTop: 22, display: 'block' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                  <span style={{ fontSize: 12.5, color: '#A8A29E' }}>$0</span>
                  <span style={{ fontSize: 12.5, color: '#A8A29E' }}>{fLeftAfterFixed}</span>
                </div>
              </div>
            </div>
          )}

          {showDerived && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 15, borderRadius: 12, padding: '18px 20px', marginTop: 16, background: derivedBg, border: `1px solid ${derivedBorder}` }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: derivedIconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ic path={derivedIcon} size={17} stroke="#fff" sw={2.2} />
              </div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, lineHeight: 1.55, color: derivedColor }}>{derivedText}</div>
                {derivedShort && (
                  <div onClick={() => setSavings(dp.needed)} style={{ display: 'inline-block', marginTop: 10, padding: '9px 15px', borderRadius: 9, background: '#fff', border: `1px solid ${derivedBorder}`, fontSize: 13, fontWeight: 700, color: derivedColor, cursor: 'pointer' }}>{shortfallLabel}</div>
                )}
              </div>
            </div>
          )}

          {isStandalone && (
            <div style={{ display: 'flex', gap: 14, marginTop: 20 }}>
              <div onClick={() => { setView('flow'); setStep(6); setOpenGoal(null); }} style={{ padding: '19px 30px', borderRadius: 11, background: '#fff', border: '1px solid #E7E5E4', fontSize: 15, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Cancel</div>
              <div
                onClick={() => {
                  const g: Goal = { id: 'g' + Date.now(), name: gDraft.name || 'Untitled goal', account: gDraft.account, target: gDraft.target, saved: 0, monthly: dp.needed, months: gDraft.months, contribs: [] };
                  setGoals((list) => list.concat([g]));
                  setView('goal');
                  setOpenGoal(g.id);
                }}
                style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 19, borderRadius: 11, background: '#D71E28', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
              >
                Create this savings plan
                <Ic path="M4 12h15M13 6l6 6-6 6" size={17} stroke="#fff" sw={2} />
              </div>
            </div>
          )}

          {isSavings && (
            <div style={{ marginTop: 16 }}>
              <div onClick={() => go(4)} style={{ display: 'inline-block', fontSize: 13.5, fontWeight: 700, color: '#57534E', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Skip for now — I'll set this up later</div>

              <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '22px 24px', marginTop: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>Where your income goes</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}><span style={{ fontSize: 14, color: '#57534E' }}>{cadenceLabel} income</span><span style={{ fontSize: 14, fontWeight: 700 }}>{fIncome}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9 }}><span style={{ fontSize: 14, color: '#57534E' }}>Fixed costs</span><span style={{ fontSize: 14, fontWeight: 700 }}>{fFixedNeg}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9 }}><span style={{ fontSize: 14, color: '#57534E' }}>Savings</span><span style={{ fontSize: 14, fontWeight: 700 }}>{fSavingsNeg}</span></div>
                <div style={{ display: 'flex', gap: 2, height: 9, marginTop: 18 }}>
                  <div style={{ background: '#57534E', width: splitFixed }} />
                  <div style={{ background: '#0E7A42', width: splitSavings }} />
                  <div style={{ background: '#7FC49B', flexGrow: 1 }} />
                </div>
                <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 9, height: 9, background: '#57534E' }} /><span style={{ fontSize: 12.5, color: '#78716C' }}>Fixed</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 9, height: 9, background: '#0E7A42' }} /><span style={{ fontSize: 12.5, color: '#78716C' }}>Savings</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 9, height: 9, background: '#7FC49B' }} /><span style={{ fontSize: 12.5, color: '#78716C' }}>To spend</span></div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#0E7A42', borderRadius: 12, padding: 24, marginTop: 16 }}>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ ...label12, color: 'rgba(255,255,255,0.72)' }}>Available to spend</div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', marginTop: 3 }}>{fAvailable}</div>
                </div>
                <div style={{ width: 42, height: 42, borderRadius: 999, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Ic path={I.check} size={20} stroke="#fff" sw={2.6} />
                </div>
              </div>
            </div>
          )}

          {isAllocate && (
            <div style={{ marginTop: 26 }}>
              <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 26 }}>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14 }}>
                    <span style={{ fontSize: 14, color: '#57534E' }}>Allocated so far</span>
                    <span style={{ fontSize: 13.5, fontWeight: 700, flexShrink: 0 }}>{fAllocated} / {fAvailable}</span>
                  </div>
                  <div style={{ height: 9, background: '#EDE9E1', borderRadius: 999, marginTop: 11, overflow: 'hidden' }}>
                    <div style={{ height: 9, borderRadius: 999, background: allocColor, width: allocPct, transition: 'width 180ms ease' }} />
                  </div>
                </div>
                <div style={{ borderLeft: '1px solid #EDE9E1', paddingLeft: 24, textAlign: 'right', flexShrink: 0 }}>
                  <div style={label12}>{assignLabel}</div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 27, fontWeight: 700, letterSpacing: '-0.025em', color: assignColor, marginTop: 3 }}>{fToAssignAbs}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 16 }}>
                {cats.map((c, i) => (
                  <div key={i} style={{ position: 'relative', background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '16px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 13 }}>
                      <IconBox path={c.icon} />
                      <div style={{ flexGrow: 1, minWidth: 0 }}>
                        <input type="text" ref={focusRef('cats', i)} placeholder="Name this category" value={c.name} onChange={(e) => updateCat(i, { name: e.target.value })} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: '#57534E', width: '100%' }} />
                        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 2 }}>
                          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>$</span>
                          <input type="text" value={String(Math.round(d(c.amount)))} onChange={(e) => updateCat(i, { amount: raw(parse(e.target.value)) })} style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', width: '100%' }} />
                        </div>
                      </div>
                    </div>
                    <input type="range" min={0} max={Math.max(50, Math.round(available))} step={5} value={Math.round(c.amount)} onChange={(e) => updateCat(i, { amount: parse(e.target.value) })} style={{ width: '100%', marginTop: 14, display: 'block' }} />
                    <div style={{ fontSize: 12, color: '#A8A29E', marginTop: 12 }}>Last month {D(c.last)}</div>
                    <RemoveBtn onClick={() => setCats(cats.filter((_, j) => j !== i))} />
                  </div>
                ))}
                <div onClick={addCatRow} style={{ border: '1.5px dashed #DAD5CB', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, cursor: 'pointer', color: '#78716C', fontSize: 14, fontWeight: 500, minHeight: 120 }}>
                  <Ic path="M12 5v14M5 12h14" size={15} stroke="currentColor" sw={2} />Add a category
                </div>
              </div>
            </div>
          )}

          {isReview && (
            <div style={{ marginTop: 26 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 15, borderRadius: 12, padding: '20px 22px', background: balanceBg, border: `1px solid ${balanceBorder}` }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0, background: balanceIconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Ic path={balanceIcon} size={19} stroke="#fff" sw={2.4} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: balanceColor }}>{balanceTitle}</div>
                  <div style={{ fontSize: 13, color: balanceSubColor, marginTop: 2 }}>{balanceSub}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 16 }}>
                {reviewCards.map((r) => (
                  <div key={r.label} style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '18px 20px' }}>
                    <div style={{ fontSize: 13.5, color: '#78716C' }}>{r.label}</div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 29, fontWeight: 700, letterSpacing: '-0.025em', color: r.color, marginTop: 6 }}>{r.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, marginTop: 16, overflow: 'hidden' }}>
                {reviewRows.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 20px', borderTop: `1px solid ${r.divider}` }}>
                    <IconBox path={r.icon} box={32} size={16} />
                    <span style={{ flexGrow: 1, minWidth: 0, fontSize: 14.5, fontWeight: 700 }}>{r.name}</span>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>{r.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isMonitor && (
            <div style={{ marginTop: 22 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
                <div style={{ flexGrow: 1, minWidth: 0, background: '#0E7A42', borderRadius: 12, padding: '24px 26px', display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div style={{ ...label12, color: 'rgba(255,255,255,0.72)' }}>Available to spend</div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 50, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.1, color: '#fff', marginTop: 4 }}>{fMonAvailable}</div>
                    <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.78)', marginTop: 6 }}>{spentLine}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    {hasOver && (
                      <div onClick={() => setMonFilter('Over')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.16)', cursor: 'pointer' }}>
                        <Ic path={I.alert} size={14} stroke="#fff" sw={2} />
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: '#fff' }}>{overLabel}</span>
                      </div>
                    )}
                    <div style={{ ...label12, color: 'rgba(255,255,255,0.72)', marginTop: 14 }}>Overall usage</div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', color: '#fff', marginTop: 2 }}>{usagePct}</div>
                  </div>
                </div>

                <div style={{ width: 232, flexShrink: 0, background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: 20 }}>
                  <div style={label12}>My savings</div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.55, color: '#57534E', marginTop: 10 }}>Saving for school, a vacation, or a home?</div>
                  <div onClick={openStandalone} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 14, fontSize: 13.5, fontWeight: 700, color: '#D71E28', cursor: 'pointer' }}>
                    Create a savings plan
                    <Ic path="M4 12h15M13 6l6 6-6 6" size={15} stroke="currentColor" sw={2} />
                  </div>
                  <div style={{ height: 1, background: '#F0EEE9', margin: '16px 0' }} />
                  <div style={label12}>Saved across goals</div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 25, fontWeight: 700, letterSpacing: '-0.025em', color: '#0E7A42', marginTop: 4 }}>{goalsSaved}</div>
                  <div style={{ fontSize: 12, color: '#A8A29E', marginTop: 4 }}>of {goalsTarget} targeted</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 15 }}>
                {monStats.map((m) => (
                  <div key={m.label} style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '15px 18px', display: 'flex', alignItems: 'center', gap: 13 }}>
                    <IconBox path={m.icon} />
                    <div>
                      <div style={{ fontSize: 13, color: '#78716C' }}>{m.label}</div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 21, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 1 }}>{m.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 11, marginTop: 15 }}>
                <div onClick={() => go(4)} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '12px 18px', background: '#fff', border: '1px solid #E7E5E4', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>
                  <Ic path="M4 7h10M18 7h2M4 17h4M12 17h8M14 4v6M8 14v6" size={16} stroke="#57534E" sw={1.7} />Adjust budget
                </div>
                <div onClick={() => { setAlertsOpen((v) => !v); setStatementOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '12px 18px', background: alertsOpen ? '#F5F3EE' : '#FFFFFF', border: `1px solid ${alertsOpen ? '#292524' : '#E7E5E4'}`, borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>
                  <Ic path="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 0 0 4 0" size={16} stroke="#57534E" sw={1.7} />Set alerts
                </div>
                <div onClick={() => { setStatementOpen((v) => !v); setAlertsOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '12px 18px', background: statementOpen ? '#F5F3EE' : '#FFFFFF', border: `1px solid ${statementOpen ? '#292524' : '#E7E5E4'}`, borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>
                  <Ic path="M6 3h8l4 4v14H6zM14 3v4h4" size={16} stroke="#57534E" sw={1.7} />Statement
                </div>
              </div>

              {alertsOpen && (
                <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '18px 20px', marginTop: 13 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>Alert me when</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 13 }}>
                    {['A category passes 80% of its budget', 'A category goes over budget', 'Weekly summary every Sunday'].map((label, i) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span style={{ flexGrow: 1, minWidth: 0, fontSize: 13.5, color: '#57534E' }}>{label}</span>
                        <Toggle w={42} h={25} thumb={19} on={alerts[i]} onClick={() => setAlerts((a) => { const next = a.slice(); next[i] = !next[i]; return next; })} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {statementOpen && (
                <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '18px 20px', marginTop: 13 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>December statement</span>
                    <span style={{ fontSize: 12.5, color: '#A8A29E' }}>Latest 4 of 96 transactions</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
                    {STATEMENT.map((t, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 0', borderTop: '1px solid #F0EEE9' }}>
                        <span style={{ fontSize: 12.5, color: '#A8A29E', width: 52, flexShrink: 0 }}>{t.date}</span>
                        <span style={{ flexGrow: 1, minWidth: 0, fontSize: 13.5, fontWeight: 500 }}>{t.name}</span>
                        <span style={{ fontSize: 12.5, color: '#78716C', flexShrink: 0 }}>{t.cat}</span>
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, flexShrink: 0, width: 66, textAlign: 'right' }}>{t.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 26 }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>Your goals</div>
                <div style={{ fontSize: 13, color: '#78716C' }}>{goalsMonthly} a month going in</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 14 }}>
                {goalRows.map((g) => (
                  <div key={g.id} onClick={() => { setView('goal'); setOpenGoal(g.id); }} style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '15px 18px' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: g.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Ic path={g.icon} size={16} stroke="#0E7A42" sw={1.6} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 14.5, fontWeight: 700 }}>{g.name}</div>
                        <div style={{ fontSize: 12, color: '#A8A29E', marginTop: 2 }}>{g.account}</div>
                      </div>
                      <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, color: g.pillColor, background: g.pillBg }}>{g.status}</span>
                      <span style={{ flexGrow: 1 }} />
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700 }}>{g.figure}</div>
                        <div style={{ fontSize: 12, color: '#A8A29E', marginTop: 2 }}>{g.dateLine}</div>
                      </div>
                      <Ic path="M9 6l6 6-6 6" size={15} stroke="#A8A29E" sw={2} style={{ flexShrink: 0 }} />
                    </div>
                    <div style={{ height: 5, background: '#EDE9E1', margin: '0 18px 16px 18px', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ height: 5, borderRadius: 999, background: g.barColor, width: g.barPct }} />
                    </div>
                  </div>
                ))}
                <div onClick={openStandalone} style={{ border: '1.5px dashed #DAD5CB', borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, cursor: 'pointer', color: '#78716C', fontSize: 14, fontWeight: 500 }}>
                  <Ic path="M12 5v14M5 12h14" size={15} stroke="currentColor" sw={2} />Add a goal
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 26 }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>Spending by category</div>
                <div onClick={() => setSort((s) => { const order: typeof sort[] = ['budget used', 'amount spent', 'name']; return order[(order.indexOf(s) + 1) % 3]; })} style={{ fontSize: 13, color: '#78716C', cursor: 'pointer' }}>Sorted by {sort}</div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 13 }}>
                {monFilters.map((f) => {
                  const active = monFilter === f;
                  return (
                    <div key={f} onClick={() => setMonFilter(f)} style={{ padding: '7px 14px', borderRadius: 999, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, color: active ? '#FFFFFF' : '#57534E', background: active ? '#292524' : '#FFFFFF', border: `1px solid ${active ? '#292524' : '#E7E5E4'}` }}>{f}</div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 14 }}>
                {rows.map((r) => (
                  <div key={r.origName} style={{ background: '#fff', border: `1px solid ${r.cardBorder}`, borderRadius: 12, overflow: 'hidden' }}>
                    <div onClick={() => setOpenRow((cur) => (cur === r.origName ? null : r.origName))} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '15px 18px', cursor: 'pointer' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: r.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Ic path={r.icon} size={16} stroke={r.iconColor} sw={1.6} />
                      </div>
                      <span style={{ fontSize: 14.5, fontWeight: 700 }}>{r.name}</span>
                      <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, color: r.pillColor, background: r.pillBg }}>{r.status}</span>
                      <span style={{ flexGrow: 1 }} />
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700, color: r.spentColor, flexShrink: 0 }}>{r.spent}</span>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 500, color: '#A8A29E', flexShrink: 0 }}>/ {r.planned}</span>
                      <Ic path="M6 9l6 6 6-6" size={15} stroke="#A8A29E" sw={2} style={{ flexShrink: 0, transform: r.open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </div>
                    {r.open && (
                      <div style={{ padding: '0 18px 16px 18px', display: 'flex', alignItems: 'center', gap: 26 }}>
                        <div><div style={{ fontSize: 11.5, color: '#A8A29E' }}>Remaining</div><div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700, color: r.remainColor }}>{r.remaining}</div></div>
                        <div><div style={{ fontSize: 11.5, color: '#A8A29E' }}>Transactions</div><div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700 }}>{r.txns}</div></div>
                        <div><div style={{ fontSize: 11.5, color: '#A8A29E' }}>Daily pace</div><div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700 }}>{r.pace}</div></div>
                        <span style={{ flexGrow: 1 }} />
                        <div onClick={(e) => { e.stopPropagation(); go(4); }} style={{ padding: '9px 16px', borderRadius: 9, border: '1px solid #E7E5E4', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Move money</div>
                      </div>
                    )}
                    <div style={{ height: 5, background: '#EDE9E1', margin: '0 18px 16px 18px', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ height: 5, borderRadius: 999, background: r.barColor, width: r.barPct }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#E3EDE6', borderRadius: 12, padding: '18px 20px', marginTop: 15 }}>
                <div style={{ width: 40, height: 40, borderRadius: 999, flexShrink: 0, background: '#0E7A42', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><circle cx="9.5" cy="9.5" r="4.2" /><circle cx="14.5" cy="14.5" r="4.2" /></svg>
                </div>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0B5030' }}>On track to save {fSavings} this month</div>
                  <div style={{ fontSize: 13, color: '#3C8A5C', marginTop: 2 }}>That's {savingsIncomePct} of your take-home pay going toward your goals.</div>
                </div>
                <div onClick={() => go(3)} style={{ padding: '11px 20px', borderRadius: 9, background: '#0E7A42', color: '#fff', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Adjust</div>
              </div>

              <div onClick={() => { setView('home'); setOpenGoal(null); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18, background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, marginTop: 13, cursor: 'pointer', fontSize: 14.5, fontWeight: 700 }}>Back to My Money Map</div>
            </div>
          )}

          {isGoalView && (
            <div style={{ marginTop: 22 }}>
              <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '24px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={label12}>{dAccount}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 44, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.1 }}>{dSaved}</div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 19, fontWeight: 500, color: '#A8A29E' }}>{dTarget}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={label12}>Progress</div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', color: dBarColor, marginTop: 2 }}>{dPct}</div>
                  </div>
                </div>

                <div style={{ position: 'relative', height: 9, background: '#EDE9E1', borderRadius: 999, marginTop: 22, overflow: 'hidden' }}>
                  <div style={{ height: 9, borderRadius: 999, background: dBarColor, width: dBarPct }} />
                </div>
                <div style={{ position: 'relative', height: 22, marginTop: 2 }}>
                  <div style={{ position: 'absolute', left: dTargetMark, top: 0 }}>
                    <div style={{ width: 1, height: 8, background: '#A8A29E' }} />
                    <div style={{ fontSize: 11, color: '#A8A29E', marginTop: 3, transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>Target {op.targetLabel}</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 15, borderRadius: 12, padding: '18px 20px', marginTop: 16, background: dPaceBg, border: `1px solid ${dPaceBorder}` }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: dPaceIconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Ic path={dPaceIcon} size={17} stroke="#fff" sw={2.2} />
                </div>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: dPaceColor }}>{dPaceTitle}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.55, color: dPaceColor, marginTop: 3 }}>{dPaceText}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginTop: 16 }}>
                <div style={{ flexGrow: 1, minWidth: 0, background: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, padding: '20px 22px' }}>
                  <div style={label12}>Contributions</div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>
                    {dContribs.map((c, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderTop: `1px solid ${c.divider}` }}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: '#EFEDE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Ic path="M12 5v13M6 13l6 6 6-6" size={15} stroke="#57534E" sw={1.7} />
                        </div>
                        <span style={{ flexGrow: 1, minWidth: 0, fontSize: 14, fontWeight: 500, color: '#57534E' }}>Automatic transfer</span>
                        <span style={{ fontSize: 12.5, color: '#A8A29E', flexShrink: 0 }}>{c.date}</span>
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700, flexShrink: 0 }}>{c.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ width: 232, flexShrink: 0, background: '#F5F3EE', border: '1px solid #EDE9E1', borderRadius: 12, padding: 20 }}>
                  <div style={label12}>This goal</div>
                  {dSummary.map((s) => (
                    <div key={s.label} style={{ marginTop: 14 }}>
                      <div style={{ fontSize: 12.5, color: '#57534E' }}>{s.label}</div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 2 }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {dOngoing && (
                <>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 11, marginTop: 18 }}>
                    <div onClick={openStandalone} style={{ padding: '12px 18px', background: '#fff', border: '1px solid #E7E5E4', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>Edit goal</div>
                    <div onClick={() => { if (gi > -1) setGoalPatch(gi, { monthly: og.monthly > 0 ? 0 : op.needed }); }} style={{ padding: '12px 18px', background: '#fff', border: '1px solid #E7E5E4', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>{dPauseLabel}</div>
                    <div onClick={() => { if (gi > -1) setGoalPatch(gi, { saved: 0, monthly: 250, months: 12 }); }} style={{ padding: '12px 18px', background: '#fff', border: '1px solid #E7E5E4', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>Withdraw for this goal</div>
                  </div>
                  <div onClick={() => { if (gi > -1) setGoalPatch(gi, { monthly: op.needed }); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 19, borderRadius: 11, background: '#D71E28', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 13 }}>
                    Adjust monthly amount
                    <Ic path="M4 12h15M13 6l6 6-6 6" size={17} stroke="#fff" sw={2} />
                  </div>
                </>
              )}

              {dComplete && (
                <div style={{ display: 'flex', gap: 13, marginTop: 18 }}>
                  <div onClick={() => { if (gi > -1) setGoalPatch(gi, { saved: 0, monthly: 250, months: 12 }); }} style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 19, borderRadius: 11, background: '#D71E28', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                    Use these funds
                    <Ic path="M4 12h15M13 6l6 6-6 6" size={17} stroke="#fff" sw={2} />
                  </div>
                  <div onClick={openStandalone} style={{ padding: '19px 30px', borderRadius: 11, background: '#fff', border: '1px solid #E7E5E4', fontSize: 15, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Start a new goal</div>
                </div>
              )}
            </div>
          )}

          {showFooterNav && (
            <div style={{ display: 'flex', gap: 14, marginTop: 24 }}>
              <div onClick={prev} style={{ padding: '19px 30px', borderRadius: 11, background: '#fff', border: '1px solid #E7E5E4', fontSize: 15, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Back</div>
              <div onClick={next} style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 19, borderRadius: 11, background: ctaBg, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', opacity: ctaOpacity }}>
                {ctaLabel}
                <Ic path="M4 12h15M13 6l6 6-6 6" size={17} stroke="#fff" sw={2} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function updateDeposit(i: number, patch: Partial<Deposit>) {
    setDeposits((list) => {
      const next = list.slice();
      next[i] = { ...next[i], ...patch };
      return next;
    });
  }
}
