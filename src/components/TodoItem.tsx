import type { Todo } from '../types';
import { TODO_STATUS_COLORS } from '../constants/todoConfig';

interface TodoItemProps {
  todo: Todo;
  isDragging?: boolean;
}

export function TodoItem({ todo, isDragging }: TodoItemProps) {
  return (
    <div className={`p-4 rounded-lg shadow-sm bg-white mb-2 ${isDragging ? 'opacity-50' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{todo.title}</h3>
        <span
          className="px-2 py-1 text-xs rounded-full text-white"
          style={{ backgroundColor: TODO_STATUS_COLORS[todo.status] }}
        >
          {todo.status}
        </span>
      </div>
      <p className="text-gray-600 text-sm">{todo.description}</p>
      <div className="mt-2 text-xs text-gray-400">
        Created: {todo.createdAt.toLocaleDateString()}
      </div>
    </div>
  );
}
