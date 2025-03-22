// Categories.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoriesProps {
  categories: string[];
  lang: 'fa' | 'en';
}

// کامپوننت دسته‌بندی‌ها
const Categories: React.FC<CategoriesProps> = ({ categories, lang }) => {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {categories.map((category, index) => (
        <Link key={index} to={`/category/${encodeURIComponent(category)}`} className="block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 text-center bg-white rounded-lg cursor-pointer dark:bg-gray-900"
          >
            <Book className="mx-auto mb-4 w-12 h-12 text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {lang === 'fa' ? category : category} {/* در صورت نیاز به ترجمه، دیتا را تغییر دهید */}
            </h3>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;