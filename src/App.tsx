import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import BookForm from './views/BookForm';
import BookList from './views/BookList';
import { bookPresenter } from './controllers/BookController';
import Header from './views/Header';
import BookVisibilitySwitch from './views/BookVisibilitySwitch';

const App: React.FC = observer(() => {
  useEffect(() => {
    bookPresenter.loadBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header presenter={bookPresenter} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <BookForm presenter={bookPresenter} />
          </div>
          <div>
            <BookVisibilitySwitch presenter={bookPresenter} />
            <BookList presenter={bookPresenter} />
          </div>
        </div>
      </main>
    </div>
  );
});

export default App;