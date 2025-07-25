import type { TodoStatus } from '../types';

export const TODO_STATUS_COLORS: Record<TodoStatus, string> = {
    New: '#3B82F6',
    Ongoing: '#F97316',
    Done: '#22C55E'
};

export const NEW_COLUMN_ID = 'new-column';
