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
        <h1 className="text-2xl font-bold mb-6">تنظیمات سیستم</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <form>
            {/* General Settings */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">تنظیمات عمومی</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">نام فروشگاه</label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 border rounded-lg"
                    defaultValue="کتاب‌خانه"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ایمیل مدیریت</label>
                  <input
                    type="email"
                    className="w-full py-2 px-4 border rounded-lg"
                    defaultValue="admin@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">شماره تماس</label>
                  <input
                    type="tel"
                    className="w-full py-2 px-4 border rounded-lg"
                    defaultValue="۰۲۱-۱۲۳۴۵۶۷۸"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">آدرس</label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 border rounded-lg"
                    defaultValue="تهران، خیابان ولیعصر"
                  />
                </div>
              </div>
            </div>

            {/* Payment Settings */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">تنظیمات پرداخت</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">درگاه پرداخت پیش‌فرض</label>
                  <select className="w-full py-2 px-4 border rounded-lg">
                    <option>زرین‌پال</option>
                    <option>پی‌پینگ</option>
                    <option>ایدی‌پی</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">کلید API</label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 border rounded-lg"
                    placeholder="کلید API درگاه پرداخت"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Settings */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">تنظیمات ارسال</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">حداقل مبلغ برای ارسال رایگان</label>
                  <input
                    type="number"
                    className="w-full py-2 px-4 border rounded-lg"
                    defaultValue="500000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">هزینه ارسال پیش‌فرض</label>
                  <input
                    type="number"
                    className="w-full py-2 px-4 border rounded-lg"
                    defaultValue="30000"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
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