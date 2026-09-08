import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/resume', label: 'Résumé' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header style={{ margin: '0 auto', maxWidth: 1344, padding: '0 clamp(20px, 5vw, 72px)', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 24,
          padding: '34px 0 16px 0',
        }}
      >
        <Link to="/" style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.005em', color: 'var(--ink)' }}>
          Khubi Brahmbhatt
        </Link>

        <nav className="nav-links" style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(18px, 3vw, 40px)' }}>
          {links.map((l) => {
            const active = l.to === '/' ? pathname === '/' || pathname.startsWith('/work/') : pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: active ? 'var(--accent)' : 'var(--secondary)',
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 5,
            width: 28,
            height: 28,
            padding: 0,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            alignItems: 'flex-end',
          }}
        >
          <span style={{ display: 'block', width: 20, height: 2, background: 'var(--ink)', transition: 'transform 150ms ease', transform: open ? 'translateY(3.5px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: 20, height: 2, background: 'var(--ink)', opacity: open ? 0 : 1, transition: 'opacity 150ms ease' }} />
          <span style={{ display: 'block', width: open ? 20 : 14, height: 2, background: 'var(--ink)', alignSelf: 'flex-end', transition: 'all 150ms ease', transform: open ? 'translateY(-3.5px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      {open && (
        <div
          className="nav-mobile-panel"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 4,
            paddingBottom: 20,
            borderBottom: '1px solid var(--hairline)',
          }}
        >
          {links.map((l) => {
            const active = l.to === '/' ? pathname === '/' || pathname.startsWith('/work/') : pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  padding: '10px 0',
                  color: active ? 'var(--accent)' : 'var(--ink)',
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .nav-toggle { display: flex !important; }
          .nav-mobile-panel { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
