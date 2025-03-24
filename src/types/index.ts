export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  rating: number;
  format: 'print' | 'ebook' | 'both';
  description: string;
  category: string;
  quantity: number;
  createdAt?: string; 
}
export interface CartItem {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
  image: string;
}