import './Resume.css';

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--muted)',
};

interface Row {
  date: string;
  title: string;
  place: string;
  desc: string;
}

const experience: Row[] = [
  {
    date: 'May 2026 — now',
    title: 'Independent product design',
    place: 'Bangalore · Freelance',
    desc: 'Taking selected freelance projects. Available immediately for full-time roles.',
  },
  {
    date: 'Feb 2024 — Apr 2026',
    title: 'Product designer',
    place: 'Wells Fargo · Bengaluru',
    desc: 'Financial health tools, an internal AI tool for product managers, and the public site. Rebuilt the bill payments UX for task completion, mentored designers and supported the legacy-to-modern platform migration.',
  },
  {
    date: 'Jun 2022 — Jan 2024',
    title: 'Product designer',
    place: 'Cars24 · Bengaluru',
    desc: 'Led end-to-end design for the Cars24 dealer app — research, usability testing, implementation — improving TAT, NPS and conversion. Also shipped the Sell Online flow and a secure Challan payment flow.',
  },
  {
    date: 'Apr 2021 — Jun 2022',
    title: 'Product designer',
    place: 'Klub · Bengaluru',
    desc: "Led design for Klub's patron platform. Revamped the company website against the brand guidelines.",
  },
  {
    date: 'Nov 2019 — Apr 2021',
    title: 'UI/UX designer',
    place: 'Spottabl',
    desc: 'Led design across the admin platform, the SaaS hiring product and the consumer site, plus a full website revamp and marketing design.',
  },
  {
    date: 'Jun 2019 — Oct 2019',
    title: 'UI/UX designer',
    place: 'Grexter',
    desc: 'Conceived and designed a tenant dashboard for a co-living platform: rent monitoring, amenities, events and community.',
  },
];

export default function Resume() {
  return (
    <main className="resume-sheet" style={{ margin: '0 auto', maxWidth: 1344, padding: '0 clamp(20px, 5vw, 72px) 112px' }}>
      <div
        className="r-head"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px 40px',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '88px 0 24px 0',
          borderBottom: '1px solid var(--ink)',
        }}
      >
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(32px, 3.8vw, 50px)', lineHeight: 1.06, letterSpacing: '-0.035em', margin: 0 }}>
            <span style={{ color: 'var(--accent)' }}>Résumé</span>
          </h1>
          <p style={{ fontSize: 16, color: 'var(--secondary)', margin: '14px 0 0 0' }}>Product designer · Bangalore · Seven years</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
          <span style={kicker}>Updated September 2026</span>
          <a
            href="/assets/Khubi_Joshi_Resume.pdf"
            download
            className="no-print"
            style={{
              fontFamily: 'var(--font-head)',
              fontSize: 15,
              color: 'var(--accent)',
              background: 'transparent',
              border: '1px solid var(--ink)',
              padding: '13px 22px',
              display: 'inline-block',
            }}
          >
            Download PDF
          </a>
        </div>
      </div>

      <section className="r-sec" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px 40px', padding: '10px 0 0 0' }}>
        <div className="r-label" style={{ flex: '0 0 200px', ...kicker, paddingTop: 36 }}>
          Experience
        </div>
        <div style={{ flex: '1 1 620px' }}>
          {experience.map((row, i) => (
            <div
              key={row.title + row.date}
              className="r-row"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px 32px',
                padding: i === experience.length - 1 ? '30px 0 0 0' : '30px 0',
                borderBottom: i === experience.length - 1 ? 'none' : '1px solid var(--hairline)',
              }}
            >
              <div style={{ flex: '0 0 150px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', paddingTop: 5 }}>{row.date}</div>
              <div style={{ flex: '1 1 400px' }}>
                <div className="r-title" style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em' }}>
                  {row.title}
                </div>
                <div style={{ fontSize: 15, color: 'var(--muted)', marginTop: 8 }}>{row.place}</div>
                <p className="r-desc" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--secondary)', margin: '8px 0 0 0', maxWidth: '62ch' }}>
                  {row.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="r-sec" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px 40px', borderTop: '1px solid var(--ink)', marginTop: 48, padding: '40px 0 0 0' }}>
        <div className="r-label" style={{ flex: '0 0 200px', ...kicker, paddingTop: 6 }}>
          Education
        </div>
        <div style={{ flex: '1 1 620px', display: 'flex', flexWrap: 'wrap', gap: '8px 32px' }}>
          <div style={{ flex: '0 0 150px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', paddingTop: 5 }}>2015 — 2019</div>
          <div style={{ flex: '1 1 400px' }}>
            <div className="r-title" style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em' }}>
              B.Des, Communication Design
            </div>
            <div style={{ fontSize: 15, color: 'var(--muted)', marginTop: 8 }}>National Institute of Fashion Technology (NIFT)</div>
          </div>
        </div>
      </section>

      <section className="r-sec" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px 40px', borderTop: '1px solid var(--ink)', marginTop: 48, padding: '40px 0 0 0' }}>
        <div className="r-label" style={{ flex: '0 0 200px', ...kicker, paddingTop: 6 }}>
          Speaking &amp; writing
        </div>
        <div style={{ flex: '1 1 620px' }}>
          <div className="r-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 32px', paddingBottom: 18, borderBottom: '1px solid var(--hairline)' }}>
            <div style={{ flex: '0 0 150px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>2026</div>
            <div style={{ flex: '1 1 400px', fontSize: 16 }}>
              <a href="https://medium.com/@khubi.brahmbhatt/designing-in-the-age-of-instant-answers-9fb5a3dec812" target="_blank" rel="noopener">
                Designing in the age of instant answers
              </a>{' '}
              — <span style={{ color: 'var(--muted)' }}>Medium</span>
            </div>
          </div>
        </div>
      </section>

      <section className="r-sec" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px 40px', borderTop: '1px solid var(--ink)', marginTop: 48, padding: '40px 0 0 0' }}>
        <div className="r-label" style={{ flex: '0 0 200px', ...kicker, paddingTop: 4 }}>
          Contact
        </div>
        <div style={{ flex: '1 1 620px', display: 'flex', flexWrap: 'wrap', gap: '12px 40px', alignItems: 'baseline' }}>
          <a href="mailto:khubi.brahmbhatt@gmail.com" style={{ fontSize: 17 }}>
            khubi.brahmbhatt@gmail.com
          </a>
          <a href="https://linkedin.com/in/khubijoshi" style={{ fontSize: 17 }}>
            LinkedIn
          </a>
          <span style={{ fontSize: 17, color: 'var(--muted)' }}>Bengaluru, India</span>
        </div>
      </section>
    </main>
  );
}
