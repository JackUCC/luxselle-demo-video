import { spring, interpolate } from 'remotion';

export function fadeIn(frame: number, fps: number, delay = 0): number {
  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
}

export function slideUp(frame: number, fps: number, delay = 0): number {
  const progress = fadeIn(frame, fps, delay);
  return interpolate(progress, [0, 1], [40, 0]);
}

export function scaleIn(frame: number, fps: number, delay = 0): number {
  const progress = fadeIn(frame, fps, delay);
  return interpolate(progress, [0, 1], [0.85, 1]);
}

export function goldWipeProgress(frame: number, startFrame: number, durationFrames: number): number {
  return interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
}

export function sceneOpacity(
  frame: number,
  startFrame: number,
  endFrame: number,
  fadeFrames = 15
): number {
  const inProgress = interpolate(
    frame,
    [startFrame, startFrame + fadeFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const outProgress = interpolate(
    frame,
    [endFrame - fadeFrames, endFrame],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  return Math.min(inProgress, outProgress);
}
