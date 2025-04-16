import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from '../types';

interface BooksContentContextType {
  books: Book[];
  updateBooks: (newBooks: Book[]) => void;
  categories: string[];
  updateCategories: (newCategories: string[]) => void;
  featuredBookIds: number[];
  updateFeaturedBookIds: (newFeaturedBookIds: number[]) => void;
  defaultSort: string;
  updateDefaultSort: (newSort: string) => void;
  defaultBooksPerPage: number;
  updateDefaultBooksPerPage: (newBooksPerPage: number) => void;
}

const BooksContentContext = createContext<BooksContentContextType | undefined>(undefined);

const initialBooks: Book[] = [
        {
          id: 1,
          title: 'سووشون',
          author: 'سیمین دانشور',
          price: 85000,
          image: 'https://images.pexels.com/photos/3309963/pexels-photo-3309963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.7,
          format: 'both',
          description: 'رمانی ماندگار از ادبیات معاصر ایران که روایتگر داستانی عاشقانه در بستر تاریخ است.',
          category: 'ادبیات داستانی',
          quantity: 1, 
        },
        {
          id: 2,
          title: 'چشم‌هایش',
          author: 'بزرگ علوی',
          price: 92000,
          image: 'https://images.pexels.com/photos/30146747/pexels-photo-30146747/free-photo-of-artistic-still-life-with-textured-abstract-card.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.5,
          format: 'print',
          description: 'داستان عشق و هنر در دوران پرتلاطم تاریخ معاصر ایران.',
          category: 'ادبیات داستانی',
          quantity: 1,
        },
        {
          id: 3,
          title: 'کلیدر',
          author: 'محمود دولت‌آبادی',
          price: 180000,
          image: 'https://images.pexels.com/photos/13720375/pexels-photo-13720375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.9,
          format: 'both',
          description: 'حماسه‌ای بزرگ از زندگی مردم خراسان که در ده جلد به رشته تحریر درآمده است.',
          category: 'ادبیات داستانی',
          quantity: 1,
        },
        {
          id: 4,
          title: 'نیمه تاریک ماه',
          author: 'هوشنگ گلشیری',
          price: 75000,
          image: 'https://images.pexels.com/photos/30146747/pexels-photo-30146747/free-photo-of-artistic-still-life-with-textured-abstract-card.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.3,
          format: 'ebook',
          description: 'مجموعه داستان‌های کوتاه با نگاهی عمیق به جامعه معاصر.',
          category: 'ادبیات داستانی',
          quantity: 1,
        },
        {
          id: 5,
          title: 'سمفونی مردگان',
          author: 'عباس معروفی',
          price: 98000,
          image: 'https://images.pexels.com/photos/3309963/pexels-photo-3309963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.6,
          format: 'both',
          description: 'روایتی چند صدایی از فروپاشی یک خانواده در بستر تاریخ معاصر.',
          category: 'ادبیات داستانی',
          quantity: 1,
        },
        {
          id: 6,
          title: 'بامداد خمار',
          author: 'فتانه حاج سید جوادی',
          price: 88000,
          image: 'https://images.pexels.com/photos/30146747/pexels-photo-30146747/free-photo-of-artistic-still-life-with-textured-abstract-card.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.4,
          format: 'print',
          description: 'داستانی عاشقانه در تهران قدیم که روایتگر زندگی زنان در دوره قاجار است.',
          category: 'ادبیات داستانی',
          quantity: 1,
        },
        {
          id: 7,
          title: 'بنیاد',
          author: 'آیزاک آسیموف',
          price: 120000,
          image: 'https://images.pexels.com/photos/13720375/pexels-photo-13720375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.8,
          format: 'both',
          description: 'رمانی کلاسیک در ژانر علمی-تخیلی که آینده‌ی بشریت را در کهکشان‌ها روایت می‌کند.',
          category: 'علمی-تخیلی',
          quantity: 1,
        },
        {
          id: 8,
          title: 'تل‌ماسه',
          author: 'فرانک هربرت',
          price: 150000,
          image: 'https://images.pexels.com/photos/3309963/pexels-photo-3309963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.9,
          format: 'both',
          description: 'داستانی حماسی در سیاره‌ای بیابانی که سیاست، مذهب و قدرت را در هم می‌آمیزد.',
          category: 'علمی-تخیلی',
          quantity: 1,
        },
        {
          id: 9,
          title: 'جنگجوی ستاره‌ای',
          author: 'رابرت هاین‌لاین',
          price: 95000,
          image: 'https://images.pexels.com/photos/30146747/pexels-photo-30146747/free-photo-of-artistic-still-life-with-textured-abstract-card.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.5,
          format: 'ebook',
          description: 'داستانی درباره‌ی جنگ‌های فضایی و نقش انسان در آینده‌ی تکنولوژی.',
          category: 'علمی-تخیلی',
          quantity: 1,
        },
        {
          id: 10,
          title: '1984',
          author: 'جورج اورول',
          price: 85000,
          image: 'https://images.pexels.com/photos/13720375/pexels-photo-13720375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.7,
          format: 'both',
          description: 'رمانی پادآرمان‌شهری که آینده‌ای تحت سلطه‌ی دیکتاتوری را به تصویر می‌کشد.',
          category: 'علمی-تخیلی',
          quantity: 1,
        },
        {
          id: 11,
          title: 'جهان‌های موازی',
          author: 'فیلیپ ک. دیک',
          price: 110000,
          image: 'https://images.pexels.com/photos/3309963/pexels-photo-3309963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.6,
          format: 'print',
          description: 'داستانی درباره‌ی واقعیت‌های موازی و تأثیر آن‌ها بر زندگی انسان‌ها.',
          category: 'علمی-تخیلی',
          quantity: 1,
        },
        {
          id: 12,
          title: 'مریخی',
          author: 'اندی ویر',
          price: 130000,
          image: 'https://images.pexels.com/photos/30146747/pexels-photo-30146747/free-photo-of-artistic-still-life-with-textured-abstract-card.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.8,
          format: 'both',
          description: 'داستانی درباره‌ی تلاش یک فضانورد برای بقا در سیاره‌ی مریخ.',
          category: 'علمی-تخیلی',
          quantity: 1,
        },
        {
          id: 13,
          title: 'طوبی و معنای شب',
          author: 'شهرنوش پارسی‌پور',
          price: 95000,
          image: 'https://images.pexels.com/photos/3309963/pexels-photo-3309963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.7,
          format: 'both',
          description: 'رمانی با عناصر رئالیسم جادویی که به زندگی زنی در گذر تاریخ می‌پردازد.',
          category: 'تاریخی',
          quantity: 1,
        },
        {
          id: 14,
          title: 'شازده احتجاب',
          author: 'هوشنگ گلشیری',
          price: 72000,
          image: 'https://images.pexels.com/photos/30146747/pexels-photo-30146747/free-photo-of-artistic-still-life-with-textured-abstract-card.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.5,
          format: 'print',
          description: 'روایتی از فروپاشی یک خانواده اشرافی در دوره قاجار.',
          category: 'تاریخی',
          quantity: 1,
        },
        {
          id: 15,
          title: 'جزیره سرگردانی',
          author: 'سیمین دانشور',
          price: 110000,
          image: 'https://images.pexels.com/photos/3309963/pexels-photo-3309963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.6,
          format: 'both',
          description: 'داستانی عاشقانه و سیاسی در بستر انقلاب ایران.',
          category: 'تاریخی',
          quantity: 1,
        },
        {
          id: 16,
          title: 'دایی جان ناپلئون',
          author: 'ایرج پزشکزاد',
          price: 99000,
          image: 'https://images.pexels.com/photos/13720375/pexels-photo-13720375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.8,
          format: 'print',
          description: 'رمانی طنزآمیز درباره خانواده‌ای در تهران قدیم.',
          category: 'تاریخی',
          quantity: 1,
        },
        {
          id: 17,
          title: 'همسایه‌ها',
          author: 'احمد محمود',
          price: 87000,
          image: 'https://images.pexels.com/photos/30146747/pexels-photo-30146747/free-photo-of-artistic-still-life-with-textured-abstract-card.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.7,
          format: 'both',
          description: 'داستانی از زندگی مردم جنوب ایران در دوران جنگ.',
          category: 'تاریخی',
          quantity: 1,
        },
        {
          id: 18,
          title: 'بینوایان',
          author: 'ویکتور هوگو',
          price: 200000,
          image: 'https://images.pexels.com/photos/3309963/pexels-photo-3309963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.9,
          format: 'both',
          description: 'رمانی کلاسیک درباره‌ی فقر و عدالت در فرانسه قرن نوزدهم.',
          category: 'تاریخی',
          quantity: 1,
        },
        {
          id: 19,
          title: 'قدرت عادت',
          author: 'چارلز داهیگ',
          price: 90000,
          image: 'https://images.pexels.com/photos/13720375/pexels-photo-13720375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.6,
          format: 'both',
          description: 'کتابی درباره‌ی چگونگی شکل‌گیری عادت‌ها و تأثیر آن‌ها بر زندگی.',
          category: 'روانشناسی',
          quantity: 1,
        },
        {
          id: 20,
          title: 'تفکر سریع و کند',
          author: 'دانیل کانمن',
          price: 140000,
          image: 'https://images.pexels.com/photos/30146747/pexels-photo-30146747/free-photo-of-artistic-still-life-with-textured-abstract-card.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.8,
          format: 'both',
          description: 'تحلیلی عمیق از نحوه‌ی تصمیم‌گیری انسان‌ها و نقش ذهن در آن.',
          category: 'روانشناسی',
          quantity: 1,
        },
        {
          id: 21,
          title: 'هنر شفاف اندیشیدن',
          author: 'رولف دوبلی',
          price: 85000,
          image: 'https://images.pexels.com/photos/3309963/pexels-photo-3309963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.5,
          format: 'ebook',
          description: 'کتابی درباره‌ی خطاهای شناختی و چگونگی اجتناب از آن‌ها.',
          category: 'روانشناسی',
          quantity: 1,
        },
        {
          id: 22,
          title: 'نیروی حال',
          author: 'اکهارت تول',
          price: 95000,
          image: 'https://images.pexels.com/photos/13720375/pexels-photo-13720375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.7,
          format: 'both',
          description: 'راهنمایی برای زندگی در لحظه و رهایی از افکار منفی.',
          category: 'روانشناسی',
          quantity: 1,
        },
        {
          id: 23,
          title: 'ذهن آگاهی',
          author: 'جان کابات زین',
          price: 88000,
          image: 'https://images.pexels.com/photos/30146747/pexels-photo-30146747/free-photo-of-artistic-still-life-with-textured-abstract-card.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.6,
          format: 'print',
          description: 'معرفی تکنیک‌های ذهن‌آگاهی برای کاهش استرس و بهبود زندگی.',
          category: 'روانشناسی',
          quantity: 1,
        },
        {
          id: 24,
          title: 'هوش هیجانی',
          author: 'دانیل گولمن',
          price: 110000,
          image: 'https://images.pexels.com/photos/3309963/pexels-photo-3309963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.7,
          format: 'both',
          description: 'کتابی درباره‌ی اهمیت هوش هیجانی در موفقیت و روابط.',
          category: 'روانشناسی',
          quantity: 1,
        },
        {
          id: 25,
          title: 'شازده کوچولو',
          author: 'آنتوان دو سنت‌اگزوپری',
          price: 65000,
          image: 'https://images.pexels.com/photos/13720375/pexels-photo-13720375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.9,
          format: 'both',
          description: 'داستانی کلاسیک و تخیلی برای کودکان و بزرگسالان درباره‌ی دوستی و عشق.',
          category: 'کودکان',
          quantity: 1,
        },
        {
          id: 26,
          title: 'ماتیلدا',
          author: 'رولد دال',
          price: 70000,
          image: 'https://images.pexels.com/photos/30146747/pexels-photo-30146747/free-photo-of-artistic-still-life-with-textured-abstract-card.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.8,
          format: 'print',
          description: 'داستان دختری باهوش که با قدرت‌های جادویی‌اش زندگی را تغییر می‌دهد.',
          category: 'کودکان',
          quantity: 1,
        },
        {
          id: 27,
          title: 'هری پاتر و سنگ جادو',
          author: 'جی. کی. رولینگ',
          price: 120000,
          image: 'https://images.pexels.com/photos/3309963/pexels-photo-3309963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.9,
          format: 'both',
          description: 'اولین جلد از سری هری پاتر، ماجراهای یک جادوگر جوان.',
          category: 'کودکان',
          quantity: 1,
        },
        {
          id: 28,
          title: 'چارلی و کارخانه شکلات‌سازی',
          author: 'رولد دال',
          price: 68000,
          image: 'https://images.pexels.com/photos/13720375/pexels-photo-13720375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.7,
          format: 'print',
          description: 'داستانی شیرین درباره‌ی ماجراهای یک پسر در کارخانه‌ی شکلات.',
          category: 'کودکان',
          quantity: 1,
        },
        {
          id: 29,
          title: 'داستان‌های خوب برای بچه‌های خوب',
          author: 'مهدی آذر یزدی',
          price: 55000,
          image: 'https://images.pexels.com/photos/30146747/pexels-photo-30146747/free-photo-of-artistic-still-life-with-textured-abstract-card.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.6,
          format: 'both',
          description: 'مجموعه داستان‌های ایرانی برای کودکان با مضامین اخلاقی.',
          category: 'کودکان',
          quantity: 1,
        },
        {
          id: 30,
          title: 'گربه‌ای که کتاب‌ها را دوست داشت',
          author: 'سوسن طاقدیس',
          price: 45000,
          image: 'https://images.pexels.com/photos/3309963/pexels-photo-3309963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.5,
          format: 'print',
          description: 'داستانی جذاب برای کودکان درباره‌ی عشق به کتاب.',
          category: 'کودکان',
          quantity: 1,
        },
        {
          id: 31,
          title: 'دیوان حافظ',
          author: 'حافظ شیرازی',
          price: 95000,
          image: 'https://images.pexels.com/photos/13720375/pexels-photo-13720375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.9,
          format: 'both',
          description: 'مجموعه اشعار عاشقانه و عرفانی حافظ، شاعر بزرگ پارسی.',
          category: 'شعر',
          quantity: 1,
        },
        {
          id: 32,
          title: 'مثنوی معنوی',
          author: 'مولانا جلال‌الدین رومی',
          price: 150000,
          image: 'https://images.pexels.com/photos/30146747/pexels-photo-30146747/free-photo-of-artistic-still-life-with-textured-abstract-card.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.8,
          format: 'both',
          description: 'شاهکار عرفانی مولانا با داستان‌ها و اشعار عمیق.',
          category: 'شعر',
          quantity: 1,
        },
        {
          id: 33,
          title: 'پیامبر و دیوانه',
          author: 'جبران خلیل جبران',
          price: 65000,
          image: 'https://images.pexels.com/photos/13720375/pexels-photo-13720375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.8,
          format: 'ebook',
          description: 'مجموعه‌ای از حکمت‌های عرفانی و فلسفی به زبانی شاعرانه.',
          category: 'شعر',
          quantity: 1,
        },
        {
          id: 34,
          title: 'بیست و یک غزل',
          author: 'سعدی شیرازی',
          price: 70000,
          image: 'https://images.pexels.com/photos/3309963/pexels-photo-3309963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.7,
          format: 'print',
          description: 'مجموعه‌ای از غزل‌های عاشقانه‌ی سعدی، شاعر پارسی‌گو.',
          category: 'شعر',
          quantity: 1,
        },
        {
          id: 35,
          title: 'شعرهای فروغ فرخزاد',
          author: 'فروغ فرخزاد',
          price: 80000,
          image: 'https://images.pexels.com/photos/30146747/pexels-photo-30146747/free-photo-of-artistic-still-life-with-textured-abstract-card.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.6,
          format: 'both',
          description: 'مجموعه اشعار معاصر فروغ فرخزاد با مضامین عاشقانه و اجتماعی.',
          category: 'شعر',
          quantity: 1,
        },
        {
          id: 36,
          title: 'سیاه مشق',
          author: 'هوشنگ ابتهاج (سایه)',
          price: 90000,
          image: 'https://images.pexels.com/photos/13720375/pexels-photo-13720375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          rating: 4.7,
          format: 'both',
          description: 'مجموعه اشعار عاشقانه و اجتماعی هوشنگ ابتهاج.',
          category: 'شعر',
          quantity: 1,
        },
      ];
      const initialCategories = Array.from(new Set(initialBooks.map((book) => book.category)));

      // تنظیمات اولیه
      const initialFeaturedBookIds = [1, 3, 5]; // ID کتاب‌های ویژه
      const initialDefaultSort = 'newest';
      const initialDefaultBooksPerPage = 8;
      
      export function BooksContentProvider({ children }: { children: ReactNode }) {
        const [books, setBooks] = useState<Book[]>(initialBooks);
        const [categories, setCategories] = useState<string[]>(initialCategories);
        const [featuredBookIds, setFeaturedBookIds] = useState<number[]>(initialFeaturedBookIds);
        const [defaultSort, setDefaultSort] = useState<string>(initialDefaultSort);
        const [defaultBooksPerPage, setDefaultBooksPerPage] = useState<number>(initialDefaultBooksPerPage);
      
        const updateBooks = (newBooks: Book[]) => {
          setBooks(newBooks);
          // به‌روزرسانی دسته‌بندی‌ها بر اساس کتاب‌های جدید
          const updatedCategories = Array.from(new Set(newBooks.map((book) => book.category)));
          setCategories(updatedCategories);
        };
      
        const updateCategories = (newCategories: string[]) => {
          setCategories(newCategories);
        };
      
        const updateFeaturedBookIds = (newFeaturedBookIds: number[]) => {
          setFeaturedBookIds(newFeaturedBookIds);
        };
      
        const updateDefaultSort = (newSort: string) => {
          setDefaultSort(newSort);
        };
      
        const updateDefaultBooksPerPage = (newBooksPerPage: number) => {
          setDefaultBooksPerPage(newBooksPerPage);
        };
      
        return (
          <BooksContentContext.Provider
            value={{
              books,
              updateBooks,
              categories,
              updateCategories,
              featuredBookIds,
              updateFeaturedBookIds,
              defaultSort,
              updateDefaultSort,
              defaultBooksPerPage,
              updateDefaultBooksPerPage,
            }}
          >
            {children}
          </BooksContentContext.Provider>
        );
      }
      
      export const useBooksContent = () => {
        const context = useContext(BooksContentContext);
        if (!context) {
          throw new Error('useBooksContent must be used within a BooksContentProvider');
        }
        return context;
      };