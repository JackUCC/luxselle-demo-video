import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { spring, interpolate } from 'remotion';
import { MockBrowser } from '../components/MockBrowser';
import { FeatureLabel } from '../components/FeatureLabel';
import { colors } from '../lib/theme';
import { sceneOpacity } from '../lib/animations';

type Props = { startFrame: number; endFrame: number };

export const DashboardScene: React.FC<Props> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneOpacity(frame, startFrame, endFrame, 15);
  if (frame < startFrame || frame >= endFrame) return null;

  const localFrame = frame - startFrame;
  const browserSlide = spring({
    frame: localFrame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const browserY = interpolate(browserSlide, [0, 1], [120, 0]);
  const browserOpacity = interpolate(browserSlide, [0, 1], [0, 1]);

  const label1 = spring({ frame: localFrame - 30, fps, config: { damping: 20 } });
  const label2 = spring({ frame: localFrame - 60, fps, config: { damping: 20 } });
  const label3 = spring({ frame: localFrame - 90, fps, config: { damping: 20 } });

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
          transform: `translateY(${browserY}px)`,
          opacity: browserOpacity,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MockBrowser
          screenshot="screenshots/dashboard.png"
          style={{ position: 'relative' }}
        >
          {/* Animated highlight callouts */}
          <div
            style={{
              position: 'absolute',
              top: '18%',
              left: '22%',
              width: '24%',
              height: '22%',
              border: `3px solid ${colors.gold}`,
              borderRadius: 12,
              opacity: label1,
              boxShadow: `0 0 0 2px ${colors.surface}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '18%',
              right: '22%',
              width: '28%',
              height: '22%',
              border: `3px solid ${colors.gold}`,
              borderRadius: 12,
              opacity: label2,
              boxShadow: `0 0 0 2px ${colors.surface}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '28%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '30%',
              height: '18%',
              border: `3px solid ${colors.gold}`,
              borderRadius: 12,
              opacity: label3,
              boxShadow: `0 0 0 2px ${colors.surface}`,
            }}
          />
        </MockBrowser>
      </div>
      <FeatureLabel text="Real-time KPIs · Market Intelligence · AI Insights" delay={30} position="bottom" style={{ position: 'absolute', bottom: 40 }} />
    </AbsoluteFill>
  );
};
