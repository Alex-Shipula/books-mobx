import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import BookForm from './views/BookForm';
import BookList from './views/BookList';
import { bookPresenter } from './controllers/BookController';
import { BookIcon } from 'lucide-react';

const App: React.FC = observer(() => {
  useEffect(() => {
    bookPresenter.loadBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <BookIcon size={32} className="text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Book Manager</h1>
          </div>
          <p className="text-gray-600">Manage your book collection with ease</p>
        </header>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <BookForm presenter={bookPresenter} />
          </div>
          <div>
            <BookList presenter={bookPresenter} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default App;