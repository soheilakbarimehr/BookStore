// src/pages/Categories.tsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { useBooksContent } from '../context/BooksContentContext';
import { useCategories } from '../context/CategoriesContentContext';
import { iconList, defaultIcon } from '../utils/icons';

const Categories = () => {
  const { books } = useBooksContent();
  const { categories } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'default' | 'count-asc' | 'count-desc' | 'title-asc' | 'title-desc'>('default');

  // دیباگ: بررسی داده‌ها
  console.log('Categories in Categories:', categories);
  console.log('Books in Categories:', books);
  console.log('Icon List:', iconList);

  // اگر داده‌ها وجود نداشته باشند، پیام خطا نمایش بده
  if (!categories || !books) {
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-400">
        خطا: داده‌های دسته‌بندی‌ها یا کتاب‌ها بارگذاری نشدند.
      </div>
    );
  }

  // محاسبه تعداد کتاب‌ها در هر دسته‌بندی
  const categoriesWithCount = categories.map((category) => ({
    ...category,
    count: books.filter((book) => book.category === category.title).length,
  }));

  // فیلتر کردن دسته‌بندی‌ها بر اساس جستجو
  const filteredCategories = categoriesWithCount.filter(
    (category) =>
      category.title.includes(searchQuery) || category.description.includes(searchQuery)
  );

  // مرتب‌سازی دسته‌بندی‌ها
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortOption) {
      case 'count-asc':
        return a.count - b.count;
      case 'count-desc':
        return b.count - a.count;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      default:
        return a.id - b.id;
    }
  });

  return (
    <>
      <Helmet>
        <title>دسته‌بندی‌ها | کتاب‌خانه</title>
        <meta name="description" content="دسته‌بندی کتاب‌های الکترونیکی و چاپی در موضوعات مختلف" />
      </Helmet>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">دسته‌بندی‌های کتاب</h1>

        {/* Search and Sort */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-lg dark:bg-gray-900">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative">
              <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" />
              <input
                type="text"
                placeholder="جستجو در دسته‌بندی‌ها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-12 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                aria-label="جستجو در دسته‌بندی‌ها"
              />
            </div>
            <div className="relative">
              <Filter className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" />
              <select
                id="sort-categories"
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value as 'default' | 'count-asc' | 'count-desc' | 'title-asc' | 'title-desc')
                }
                aria-label="مرتب‌سازی دسته‌بندی‌ها"
                className="w-full px-4 py-2 pr-12 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="default">پیش‌فرض</option>
                <option value="count-asc">تعداد کتاب (صعودی)</option>
                <option value="count-desc">تعداد کتاب (نزولی)</option>
                <option value="title-asc">عنوان (الفبا صعودی)</option>
                <option value="title-desc">عنوان (الفبا نزولی)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        {sortedCategories.length === 0 ? (
          <div className="py-16 text-center text-gray-500 dark:text-gray-400">
            <p>دسته‌بندی با این مشخصات یافت نشد.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedCategories.map((category, index) => {
              // پیدا کردن آیکون با مدیریت خطا
              const Icon = iconList.find((icon) => icon.name === category.icon)?.Icon || defaultIcon.Icon;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 transition-shadow rounded-lg shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-xl"
                >
                  <Link to={`/category/${encodeURIComponent(category.title)}`} aria-label={`مشاهده دسته‌بندی ${category.title}`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Icon className="w-10 h-10 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1 mr-4">
                        <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                          {category.title}
                          <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">
                            ({category.count.toLocaleString()})
                          </span>
                        </h2>
                        <p className="mb-4 text-gray-600 dark:text-gray-300">{category.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {category.subcategories.map((sub) => (
                            <span
                              key={sub}
                              className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-300"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Categories;