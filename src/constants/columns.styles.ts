import type { Column } from '../types';

export const getColumnStyles = (column: Column) => {
    switch (column.title) {
        case 'New':
            return {
                headerBg: 'bg-gray-100',
                columnBg: 'bg-gray-50',
                borderColor: 'border-gray-200'
            };
        case 'Ongoing':
            return {
                headerBg: 'bg-yellow-100',
                columnBg: 'bg-yellow-50',
                borderColor: 'border-yellow-200'
            };
        case 'Done':
            return {
                headerBg: 'bg-green-100',
                columnBg: 'bg-green-50',
                borderColor: 'border-green-200'
            };
        default:
            return {
                headerBg: 'bg-gray-100',
                columnBg: 'bg-gray-50',
                borderColor: 'border-gray-200'
            };
    }
};
