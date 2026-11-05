declare module 'better-justified-layout' {
  interface JustifiedLayoutOptions {
    containerWidth?: number;
    containerPadding?: number | { top?: number; right?: number; bottom?: number; left?: number };
    boxSpacing?: number | { horizontal?: number; vertical?: number };
    targetRowHeight?: number;
  }

  interface JustifiedLayoutBox {
    left: number;
    top: number;
    width: number;
    height: number;
  }

  interface JustifiedLayoutResult {
    containerHeight: number;
    boxes: JustifiedLayoutBox[];
  }

  export default function justifiedLayout(
    aspectRatios: number[],
    options?: JustifiedLayoutOptions,
  ): JustifiedLayoutResult;
}
