import type { ReactNode } from 'react';
import CaseStudyLayout, { type CSSection } from '../components/CaseStudyLayout';
import OsmoOnboardingFlow from './osmo/OsmoOnboardingFlow';
import EvidenceChip from '../components/EvidenceChip';

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

const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', margin: '26px 0 0 0' };

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

const handledScenarios = [
  {
    title: 'The caller switches between Hindi and English mid-call',
    body: 'Tanya can switch languages mid-call, so the caller never has to adapt to the assistant.',
  },
  {
    title: 'Setting up call forwarding',
    body: "The activation code is copyable, works on all carriers, and the screen says plainly that it's free and reversible, with \"How it works?\" explaining how to undo it. Any step can be skipped. Every irreversible-looking action shows how to undo it.",
  },
];

type FlowLine = { who: 'Caller' | 'Tanya'; text: string; aside?: boolean };

const failureFlows: { title: string; lines: FlowLine[]; notes: string[] }[] = [
  {
    title: 'She takes a message.',
    lines: [
      { who: 'Caller', text: "Hi, is Rohan there? It's about the quote he sent Tuesday." },
      { who: 'Tanya', text: "He's busy right now — can I take a message?" },
      { who: 'Caller', text: "Sure. It's Priya, from Lighthouse." },
      { who: 'Tanya', text: 'Priya, from Lighthouse — is that P-R-I-Y-A?' },
      { who: 'Caller', text: "That's it." },
      { who: 'Tanya', text: "Got it. I'll pass this on and he'll see it shortly." },
    ],
    notes: [
      "She identifies as the assistant, never as Rohan — the caller always knows they're not speaking to him.",
      'She confirms the name explicitly, because a name is the one detail where an error is unrecoverable.',
      "She never promises when he'll reply, because she doesn't know his calendar.",
    ],
  },
  {
    title: "She doesn't catch it.",
    lines: [
      { who: 'Caller', text: 'On a poor line, switching between Hindi and English.', aside: true },
      { who: 'Tanya', text: "Sorry, I didn't catch that — could you say your name again?" },
      { who: 'Caller', text: 'Repeats, still unclear.', aside: true },
      { who: 'Tanya', text: "I've got your number, so I'll make sure he calls you back." },
    ],
    notes: [
      'She asks twice at most — a third attempt turns an assistant into an interrogation.',
      "She closes on what she does have rather than what she's missing.",
      'The message reaches the user marked "name unclear," with the audio attached, instead of being tidied into a confident guess.',
    ],
  },
  {
    title: "She's asked something she wasn't taught.",
    lines: [
      { who: 'Caller', text: "What's your rate for a half-day shoot?" },
      { who: 'Tanya', text: 'A half-day is twelve thousand.' },
      { who: 'Caller', text: 'And if it ran two days, with travel to Pune?' },
      { who: 'Tanya', text: "I can only give you the rates he's set, and that isn't one of them — let me take your details and he'll quote you properly." },
    ],
    notes: [
      'She quotes taught facts verbatim and never calculates from them, because a plausible invented number is a commercial problem, not a UX one.',
      "The boundary isn't the topic, it's whether the specific answer exists.",
      'The gap becomes a product signal — the call surfaces in "Needs you," and the rules screen can then propose adding a two-day rate.',
    ],
  },
];

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
        <p style={serifP}>
          <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>My role:</strong> I was the sole designer on a
          three-person team — one PM, one designer, one developer. I audited the generated screens, rebuilt the
          information architecture, and designed the onboarding and call-blocking flows, then scheduling and
          appointments, phase by phase.
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

        <h3 style={h3Style}>What I didn't do</h3>
        <p style={{ ...serifP, marginTop: 10, maxWidth: '62ch' }}>
          A few directions looked reasonable and got cut once weighed against the same question: does this ask for
          trust before the product has earned any?
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18, maxWidth: '62ch' }}>
          <div style={{ borderLeft: '2px solid var(--hairline)', paddingLeft: 18 }}>
            <div style={{ fontSize: 15, color: 'var(--ink)' }}>A full setup questionnaire up front</div>
            <div style={{ ...serifP, fontSize: 15, margin: '4px 0 0 0' }}>
              It would have asked for trust before Tanya had answered a single call. Every field was a trust
              withdrawal, and a user who abandons onboarding never reaches the point where the product proves itself.
            </div>
          </div>
          <div style={{ borderLeft: '2px solid var(--hairline)', paddingLeft: 18 }}>
            <div style={{ fontSize: 15, color: 'var(--ink)' }}>More explanation before setup</div>
            <div style={{ ...serifP, fontSize: 15, margin: '4px 0 0 0' }}>
              The instinct with a low-trust product is to explain more. I did the opposite. The "How it works?" link
              stays on each step for anyone who wants it, but no one has to read anything before the app works.
            </div>
          </div>
          <div style={{ borderLeft: '2px solid var(--hairline)', paddingLeft: 18 }}>
            <div style={{ fontSize: 15, color: 'var(--ink)' }}>Asking for setup before showing the value</div>
            <div style={{ ...serifP, fontSize: 15, margin: '4px 0 0 0' }}>
              The first screen makes one claim and proves it — Tanya mid-call — with nothing on it to choose. Every
              technical step comes after, so each one has a reason.
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'os-04',
    number: '04',
    title: 'Changing the brief',
    heading: 'Designing for the product underneath the reference',
    body: (
      <>
        <p style={serifP}>
          The founders started with Truecaller in mind: dark, premium, built around blocking calls. The real ambition
          underneath was different — an app that answers, takes messages and books on the user's behalf.
        </p>
        <p style={serifP}>
          That's a different product with a different risk: it doesn't just filter calls, it speaks for you.
          Designing for that second product, rather than the reference, is what shaped everything that follows.
        </p>
      </>
    ),
  },
  {
    id: 'os-05',
    number: '05',
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
        <p style={serifP}>
          There was no measured baseline for the earlier flow, so the 90% completion can't be shown as a
          before-and-after. What testing did show was where people hesitated — and those moments are what the
          redesign removed.
        </p>
      </>
    ),
  },
  {
    id: 'os-06',
    number: '06',
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
    id: 'os-07',
    number: '07',
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
    id: 'os-08',
    number: '08',
    title: 'After Tanya picks up',
    heading: 'Onboarding gets Tanya answering. The harder problem is what she does next.',
    body: (
      <>
        <div className="os-fail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginTop: 24 }}>
          {handledScenarios.map((s) => (
            <div key={s.title} style={{ border: '1px solid var(--hairline)', padding: '18px 20px' }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.5 }}>{s.title}</div>
              <div style={{ fontSize: 15, color: 'var(--secondary)', marginTop: 8, lineHeight: 1.5 }}>{s.body}</div>
            </div>
          ))}
        </div>
        <style>{`
          @media (min-width: 560px) {
            .os-fail-grid { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>

        <h3 style={h3Style}>Open questions for the next phase</h3>
        <p style={{ ...serifP, marginTop: 10 }}>
          Onboarding solved getting Tanya answering, and the next section sketches what she says when a call goes
          wrong. One question is still open: how an urgent call reaches the user faster than the log. It needs the
          same principle as onboarding — when in doubt, hand back to the user rather than guess.
        </p>
      </>
    ),
  },
  {
    id: 'os-08b',
    number: '09',
    title: 'What Tanya says when it goes wrong',
    heading: 'When in doubt, hand back to the user rather than guess',
    body: (
      <>
        <div style={{ marginTop: -4, marginBottom: 4 }}>
          <EvidenceChip label="Proposed call flows — exploration, not shipped" />
        </div>
        {failureFlows.map((f) => (
          <div key={f.title}>
            <h3 style={h3Style}>{f.title}</h3>
            <div className="os-flow-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginTop: 14 }}>
              <div style={{ border: '1px solid var(--hairline)', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {f.lines.map((l, i) => (
                  <div key={i}>
                    <div style={kicker}>{l.who}</div>
                    <div style={{ fontSize: 15, color: l.who === 'Tanya' ? 'var(--ink)' : 'var(--secondary)', fontStyle: l.aside ? 'italic' : 'normal', marginTop: 4, lineHeight: 1.5 }}>
                      {l.aside ? l.text : `“${l.text}”`}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {f.notes.map((n) => (
                  <div key={n} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 18 }}>
                    <div style={{ ...serifP, fontSize: 15, margin: 0 }}>{n}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <style>{`
          @media (min-width: 640px) {
            .os-flow-grid { grid-template-columns: 3fr 2fr !important; }
          }
        `}</style>
      </>
    ),
  },
  {
    id: 'os-09',
    number: '10',
    title: 'Keeping the user in the loop',
    heading: 'In control, without having to configure anything up front',
    body: (
      <>
        <p style={serifP}>
          "Needs you" holds only the calls still waiting on a decision — the user accepts or declines each one. "All
          calls" is the full log, so nothing is hidden, but nothing demands attention that doesn't need it.
        </p>
        <p style={serifP}>
          The rules screen proposes rules from calls Tanya has already handled, so accepting or declining a proposed
          rule is the whole job — the user is never asked to write a rule from a blank screen. The Tanya tab is the
          permanent home for voice, rules and facts, so the optional layer from onboarding stays reachable long after
          onboarding ends.
        </p>
        <p style={serifP}>
          The idea running through all of it: the user stays in control without having to configure anything up
          front. Control is available whenever they want it, never required before the app is useful.
        </p>
        <p style={serifP}>
          The next step is letting users correct Tanya directly from a call — so fixing a mistake works the same way
          as accepting a proposed rule.
        </p>
      </>
    ),
  },
  {
    id: 'os-10',
    number: '11',
    title: 'The other person on the call',
    heading: "The caller didn't choose any of this",
    body: (
      <>
        <p style={serifP}>
          Every design decision so far is about the person who owns the phone. The other person on the call didn't
          choose OsmO, didn't set it up, and doesn't see any of the screens above.
        </p>
        <p style={serifP}>
          Tanya answers as the user's assistant, not as the user: "He's busy right now — can I take a message?" The
          caller hears someone speaking on the user's behalf, not an imitation of them.
        </p>
        <p style={serifP}>
          How callers are told they're speaking to an AI, and how call recordings and consent are handled, are
          questions I'd want answered before any wider launch — they matter as much as anything the user sees.
        </p>
      </>
    ),
  },
  {
    id: 'os-11',
    number: '12',
    title: "What's next: a trust ladder",
    heading: 'Autonomy the user grants, one step at a time',
    tinted: true,
    body: (
      <>
        <div style={{ marginTop: -4, marginBottom: 4 }}>
          <EvidenceChip label="Exploration — not shipped" />
        </div>
        <p style={{ ...serifP, maxWidth: '62ch' }}>
          Tanya starts with limited autonomy — taking messages only. As the user reviews and approves how she handles
          calls, she's offered more: declining sales calls on her own, then booking appointments. Each step up is
          offered, never forced, and always reversible.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18, maxWidth: '62ch' }}>
          <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 18 }}>
            <div style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 500 }}>Take over</div>
            <div style={{ ...serifP, fontSize: 15, margin: '4px 0 0 0' }}>
              A live notification during a call with an option to jump in.
            </div>
          </div>
          <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 18 }}>
            <div style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 500 }}>Activity log</div>
            <div style={{ ...serifP, fontSize: 15, margin: '4px 0 0 0' }}>
              Every action Tanya took, why, and how to undo it.
            </div>
          </div>
        </div>
        <p style={{ ...serifP, maxWidth: '62ch' }}>
          This is the same principle as onboarding, extended past it: <em>prove it works before asking for anything
          personal.</em> Onboarding proves it works before asking for trust. The trust ladder proves each new level of
          autonomy works before asking for the next one.
        </p>
      </>
    ),
  },
  {
    id: 'os-12',
    number: '13',
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

        <h3 style={h3Style}>What I'd measure next</h3>
        <ul style={{ ...serifP, margin: '10px 0 0 0', paddingLeft: 20 }}>
          <li>Whether users keep call forwarding switched on after 7 and 30 days</li>
          <li>How often users correct or overrule Tanya</li>
          <li>How often they take over a live call</li>
          <li>How many optional "Teach Tanya" steps get completed after onboarding</li>
        </ul>
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
