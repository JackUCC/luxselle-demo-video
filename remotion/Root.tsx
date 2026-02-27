import React from 'react';
import { Composition } from 'remotion';
import { LuxselleDemo } from './LuxselleDemo';
import { LUXSELLE_DEMO_DURATION_FRAMES, LUXSELLE_DEMO_FPS } from './lib/constants';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="LuxselleDemo"
        component={LuxselleDemo}
        durationInFrames={LUXSELLE_DEMO_DURATION_FRAMES}
        fps={LUXSELLE_DEMO_FPS}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
