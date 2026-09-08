import { Link } from 'react-router-dom';

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--muted)',
};

const bodyP: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 300,
  fontSize: 19,
  lineHeight: 1.7,
  color: 'var(--secondary)',
  margin: 0,
  maxWidth: '60ch',
};

const skills: [string, string][] = [
  ['End-to-end product design', 'Seven years'],
  ['Interaction design', 'Seven years'],
  ['Design systems', 'Three years'],
  ['User research & usability testing', 'Five years'],
  ['UX strategy', 'Five years'],
  ['Mentoring designers', 'Three years'],
];

export default function About() {
  return (
    <main style={{ margin: '0 auto', maxWidth: 1344, padding: '0 clamp(20px, 5vw, 72px) 112px' }}>
      <div style={{ position: 'relative', padding: '76px 24px 0 24px', margin: '0 calc(-1 * clamp(20px, 5vw, 72px))', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            right: '-2%',
            top: 26,
            width: 'clamp(140px, 15vw, 210px)',
            aspectRatio: '1',
            borderRadius: '50%',
            backgroundImage: 'repeating-linear-gradient(58deg, rgba(190,66,41,0.5) 0 7px, rgba(190,66,41,0) 7px 17px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '-34%',
            top: 520,
            width: '40%',
            maxWidth: 280,
            aspectRatio: '1.6 / 1',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(123,166,201,0.18), rgba(123,166,201,0) 76%)',
            filter: 'blur(18px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-6%',
            top: 260,
            width: '44%',
            aspectRatio: '1.3 / 1',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(12,129,57,0.26), rgba(12,129,57,0) 74%)',
            filter: 'blur(24px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '22%',
            bottom: '-4%',
            width: '40%',
            aspectRatio: '2 / 1',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(190,66,41,0.14), rgba(190,66,41,0) 74%)',
            filter: 'blur(22px)',
          }}
        />

        <h1
          style={{
            position: 'relative',
            fontFamily: 'var(--font-serif)',
            fontWeight: 300,
            fontSize: 'clamp(34px, 4.6vw, 66px)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: 0,
            maxWidth: '24ch',
            color: 'var(--ink)',
          }}
        >
          <span style={{ color: 'var(--accent)' }}>A</span> little glimpse of me
        </h1>

        <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '48px 64px', marginTop: 64 }}>
          <div style={{ flex: '1 1 300px', minWidth: 0, maxWidth: 640 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={bodyP}>
                Graduated in communication design from NIFT Kangra, then gravitated toward product design because it
                brought those foundational design-research learnings into a space that touches millions of lives.
              </p>
              <p style={bodyP}>
                I don't believe in rigid, cookie-cutter frameworks. I adapt the process to the problem — moving
                fluidly between deep research on complex projects and fast, intuitive execution when the timeline
                demands it.
              </p>
              <p style={bodyP}>
                These days I run AI across the whole workflow, to strip out early-stage friction and raise the
                quality of what actually ships.
              </p>
            </div>
            <div style={{ marginTop: 40 }}>
              <div style={kicker}>Off the screen</div>
              <p style={{ ...bodyP, marginTop: 12 }}>
                I <span style={{ color: 'var(--accent)' }}>design</span>, <span style={{ color: 'var(--sky-deep)' }}>bake</span> and{' '}
                <span style={{ color: 'var(--green)' }}>garden</span>. The cakes are a solved problem; the coriander remains a
                live issue.
              </p>
            </div>
          </div>

          <div style={{ flex: '1 1 380px', maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 44 }}>
            <div
              style={{
                position: 'relative',
                width: '78%',
                marginTop: -34,
                padding: '12px 12px 24px 12px',
                background: 'linear-gradient(168deg, #FBFAF7 0%, #F1EFE9 100%)',
                boxShadow: '0 30px 46px -30px rgba(23,26,24,0.4), inset 0 1px 0 rgba(255,255,255,0.9)',
                transform: 'rotate(-1.2deg)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -12,
                  left: '46%',
                  transform: 'translateX(-50%) rotate(3deg)',
                  width: 104,
                  height: 24,
                  background: 'rgba(190,66,41,0.16)',
                  borderLeft: '1px dashed rgba(190,66,41,0.35)',
                  borderRight: '1px dashed rgba(190,66,41,0.35)',
                }}
              />
              <img
                src="/assets/khubi-portrait.jpeg"
                alt="Khubi at Lake Kawaguchi, cherry blossom and Mount Fuji behind her"
                style={{ width: '100%', aspectRatio: '3 / 4', objectFit: 'cover', display: 'block', background: '#E6EDF2' }}
              />
            </div>

            <div>
              <div style={{ ...kicker, borderBottom: '1px solid var(--ink)', paddingBottom: 12 }}>What I do</div>
              {skills.map(([label, years]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--hairline)' }}>
                  <span style={{ fontSize: 15 }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>{years}</span>
                </div>
              ))}
            </div>

            <div>
              <div style={{ ...kicker, borderBottom: '1px solid var(--ink)', paddingBottom: 12 }}>Sectors</div>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--secondary)', margin: '14px 0 0 0' }}>
                Fintech, banking and marketplaces — Wells Fargo, Cars24, Klub. Regulated products and two-sided ones,
                which fail in different ways.
              </p>
            </div>

            <div>
              <div style={{ ...kicker, borderBottom: '1px solid var(--ink)', paddingBottom: 12 }}>Tools</div>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--secondary)', margin: '14px 0 0 0' }}>
                Figma · FigJam · Notion · Maze — plus an AI stack: Claude for research and system mapping, v0 and
                Lovable for putting UI concepts in front of people fast. It fast-tracks early exploration and closes
                the gap between design and front-end, while the fundamentals stay where they belong.
              </p>
            </div>

            <div>
              <div style={kicker}>Next</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14, alignItems: 'flex-start' }}>
                <Link to="/resume" style={{ fontSize: 19, letterSpacing: '-0.01em' }}>
                  Read the résumé →
                </Link>
                <Link to="/contact" style={{ fontSize: 19, letterSpacing: '-0.01em' }}>
                  Get in touch →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
