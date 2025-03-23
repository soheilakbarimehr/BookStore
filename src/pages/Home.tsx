// src/pages/Home.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Book as BookIcon, Star, Truck, CreditCard, Headphones, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useHomeContent } from '../context/HomeContentContext';
import { useCart } from '../context/CartContext';
import { Book } from '../types';

// تعریف تایپ CartItem (برای هماهنگی با CartContext)
interface CartItem {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
  image: string;
}

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonLink: string;
}

interface Feature {
  title: string;
  description: string;
  icon: 'Truck' | 'CreditCard' | 'Headphones';
}

interface Section {
  id: number;
  title: string;
  type: 'featured-books' | 'categories' | 'features' | 'custom' | 'latest-books';
  content: string[] | Feature[] | string;
  visible: boolean;
}

interface HomeProps {
  books: Book[];
  isLoading?: boolean;
  error?: string | null;
}

const Home: React.FC<HomeProps> = ({ books, isLoading = false, error = null }) => {
  const { content } = useHomeContent();
  const { addToCart } = useCart();

  const homeContent = content.pages['home'] || { slider: [], sections: [] };

  const latestBooks = [...books]
    .sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 4);

  const featuredSection = homeContent.sections.find((s: Section) => s.type === 'featured-books');
  const featuredBookIds = featuredSection ? (featuredSection.content as string[]).map(Number) : [];
  const featuredBooks = books.filter((book) => featuredBookIds.includes(book.id)).slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // تابع برای تبدیل Book به CartItem
  const convertBookToCartItem = (book: Book): CartItem => ({
    id: book.id,
    title: book.title,
    author: book.author,
    price: book.price,
    image: book.image,
    quantity: 1, // مقدار پیش‌فرض برای quantity
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-12 h-12 border-4 rounded-full border-t-primary-600"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-500">
        <p>خطایی رخ داده است: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 mt-4 text-white rounded-full bg-primary-600"
        >
          تلاش دوباره
        </button>
      </div>
    );
  }

  const orderedSections = [
    ...homeContent.sections.filter((s: Section) => s.visible && s.type === 'features'),
    { id: Date.now(), title: 'جدیدترین‌ها', type: 'latest-books' as const, content: [], visible: true },
    ...homeContent.sections.filter(
      (s: Section) => s.visible && s.type !== 'features' && s.type !== 'custom'
    ),
  ];

  return (
    <>
      <Helmet>
        <title>کتاب‌خانه | فروشگاه آنلاین کتاب</title>
        <meta name="description" content="خرید آنلاین کتاب‌های الکترونیکی و چاپی با بهترین قیمت و ارسال سریع" />
      </Helmet>

      {homeContent.slider && homeContent.slider.length > 0 && (
        <section className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              enabled: true,
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="h-[500px] md:h-[600px]"
          >
            {homeContent.slider.map((slide: Slide) => (
              <SwiperSlide key={slide.id}>
                <div className="flex items-center h-full bg-gradient-to-r from-primary-700 to-primary-900">
                  <div className="px-4 mx-auto text-center text-white max-w-7xl sm:px-6 lg:px-8">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 object-cover w-full h-full transition-opacity duration-500 opacity-50"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="relative z-10"
                    >
                      <h1 className="mb-6 text-4xl font-bold md:text-6xl">{slide.title}</h1>
                      <p className="mb-8 text-xl md:text-2xl">{slide.description}</p>
                      <Link
                        to={slide.buttonLink}
                        className="px-8 py-3 text-lg font-semibold transition-all bg-white rounded-full text-primary-700 hover:bg-opacity-90"
                      >
                        شروع به خرید
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="hidden md:block">
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </div>
          </Swiper>
        </section>
      )}

      <motion.div
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {orderedSections.map((section: Section, index: number) => (
          <React.Fragment key={section.id}>
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <motion.h2
                  variants={itemVariants}
                  className="mb-8 text-3xl font-bold text-gray-900 dark:text-white"
                >
                  {section.title}
                </motion.h2>

                {section.type === 'features' && Array.isArray(section.content) && (
                  <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 gap-8 md:grid-cols-3"
                  >
                    {(section.content as Feature[]).map((feature: Feature, index: number) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        className="p-6 text-center rounded-lg bg-gray-50 dark:bg-gray-800"
                      >
                        <div className="flex justify-center mb-4">
                          {feature.icon === 'Truck' && <Truck className="w-12 h-12 text-primary-600" />}
                          {feature.icon === 'CreditCard' && <CreditCard className="w-12 h-12 text-primary-600" />}
                          {feature.icon === 'Headphones' && <Headphones className="w-12 h-12 text-primary-600" />}
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {section.type === 'latest-books' && (
                  <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  >
                    {latestBooks.map((book: Book) => (
                      <motion.div
                        key={book.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                        className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-900"
                      >
                        <img src={book.image} alt={book.title} className="object-cover w-full h-48" />
                        <div className="p-4">
                          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{book.title}</h3>
                          <p className="mb-2 text-gray-600 dark:text-gray-300">{book.author}</p>
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-bold text-primary-600 dark:text-primary-400">
                              {book.price.toLocaleString('fa-IR')} تومان
                            </span>
                            {book.rating && (
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="mr-1 text-gray-600 dark:text-gray-300">{book.rating}</span>
                              </div>
                            )}
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addToCart(convertBookToCartItem(book))}
                            className="flex items-center justify-center w-full gap-2 py-2 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                          >
                            <ShoppingCart className="w-5 h-5" />
                            اضافه به سبد
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {section.type === 'featured-books' && Array.isArray(section.content) && (
                  <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                  >
                    {featuredBooks.map((book: Book) => (
                      <motion.div
                        key={book.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                        className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-900"
                      >
                        <img src={book.image} alt={book.title} className="object-cover w-full h-48" />
                        <div className="p-4">
                          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{book.title}</h3>
                          <p className="mb-2 text-gray-600 dark:text-gray-300">{book.author}</p>
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-bold text-primary-600 dark:text-primary-400">
                              {book.price.toLocaleString('fa-IR')} تومان
                            </span>
                            {book.rating && (
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="mr-1 text-gray-600 dark:text-gray-300">{book.rating}</span>
                              </div>
                            )}
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addToCart(convertBookToCartItem(book))}
                            className="flex items-center justify-center w-full gap-2 py-2 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                          >
                            <ShoppingCart className="w-5 h-5" />
                            اضافه به سبد
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                      className="flex items-center justify-center overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-900"
                    >
                      <Link to="/books" className="flex flex-col items-center justify-center h-full p-4">
                        <motion.div
                          animate={{ x: [0, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="mb-4"
                        >
                          <ArrowLeft className="w-12 h-12 text-primary-600 dark:text-primary-400" />
                        </motion.div>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          نمایش بیشتر
                        </span>
                      </Link>
                    </motion.div>
                  </motion.div>
                )}

                {section.type === 'categories' && Array.isArray(section.content) && (
                  <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                  >
                    {(section.content as string[])
                      .slice(0, 4)
                      .map((category: string, index: number) => (
                        <Link key={index} to={`/category/${encodeURIComponent(category)}`} className="block">
                          <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                            className="p-6 text-center bg-white rounded-lg cursor-pointer dark:bg-gray-900"
                          >
                            <BookIcon className="w-12 h-12 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category}</h3>
                          </motion.div>
                        </Link>
                      ))}
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                      className="flex items-center justify-center overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-900"
                    >
                      <Link to="/categories" className="flex flex-col items-center justify-center h-full p-4">
                        <motion.div
                          animate={{ x: [0, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="mb-4"
                        >
                          <ArrowLeft className="w-12 h-12 text-primary-600 dark:text-primary-400" />
                        </motion.div>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          نمایش بیشتر
                        </span>
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </section>
            {index < orderedSections.length - 1 && (
              <hr className="mx-auto my-8 border-t border-gray-300 opacity-50 max-w-7xl" />
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </>
  );
};

export default Home;