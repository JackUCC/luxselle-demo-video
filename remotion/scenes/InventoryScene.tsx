import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { spring } from 'remotion';
import { MockBrowser } from '../components/MockBrowser';
import { FeatureLabel } from '../components/FeatureLabel';
import { colors } from '../lib/theme';
import { sceneOpacity } from '../lib/animations';

type Props = { startFrame: number; endFrame: number };

export const InventoryScene: React.FC<Props> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneOpacity(frame, startFrame, endFrame, 15);
  if (frame < startFrame || frame >= endFrame) return null;

  const localFrame = frame - startFrame;
  const browserOpacity = spring({ frame: localFrame, fps, config: { damping: 20 } });
  const highlight = spring({ frame: localFrame - 20, fps, config: { damping: 20 } });
  const drawer = spring({ frame: localFrame - 70, fps, config: { damping: 18 } });

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
        <MockBrowser screenshot="screenshots/inventory.png">
          <div
            style={{
              position: 'absolute',
              top: '14%',
              left: '68%',
              width: '14%',
              height: '6%',
              border: `3px solid ${colors.gold}`,
              borderRadius: 8,
              opacity: highlight,
              boxShadow: `0 0 0 2px ${colors.surface}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '20%',
              right: 0,
              width: '32%',
              height: '75%',
              border: `3px solid ${colors.gold}`,
              borderRight: 'none',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderRadius: 12,
              opacity: drawer,
              boxShadow: `-4px 0 14px rgba(0,0,0,0.08)`,
            }}
          />
        </MockBrowser>
      </div>
      <FeatureLabel text="Track every item. Know your stock." delay={25} position="bottom" style={{ position: 'absolute', bottom: 40 }} />
    </AbsoluteFill>
  );
};
