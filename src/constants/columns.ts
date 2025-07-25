import type { Column } from '../types';
import { generateId } from '../utils/GenerateId';

export const defaultColumns: Column[] = [
    {
        id: generateId(),
        title: 'New',
        color: '#E2E8F0', // Light gray color
        items: [],

    },
    {
        id: generateId(),
        title: 'Ongoing',
        color: '#FEF9C3', // Light yellow color
        items: [],
    },
    {
        id: generateId(),
        title: 'Done',
        color: '#BBF7D0', // Light green color
        items: [],
    }
];
