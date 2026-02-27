import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { spring } from 'remotion';
import { Img, staticFile } from 'remotion';
import { FeatureLabel } from '../components/FeatureLabel';
import { colors } from '../lib/theme';
import { sceneOpacity } from '../lib/animations';

type Props = { startFrame: number; endFrame: number };

export const SidecarScene: React.FC<Props> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneOpacity(frame, startFrame, endFrame, 15);
  if (frame < startFrame || frame >= endFrame) return null;

  const localFrame = frame - startFrame;
  const leftOpacity = spring({ frame: localFrame, fps, config: { damping: 20 } });
  const rightOpacity = spring({ frame: localFrame - 15, fps, config: { damping: 20 } });
  const widgetHighlight = spring({ frame: localFrame - 45, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.canvas,
        opacity,
        flexDirection: 'row',
      }}
    >
      <div
        style={{
          flex: 1,
          opacity: leftOpacity,
          background: colors.warmAccent,
          borderRight: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <div style={{ color: colors.textSecondary, fontSize: 18, fontFamily: 'Inter, sans-serif' }}>
          Supplier website
        </div>
      </div>
      <div
        style={{
          width: 420,
          opacity: rightOpacity,
          background: colors.surface,
          boxShadow: '-4px 0 20px rgba(0,0,0,0.08)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Img
          src={staticFile('screenshots/sidecar.png')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: 16,
            right: 16,
            height: '25%',
            border: `2px solid ${colors.gold}`,
            borderRadius: 10,
            opacity: widgetHighlight,
            pointerEvents: 'none',
          }}
        />
      </div>
      <FeatureLabel text="Works alongside any supplier site" delay={30} position="bottom" style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }} />
    </AbsoluteFill>
  );
};
