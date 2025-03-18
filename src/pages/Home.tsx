import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Book, Star, TrendingUp, Truck, CreditCard, Headphones } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const featuredBooks = [
    {
      id: 1,
      title: 'صد سال تنهایی',
      author: 'گابریل گارسیا مارکز',
      price: 120000,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
      rating: 4.8
    },
    {
      id: 2,
      title: 'کیمیاگر',
      author: 'پائولو کوئیلو',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
      rating: 4.6
    },
    {
      id: 3,
      title: 'بوف کور',
      author: 'صادق هدایت',
      price: 95000,
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
      rating: 4.7
    },
    {
      id: 4,
      title: 'شازده کوچولو',
      author: 'آنتوان دو سنت‌اگزوپری',
      price: 75000,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
      rating: 4.9
    }
  ];

  const newReleases = [
    {
      id: 5,
      title: 'جنگ و صلح',
      author: 'لئو تولستوی',
      price: 150000,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 6,
      title: 'دن کیشوت',
      author: 'میگل د سروانتس',
      price: 130000,
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 7,
      title: 'مسخ',
      author: 'فرانتس کافکا',
      price: 90000,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <>
      <Helmet>
        <title>کتاب‌خانه | فروشگاه آنلاین کتاب</title>
        <meta name="description" content="خرید آنلاین کتاب‌های الکترونیکی و چاپی با بهترین قیمت و ارسال سریع" />
      </Helmet>

      {/* Hero Section with Slider */}
      <section className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="h-[500px]"
        >
          <SwiperSlide>
            <div className="h-full bg-gradient-to-r from-primary-700 to-primary-900 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">دنیای کتاب در دستان شما</h1>
                <p className="text-xl md:text-2xl mb-8">بیش از ۱۰،۰۰۰ عنوان کتاب الکترونیکی و چاپی</p>
                <button className="bg-white text-primary-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all">
                  شروع به خرید
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full bg-gradient-to-r from-primary-800 to-primary-600 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">تخفیف ویژه کتاب‌های الکترونیکی</h2>
                <p className="text-xl md:text-2xl mb-8">تا ۵۰٪ تخفیف برای خرید کتاب‌های الکترونیکی</p>
                <button className="bg-white text-primary-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all">
                  مشاهده تخفیف‌ها
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Features */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="h-12 w-12 text-primary-600" />,
                title: 'ارسال سریع',
                description: 'ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان'
              },
              {
                icon: <CreditCard className="h-12 w-12 text-primary-600" />,
                title: 'پرداخت امن',
                description: 'پرداخت اینترنتی مطمئن با درگاه‌های معتبر'
              },
              {
                icon: <Headphones className="h-12 w-12 text-primary-600" />,
                title: 'پشتیبانی ۲۴/۷',
                description: 'پاسخگویی به سوالات شما در تمام ساعات'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">کتاب‌های پرفروش</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Releases Slider */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">تازه‌های کتاب</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 4, spaceBetween: 30 }
            }}
          >
            {newReleases.map((book) => (
              <SwiperSlide key={book.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
                >
                  <img src={book.image} alt={book.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{book.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{book.author}</p>
                    <span className="text-primary-600 dark:text-primary-400 font-bold">
                      {book.price.toLocaleString()} تومان
                    </span>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">دسته‌بندی‌ها</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'رمان',
              'علمی',
              'تاریخی',
              'روانشناسی',
              'کودک',
              'آموزشی',
              'هنر',
              'فلسفه',
              'دین',
              'سیاسی',
              'اقتصاد',
              'زندگی‌نامه'
            ].map((category) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center cursor-pointer"
              >
                <Book className="h-12 w-12 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;