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
      boxShadow: isDragging
        ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px'
        : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
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
