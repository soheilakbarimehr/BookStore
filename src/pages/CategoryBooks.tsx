// src/pages/CategoryBooks.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Star, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Book {
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

interface CategoryBooksProps {
  books: Book[];
}

const CategoryBooks = ({ books }: CategoryBooksProps) => {
  const { category } = useParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const filteredBooks = books
    .filter((book) => book.category === category)
    .filter((book) => book.title.includes(searchQuery) || book.author.includes(searchQuery));

  return (
    <>
      <Helmet>
        <title>{category} | کتاب‌خانه</title>
        <meta name="description" content={`مجموعه کتاب‌های دسته ${category}`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">کتاب‌های دسته {category}</h1>

        <div className="mb-8">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="جستجو در کتاب‌ها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">کتابی در این دسته یافت نشد.</p>
          ) : (
            filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
              >
                <Link to={`/books/${book.id}`}>
                  <img src={book.image} alt={book.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{book.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{book.author}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        {book.price.toLocaleString()} تومان
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="mr-1 text-gray-600 dark:text-gray-300">{book.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="p-4">
                  <button
                    onClick={() => addToCart(book)}
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    افزودن به سبد خرید
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryBooks;