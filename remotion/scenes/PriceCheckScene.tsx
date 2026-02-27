import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { spring, interpolate } from 'remotion';
import { MockBrowser } from '../components/MockBrowser';
import { FeatureLabel } from '../components/FeatureLabel';
import { colors } from '../lib/theme';
import { sceneOpacity } from '../lib/animations';

type Props = { startFrame: number; endFrame: number };

export const PriceCheckScene: React.FC<Props> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneOpacity(frame, startFrame, endFrame, 15);
  if (frame < startFrame || frame >= endFrame) return null;

  const localFrame = frame - startFrame;
  const browserOpacity = spring({ frame: localFrame, fps, config: { damping: 20 } });
  const callout1 = spring({ frame: localFrame - 25, fps, config: { damping: 20 } });
  const callout2 = spring({ frame: localFrame - 55, fps, config: { damping: 20 } });
  const callout3 = spring({ frame: localFrame - 85, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.canvas,
        opacity,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ opacity: browserOpacity, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <MockBrowser screenshot="screenshots/pricecheck.png">
          <div
            style={{
              position: 'absolute',
              top: '32%',
              left: '18%',
              width: '22%',
              height: '14%',
              border: `3px solid ${colors.gold}`,
              borderRadius: 10,
              opacity: callout1,
              boxShadow: `0 0 0 2px ${colors.surface}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '48%',
              left: '18%',
              width: '22%',
              height: '14%',
              border: `3px solid ${colors.gold}`,
              borderRadius: 10,
              opacity: callout2,
              boxShadow: `0 0 0 2px ${colors.surface}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '64%',
              left: '18%',
              width: '22%',
              height: '14%',
              border: `3px solid ${colors.gold}`,
              borderRadius: 10,
              opacity: callout3,
              boxShadow: `0 0 0 2px ${colors.surface}`,
            }}
          />
        </MockBrowser>
      </div>
      <FeatureLabel text="Make confident buying decisions" delay={20} position="right" style={{ position: 'absolute', right: 60 }} />
    </AbsoluteFill>
  );
};
