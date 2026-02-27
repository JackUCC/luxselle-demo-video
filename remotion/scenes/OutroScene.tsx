import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { spring, interpolate } from 'remotion';
import { colors, fonts } from '../lib/theme';
import { sceneOpacity } from '../lib/animations';

type Props = { startFrame: number; endFrame: number };

const FEATURES = ['Dashboard', 'Price Check', 'Inventory', 'Sourcing', 'Invoices', 'Sidecar'];

export const OutroScene: React.FC<Props> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneOpacity(frame, startFrame, endFrame, 20);
  if (frame < startFrame || frame >= endFrame) return null;

  const localFrame = frame - startFrame;
  const gridOpacity = spring({ frame: localFrame, fps, config: { damping: 20 } });
  const logoOpacity = spring({ frame: localFrame - 30, fps, config: { damping: 18 } });
  const logoScale = interpolate(
    spring({ frame: localFrame - 30, fps, config: { damping: 18 } }),
    [0, 1],
    [0.8, 1]
  );
  const ctaOpacity = spring({ frame: localFrame - 55, fps, config: { damping: 20 } });
  const fadeToBlack = interpolate(
    localFrame,
    [100, 150],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.canvas,
        opacity,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 40,
          right: 40,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          opacity: gridOpacity,
        }}
      >
        {FEATURES.map((label, i) => (
          <div
            key={label}
            style={{
              padding: '16px 24px',
              background: colors.surface,
              borderRadius: 12,
              border: `1px solid ${colors.border}`,
              fontFamily: fonts.body,
              fontSize: 16,
              fontWeight: 600,
              color: colors.text,
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {label}
          </div>
        ))}
      </div>
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          maxWidth: 380,
          width: '50%',
        }}
      >
        <Img
          src={staticFile('luxselle-logo.svg')}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          opacity: ctaOpacity,
          fontFamily: fonts.body,
          fontSize: 22,
          color: colors.text,
          textAlign: 'center',
          maxWidth: 700,
        }}
      >
        Luxselle — Smart Procurement for Luxury Goods
      </div>
      <AbsoluteFill
        style={{
          backgroundColor: colors.dark,
          opacity: fadeToBlack,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
