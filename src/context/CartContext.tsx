// src/context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Book {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  author?: string;
}

interface CartContextType {
  cart: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Book[]>([]);

  const addToCart = (book: Book) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};