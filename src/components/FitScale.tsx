import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function FitScale({
  children,
  designWidth = 1280,
  background = '#FFFFFF',
  border = '1px solid var(--hairline)',
}: {
  children: ReactNode;
  designWidth?: number;
  background?: string;
  border?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const update = () => {
      const w = outer.clientWidth;
      const s = w / designWidth;
      setScale(s);
      setHeight(inner.scrollHeight * s);
    };

    const ro = new ResizeObserver(update);
    ro.observe(outer);
    const ro2 = new ResizeObserver(update);
    ro2.observe(inner);
    update();
    return () => {
      ro.disconnect();
      ro2.disconnect();
    };
  }, [designWidth]);

  return (
    <div ref={outerRef} style={{ position: 'relative', width: '100%', overflow: 'hidden', background, border, height }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: designWidth, transformOrigin: '0 0', transform: `scale(${scale})` }}>
        <div ref={innerRef}>{children}</div>
      </div>
    </div>
  );
}
