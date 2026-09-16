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
  desc: string[];
}

const experience: Row[] = [
  {
    date: 'May 2026 — now',
    title: 'Independent Product Design',
    place: 'Freelance · Bengaluru',
    desc: [
      'Took on select freelance product design projects while transitioning to a full-time role, maintaining hands-on craft and staying current with AI-native design tools and workflows.',
    ],
  },
  {
    date: 'Feb 2024 — May 2026',
    title: 'Product Designer',
    place: 'Wells Fargo · Bengaluru',
    desc: [
      'Designed and shipped an AI-powered internal tool (0 → 1) for Product Managers to search code and documentation, with clear uncertainty states and source transparency — delivered in under 3 weeks.',
      'Owned end-to-end redesign of financial health surfaces on the public site and contributed to the enterprise design system, ensuring consistency at scale.',
      'Enhanced bill payments UX and mentored designers while supporting the legacy-to-modern platform migration.',
    ],
  },
  {
    date: 'Jun 2022 — Jan 2024',
    title: 'Product Designer',
    place: 'Cars24 · Bengaluru',
    desc: [
      'Led end-to-end design for the Cars24 dealer app — research through high-fidelity delivery across iOS and Android — improving TAT, NPS, and conversion.',
      'Designed and shipped a secure Challan payment flow (0 → 1) with strong trust states — 16k+ visitors and 4.4k payments in the first 8 days.',
      'Owned the Refer & Earn system (0 → 1, mobile) and optimized the Sell Online flow, contributing to a 21% increase in cars listed on the platform.',
    ],
  },
  {
    date: 'Apr 2021 — Jun 2022',
    title: 'Product Designer',
    place: 'Klubworks · Bengaluru',
    desc: [
      "Led design for Klub's patron platform, translating complex syndicate financing flows into an intuitive, visually consistent product experience.",
      'Redesigned the company website end-to-end, aligning the experience with brand guidelines and improving clarity for prospective patrons.',
    ],
  },
  {
    date: 'Nov 2019 — Apr 2021',
    title: 'UI/UX Designer',
    place: 'Spottabl · Bengaluru',
    desc: [
      'Led design across the admin platform, SaaS hiring product, and consumer platform — establishing one consistent design vocabulary and system across three products.',
      'Owned end-to-end design for social media, marketing assets, and a full website revamp.',
    ],
  },
  {
    date: 'Jun 2019 — Oct 2019',
    title: 'UI/UX Designer',
    place: 'Grexter · Bengaluru',
    desc: [
      'Conceptualized and designed a tenant-friendly dashboard for rent monitoring, event updates, amenities, and community interaction on a co-living platform.',
    ],
  },
];

const skills = [
  {
    label: 'Core',
    value: 'Visual & Interaction Design · Motion Design · Product Thinking · Design Systems · User Research & Usability Testing · Storytelling · Rapid AI Prototyping',
  },
  {
    label: 'Tools',
    value: 'Figma · Figma Make · Principle · ProtoPie / After Effects · Miro · GitHub Copilot · Cursor · Midjourney / other generative AI tools',
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
          <p style={{ fontSize: 16, color: 'var(--secondary)', margin: '14px 0 0 0' }}>Product Designer · Bengaluru · Seven+ years of experience</p>
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

      <section className="r-sec" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px 40px', padding: '40px 0 0 0' }}>
        <div className="r-label" style={{ flex: '0 0 200px', ...kicker, paddingTop: 4 }}>
          Profile
        </div>
        <div style={{ flex: '1 1 620px', display: 'flex', flexWrap: 'wrap', gap: '8px 32px' }}>
          <div style={{ flex: '0 0 150px' }} />
          <p className="r-desc" style={{ flex: '1 1 400px', fontSize: 16, lineHeight: 1.65, color: 'var(--secondary)', margin: 0, maxWidth: 580 }}>
            Product Designer with 7+ years shipping polished, end-to-end product experiences across web and mobile in fintech, marketplace, and SaaS.
            Operating at senior scope — owning 0-to-1 initiatives, mentoring designers, and driving design system decisions across cross-functional teams.
            Fluent with modern AI-native design workflows, and recently designed an AI-powered internal tool at Wells Fargo. Based in Bengaluru and
            available immediately.
          </p>
        </div>
      </section>

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
                <ul className="r-desc" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--secondary)', margin: '8px 0 0 0', paddingLeft: 18, maxWidth: 598 }}>
                  {row.desc.map((line) => (
                    <li key={line} style={{ marginTop: 4 }}>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="r-sec" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px 40px', borderTop: '1px solid var(--ink)', marginTop: 48, padding: '40px 0 0 0' }}>
        <div className="r-label" style={{ flex: '0 0 200px', ...kicker, paddingTop: 6 }}>
          Skills
        </div>
        <div style={{ flex: '1 1 620px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {skills.map((s) => (
            <div key={s.label} style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 32px' }}>
              <div style={{ flex: '0 0 150px', fontSize: 15, color: 'var(--muted)' }}>{s.label}</div>
              <div style={{ flex: '1 1 400px', fontSize: 15, lineHeight: 1.6, color: 'var(--secondary)', maxWidth: 580 }}>{s.value}</div>
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
          <a href="tel:+917834087249" style={{ fontSize: 17 }}>
            +91 78340 87249
          </a>
          <a href="https://khubi.online" target="_blank" rel="noopener" style={{ fontSize: 17 }}>
            khubi.online
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
