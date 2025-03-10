export interface Book {
  id: number;
  name: string;
  ownerId: string;
  author: string;
  private?: boolean;
}

export type BookVisibility = 'all' | 'private';
