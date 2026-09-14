import type { ReactNode } from 'react';
import CaseStudyLayout, { type CSSection } from '../components/CaseStudyLayout';
import OsmoOnboardingFlow from './osmo/OsmoOnboardingFlow';

const serifP: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 300,
  fontSize: 18,
  lineHeight: 1.65,
  color: 'var(--secondary)',
  margin: '16px 0 0 0',
  maxWidth: '65ch',
};

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--muted)',
};

const caption: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.05em',
  color: 'var(--muted)',
  marginTop: 12,
  maxWidth: 234,
  lineHeight: 1.5,
};

function PhoneBezel({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: 'relative', width: 410, height: 864, borderRadius: 54, background: '#0B0C10', boxShadow: '0 30px 70px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.08)', padding: 10 }}>
      <div style={{ position: 'relative', width: 390, height: 844, borderRadius: 44, overflow: 'hidden' }}>{children}</div>
      <div style={{ position: 'absolute', left: '50%', top: 22, transform: 'translateX(-50%)', width: 118, height: 32, borderRadius: 20, background: '#0B0C10', zIndex: 30 }} />
    </div>
  );
}

function ScaledPhone({ width, height, scale, children }: { width: number; height: number; scale: number; children: ReactNode }) {
  return (
    <div style={{ position: 'relative', width, height, flex: '0 0 auto' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 410, height: 864, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <PhoneBezel>{children}</PhoneBezel>
      </div>
    </div>
  );
}

const sections: CSSection[] = [
  {
    id: 'os-01',
    number: '01',
    title: 'Frame',
    heading: 'Hand over your phone to something that speaks for you',
    body: (
      <>
        <p style={serifP}>
          The product's job is simple to state: let someone hand their phone over to an assistant that answers,
          screens, and books on their behalf — and trust it enough to actually turn it on.
        </p>
        <p style={serifP}>
          What we designed separates two kinds of asking. Identity and verification — a name, an OTP, a voice to
          answer in — are table stakes, and they stay short. Everything that requires real trust is left for the user
          to add in their own time, once the thing already works.
        </p>
      </>
    ),
  },
  {
    id: 'os-02',
    number: '02',
    title: 'The brief',
    heading: 'A fixed name, a clear ambition, and no idea how it should work',
    body: (
      <>
        <p style={serifP}>
          The client came in already set on the name and had a logo made — OsmO stayed untouched throughout. What
          they didn't have was a working idea of how the product should function.
        </p>
        <p style={serifP}>
          The initial reference point was something like Truecaller: a crowdsourced caller-ID and spam-blocking app,
          dark and premium, built to filter unwanted calls. Underneath that sat the real ambition — an app that could
          answer calls on the user's behalf, take messages, make reservations, and summarise the day's calls — but
          that half of the brief had no flow, no onboarding, and no sketches beyond rough ones.
        </p>
        <p style={serifP}>
          The build ran close to two months, shipped feature by feature rather than as one complete flow — onboarding
          and call-blocking first, scheduling and appointments layered in after.
        </p>
      </>
    ),
  },
  {
    id: 'os-03',
    number: '03',
    title: 'The reframe',
    heading: 'Every form field is a trust withdrawal',
    tinted: true,
    body: (
      <>
        <p style={{ ...serifP, maxWidth: '62ch' }}>
          The obvious diagnosis was structural: screens had been generated one at a time by someone without a design
          background, each with its own idea of where the user should land next. Try to check your call log from the
          appointments screen and there was no way back short of force-closing the app. That was real, and fixing it
          was necessary — but it wasn't the interesting problem, and it wasn't what was actually costing the business
          users.
        </p>
        <p style={{ ...serifP, maxWidth: '62ch' }}>
          The deeper issue surfaced once onboarding was rebuilt around what OsmO actually asks of someone: not just
          "let this app screen your calls," but "let this app speak and act as you." Every question in a longer form
          wasn't neutral friction to push through — it was a fresh request to trust something that answers your phone
          and talks to people on your behalf. Every form field wasn't a UX cost. It was a trust withdrawal.
        </p>
        <div style={{ borderLeft: '2px solid var(--accent)', padding: '4px 0 4px 22px', margin: '26px 0 0 0' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 21, lineHeight: 1.5, color: 'var(--ink)', margin: 0, maxWidth: '46ch' }}>
            The instinct with a low-trust product is to explain more. I did the opposite: fewer questions, not more
            explanation. Trust here wasn't won by being told more. It was won by being asked less.
          </p>
        </div>
        <p style={{ ...serifP, maxWidth: '62ch' }}>
          That decision sat upstream of the business's only real lever at this stage. A user who abandons onboarding
          never reaches a paywall, so onboarding completion is the ceiling on everything that comes after it —
          including the users who convert to the paid tier. It now sits at 90%.
        </p>
      </>
    ),
  },
  {
    id: 'os-04',
    number: '04',
    title: 'Evidence',
    heading: 'Small sample, real behaviour',
    body: (
      <>
        <p style={serifP}>
          The app was built and designed in phases rather than as one complete flow, which meant each phase could be
          tried out before the next was built on top of it. There was no formal research team or user panel — testing
          happened with friends, family, and people in the founders' network.
        </p>
        <p style={serifP}>
          That's a limited sample, and I'd say so in a review. But it was real behaviour rather than guesswork:
          watching where someone actually hesitated in onboarding is a different kind of signal than assuming it. The
          trust pattern showed up repeatedly — not as something people said outright, but in where they paused, or
          asked "wait, why do you need this," before continuing.
        </p>
      </>
    ),
  },
  {
    id: 'os-05',
    number: '05',
    title: 'Constraints',
    heading: 'Three people, no research function',
    body: (
      <>
        <p style={serifP}>
          The team was deliberately small — one PM, one designer, one developer. No research function, no QA layer,
          no dedicated content or ops support. Every decision about scope, sequencing, and what got tested had to be
          made by three people, which is part of why the app shipped in phases rather than as one complete product: a
          team this size can move fast, but only if it isn't trying to hold the whole thing in its head at once.
        </p>
        <p style={serifP}>
          That size also shaped what "evidence" could mean. There was no room for a formal research process, so
          testing had to be informal, fast, and close to hand.
        </p>
      </>
    ),
  },
  {
    id: 'os-06',
    number: '06',
    title: 'The design',
    heading: 'Required is technical. Optional is personal.',
    body: (
      <>
        <p style={serifP}>
          Onboarding asks for two different things, and only one of them is required. Sign-up itself is a name, an
          OTP and a choice of voice — the minimum any phone app needs to exist, and nothing a user hasn't given a
          dozen other apps. Getting Tanya answering calls then takes three technical steps — turn off Live Voicemail
          so we can pick up what's missed, activate call forwarding with a one-time carrier code, allow
          notifications so a handled call surfaces back to the user. None of this asks the user to trust the AI yet.
          It asks them to configure a phone.
        </p>
        <p style={serifP}>
          Everything that actually involves trust — recording a voice, setting rules, teaching it facts about a
          business — sits on the last onboarding screen as optional cards under "Teach Tanya" — below a heading that
          already says OSMO is answering, and beside an "I'll do these later" exit that carries the same weight as
          the primary action. A user reaches their calls before a single rule has been set. The app works first. The
          user decides how much of themselves to hand over, and when.
        </p>
        <p style={serifP}>
          That ordering is the actual answer to the trust problem: rather than asking for less information up front,
          the design removes the requirement to give any information at all before the product proves it works.
        </p>

        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
          <ScaledPhone width={272} height={572} scale={0.66}>
            <OsmoOnboardingFlow startView="done" />
          </ScaledPhone>
        </div>
        <div style={{ ...caption, maxWidth: '100%', textAlign: 'center' }}>
          The end of onboarding. Tanya is already answering; the three things that need trust sit below as optional
          cards, with "I'll do these later" as a first-class exit.
        </div>
      </>
    ),
  },
  {
    id: 'os-07',
    number: '07',
    title: 'Status',
    heading: 'Shipped, and the conversion held',
    body: (
      <>
        <p style={serifP}>
          Onboarding completion settled at 90%. In its first 60 days OsmO handled an average of around 1,000 calls a
          day, grew to roughly 2,000 downloads, and converted 93 users to its $10/month paid tier — a 4.65%
          free-to-paid conversion rate.
        </p>
        <p style={serifP}>
          I'd be careful about the causal claim. 90% completion is the number I'd defend most readily — it measures
          the thing the rewrite changed, and it is the ceiling the 4.65% sits under. The conversion rate is healthy
          for a two-month-old consumer app, but with a three-person team and no instrumentation beyond the basics I
          can't isolate onboarding from everything else that shipped in the same window.
        </p>
      </>
    ),
  },
];

export default function OsmoAiCallAssistant() {
  return (
    <CaseStudyLayout
      kicker="OsmO · AI call assistant · 2026"
      title={
        <>
          <span style={{ color: 'var(--accent)' }}>Trust</span> isn't won by explaining more. It's won by asking
          less.
        </>
      }
      summary="OsmO answers the calls you don't want to, takes the message, and books the thing. What we designed gets someone from 'here's an app that could do that' to a working assistant they actually turn on in three technical steps — and leaves everything that requires real trust for the user to add in their own time, once the thing already works."
      meta={[
        { label: 'Role', value: 'Product designer — the only designer on the product' },
        { label: 'Team', value: 'Three people — one PM, one designer, one developer' },
        { label: 'Timeframe', value: 'Close to two months, shipped feature by feature rather than as one flow' },
        { label: 'Platform', value: 'iOS and Android' },
        { label: 'Users', value: "People who miss calls they can't afford to miss — small business owners, freelancers, anyone screening a busy line" },
        { label: 'Scope', value: 'Owned the product model, the IA, onboarding and every screen. Did not own the voice engine, the call infrastructure or the brand — the name and logo came fixed.' },
      ]}
      metrics={[
        { value: '~1,000', label: 'Calls handled a day' },
        { value: '~2,000', label: 'Downloads in 60 days' },
        { value: '90%', label: 'Onboarding completion' },
        { value: '4.65%', label: 'Free to paid — 93 users at $10/mo' },
      ]}
      hero={
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
            <div>
              <ScaledPhone width={230} height={484} scale={0.56}>
                <OsmoOnboardingFlow startView="welcome" />
              </ScaledPhone>
              <div style={caption}>01 · The value prop, before any ask. One claim, one proof — Tanya mid-call, saying the line we actually use — and nothing on the screen to choose.</div>
            </div>
            <div>
              <ScaledPhone width={230} height={484} scale={0.56}>
                <OsmoOnboardingFlow startView="step" startStep={1} />
              </ScaledPhone>
              <div style={caption}>02 · Step one asks the user to change a phone setting. Nothing here requires trusting an AI.</div>
            </div>
            <div>
              <ScaledPhone width={230} height={484} scale={0.56}>
                <OsmoOnboardingFlow startView="step" startStep={2} />
              </ScaledPhone>
              <div style={caption}>03 · The carrier code from the source file, copyable, with an honest "how it works" — including how to undo it.</div>
            </div>
            <div>
              <ScaledPhone width={230} height={484} scale={0.56}>
                <OsmoOnboardingFlow startView="concierge" />
              </ScaledPhone>
              <div style={caption}>04 · Picking a voice agent — English or Hindi, Rahul or Tanya. Identity and verification only; nothing here asks the user to trust an AI yet.</div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--ink)', marginTop: 56, paddingTop: 32 }}>
            <div style={kicker}>Live prototype</div>
            <h2 style={{ fontSize: 25, fontWeight: 500, letterSpacing: '-0.025em', margin: '14px 0 0 0', maxWidth: '30ch' }}>Walk the flow yourself</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'flex-start', marginTop: 32 }}>
              <ScaledPhone width={328} height={691} scale={0.8}>
                <OsmoOnboardingFlow />
              </ScaledPhone>
              <div style={{ flex: '1 1 280px', minWidth: 260, paddingTop: 4, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p style={serifP}>
                  Start at the splash. The value-prop screen makes one claim and proves it — Tanya mid-call, saying
                  the line we actually use — with nothing on it to choose. Then a first name, an OTP and a voice
                  pick: identity and verification, the table stakes any phone app needs. Then three technical steps,
                  each a phone setting rather than a question about you.
                </p>
                <p style={serifP}>
                  Onboarding ends with OsmO already answering — before a single thing about how you want us to
                  behave has been asked — and hands you into Ask AI, where the suggested asks sit at the top of the
                  screen instead of hiding beside the input. The Teach Tanya rows stay optional either way; the rules
                  screen proposes from calls we have already handled, so accepting or declining is the whole job.
                </p>
                <p style={serifP}>
                  Carry on to Calls, where "Needs you" holds only the calls still waiting on a decision — accept or
                  decline each one — and "All calls" is the full log. The Tanya tab is where our voice, rules and
                  facts live permanently: the optional layer keeps a front door long after onboarding ends.
                </p>
              </div>
            </div>
          </div>
        </>
      }
      sections={sections}
      notes={[
        {
          title: 'Sidenote',
          body: 'The navigation bug — no way back from appointments — was the thing everyone pointed at first. It took an afternoon to fix and changed nothing about the business. The expensive problem was invisible in a screenshot: what the flow was asking for, and in what order.',
        },
        {
          title: 'Process',
          body: "Phase by phase over two months: audit the generated screens, rebuild the IA, then onboarding and call-blocking, then scheduling and appointments. Each phase was tried with people in the founders' network before the next was built on top of it.",
        },
        {
          title: 'Principles',
          body: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div>01&nbsp; Required steps configure a phone, never a personality.</div>
              <div>02&nbsp; Prove it works before asking for anything personal.</div>
              <div>03&nbsp; Every irreversible-looking action shows how to undo it.</div>
            </div>
          ),
        },
      ]}
      prev={{ kicker: 'Next case study', label: 'Wells Fargo — financial health tools', to: '/work/wells-fargo-financial-health' }}
      next={{ kicker: 'Back to', label: 'All work', to: '/' }}
    />
  );
}
