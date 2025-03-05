import React from 'react';
import { observer } from 'mobx-react-lite';
import { BookIcon } from 'lucide-react';
import { BookСontroller } from '../controllers/BookController';

interface HeaderProps {
  presenter: BookСontroller;
}

const Header: React.FC<HeaderProps> = observer(({ presenter }) => {
  return (
    <header className="sticky top-0 bg-white shadow-md z-10">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BookIcon size={32} className="text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Book Manager</h1>
          </div>
          <div className="text-gray-600">
            Your books: <span className="font-bold">{presenter.privateBookCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;