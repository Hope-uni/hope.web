import { useCallback, useState } from 'react';

export function useAssignablePatients<T>(
  initialList: T[],
  keyExtractor: keyof T,
) {
  const [availableItems, setAvailableItems] = useState<T[]>(initialList);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  const handleChange = useCallback(
    (itemSelected: T) => {
      const itemToRemove = initialList.find(
        (item) => item[keyExtractor] === itemSelected[keyExtractor],
      );

      if (!itemToRemove) return;

      setSelectedItems((prev) => [...prev, itemToRemove]);

      setAvailableItems((prev) =>
        prev.filter(
          (item) => item[keyExtractor] !== itemToRemove[keyExtractor],
        ),
      );
    },
    [initialList, keyExtractor],
  );

  const handleDeleteSelected = useCallback(
    (itemSelected: T) => {
      const itemToRemove = initialList.find(
        (item) => item[keyExtractor] === itemSelected[keyExtractor],
      );

      if (!itemToRemove) return;

      setSelectedItems((prev) =>
        prev.filter(
          (item) => item[keyExtractor] !== itemSelected[keyExtractor],
        ),
      );

      setAvailableItems((prev) => {
        if (
          !prev.some(
            (item) => item[keyExtractor] === itemSelected[keyExtractor],
          )
        ) {
          return [...prev, itemToRemove];
        }
        return prev;
      });
    },
    [initialList, keyExtractor],
  );

  return {
    availableItems,
    selectedItems,
    setAvailableItems,
    setSelectedItems,
    handleChange,
    handleDeleteSelected,
  };
}
