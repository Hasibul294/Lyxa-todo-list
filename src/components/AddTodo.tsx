import { useState } from 'react';
import { generateId } from '../utils/GenerateId';
import type { Todo } from '../types';
import PlusIcon from '../icons/PlusIcon';

interface AddTodoProps {
  onAddTodo: (todo: Todo) => void;
}

export function AddTodo({ onAddTodo }: AddTodoProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo: Todo = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      status: 'New',
    };

    onAddTodo(newTodo);
    setTitle('');
    setDescription('');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full p-2 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        Add Todo
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-sm">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Todo title"
        className="w-full mb-2 p-2 border rounded"
        autoFocus
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full mb-2 p-2 border rounded h-20 resize-none"
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsAdding(false)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </form>
  );
}
