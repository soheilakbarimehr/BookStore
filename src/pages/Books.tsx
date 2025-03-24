// src/pages/Books.tsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Star, Search, Filter, BookOpen, Download, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useBooksContent } from '../context/BooksContentContext';

const Books: React.FC = () => {
  const { books, categories, featuredBookIds, defaultSort, defaultBooksPerPage } = useBooksContent();
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>(defaultSort);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState<number>(defaultBooksPerPage);

  const { addToCart } = useCart();

  // کتاب‌های ویژه
  const featuredBooks = books.filter((book) => featuredBookIds.includes(book.id));

  const filteredBooks = books
    .filter(
      (book) =>
        (selectedFormat === 'all' || book.format === selectedFormat || book.format === 'both') &&
        (selectedCategory === 'all' || book.category === selectedCategory) &&
        (book.title.includes(searchQuery) || book.author.includes(searchQuery))
    )
    .sort((a, b) => {
      switch (selectedSort) {
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

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Helmet>
        <title>کتاب‌ها | کتاب‌خانه</title>
        <meta name="description" content="مجموعه کامل کتاب‌های الکترونیکی و چاپی با بهترین قیمت" />
      </Helmet>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* کتاب‌های ویژه */}
        {featuredBooks.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">کتاب‌های ویژه</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredBooks.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden relative min-h-[400px]"
                >
                  <Link to={`/books/${book.id}`} className="block">
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
                    اضافه به سبد
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* فیلترها و لیست کتاب‌ها */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-lg dark:bg-gray-900">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" />
              <input
                type="text"
                placeholder="جستجو در کتاب‌ها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-12 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="فیلتر دسته‌بندی"
                className="w-full px-4 py-2 pr-12 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">همه دسته‌بندی‌ها</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <BookOpen className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" />
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                aria-label="فیلتر فرمت"
                className="w-full px-4 py-2 pr-12 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">همه فرمت‌ها</option>
                <option value="print">نسخه چاپی</option>
                <option value="ebook">نسخه الکترونیک</option>
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" />
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                aria-label="مرتب‌سازی"
                className="w-full px-4 py-2 pr-12 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="newest">جدیدترین</option>
                <option value="popular">محبوب‌ترین</option>
                <option value="price-asc">ارزان‌ترین</option>
                <option value="price-desc">گران‌ترین</option>
              </select>
            </div>
          </div>
        </div>

        {currentBooks.length === 0 ? (
          <div className="py-16 text-center text-gray-500 dark:text-gray-400">
            <p>کتابی با این مشخصات یافت نشد.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentBooks.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden relative min-h-[400px]"
                >
                  <Link to={`/books/${book.id}`} className="block">
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
                    اضافه به سبد
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <div className="px-4 py-4 mt-8 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">تعداد در هر صفحه:</span>
                  <select
                    value={booksPerPage}
                    onChange={(e) => {
                      setBooksPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    aria-label="تعداد در هر صفحه"
                    className="px-2 py-1 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {[5, 8, 10, 20].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    aria-label="صفحه قبلی"
                    className={`p-2 rounded-md ${
                      currentPage === 1
                        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="flex space-x-1 rtl:space-x-reverse">
                    {totalPages > 1 &&
                      Array.from({ length: totalPages }, (_, i) => i + 1)
                        .slice(
                          Math.max(0, currentPage - 3),
                          Math.min(totalPages, currentPage + 2)
                        )
                        .map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-md ${
                              currentPage === page
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                    {totalPages > 5 && currentPage + 2 < totalPages && (
                      <span className="px-3 py-1 text-gray-600 dark:text-gray-300">...</span>
                    )}
                    {totalPages > 5 && currentPage + 2 < totalPages && (
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-3 py-1 text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        {totalPages}
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    aria-label="صفحه بعدی"
                    className={`p-2 rounded-md ${
                      currentPage === totalPages
                        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  نمایش {startIndex + 1} - {Math.min(endIndex, filteredBooks.length)} از{' '}
                  {filteredBooks.length}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Books;