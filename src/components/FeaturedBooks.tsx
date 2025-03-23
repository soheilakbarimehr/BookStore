// src/components/FeaturedBooks.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Book {
  id: number;
  title: { fa: string; en: string };
  author: { fa: string; en: string };
  price: number;
  image: string;
  rating?: number;
}

interface FeaturedBooksProps {
  books: Book[];
  bookIds: string[];
  lang: 'fa' | 'en';
}

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books, bookIds, lang }) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {bookIds.map((bookId) => {
        const book = books.find((b) => b.id === parseInt(bookId));
        if (!book) return null;
        return (
          <Link to={`/books/${book.id}`} key={book.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-900"
            >
              <img
                src={`/images/${book.image}`}
                alt={lang === 'fa' ? book.title.fa : book.title.en}
                className="object-cover w-full h-48"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {lang === 'fa' ? book.title.fa : book.title.en}
                </h3>
                <p className="mb-2 text-gray-600 dark:text-gray-300">
                  {lang === 'fa' ? book.author.fa : book.author.en}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary-600 dark:text-primary-400">
                    {book.price.toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US')} {lang === 'fa' ? 'تومان' : 'USD'}
                  </span>
                  {book.rating && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="mr-1 text-gray-600 dark:text-gray-300">{book.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default FeaturedBooks;