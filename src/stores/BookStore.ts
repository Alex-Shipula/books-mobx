import { makeAutoObservable, runInAction } from 'mobx';
import { Book, BookVisibility } from '../models/book';
import { BookService } from '../services/api';

export class BookStore {
  books: Book[] = [];
  isLoading = false;
  error: string | null = null;
  privateBooks: Book[] = [];
  visibility: BookVisibility = 'all'

  constructor() {
    makeAutoObservable(this);
  }

  setVisibility(visibility: BookVisibility) {
    this.visibility = visibility;
    this.fetchBooks();
  }

  async fetchBooks() {
    this.isLoading = true;
    this.error = null;

    try {
      const [allBooks, privateBooks] = await Promise.all([
        BookService.getBooks(false),
        BookService.getBooks(true)
      ]);

      runInAction(() => {
        this.books = allBooks;
        this.privateBooks = privateBooks;
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
          if (bookData?.private) {
            this.privateBooks.push(bookData);
          } else {
            this.books.push(bookData);
          }
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

  get visibleBooks() {
    return this.visibility === 'private' ? this.privateBooks : this.books;
  }

  get privateBookCount() {
    return this.privateBooks.length;
  }

  // For testing
  addBookDirectly(book: Book) {
    this.books.push(book);
  }

  // For testing
  clearBooks() {
    this.books = [];
    this.privateBooks = [];
  }
}

export const bookStore = new BookStore();