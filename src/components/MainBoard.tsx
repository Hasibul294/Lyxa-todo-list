import { SortableContext } from '@dnd-kit/sortable';
import type { Column, Id, Todo, TodoStatus } from '../types';
import { useMemo } from 'react';
import ColumnContainer from './ColumnContainer';

interface MainBoardProps {
  columns: Column[];
  deleteColumn: (id: Id) => void;
  setColumns: (columns: Column[]) => void;
}

const MainBoard = ({ columns, deleteColumn, setColumns }: MainBoardProps) => {
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  console.log('this is column', columns);

  const handleAddTodo = (columnId: Id, newTodo: Todo) => {
    const newColumns = columns.map((col) => {
      if (col.id === columnId) {
        return {
          ...col,
          items: [newTodo, ...col.items], // Add new todo at the beginning
        };
      }
      return col;
    });
    setColumns(newColumns);
  };

  const handleUpdateTodo = (todoId: Id, newStatus: TodoStatus) => {
    let todoToMove: Todo | undefined;

    // First, find the todo and remove it from its current column
    const columnsWithoutTodo = columns.map((col) => {
      const todo = col.items.find((item) => item.id === todoId);
      if (todo) {
        todoToMove = todo;
        return {
          ...col,
          items: col.items.filter((item) => item.id !== todoId),
        };
      }
      return col;
    });

    // Then, add the todo to its new column with updated status
    if (todoToMove) {
      const finalColumns = columnsWithoutTodo.map((col) => {
        if (col.title === newStatus) {
          return {
            ...col,
            items: [...col.items, { ...todoToMove!, status: newStatus }],
          };
        }
        return col;
      });
      setColumns(finalColumns);
      console.log('Updated columns:', finalColumns);
    }
  };

  return (
    <div className="">
      <SortableContext items={columnsId}>
        <div className="mt-10 sm:mt-14 md:mt-16 flex gap-4 overflow-auto">
          {columns.map((colItem) => (
            <ColumnContainer
              key={colItem.id}
              column={colItem}
              deleteColumn={deleteColumn}
              onAddTodo={(todo) => handleAddTodo(colItem.id, todo)}
              onUpdateTodo={handleUpdateTodo}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default MainBoard;
