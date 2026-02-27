import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { spring, interpolate } from 'remotion';
import { MockBrowser } from '../components/MockBrowser';
import { FeatureLabel } from '../components/FeatureLabel';
import { colors } from '../lib/theme';
import { sceneOpacity } from '../lib/animations';

type Props = { startFrame: number; endFrame: number };

export const SourcingScene: React.FC<Props> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneOpacity(frame, startFrame, endFrame, 15);
  if (frame < startFrame || frame >= endFrame) return null;

  const localFrame = frame - startFrame;
  const browserOpacity = spring({ frame: localFrame, fps, config: { damping: 20 } });
  const pipelineProgress = interpolate(
    localFrame,
    [30, 180],
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
      <div style={{ opacity: browserOpacity, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <MockBrowser screenshot="screenshots/sourcing.png">
          <div
            style={{
              position: 'absolute',
              bottom: '22%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '70%',
              height: 8,
              background: colors.border,
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${pipelineProgress * 100}%`,
                height: '100%',
                background: colors.gold,
                borderRadius: 4,
                transition: 'width 0.3s',
              }}
            />
          </div>
        </MockBrowser>
      </div>
      <FeatureLabel text="From request to fulfillment" delay={15} position="bottom" style={{ position: 'absolute', bottom: 40 }} />
    </AbsoluteFill>
  );
};
