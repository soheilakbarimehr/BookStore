import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ShoppingCart, ChevronLeft } from 'lucide-react';

interface CheckoutFormData {
  fullName: string;
  address: string;
  phone: string;
  email: string;
}

const Checkout = () => {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderCompleted, setOrderCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      fullName: '',
      address: '',
      phone: '',
      email: '',
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    // می‌توانیم سفارش را در localStorage یا API ذخیره کنیم
    const order = {
      id: Date.now(),
      user: data,
      items: cartItems,
      totalPrice,
      totalItems,
      date: new Date().toISOString(),
    };

    // ذخیره سفارش در localStorage (اختیاری)
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...savedOrders, order]));

    // پاک کردن سبد خرید
    clearCart();

    // نمایش پیام تأیید
    setOrderCompleted(true);

    // هدایت به صفحه اصلی پس از 3 ثانیه
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (cartItems.length === 0 && !orderCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-8 mx-auto text-center max-w-7xl sm:px-6 lg:px-8"
      >
        <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          سبد خرید شما خالی است
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          برای افزودن محصولات به سبد خرید به صفحه کتاب‌ها مراجعه کنید.
        </p>
        <Link
          to="/books"
          className="inline-block px-4 py-2 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
        >
          مشاهده کتاب‌ها
        </Link>
      </motion.div>
    );
  }

  return (
    <>
      <Helmet>
        <title>پرداخت | کتاب‌خانه</title>
        <meta name="description" content="صفحه پرداخت سفارشات شما در کتاب‌خانه" />
      </Helmet>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* پیام تأیید سفارش */}
        <AnimatePresence>
          {orderCompleted && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 mb-6 text-center text-green-800 bg-green-100 rounded-lg dark:bg-green-900/50 dark:text-green-200"
            >
              <h2 className="text-lg font-semibold">سفارش شما با موفقیت ثبت شد!</h2>
              <p>در حال هدایت به صفحه اصلی...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!orderCompleted && (
          <>
            <div className="flex items-center mb-8">
              <ShoppingCart className="w-8 h-8 ml-2 text-primary-600" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">پرداخت</h1>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* فرم اطلاعات کاربر */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2"
              >
                <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-900">
                  <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                    اطلاعات ارسال
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* نام کامل */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        نام کامل
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        {...register('fullName', { required: 'نام کامل الزامی است' })}
                        className={`w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700 ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                      )}
                    </div>

                    {/* آدرس */}
                    <div>
                      <label
                        htmlFor="address"
                        className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        آدرس
                      </label>
                      <textarea
                        id="address"
                        {...register('address', { required: 'آدرس الزامی است' })}
                        className={`w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700 ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        rows={3}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                      )}
                    </div>

                    {/* شماره تماس */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        شماره تماس
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        {...register('phone', {
                          required: 'شماره تماس الزامی است',
                          pattern: {
                            value: /^09\d{9}$/,
                            message: 'شماره تماس باید با 09 شروع شود و 11 رقم باشد',
                          },
                        })}
                        className={`w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* ایمیل */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        ایمیل
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email', {
                          required: 'ایمیل الزامی است',
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'ایمیل وارد شده معتبر نیست',
                          },
                        })}
                        className={`w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="flex justify-between mt-6">
                      <Link
                        to="/cart"
                        className="flex items-center text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        <ChevronLeft className="w-5 h-5 ml-1" />
                        بازگشت به سبد خرید
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-6 py-2 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                      >
                        تکمیل سفارش
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>

              {/* خلاصه سفارش */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-1"
              >
                <div className="sticky p-6 bg-white rounded-lg shadow-lg dark:bg-gray-900 top-24">
                  <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    خلاصه سفارش
                  </h2>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-cover w-16 h-16 rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {item.quantity} × {item.price.toLocaleString('fa-IR')} تومان
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>تعداد کالاها:</span>
                        <span>{totalItems} عدد</span>
                      </div>
                      <div className="flex justify-between mt-2 text-gray-600 dark:text-gray-300">
                        <span>هزینه ارسال:</span>
                        <span>رایگان</span>
                      </div>
                      <div className="flex justify-between mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                        <span>جمع کل:</span>
                        <span>{totalPrice.toLocaleString('fa-IR')} تومان</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Checkout;