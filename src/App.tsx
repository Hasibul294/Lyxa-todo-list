import { useState } from 'react';
import PlusIcon from './icons/PlusIcon';
import type { Column, Id } from './types';
import { generateId } from './utils/GenerateId';
import MainBoard from './components/MainBoard';
import { defaultColumns } from './constants/columns';

function App() {
  const [columns, setColumns] = useState<Column[]>(defaultColumns);

  const createNewColumn = () => {
    const addToColumn: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
      color: '#E2E8F0',
      items: [],
    };

    setColumns([...columns, addToColumn]);
  };

  const deleteColumn = (id: Id) => {
    console.log('col id', id);
    const filterColumnById = columns.filter((col) => col.id !== id);
    setColumns(filterColumnById);
  };

  return (
    <main className="py-8 px-4 sm:px-8 md:px-10">
      {/* kanban board container  */}
      <div className="min-h-[100vh]">
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">
            Kanban Style Board for LYXA
          </h1>
          <button onClick={createNewColumn} className="add-column">
            Add Column <PlusIcon />
          </button>
        </div>
        <MainBoard columns={columns} deleteColumn={deleteColumn} setColumns={setColumns} />
      </div>
    </main>
  );
}

export default App;
