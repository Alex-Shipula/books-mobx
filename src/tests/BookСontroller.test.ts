import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BookСontroller } from '../controllers/BookController';
import { BookStore } from '../stores/BookStore';
import { Book } from '../models/book';


vi.mock('../services/api', () => ({
  USER_ID: 'user-1',
  BookService: {
    getBooks: vi.fn(),
    createBook: vi.fn()
  }
}));

describe('BookСontroller', () => {
  let bookStore: BookStore;
  let presenter: BookСontroller;

  beforeEach(() => {
    bookStore = new BookStore();
    presenter = new BookСontroller(bookStore);

    presenter.resetForm();
  });

  describe('Form handling', () => {
    it('should update name correctly', () => {
      presenter.setTitle('Test Book');
      expect(presenter.name).toBe('Test Book');
    });

    it('should update author correctly', () => {
      presenter.setAuthor('Test Author');
      expect(presenter.author).toBe('Test Author');
    });

    it('should update ownerId correctly with valid input', () => {
      presenter.setOwnerId('owner');
      expect(presenter.ownerId).toBe('owner');
    });

    it('should not update ownerId with invalid input', () => {
      presenter.setOwnerId('');
      expect(presenter.ownerId).toBe('');
    });

    it('should reset form correctly', () => {
      presenter.setTitle('Test Book');
      presenter.setAuthor('Test Author');
      presenter.setOwnerId('owner');
      presenter.formError = 'Some error';

      presenter.resetForm();

      expect(presenter.name).toBe('');
      expect(presenter.author).toBe('');
      expect(presenter.ownerId).toBe('');
      expect(presenter.formError).toBeNull();
    });
  });

  describe('Form validation', () => {
    it('should validate form with valid data', () => {
      presenter.setTitle('Test Book');
      presenter.setAuthor('Test Author');
      presenter.setOwnerId('owner');

      expect(presenter.validateForm()).toBe(true);
      expect(presenter.formError).toBeNull();
    });

    it('should fail validation with empty name', () => {
      presenter.setTitle('');
      presenter.setAuthor('Test Author');
      presenter.setOwnerId('owner');

      expect(presenter.validateForm()).toBe(false);
      expect(presenter.formError).toBe('Title is required');
    });

    it('should fail validation with empty author', () => {
      presenter.setTitle('Test Book');
      presenter.setAuthor('');
      presenter.setOwnerId('owner');

      expect(presenter.validateForm()).toBe(false);
      expect(presenter.formError).toBe('Author is required');
    });

    it('should fail validation with invalid ownerId', () => {
      presenter.setTitle('Test Book');
      presenter.setAuthor('Test Author');
      presenter.setOwnerId('');

      expect(presenter.validateForm()).toBe(false);
      expect(presenter.formError).toBe('Owner is required');
    });
  });

  describe('Book operations', () => {
    it('should add a book when form is valid', async () => {

      presenter.setTitle('Test Book');
      presenter.setAuthor('Test Author');
      presenter.setOwnerId('owner');

      const mockBook: Book = {
        id: 1,
        name: 'Test Book',
        author: 'Test Author',
        ownerId: 'owner'
      };
      
      bookStore.addBook = vi.fn().mockResolvedValue(mockBook);
      
      const result = await presenter.addBook();
      
      expect(bookStore.addBook).toHaveBeenCalledWith({
        id: expect.any(Number),
        name: 'Test Book',
        author: 'Test Author',
        ownerId: 'owner'
      });
      expect(result).toEqual(mockBook);

      expect(presenter.name).toBe('');
      expect(presenter.author).toBe('');
    });

    it('should not add a book when form is invalid', async () => {
      presenter.setTitle('');
      presenter.setAuthor('Test Author');
      presenter.setOwnerId('owner');

      bookStore.addBook = vi.fn();

      const result = await presenter.addBook();
      
      expect(bookStore.addBook).not.toHaveBeenCalled();
      expect(result).toBeNull();
      expect(presenter.formError).toBe('Title is required');
    });

    it('should load books from the store', async () => {
      bookStore.fetchBooks = vi.fn();

      await presenter.loadBooks();
      
      expect(bookStore.fetchBooks).toHaveBeenCalled();
    });
  });

  describe('Computed properties', () => {
    it('should return books from the store', () => {
      const mockBooks: Book[] = [
        { id: 1, name: 'Book 1', author: 'Author 1', ownerId: 'owner' },
        { id: 2, name: 'Book 2', author: 'Author 2', ownerId: 'owner' }
      ]
      
      bookStore.books = mockBooks;
      
      expect(presenter.books).toEqual(mockBooks);
    });

    it('should return loading state from the store', () => {
      bookStore.isLoading = true;
      expect(presenter.isLoading).toBe(true);
      
      bookStore.isLoading = false;
      expect(presenter.isLoading).toBe(false);
    });

    it('should return error from the store', () => {
      bookStore.error = 'Test error';
      expect(presenter.error).toBe('Test error');
      
      bookStore.error = null;
      expect(presenter.error).toBeNull();
    });
  });
});