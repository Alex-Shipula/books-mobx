import axios from 'axios';
import { Book } from '../models/book';

export const USER_ID = 'user-1';

const api = axios.create({
  baseURL: 'https://tdd.demo.reaktivate.com/v1',
});

export const BookService = {
  async getBooks(privateOnly: boolean = false): Promise<Book[]> {
    try {
      const endpoint = privateOnly ? `/books/${USER_ID}/private` : `/books/${USER_ID}`;
      const response = await api.get<Book[]>(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  },

  async createBook(book: Book): Promise<Book | null> {
    try {
      const response = await api.post<Book>(`/books/${USER_ID}`, book);
      return response.data;
    } catch (error) {
      console.error('Error creating book:', error);
      return null;
    }
  }
};