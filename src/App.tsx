import { useState } from 'react';
import PlusIcon from './icons/PlusIcon';
import type { Column } from './types';
import { generateId } from './utils/GenerateId';
import MainBoard from './components/MainBoard';

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
    <main className="py-8 px-4 sm:px-8 md:px-10">
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">
          Kanban Style Board for LYXA
        </h1>
        <button onClick={createNewColumn} className="add-column">
          Add Column <PlusIcon />
        </button>
      </div>
      <MainBoard columns={columns} />
    </main>
  );
}

export default App;
