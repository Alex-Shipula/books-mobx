import React from 'react';
import { observer } from 'mobx-react-lite';
import { BookСontroller } from '../controllers/BookController';

interface BookListProps {
  presenter: BookСontroller;
}

const BookList: React.FC<BookListProps> = observer(({ presenter }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-fit">
      <h2 className="text-xl font-bold mb-4">Book List</h2>
      
      {presenter.error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
          {presenter.error}
        </div>
      )}
      
      {presenter.isLoading && <p className="text-gray-500">Loading books...</p>}
      
      {!presenter.isLoading && presenter.books.length === 0 && (
        <p className="text-gray-500">No books available. Add your first book!</p>
      )}
      
      {presenter.books.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {presenter.books.map((book) => (
                <tr key={book.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {book.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.ownerId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

export default BookList;