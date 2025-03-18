import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Star, Search, Filter, BookOpen, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Books = () => {
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'print' | 'ebook'>('all');
  const [selectedSort, setSelectedSort] = useState<'newest' | 'popular' | 'price-asc' | 'price-desc'>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const books = [
    {
      id: 1,
      title: 'سووشون',
      author: 'سیمین دانشور',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
      rating: 4.7,
      format: 'both',
      description: 'رمانی ماندگار از ادبیات معاصر ایران که روایتگر داستانی عاشقانه در بستر تاریخ است.',
      category: 'ادبیات داستانی',
    },
    {
      id: 2,
      title: 'چشم‌هایش',
      author: 'بزرگ علوی',
      price: 92000,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
      rating: 4.5,
      format: 'print',
      description: 'داستان عشق و هنر در دوران پرتلاطم تاریخ معاصر ایران.'
    },
    {
      id: 3,
      title: 'کلیدر',
      author: 'محمود دولت‌آبادی',
      price: 180000,
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
      rating: 4.9,
      format: 'both',
      description: 'حماسه‌ای بزرگ از زندگی مردم خراسان که در ده جلد به رشته تحریر درآمده است.'
    },
    {
      id: 4,
      title: 'نیمه تاریک ماه',
      author: 'هوشنگ گلشیری',
      price: 75000,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
      rating: 4.3,
      format: 'ebook',
      description: 'مجموعه داستان‌های کوتاه با نگاهی عمیق به جامعه معاصر.'
    },
    {
      id: 5,
      title: 'سمفونی مردگان',
      author: 'عباس معروفی',
      price: 98000,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
      rating: 4.6,
      format: 'both',
      description: 'روایتی چند صدایی از فروپاشی یک خانواده در بستر تاریخ معاصر.'
    },
    {
      id: 6,
      title: 'پیامبر و دیوانه',
      author: 'جبران خلیل جبران',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
      rating: 4.8,
      format: 'ebook',
      description: 'مجموعه‌ای از حکمت‌های عرفانی و فلسفی به زبانی شاعرانه.'
    },
    {
      id: 7,
      title: 'بامداد خمار',
      author: 'فتانه حاج سید جوادی',
      price: 88000,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
      rating: 4.4,
      format: 'print',
      description: 'داستانی عاشقانه در تهران قدیم که روایتگر زندگی زنان در دوره قاجار است.'
    },
    {
      id: 8,
      title: 'طوبی و معنای شب',
      author: 'شهرنوش پارسی‌پور',
      price: 95000,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
      rating: 4.7,
      format: 'both',
      description: 'رمانی با عناصر رئالیسم جادویی که به زندگی زنی در گذر تاریخ می‌پردازد.'
    }
  ];

  const filteredBooks = books
    .filter(book => 
      (selectedFormat === 'all' || book.format === selectedFormat || book.format === 'both') &&
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

  return (
    <>
      <Helmet>
        <title>کتاب‌ها | کتاب‌خانه</title>
        <meta name="description" content="مجموعه کامل کتاب‌های الکترونیکی و چاپی با بهترین قیمت" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as 'all' | 'print' | 'ebook')}
              className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">همه فرمت‌ها</option>
              <option value="print">نسخه چاپی</option>
              <option value="ebook">نسخه الکترونیک</option>
            </select>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as 'newest' | 'popular' | 'price-asc' | 'price-desc')}
              className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="newest">جدیدترین</option>
              <option value="popular">محبوب‌ترین</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
            </select>
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
              <Link to={`/books/${book.id}`} className="block">
                <div className="relative">
                  <img src={book.image} alt={book.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 left-2 flex space-x-2 rtl:space-x-reverse">
                    {(book.format === 'ebook' || book.format === 'both') && (
                      <span className="bg-primary-500 text-white px-2 py-1 rounded-md text-sm flex items-center">
                        <Download className="h-4 w-4 ml-1" />
                        الکترونیک
                      </span>
                    )}
                    {(book.format === 'print' || book.format === 'both') && (
                      <span className="bg-gray-700 text-white px-2 py-1 rounded-md text-sm flex items-center">
                        <BookOpen className="h-4 w-4 ml-1" />
                        چاپی
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{book.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{book.author}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{book.description}</p>
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
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Books;