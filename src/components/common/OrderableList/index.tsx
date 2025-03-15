import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useCallback, useEffect, useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import DragOverlayItem from './DragOverlayItem';
import SortableItem from './SortableItem';

interface Props<T> {
  dataSource: T[];
  renderItemInner: (item: T) => JSX.Element;
  onChangeOrder?: (itemsWithNewOrder: T[]) => void;
  onDeleteFromList?: (itemToDelete: T) => void;
  buttonDelete?: JSX.Element;
}

type Generic_Type_With_Id = {
  id: number;
};

const OrderableList = <T extends Generic_Type_With_Id>({
  dataSource,
  renderItemInner,
  onChangeOrder,
  onDeleteFromList,
  buttonDelete,
}: Props<T>) => {
  const [items, setItems] = useState(dataSource);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [activeItem, setActiveItem] = useState<T | null>(null);

  useEffect(() => {
    setItems(dataSource);
  }, [dataSource]);

  useEffect(() => {
    if (onChangeOrder) {
      onChangeOrder(items);
    }
  }, [items, onChangeOrder]);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const item = items.find((item) => String(item.id) === event.active.id);
      setActiveItem(item ?? null);
    },
    [items],
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(
          (item) => String(item.id) === active.id,
        );
        const newIndex = items.findIndex(
          (item) => String(item.id) === over!.id,
        );

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveItem(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveItem(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={items.map((item) => item.id.toString())}
        strategy={horizontalListSortingStrategy}
      >
        {items.map((item) => (
          <div key={item.id} className="container-sortable-item">
            <SortableItem key={item.id} id={String(item.id)}>
              <div className="orderable-list-item">{renderItemInner(item)}</div>
            </SortableItem>
            {!activeItem && !buttonDelete && (
              <button
                type="button"
                className="btn_unselect_pictogram"
                onClick={() => onDeleteFromList && onDeleteFromList(item)}
              >
                <FaTrashCan size="12px" />
              </button>
            )}
          </div>
        ))}
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
        {activeItem ? (
          <DragOverlayItem isDragging>
            {renderItemInner(activeItem)}
          </DragOverlayItem>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default OrderableList;
