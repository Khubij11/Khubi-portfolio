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
      { who: 'Tanya', text: "He's busy right now. Can I take a message?" },
      { who: 'Caller', text: "Sure. It's Priya, from Lighthouse." },
      { who: 'Tanya', text: 'Priya, from Lighthouse. Is that P-R-I-Y-A?' },
      { who: 'Caller', text: "That's it." },
      { who: 'Tanya', text: "Got it. I'll pass this on and he'll see it shortly." },
    ],
    notes: [
      "She identifies as the assistant, never as Rohan. The caller always knows they're not speaking to him.",
      'She confirms the name explicitly, because a name is the one detail where an error is unrecoverable.',
      "She never promises when he'll reply, because she doesn't know his calendar.",
    ],
  },
  {
    title: "She doesn't catch it.",
    lines: [
      { who: 'Caller', text: 'On a poor line, switching between Hindi and English.', aside: true },
      { who: 'Tanya', text: "Sorry, I didn't catch that. Could you say your name again?" },
      { who: 'Caller', text: 'Repeats, still unclear.', aside: true },
      { who: 'Tanya', text: "I've got your number, so I'll make sure he calls you back." },
    ],
    notes: [
      'She asks twice at most. A third attempt turns an assistant into an interrogation.',
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
      { who: 'Tanya', text: "I can only give you the rates he's set, and that isn't one of them. Let me take your details and he'll quote you properly." },
    ],
    notes: [
      'She quotes taught facts verbatim and never calculates from them, because a plausible invented number is a commercial problem, not a UX one.',
      "The boundary isn't the topic, it's whether the specific answer exists.",
      'The gap becomes a product signal: the call surfaces in "Needs you," and the rules screen can then propose adding a two-day rate.',
    ],
  },
];

const tintBox: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid var(--hairline)',
  borderRadius: 8,
  padding: 'clamp(24px, 3.5vw, 36px)',
  boxShadow: '0 1px 2px rgba(23,26,24,0.04), 0 24px 40px -32px rgba(23,26,24,0.25)',
  marginTop: 32,
};

const tintKicker: React.CSSProperties = { ...kicker, color: 'var(--accent)' };

const noteKicker = kicker;


const metrics = [
  { value: '~1,000/day', label: 'Calls handled' },
  { value: '~2,000', label: 'Downloads' },
  { value: '90%', label: 'Onboarding' },
  { value: '4.65%', label: 'Free to paid' },
];

const headerFacts = [
  { label: 'Role', value: 'Founding Designer' },
  { label: 'Team', value: '1 PM, 1 Eng' },
  { label: 'Timeline', value: '~2 months' },
  { label: 'Platform', value: 'iOS, Android' },
];

const flowBox: React.CSSProperties = {
  border: '1px solid var(--hairline)',
  background: 'var(--bg, transparent)',
  padding: '14px 16px',
};

const flowTitle: React.CSSProperties = { fontSize: 15, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.4 };
const flowBody: React.CSSProperties = { fontSize: 14, color: 'var(--secondary)', lineHeight: 1.5, marginTop: 4 };

function FlowArrow() {
  return (
    <div aria-hidden="true" style={{ display: 'flex', justifyContent: 'center', color: 'var(--muted)', fontSize: 16, lineHeight: 1, padding: '6px 0' }}>
      ↓
    </div>
  );
}

function CallLoopDiagram() {
  return (
    <figure style={{ margin: '28px 0 0 0' }} aria-label="How a call moves from Tanya back to the user">
      <div style={flowBox}>
        <div style={flowTitle}>A call comes in</div>
        <div style={flowBody}>Tanya answers as the user's assistant, not as the user.</div>
      </div>
      <FlowArrow />
      <div className="os-loop-split" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        <div style={flowBox}>
          <div style={flowTitle}>All calls</div>
          <div style={flowBody}>The full log, so nothing is hidden.</div>
        </div>
        <div style={{ ...flowBox, borderColor: 'var(--accent)' }}>
          <div style={flowTitle}>Needs you</div>
          <div style={flowBody}>Only the calls still waiting on a decision. The user accepts or declines each one.</div>
        </div>
      </div>
      <FlowArrow />
      <div style={flowBox}>
        <div style={flowTitle}>Rules</div>
        <div style={flowBody}>The rules screen proposes rules from calls Tanya has already handled.</div>
      </div>
      <FlowArrow />
      <div style={flowBox}>
        <div style={flowTitle}>The Tanya tab</div>
        <div style={flowBody}>The permanent home for voice, rules and facts.</div>
      </div>
      <figcaption style={{ ...caption, maxWidth: '100%' }}>How a handled call comes back to the user.</figcaption>
      <style>{`
        @media (min-width: 480px) {
          .os-loop-split { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </figure>
  );
}

const sections: CSSection[] = [
  {
    id: 'os-problem',
    number: '02',
    title: 'The problem',
    heading: 'An assistant that picks up, so you don’t have to',
    body: (
      <>
        <p style={serifP}>
          OsmO is an AI call assistant. It answers your phone, screens unknown numbers and sales calls, takes
          messages, makes reservations, and summarises the day's calls. The calls you'd rather not deal with stop
          taking up your time, and the ones that matter still reach you.
        </p>
        <p style={serifP}>
          Most call apps stop at telling you who's calling. Caller ID and spam blocking, the Truecaller model, can
          label or filter a call, but you still have to pick up, decline, or call back. AI made it possible to go a
          step further: an assistant that actually answers, finds out what the caller wants, and handles it, whether
          that's taking a message or booking an appointment.
        </p>
        <p style={serifP}>
          <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>My role:</strong> I was the only designer, working
          with one PM and one developer over about two months. I designed the product end to end: the information
          architecture, onboarding, call screening and blocking, then scheduling and appointments, phase by phase,
          building it from scratch.
        </p>
        <p style={{ ...serifP, maxWidth: '62ch' }}>
          An assistant that speaks for you asks for far more trust than one that filters calls. People need to feel
          safe letting it answer, know what it will say on their behalf, and see what happened afterwards. So the
          problem was never a single screen or flow. It was designing the whole product around that trust, from the
          first minute of setup to the summary of the day's calls.
        </p>
        <blockquote style={{ borderLeft: '2px solid var(--accent)', padding: '4px 0 4px 22px', margin: '40px 0 0 0' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(24px, 3vw, 30px)', lineHeight: 1.3, letterSpacing: '-0.02em', color: 'var(--ink)', margin: 0, maxWidth: '30ch' }}>
            Not a better spam filter. An assistant that <span style={{ color: 'var(--accent)' }}>picks up for you</span>.
          </p>
        </blockquote>
      </>
    ),
  },
  {
    id: 'os-brief',
    number: '03',
    title: 'What we were asked to build',
    heading: 'A fixed name, a clear ambition, and no idea how it should work',
    body: (
      <>
        <p style={serifP}>
          The client came in already set on the name and had a logo made. OsmO stayed untouched throughout. What
          they didn't have was a working idea of how the product should function.
        </p>
        <p style={serifP}>
          The initial reference point was something like Truecaller: a crowdsourced caller-ID and spam-blocking app,
          dark and premium, built to filter unwanted calls. Underneath that sat the real ambition: an app that could
          answer calls on the user's behalf, take messages, make reservations, and summarise the day's calls, but
          that half of the brief had no flow, no onboarding, and no sketches beyond rough ones.
        </p>
        <p style={serifP}>
          That's a different product with a different risk: it doesn't just filter calls, it speaks for you.
          Designing for that second product, rather than the reference, is what shaped everything that follows.
        </p>
        <p style={serifP}>
          The build ran close to two months, shipped feature by feature rather than as one complete flow: onboarding
          and call-blocking first, scheduling and appointments layered in after.
        </p>

        <div style={tintBox}>
          <div style={tintKicker}>The reframe</div>
          <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(24px, 2.8vw, 30px)', lineHeight: 1.3, letterSpacing: '-0.02em', color: 'var(--ink)', margin: '14px 0 0 0', maxWidth: '34ch' }}>
            The instinct with a low-trust product is to explain more. I did the opposite:{' '}
            <span style={{ color: 'var(--accent)' }}>fewer questions, not more explanation.</span>
          </p>
          <p style={{ ...serifP, maxWidth: '62ch' }}>
            That decision sat upstream of the business's only real lever at this stage. A user who abandons onboarding
            never reaches a paywall, so onboarding completion is the ceiling on everything that comes after it,
            including the users who convert to the paid tier. It now sits at 90%.
          </p>

          <div style={{ borderTop: '1px solid var(--hairline)', marginTop: 32, paddingTop: 28 }}>
            <h3 style={{ ...h3Style, marginTop: 0 }}>What I didn't do</h3>
            <p style={{ ...serifP, marginTop: 10, maxWidth: '62ch' }}>
              A few directions looked reasonable and got cut once weighed against the same question: does this ask for
              trust before the product has earned any?
            </p>
            <div className="os-cut-grid">
              {[
                {
                  t: 'A full setup questionnaire up front',
                  b: 'It would have asked for trust before Tanya had answered a single call, and a user who abandons onboarding never reaches the point where the product proves itself.',
                },
                {
                  t: 'More explanation before setup',
                  b: 'The "How it works?" link stays on each step for anyone who wants it, but no one has to read anything before the app works.',
                },
                {
                  t: 'Asking for setup before showing the value',
                  b: 'The first screen makes one claim and proves it (Tanya mid-call) with nothing on it to choose. Every technical step comes after, so each one has a reason.',
                },
              ].map((c) => (
                <div key={c.t} className="os-cut">
                  <div><span className="os-cut-tag">Cut</span></div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.35 }}>{c.t}</div>
                    <div style={{ ...serifP, fontSize: 15, lineHeight: 1.55, margin: '6px 0 0 0', maxWidth: '60ch' }}>{c.b}</div>
                  </div>
                </div>
              ))}
            </div>
            <style>{`
              .os-cut-grid { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 20px; }
              .os-cut { display: grid; grid-template-columns: 1fr; gap: 10px; background: var(--paper); border-radius: 6px; padding: 18px 20px 20px; }
              @media (min-width: 640px) { .os-cut { grid-template-columns: 64px 1fr; gap: 16px; } }
              .os-cut-tag {
                display: inline-block; font-family: var(--font-ui); font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
                text-transform: uppercase; color: var(--muted); border: 1px solid var(--hairline); border-radius: 999px; padding: 2px 9px;
                text-decoration: line-through; text-decoration-color: var(--accent);
              }
            `}</style>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'os-constraints',
    number: '04',
    title: 'Constraints and evidence',
    heading: 'Three people, no research function',
    body: (
      <>
        <p style={serifP}>
          The team was deliberately small: one PM, one designer, one developer. No research function, no QA layer,
          no dedicated content or ops support. Every decision about scope, sequencing, and what got tested had to be
          made by three people, which is part of why the app shipped in phases rather than as one complete product: a
          team this size can move fast, but only if it isn't trying to hold the whole thing in its head at once.
        </p>
        <p style={serifP}>
          That size also shaped what "evidence" could mean. There was no room for a formal research process, so
          testing had to be informal, fast, and close to hand.
        </p>

        <h3 style={h3Style}>Small sample, real behaviour</h3>
        <p style={{ ...serifP, marginTop: 10 }}>
          The app was built and designed in phases rather than as one complete flow, which meant each phase could be
          tried out before the next was built on top of it. There was no formal research team or user panel; testing
          happened with friends, family, and people in the founders' network.
        </p>
        <p style={serifP}>
          That's a limited sample, and I'd say so in a review. But it was real behaviour rather than guesswork:
          watching where someone actually hesitated in onboarding is a different kind of signal than assuming it. The
          trust pattern showed up repeatedly, not as something people said outright, but in where they paused, or
          asked "wait, why do you need this," before continuing.
        </p>
        <figure style={{ margin: '28px 0 0 0', border: '1px solid var(--hairline)', padding: '22px 24px' }}>
          <div style={kicker}>Heard in testing</div>
          <blockquote style={{ margin: '12px 0 0 0', fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 26, lineHeight: 1.3, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            “Wait, why do you need this?”
          </blockquote>
        </figure>
        <p style={serifP}>
          The product was new, so there was no earlier flow to measure against and the 90% completion can't be shown
          as a before-and-after. What testing did show was where people hesitated in early versions, and those
          moments are what the final flow removed.
        </p>

        <div style={{ marginTop: 32, paddingLeft: 24, borderLeft: '1px solid var(--hairline)', display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div>
            <div style={noteKicker}>Process</div>
            <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--secondary)', marginTop: 8, maxWidth: '52ch' }}>
              Phase by phase over two months, built from scratch: the IA first, then onboarding and call-blocking,
              then scheduling and appointments. Each phase was tried with people in the founders'
              network before the next was built on top of it.
            </div>
          </div>
          <div>
            <div style={noteKicker}>Principles</div>
            <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--secondary)', marginTop: 8, maxWidth: '52ch', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div>01&nbsp; Required steps configure a phone, never a personality.</div>
              <div>02&nbsp; Prove it works before asking for anything personal.</div>
              <div>03&nbsp; Every irreversible-looking action shows how to undo it.</div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'os-design',
    number: '05',
    title: 'The design logic',
    heading: 'Required is technical. Optional is personal.',
    body: (
      <>
        <p style={serifP}>
          Onboarding asks for two different things, and only one of them is required. Sign-up itself is a name, an
          OTP and a choice of voice: the minimum any phone app needs to exist, and nothing a user hasn't given a
          dozen other apps. Getting Tanya answering calls then takes three technical steps: turn off Live Voicemail
          so we can pick up what's missed, activate call forwarding with a one-time carrier code, allow
          notifications so a handled call surfaces back to the user. None of this asks the user to trust the AI yet.
          It asks them to configure a phone.
        </p>
        <p style={serifP}>
          Everything that actually involves trust (recording a voice, setting rules, teaching it facts about a
          business) sits on the last onboarding screen as optional cards under "Teach Tanya", below a heading that
          already says OSMO is answering, and beside an "I'll do these later" exit that carries the same weight as
          the primary action. A user reaches their calls before a single rule has been set. The app works first. The
          user decides how much of themselves to hand over, and when.
        </p>
        <p style={serifP}>
          That ordering is the actual answer to the trust problem: rather than asking for less information up front,
          the design removes the requirement to give any information at all before the product proves it works.
        </p>
      </>
    ),
  },
  {
    id: 'os-after',
    number: '06',
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

        <h3 style={h3Style}>In control, without having to configure anything up front</h3>
        <p style={{ ...serifP, marginTop: 10 }}>
          "Needs you" holds only the calls still waiting on a decision. The user accepts or declines each one. "All
          calls" is the full log, so nothing is hidden, but nothing demands attention that doesn't need it.
        </p>
        <p style={serifP}>
          The rules screen proposes rules from calls Tanya has already handled, so accepting or declining a proposed
          rule is the whole job; the user is never asked to write a rule from a blank screen. The Tanya tab is the
          permanent home for voice, rules and facts, so the optional layer from onboarding stays reachable long after
          onboarding ends.
        </p>
        <CallLoopDiagram />
        <p style={serifP}>
          The idea running through all of it: the user stays in control without having to configure anything up
          front. Control is available whenever they want it, never required before the app is useful.
        </p>
        <p style={serifP}>
          The next step is letting users correct Tanya directly from a call, so fixing a mistake works the same way
          as accepting a proposed rule.
        </p>

        <h3 style={h3Style}>Open questions for the next phase</h3>
        <p style={{ ...serifP, marginTop: 10 }}>
          Onboarding solved getting Tanya answering, and the next section sketches what she says when a call goes
          wrong. One question is still open: how an urgent call reaches the user faster than the log. It needs the
          same principle as onboarding: when in doubt, hand back to the user rather than guess.
        </p>
      </>
    ),
  },
  {
    id: 'os-responsible',
    number: '07',
    title: 'Responsible AI',
    heading: 'When in doubt, hand back to the user rather than guess',
    body: (
      <>
        <div style={{ marginTop: -4, marginBottom: 4 }}>
          <EvidenceChip label="Proposed call flows: exploration, not shipped" />
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

        <h3 style={{ ...h3Style, marginTop: 40 }}>The caller didn't choose any of this</h3>
        <p style={{ ...serifP, marginTop: 10 }}>
          Every design decision so far is about the person who owns the phone. The other person on the call didn't
          choose OsmO, didn't set it up, and doesn't see any of the screens above.
        </p>
        <p style={serifP}>
          Tanya answers as the user's assistant, not as the user: "He's busy right now. Can I take a message?" The
          caller hears someone speaking on the user's behalf, not an imitation of them.
        </p>
        <p style={serifP}>
          How callers are told they're speaking to an AI, and how call recordings and consent are handled, are
          questions I'd want answered before any wider launch; they matter as much as anything the user sees.
        </p>
      </>
    ),
  },
  {
    id: 'os-screens',
    number: '08',
    title: 'The screens',
    heading: 'Onboarding, Teach Tanya and the live prototype',
    body: (
      <>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', marginTop: 24 }}>
          <div>
            <ScaledPhone width={230} height={484} scale={0.56}>
              <OsmoOnboardingFlow startView="welcome" />
            </ScaledPhone>
            <div style={caption}>01 · The value prop, before any ask. One claim, one proof (Tanya mid-call, saying the line we actually use) and nothing on the screen to choose.</div>
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
            <div style={caption}>03 · The carrier code from the source file, copyable, with an honest "how it works", including how to undo it.</div>
          </div>
          <div>
            <ScaledPhone width={230} height={484} scale={0.56}>
              <OsmoOnboardingFlow startView="concierge" />
            </ScaledPhone>
            <div style={caption}>04 · Picking a voice agent: English or Hindi, Rahul or Tanya. Identity and verification only; nothing here asks the user to trust an AI yet.</div>
          </div>
        </div>

        <h3 style={{ ...h3Style, marginTop: 40 }}>Teach Tanya</h3>
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
          <ScaledPhone width={272} height={572} scale={0.66}>
            <OsmoOnboardingFlow startView="done" />
          </ScaledPhone>
        </div>
        <div style={{ ...caption, maxWidth: '100%', textAlign: 'center' }}>
          The end of onboarding. Tanya is already answering; the three things that need trust sit below as optional
          cards, with "I'll do these later" as a first-class exit.
        </div>

        <div style={{ borderTop: '1px solid var(--ink)', marginTop: 48, paddingTop: 24 }}>
          <div style={kicker}>Live prototype</div>
          <h3 style={{ ...h3Style, marginTop: 10 }}>Walk the flow yourself</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start', justifyContent: 'center', marginTop: 24 }}>
            <ScaledPhone width={328} height={691} scale={0.8}>
              <OsmoOnboardingFlow />
            </ScaledPhone>
            <div style={{ flex: '1 1 260px', minWidth: 240, paddingTop: 4 }}>
              <p style={{ ...serifP, marginTop: 0 }}>
                Start at the splash. The value-prop screen makes one claim and proves it (Tanya mid-call, saying
                the line we actually use) with nothing on it to choose. Then a first name, an OTP and a voice
                pick: identity and verification, the table stakes any phone app needs. Then three technical steps,
                each a phone setting rather than a question about you.
              </p>
              <p style={serifP}>
                Onboarding ends with OsmO already answering, before a single thing about how you want us to
                behave has been asked, and hands you into Ask AI, where the suggested asks sit at the top of the
                screen instead of hiding beside the input. The Teach Tanya rows stay optional either way; the rules
                screen proposes from calls we have already handled, so accepting or declining is the whole job.
              </p>
              <p style={serifP}>
                Carry on to Calls, where "Needs you" holds only the calls still waiting on a decision (accept or
                decline each one) and "All calls" is the full log. The Tanya tab is where our voice, rules and
                facts live permanently: the optional layer keeps a front door long after onboarding ends.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'os-status',
    number: '09',
    title: "Status and what's next",
    heading: 'Shipped, and the conversion held',
    body: (
      <>
        <p style={serifP}>
          Onboarding completion settled at 90%. In its first 60 days OsmO handled an average of around 1,000 calls a
          day, grew to roughly 2,000 downloads, and converted 93 users to its $10/month paid tier, a 4.65%
          free-to-paid conversion rate.
        </p>
        <p style={serifP}>
          I'd be careful about the causal claim. 90% completion is the number I'd defend most readily: it measures
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

        <div style={tintBox}>
          <div style={tintKicker}>What's next: a trust ladder</div>
          <h3 style={{ ...h3Style, fontSize: 21, marginTop: 12 }}>Autonomy the user grants, one step at a time</h3>
          <div style={{ marginTop: 14, marginBottom: 4 }}>
            <EvidenceChip label="Exploration, not shipped" />
          </div>
          <p style={{ ...serifP, maxWidth: '62ch' }}>
            Tanya starts with limited autonomy, taking messages only. As the user reviews and approves how she handles
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
        </div>
      </>
    ),
  },
];

// Users and Scope sit with the summary below the header.
const allMeta = [
        { label: 'Role', value: 'Sole product designer' },
        { label: 'Team', value: '1 PM, 1 designer, 1 developer' },
        { label: 'Timeframe', value: '~2 months, shipped in phases' },
        { label: 'Platform', value: 'iOS and Android' },
        { label: 'Users', value: "People who miss calls they can't afford to miss: small business owners, freelancers, anyone screening a busy line" },
        { label: 'Scope', value: 'Owned the product model, the IA, onboarding and every screen. Did not own the voice engine, the call infrastructure or the brand; the name and logo came fixed.' },
      ];
const contextMeta = allMeta.filter((m) => ['Users', 'Scope'].includes(m.label));

// Key phrase in each card is set darker and heavier so a skim picks up the point. Wording unchanged.
const em: React.CSSProperties = { color: 'var(--ink)', fontWeight: 500 };

const summaryItems: { label: string; color: string; text: ReactNode }[] = [
  {
    label: 'Problem',
    color: 'var(--accent)',
    text: (
      <>
        Let someone hand their phone over to an assistant that answers, screens, and books on their behalf, and{' '}
        <strong style={em}>trust it enough to actually turn it on.</strong>
      </>
    ),
  },
  {
    label: 'What I did',
    color: 'var(--accent)',
    text: (
      <>
        I built OsmO from scratch: <strong style={em}>the information architecture</strong>,{' '}
        <strong style={em}>the onboarding and call-blocking flows</strong>, then scheduling and appointments, phase by
        phase.
      </>
    ),
  },
  {
    label: 'Result',
    color: 'var(--sky-deep)',
    text: (
      <>
        <strong style={em}>Onboarding completion settled at 90%.</strong> In its first 60 days OsmO handled an average
        of around 1,000 calls a day, grew to roughly 2,000 downloads, and converted 93 users to its $10/month paid tier,
        a <strong style={em}>4.65% free-to-paid conversion rate.</strong>
      </>
    ),
  },
];

export default function OsmoAiCallAssistant() {
  return (
    <CaseStudyLayout
      kicker="OsmO · AI call assistant · 2026"
      title="Designing trust into an AI that answers your phone"
      summary="OsmO screens calls, takes messages, and handles bookings on your behalf. I designed a 3-step onboarding flow that gets users to a live assistant in minutes."
      meta={[]}
      headerFooter={
        <div style={{ marginTop: 48 }}>
          <div className="os-head-grid">
            {metrics.map((m) => (
              <div key={m.label}>
                <div style={{ fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--sky)', lineHeight: 1, whiteSpace: 'nowrap' }}>{m.value}</div>
                <div style={{ ...kicker, fontSize: 12, marginTop: 10, whiteSpace: 'nowrap' }}>{m.label}</div>
              </div>
            ))}
          </div>
          <dl className="os-head-grid" style={{ margin: '40px 0 0 0', padding: '18px 0', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
            {headerFacts.map((m) => (
              <div key={m.label}>
                <dt style={{ ...kicker, fontSize: 12 }}>{m.label}</dt>
                <dd style={{ margin: '6px 0 0 0', fontSize: 15, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{m.value}</dd>
              </div>
            ))}
          </dl>
          <style>{`
            .os-head-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px 24px; }
            @media (min-width: 760px) {
              .os-head-grid { grid-template-columns: repeat(4, 1fr); }
            }
          `}</style>
        </div>
      }
      hero={
        <div>
          <div style={kicker}>30-second summary</div>
          <ul className="os-summary" style={{ listStyle: 'none', padding: 0, margin: '18px 0 0 0', display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            {summaryItems.map((item, i) => (
              <li key={item.label} style={{ background: '#FFFFFF', border: '1px solid var(--hairline)', borderTop: `3px solid ${item.color}`, padding: '20px 22px 22px', boxShadow: '0 1px 2px rgba(23,26,24,0.04)' }}>
                <div style={{ ...kicker, color: item.color, display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--muted)' }}>0{i + 1}</span>
                  {item.label}
                </div>
                <p style={{ ...serifP, fontSize: 17, lineHeight: 1.6, margin: '12px 0 0 0' }}>{item.text}</p>
              </li>
            ))}
          </ul>
          <dl className="os-context" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px 40px', margin: '32px 0 0 0' }}>
            {contextMeta.map((m) => (
              <div key={m.label}>
                <dt style={kicker}>{m.label}</dt>
                <dd style={{ margin: '6px 0 0 0', fontSize: 15, lineHeight: 1.5, color: 'var(--ink)', maxWidth: '60ch' }}>{m.value}</dd>
              </div>
            ))}
          </dl>
          <style>{`
            @media (min-width: 900px) {
              .os-summary { grid-template-columns: repeat(3, 1fr) !important; }
              .os-context { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>
        </div>
      }
      headerAside={
        <ScaledPhone width={322} height={677} scale={0.78}>
          <OsmoOnboardingFlow startView="welcome" />
        </ScaledPhone>
      }
      railExtra={
        <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {metrics.map((m) => (
            <div key={m.label}>
              <div style={{ fontSize: 20, fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--lilac-deep)', lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--muted)', marginTop: 6, lineHeight: 1.35 }}>{m.label}</div>
            </div>
          ))}
        </div>
      }
      overview={{ id: 'os-overview', number: '01', title: 'Overview' }}
      sections={sections}
      prev={{ kicker: 'Next case study', label: 'Wells Fargo: financial health tools', to: '/work/wells-fargo-financial-health' }}
      next={{ kicker: 'Back to', label: 'All work', to: '/' }}
    />
  );
}
