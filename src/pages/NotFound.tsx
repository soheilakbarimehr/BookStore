import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookX } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <BookX className="h-32 w-32 mx-auto text-primary-600 dark:text-primary-400 mb-8" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-4"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl text-gray-600 dark:text-gray-300 mb-8"
        >
          متأسفانه صفحه مورد نظر شما یافت نشد
        </motion.p>
        <Link
          to="/"
          className="bg-primary-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
};

export default NotFound;