import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  const handleRemove = (id: number, title: string) => {
    Swal.fire({
      title: 'حذف کتاب',
      text: `آیا مطمئن هستید که می‌خواهید "${title}" را از سبد خرید حذف کنید؟`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'بله، حذف کن',
      cancelButtonText: 'خیر',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        Swal.fire({
          title: 'حذف شد!',
          text: `"${title}" از سبد خرید حذف شد.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleClearCart = () => {
    Swal.fire({
      title: 'پاک کردن سبد خرید',
      text: 'آیا مطمئن هستید که می‌خواهید کل سبد خرید را پاک کنید؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'بله، پاک کن',
      cancelButtonText: 'خیر',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire({
          title: 'پاک شد!',
          text: 'سبد خرید شما با موفقیت پاک شد.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>سبد خرید | کتاب‌خانه</title>
        <meta name="description" content="سبد خرید شما در کتاب‌خانه" />
      </Helmet>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <ShoppingCart className="w-8 h-8 ml-2 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">سبد خرید</h1>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center gap-2 text-red-500 transition-colors hover:text-red-600 dark:hover:text-red-400"
            >
              <XCircle className="w-5 h-5" />
              <span>پاک کردن سبد خرید</span>
            </button>
          )}
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col p-4 bg-white rounded-lg shadow-lg dark:bg-gray-900 sm:flex-row sm:items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-40 rounded-md sm:w-20 sm:h-20 sm:ml-4"
                    />
                    <div className="flex-1 mt-4 sm:mt-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 truncate dark:text-gray-300">{item.author}</p>
                      <p className="mt-2 font-bold text-primary-600 dark:text-primary-400">
                        {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                      </p>
                    </div>
                    <div className="flex items-center mt-4 space-x-4 sm:mt-0 sm:mr-4 rtl:space-x-reverse">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </motion.button>
                        <span className="font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Plus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemove(item.id, item.title)}
                        className="p-2 text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky p-6 bg-white rounded-lg shadow-lg dark:bg-gray-900 top-24"
              >
                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">خلاصه سفارش</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>تعداد کالاها:</span>
                    <span>{totalItems} عدد</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>هزینه ارسال:</span>
                    <span>رایگان</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                      <span>جمع کل:</span>
                      <span>{totalPrice.toLocaleString('fa-IR')} تومان</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full px-4 py-3 mt-6 text-center text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                >
                  ادامه فرآیند خرید
                </Link>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 text-center"
          >
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">سبد خرید شما خالی است</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              برای مشاهده محصولات به صفحه کتاب‌ها مراجعه کنید.
            </p>
            <Link
              to="/books"
              className="inline-block px-4 py-2 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
            >
              مشاهده کتاب‌ها
            </Link>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Cart;