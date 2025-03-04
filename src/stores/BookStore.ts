import { makeAutoObservable, runInAction } from 'mobx';
import { Book } from '../models/book';
import { BookService } from '../services/api';

export class BookStore {
  books: Book[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBooks() {
    this.isLoading = true;
    this.error = null;
    
    try {
      const books = await BookService.getBooks();
      runInAction(() => {
        this.books = books;
        this.isLoading = false;
      });
    } catch {
      runInAction(() => {
        this.error = 'Failed to fetch books';
        this.isLoading = false;
      });
    }
  }

  async addBook(bookData: Book) {
    this.isLoading = true;
    this.error = null;
    
    try {
      const newBook = await BookService.createBook(bookData);      
      runInAction(() => {
        if (newBook) {
          this.books.push(bookData);
        }
        this.isLoading = false;
      });
      return newBook;
    } catch {
      runInAction(() => {
        this.error = 'Failed to add book';
        this.isLoading = false;
      });
      return null;
    }
  }

  // For testing
  addBookDirectly(book: Book) {
    this.books.push(book);
  }

  // For testing
  clearBooks() {
    this.books = [];
  }
}

export const bookStore = new BookStore();