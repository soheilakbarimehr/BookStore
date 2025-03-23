// src/context/HomeContentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SliderItem {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonLink: string;
}

interface Feature {
  icon: 'Truck' | 'CreditCard' | 'Headphones';
  title: string;
  description: string;
}

interface Section {
  id: number;
  title: string;
  type: 'featured-books' | 'categories' | 'custom' | 'features';
  content: string | string[] | Feature[];
  visible: boolean;
}

interface HomeContent {
  slider: SliderItem[];
  sections: Section[];
}

interface HomeContentContextType {
  homeContent: HomeContent;
  updateSlider: (slider: SliderItem[]) => void;
  updateSections: (sections: Section[]) => void;
}

const HomeContentContext = createContext<HomeContentContextType | undefined>(undefined);

const initialHomeContent: HomeContent = {
  slider: [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1200',
      title: 'به کتاب‌خانه خوش آمدید',
      description: 'جدیدترین کتاب‌ها را با بهترین قیمت‌ها کشف کنید!',
      buttonLink: '/books',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200',
      title: 'تخفیف ویژه پاییزی',
      description: 'تا 30% تخفیف برای کتاب‌های منتخب',
      buttonLink: '/books',
    },
  ],
  sections: [
    {
      id: 1,
      title: 'کتاب‌های ویژه',
      type: 'featured-books',
      content: ['1', '2'],
      visible: true,
    },
    {
      id: 2,
      title: 'دسته‌بندی‌های محبوب',
      type: 'categories',
      content: ['ادبیات داستانی', 'توسعه فردی'],
      visible: true,
    },
    {
      id: 3,
      title: 'ویژگی‌ها',
      type: 'features',
      content: [
        { icon: 'Truck', title: 'ارسال سریع', description: 'ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان' },
        { icon: 'CreditCard', title: 'پرداخت امن', description: 'پرداخت اینترنتی مطمئن با درگاه‌های معتبر' },
        { icon: 'Headphones', title: 'پشتیبانی ۲۴/۷', description: 'پاسخگویی به سوالات شما در تمام ساعات' },
      ],
      visible: true,
    },
  ],
};

export const HomeContentProvider = ({ children }: { children: ReactNode }) => {
  const [homeContent, setHomeContent] = useState<HomeContent>(() => {
    const savedContent = localStorage.getItem('homeContent');
    return savedContent ? JSON.parse(savedContent) : initialHomeContent;
  });

  const updateSlider = (slider: SliderItem[]) => {
    const newContent = { ...homeContent, slider };
    setHomeContent(newContent);
    localStorage.setItem('homeContent', JSON.stringify(newContent));
  };

  const updateSections = (sections: Section[]) => {
    const newContent = { ...homeContent, sections };
    setHomeContent(newContent);
    localStorage.setItem('homeContent', JSON.stringify(newContent));
  };

  return (
    <HomeContentContext.Provider value={{ homeContent, updateSlider, updateSections }}>
      {children}
    </HomeContentContext.Provider>
  );
};

export const useHomeContent = () => {
  const context = useContext(HomeContentContext);
  if (!context) {
    throw new Error('useHomeContent must be used within a HomeContentProvider');
  }
  return context;
};