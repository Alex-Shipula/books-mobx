import React from 'react';
import { observer } from 'mobx-react-lite';
import { BookСontroller } from '../controllers/BookController';
import { BookVisibility } from '../models/book';

interface BookVisibilitySwitchProps {
  presenter: BookСontroller;
}

const BookVisibilitySwitch: React.FC<BookVisibilitySwitchProps> = observer(({ presenter }) => {
  const handleVisibilityChange = (visibility: BookVisibility) => {
    presenter.setVisibility(visibility);
  };

  return (
    <div className="flex space-x-2 mb-6">
      <button
        onClick={() => handleVisibilityChange('all')}
        className={`px-4 py-2 rounded-md transition-colors ${
          presenter.visibility === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Books
      </button>
      <button
        onClick={() => handleVisibilityChange('private')}
        className={`px-4 py-2 rounded-md transition-colors ${
          presenter.visibility === 'private'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Private Books
      </button>
    </div>
  );
});

export default BookVisibilitySwitch;