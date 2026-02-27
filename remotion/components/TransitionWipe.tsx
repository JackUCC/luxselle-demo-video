import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { interpolate } from 'remotion';
import { colors } from '../lib/theme';

type TransitionWipeProps = {
  type?: 'gold-sweep' | 'slide-left' | 'fade';
  durationFrames?: number;
  progress: number; // 0..1 over the transition
  children: React.ReactNode;
};

export const TransitionWipe: React.FC<TransitionWipeProps> = ({
  type = 'gold-sweep',
  durationFrames = 30,
  progress,
  children,
}) => {
  if (type === 'gold-sweep') {
    const x = interpolate(progress, [0, 1], [-100, 100]);
    return (
      <>
        {children}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `linear-gradient(90deg, transparent 0%, ${colors.gold}20 ${x - 20}%, ${colors.gold}40 ${x}%, transparent ${x + 20}%)`,
            opacity: interpolate(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
          }}
        />
      </>
    );
  }
  if (type === 'slide-left') {
    const offset = interpolate(progress, [0, 1], [1920, 0]);
    return (
      <div style={{ position: 'absolute', left: offset, top: 0, right: -1920, bottom: 0 }}>
        {children}
      </div>
    );
  }
  return (
    <div style={{ opacity: interpolate(progress, [0, 1], [0, 1]) }}>{children}</div>
  );
};
