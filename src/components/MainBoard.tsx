import type { Column } from '../types';

interface MainBoardProps {
  columns: Column[];
}

const MainBoard = ({ columns }: MainBoardProps) => {
  return (
    <div className="mt-10 sm:mt-14 md:mt-16 flex gap-4 overflow-auto">
      {columns.map((colItem) => (
        <div className="bg-columnBackgroundColor w-[350px] min-w-[300px] h-[500px] max-h-[500px] rounded-md flex flex-col text-white">
          <div className="text-center bg-black text-xl h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4">
            {' '}
            {colItem.title}
          </div>

          <div className="flex grow">
            Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum commodi harum
            corrupti nam assumenda accusantium velit. Magni ex dolorum optio nobis ipsa cumque,
            voluptates facere ratione iusto debitis, quidem dignissimos!
          </div>
          <div>Footer</div>
        </div>
      ))}
    </div>
  );
};

export default MainBoard;
