// src/pages/Home.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSlider from '../components/HeroSlider';
import FeaturedBooks from '../components/FeaturedBooks';
import Features from '../components/Features';
import { useHomeContent } from '../context/HomeContentContext';

interface Book {
  id: number;
  title: { fa: string; en: string };
  author: { fa: string; en: string };
  price: number;
  image: string;
  rating?: number;
  format: string;
  description: { fa: string; en: string };
  category: string;
}

interface HomeProps {
  books: Book[];
}

interface Slide {
  id: number;
  title: { fa: string; en: string };
  description: { fa: string; en: string };
  image: string;
  buttonLink: string;
}

interface Feature {
  title: { fa: string; en: string };
  description: { fa: string; en: string };
  icon: 'Truck' | 'CreditCard' | 'Headphones';
}

interface Section {
  id: number;
  title: { fa: string; en: string };
  type: 'featured-books' | 'latest-books' | 'features' | 'custom';
  content: string[] | Feature[] | string;
  visible: boolean;
}

const mockBooks: Book[] = [
  { id: 1, title: { fa: 'کتاب ویژه 1', en: 'Featured Book 1' }, author: { fa: 'نویسنده 1', en: 'Author 1' }, price: 50000, image: 'book1.jpg', rating: 4.5, format: 'چاپی', description: { fa: 'توضیحات', en: 'Description' }, category: 'رمان' },
  { id: 2, title: { fa: 'کتاب ویژه 2', en: 'Featured Book 2' }, author: { fa: 'نویسنده 2', en: 'Author 2' }, price: 60000, image: 'book2.jpg', rating: 4.0, format: 'چاپی', description: { fa: 'توضیحات', en: 'Description' }, category: 'علمی' },
  { id: 3, title: { fa: 'کتاب ویژه 3', en: 'Featured Book 3' }, author: { fa: 'نویسنده 3', en: 'Author 3' }, price: 70000, image: 'book3.jpg', rating: 4.8, format: 'چاپی', description: { fa: 'توضیحات', en: 'Description' }, category: 'تاریخی' },
  { id: 4, title: { fa: 'کتاب ویژه 4', en: 'Featured Book 4' }, author: { fa: 'نویسنده 4', en: 'Author 4' }, price: 80000, image: 'book4.jpg', rating: 4.2, format: 'چاپی', description: { fa: 'توضیحات', en: 'Description' }, category: 'کودکان' },
  { id: 5, title: { fa: 'کتاب ویژه 5', en: 'Featured Book 5' }, author: { fa: 'نویسنده 5', en: 'Author 5' }, price: 90000, image: 'book5.jpg', rating: 4.7, format: 'چاپی', description: { fa: 'توضیحات', en: 'Description' }, category: 'شعر' },
  { id: 6, title: { fa: 'کتاب جدید 1', en: 'Latest Book 1' }, author: { fa: 'نویسنده 6', en: 'Author 6' }, price: 55000, image: 'book6.jpg', rating: 4.3, format: 'چاپی', description: { fa: 'توضیحات', en: 'Description' }, category: 'رمان' },
  { id: 7, title: { fa: 'کتاب جدید 2', en: 'Latest Book 2' }, author: { fa: 'نویسنده 7', en: 'Author 7' }, price: 65000, image: 'book7.jpg', rating: 4.1, format: 'چاپی', description: { fa: 'توضیحات', en: 'Description' }, category: 'علمی' },
  { id: 8, title: { fa: 'کتاب جدید 3', en: 'Latest Book 3' }, author: { fa: 'نویسنده 8', en: 'Author 8' }, price: 75000, image: 'book8.jpg', rating: 4.9, format: 'چاپی', description: { fa: 'توضیحات', en: 'Description' }, category: 'تاریخی' },
  { id: 9, title: { fa: 'کتاب جدید 4', en: 'Latest Book 4' }, author: { fa: 'نویسنده 9', en: 'Author 9' }, price: 85000, image: 'book9.jpg', rating: 4.4, format: 'چاپی', description: { fa: 'توضیحات', en: 'Description' }, category: 'کودکان' },
  { id: 10, title: { fa: 'کتاب جدید 5', en: 'Latest Book 5' }, author: { fa: 'نویسنده 10', en: 'Author 10' }, price: 95000, image: 'book10.jpg', rating: 4.6, format: 'چاپی', description: { fa: 'توضیحات', en: 'Description' }, category: 'شعر' },
];

const Home: React.FC<HomeProps> = () => {
  const { homeContent } = useHomeContent();
  const lang = 'fa';

  return (
    <>
      <Helmet>
        <title>{lang === 'fa' ? 'کتاب‌خانه | فروشگاه آنلاین کتاب' : 'Bookstore | Online Book Shop'}</title>
        <meta
          name="description"
          content={
            lang === 'fa'
              ? 'خرید آنلاین کتاب‌های الکترونیکی و چاپی با بهترین قیمت و ارسال سریع'
              : 'Buy e-books and printed books online with the best prices and fast delivery'
          }
        />
      </Helmet>

      {homeContent.slider.length > 0 && <HeroSlider slides={homeContent.slider} lang={lang} />}

      <div className="py-16">
        {homeContent.sections
          .filter((section: Section) => section.visible)
          .map((section: Section) => (
            <section
              key={section.id}
              className={`py-16 ${section.type === 'features' ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}`}
            >
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
                  {lang === 'fa' ? section.title.fa : section.title.en}
                </h2>

                {(section.type === 'featured-books' || section.type === 'latest-books') && Array.isArray(section.content) && (
                  <FeaturedBooks books={mockBooks} bookIds={section.content as string[]} lang={lang} />
                )}
                {section.type === 'features' && Array.isArray(section.content) && (
                  <Features features={section.content as Feature[]} lang={lang} />
                )}
              </div>
            </section>
          ))}
      </div>

      
    </>
  );
};

export default Home;