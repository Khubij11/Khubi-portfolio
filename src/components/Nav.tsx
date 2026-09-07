import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/resume', label: 'Résumé' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const { pathname } = useLocation();
  return (
    <header style={{ margin: '0 auto', maxWidth: 1344, padding: '0 clamp(20px, 5vw, 72px)' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 24,
          padding: '34px 0 16px 0',
        }}
      >
        <Link
          to="/"
          style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.005em', color: 'var(--ink)' }}
        >
          Khubi Brahmbhatt
        </Link>
        <nav style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(18px, 3vw, 40px)', flexWrap: 'wrap' }}>
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
      </div>
    </header>
  );
}
