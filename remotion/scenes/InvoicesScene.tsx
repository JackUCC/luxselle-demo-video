import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { spring } from 'remotion';
import { MockBrowser } from '../components/MockBrowser';
import { FeatureLabel } from '../components/FeatureLabel';
import { colors } from '../lib/theme';
import { sceneOpacity } from '../lib/animations';

type Props = { startFrame: number; endFrame: number };

export const InvoicesScene: React.FC<Props> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneOpacity(frame, startFrame, endFrame, 15);
  if (frame < startFrame || frame >= endFrame) return null;

  const localFrame = frame - startFrame;
  const browserOpacity = spring({ frame: localFrame, fps, config: { damping: 20 } });
  const pdfHighlight = spring({ frame: localFrame - 50, fps, config: { damping: 20 } });

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
        <MockBrowser screenshot="screenshots/invoices.png">
          <div
            style={{
              position: 'absolute',
              top: '25%',
              right: '12%',
              width: '28%',
              height: '55%',
              border: `3px solid ${colors.gold}`,
              borderRadius: 10,
              opacity: pdfHighlight,
              boxShadow: `0 0 0 2px ${colors.surface}`,
            }}
          />
        </MockBrowser>
      </div>
      <FeatureLabel text="Professional invoicing in seconds" delay={25} position="bottom" style={{ position: 'absolute', bottom: 40 }} />
    </AbsoluteFill>
  );
};
