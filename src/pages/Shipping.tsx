import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Truck, Package, Clock, MapPin } from 'lucide-react';

const Shipping = () => {
  const shippingInfo = [
    {
      icon: Truck,
      title: 'روش‌های ارسال',
      content: 'ارسال با پست پیشتاز و تیپاکس در سراسر کشور'
    },
    {
      icon: Package,
      title: 'بسته‌بندی',
      content: 'بسته‌بندی ایمن و استاندارد برای حفاظت از کتاب‌ها'
    },
    {
      icon: Clock,
      title: 'زمان تحویل',
      content: 'تهران: ۲۴ ساعته / شهرستان‌ها: ۴۸ تا ۷۲ ساعته'
    },
    {
      icon: MapPin,
      title: 'محدوده ارسال',
      content: 'ارسال به تمام نقاط ایران'
    }
  ];

  return (
    <>
      <Helmet>
        <title>راهنمای ارسال | کتاب‌خانه</title>
        <meta name="description" content="اطلاعات مربوط به نحوه ارسال و تحویل سفارشات در کتاب‌خانه" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Truck className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">راهنمای ارسال</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shippingInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
              >
                <Icon className="h-8 w-8 text-primary-600 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{info.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{info.content}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">هزینه ارسال</h2>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            <li>• سفارش‌های بالای ۵۰۰ هزار تومان: ارسال رایگان</li>
            <li>• تهران: از ۲۰ هزار تومان</li>
            <li>• شهرستان‌ها: از ۳۰ هزار تومان</li>
            <li>• هزینه دقیق ارسال بر اساس وزن و مقصد محاسبه می‌شود</li>
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default Shipping;