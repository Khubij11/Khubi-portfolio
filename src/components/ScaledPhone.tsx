import type { ReactNode } from 'react';

export default function ScaledPhone({
  children,
  designWidth = 390,
  designHeight = 844,
  displayWidth = 195,
  displayHeight = 422,
}: {
  children: ReactNode;
  designWidth?: number;
  designHeight?: number;
  displayWidth?: number;
  displayHeight?: number;
}) {
  const scale = displayWidth / designWidth;
  return (
    <div style={{ width: displayWidth, height: displayHeight, flex: '0 0 auto' }}>
      <div style={{ width: designWidth, minWidth: designWidth, height: designHeight, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  );
}
