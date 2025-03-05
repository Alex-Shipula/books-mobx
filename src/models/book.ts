import { vi } from "vitest";

export interface Book {
  id: number;
  name: string;
  ownerId: string;
  author: string;
  private?: boolean;
}

export type MockedBookService = {
  getBooks: ReturnType<typeof vi.fn>;
  createBook: ReturnType<typeof vi.fn>;
  deleteBook: ReturnType<typeof vi.fn>;
};

export type BookVisibility = 'all' | 'private';
