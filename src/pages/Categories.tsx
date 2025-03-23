import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Brain, Palette, History, Baby, GraduationCap, Heart, Compass, Music, Coffee, Lightbulb, Search, Filter } from 'lucide-react';

// داده‌های کتاب‌ها (فرض می‌کنیم از app.js وارد شده‌اند)
const booksData = [
  {
    id: 1,
    title: 'سووشون',
    author: 'سیمین دانشور',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    format: 'both',
    description: 'رمانی ماندگار از ادبیات معاصر ایران که روایتگر داستانی عاشقانه در بستر تاریخ است.',
    category: 'ادبیات داستانی',
  },
  {
    id: 2,
    title: 'چشم‌هایش',
    author: 'بزرگ علوی',
    price: 92000,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    format: 'print',
    description: 'داستان عشق و هنر در دوران پرتلاطم تاریخ معاصر ایران.',
    category: 'ادبیات داستانی',
  },
  {
    id: 3,
    title: 'کلیدر',
    author: 'محمود دولت‌آبادی',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    format: 'both',
    description: 'حماسه‌ای بزرگ از زندگی مردم خراسان که در ده جلد به رشته تحریر درآمده است.',
    category: 'ادبیات داستانی',
  },
  {
    id: 4,
    title: 'نیمه تاریک ماه',
    author: 'هوشنگ گلشیری',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 4.3,
    format: 'ebook',
    description: 'مجموعه داستان‌های کوتاه با نگاهی عمیق به جامعه معاصر.',
    category: 'ادبیات داستانی',
  },
  {
    id: 5,
    title: 'سمفونی مردگان',
    author: 'عباس معروفی',
    price: 98000,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
    format: 'both',
    description: 'روایتی چند صدایی از فروپاشی یک خانواده در بستر تاریخ معاصر.',
    category: 'ادبیات داستانی',
  },
  {
    id: 6,
    title: 'بامداد خمار',
    author: 'فتانه حاج سید جوادی',
    price: 88000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 4.4,
    format: 'print',
    description: 'داستانی عاشقانه در تهران قدیم که روایتگر زندگی زنان در دوره قاجار است.',
    category: 'ادبیات داستانی',
  },
  {
    id: 7,
    title: 'بنیاد',
    author: 'آیزاک آسیموف',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    format: 'both',
    description: 'رمانی کلاسیک در ژانر علمی-تخیلی که آینده‌ی بشریت را در کهکشان‌ها روایت می‌کند.',
    category: 'علمی-تخیلی',
  },
  {
    id: 8,
    title: 'تل‌ماسه',
    author: 'فرانک هربرت',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    format: 'both',
    description: 'داستانی حماسی در سیاره‌ای بیابانی که سیاست، مذهب و قدرت را در هم می‌آمیزد.',
    category: 'علمی-تخیلی',
  },
  {
    id: 9,
    title: 'جنگجوی ستاره‌ای',
    author: 'رابرت هاین‌لاین',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    format: 'ebook',
    description: 'داستانی درباره‌ی جنگ‌های فضایی و نقش انسان در آینده‌ی تکنولوژی.',
    category: 'علمی-تخیلی',
  },
  {
    id: 10,
    title: '1984',
    author: 'جورج اورول',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    format: 'both',
    description: 'رمانی پادآرمان‌شهری که آینده‌ای تحت سلطه‌ی دیکتاتوری را به تصویر می‌کشد.',
    category: 'علمی-تخیلی',
  },
  {
    id: 11,
    title: 'جهان‌های موازی',
    author: 'فیلیپ ک. دیک',
    price: 110000,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
    format: 'print',
    description: 'داستانی درباره‌ی واقعیت‌های موازی و تأثیر آن‌ها بر زندگی انسان‌ها.',
    category: 'علمی-تخیلی',
  },
  {
    id: 12,
    title: 'مریخی',
    author: 'اندی ویر',
    price: 130000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    format: 'both',
    description: 'داستانی درباره‌ی تلاش یک فضانورد برای بقا در سیاره‌ی مریخ.',
    category: 'علمی-تخیلی',
  },
  {
    id: 13,
    title: 'طوبی و معنای شب',
    author: 'شهرنوش پارسی‌پور',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    format: 'both',
    description: 'رمانی با عناصر رئالیسم جادویی که به زندگی زنی در گذر تاریخ می‌پردازد.',
    category: 'تاریخی',
  },
  {
    id: 14,
    title: 'شازده احتجاب',
    author: 'هوشنگ گلشیری',
    price: 72000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    format: 'print',
    description: 'روایتی از فروپاشی یک خانواده اشرافی در دوره قاجار.',
    category: 'تاریخی',
  },
  {
    id: 15,
    title: 'جزیره سرگردانی',
    author: 'سیمین دانشور',
    price: 110000,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
    format: 'both',
    description: 'داستانی عاشقانه و سیاسی در بستر انقلاب ایران.',
    category: 'تاریخی',
  },
  {
    id: 16,
    title: 'دایی جان ناپلئون',
    author: 'ایرج پزشکزاد',
    price: 99000,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    format: 'print',
    description: 'رمانی طنزآمیز درباره خانواده‌ای در تهران قدیم.',
    category: 'تاریخی',
  },
  {
    id: 17,
    title: 'همسایه‌ها',
    author: 'احمد محمود',
    price: 87000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    format: 'both',
    description: 'داستانی از زندگی مردم جنوب ایران در دوران جنگ.',
    category: 'تاریخی',
  },
  {
    id: 18,
    title: 'بینوایان',
    author: 'ویکتور هوگو',
    price: 200000,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    format: 'both',
    description: 'رمانی کلاسیک درباره‌ی فقر و عدالت در فرانسه قرن نوزدهم.',
    category: 'تاریخی',
  },
  {
    id: 19,
    title: 'قدرت عادت',
    author: 'چارلز داهیگ',
    price: 90000,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
    format: 'both',
    description: 'کتابی درباره‌ی چگونگی شکل‌گیری عادت‌ها و تأثیر آن‌ها بر زندگی.',
    category: 'روانشناسی',
  },
  {
    id: 20,
    title: 'تفکر سریع و کند',
    author: 'دانیل کانمن',
    price: 140000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    format: 'both',
    description: 'تحلیلی عمیق از نحوه‌ی تصمیم‌گیری انسان‌ها و نقش ذهن در آن.',
    category: 'روانشناسی',
  },
  {
    id: 21,
    title: 'هنر شفاف اندیشیدن',
    author: 'رولف دوبلی',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    format: 'ebook',
    description: 'کتابی درباره‌ی خطاهای شناختی و چگونگی اجتناب از آن‌ها.',
    category: 'روانشناسی',
  },
  {
    id: 22,
    title: 'نیروی حال',
    author: 'اکهارت تول',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    format: 'both',
    description: 'راهنمایی برای زندگی در لحظه و رهایی از افکار منفی.',
    category: 'روانشناسی',
  },
  {
    id: 23,
    title: 'ذهن آگاهی',
    author: 'جان کابات زین',
    price: 88000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
    format: 'print',
    description: 'معرفی تکنیک‌های ذهن‌آگاهی برای کاهش استرس و بهبود زندگی.',
    category: 'روانشناسی',
  },
  {
    id: 24,
    title: 'هوش هیجانی',
    author: 'دانیل گولمن',
    price: 110000,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    format: 'both',
    description: 'کتابی درباره‌ی اهمیت هوش هیجانی در موفقیت و روابط.',
    category: 'روانشناسی',
  },
  {
    id: 25,
    title: 'شازده کوچولو',
    author: 'آنتوان دو سنت‌اگزوپری',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    format: 'both',
    description: 'داستانی کلاسیک و تخیلی برای کودکان و بزرگسالان درباره‌ی دوستی و عشق.',
    category: 'کودکان',
  },
  {
    id: 26,
    title: 'ماتیلدا',
    author: 'رولد دال',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    format: 'print',
    description: 'داستان دختری باهوش که با قدرت‌های جادویی‌اش زندگی را تغییر می‌دهد.',
    category: 'کودکان',
  },
  {
    id: 27,
    title: 'هری پاتر و سنگ جادو',
    author: 'جی. کی. رولینگ',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    format: 'both',
    description: 'اولین جلد از سری هری پاتر، ماجراهای یک جادوگر جوان.',
    category: 'کودکان',
  },
  {
    id: 28,
    title: 'چارلی و کارخانه شکلات‌سازی',
    author: 'رولد دال',
    price: 68000,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    format: 'print',
    description: 'داستانی شیرین درباره‌ی ماجراهای یک پسر در کارخانه‌ی شکلات.',
    category: 'کودکان',
  },
  {
    id: 29,
    title: 'داستان‌های خوب برای بچه‌های خوب',
    author: 'مهدی آذر یزدی',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
    format: 'both',
    description: 'مجموعه داستان‌های ایرانی برای کودکان با مضامین اخلاقی.',
    category: 'کودکان',
  },
  {
    id: 30,
    title: 'گربه‌ای که کتاب‌ها را دوست داشت',
    author: 'سوسن طاقدیس',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    format: 'print',
    description: 'داستانی جذاب برای کودکان درباره‌ی عشق به کتاب.',
    category: 'کودکان',
  },
  {
    id: 31,
    title: 'دیوان حافظ',
    author: 'حافظ شیرازی',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    format: 'both',
    description: 'مجموعه اشعار عاشقانه و عرفانی حافظ، شاعر بزرگ پارسی.',
    category: 'شعر',
  },
  {
    id: 32,
    title: 'مثنوی معنوی',
    author: 'مولانا جلال‌الدین رومی',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    format: 'both',
    description: 'شاهکار عرفانی مولانا با داستان‌ها و اشعار عمیق.',
    category: 'شعر',
  },
  {
    id: 33,
    title: 'پیامبر و دیوانه',
    author: 'جبران خلیل جبران',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    format: 'ebook',
    description: 'مجموعه‌ای از حکمت‌های عرفانی و فلسفی به زبانی شاعرانه.',
    category: 'شعر',
  },
  {
    id: 34,
    title: 'بیست و یک غزل',
    author: 'سعدی شیرازی',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    format: 'print',
    description: 'مجموعه‌ای از غزل‌های عاشقانه‌ی سعدی، شاعر پارسی‌گو.',
    category: 'شعر',
  },
  {
    id: 35,
    title: 'شعرهای فروغ فرخزاد',
    author: 'فروغ فرخزاد',
    price: 80000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
    format: 'both',
    description: 'مجموعه اشعار معاصر فروغ فرخزاد با مضامین عاشقانه و اجتماعی.',
    category: 'شعر',
  },
  {
    id: 36,
    title: 'سیاه مشق',
    author: 'هوشنگ ابتهاج (سایه)',
    price: 90000,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    format: 'both',
    description: 'مجموعه اشعار عاشقانه و اجتماعی هوشنگ ابتهاج.',
    category: 'شعر',
  },
];

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'default' | 'count-asc' | 'count-desc' | 'title-asc' | 'title-desc'>('default');

  // محاسبه تعداد کتاب‌ها در هر دسته‌بندی
  const categoriesWithCount = [
    {
      id: 1,
      title: 'ادبیات داستانی',
      icon: BookOpen,
      description: 'رمان‌ها، داستان‌های کوتاه و ادبیات کلاسیک',
      subcategories: ['رمان خارجی', 'رمان ایرانی', 'داستان کوتاه', 'ادبیات کلاسیک'],
    },
    {
      id: 2,
      title: 'علوم انسانی',
      icon: Users,
      description: 'روانشناسی، جامعه‌شناسی و علوم اجتماعی',
      subcategories: ['روانشناسی', 'جامعه‌شناسی', 'فلسفه', 'تاریخ'],
    },
    {
      id: 3,
      title: 'توسعه فردی',
      icon: Brain,
      description: 'موفقیت، مدیریت زمان و خودشناسی',
      subcategories: ['موفقیت', 'مدیریت زمان', 'خودشناسی', 'ارتباطات'],
    },
    {
      id: 4,
      title: 'هنر',
      icon: Palette,
      description: 'نقاشی، موسیقی، سینما و عکاسی',
      subcategories: ['نقاشی', 'موسیقی', 'سینما', 'عکاسی'],
    },
    {
      id: 5,
      title: 'تاریخ',
      icon: History,
      description: 'تاریخ ایران و جهان، باستان‌شناسی',
      subcategories: ['تاریخ ایران', 'تاریخ جهان', 'باستان‌شناسی', 'تاریخ معاصر'],
    },
    {
      id: 6,
      title: 'کودک و نوجوان',
      icon: Baby,
      description: 'داستان‌های کودکان و نوجوانان',
      subcategories: ['داستان کودک', 'داستان نوجوان', 'شعر کودک', 'آموزشی'],
    },
    {
      id: 7,
      title: 'آموزشی',
      icon: GraduationCap,
      description: 'کتاب‌های درسی و کمک آموزشی',
      subcategories: ['کتب درسی', 'کنکور', 'زبان خارجی', 'برنامه‌نویسی'],
    },
    {
      id: 8,
      title: 'رمانتیک',
      icon: Heart,
      description: 'داستان‌های عاشقانه و رمانتیک',
      subcategories: ['رمان عاشقانه', 'شعر عاشقانه', 'داستان کوتاه', 'ادبیات کلاسیک'],
    },
    {
      id: 9,
      title: 'سفر و ماجراجویی',
      icon: Compass,
      description: 'سفرنامه‌ها و داستان‌های ماجراجویی',
      subcategories: ['سفرنامه', 'راهنمای سفر', 'ماجراجویی', 'طبیعت‌گردی'],
    },
    {
      id: 10,
      title: 'هنرهای نمایشی',
      icon: Music,
      description: 'تئاتر، سینما و موسیقی',
      subcategories: ['تئاتر', 'سینما', 'موسیقی', 'نمایشنامه'],
    },
    {
      id: 11,
      title: 'سبک زندگی',
      icon: Coffee,
      description: 'آشپزی، دکوراسیون و سلامتی',
      subcategories: ['آشپزی', 'دکوراسیون', 'سلامتی', 'ورزش'],
    },
    {
      id: 12,
      title: 'علم و دانش',
      icon: Lightbulb,
      description: 'فیزیک، شیمی و زیست‌شناسی',
      subcategories: ['فیزیک', 'شیمی', 'زیست‌شناسی', 'نجوم'],
    },
    {
      id: 13,
      title: 'علمی-تخیلی',
      icon: Lightbulb,
      description: 'داستان‌های علمی-تخیلی و آینده‌نگرانه',
      subcategories: ['علمی-تخیلی', 'فانتزی', 'پادآرمان‌شهر', 'فضایی'],
    },
    {
      id: 14,
      title: 'روانشناسی',
      icon: Brain,
      description: 'کتاب‌های روانشناسی و خودشناسی',
      subcategories: ['روانشناسی بالینی', 'خودشناسی', 'هوش هیجانی', 'رفتارشناسی'],
    },
    {
      id: 15,
      title: 'شعر',
      icon: Heart,
      description: 'مجموعه‌های شعر کلاسیک و معاصر',
      subcategories: ['شعر کلاسیک', 'شعر معاصر', 'غزل', 'شعر عاشقانه'],
    },
  ].map((category) => ({
    ...category,
    count: booksData.filter((book) => book.category === category.title).length,
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
              />
            </div>
            <div className="relative">
              <Filter className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" />
              <select
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
              const Icon = category.icon;
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