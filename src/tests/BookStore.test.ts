import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BookStore } from '../stores/BookStore';
import { BookService } from '../services/api';
import { Book, MockedBookService } from '../models/book';

const books: Book[] = [
  { id: 1, name: 'Book 1', author: 'Author', ownerId: 'owner' },
  { id: 2, name: 'Book 2', author: 'Author', ownerId: 'owner' },
  { id: 3, name: 'Book 3', author: 'Author', ownerId: 'owner' },
  { id: 4, name: 'Book 4', author: 'Author', ownerId: 'owner' }
];

vi.mock('../services/api', () => ({
  BookService: {
    getBooks: vi.fn(),
    createBook: vi.fn(),
    deleteBook: vi.fn(),
  },
}));

describe('BookStore', () => {
  let store: BookStore;
  let mockedService: MockedBookService;

  beforeEach(() => {
    store = new BookStore();
    vi.resetAllMocks();
    mockedService = BookService as unknown as MockedBookService;
  });

  describe('fetchBooks', () => {
    it('should fetch books and update state on success', async () => {
      const mockBooks: Book[] = [...books];
      mockedService.getBooks.mockResolvedValue(mockBooks);

      expect(store.books).toEqual([]);
      expect(store.isLoading).toBe(false);
      expect(store.error).toBeNull();

      await store.fetchBooks();

      expect(mockedService.getBooks).toHaveBeenCalled();
      expect(store.books).toEqual(mockBooks);
      expect(store.isLoading).toBe(false);
      expect(store.error).toBeNull();
    });

    it('should handle errors when fetching books', async () => {
      mockedService.getBooks.mockRejectedValue(new Error('API error'));

      await store.fetchBooks();

      expect(mockedService.getBooks).toHaveBeenCalled();
      expect(store.books).toEqual([]);
      expect(store.isLoading).toBe(false);
      expect(store.error).toBe('Failed to fetch books');
    });
  });

  describe('addBook', () => {
    it('should add a book and update state on success', async () => {
      const bookData: Book = { id: 3, name: 'New Book', author: 'New Author', ownerId: 'owner' };
      const newBook: Book = { ...bookData };

      mockedService.createBook.mockResolvedValue(newBook);

      const result = await store.addBook(bookData);

      expect(mockedService.createBook).toHaveBeenCalledWith(bookData);
      expect(result).toEqual(newBook);
      expect(store.books).toContainEqual(newBook);
      expect(store.isLoading).toBe(false);
      expect(store.error).toBeNull();
    });

    it('should handle errors when adding a book', async () => {
      const bookData: Book = { id: 3, name: 'New Book', author: 'New Author', ownerId: 'owner' };

      mockedService.createBook.mockRejectedValue(new Error('API error'));

      const result = await store.addBook(bookData);

      expect(mockedService.createBook).toHaveBeenCalledWith(bookData);
      expect(result).toBeNull();
      expect(store.books).toEqual([]);
      expect(store.isLoading).toBe(false);
      expect(store.error).toBe('Failed to add book');
    });
  });

  describe('utility methods', () => {
    it('should add a book directly to the store', () => {
      const book: Book = { id: 5, name: 'New Book', author: 'New Author', ownerId: 'owner' };

      store.addBookDirectly(book);

      expect(store.books).toContainEqual(book);
    });

    it('should clear all books', () => {
      store.books = [...books];

      store.clearBooks();

      expect(store.books).toEqual([]);
    });
  });
});
