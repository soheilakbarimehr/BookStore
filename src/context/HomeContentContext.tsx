// src/context/HomeContentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// تعریف تایپ‌ها
interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonLink: string;
}

interface Feature {
  title: string;
  description: string;
  icon: 'Truck' | 'CreditCard' | 'Headphones';
}

interface Section {
  id: number;
  title: string;
  type: 'featured-books' | 'categories' | 'features' | 'custom' | 'latest-books';
  content: string[] | Feature[] | string;
  visible: boolean;
}

interface PageContent {
  slider?: Slide[];
  sections: Section[];
  customContent?: string; // برای صفحاتی مثل About که محتوای متنی دارن
}

interface ContentState {
  pages: {
    [key: string]: PageContent; // کلید: نام صفحه (مثل "home", "about")
  };
}

interface HomeContentContextType {
  content: ContentState;
  updatePageContent: (page: string, newContent: PageContent) => void;
  updateSlider: (page: string, newSlider: Slide[]) => void;
  updateSections: (page: string, newSections: Section[]) => void;
  updateCustomContent: (page: string, newCustomContent: string) => void;
}

const HomeContentContext = createContext<HomeContentContextType | undefined>(undefined);

// دیتای اولیه
const initialContent: ContentState = {
  pages: {
    home: {
      slider: [
        {
          id: 1,
          title: 'به کتاب‌خانه خوش آمدید',
          description: 'بهترین کتاب‌های الکترونیکی و چاپی را با ما تجربه کنید',
          image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1200',
          buttonLink: '/books',
        },
      ],
      sections: [
        {
          id: 1,
          title: 'ویژگی‌های ما',
          type: 'features',
          content: [
            { title: 'ارسال سریع', description: 'تحویل در کمتر از ۴۸ ساعت', icon: 'Truck' },
            { title: 'پرداخت امن', description: 'پرداخت با درگاه‌های معتبر', icon: 'CreditCard' },
            { title: 'پشتیبانی ۲۴/۷', description: 'همیشه در کنار شما هستیم', icon: 'Headphones' },
          ],
          visible: true,
        },
        {
          id: 2,
          title: 'کتاب‌های ویژه',
          type: 'featured-books',
          content: ['1', '2', '3', '4'],
          visible: true,
        },
        {
          id: 3,
          title: 'دسته‌بندی‌ها',
          type: 'categories',
          content: ['ادبیات داستانی', 'علمی-تخیلی', 'تاریخی', 'روانشناسی'],
          visible: true,
        },
      ],
    },
    about: {
      sections: [],
      customContent: '<h2>درباره ما</h2><p>ما یک فروشگاه آنلاین کتاب هستیم که از سال ۱۴۰۰ فعالیت خود را آغاز کرده‌ایم.</p>',
    },
    // می‌تونی صفحات دیگه رو هم اینجا اضافه کنی
  },
};

export function HomeContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentState>(initialContent);

  const updatePageContent = (page: string, newContent: PageContent) => {
    setContent((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [page]: newContent,
      },
    }));
  };

  const updateSlider = (page: string, newSlider: Slide[]) => {
    setContent((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [page]: {
          ...prev.pages[page],
          slider: newSlider,
        },
      },
    }));
  };

  const updateSections = (page: string, newSections: Section[]) => {
    setContent((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [page]: {
          ...prev.pages[page],
          sections: newSections,
        },
      },
    }));
  };

  const updateCustomContent = (page: string, newCustomContent: string) => {
    setContent((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [page]: {
          ...prev.pages[page],
          customContent: newCustomContent,
        },
      },
    }));
  };

  return (
    <HomeContentContext.Provider value={{ content, updatePageContent, updateSlider, updateSections, updateCustomContent }}>
      {children}
    </HomeContentContext.Provider>
  );
}

export const useHomeContent = () => {
  const context = useContext(HomeContentContext);
  if (!context) {
    throw new Error('useHomeContent must be used within a HomeContentProvider');
  }
  return context;
};