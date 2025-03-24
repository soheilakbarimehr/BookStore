// src/context/AboutContentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// تعریف تایپ‌ها
interface Stat {
  icon: string;
  value: number | string;
  label: string;
  countKey?: string;
  suffix?: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  socials: { instagram: string; twitter: string };
}

interface Testimonial {
  name: string;
  comment: string;
  rating: number;
}

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

interface AboutContent {
  hero: {
    title: string;
    description: string;
    backgroundImage: string;
    buttonText: string;
    buttonLink: string;
  };
  stats: Stat[];
  mission: {
    title: string;
    description: string;
    items: string[];
    image: string;
  };
  team: TeamMember[];
  testimonials: Testimonial[];
  contact: ContactInfo;
}

interface AboutContentContextType {
  content: AboutContent;
  updateContent: (newContent: AboutContent) => void;
}

const AboutContentContext = createContext<AboutContentContextType | undefined>(undefined);

// دیتای اولیه
const initialContent: AboutContent = {
  hero: {
    title: 'درباره کتاب‌خانه',
    description: 'از سال ۱۳۹۵ با هدف گسترش فرهنگ کتابخوانی و دسترسی آسان به کتاب‌های با کیفیت، فعالیت خود را آغاز کردیم.',
    backgroundImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1920',
    buttonText: 'مشاهده کتاب‌ها',
    buttonLink: '/books',
  },
  stats: [
    { icon: 'Book', value: 10000, label: 'عنوان کتاب', countKey: 'books' },
    { icon: 'Users', value: 50000, label: 'کاربر فعال', countKey: 'users' },
    { icon: 'Clock', value: '۲۴/۷', label: 'پشتیبانی' },
    { icon: 'Award', value: 98, label: 'رضایت مشتری', countKey: 'satisfaction', suffix: '%' },
  ],
  mission: {
    title: 'مأموریت ما',
    description: 'ما در کتاب‌خانه معتقدیم که دسترسی به کتاب و دانش حق همه است. هدف ما ایجاد پلتفرمی است که در آن همه بتوانند به راحتی به کتاب‌های مورد علاقه خود دسترسی داشته باشند.',
    items: [
      'ارائه بهترین کتاب‌ها با قیمت مناسب',
      'ارسال سریع و مطمئن به سراسر کشور',
      'پشتیبانی ۲۴ ساعته از مشتریان',
    ],
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
  },
  team: [
    {
      name: 'علی محمدی',
      role: 'مدیر عامل',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      bio: 'بیش از ۱۵ سال تجربه در صنعت نشر و کتاب',
      socials: { instagram: '#', twitter: '#' },
    },
    {
      name: 'مریم حسینی',
      role: 'مدیر محتوا',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
      bio: 'کارشناس ارشد ادبیات و ویراستار با ۱۰ سال سابقه',
      socials: { instagram: '#', twitter: '#' },
    },
    {
      name: 'رضا کریمی',
      role: 'مدیر فنی',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      bio: 'متخصص فناوری اطلاعات و توسعه نرم‌افزار',
      socials: { instagram: '#', twitter: '#' },
    },
    {
      name: 'سارا رضایی',
      role: 'مدیر فروش',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      bio: 'کارشناس بازاریابی و فروش با تجربه در صنعت نشر',
      socials: { instagram: '#', twitter: '#' },
    },
  ],
  testimonials: [
    {
      name: 'نیما احمدی',
      comment: 'کتاب‌خانه بهترین پلتفرم برای خرید کتاب است. تنوع کتاب‌ها فوق‌العاده است!',
      rating: 5,
    },
    {
      name: 'فاطمه رضوی',
      comment: 'ارسال سریع و پشتیبانی عالی! حتماً دوباره خرید می‌کنم.',
      rating: 4,
    },
    {
      name: 'حسین کاظمی',
      comment: 'کیفیت کتاب‌ها و خدمات مشتریان عالی است. بسیار راضی هستم.',
      rating: 5,
    },
  ],
  contact: {
    address: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک',
    phone: '۰۲۱-۱۲۳۴۵۶۷۸',
    email: 'info@bookstore.ir',
  },
};

export function AboutContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<AboutContent>(initialContent);

  const updateContent = (newContent: AboutContent) => {
    setContent(newContent);
  };

  return (
    <AboutContentContext.Provider value={{ content, updateContent }}>
      {children}
    </AboutContentContext.Provider>
  );
}

export const useAboutContent = () => {
  const context = useContext(AboutContentContext);
  if (!context) {
    throw new Error('useAboutContent must be used within an AboutContentProvider');
  }
  return context;
};