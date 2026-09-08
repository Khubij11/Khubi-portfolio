import { useState } from 'react';

const A = '/assets/wf-ai/';
const mask = (f: string): React.CSSProperties => ({
  WebkitMask: `url(${A}${f}) center / 100% 100% no-repeat`,
  mask: `url(${A}${f}) center / 100% 100% no-repeat`,
});

const SLATE = 'rgb(148,163,184)';

interface Layer {
  left: number;
  top: number;
  w: number;
  h: number;
  color: string;
  file: string;
}

function Layers({ layers }: { layers: Layer[] }) {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      {layers.map((l, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: l.left,
            top: l.top,
            width: l.w,
            height: l.h,
            backgroundColor: l.color,
            ...mask(l.file),
          }}
        />
      ))}
    </div>
  );
}

interface Mode {
  key: 'quick' | 'detailed' | 'specs' | 'mindmap';
  title: string;
  desc: string;
  iconFile: string;
  iconLeft: number;
  iconTop: number;
  iconW: number;
  iconH: number;
  handle: boolean;
}

const MODES: Mode[] = [
  { key: 'quick', title: 'Quick Search', desc: 'Rapid keyword lookup across all repos', iconFile: 'quick-search.svg', iconLeft: 2.5, iconTop: 2.5, iconW: 13.333, iconH: 13.333, handle: true },
  { key: 'detailed', title: 'Detailed Search', desc: 'Advanced filtering with regex support', iconFile: 'card-icon.svg', iconLeft: 1.667, iconTop: 2.5, iconW: 16.664, iconH: 15.834, handle: false },
  { key: 'specs', title: 'Generate API Specs', desc: 'Extract Swagger/OpenAPI definitions', iconFile: 'card-icon.svg', iconLeft: 1.667, iconTop: 2.5, iconW: 16.664, iconH: 15.834, handle: false },
  { key: 'mindmap', title: 'Create Mindmap', desc: 'Visualize dependency graphs', iconFile: 'card-icon.svg', iconLeft: 1.667, iconTop: 2.5, iconW: 16.664, iconH: 15.834, handle: false },
];

const RESULTS = [
  {
    path: 'src/main/java/com/bank/payments/factory/PaymentProcessorFactory.java',
    line: 'Line 42',
    before:
      'public class PaymentProcessorFactory {\n\n    private static final Logger logger = LoggerFactory.getLogger(PaymentProcessorFactory.class);\n\n    /**\n     * Initializes the payment processor based on the transaction type.\n     * @param type The transaction type (CREDIT, DEBIT, WIRE)\n     */\n    public IPaymentProcessor ',
    hit: 'initializeProcessor',
    after:
      '(TransactionType type) {\n        logger.info("Initializing processor for type: {}", type);\n\n        switch (type) {\n            case CREDIT:\n                return new CreditCardProcessor();\n            case DEBIT:\n                return new DebitCardProcessor();\n            default:\n                throw new UnsupportedOperationException("Type not supported");\n        }\n    }\n}',
  },
  {
    path: 'src/test/java/com/bank/payments/PaymentProcessorFactoryTest.java',
    line: 'Line 115',
    before: '@Test\npublic void testCreditProcessorInitialization() {\n    IPaymentProcessor processor = factory.',
    hit: 'initializeProcessor',
    after: '(TransactionType.CREDIT);\n    assertNotNull(processor);\n    assertTrue(processor instanceof CreditCardProcessor);\n}',
  },
  {
    path: 'docs/architecture/payments-integration.md',
    line: 'Line 88',
    before: 'The ',
    hit: 'PaymentProcessorFactory',
    after: ' must be initialized during application startup\nto ensure all downstream dependencies are available.',
  },
];

const RELATED = ['Payment Gateway config', 'Transaction limits', 'Audit logging', 'Exception handling', 'API Authentication'];

const MAP_INPUTS = [
  { name: 'TransactionType', kind: 'Enum · CREDIT, DEBIT, WIRE', top: 60 },
  { name: 'PaymentConfig', kind: 'Config · application.yml', top: 170 },
  { name: 'AuditLogger', kind: 'Service · shared-logging', top: 280 },
];

const MAP_OUTPUTS = [
  { name: 'CreditCardProcessor', kind: 'Implements IPaymentProcessor', top: 40, kindColor: 'rgb(100,116,139)' },
  { name: 'DebitCardProcessor', kind: 'Implements IPaymentProcessor', top: 150, kindColor: 'rgb(100,116,139)' },
  { name: 'WireProcessor', kind: 'Not implemented — throws', top: 260, kindColor: 'rgb(180,83,9)' },
];

const mono = "'Liberation Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

function CodeLine({ before, hit, after }: { before: string; hit: string; after: string }) {
  return (
    <div style={{ borderRadius: 4, background: 'rgb(248,250,252)', boxShadow: 'inset 0 0 0 1px rgb(241,245,249)', padding: 12, alignSelf: 'stretch', overflow: 'hidden' }}>
      <div style={{ padding: '2px 0', fontFamily: mono, fontWeight: 400, fontSize: 14, lineHeight: '20px', color: 'rgb(51,65,85)', whiteSpace: 'pre-wrap' }}>
        {before}
        <span style={{ borderRadius: 4, background: 'rgb(254,249,195)', fontWeight: 700, color: 'rgb(133,77,14)' }}>{hit}</span>
        {after}
      </div>
    </div>
  );
}

export interface WFCodeDiscoveryProps {
  activeMode?: Mode['key'];
  query?: string;
  matchCount?: number;
  initials?: string;
  branch?: string;
  domain?: string;
  repository?: string;
}

export default function WFCodeDiscovery({
  activeMode = 'quick',
  query: initialQuery = 'PaymentProcessorFactory initialization',
  matchCount = 12,
  initials = 'JD',
  branch = 'develop',
  domain = 'Core Banking System',
  repository = 'monolith-backend-v2',
}: WFCodeDiscoveryProps) {
  const [mode, setMode] = useState<Mode['key']>(activeMode);
  const [query, setQuery] = useState(initialQuery);
  const [empty, setEmpty] = useState(false);

  const runSearch = () => setEmpty(!query.trim() || /wire|zzz/i.test(query));

  const isMindmap = mode === 'mindmap';
  const isEmpty = mode !== 'mindmap' && empty;
  const isResults = mode !== 'mindmap' && !empty;

  return (
    <div style={{ position: 'relative', width: '100%', minWidth: 0, background: 'rgb(248,249,250)', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "Inter, -apple-system, 'Segoe UI', Roboto, sans-serif", color: 'rgb(51,65,85)' }}>
      <div style={{ position: 'relative', width: '100%', height: 65, flexShrink: 0, background: 'rgb(216,31,40)', border: '1px solid rgb(226,232,240)', boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 64, padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: 220, height: 23, flexShrink: 0, background: `url(${A}wells-fargo-logo.png) center / cover no-repeat` }} />
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, padding: 8, display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
              <Layers
                layers={[
                  { file: 'bell-a.svg', left: 8.557, top: 17.5, w: 2.887, h: 0.833, color: '#fff' },
                  { file: 'bell-b.svg', left: 2.501, top: 1.667, w: 15, h: 12.5, color: '#fff' },
                ]}
              />
            </div>
            <div style={{ width: 32, height: 32, borderRadius: 9999, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', textAlign: 'center', color: 'rgb(71,85,105)' }}>{initials}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 1280, minWidth: 0, padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ paddingBottom: 8, alignSelf: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', alignSelf: 'stretch' }}>
            <div style={{ height: 57, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 36, lineHeight: '36px', letterSpacing: '-0.75px', textAlign: 'center', color: 'rgb(15,23,42)' }}>Code Discovery</span>
            </div>
            <div style={{ height: 24 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: '24px', textAlign: 'center', color: 'rgb(100,116,139)' }}>
                Search across repositories, documentation, and API specifications
              </span>
            </div>
          </div>
        </div>

        <div className="wfcd-mode-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16, alignItems: 'stretch', alignSelf: 'stretch' }}>
          {MODES.map((m) => {
            const on = m.key === mode;
            return (
              <div
                key={m.key}
                onClick={() => setMode(m.key)}
                style={{
                  position: 'relative',
                  minWidth: 0,
                  minHeight: 138,
                  borderRadius: 12,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  background: on ? 'rgb(238,242,255)' : 'rgb(255,255,255)',
                  boxShadow: on ? 'inset 0 0 0 2px rgb(199,210,254), 0px 1px 2px 0px rgba(0,0,0,0.05)' : 'inset 0 0 0 1px rgb(226,232,240), 0px 1px 2px 0px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    marginBottom: 12,
                    borderRadius: 8,
                    padding: 8,
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexShrink: 0,
                    background: on ? 'rgb(255,255,255)' : 'rgb(248,250,252)',
                    boxShadow: on ? 'inset 0 0 0 1px rgb(224,231,255)' : 'inset 0 0 0 1px rgb(241,245,249)',
                  }}
                >
                  <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: m.iconLeft,
                        top: m.iconTop,
                        width: m.iconW,
                        height: m.iconH,
                        backgroundColor: on ? 'rgb(79,70,229)' : 'rgb(71,85,105)',
                        ...mask(m.iconFile),
                      }}
                    />
                  </div>
                </div>
                <span style={{ fontWeight: 600, fontSize: 16, lineHeight: '24px', color: on ? 'rgb(49,46,129)' : 'rgb(51,65,85)' }}>{m.title}</span>
                <div style={{ padding: '4px 0', alignSelf: 'stretch' }}>
                  <span style={{ fontWeight: 400, fontSize: 12, lineHeight: '16px', color: on ? 'rgb(67,56,202)' : 'rgb(100,116,139)' }}>{m.desc}</span>
                </div>
                {on && (
                  <div style={{ position: 'absolute', right: 14, top: 14, width: 20, height: 20 }}>
                    <div style={{ position: 'absolute', left: 1.667, top: 1.667, width: 16.667, height: 16.667, borderRadius: 9999, background: 'rgb(224,231,255)' }} />
                    <Layers
                      layers={[
                        { file: 'badge-a.svg', left: 1.667, top: 1.667, w: 16.667, h: 16.667, color: 'rgb(79,70,229)' },
                        { file: 'badge-b.svg', left: 7.5, top: 8.333, w: 5, h: 3.333, color: 'rgb(79,70,229)' },
                      ]}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ borderRadius: 12, background: '#fff', boxShadow: 'inset 0 0 0 1px rgb(226,232,240), 0px 1px 2px 0px rgba(0,0,0,0.05)', overflow: 'hidden', alignSelf: 'stretch' }}>
          <div style={{ height: 69, padding: 24, background: 'rgba(248,250,252,0.5)', border: '1px solid rgb(241,245,249)' }}>
            <span style={{ fontWeight: 600, fontSize: 14, lineHeight: '20px', letterSpacing: '0.7px', textTransform: 'uppercase', color: 'rgb(100,116,139)' }}>Search Parameters</span>
          </div>

          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'flex-start', alignSelf: 'stretch' }}>
              {[
                { label: 'Application Domain', value: domain },
                { label: 'Repository', value: repository },
              ].map((s) => (
                <div key={s.label} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 6.5, alignItems: 'flex-start', minWidth: 0 }}>
                  <span style={{ fontWeight: 500, fontSize: 14, lineHeight: '20px', whiteSpace: 'nowrap', color: 'rgb(51,65,85)' }}>{s.label}</span>
                  <div style={{ position: 'relative', height: 46, alignSelf: 'stretch' }}>
                    <div style={{ height: 46, borderRadius: 8, background: '#fff', boxShadow: 'inset 0 0 0 1px rgb(203,213,225)', padding: '10px 32px 10px 16px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontWeight: 400, fontSize: 16, lineHeight: '24px', color: 'rgb(51,65,85)' }}>{s.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ height: 46, borderRadius: 8, background: 'rgb(248,250,252)', boxShadow: 'inset 0 0 0 1px rgb(241,245,249)', padding: 12, display: 'flex', flexDirection: 'row', gap: 16, alignItems: 'center', alignSelf: 'stretch', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                <span style={{ fontWeight: 500, fontSize: 14, lineHeight: '20px', whiteSpace: 'nowrap', color: 'rgb(71,85,105)' }}>Branch:</span>
                <div style={{ borderRadius: 4, background: 'rgb(226,232,240)', padding: '2px 8px' }}>
                  <span style={{ fontFamily: mono, fontWeight: 400, fontSize: 12, lineHeight: '16px', color: 'rgb(51,65,85)' }}>{branch}</span>
                </div>
              </div>
              <div style={{ width: 1, height: 16, background: 'rgb(203,213,225)', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                <Layers layers={[{ file: 'baseline-doc.svg', left: 2.667, top: 1.333, w: 10.667, h: 13.333, color: SLATE }]} />
                <span style={{ fontWeight: 500, fontSize: 14, lineHeight: '20px', whiteSpace: 'nowrap', color: 'rgb(71,85,105)' }}>Baseline Doc:</span>
                <a href="#" style={{ fontWeight: 400, fontSize: 14, lineHeight: '20px', whiteSpace: 'nowrap' }}>
                  v2.4.0-spec.pdf
                </a>
              </div>
              <div style={{ width: 1, height: 16, background: 'rgb(203,213,225)', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                <Layers
                  layers={[
                    { file: 'clock-a.svg', left: 8, top: 4, w: 2.667, h: 5.333, color: SLATE },
                    { file: 'clock-b.svg', left: 1.333, top: 1.333, w: 13.333, h: 13.333, color: SLATE },
                  ]}
                />
                <span style={{ fontWeight: 500, fontSize: 14, lineHeight: '20px', whiteSpace: 'nowrap', color: 'rgb(71,85,105)' }}>Last Index:</span>
                <span style={{ fontWeight: 400, fontSize: 14, lineHeight: '20px', whiteSpace: 'nowrap', color: 'rgb(71,85,105)' }}>2 hours ago</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start', alignSelf: 'stretch' }}>
              <div style={{ position: 'relative', flex: '1 1 180px', minWidth: 0 }}>
                <div style={{ height: 50, borderRadius: 8, background: '#fff', boxShadow: 'inset 0 0 0 1px rgb(203,213,225)', padding: '12px 16px 12px 44px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setEmpty(false);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && runSearch()}
                    style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', padding: 0, fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: 'rgb(51,65,85)' }}
                  />
                </div>
                <div style={{ position: 'absolute', left: 0, top: 0, width: 36, height: 50, padding: '0 16px', display: 'flex', alignItems: 'center' }}>
                  <Layers layers={[{ file: 'input-search.svg', left: 2.5, top: 2.5, w: 13.333, h: 13.333, color: SLATE }]} />
                </div>
              </div>
              <div
                onClick={runSearch}
                style={{ width: 140, minWidth: 140, height: 50, flexShrink: 0, borderRadius: 24, background: 'rgb(216,31,40)', boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)', padding: '13px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <span style={{ fontWeight: 500, fontSize: 16, lineHeight: '24px', textAlign: 'center', whiteSpace: 'nowrap', color: '#fff' }}>Search</span>
              </div>
            </div>
          </div>
        </div>

        {isMindmap && (
          <div style={{ borderRadius: 12, background: '#fff', boxShadow: 'inset 0 0 0 1px rgb(226,232,240), 0px 1px 2px 0px rgba(0,0,0,0.05)', alignSelf: 'stretch' }}>
            <div style={{ height: 65, borderRadius: '12px 12px 0 0', background: 'rgba(248,250,252,0.5)', border: '1px solid rgb(226,232,240)', padding: 16, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center', flexShrink: 0 }}>
                <span style={{ fontWeight: 600, fontSize: 16, lineHeight: '24px', whiteSpace: 'nowrap', color: 'rgb(30,41,59)' }}>Dependency map</span>
                <div style={{ borderRadius: 9999, background: 'rgb(238,242,255)', boxShadow: 'inset 0 0 0 1px rgb(199,210,254)', padding: '2px 8px' }}>
                  <span style={{ fontWeight: 500, fontSize: 12, lineHeight: '16px', whiteSpace: 'nowrap', color: 'rgb(67,56,202)' }}>6 nodes · 2 levels</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                <div style={{ borderRadius: 8, background: '#fff', boxShadow: 'inset 0 0 0 1px rgb(203,213,225)', padding: '7px 14px', cursor: 'pointer' }}>
                  <span style={{ fontWeight: 500, fontSize: 13, lineHeight: '18px', whiteSpace: 'nowrap', color: 'rgb(51,65,85)' }}>Export PNG</span>
                </div>
                <div style={{ borderRadius: 8, background: '#fff', boxShadow: 'inset 0 0 0 1px rgb(203,213,225)', padding: '7px 14px', cursor: 'pointer' }}>
                  <span style={{ fontWeight: 500, fontSize: 13, lineHeight: '18px', whiteSpace: 'nowrap', color: 'rgb(51,65,85)' }}>Copy as Mermaid</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '28px 24px', borderRadius: '0 0 12px 12px', background: 'rgb(252,252,253)' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: 770, height: 400, margin: '0 auto' }}>
                <svg width={770} height={400} viewBox="0 0 770 400" fill="none" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 400 }}>
                  <path d="M 180 88 C 235 88 240 188 290 188" stroke="rgb(203,213,225)" strokeWidth={1.5} />
                  <path d="M 180 198 C 235 198 240 188 290 188" stroke="rgb(203,213,225)" strokeWidth={1.5} />
                  <path d="M 180 308 C 235 308 240 188 290 188" stroke="rgb(203,213,225)" strokeWidth={1.5} />
                  <path d="M 490 188 C 545 188 550 68 590 68" stroke="rgb(165,180,252)" strokeWidth={1.5} />
                  <path d="M 490 188 C 545 188 550 178 590 178" stroke="rgb(165,180,252)" strokeWidth={1.5} />
                  <path d="M 490 188 C 545 188 550 288 590 288" stroke="rgb(165,180,252)" strokeWidth={1.5} />
                </svg>

                <div style={{ position: 'absolute', left: 0, top: 6, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 11, lineHeight: '16px', letterSpacing: '0.7px', textTransform: 'uppercase', color: 'rgb(148,163,184)' }}>Depends on</div>
                <div style={{ position: 'absolute', left: '76.6%', top: 6, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 11, lineHeight: '16px', letterSpacing: '0.7px', textTransform: 'uppercase', color: 'rgb(148,163,184)' }}>Returns</div>

                {MAP_INPUTS.map((n) => (
                  <div key={n.name} style={{ position: 'absolute', left: 0, top: n.top, width: '23.4%', height: 56, borderRadius: 10, background: '#fff', boxShadow: 'inset 0 0 0 1px rgb(226,232,240), 0px 1px 2px 0px rgba(0,0,0,0.05)', padding: '8px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
                    <span style={{ fontFamily: mono, fontWeight: 400, fontSize: 12.5, lineHeight: '17px', color: 'rgb(30,41,59)' }}>{n.name}</span>
                    <span style={{ fontWeight: 400, fontSize: 10.5, lineHeight: '15px', color: 'rgb(100,116,139)' }}>{n.kind}</span>
                  </div>
                ))}

                <div style={{ position: 'absolute', left: '37.7%', top: 150, width: '26%', height: 76, borderRadius: 12, background: 'rgb(238,242,255)', boxShadow: 'inset 0 0 0 2px rgb(165,180,252)', padding: '10px 13px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
                  <span style={{ fontFamily: mono, fontWeight: 400, fontSize: 12.5, lineHeight: '17px', color: 'rgb(49,46,129)' }}>PaymentProcessorFactory</span>
                  <span style={{ fontWeight: 500, fontSize: 10.5, lineHeight: '15px', color: 'rgb(67,56,202)' }}>Factory · monolith-backend-v2</span>
                  <span style={{ fontWeight: 400, fontSize: 10.5, lineHeight: '15px', color: 'rgb(99,102,241)' }}>initializeProcessor()</span>
                </div>

                {MAP_OUTPUTS.map((n) => (
                  <div key={n.name} style={{ position: 'absolute', left: '76.6%', top: n.top, width: '23.4%', height: 56, borderRadius: 10, background: '#fff', boxShadow: 'inset 0 0 0 1px rgb(226,232,240), 0px 1px 2px 0px rgba(0,0,0,0.05)', padding: '8px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
                    <span style={{ fontFamily: mono, fontWeight: 400, fontSize: 12.5, lineHeight: '17px', color: 'rgb(30,41,59)' }}>{n.name}</span>
                    <span style={{ fontWeight: 400, fontSize: 10.5, lineHeight: '15px', color: n.kindColor }}>{n.kind}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid rgb(241,245,249)', display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 400, fontSize: 13, lineHeight: '18px', color: 'rgb(100,116,139)' }}>
                  Built from <span style={{ fontFamily: mono, color: 'rgb(51,65,85)' }}>develop</span>, indexed 2 hours ago. Every node links to the file it was read from.
                </span>
              </div>
            </div>
          </div>
        )}

        {isEmpty && (
          <div style={{ borderRadius: 12, background: '#fff', boxShadow: 'inset 0 0 0 1px rgb(226,232,240), 0px 1px 2px 0px rgba(0,0,0,0.05)', alignSelf: 'stretch', padding: '56px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 48, height: 48, borderRadius: 9999, background: 'rgb(248,250,252)', boxShadow: 'inset 0 0 0 1px rgb(226,232,240)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="rgb(148,163,184)" strokeWidth={1.8} strokeLinecap="round">
                <circle cx={11} cy={11} r={7} />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 18, lineHeight: '26px', textAlign: 'center', color: 'rgb(30,41,59)' }}>No matches in this scope</span>
            <span style={{ fontWeight: 400, fontSize: 14, lineHeight: '22px', textAlign: 'center', maxWidth: '52ch', color: 'rgb(100,116,139)' }}>
              Nothing in <span style={{ fontFamily: mono, color: 'rgb(51,65,85)' }}>{repository}</span> on <span style={{ fontFamily: mono, color: 'rgb(51,65,85)' }}>{branch}</span> matches this query. This is a scope
              result, not an answer — the code may exist on another branch or in a repository you have not selected.
            </span>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div onClick={() => setEmpty(false)} style={{ borderRadius: 24, background: 'rgb(216,31,40)', padding: '11px 22px', cursor: 'pointer' }}>
                <span style={{ fontWeight: 500, fontSize: 14, lineHeight: '20px', whiteSpace: 'nowrap', color: '#fff' }}>Search all repositories</span>
              </div>
              <div style={{ borderRadius: 24, background: '#fff', boxShadow: 'inset 0 0 0 1px rgb(203,213,225)', padding: '11px 22px', cursor: 'pointer' }}>
                <span style={{ fontWeight: 500, fontSize: 14, lineHeight: '20px', whiteSpace: 'nowrap', color: 'rgb(51,65,85)' }}>Change branch</span>
              </div>
              <div style={{ borderRadius: 24, background: '#fff', boxShadow: 'inset 0 0 0 1px rgb(203,213,225)', padding: '11px 22px', cursor: 'pointer' }}>
                <span style={{ fontWeight: 500, fontSize: 14, lineHeight: '20px', whiteSpace: 'nowrap', color: 'rgb(51,65,85)' }}>Ask in #core-banking</span>
              </div>
            </div>
          </div>
        )}

        {isResults && (
          <div style={{ borderRadius: 12, background: '#fff', boxShadow: 'inset 0 0 0 1px rgb(226,232,240), 0px 1px 2px 0px rgba(0,0,0,0.05)', alignSelf: 'stretch' }}>
            <div style={{ height: 65, borderRadius: '12px 12px 0 0', background: 'rgba(248,250,252,0.5)', border: '1px solid rgb(226,232,240)', padding: 16, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center', flexShrink: 0 }}>
                <span style={{ fontWeight: 600, fontSize: 16, lineHeight: '24px', whiteSpace: 'nowrap', color: 'rgb(30,41,59)' }}>Query Result</span>
                <div style={{ borderRadius: 9999, background: 'rgb(220,252,231)', boxShadow: 'inset 0 0 0 1px rgb(187,247,208)', padding: '2px 8px' }}>
                  <span style={{ fontWeight: 500, fontSize: 12, lineHeight: '16px', whiteSpace: 'nowrap', color: 'rgb(21,128,61)' }}>{matchCount} matches found</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'flex-start', flexShrink: 0 }}>
                <div title="Copy" style={{ width: 32, height: 32, borderRadius: 8, padding: 8, display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                  <Layers
                    layers={[
                      { file: 'action-copy-a.svg', left: 5.333, top: 5.333, w: 9.333, h: 9.333, color: 'rgb(100,116,139)' },
                      { file: 'action-copy-b.svg', left: 1.333, top: 1.333, w: 9.333, h: 9.333, color: 'rgb(100,116,139)' },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div style={{ background: '#fff', padding: 24, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start', borderRadius: '0 0 12px 12px' }}>
              {RESULTS.map((r) => (
                <div key={r.path} style={{ borderLeft: '4px solid rgb(153,27,27)', padding: '4px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start', alignSelf: 'stretch' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch', gap: '2px 12px' }}>
                    <span style={{ fontFamily: mono, fontWeight: 400, fontSize: 12, lineHeight: '16px', color: 'rgb(100,116,139)', minWidth: 0, overflowWrap: 'anywhere' }}>{r.path}</span>
                    <span style={{ fontFamily: mono, fontWeight: 400, fontSize: 12, lineHeight: '16px', color: 'rgb(148,163,184)', flexShrink: 0 }}>{r.line}</span>
                  </div>
                  <CodeLine before={r.before} hit={r.hit} after={r.after} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ paddingBottom: 32, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', alignSelf: 'stretch' }}>
          <span style={{ fontWeight: 500, fontSize: 14, lineHeight: '20px', color: 'rgb(100,116,139)' }}>Related Searches</span>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'flex-start', alignSelf: 'stretch', flexWrap: 'wrap' }}>
            {RELATED.map((label) => (
              <div
                key={label}
                onClick={() => {
                  setQuery(label);
                  setEmpty(false);
                }}
                style={{ borderRadius: 9999, background: '#fff', boxShadow: 'inset 0 0 0 1px rgb(226,232,240), 0px 1px 2px 0px rgba(0,0,0,0.05)', padding: '6px 12px', cursor: 'pointer', flexShrink: 0 }}
              >
                <span style={{ fontWeight: 400, fontSize: 14, lineHeight: '20px', whiteSpace: 'nowrap', color: 'rgb(71,85,105)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .wfcd-mode-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
      `}</style>
    </div>
  );
}
