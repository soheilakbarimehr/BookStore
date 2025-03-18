import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { RefreshCw, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';

const Returns = () => {
  const returnPolicies = [
    {
      icon: ShieldCheck,
      title: 'شرایط مرجوعی',
      content: 'کتاب‌های با مشکلات چاپی یا فنی تا ۷ روز قابل مرجوع هستند.'
    },
    {
      icon: AlertCircle,
      title: 'موارد غیرقابل مرجوع',
      content: 'کتاب‌های باز شده یا آسیب دیده توسط خریدار قابل مرجوع نیستند.'
    },
    {
      icon: RefreshCw,
      title: 'فرآیند مرجوعی',
      content: 'درخواست مرجوعی را در پنل کاربری ثبت کنید و کتاب را برای ما ارسال نمایید.'
    },
    {
      icon: CheckCircle,
      title: 'بازگشت وجه',
      content: 'پس از تایید مرجوعی، وجه پرداختی ظرف ۴۸ ساعت به حساب شما واریز می‌شود.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>شرایط مرجوعی | کتاب‌خانه</title>
        <meta name="description" content="اطلاعات مربوط به شرایط و نحوه مرجوع کردن کتاب در کتاب‌خانه" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <RefreshCw className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">شرایط مرجوعی کالا</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {returnPolicies.map((policy, index) => {
            const Icon = policy.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
              >
                <Icon className="h-8 w-8 text-primary-600 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{policy.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{policy.content}</p>
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
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">نکات مهم</h2>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            <li>• هزینه ارسال مرجوعی بر عهده خریدار است</li>
            <li>• کتاب‌های الکترونیکی قابل مرجوع نیستند</li>
            <li>• برای مرجوعی حتماً از بسته‌بندی مناسب استفاده کنید</li>
            <li>• در صورت نیاز به راهنمایی با پشتیبانی تماس بگیرید</li>
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default Returns;