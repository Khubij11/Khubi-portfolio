import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WorkRow, { WorkTableHeader, type WorkRowData } from '../components/WorkRow';

// Ordered by priority: OsmO, then the two Wells Fargo projects, then the rest.
const allWork: WorkRowData[] = [
  {
    year: '2026',
    title: 'OsmO: AI call assistant',
    owned: 'Owned the product model, the IA, onboarding and every screen, not the voice engine or call infrastructure.',
    platform: 'iOS · Android',
    domain: 'AI / conversational',
    outcome: '90% onboarding completion; 4.65% free-to-paid conversion',
    evidence: 'Shipped · measured',
    to: '/work/osmo-ai-call-assistant',
    thumb: { src: '/assets/thumbs/osmo.jpg', kind: 'phone', tint: ['#EFE8FB', '#D9CCF5'] },
    tags: ['0 → 1'],
  },
  {
    year: '2024–26',
    title: 'Wells Fargo: financial health tools',
    owned: 'Owned the financial health surfaces end to end, not the scoring behind them.',
    platform: 'Web · Enterprise',
    domain: 'Fintech',
    outcome: 'Section usage up 1.2% after launch',
    evidence: 'Shipped · measured',
    to: '/work/wells-fargo-financial-health',
    thumb: { src: '/assets/thumbs/wf-financial-health.jpg', kind: 'web', tint: ['#F7E6E1', '#EFD3CA'] },
    tags: ['Complex data'],
  },
  {
    year: '2025',
    title: 'Wells Fargo: AI tool for PMs',
    owned: 'Owned the flow and the screens, not retrieval, indexing or model behaviour.',
    platform: 'Web · Internal',
    domain: 'AI / enterprise tools',
    outcome: 'An answer a PM can repeat out loud',
    evidence: 'Shipped internally',
    to: '/work/wells-fargo-ai-tool',
    thumb: { src: '/assets/thumbs/wf-ai-tool.jpg', kind: 'web', tint: ['#F3ECE6', '#E5D8CC'] },
    tags: ['Complex data', '0 → 1'],
  },
  {
    year: '2022',
    title: 'Cars24: Challan payments',
    owned: 'Owned the payment flow end to end, including trust states.',
    platform: 'iOS · Android',
    domain: 'Automotive / payments',
    outcome: '16,193 visitors in the first 8 days; 4,422 challans paid',
    evidence: 'Shipped · measured',
    to: '/work/cars24-challans',
    thumb: { src: '/assets/thumbs/cars24-challans.jpg', kind: 'phone', tint: ['#FCEBDD', '#F5D2B4'] },
    tags: ['0 → 1'],
  },
  {
    year: '2023',
    title: 'Cars24: Refer & Earn',
    owned: 'Owned lead submission and the status system, not rates or valuation.',
    platform: 'iOS · Android',
    domain: 'Automotive / referrals',
    outcome: 'Cars on platform up 21%',
    evidence: 'Shipped · measured',
    to: '/work/cars24-refer-earn',
    thumb: { src: '/assets/thumbs/cars24-refer-earn.jpg', kind: 'phone', tint: ['#E2EBF7', '#C6D6EC'] },
    tags: ['0 → 1'],
  },
  {
    year: '2021–22',
    title: 'Klub: syndicates on the patron platform',
    owned: 'Productised the syndicate flow inside the existing patrons app, without disrupting it.',
    platform: 'Web app',
    domain: 'Fintech / investing',
    outcome: 'Offline syndicate deals made self-serve',
    evidence: 'Shipped',
    to: '/work/klub',
    thumb: { src: '/assets/thumbs/klub.jpg', kind: 'web', tint: ['#E4E8F5', '#CBD3EC'] },
    tags: ['Complex data'],
  },
  {
    year: '2019–21',
    title: 'Spottabl: three sides, one pipeline',
    owned: 'Design across the admin platform, the SaaS hiring product and the consumer site.',
    platform: 'Web',
    domain: 'HR tech / hiring',
    outcome: 'One vocabulary across three products',
    evidence: 'Shipped',
    to: '/work/spottabl',
    thumb: { src: '/assets/thumbs/spottabl.jpg', kind: 'web', tint: ['#EBE9F8', '#D6D2F0'] },
    tags: ['Systems & scale'],
  },
];

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--muted)',
};

const GARDEN_PHOTOS = [
  { src: '/assets/garden-hibiscus.jpg', alt: 'Pink hibiscus in a terracotta pot' },
  { src: '/assets/garden-lily.jpg', alt: 'White lily in bloom on the balcony' },
  { src: '/assets/garden-poinsettia.jpg', alt: 'Poinsettia leaves turning red' },
];

const BAKE_PHOTOS = [
  { src: '/assets/bake-chocolate.jpg', alt: 'Chocolate cake topped with strawberries and wafer rolls' },
  { src: '/assets/bake-cheesecake.jpg', alt: 'Baked cheesecake with strawberry compote and mint' },
  { src: '/assets/bake-muffins.jpg', alt: 'Strawberry cream cheese muffins with fresh strawberries' },
];

// Travel: two vintage-style postage stamps from trips, tucked above the bowl.
const STAMPS = [
  { place: 'Bali', src: '/assets/scene/stamp-bali.png', cls: 'otc-stamp-a' },
  { place: 'Japan', src: '/assets/scene/stamp-japan.png', cls: 'otc-stamp-b' },
  { place: 'Dubai', src: '/assets/scene/stamp-dubai.png', cls: 'otc-stamp-c' },
];

function TravelStamps() {
  return (
    <div className="otc-stamps" aria-label="Travel stamps from Bali, Japan and Dubai" role="img">
      {STAMPS.map((t) => (
        <img key={t.place} className={`otc-stamp ${t.cls}`} src={t.src} alt="" />
      ))}
    </div>
  );
}

// Design tools: app tiles fan out of the pencil cup on hover or tap, like the photo tiles.
const TOOL_TILES = [
  {
    name: 'Figma',
    icon: (
      <svg viewBox="0 0 38 57" width="20" height="30" aria-hidden="true">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
      </svg>
    ),
  },
  {
    name: 'Claude',
    icon: (
      <svg viewBox="-12 -12 24 24" width="30" height="30" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="0" y1="0" x2="0" y2={i % 2 ? -8.5 : -10.5} stroke="#D97757" strokeWidth="2.4" strokeLinecap="round" transform={`rotate(${i * 30})`} />
        ))}
      </svg>
    ),
  },
  {
    name: 'Notion',
    icon: (
      <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="4" fill="#FFFFFF" stroke="#171A18" strokeWidth="2" />
        <text x="14" y="20.5" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="16" fill="#171A18">N</text>
      </svg>
    ),
  },
];

function DesignTools() {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      className={`otc-toolsbtn${open ? ' is-open' : ''}`}
      aria-expanded={open}
      aria-label={`Design tools I use: ${TOOL_TILES.map((t) => t.name).join(', ')}`}
      onClick={() => setOpen((o) => !o)}
      onBlur={() => setOpen(false)}
    >
      <span className="tool-tiles" aria-hidden="true">
        {TOOL_TILES.map((t) => (
          <span key={t.name} className="tool-tile">
            <span className="tool-tile-icon">{t.icon}</span>
            <span className="tool-tile-name">{t.name}</span>
          </span>
        ))}
      </span>
      <span className="otc-obj tools-art">
        <img className="tools-base" src="/assets/scene/tools.png" alt="" />
        <img className="tools-pencils" src="/assets/scene/tools.png" alt="" />
      </span>
    </button>
  );
}

// Moka pot: on hover the lid flips open, steam rises and a cup slides in beside it.
function MokaPot() {
  return (
    <span className="otc-mokabox" aria-hidden="true">
      <img className="otc-cup" src="/assets/scene/cup.png" alt="" />
      <span className="otc-obj otc-moka">
        <img className="moka-base" src="/assets/scene/moka.png" alt="" />
        <span className="moka-mouth" />
        <img className="moka-lid" src="/assets/scene/moka.png" alt="" />
        <span className="moka-steam"><i /><i /><i /></span>
      </span>
    </span>
  );
}

// Books: a small stack of 2026 reads; the top six open on hover or tap.
const BOOKS_ALL = [
  'Pachinko',
  'Butter',
  'The Kamogawa Food Detectives',
  'The Silent Patient',
  'The Dust Child',
  'Then She Was Gone',
];

function BookStack() {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      className={`otc-books${open ? ' is-open' : ''}`}
      aria-expanded={open}
      aria-label={`Books I read in 2026: ${BOOKS_ALL.join(', ')}`}
      onClick={() => setOpen((o) => !o)}
      onBlur={() => setOpen(false)}
    >
      <span className="otc-book-pile" aria-hidden="true">
        <img className="otc-book otc-book-silent" src="/assets/scene/silent.png" alt="" />
        <img className="otc-book otc-book-pachinko" src="/assets/scene/pachinko.png" alt="" />
      </span>
      <span className="otc-shelf" aria-hidden="true">
        <span className="otc-shelf-title">Top 6 of 2026 so far</span>
        {BOOKS_ALL.map((t) => (
          <span key={t} className="otc-shelf-item">{t}</span>
        ))}
      </span>
    </button>
  );
}

function IllustrationCard() {
  const [gardenOpen, setGardenOpen] = useState(false);
  return (
    <div
      className="illo-card"
      style={{
        minWidth: 0,
        width: '100%',
        maxWidth: 400,
        justifySelf: 'end',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--muted)' }}>
        Off the clock
      </div>
      <div className="otc-stage">
        {/* Layout traced from the Figma scene: every position is a % of the stage, so it scales as one piece. */}
        <span className="otc-moon" aria-hidden="true" />
        <span className="otc-moon otc-moon-lilac" aria-hidden="true" />
        <img className="otc-pill" src="/assets/khubi-pill.jpg" alt="Khubi in a cap, smiling, by the lake with Mount Fuji and cherry blossoms behind" />
        <BookStack />
        <MokaPot />
        <DesignTools />
        <TravelStamps />
        <a
          className="bake-link otc-bake"
          href="https://www.instagram.com/pixiedust.bakery/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pixie Dust Bakery on Instagram, @pixiedust.bakery"
          style={{ display: 'block', color: 'inherit' }}
        >
          <div className="bake-photos" aria-hidden="true">
            {BAKE_PHOTOS.map((p) => (
              <img key={p.src} className="polaroid bake-photo" src={p.src} alt={p.alt} loading="lazy" />
            ))}
          </div>
          <div
            className="bake-card"
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 10,
              top: 'calc(100% + 84px)',
              zIndex: 4,
              width: 190,
              padding: '10px 12px',
              background: 'linear-gradient(168deg, #FBFAF7 0%, #F1EFE9 100%)',
              border: '1px solid var(--hairline)',
              borderRadius: 3,
              boxShadow: '0 18px 30px -18px rgba(23,26,24,0.45), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="var(--sky-deep)" strokeWidth={1.6} style={{ flex: '0 0 auto' }}>
              <rect x={3} y={3} width={18} height={18} rx={5} />
              <circle cx={12} cy={12} r={4} />
              <circle cx={17.3} cy={6.7} r={0.9} fill="var(--sky-deep)" stroke="none" />
            </svg>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.3 }}>@pixiedust.bakery</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.04em', color: 'var(--sky-deep)', marginTop: 2 }}>
                View on Instagram ↗
              </div>
            </div>
          </div>
          <img className="bake-whisk otc-obj" src="/assets/scene/bake.png" alt="" />
        </a>
        <button
          type="button"
          className={`garden-btn otc-garden${gardenOpen ? ' is-open' : ''}`}
          aria-expanded={gardenOpen}
          aria-label="Show photos of my plants"
          onClick={() => setGardenOpen((o) => !o)}
          onBlur={() => setGardenOpen(false)}
          style={{
            display: 'block',
            margin: 0,
            padding: 0,
            border: 0,
            background: 'none',
            font: 'inherit',
            color: 'inherit',
            textAlign: 'inherit',
            cursor: 'pointer',
          }}
        >
          <div className="garden-photos">
            {GARDEN_PHOTOS.map((p) => (
              <img key={p.src} className="polaroid garden-photo" src={p.src} alt={p.alt} loading="lazy" />
            ))}
          </div>
          <img className="garden-plant otc-obj" src="/assets/scene/plant.png" alt="" />
        </button>
      </div>
      <style>{`
        .otc-stage { position: relative; aspect-ratio: 3963 / 4718; margin-top: 14px; }
        /* Striped circle tucked behind the photo so only a crescent shows past its top-left edge. */
        /* Striped circles tucked behind the photo so only a crescent shows: red top-left, lilac bottom-right. */
        .otc-moon {
          position: absolute; left: 4%; top: -3%; width: 46%; aspect-ratio: 1; border-radius: 50%; z-index: 0;
          background-image: repeating-linear-gradient(58deg, rgba(190,66,41,0.55) 0 6px, rgba(190,66,41,0) 6px 15px);
        }
        .otc-moon-lilac {
          left: auto; top: auto; right: 4%; bottom: -3%;
          background-image: repeating-linear-gradient(58deg, rgba(139,108,207,0.6) 0 6px, rgba(139,108,207,0) 6px 15px);
        }
        .otc-pill { position: absolute; left: 13.93%; top: 0; width: 73.15%; height: 100%; object-fit: cover; border-radius: 9999px; z-index: 1; display: block; }
        .otc-obj { position: absolute; display: block; height: auto; filter: drop-shadow(0 10px 12px rgba(23,26,24,0.16)); transition: transform 300ms cubic-bezier(.2,.8,.2,1); }
        .otc-garden { position: absolute; left: 77.54%; top: 35.44%; width: 17.84%; z-index: 2; }
        .otc-books { position: absolute; left: 56%; top: -5.5%; width: 24.47%; height: 18.9%; z-index: 3; margin: 0; padding: 0; border: 0; background: none; cursor: pointer; text-align: left; }
        .otc-bake { position: absolute; left: 21%; top: 84.5%; width: 21.25%; z-index: 4; }
        .otc-mokabox { position: absolute; left: 4.52%; top: 13.5%; width: 17.84%; z-index: 5; display: block; }
        .otc-mokabox .otc-moka { position: relative; width: 100%; transform: scaleX(-1); }
        .otc-moka img, .tools-art img { display: block; width: 100%; height: auto; }
        /* The lid is the same picture clipped to its top, hinged by the handle. */
        .moka-base { clip-path: polygon(0 0, 10% 0, 10% 20%, 71% 20%, 71% 0, 100% 0, 100% 100%, 0 100%); }
        .moka-lid { position: absolute; inset: 0; clip-path: polygon(10% 0, 71% 0, 71% 20%, 10% 20%); transform-origin: 74% 17%; transition: transform 480ms cubic-bezier(.3,1.4,.5,1); }
        .moka-mouth { position: absolute; left: 14%; top: 17%; width: 54%; height: 6%; border-radius: 50%; background: #2B2420; opacity: 0; transition: opacity 200ms ease; }
        .otc-mokabox:hover .moka-lid { transform: translateY(-6%) rotate(70deg); }
        .otc-mokabox:hover .moka-mouth { opacity: 1; }
        .moka-steam { position: absolute; left: 24%; top: -14%; width: 40%; height: 32%; pointer-events: none; }
        .moka-steam i {
          position: absolute; bottom: 0; width: 22%; height: 80%; border-radius: 50%;
          border-left: 2px solid rgba(110,100,92,0.5); filter: blur(0.5px); opacity: 0;
        }
        .moka-steam i:nth-child(1) { left: 10%; }
        .moka-steam i:nth-child(2) { left: 40%; height: 100%; }
        .moka-steam i:nth-child(3) { left: 70%; }
        .otc-mokabox:hover .moka-steam i { animation: moka-steam 1.8s ease-out 320ms infinite; }
        .otc-mokabox:hover .moka-steam i:nth-child(2) { animation-delay: 700ms; }
        .otc-mokabox:hover .moka-steam i:nth-child(3) { animation-delay: 1050ms; }
        @keyframes moka-steam {
          0% { opacity: 0; transform: translateY(20%) scaleY(0.6); }
          30% { opacity: 1; }
          100% { opacity: 0; transform: translate(8%, -55%) scaleY(1.1); }
        }
        .otc-cup { position: absolute; left: 72%; top: 64%; width: 62%; opacity: 0; transform: translateX(40%) rotate(8deg); transition: opacity 220ms ease, transform 360ms cubic-bezier(.2,.8,.2,1); filter: drop-shadow(0 8px 10px rgba(23,26,24,0.18)); z-index: 1; }
        .otc-mokabox:hover .otc-cup { opacity: 1; transform: none; }
        .otc-toolsbtn { position: absolute; left: 75.65%; top: 71.2%; width: 19.56%; z-index: 6; margin: 0; padding: 0; border: 0; background: none; cursor: pointer; }
        .otc-toolsbtn .otc-obj { position: relative; width: 100%; }
        /* Pencils are the same picture clipped to what sticks out of the cup, so they can jiggle. */
        .tools-base { clip-path: polygon(52% 0, 100% 0, 100% 100%, 0 100%, 0 40%, 41% 40%, 41% 23%, 52% 23%); }
        .tools-pencils { position: absolute; inset: 0; clip-path: polygon(0 0, 52% 0, 52% 23%, 41% 23%, 41% 40%, 0 40%); transform-origin: 26% 42%; }
        .otc-toolsbtn:hover .tools-art, .otc-toolsbtn:focus-visible .tools-art { transform: translateY(-4px) rotate(-2deg); }
        .otc-toolsbtn:hover .tools-pencils, .otc-toolsbtn:focus-visible .tools-pencils { animation: pencil-jiggle 700ms ease-in-out; }
        @keyframes pencil-jiggle {
          0%, 100% { transform: none; }
          25% { transform: rotate(-5deg); }
          50% { transform: rotate(4deg); }
          75% { transform: rotate(-2deg); }
        }
        .tool-tiles { position: absolute; right: 10%; bottom: calc(100% + 4px); display: flex; pointer-events: none; }
        .tool-tile {
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
          width: 58px; height: 64px; background: #FFFFFF; border-radius: 12px;
          box-shadow: 0 14px 22px -14px rgba(23,26,24,0.5), 0 0 0 1px rgba(23,26,24,0.06);
          opacity: 0; transform: translateY(8px); transition: opacity 200ms ease, transform 280ms cubic-bezier(.2,.8,.2,1);
        }
        .tool-tile + .tool-tile { margin-left: -10px; }
        .tool-tile-icon { display: flex; height: 30px; align-items: center; }
        .tool-tile-name { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.06em; color: var(--secondary); }
        .otc-toolsbtn:hover .tool-tile, .otc-toolsbtn:focus-visible .tool-tile, .otc-toolsbtn.is-open .tool-tile { opacity: 1; }
        .otc-toolsbtn:hover .tool-tile:nth-child(1), .otc-toolsbtn:focus-visible .tool-tile:nth-child(1), .otc-toolsbtn.is-open .tool-tile:nth-child(1) { transform: translateY(4px) rotate(-9deg); }
        .otc-toolsbtn:hover .tool-tile:nth-child(2), .otc-toolsbtn:focus-visible .tool-tile:nth-child(2), .otc-toolsbtn.is-open .tool-tile:nth-child(2) { transform: translateY(-6px) rotate(-2deg); transition-delay: 40ms; }
        .otc-toolsbtn:hover .tool-tile:nth-child(3), .otc-toolsbtn:focus-visible .tool-tile:nth-child(3), .otc-toolsbtn.is-open .tool-tile:nth-child(3) { transform: translateY(2px) rotate(8deg); transition-delay: 80ms; }
        .otc-toolsbtn:hover, .otc-toolsbtn:focus-visible, .otc-toolsbtn.is-open, .otc-mokabox:hover { z-index: 10; }
        .otc-stamps { position: absolute; left: -1%; top: 50%; width: 36%; aspect-ratio: 1.4; z-index: 3; cursor: default; }
        .otc-stamps:hover { z-index: 10; }
        .otc-stamp {
          position: absolute; width: 32%; height: auto; display: block;
          filter: drop-shadow(0 6px 8px rgba(23,26,24,0.18));
          transition: transform 320ms cubic-bezier(.2,.8,.2,1), filter 320ms ease;
        }
        .otc-stamp-a { left: 10%; top: 26%; transform: rotate(-8deg); }
        .otc-stamp-b { left: 32%; top: 10%; transform: rotate(2deg); z-index: 2; }
        .otc-stamp-c { left: 54%; top: 26%; transform: rotate(9deg); }
        /* Hover: the stamps lift and fan apart, like peeling them off a postcard. */
        .otc-stamps:hover .otc-stamp { filter: drop-shadow(0 14px 14px rgba(23,26,24,0.22)); }
        .otc-stamps:hover .otc-stamp-a { transform: translate(-16%, -4%) rotate(-15deg) scale(1.06); }
        .otc-stamps:hover .otc-stamp-b { transform: translateY(-14%) rotate(0deg) scale(1.08); }
        .otc-stamps:hover .otc-stamp-c { transform: translate(16%, -4%) rotate(15deg) scale(1.06); }
        /* Objects drawn 15% larger than traced, each growing from its own centre so the layout holds. */
        .otc-mokabox, .otc-books, .otc-bake { scale: 1.15; }
        .otc-toolsbtn, .otc-garden { scale: 1.3; }
        .tool-tiles { scale: 0.77; transform-origin: bottom right; }
        .otc-shelf { scale: 0.87; transform-origin: top right; }
        .otc-bake .bake-whisk, .otc-garden .garden-plant { position: static; width: 100%; }
        .otc-book-pile { position: absolute; inset: 0; display: block; }
        .otc-book { position: absolute; top: 0; display: block; height: auto; filter: drop-shadow(0 10px 12px rgba(23,26,24,0.18)); transition: transform 300ms cubic-bezier(.2,.8,.2,1); }
        .otc-book-pachinko { left: -4%; width: 60%; }
        .otc-book-silent { left: 19.6%; width: 80.4%; top: 1.6%; }
        .otc-books:hover .otc-book-pachinko, .otc-books.is-open .otc-book-pachinko { transform: rotate(-4deg) translateY(-6px); }
        .otc-books:hover .otc-book-silent, .otc-books.is-open .otc-book-silent { transform: rotate(4deg) translateX(6px); }
        .otc-books:hover, .otc-books:focus-visible, .otc-books.is-open,
        .otc-bake:hover, .otc-bake:focus-visible, .otc-garden:hover, .otc-garden:focus-visible, .otc-garden.is-open { z-index: 10; }
        .otc-shelf {
          position: absolute; right: 0; top: calc(100% + 10px); width: 210px; padding: 12px 14px;
          background: #FCFBF7; border: 1px solid var(--hairline); border-radius: 3px;
          box-shadow: 0 18px 30px -18px rgba(23,26,24,0.45);
          display: flex; flex-direction: column; gap: 4px;
          opacity: 0; transform: translateY(-6px); pointer-events: none;
          transition: opacity 180ms ease, transform 220ms ease;
        }
        .otc-books:hover .otc-shelf, .otc-books:focus-visible .otc-shelf, .otc-books.is-open .otc-shelf { opacity: 1; transform: none; }
        .otc-shelf-title {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 4px;
        }
        .otc-shelf-item { font-family: var(--font-serif); font-size: 14px; line-height: 1.35; color: var(--ink); }
        @media (prefers-reduced-motion: reduce) { .otc-book, .otc-shelf, .otc-obj, .tool-tile, .otc-cup, .otc-stamp, .moka-lid { transition: none !important; } .moka-steam i, .tools-pencils { animation: none !important; } }
        .bake-whisk { transform-origin: 50% 85%; transition: transform 300ms ease; }
        .bake-caption { display: grid; }
        .bake-cap, .bake-handle { grid-area: 1 / 1; transition: opacity 200ms ease, transform 200ms ease; }
        .bake-handle { color: var(--sky-deep); opacity: 0; transform: translateY(4px); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
        .bake-card { display: flex; align-items: center; gap: 10px; opacity: 0; transform: translateY(-6px) rotate(0.7deg); pointer-events: none; transition: opacity 180ms ease, transform 220ms ease; }
        .bake-link:hover .bake-card, .bake-link:focus-visible .bake-card { opacity: 1; transform: translateY(0) rotate(0.7deg); }
        .bake-link:hover .bake-whisk, .bake-link:focus-visible .bake-whisk { animation: bake-whisk 0.5s ease-in-out infinite alternate; }
        .bake-link:hover .bake-hand, .bake-link:focus-visible .bake-hand { animation: bake-hand 1.6s linear infinite; }
        .bake-link:hover .bake-cap, .bake-link:focus-visible .bake-cap { opacity: 0; transform: translateY(-4px); }
        .bake-link:hover .bake-handle, .bake-link:focus-visible .bake-handle { opacity: 1; transform: none; }
        @keyframes bake-whisk { from { transform: rotate(-7deg); } to { transform: rotate(7deg); } }
        @keyframes bake-hand {
          from { transform: translate(-50%, -100%) rotate(48deg); }
          to { transform: translate(-50%, -100%) rotate(408deg); }
        }
        .garden-plant { transform-origin: 50% 100%; }
        .garden-spade { transform-origin: 50% 90%; }
        .garden-caption { display: grid; }
        .garden-cap, .garden-hint { grid-area: 1 / 1; transition: opacity 200ms ease, transform 200ms ease; }
        .garden-hint { color: var(--green); opacity: 0; transform: translateY(4px); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
        .garden-btn:hover .garden-plant, .garden-btn:focus-visible .garden-plant, .garden-btn.is-open .garden-plant { animation: garden-sway 1.1s ease-in-out infinite alternate; }
        .garden-btn:hover .garden-spade, .garden-btn:focus-visible .garden-spade, .garden-btn.is-open .garden-spade { animation: garden-dig 0.55s ease-in-out infinite alternate; }
        .garden-btn:hover .garden-cap, .garden-btn:focus-visible .garden-cap, .garden-btn.is-open .garden-cap { opacity: 0; transform: translateY(-4px); }
        .garden-btn:hover .garden-hint, .garden-btn:focus-visible .garden-hint, .garden-btn.is-open .garden-hint { opacity: 1; transform: none; }
        @keyframes garden-sway { from { transform: rotate(-4deg); } to { transform: rotate(4deg); } }
        @keyframes garden-dig { from { transform: rotate(-10deg); } to { transform: rotate(8deg) translateY(-3px); } }
        .garden-photos { position: absolute; right: -6px; top: calc(100% + 12px); z-index: 3; display: flex; pointer-events: none; }
        .polaroid {
          display: block; box-sizing: content-box; width: 64px; height: 64px; object-fit: cover;
          padding: 4px 4px 12px; background: #FFFFFF; border-radius: 2px;
          box-shadow: 0 14px 22px -14px rgba(23,26,24,0.5), 0 0 0 1px rgba(23,26,24,0.06);
          opacity: 0; transform: translateY(-8px); transition: opacity 200ms ease, transform 280ms cubic-bezier(.2,.8,.2,1);
        }
        .polaroid + .polaroid { margin-left: -18px; }
        .bake-photos { position: absolute; left: -6px; top: calc(100% + 12px); z-index: 3; display: flex; pointer-events: none; }
        .bake-link:hover .bake-photo, .bake-link:focus-visible .bake-photo { opacity: 1; }
        .bake-link:hover .bake-photo:nth-child(1), .bake-link:focus-visible .bake-photo:nth-child(1) { transform: translateY(4px) rotate(-10deg); }
        .bake-link:hover .bake-photo:nth-child(2), .bake-link:focus-visible .bake-photo:nth-child(2) { transform: translateY(-4px) rotate(-3deg); transition-delay: 40ms; }
        .bake-link:hover .bake-photo:nth-child(3), .bake-link:focus-visible .bake-photo:nth-child(3) { transform: translateY(2px) rotate(8deg); transition-delay: 80ms; }
        .garden-btn:hover .garden-photo, .garden-btn:focus-visible .garden-photo, .garden-btn.is-open .garden-photo { opacity: 1; }
        .garden-btn:hover .garden-photo:nth-child(1), .garden-btn:focus-visible .garden-photo:nth-child(1), .garden-btn.is-open .garden-photo:nth-child(1) { transform: translateY(2px) rotate(-8deg); }
        .garden-btn:hover .garden-photo:nth-child(2), .garden-btn:focus-visible .garden-photo:nth-child(2), .garden-btn.is-open .garden-photo:nth-child(2) { transform: translateY(-4px) rotate(3deg); transition-delay: 40ms; }
        .garden-btn:hover .garden-photo:nth-child(3), .garden-btn:focus-visible .garden-photo:nth-child(3), .garden-btn.is-open .garden-photo:nth-child(3) { transform: translateY(4px) rotate(10deg); transition-delay: 80ms; }
        @media (hover: none) {
          .bake-card, .bake-photos { display: none; }
          .bake-caption { display: block; }
          .bake-cap, .bake-handle { display: block; }
          .bake-handle, .bake-link:hover .bake-handle { opacity: 1; transform: none; }
          .bake-link:hover .bake-cap { opacity: 1; transform: none; }
          .garden-caption { display: block; }
          .garden-cap, .garden-hint { display: block; }
          .garden-hint, .garden-btn:hover .garden-hint { opacity: 1; transform: none; }
          .garden-btn .garden-cap, .garden-btn:hover .garden-cap, .garden-btn.is-open .garden-cap { opacity: 1; transform: none; }
          .garden-btn:hover:not(.is-open) .garden-photo { opacity: 0; }
          .garden-btn:hover:not(.is-open) .garden-plant, .garden-btn:hover:not(.is-open) .garden-spade { animation: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bake-link:hover .bake-whisk, .bake-link:focus-visible .bake-whisk,
          .bake-link:hover .bake-hand, .bake-link:focus-visible .bake-hand,
          .garden-btn .garden-plant, .garden-btn .garden-spade { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

// Homepage headline: the 7 counts up, the question unscrambles, and the last line
// sharpens into focus. Plays once on load; skipped entirely for reduced motion.
const LINE_1 = '7 years of asking';
const LINE_2 = '‘What’s confusing?’';
const LINE_3 = 'until nothing is';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** The 7 counts up from 0, easing out. */
function CountUp({ to, delay = 100, duration = 900 }: { to: number; delay?: number; duration?: number }) {
  const [n, setN] = useState(() => (prefersReducedMotion() ? to : 0));
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const start = Date.now() + delay;
    const id = window.setInterval(() => {
      const t = Math.min(1, Math.max(0, (Date.now() - start) / duration));
      setN(Math.round((1 - Math.pow(1 - t, 3)) * to));
    }, 40);
    const done = window.setTimeout(() => {
      window.clearInterval(id);
      setN(to);
    }, delay + duration);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(done);
    };
  }, [to, delay, duration]);
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{n}</span>;
}

/**
 * Letters settle left to right into the real text. The real text is laid out (invisibly)
 * underneath, so the line never changes width; unsettled letters are faded and only
 * change every few frames, which keeps it from flickering.
 */
function Scramble({ text, delay = 250, duration = 550 }: { text: string; delay?: number; duration?: number }) {
  const reduce = prefersReducedMotion();
  const [settled, setSettled] = useState(reduce ? text.length : 0);
  const [noise, setNoise] = useState<string[]>(() => text.split(''));
  useEffect(() => {
    if (reduce) return;
    const glyphs = 'acemnorsuvwxz';
    const pick = () => glyphs[Math.floor(Math.random() * glyphs.length)];
    setNoise(text.split('').map((ch) => (ch === ' ' ? ' ' : pick())));
    const start = Date.now() + delay;
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const t = Math.min(1, Math.max(0, (Date.now() - start) / duration));
      const eased = 1 - Math.pow(1 - t, 2);
      setSettled(Math.floor(eased * text.length));
      if (frame % 2 === 0) {
        setNoise((prev) => prev.map((c, i) => (text[i] === ' ' || Math.random() < 0.6 ? c : pick())));
      }
    }, 45);
    const done = window.setTimeout(() => {
      window.clearInterval(id);
      setSettled(text.length);
    }, delay + duration);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(done);
    };
  }, [text, delay, duration, reduce]);

  if (settled >= text.length) return <>{text}</>;
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span aria-hidden="true" style={{ visibility: 'hidden' }}>{text}</span>
      <span aria-label={text} style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }}>
        {text.slice(0, settled)}
        <span style={{ opacity: 0.35 }}>{noise.slice(settled).join('')}</span>
      </span>
    </span>
  );
}

function HeroHeadline() {
  return (
    <>
      <span className="hh-rise" style={{ display: 'block' }}>
        <CountUp to={7} />
        {LINE_1.slice(1)}
      </span>
      <span className="hh-rise" style={{ display: 'block', color: 'var(--accent)', animationDelay: '160ms' }}>
        <Scramble text={LINE_2} />
      </span>
      <span className="hh-rise hh-focus" style={{ display: 'block', fontStyle: 'italic', color: 'var(--secondary)' }}>
        {LINE_3}
      </span>
    </>
  );
}

export default function Home() {
  return (
    <main style={{ margin: '0 auto', maxWidth: 1344, padding: '0 clamp(20px, 5vw, 72px) 96px' }}>
      {/* Hero */}
      <section style={{ position: 'relative', padding: '64px 24px 64px 0', marginRight: 'calc(-1 * clamp(20px, 5vw, 72px))', overflowX: 'clip', overflowY: 'visible' }}>
        <div
          style={{
            position: 'absolute',
            left: '-34%',
            top: 560,
            width: '42%',
            maxWidth: 300,
            aspectRatio: '1.6 / 1',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(123,166,201,0.20), rgba(123,166,201,0) 76%)',
            filter: 'blur(18px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-4%',
            top: 210,
            width: '46%',
            aspectRatio: '1.25 / 1',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(12,129,57,0.30), rgba(12,129,57,0) 74%)',
            filter: 'blur(24px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '16%',
            bottom: '-6%',
            width: '44%',
            aspectRatio: '2 / 1',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(190,66,41,0.16), rgba(190,66,41,0) 74%)',
            filter: 'blur(22px)',
          }}
        />


        <div
          className="hero-grid"
          style={{
            position: 'relative',
            marginTop: 18,
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(300px, 0.85fr)',
            gap: '48px 64px',
            alignItems: 'center',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h1
              className="hero-h1"
              style={{
                position: 'relative',
                margin: 0,
                fontFamily: 'var(--font-serif)',
                fontWeight: 300,
                fontSize: 'clamp(40px, 6vw, 88px)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: 'var(--ink)',
              }}
            >
              <HeroHeadline />
            </h1>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 300,
                fontSize: 19,
                lineHeight: 1.62,
                color: 'var(--secondary)',
                margin: '44px 0 0 0',
                maxWidth: '52ch',
              }}
            >
              I’m a senior product designer who takes products from messy questions to usable interfaces, most useful
              when the constraint isn’t visual, but the system is complicated and the stakes are real.
            </div>
          </div>

          <IllustrationCard />
        </div>
      </section>

      {/* Work index */}
      <section style={{ padding: '88px 0 0 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', borderBottom: '1px solid var(--ink)', paddingBottom: 14 }}>
          <span style={kicker}>Selected work</span>
          <span style={{ ...kicker, color: 'var(--muted)' }}>7 projects · 2019–2026</span>
        </div>

        <div style={{ paddingTop: 22 }}>
          <WorkTableHeader />
          {allWork.map((r) => (
            <WorkRow key={r.title} row={r} />
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 32px', alignItems: 'baseline', padding: '26px 0 0 0' }}>
          <span style={{ ...kicker, flex: '0 0 88px' }}>Evidence key</span>
          <span style={{ fontSize: 13, color: 'var(--secondary)' }}>
            <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: 999, background: '#0B5030', marginRight: 7, verticalAlign: 'middle' }} />
            <span style={{ color: 'var(--ink)' }}>Shipped · measured</span>: live, with numbers
          </span>
          <span style={{ fontSize: 13, color: 'var(--secondary)' }}>
            <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: 999, background: '#0E5C6B', marginRight: 7, verticalAlign: 'middle' }} />
            <span style={{ color: 'var(--ink)' }}>Shipped</span>: live, not instrumented
          </span>
          <span style={{ fontSize: 13, color: 'var(--secondary)' }}>
            <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: 999, background: '#8A5410', marginRight: 7, verticalAlign: 'middle' }} />
            <span style={{ color: 'var(--ink)' }}>Approved</span>: signed off, not yet live
          </span>
          <span style={{ fontSize: 13, color: 'var(--secondary)' }}>
            <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: 999, background: '#5B3E82', marginRight: 7, verticalAlign: 'middle' }} />
            <span style={{ color: 'var(--ink)' }}>Concept</span>: self-initiated
          </span>
        </div>
      </section>

      {/* Writing */}
      <section style={{ padding: '72px 0 0 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', borderBottom: '1px solid var(--ink)', paddingBottom: 14 }}>
          <span style={kicker}>Writing</span>
          <span style={{ ...kicker, color: 'var(--muted)' }}>On Medium</span>
        </div>
        <a
          href="https://medium.com/@khubi.brahmbhatt/designing-in-the-age-of-instant-answers-9fb5a3dec812"
          target="_blank"
          rel="noopener"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', alignItems: 'flex-start', padding: '24px 0', borderBottom: '1px solid var(--hairline)', color: 'var(--ink)' }}
        >
          <span style={{ flex: '0 0 72px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', paddingTop: 4 }}>Sep 2026</span>
          <span style={{ flex: '1 1 420px' }}>
            <span style={{ display: 'block', fontSize: 19, fontWeight: 500, letterSpacing: '-0.02em' }}>
              Designing in the Age of Instant Answers
            </span>
          </span>
          <span style={{ flex: '0 0 150px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--secondary)', paddingTop: 4 }}>4 min read</span>
          <span style={{ flex: '0 0 20px', color: 'var(--muted)', paddingTop: 3 }}>↗</span>
        </a>
        <a
          href="https://medium.com/@khubi.brahmbhatt/in-defense-of-the-pause-b879b994d081"
          target="_blank"
          rel="noopener"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', alignItems: 'flex-start', padding: '24px 0', borderBottom: '1px solid var(--hairline)', color: 'var(--ink)' }}
        >
          <span style={{ flex: '0 0 72px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', paddingTop: 4 }}>Sep 2026</span>
          <span style={{ flex: '1 1 420px' }}>
            <span style={{ display: 'block', fontSize: 19, fontWeight: 500, letterSpacing: '-0.02em' }}>
              In Defense of Friction: Why the Best Products Make You Pause
            </span>
          </span>
          <span style={{ flex: '0 0 150px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--secondary)', paddingTop: 4 }}>5 min read</span>
          <span style={{ flex: '0 0 20px', color: 'var(--muted)', paddingTop: 3 }}>↗</span>
        </a>
        <a
          href="https://medium.com/@khubi.brahmbhatt/designing-before-the-prompt-8d61b0341161"
          target="_blank"
          rel="noopener"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', alignItems: 'flex-start', padding: '24px 0', borderBottom: '1px solid var(--hairline)', color: 'var(--ink)' }}
        >
          <span style={{ flex: '0 0 72px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', paddingTop: 4 }}>Sep 2026</span>
          <span style={{ flex: '1 1 420px' }}>
            <span style={{ display: 'block', fontSize: 19, fontWeight: 500, letterSpacing: '-0.02em' }}>
              Designing Before the Prompt
            </span>
          </span>
          <span style={{ flex: '0 0 150px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--secondary)', paddingTop: 4 }}>6 min read</span>
          <span style={{ flex: '0 0 20px', color: 'var(--muted)', paddingTop: 3 }}>↗</span>
        </a>
      </section>

      {/* Footer */}
      <footer style={{ display: 'flex', flexWrap: 'wrap', gap: 32, borderTop: '1px solid var(--ink)', marginTop: 88, paddingTop: 22 }}>
        <div style={{ flex: '1 1 220px' }}>
          <div style={kicker}>Elsewhere</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14, alignItems: 'flex-start' }}>
            <a href="https://linkedin.com/in/khubijoshi" style={{ fontSize: 15, color: 'var(--ink)' }}>
              LinkedIn
            </a>
            <Link to="/resume" style={{ fontSize: 15, color: 'var(--ink)' }}>
              Read the résumé
            </Link>
          </div>
        </div>
        <div style={{ flex: '1 1 280px' }}>
          <div style={kicker}>Get in touch</div>
          <a href="mailto:khubi.brahmbhatt@gmail.com" style={{ display: 'inline-block', fontSize: 'clamp(17px, 1.8vw, 22px)', fontWeight: 400, letterSpacing: '-0.02em', marginTop: 12, color: 'var(--ink)' }}>
            khubi.brahmbhatt@gmail.com
          </a>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--muted)', marginTop: 18 }}>
            © 2026 Khubi Joshi
          </div>
        </div>
      </footer>
    </main>
  );
}
