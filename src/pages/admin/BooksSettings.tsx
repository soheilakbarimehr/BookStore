// src/pages/admin/BooksSettings.tsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Save, Plus, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useBooksContent } from '../../context/BooksContentContext';

const BooksSettings: React.FC = () => {
  const {
    books,
    categories,
    updateCategories,
    featuredBookIds,
    updateFeaturedBookIds,
    defaultSort,
    updateDefaultSort,
    defaultBooksPerPage,
    updateDefaultBooksPerPage,
  } = useBooksContent();

  const [localCategories, setLocalCategories] = useState(categories);
  const [localFeaturedBookIds, setLocalFeaturedBookIds] = useState(featuredBookIds);
  const [localDefaultSort, setLocalDefaultSort] = useState(defaultSort);
  const [localDefaultBooksPerPage, setLocalDefaultBooksPerPage] = useState(defaultBooksPerPage);

  // توابع برای مدیریت دسته‌بندی‌ها
  const handleCategoryChange = (index: number, value: string) => {
    const updatedCategories = [...localCategories];
    updatedCategories[index] = value;
    setLocalCategories(updatedCategories);
  };

  const addCategory = () => {
    setLocalCategories((prev) => [...prev, '']);
  };

  const removeCategory = (index: number) => {
    setLocalCategories((prev) => prev.filter((_, i) => i !== index));
  };

  // توابع برای مدیریت کتاب‌های ویژه
  const handleFeaturedBookChange = (bookId: number) => {
    setLocalFeaturedBookIds((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  // ذخیره تغییرات
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCategories(localCategories);
    updateFeaturedBookIds(localFeaturedBookIds);
    updateDefaultSort(localDefaultSort);
    updateDefaultBooksPerPage(localDefaultBooksPerPage);
    Swal.fire({
      title: 'تغییرات ذخیره شد!',
      text: 'تنظیمات صفحه کتاب‌ها با موفقیت به‌روزرسانی شد.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <Helmet>
        <title>تنظیمات صفحه کتاب‌ها | کتاب‌خانه</title>
      </Helmet>

      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">تنظیمات صفحه کتاب‌ها</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* مدیریت دسته‌بندی‌ها */}
          <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">دسته‌بندی‌ها</h2>
            <button
              type="button"
              onClick={addCategory}
              className="flex items-center gap-2 px-4 py-2 mb-4 text-white rounded-lg bg-primary-600 hover:bg-primary-700"
            >
              <Plus className="w-5 h-5" />
              افزودن دسته‌بندی جدید
            </button>
            {localCategories.map((category, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <div className="w-full">
                  <label
                    htmlFor={`category-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    نام دسته‌بندی
                  </label>
                  <input
                    id={`category-${index}`}
                    type="text"
                    value={category}
                    onChange={(e) => handleCategoryChange(index, e.target.value)}
                    placeholder="نام دسته‌بندی"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeCategory(index)}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                  حذف
                </button>
              </div>
            ))}
          </div>

          {/* مدیریت کتاب‌های ویژه */}
          <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">کتاب‌های ویژه</h2>
            <div className="grid grid-cols-1 gap-2">
              {books.map((book) => (
                <label key={book.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`featured-book-${book.id}`}
                    checked={localFeaturedBookIds.includes(book.id)}
                    onChange={() => handleFeaturedBookChange(book.id)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-900 dark:text-white">
                    {book.title} - {book.author}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* تنظیمات پیش‌فرض */}
          <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">تنظیمات پیش‌فرض</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="default-sort"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  مرتب‌سازی پیش‌فرض
                </label>
                <select
                  id="default-sort"
                  value={localDefaultSort}
                  onChange={(e) => setLocalDefaultSort(e.target.value)}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="newest">جدیدترین</option>
                  <option value="popular">محبوب‌ترین</option>
                  <option value="price-asc">ارزان‌ترین</option>
                  <option value="price-desc">گران‌ترین</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="default-books-per-page"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  تعداد کتاب‌ها در هر صفحه
                </label>
                <input
                  id="default-books-per-page"
                  type="number"
                  value={localDefaultBooksPerPage}
                  onChange={(e) => setLocalDefaultBooksPerPage(Number(e.target.value))}
                  min="1"
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* دکمه ذخیره */}
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 text-white rounded-lg bg-primary-600 hover:bg-primary-700"
          >
            <Save className="w-5 h-5" />
            ذخیره تغییرات
          </button>
        </form>
      </div>
    </>
  );
};

export default BooksSettings;