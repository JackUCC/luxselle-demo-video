import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { interpolate, spring } from 'remotion';
import { colors, fonts } from '../lib/theme';

type FeatureLabelProps = {
  text: string;
  delay?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
  style?: React.CSSProperties;
};

export const FeatureLabel: React.FC<FeatureLabelProps> = ({
  text,
  delay = 0,
  position = 'bottom',
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const opacity = progress;
  const slideY = interpolate(progress, [0, 1], [20, 0]);
  const slideX = interpolate(progress, [0, 1], [position === 'left' ? -20 : position === 'right' ? 20 : 0, 0]);

  const positionStyles: React.CSSProperties =
    position === 'top'
      ? { top: 24, left: '50%', transform: `translate(-50%, ${slideY}px)` }
      : position === 'bottom'
        ? { bottom: 24, left: '50%', transform: `translate(-50%, ${-slideY}px)` }
        : position === 'left'
          ? { left: 24, top: '50%', transform: `translate(${slideX}px, -50%)` }
          : { right: 24, top: '50%', transform: `translate(${-slideX}px, -50%)` };

  return (
    <div
      style={{
        position: 'absolute',
        opacity,
        ...positionStyles,
        padding: '12px 24px',
        background: colors.surface,
        borderRadius: 10,
        boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
        border: `1px solid ${colors.border}`,
        fontFamily: fonts.body,
        fontSize: 20,
        fontWeight: 600,
        color: colors.text,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {text}
    </div>
  );
};
