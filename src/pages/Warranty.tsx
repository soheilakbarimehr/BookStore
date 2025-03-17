import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

const Warranty = () => {
  const warrantyInfo = [
    {
      icon: Shield,
      title: 'گارانتی اصالت',
      content: 'تمامی کتاب‌های ارائه شده در کتاب‌خانه اصل و دارای مجوز رسمی هستند.'
    },
    {
      icon: CheckCircle,
      title: 'تضمین کیفیت',
      content: 'کیفیت چاپ و صحافی تمامی کتاب‌ها تضمین شده است.'
    },
    {
      icon: AlertTriangle,
      title: 'شرایط گارانتی',
      content: 'گارانتی شامل مشکلات چاپی و صحافی می‌شود و شامل آسیب‌های فیزیکی نمی‌شود.'
    },
    {
      icon: HelpCircle,
      title: 'پشتیبانی',
      content: 'در صورت وجود هرگونه مشکل، تیم پشتیبانی ما آماده کمک به شما است.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>گارانتی محصولات | کتاب‌خانه</title>
        <meta name="description" content="اطلاعات مربوط به گارانتی و تضمین کیفیت محصولات در کتاب‌خانه" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">گارانتی محصولات</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {warrantyInfo.map((info, index) => {
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
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">شرایط استفاده از گارانتی</h2>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            <li>• گارانتی از تاریخ خرید به مدت یک ماه معتبر است</li>
            <li>• مشکلات چاپی و صحافی باید در هفته اول پس از دریافت کتاب گزارش شوند</li>
            <li>• گارانتی شامل آسیب‌های ناشی از استفاده نادرست نمی‌شود</li>
            <li>• برای استفاده از گارانتی، ارائه فاکتور خرید الزامی است</li>
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default Warranty;