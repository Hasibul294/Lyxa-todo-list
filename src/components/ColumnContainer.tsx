import DeleteIcon from '../icons/DeleteIcon';
import type { Column, Id } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ColumnContainerProps {
  column: Column;
  deleteColumn: (id: Id) => void;
}

const ColumnContainer = (props: ColumnContainerProps) => {
  const { column, deleteColumn } = props;
  //   console.log('first', column.id, 'second', deleteColumn);
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[350px] min-w-[300px] h-[500px] max-h-[500px] rounded-md flex flex-col text-white border-2 border-blue-400"
    >
      <div className="flex justify-between items-center text-center bg-black text-xl h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4">
        <div {...attributes} {...listeners} className="flex grow gap-2">
          {column.title}
          <div className="flex justify-center bg-[#1e2c39] px-2 py-1 text-sm rounded-full">0</div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log('this is on click');
            deleteColumn(column.id);
          }}
          className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor px-1 py-2 cursor-pointer"
        >
          <DeleteIcon />
        </button>
      </div>

      <div className="flex grow">
        Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum commodi harum
        corrupti nam assumenda accusantium velit. Magni ex dolorum optio nobis ipsa cumque,
        voluptates facere ratione iusto debitis, quidem dignissimos!
      </div>
      <div>Footer</div>
    </div>
  );
};

export default ColumnContainer;
