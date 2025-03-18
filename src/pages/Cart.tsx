import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  // Sample cart data - in a real app, this would come from a state management solution
  const cartItems = [
    {
      id: 1,
      title: 'سووشون',
      author: 'سیمین دانشور',
      price: 85000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 2,
      title: 'چشم‌هایش',
      author: 'بزرگ علوی',
      price: 92000,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400'
    }
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <Helmet>
        <title>سبد خرید | کتاب‌خانه</title>
        <meta name="description" content="سبد خرید شما در کتاب‌خانه" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <ShoppingCart className="h-8 w-8 text-primary-600 ml-2" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">سبد خرید</h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 flex items-center"
                >
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-md" />
                  <div className="flex-1 mr-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.author}</p>
                    <p className="text-primary-600 dark:text-primary-400 font-bold mt-2">
                      {item.price.toLocaleString()} تومان
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Minus className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      </button>
                      <span className="text-gray-900 dark:text-white font-medium">{item.quantity}</span>
                      <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Plus className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                    <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 sticky top-24"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">خلاصه سفارش</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>تعداد کالاها:</span>
                    <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} عدد</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>هزینه ارسال:</span>
                    <span>رایگان</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                      <span>جمع کل:</span>
                      <span>{totalPrice.toLocaleString()} تومان</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transition-colors mt-6">
                  ادامه فرآیند خرید
                </button>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">سبد خرید شما خالی است</h2>
            <p className="text-gray-600 dark:text-gray-300">برای مشاهده محصولات به صفحه کتاب‌ها مراجعه کنید.</p>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Cart;