import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Star, Search, Filter, BookOpen, Download, ChevronLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Book } from '../types';

interface CategoryBooksProps {
  books: Book[];
}

const CategoryBooks: React.FC<CategoryBooksProps> = ({ books }) => {
  const { category } = useParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'newest' | 'price-asc' | 'price-desc' | 'popular'>('newest');
  const [formatFilter, setFormatFilter] = useState<'all' | 'print' | 'ebook'>('all');
  const { addToCart } = useCart();

  const filteredBooks = books
    .filter((book) => book.category === category)
    .filter((book) => book.title.includes(searchQuery) || book.author.includes(searchQuery))
    .filter((book) =>
      formatFilter === 'all' || book.format === formatFilter || book.format === 'both'
    );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'popular':
        return b.rating - a.rating;
      default:
        return b.id - a.id;
    }
  });

  return (
    <>
      <Helmet>
        <title>{category} | کتاب‌خانه</title>
        <meta name="description" content={`مجموعه کتاب‌های دسته ${category}`} />
      </Helmet>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center mb-6 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline">
            صفحه اصلی
          </Link>
          <ChevronLeft className="w-4 h-4 mx-2" />
          <Link to="/categories" className="text-primary-600 dark:text-primary-400 hover:underline">
            دسته‌بندی‌ها
          </Link>
          <ChevronLeft className="w-4 h-4 mx-2" />
          <span>{category}</span>
        </nav>

        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">کتاب‌های دسته {category}</h1>

        <div className="p-6 mb-8 bg-white rounded-lg shadow-lg dark:bg-gray-900">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="relative">
              <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" />
              <input
                type="text"
                placeholder="جستجو در کتاب‌ها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-12 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                aria-label="جستجو در کتاب‌ها"
              />
            </div>
            <div className="relative">
              <Filter className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" />
              <select
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value as 'newest' | 'price-asc' | 'price-desc' | 'popular')
                }
                aria-label="مرتب‌سازی کتاب‌ها"
                className="w-full px-4 py-2 pr-12 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="newest">جدیدترین</option>
                <option value="popular">محبوب‌ترین</option>
                <option value="price-asc">ارزان‌ترین</option>
                <option value="price-desc">گران‌ترین</option>
              </select>
            </div>
            <div className="relative">
              <BookOpen className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" />
              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value as 'all' | 'print' | 'ebook')}
                aria-label="فیلتر بر اساس فرمت"
                className="w-full px-4 py-2 pr-12 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">همه فرمت‌ها</option>
                <option value="print">نسخه چاپی</option>
                <option value="ebook">نسخه الکترونیک</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedBooks.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">
              کتابی با این مشخصات یافت نشد.
            </p>
          ) : (
            sortedBooks.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden relative min-h-[400px]"
              >
                <Link to={`/books/${book.id}`} aria-label={`مشاهده کتاب ${book.title}`}>
                  <div className="relative">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="object-cover w-full h-48"
                      loading="lazy"
                    />
                    <div className="absolute flex space-x-2 top-2 left-2 rtl:space-x-reverse">
                      {(book.format === 'ebook' || book.format === 'both') && (
                        <span className="flex items-center px-2 py-1 text-sm text-white rounded-md bg-primary-500">
                          <Download className="w-4 h-4 ml-1" />
                          الکترونیک
                        </span>
                      )}
                      {(book.format === 'print' || book.format === 'both') && (
                        <span className="flex items-center px-2 py-1 text-sm text-white bg-gray-700 rounded-md">
                          <BookOpen className="w-4 h-4 ml-1" />
                          چاپی
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col h-[200px]">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {book.title}
                    </h3>
                    <p className="mb-2 text-gray-600 dark:text-gray-300">{book.author}</p>
                    <p className="flex-1 mb-4 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {book.description || 'توضیحات در دسترس نیست.'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary-600 dark:text-primary-400">
                        {book.price.toLocaleString('fa-IR')} تومان
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="mr-1 text-gray-600 dark:text-gray-300">{book.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart({ ...book, quantity: 1 })}
                  className="absolute flex items-center justify-center gap-2 py-2 text-white transition-colors rounded-md bottom-4 left-4 right-4 bg-primary-600 hover:bg-primary-700"
                  aria-label={`افزودن ${book.title} به سبد خرید`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  افزودن به سبد خرید
                </motion.button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryBooks;