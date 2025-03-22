// CustomSection.tsx
import React from 'react';

interface CustomSectionProps {
  content: { fa: string; en: string };
  lang: 'fa' | 'en';
}

// کامپوننت بخش سفارشی
const CustomSection: React.FC<CustomSectionProps> = ({ content, lang }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
      <p className="text-gray-600 dark:text-gray-300">{lang === 'fa' ? content.fa : content.en}</p>
    </div>
  );
};

export default CustomSection;