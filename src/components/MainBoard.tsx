import { SortableContext } from '@dnd-kit/sortable';
import type { Column, Id } from '../types';
import { useMemo } from 'react';
import ColumnContainer from './ColumnContainer';

interface MainBoardProps {
  columns: Column[];
  deleteColumn: (id: Id) => void;
}

const MainBoard = ({ columns, deleteColumn }: MainBoardProps) => {
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  return (
    <div className="">
      <SortableContext items={columnsId}>
        <div className="mt-10 sm:mt-14 md:mt-16 flex gap-4 overflow-auto">
          {columns.map((colItem) => (
            <ColumnContainer key={colItem.id} column={colItem} deleteColumn={deleteColumn} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default MainBoard;
