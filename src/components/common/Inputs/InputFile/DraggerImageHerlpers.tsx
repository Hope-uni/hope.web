const PreviewPlacement = ['inside', 'outside'] as const;

export type PreviewPlacementType = (typeof PreviewPlacement)[number];
