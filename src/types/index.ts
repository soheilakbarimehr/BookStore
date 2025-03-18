export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string;
  format: 'ebook' | 'print' | 'both';
  category: string;
  rating: number;
  inStock: boolean;
  publishDate: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}