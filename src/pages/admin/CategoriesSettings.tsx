import React from 'react';
import { Helmet } from 'react-helmet-async';

const CategoriesSettings = () => {
  return (
    <>
      <Helmet>
        <title>تنظیمات دسته‌بندی‌ها | کتاب‌خانه</title>
      </Helmet>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">تنظیمات دسته‌بندی‌ها</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-gray-600 dark:text-gray-300">اینجا می‌تونید تنظیمات مربوط به دسته‌بندی‌ها رو مدیریت کنید.</p>
          {/* بعداً می‌تونید فرم‌ها یا جداول مربوط به دسته‌بندی‌ها رو اینجا اضافه کنید */}
        </div>
      </div>
    </>
  );
};

export default CategoriesSettings;