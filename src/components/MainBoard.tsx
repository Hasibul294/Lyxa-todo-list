import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import type { Column, Id, Todo, TodoStatus } from '../types';
import { useMemo, useState } from 'react';
import ColumnContainer from './ColumnContainer';
import { TodoItem } from './TodoItem';

interface MainBoardProps {
  columns: Column[];
  deleteColumn: (id: Id) => void;
  setColumns: (columns: Column[]) => void;
}

const MainBoard = ({ columns, deleteColumn, setColumns }: MainBoardProps) => {
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Todo') {
      setActiveTodo(event.active.data.current.todo);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTodo(null);

    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    if (active.data.current?.type === 'Column') {
      const activeColumnIndex = columns.findIndex((col) => col.id === active.id);
      const overColumnIndex = columns.findIndex((col) => col.id === over.id);

      if (activeColumnIndex !== -1 && overColumnIndex !== -1) {
        setColumns(arrayMove(columns, activeColumnIndex, overColumnIndex));
      }
    }

    if (active.data.current?.type === 'Todo') {
      const { id: activeId } = active;
      const { id: overId } = over;

      const activeColumnId = active.data.current.columnId;
      const overColumnId = over.data.current?.columnId || over.data.current?.column?.id;

      if (!activeColumnId || !overColumnId) return;

      const sourceColumn = columns.find((col) => col.id === activeColumnId);
      const destColumn = columns.find((col) => col.id === overColumnId);

      if (!sourceColumn || !destColumn) return;

      const sourceTodoIndex = sourceColumn.items.findIndex((todo) => todo.id === activeId);
      const destTodoIndex = destColumn.items.findIndex((todo) => todo.id === overId);

      if (sourceTodoIndex === -1) return;

      const newColumns = columns.map((col) => {
        // Remove from source column
        if (col.id === activeColumnId) {
          const newItems = [...col.items];
          newItems.splice(sourceTodoIndex, 1);
          return { ...col, items: newItems };
        }
        // Add to destination column
        if (col.id === overColumnId) {
          const newItems = [...col.items];
          const todoToMove = sourceColumn.items[sourceTodoIndex];
          const indexToInsert = destTodoIndex >= 0 ? destTodoIndex : newItems.length;
          newItems.splice(indexToInsert, 0, {
            ...todoToMove,
            status: col.title as TodoStatus,
          });
          return { ...col, items: newItems };
        }
        return col;
      });

      setColumns(newColumns);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    if (active.data.current?.type === 'Todo' && over) {
      const overId = over.id;

      const activeIndex = active.data.current.index;
      const activeColumnId = active.data.current.columnId;

      // Figure out the column we're dropping on
      const isOverAColumn = over.data.current?.type === 'Column';
      const overColumnId = isOverAColumn ? over.id : over.data.current?.columnId;

      if (!activeColumnId || !overColumnId) return;

      const sourceColumn = columns.find((col) => col.id === activeColumnId);
      const destColumn = columns.find((col) => col.id === overColumnId);

      if (!sourceColumn || !destColumn) return;

      // Handle same column sorting
      if (activeColumnId === overColumnId) {
        const overIndex = destColumn.items.findIndex((item) => item.id === overId);
        if (overIndex === -1) return;

        const newItems = [...destColumn.items];
        const [movedItem] = newItems.splice(activeIndex, 1);
        newItems.splice(overIndex, 0, movedItem);

        const newColumns = columns.map((col) => {
          if (col.id === activeColumnId) {
            return { ...col, items: newItems };
          }
          return col;
        });

        setColumns(newColumns);
        return;
      }

      // Handle moving to a different column
      const overIndex = isOverAColumn
        ? destColumn.items.length
        : destColumn.items.findIndex((item) => item.id === overId);

      const newColumns = columns.map((col) => {
        if (col.id === activeColumnId) {
          // Remove from source column
          return {
            ...col,
            items: col.items.filter((_, idx) => idx !== activeIndex),
          };
        }
        if (col.id === overColumnId) {
          // Insert into target column
          const movedItem = {
            ...sourceColumn.items[activeIndex],
            status: col.title as TodoStatus,
          };
          const newItems = [...col.items];
          const finalIndex = overIndex >= 0 ? overIndex : newItems.length;
          newItems.splice(finalIndex, 0, movedItem);
          return {
            ...col,
            items: newItems,
          };
        }
        return col;
      });

      setColumns(newColumns);
    }
  };

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
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="mt-10 sm:mt-14 md:mt-16">
        <SortableContext items={columnsId}>
          <div className="flex gap-4 overflow-auto">
            {columns.map((colItem) => (
              <ColumnContainer
                key={colItem.id}
                column={colItem}
                deleteColumn={deleteColumn}
                onAddTodo={(todo: Todo) => handleAddTodo(colItem.id, todo)}
                onUpdateTodo={handleUpdateTodo}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay dropAnimation={null}>
          {activeColumn && (
            <div className="opacity-80 cursor-grabbing">
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                onAddTodo={(todo: Todo) => handleAddTodo(activeColumn.id, todo)}
                onUpdateTodo={handleUpdateTodo}
              />
            </div>
          )}
          {activeTodo && (
            <div className="opacity-80 cursor-grabbing rotate-3">
              <TodoItem
                todo={activeTodo}
                onStatusChange={(todoId: Id, status: TodoStatus) =>
                  handleUpdateTodo(todoId, status)
                }
              />
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default MainBoard;
