import React, { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/core';
import DragOverlayItem from './DragOverlayItem';

interface Props {
  id: string;
  children: any;
}

const SortableItem = ({ id, children }: Props) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <DragOverlayItem withOpacity={isDragging}>{children}</DragOverlayItem>
    </div>
  );
};

export default SortableItem;
