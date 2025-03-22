import React, { useState } from 'react';
import { Heart, ShoppingCart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

interface BookDetails {
  id: string;
  title: string;
  author: string;
  price: number;
  images: string[];
  description: string;
  publisher: string;
  publishDate: string;
  pages: number;
  isbn: string;
  language: string;
}

const BookDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Example book data (replace with your actual data)
  const bookData: BookDetails = {
    id: "1",
    title: "هری پاتر و سنگ جادو",
    author: "جی.کی. رولینگ",
    price: 150000,
    images: [
      "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?auto=format&fit=crop&q=80&w=500"
    ],
    description: "هری پاتر که تا کنون فکر می‌کرد یک پسر معمولی است، در یازدهمین سالگرد تولدش متوجه می‌شود که یک جادوگر است. او به مدرسه جادوگری هاگوارتز دعوت می‌شود و در آنجا با دوستان و دشمنان جدیدی آشنا می‌شود...",
    publisher: "انتشارات کتابسرا",
    publishDate: "1400/03/15",
    pages: 350,
    isbn: "978-964-8675-42-1",
    language: "فارسی"
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === bookData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? bookData.images.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>{bookData.title} | کتاب‌خانه</title>
        <meta name="description" content={bookData.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image Gallery */}
              <div className="md:w-1/2">
                <div className="relative aspect-[4/3]">
                  <img
                    src={bookData.images[currentImageIndex]}
                    alt={bookData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-between p-4">
                    <button
                      onClick={prevImage}
                      className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {bookData.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden ${
                        index === currentImageIndex ? 'ring-2 ring-primary-500' : ''
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Book Details */}
              <div className="md:w-1/2 p-6 md:p-8">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{bookData.title}</h1>
                  <div className="flex gap-4">
                    <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <Share2 className="w-6 h-6" />
                    </button>
                    <button className="text-gray-400 hover:text-red-500">
                      <Heart className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                
                <p className="mt-2 text-xl text-gray-600 dark:text-gray-300">{bookData.author}</p>
                
                <div className="mt-8">
                  <p className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400">
                    {bookData.price.toLocaleString()} تومان
                  </p>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <label className="text-gray-700 dark:text-gray-300">تعداد:</label>
                    <div className="flex items-center border dark:border-gray-600 rounded-lg">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="px-3 py-1 border-l dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        -
                      </button>
                      <span className="px-4 text-gray-900 dark:text-white">{quantity}</span>
                      <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="px-3 py-1 border-r dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-white font-medium transition-colors ${
                      isAddedToCart
                        ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
                        : 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isAddedToCart ? 'به سبد خرید اضافه شد' : 'افزودن به سبد خرید'}
                  </button>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">درباره کتاب</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{bookData.description}</p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">ناشر</h3>
                    <p className="text-gray-600 dark:text-gray-300">{bookData.publisher}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">تاریخ انتشار</h3>
                    <p className="text-gray-600 dark:text-gray-300">{bookData.publishDate}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">تعداد صفحات</h3>
                    <p className="text-gray-600 dark:text-gray-300">{bookData.pages}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">شابک</h3>
                    <p className="text-gray-600 dark:text-gray-300">{bookData.isbn}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">زبان</h3>
                    <p className="text-gray-600 dark:text-gray-300">{bookData.language}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;