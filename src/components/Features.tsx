// Features.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, CreditCard, Headphones } from 'lucide-react';

interface Feature {
  title: { fa: string; en: string };
  description: { fa: string; en: string };
  icon: 'Truck' | 'CreditCard' | 'Headphones';
}

interface FeaturesProps {
  features: Feature[];
  lang: 'fa' | 'en';
}

// کامپوننت ویژگی‌ها
const Features: React.FC<FeaturesProps> = ({ features, lang }) => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="p-6 text-center bg-gray-50 rounded-lg dark:bg-gray-800"
        >
          <div className="flex justify-center mb-4">
            {feature.icon === 'Truck' && <Truck className="w-12 h-12 text-primary-600" />}
            {feature.icon === 'CreditCard' && <CreditCard className="w-12 h-12 text-primary-600" />}
            {feature.icon === 'Headphones' && <Headphones className="w-12 h-12 text-primary-600" />}
          </div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            {lang === 'fa' ? feature.title.fa : feature.title.en}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {lang === 'fa' ? feature.description.fa : feature.description.en}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default Features;