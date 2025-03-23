export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description?: string;
  format?: 'print' | 'ebook' | 'both';
}

export interface CartItem {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  quantity: number;
}