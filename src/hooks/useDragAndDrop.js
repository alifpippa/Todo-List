import { useCallback } from "react";
import reorderTodos from "../utils/reorderTodos";

export default function useDragAndDrop(items, onReorder) {
  return useCallback(
    (result) => {
      const { source, destination } = result;
      if (!destination || source.index === destination.index) return;

      onReorder(reorderTodos(items, source.index, destination.index));
    },
    [items, onReorder]
  );
}
