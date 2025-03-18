import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: 'نحوه خرید از کتاب‌خانه چگونه است؟',
      answer: 'برای خرید از کتاب‌خانه، کافیست کتاب مورد نظر خود را انتخاب کرده و به سبد خرید اضافه کنید. سپس با تکمیل اطلاعات و پرداخت آنلاین، سفارش شما ثبت خواهد شد.'
    },
    {
      question: 'هزینه ارسال چقدر است؟',
      answer: 'هزینه ارسال برای سفارش‌های بالای ۵۰۰ هزار تومان رایگان است. برای سایر سفارش‌ها، هزینه بر اساس وزن و مقصد محاسبه می‌شود.'
    },
    {
      question: 'مدت زمان ارسال چقدر است؟',
      answer: 'ارسال در تهران ۲۴ ساعته و در شهرستان‌ها ۴۸ تا ۷۲ ساعته انجام می‌شود.'
    },
    {
      question: 'آیا امکان مرجوع کردن کتاب وجود دارد؟',
      answer: 'بله، در صورت وجود مشکل در کتاب، تا ۷ روز امکان مرجوع کردن وجود دارد.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>سوالات متداول | کتاب‌خانه</title>
        <meta name="description" content="پاسخ به سوالات متداول درباره خرید از کتاب‌خانه" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <HelpCircle className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">سوالات متداول</h1>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{faq.question}</h2>
              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQ;