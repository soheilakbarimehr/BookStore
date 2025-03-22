// src/context/HomeContentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// تایپ اسلایدها
interface Slide {
  id: number;
  title: { fa: string; en: string };
  description: { fa: string; en: string };
  image: string;
  buttonLink: string;
}

// تایپ ویژگی‌ها
interface Feature {
  title: { fa: string; en: string };
  description: { fa: string; en: string };
  icon: 'Truck' | 'CreditCard' | 'Headphones';
}

// تایپ بخش‌ها
interface Section {
  id: number;
  title: { fa: string; en: string };
  type: 'featured-books' | 'latest-books' | 'features' | 'custom';
  content: string[] | Feature[] | string;
  visible: boolean;
}

interface HomeContent {
  slider: Slide[];
  sections: Section[];
}

const HomeContentContext = createContext<
  | {
      homeContent: HomeContent;
      setHomeContent: React.Dispatch<React.SetStateAction<HomeContent>>;
    }
  | undefined
>(undefined);

export const HomeContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [homeContent, setHomeContent] = useState<HomeContent>({
    slider: [
      {
        id: 1,
        title: { fa: 'خوش آمدید به کتاب‌خانه', en: 'Welcome to Bookstore' },
        description: { fa: 'بهترین کتاب‌ها را با بهترین قیمت پیدا کنید', en: 'Find the best books at the best prices' },
        image: 'slide1.jpg',
        buttonLink: '/shop',
      },
      {
        id: 2,
        title: { fa: 'تخفیف ویژه این هفته', en: 'This Week’s Special Discount' },
        description: { fa: 'تا 50% تخفیف برای کتاب‌های منتخب', en: 'Up to 50% off on selected books' },
        image: 'slide2.jpg',
        buttonLink: '/shop/discounts',
      },
    ],
    sections: [
      {
        id: 1,
        title: { fa: 'ویژگی‌های ما', en: 'Our Features' },
        type: 'features',
        content: [
          {
            title: { fa: 'ارسال سریع', en: 'Fast Delivery' },
            description: { fa: 'ارسال در کمتر از 24 ساعت', en: 'Delivery in less than 24 hours' },
            icon: 'Truck',
          },
          {
            title: { fa: 'پرداخت امن', en: 'Secure Payment' },
            description: { fa: 'پرداخت با درگاه امن', en: 'Pay with a secure gateway' },
            icon: 'CreditCard',
          },
          {
            title: { fa: 'پشتیبانی 24/7', en: '24/7 Support' },
            description: { fa: 'پشتیبانی شبانه‌روزی', en: 'Round-the-clock support' },
            icon: 'Headphones',
          },
        ],
        visible: true,
      },
      {
        id: 2,
        title: { fa: 'کتاب‌های ویژه', en: 'Featured Books' },
        type: 'featured-books',
        content: ['1', '2', '3', '4', '5'], // آیدی کتاب‌ها برای 5 کارت
        visible: true,
      },
      {
        id: 3,
        title: { fa: 'جدیدترین کتاب‌ها', en: 'Latest Books' },
        type: 'latest-books',
        content: ['6', '7', '8', '9', '10'], // آیدی کتاب‌ها برای 5 کارت
        visible: true,
      },
    ],
  });

  return (
    <HomeContentContext.Provider value={{ homeContent, setHomeContent }}>
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