import { makeAutoObservable } from 'mobx';
import { bookStore, BookStore } from '../stores/BookStore';
import { Book } from '../models/book';
import { USER_ID } from '../services/api';

export class BookСontroller {
  name = '';
  author = '';
  ownerId = USER_ID;
  formError: string | null = null;

  constructor(private bookStore: BookStore) {
    makeAutoObservable(this);
  }

  setTitle(title: string) {
    this.name = title;
  }

  setAuthor(author: string) {
    this.author = author;
  }

  setOwnerId(ownerId: string) {
    this.ownerId = ownerId;
  }

  resetForm() {
    this.name = '';
    this.author = '';
    this.ownerId = '';
    this.formError = null;
  }

  validateForm(): boolean {
    if (!this.name.trim()) {
      this.formError = 'Title is required';
      return false;
    }

    if (!this.author.trim()) {
      this.formError = 'Author is required';
      return false;
    }

    if (this.ownerId === '') {
      this.formError = 'Owner is required';
      return false;
    }

    this.formError = null;
    return true;
  }

  async addBook() {
    if (!this.validateForm()) {
      return null;
    }

    const bookData: Book = {
      id: Number(new Date()),
      name: this.name.trim(),
      author: this.author.trim(),
      ownerId: this.ownerId
    };

    const result = await this.bookStore.addBook(bookData);
    
    if (result) {
      this.resetForm();
    }
    
    return result;
  }

  async loadBooks() {
    return this.bookStore.fetchBooks();
  }

  get books() {
    return this.bookStore.books;
  }

  get isLoading() {
    return this.bookStore.isLoading;
  }

  get error() {
    return this.bookStore.error;
  }
}

export const bookPresenter = new BookСontroller(bookStore);