import type { Column } from '../types';
import { generateId } from '../utils/GenerateId';

export const defaultColumns: Column[] = [
    {
        id: generateId(),
        title: 'New',
        color: '#E2E8F0', // Light gray color
        items: [
            {
                id: generateId(),
                title: 'Create project documentation',
                description: 'Write comprehensive documentation for the todo list project including features and usage instructions',
                status: 'New'
            },
            {
                id: generateId(),
                title: 'Implement user authentication',
                description: 'Add user login and registration functionality to protect todo lists',
                status: 'New'
            },
            {
                id: generateId(),
                title: 'Add data persistence',
                description: 'Implement local storage to save todos between browser sessions',
                status: 'New'
            }
        ],
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
