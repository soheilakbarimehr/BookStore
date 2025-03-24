// src/context/CategoriesContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Category {
  id: number;
  title: string;
  icon: string;
  description: string;
  subcategories: string[];
}

interface CategoriesContextType {
  categories: Category[];
  updateCategories: (newCategories: Category[]) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

// دسته‌بندی‌های اولیه
const initialCategories: Category[] = [
  {
    id: 1,
    title: 'ادبیات داستانی',
    icon: 'BookOpen',
    description: 'رمان‌ها، داستان‌های کوتاه و ادبیات کلاسیک',
    subcategories: ['رمان خارجی', 'رمان ایرانی', 'داستان کوتاه', 'ادبیات کلاسیک'],
  },
  {
    id: 2,
    title: 'علمی-تخیلی',
    icon: 'Lightbulb',
    description: 'داستان‌های علمی-تخیلی و آینده‌نگرانه',
    subcategories: ['علمی-تخیلی', 'فانتزی', 'پادآرمان‌شهر', 'فضایی'],
  },
  {
    id: 3,
    title: 'تاریخی',
    icon: 'History',
    description: 'تاریخ ایران و جهان، باستان‌شناسی',
    subcategories: ['تاریخ ایران', 'تاریخ جهان', 'باستان‌شناسی', 'تاریخ معاصر'],
  },
  {
    id: 4,
    title: 'روانشناسی',
    icon: 'Brain',
    description: 'کتاب‌های روانشناسی و خودشناسی',
    subcategories: ['روانشناسی بالینی', 'خودشناسی', 'هوش هیجانی', 'رفتارشناسی'],
  },
  {
    id: 5,
    title: 'کودکان',
    icon: 'Baby',
    description: 'داستان‌های کودکان و نوجوانان',
    subcategories: ['داستان کودک', 'داستان نوجوان', 'شعر کودک', 'آموزشی'],
  },
  {
    id: 6,
    title: 'شعر',
    icon: 'Heart',
    description: 'مجموعه‌های شعر کلاسیک و معاصر',
    subcategories: ['شعر کلاسیک', 'شعر معاصر', 'غزل', 'شعر عاشقانه'],
  },
];

export function CategoriesProvider({ children }: { children: ReactNode }) {
  // لود دسته‌بندی‌ها از localStorage هنگام لود اولیه
  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  });

  // به‌روزرسانی localStorage هر وقت دسته‌بندی‌ها تغییر کردن
  const updateCategories = (newCategories: Category[]) => {
    console.log('Updating categories:', newCategories);
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  // دیباگ: بررسی تغییرات
  useEffect(() => {
    console.log('Categories updated in context:', categories);
  }, [categories]);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        updateCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};