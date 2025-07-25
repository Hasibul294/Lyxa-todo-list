import { useState } from 'react';
import type { Todo, TodoStatus } from '../types';
import { TODO_STATUS_COLORS } from '../constants/todoConfig';
import { ContextMenu } from './ContextMenu';

interface TodoItemProps {
  todo: Todo;
  isDragging?: boolean;
  onStatusChange?: (todoId: Todo['id'], newStatus: TodoStatus) => void;
}

export function TodoItem({ todo, isDragging, onStatusChange }: TodoItemProps) {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!onStatusChange) return;

    // Position the context menu at the cursor
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleStatusChange = (newStatus: TodoStatus) => {
    onStatusChange?.(todo.id, newStatus);
  };

  return (
    <>
      <div
        onContextMenu={handleContextMenu}
        className={`p-4 rounded-lg shadow-sm bg-white mb-2 ${
          isDragging ? 'opacity-50' : ''
        } cursor-context-menu`}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold">{todo.title}</h3>
          <span
            className="px-2 py-1 text-xs rounded-full text-white"
            style={{ backgroundColor: TODO_STATUS_COLORS[todo.status] }}
          >
            {todo.status}
          </span>
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
