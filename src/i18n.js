import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    fa: {
      translation: {
        home: 'خانه',
        books: 'کتاب‌ها',
        categories: 'دسته‌بندی‌ها',
        about: 'درباره ما',
        cart: 'سبد خرید',
        login: 'ورود / ثبت‌نام',
        startShopping: 'شروع به خرید',
        featuredBooks: 'کتاب‌های ویژه',
        latestBooks: 'کتاب‌های جدید',
        features: 'ویژگی‌ها',
      },
    },
    en: {
      translation: {
        home: 'Home',
        books: 'Books',
        categories: 'Categories',
        about: 'About Us',
        cart: 'Cart',
        login: 'Login / Sign Up',
        startShopping: 'Start Shopping',
        featuredBooks: 'Featured Books',
        latestBooks: 'Latest Books',
        features: 'Features',
      },
    },
  },
  lng: 'fa', // زبان پیش‌فرض
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;