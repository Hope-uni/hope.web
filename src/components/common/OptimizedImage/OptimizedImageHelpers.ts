import { CSSProperties } from 'react';

const ImageShape = ['circle', 'square', 'round'] as const;

export type OptimizedImageShapeType = (typeof ImageShape)[number];

export const StylesShape: Record<
  OptimizedImageShapeType,
  { borderRadius: CSSProperties['borderRadius'] }
> = {
  circle: {
    borderRadius: '50%',
  },
  square: {
    borderRadius: '5px',
  },
  round: {
    borderRadius: '10px',
  },
};
