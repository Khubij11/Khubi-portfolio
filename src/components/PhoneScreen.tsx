import type { ComponentType } from 'react';

export default function PhoneScreen({
  Component,
  designWidth = 402,
  designHeight = 874,
  displayWidth = 201,
  displayHeight = 437,
}: {
  Component: ComponentType<{ style?: React.CSSProperties }>;
  designWidth?: number;
  designHeight?: number;
  displayWidth?: number;
  displayHeight?: number;
}) {
  const scale = displayWidth / designWidth;
  return (
    <div style={{ width: displayWidth, height: displayHeight, flex: '0 0 auto' }}>
      <div style={{ width: designWidth, minWidth: designWidth, height: designHeight, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <Component style={{ width: designWidth, height: designHeight, flex: `0 0 ${designWidth}px` }} />
      </div>
    </div>
  );
}
