// src/pages/Categories.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Brain, Palette, History, Baby, GraduationCap, Heart, Compass, Music, Coffee, Lightbulb } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      id: 1,
      title: 'ادبیات داستانی',
      icon: BookOpen,
      description: 'رمان‌ها، داستان‌های کوتاه و ادبیات کلاسیک',
      count: 2547,
      subcategories: ['رمان خارجی', 'رمان ایرانی', 'داستان کوتاه', 'ادبیات کلاسیک'],
    },
    {
      id: 2,
      title: 'علوم انسانی',
      icon: Users,
      description: 'روانشناسی، جامعه‌شناسی و علوم اجتماعی',
      count: 1823,
      subcategories: ['روانشناسی', 'جامعه‌شناسی', 'فلسفه', 'تاریخ'],
    },
    {
      id: 3,
      title: 'توسعه فردی',
      icon: Brain,
      description: 'موفقیت، مدیریت زمان و خودشناسی',
      count: 956,
      subcategories: ['موفقیت', 'مدیریت زمان', 'خودشناسی', 'ارتباطات'],
    },
    {
      id: 4,
      title: 'هنر',
      icon: Palette,
      description: 'نقاشی، موسیقی، سینما و عکاسی',
      count: 745,
      subcategories: ['نقاشی', 'موسیقی', 'سینما', 'عکاسی'],
    },
    {
      id: 5,
      title: 'تاریخ',
      icon: History,
      description: 'تاریخ ایران و جهان، باستان‌شناسی',
      count: 1234,
      subcategories: ['تاریخ ایران', 'تاریخ جهان', 'باستان‌شناسی', 'تاریخ معاصر'],
    },
    {
      id: 6,
      title: 'کودک و نوجوان',
      icon: Baby,
      description: 'داستان‌های کودکان و نوجوانان',
      count: 1567,
      subcategories: ['داستان کودک', 'داستان نوجوان', 'شعر کودک', 'آموزشی'],
    },
    {
      id: 7,
      title: 'آموزشی',
      icon: GraduationCap,
      description: 'کتاب‌های درسی و کمک آموزشی',
      count: 890,
      subcategories: ['کتب درسی', 'کنکور', 'زبان خارجی', 'برنامه‌نویسی'],
    },
    {
      id: 8,
      title: 'رمانتیک',
      icon: Heart,
      description: 'داستان‌های عاشقانه و رمانتیک',
      count: 678,
      subcategories: ['رمان عاشقانه', 'شعر عاشقانه', 'داستان کوتاه', 'ادبیات کلاسیک'],
    },
    {
      id: 9,
      title: 'سفر و ماجراجویی',
      icon: Compass,
      description: 'سفرنامه‌ها و داستان‌های ماجراجویی',
      count: 432,
      subcategories: ['سفرنامه', 'راهنمای سفر', 'ماجراجویی', 'طبیعت‌گردی'],
    },
    {
      id: 10,
      title: 'هنرهای نمایشی',
      icon: Music,
      description: 'تئاتر، سینما و موسیقی',
      count: 345,
      subcategories: ['تئاتر', 'سینما', 'موسیقی', 'نمایشنامه'],
    },
    {
      id: 11,
      title: 'سبک زندگی',
      icon: Coffee,
      description: 'آشپزی، دکوراسیون و سلامتی',
      count: 789,
      subcategories: ['آشپزی', 'دکوراسیون', 'سلامتی', 'ورزش'],
    },
    {
      id: 12,
      title: 'علم و دانش',
      icon: Lightbulb,
      description: 'فیزیک، شیمی و زیست‌شناسی',
      count: 567,
      subcategories: ['فیزیک', 'شیمی', 'زیست‌شناسی', 'نجوم'],
    },
  ];

  return (
    <>
      <Helmet>
        <title>دسته‌بندی‌ها | کتاب‌خانه</title>
        <meta name="description" content="دسته‌بندی کتاب‌های الکترونیکی و چاپی در موضوعات مختلف" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">دسته‌بندی‌های کتاب</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <Link to={`/category/${encodeURIComponent(category.title)}`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Icon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="mr-4 flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {category.title}
                        <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">
                          ({category.count.toLocaleString()})
                        </span>
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.map((sub) => (
                          <span
                            key={sub}
                            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
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
      </div>
    </>
  );
};

export default Categories;