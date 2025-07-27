import DeleteIcon from '../icons/DeleteIcon';
import type { Column, Id, Todo, TodoStatus } from '../types';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getColumnStyles } from '../constants/columns.styles';
import { TodoItem } from './TodoItem';
import { AddTodo } from './AddTodo';

interface ColumnContainerProps {
  column: Column;
  deleteColumn: (id: Id) => void;
  onAddTodo?: (todo: Todo) => void;
  onUpdateTodo?: (todoId: Id, newStatus: TodoStatus) => void;
}

const ColumnContainer = (props: ColumnContainerProps) => {
  const { column, deleteColumn, onAddTodo, onUpdateTodo } = props;

  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleStatusChange = (todoId: Id, newStatus: TodoStatus) => {
    onUpdateTodo?.(todoId, newStatus);
  };

  const styles = getColumnStyles(column);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`w-[350px] h-[500px] max-h-[500px] rounded-lg flex flex-col ${styles.columnBg} border-2 ${styles.borderColor}`}
    >
      {/* Column Header */}
      <div
        className={`${styles.headerBg} text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-b-2 ${styles.borderColor} flex items-center justify-between`}
      >
        <div {...attributes} {...listeners} className="flex grow items-center gap-2">
          <div className="flex justify-center items-center bg-white px-2 py-1 rounded-full">
            {column.items.length}
          </div>
          {column.title}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="stroke-gray-500 hover:stroke-black hover:bg-gray-200 rounded p-1 hover:duration-300"
        >
          <DeleteIcon />
        </button>
      </div>

      {/* Column Content */}
      <div className="flex flex-col flex-grow gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <div className="flex flex-col gap-2">
          <SortableContext
            items={column.items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {column.items.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onStatusChange={handleStatusChange}
                index={index}
                columnId={column.id}
              />
            ))}
          </SortableContext>
        </div>
      </div>

      {/* Add Todo Button at Bottom */}
      {column.title === 'New' && onAddTodo && (
        <div className="p-3 border-t-2 border-gray-100">
          <AddTodo onAddTodo={onAddTodo} />
        </div>
      )}
    </div>
  );
};

export default ColumnContainer;
