import { Link } from 'react-router-dom';

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--muted)',
};

export default function Contact() {
  return (
    <main style={{ margin: '0 auto', maxWidth: 1344, padding: '0 clamp(20px, 5vw, 72px) 112px' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '48px 64px',
          justifyContent: 'space-between',
          padding: '96px 0 56px 0',
          borderBottom: '1px solid var(--ink)',
        }}
      >
        <div style={{ flex: '1 1 460px', maxWidth: 620 }}>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontSize: 'clamp(34px, 4.2vw, 58px)',
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
              margin: 0,
              maxWidth: '18ch',
            }}
          >
            <span style={{ color: 'var(--accent)' }}>Want</span> to work together?
          </h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 19, lineHeight: 1.7, color: 'var(--secondary)', margin: '28px 0 0 0', maxWidth: '52ch' }}>
            Hit me up and we'll take it from there. A project, a question, or just something you're stuck on — all
            welcome.
          </p>
        </div>
        <div style={{ flex: '0 1 340px', alignSelf: 'flex-end' }}>
          <div style={kicker}>Based in</div>
          <div style={{ fontSize: 17, color: 'var(--ink)', marginTop: 10 }}>Bengaluru, India · IST</div>
        </div>
      </div>

      <section style={{ padding: '44px 0 0 0' }}>
        <div style={kicker}>Get in touch</div>
        <a
          href="mailto:khubi.brahmbhatt@gmail.com"
          style={{ display: 'inline-block', fontSize: 'clamp(24px, 4.4vw, 54px)', fontWeight: 400, letterSpacing: '-0.035em', marginTop: 18, color: 'var(--ink)' }}
        >
          khubi.brahmbhatt@gmail.com
        </a>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 40px', alignItems: 'baseline', marginTop: 32, borderTop: '1px solid var(--hairline)', paddingTop: 24 }}>
          <a href="https://linkedin.com/in/khubijoshi" target="_blank" rel="noopener" style={{ fontSize: 17 }}>
            LinkedIn
          </a>
          <Link to="/resume" style={{ fontSize: 17 }}>
            Résumé
          </Link>
          <span style={{ flex: '1 1 auto' }} />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--muted)' }}>
            © 2026 Khubi Brahmbhatt
          </span>
        </div>
      </section>
    </main>
  );
}
