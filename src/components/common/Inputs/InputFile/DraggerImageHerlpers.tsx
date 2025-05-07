export const PREVIEW_PLACEMENT = {
  INSIDE: 'inside',
  OUTSIDE: 'outside',
} as const;

export type PreviewPlacementType =
  (typeof PREVIEW_PLACEMENT)[keyof typeof PREVIEW_PLACEMENT];
