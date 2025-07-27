import { useRef, useState } from 'react';
import type { Todo, TodoStatus, Id } from '../types';
import { TODO_STATUS_COLORS } from '../constants/todoConfig';
import { ContextMenu } from './ContextMenu';
import EllipsisIcon from '../icons/EllipsisIcon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TodoItemProps {
  todo: Todo;
  isDragging?: boolean;
  onStatusChange?: (todoId: Id, newStatus: TodoStatus) => void;
  index?: number;
  columnId?: Id;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function TodoItem({ todo, isDragging, onStatusChange, index, columnId }: TodoItemProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging: dragging,
  } = useSortable({
    id: todo.id,
    data: {
      type: 'Todo',
      todo,
      index,
      columnId,
    },
  });
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleMenuClick = () => {
    if (!onStatusChange || !menuButtonRef.current) return;

    const rect = menuButtonRef.current.getBoundingClientRect();
    setContextMenu({
      x: rect.right,
      y: rect.top,
    });
  };

  const handleStatusChange = (newStatus: TodoStatus) => {
    onStatusChange?.(todo.id, newStatus);
  };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={`p-2 rounded-lg shadow-sm bg-white mb-2 ${
          dragging ? 'opacity-50' : ''
        } group cursor-grab`}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold">{todo.title}</h3>
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-1 text-xs rounded-full text-white"
              style={{ backgroundColor: TODO_STATUS_COLORS[todo.status] }}
            >
              {todo.status}
            </span>
            <button
              ref={menuButtonRef}
              onClick={handleMenuClick}
              className="p-1 rounded hover:bg-gray-100 transition-opacity cursor-pointer"
            >
              <EllipsisIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-xs">{todo.description}</p>
      </div>
      {contextMenu && onStatusChange && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          currentStatus={todo.status}
          onClose={() => setContextMenu(null)}
          onMove={handleStatusChange}
        />
      )}
    </>
  );
}
