import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { spring, interpolate } from 'remotion';
import { colors, fonts } from '../lib/theme';
import { sceneOpacity } from '../lib/animations';

type Props = { startFrame: number; endFrame: number };

export const IntroScene: React.FC<Props> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneOpacity(frame, startFrame, endFrame, 20);
  if (frame < startFrame || frame >= endFrame) return null;

  const localFrame = frame - startFrame;
  const bgProgress = spring({ frame: localFrame, fps, config: { damping: 25 } });
  const r = Math.round(interpolate(bgProgress, [0, 1], [26, 250]));
  const g = Math.round(interpolate(bgProgress, [0, 1], [26, 249]));
  const b = Math.round(interpolate(bgProgress, [0, 1], [46, 247]));
  const bgHex = `rgb(${r},${g},${b})`;

  const logoScale = spring({
    frame: localFrame - 15,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const logoOpacity = interpolate(logoScale, [0, 1], [0, 1]);
  const scale = interpolate(logoScale, [0, 1], [0.7, 1]);

  const taglineOpacity = spring({
    frame: localFrame - 45,
    fps,
    config: { damping: 20 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgHex,
        opacity,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
        }}
      >
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${scale})`,
            maxWidth: 480,
            width: '70%',
          }}
        >
          <Img
            src={staticFile('luxselle-logo.svg')}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        <div
          style={{
            opacity: taglineOpacity,
            fontFamily: fonts.display,
            fontSize: 28,
            color: colors.text,
            letterSpacing: '0.02em',
          }}
        >
          Your Luxury Supplier Engine
        </div>
      </div>
    </AbsoluteFill>
  );
};
