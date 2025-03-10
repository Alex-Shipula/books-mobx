import { makeAutoObservable } from 'mobx';
import { bookStore, BookStore } from '../stores/BookStore';
import { Book, BookVisibility } from '../models/book';
import { USER_ID } from '../services/api';

export class BookСontroller {
  name = '';
  author = '';
  ownerId = USER_ID;
  formError: string | null = null;
  isPrivate = false;

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

  setPrivate(isPrivate: boolean) {
    this.isPrivate = isPrivate;
  }

  setVisibility(visibility: BookVisibility) {
    this.bookStore.setVisibility(visibility);
  }

  resetForm() {
    this.name = '';
    this.author = '';
    this.ownerId = '';
    this.formError = null;
    this.isPrivate = false;
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
      ownerId: this.ownerId,
      private: this.isPrivate
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

  getBooks() {
    return this.bookStore.books;
  }

  getPrivateBooks() {
    return this.bookStore.privateBooks;
  }

  get visibility() {
    return this.bookStore.visibility;
  }

  get privateBookCount() {
    return this.bookStore.privateBookCount;
  }

  get isLoading() {
    return this.bookStore.isLoading;
  }

  get error() {
    return this.bookStore.error;
  }
}

export const bookPresenter = new BookСontroller(bookStore);