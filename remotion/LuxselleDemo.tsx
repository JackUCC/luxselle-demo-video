import React from 'react';
import { AbsoluteFill } from 'remotion';
import { IntroScene } from './scenes/IntroScene';
import { DashboardScene } from './scenes/DashboardScene';
import { PriceCheckScene } from './scenes/PriceCheckScene';
import { InventoryScene } from './scenes/InventoryScene';
import { SourcingScene } from './scenes/SourcingScene';
import { InvoicesScene } from './scenes/InvoicesScene';
import { SidecarScene } from './scenes/SidecarScene';
import { OutroScene } from './scenes/OutroScene';
import { SCENE_FRAMES } from './lib/constants';

export const LuxselleDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <IntroScene startFrame={SCENE_FRAMES.intro.start} endFrame={SCENE_FRAMES.intro.end} />
      <DashboardScene startFrame={SCENE_FRAMES.dashboard.start} endFrame={SCENE_FRAMES.dashboard.end} />
      <PriceCheckScene startFrame={SCENE_FRAMES.priceCheck.start} endFrame={SCENE_FRAMES.priceCheck.end} />
      <InventoryScene startFrame={SCENE_FRAMES.inventory.start} endFrame={SCENE_FRAMES.inventory.end} />
      <SourcingScene startFrame={SCENE_FRAMES.sourcing.start} endFrame={SCENE_FRAMES.sourcing.end} />
      <InvoicesScene startFrame={SCENE_FRAMES.invoices.start} endFrame={SCENE_FRAMES.invoices.end} />
      <SidecarScene startFrame={SCENE_FRAMES.sidecar.start} endFrame={SCENE_FRAMES.sidecar.end} />
      <OutroScene startFrame={SCENE_FRAMES.outro.start} endFrame={SCENE_FRAMES.outro.end} />
    </AbsoluteFill>
  );
};
