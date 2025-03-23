import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { HomeContentProvider } from './context/HomeContentContext'; 
import Layout from './components/Layout';
import Home from './pages/Home';
import Books from './pages/Books';
import Categories from './pages/Categories';
import About from './pages/About';
import NotFound from './pages/NotFound';
import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Warranty from './pages/Warranty';
import CategoryBooks from './pages/CategoryBooks';
import Cart from './pages/Cart';
import BookDetails from './pages/BookDetails';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminBooks from './pages/admin/Books';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';
import CategoriesSettings from './pages/admin/CategoriesSettings';
import BooksSettings from './pages/admin/BooksSettings';
import HomeSettings from './pages/admin/HomeSettings';
import AboutSettings from './pages/admin/AboutSettings';
import { Book } from './types';

// تعریف دیتای کتاب‌ها
const booksData: Book[] = [
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

function App() {
  return (
    <CartProvider>
      <HomeContentProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home books={booksData} />} />
            <Route path="books" element={<Books books={booksData} />} />
            <Route path="books/:id" element={<BookDetails books={booksData} />} />
            <Route path="categories" element={<Categories />} />
            <Route path="category/:category" element={<CategoryBooks books={booksData} />} />
            <Route path="about" element={<About />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path="returns" element={<Returns />} />
            <Route path="warranty" element={<Warranty />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="page-settings">
              <Route path="categories" element={<CategoriesSettings />} />
              <Route path="books" element={<BooksSettings />} />
              <Route path="home" element={<HomeSettings />} />
              <Route path="about" element={<AboutSettings />} />
            </Route>
          </Route>
        </Routes>
      </HomeContentProvider>
    </CartProvider>
  );
}

export default App;