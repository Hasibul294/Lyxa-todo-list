import { useEffect, useRef } from 'react';
import type { TodoStatus } from '../types';
import { TODO_STATUS_COLORS } from '../constants/todoConfig';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onMove: (status: TodoStatus) => void;
  currentStatus: TodoStatus;
}

export function ContextMenu({ x, y, onClose, onMove, currentStatus }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const allStatuses = ['New', 'Ongoing', 'Done'] as const;
  const statusOptions = allStatuses.filter((status) => status !== currentStatus);

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
      style={{
        left: x,
        top: y,
        transform: 'translateX(-100%)',
        minWidth: '150px',
      }}
    >
      {statusOptions.map((status) => (
        <button
          key={status}
          className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2"
          onClick={() => {
            onMove(status);
            onClose();
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: TODO_STATUS_COLORS[status] }}
          ></span>
          Move to {status}
        </button>
      ))}
    </div>
  );
}
