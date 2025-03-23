import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Star, BookOpen, Download, ShoppingCart, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Book } from '../types';

interface BookDetailsProps {
  books: Book[];
}

const BookDetails: React.FC<BookDetailsProps> = ({ books }) => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return (
      <div className="py-16 text-center text-gray-500 dark:text-gray-400">
        <p>کتاب مورد نظر یافت نشد.</p>
      </div>
    );
  }

  // فیلتر کردن کتاب‌های مشابه (کتاب‌هایی که در همان دسته‌بندی هستند، به جز کتاب فعلی)
  const similarBooks = books
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4); // محدود کردن به 4 کتاب مشابه

  return (
    <>
      <Helmet>
        <title>{book.title} | کتاب‌خانه</title>
        <meta name="description" content={book.description || 'جزئیات کتاب'} />
      </Helmet>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center mb-6 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline">
            صفحه اصلی
          </Link>
          <ChevronLeft className="w-4 h-4 mx-2" />
          <Link to="/books" className="text-primary-600 dark:text-primary-400 hover:underline">
            کتاب‌ها
          </Link>
          <ChevronLeft className="w-4 h-4 mx-2" />
          <span>{book.title}</span>
        </nav>

        {/* جزئیات کتاب */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={book.image}
              alt={book.title}
              className="object-cover w-full rounded-lg shadow-lg h-96"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
              <p className="mb-2 text-gray-600 dark:text-gray-300">نویسنده: {book.author}</p>
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="mr-1 text-gray-600 dark:text-gray-300">{book.rating}</span>
              </div>
              <p className="mb-4 text-gray-500 dark:text-gray-400">{book.description || 'توضیحات در دسترس نیست.'}</p>
              <p className="mb-4 text-gray-600 dark:text-gray-300">دسته‌بندی: {book.category}</p>
              <div className="flex mb-4 space-x-2 rtl:space-x-reverse">
                {(book.format === 'ebook' || book.format === 'both') && (
                  <span className="flex items-center px-3 py-1 text-sm text-white rounded-md bg-primary-500">
                    <Download className="w-4 h-4 ml-1" />
                    الکترونیک
                  </span>
                )}
                {(book.format === 'print' || book.format === 'both') && (
                  <span className="flex items-center px-3 py-1 text-sm text-white bg-gray-700 rounded-md">
                    <BookOpen className="w-4 h-4 ml-1" />
                    چاپی
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {book.price.toLocaleString('fa-IR')} تومان
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart({ ...book, quantity: 1 })}
                className="flex items-center justify-center gap-2 px-6 py-3 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                aria-label={`افزودن ${book.title} به سبد خرید`}
              >
                <ShoppingCart className="w-5 h-5" />
                افزودن به سبد خرید
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* کتاب‌های مشابه */}
        {similarBooks.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">کتاب‌های مشابه</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {similarBooks.map((similarBook) => (
                <motion.div
                  key={similarBook.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden relative min-h-[400px]"
                >
                  <Link to={`/books/${similarBook.id}`} aria-label={`مشاهده کتاب ${similarBook.title}`}>
                    <div className="relative">
                      <img
                        src={similarBook.image}
                        alt={similarBook.title}
                        className="object-cover w-full h-48"
                        loading="lazy"
                      />
                      <div className="absolute flex space-x-2 top-2 left-2 rtl:space-x-reverse">
                        {(similarBook.format === 'ebook' || similarBook.format === 'both') && (
                          <span className="flex items-center px-2 py-1 text-sm text-white rounded-md bg-primary-500">
                            <Download className="w-4 h-4 ml-1" />
                            الکترونیک
                          </span>
                        )}
                        {(similarBook.format === 'print' || similarBook.format === 'both') && (
                          <span className="flex items-center px-2 py-1 text-sm text-white bg-gray-700 rounded-md">
                            <BookOpen className="w-4 h-4 ml-1" />
                            چاپی
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col h-[200px]">
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {similarBook.title}
                      </h3>
                      <p className="mb-2 text-gray-600 dark:text-gray-300">{similarBook.author}</p>
                      <p className="flex-1 mb-4 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {similarBook.description || 'توضیحات در دسترس نیست.'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary-600 dark:text-primary-400">
                          {similarBook.price.toLocaleString('fa-IR')} تومان
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="mr-1 text-gray-600 dark:text-gray-300">{similarBook.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart({ ...similarBook, quantity: 1 })}
                    className="absolute flex items-center justify-center gap-2 py-2 text-white transition-colors rounded-md bottom-4 left-4 right-4 bg-primary-600 hover:bg-primary-700"
                    aria-label={`افزودن ${similarBook.title} به سبد خرید`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    افزودن به سبد خرید
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookDetails;