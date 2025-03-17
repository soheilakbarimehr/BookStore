import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Star, Search, Filter } from 'lucide-react';

const CategoryBooks = () => {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample books data - in a real app, this would come from an API
  const books = [
    {
      id: 1,
      title: 'کتاب نمونه ۱',
      author: 'نویسنده ۱',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
      rating: 4.7,
      category: category
    },
    {
      id: 2,
      title: 'کتاب نمونه ۲',
      author: 'نویسنده ۲',
      price: 92000,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
      rating: 4.5,
      category: category
    },
    {
      id: 3,
      title: 'کتاب نمونه ۳',
      author: 'نویسنده ۳',
      price: 78000,
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
      rating: 4.8,
      category: category
    }
  ];

  const filteredBooks = books.filter(book => 
    book.title.includes(searchQuery) || book.author.includes(searchQuery)
  );

  return (
    <>
      <Helmet>
        <title>{category} | کتاب‌خانه</title>
        <meta name="description" content={`مجموعه کتاب‌های دسته ${category}`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">کتاب‌های دسته {category}</h1>

        {/* Search */}
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

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
            >
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
                <button className="mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors">
                  افزودن به سبد خرید
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryBooks;