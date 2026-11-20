// Small mutable store shared between the WebGL scene and the DOM overlays.
// It is read inside animation frames, so it deliberately avoids React state.
export const sceneStore = {
  theme: 'dark',
  reducedMotion: false,
  heroVisibility: 1, // 1 while the hero fills the screen, 0 once scrolled past
  top: [], // [{ label, score, x, y }] the three skills nearest to the cursor
}
