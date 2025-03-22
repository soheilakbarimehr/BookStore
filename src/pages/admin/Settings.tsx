import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Save } from 'lucide-react';

const AdminSettings = () => {
  return (
    <>
      <Helmet>
        <title>تنظیمات | کتاب‌خانه</title>
      </Helmet>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">تنظیمات سیستم</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <form>
            {/* General Settings */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">تنظیمات عمومی</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">نام فروشگاه</label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="کتاب‌خانه"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">ایمیل مدیریت</label>
                  <input
                    type="email"
                    className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="admin@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">شماره تماس</label>
                  <input
                    type="tel"
                    className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="۰۲۱-۱۲۳۴۵۶۷۸"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">آدرس</label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="تهران، خیابان ولیعصر"
                  />
                </div>
              </div>
            </div>

            {/* Payment Settings */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">تنظیمات پرداخت</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">درگاه پرداخت پیش‌فرض</label>
                  <select className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>زرین‌پال</option>
                    <option>پی‌پینگ</option>
                    <option>ایدی‌پی</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">کلید API</label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="کلید API درگاه پرداخت"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Settings */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">تنظیمات ارسال</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">حداقل مبلغ برای ارسال رایگان</label>
                  <input
                    type="number"
                    className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="500000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">هزینه ارسال پیش‌فرض</label>
                  <input
                    type="number"
                    className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="30000"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <Save className="h-5 w-5" />
                ذخیره تنظیمات
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;