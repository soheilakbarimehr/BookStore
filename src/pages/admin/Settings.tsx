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
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">تنظیمات سیستم</h1>

        <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <form>
            {/* General Settings */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">تنظیمات عمومی</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="store-name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">نام فروشگاه</label>
                  <input
                    id="store-name"
                    type="text"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="کتاب‌خانه"
                  />
                </div>
                <div>
                  <label htmlFor="admin-email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">ایمیل مدیریت</label>
                  <input
                    id="admin-email"
                    type="email"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="admin@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-number" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">شماره تماس</label>
                  <input
                    id="contact-number"
                    type="tel"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="۰۲۱-۱۲۳۴۵۶۷۸"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">آدرس</label>
                  <input
                    id="address"
                    type="text"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="تهران، خیابان ولیعصر"
                  />
                </div>
              </div>
            </div>

            {/* Payment Settings */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">تنظیمات پرداخت</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="payment-gateway" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">درگاه پرداخت پیش‌فرض</label>
                  <select
                    id="payment-gateway"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>زرین‌پال</option>
                    <option>پی‌پینگ</option>
                    <option>ایدی‌پی</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="api-key" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">کلید API</label>
                  <input
                    id="api-key"
                    type="text"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="کلید API درگاه پرداخت"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Settings */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">تنظیمات ارسال</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="free-shipping-threshold" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">حداقل مبلغ برای ارسال رایگان</label>
                  <input
                    id="free-shipping-threshold"
                    type="number"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="500000"
                  />
                </div>
                <div>
                  <label htmlFor="default-shipping-cost" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">هزینه ارسال پیش‌فرض</label>
                  <input
                    id="default-shipping-cost"
                    type="number"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="30000"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 text-white rounded-lg bg-primary-600 hover:bg-primary-700"
              >
                <Save className="w-5 h-5" />
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