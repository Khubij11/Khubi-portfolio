import { useEffect, useRef, useState, type ReactNode } from 'react';

const DESIGN_WIDTH = 1200;
const DESIGN_HEIGHT = 760;

/** Scales a fixed 1200x760 design canvas to fit the width of its container, matching
 * the source's `transform: scale(n)` technique but recomputing the scale on resize so
 * it never clips content on narrower (e.g. mobile) viewports. */
export function ScaleFrame({ maxWidth, children }: { maxWidth?: number; children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const update = () => setScale(outer.clientWidth / DESIGN_WIDTH);
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    update();
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={outerRef}
      style={{
        width: '100%',
        maxWidth,
        height: DESIGN_HEIGHT * scale,
        margin: maxWidth ? '0 auto' : undefined,
        overflow: 'hidden',
        border: '1px solid #D9E1E6',
      }}
    >
      <div style={{ width: DESIGN_WIDTH, height: DESIGN_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
    </div>
  );
}

export const SCREEN_ROOT: React.CSSProperties = {
  width: 1200,
  height: 760,
  background: '#F7F8FC',
  fontFamily: 'Montserrat, Helvetica, sans-serif',
  color: '#1A1D2E',
  display: 'flex',
};

export const SCREEN_ROOT_COL: React.CSSProperties = {
  ...SCREEN_ROOT,
  flexDirection: 'column',
};

export function Avatar({ initials, size = 28 }: { initials: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#1E30A1',
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 auto',
      }}
    >
      {initials}
    </div>
  );
}

/** The 56px breadcrumb-style top bar used across several sub-screens: `A / B` on the left,
 * an avatar on the right. */
export function BreadcrumbBar({ crumbs, avatarInitials }: { crumbs: string[]; avatarInitials: string }) {
  return (
    <div
      style={{
        flex: '0 0 56px',
        background: '#FFFFFF',
        borderBottom: '1px solid #E7E9F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
      }}
    >
      <div style={{ fontSize: 13, color: '#6B7089' }}>
        {crumbs.map((c, i) => (
          <span key={i}>
            {i > 0 && <span style={{ color: '#C4C8D8' }}> / </span>}
            <span style={i === crumbs.length - 1 ? { color: '#1A1D2E', fontWeight: 600 } : undefined}>{c}</span>
          </span>
        ))}
      </div>
      <Avatar initials={avatarInitials} />
    </div>
  );
}

/** Small rounded company-logo badge, as used on job cards. */
export function LogoBadge({ src, alt, size = 44, radius = 10 }: { src: string; alt: string; size?: number; radius?: number }) {
  return (
    <div
      style={{
        flex: `0 0 ${size}px`,
        width: size,
        height: size,
        borderRadius: radius,
        overflow: 'hidden',
        border: '1px solid #E7E9F5',
        background: '#FFFFFF',
      }}
    >
      <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  );
}
