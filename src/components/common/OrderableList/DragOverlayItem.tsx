import { CSSProperties, forwardRef, HTMLAttributes, ReactNode } from 'react';

export type Props = HTMLAttributes<HTMLDivElement> & {
  withOpacity?: boolean;
  isDragging?: boolean;
  children: ReactNode;
};

const DragOverlayItem = forwardRef<HTMLDivElement, Props>(
  ({ withOpacity, isDragging, children }, ref) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? '0.5' : '1',
      cursor: isDragging ? 'grabbing' : 'grab',
      transform: isDragging ? 'scale(1.05)' : 'scale(1)',
      borderRadius: '12px',
    };

    return (
      <div ref={ref} style={inlineStyles}>
        {children}
      </div>
    );
  },
);

DragOverlayItem.displayName = 'DragOverlayItem';

export default DragOverlayItem;
