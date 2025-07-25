import { useState } from 'react';
import PlusIcon from './icons/PlusIcon';
import type { Column } from './types';
import { generateId } from './utils/GenerateId';

function App() {
  const [columns, setColumns] = useState<Column[]>([]);

  const createNewColumn = () => {
    const addToColumn: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, addToColumn]);
  };

  console.log('this is column', columns);
  return (
    <main className="py-8 px-10">
      <div className="flex justify-between">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">
          Kanban Style Board for LYXA
        </h1>
        <button
          onClick={createNewColumn}
          className="h-[60px] w-[200px] min-w-[200px] cursor-pointer rounded-lg bg-[#323334] text-white border-[#161C22] p-4 ring-emerald-300 hover:ring-2 flex justify-between items-centers"
        >
          Add Column <PlusIcon />
        </button>
      </div>
    </main>
  );
}

export default App;
