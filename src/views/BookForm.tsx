import React from 'react';
import { observer } from 'mobx-react-lite';
import { BookСontroller } from '../controllers/BookController';

interface BookFormProps {
  presenter: BookСontroller;
}

const BookForm: React.FC<BookFormProps> = observer(({ presenter }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await presenter.addBook();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={presenter.name}
            onChange={(e) => presenter.setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={presenter.author}
            onChange={(e) => presenter.setAuthor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter author name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700 mb-1">
            Owner
          </label>
          <input
            type="text"
            id="ownerId"
            value={presenter.ownerId}
            onChange={(e) => presenter.setOwnerId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter publication ownerId"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={presenter.isPrivate}
              onChange={(e) => presenter.setPrivate(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2 text-sm text-gray-700">Make this book private</span>
          </label>
        </div>

        {presenter.formError && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {presenter.formError}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={presenter.isLoading}
        >
          Add Book
        </button>
      </form>
    </div>
  );
});

export default BookForm;