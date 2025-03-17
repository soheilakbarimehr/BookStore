import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, ShoppingCart, Book, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './AuthModal';

const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <nav className="bg-white dark:bg-gray-900 shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 dark:text-gray-200">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Logo - Centered on mobile */}
            <div className="flex items-center justify-center md:justify-start flex-1 md:flex-none">
              <Link to="/" className="flex items-center">
                <Book className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                <span className="mr-2 text-xl font-bold text-gray-900 dark:text-white">کتاب‌خانه</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <Link to="/books" className="text-gray-700 dark:text-gray-200 hover:text-primary-600">کتاب‌ها</Link>
              <Link to="/categories" className="text-gray-700 dark:text-gray-200 hover:text-primary-600">دسته‌بندی‌ها</Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-primary-600">درباره ما</Link>
              <button onClick={() => setIsAuthModalOpen(true)} className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                ورود / ثبت‌نام
              </button>
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  0
                </span>
              </Link>
            </div>

            {/* Dark mode toggle - Right aligned on mobile */}
            <div className="flex items-center">
              <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-200">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-900"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/books" className="block px-3 py-2 text-gray-700 dark:text-gray-200">کتاب‌ها</Link>
                <Link to="/categories" className="block px-3 py-2 text-gray-700 dark:text-gray-200">دسته‌بندی‌ها</Link>
                <Link to="/about" className="block px-3 py-2 text-gray-700 dark:text-gray-200">درباره ما</Link>
                <Link to="/cart" className="block px-3 py-2 text-gray-700 dark:text-gray-200">سبد خرید</Link>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="block w-full text-right px-3 py-2 text-primary-600 dark:text-primary-400"
                >
                  ورود / ثبت‌نام
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Main Content */}
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-800">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Book className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                <span className="mr-2 text-xl font-bold text-gray-900 dark:text-white">کتاب‌خانه</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                کتاب‌خانه، مرجع خرید کتاب‌های الکترونیکی و چاپی با بیش از ۱۰۰۰۰ عنوان کتاب. ما متعهد به ارائه بهترین خدمات به کتاب‌دوستان عزیز هستیم.
              </p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a href="#" className="text-gray-400 hover:text-primary-600">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">خدمات مشتریان</h3>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">سوالات متداول</Link></li>
                <li><Link to="/shipping" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">راهنمای ارسال</Link></li>
                <li><Link to="/returns" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">شرایط بازگشت کالا</Link></li>
                <li><Link to="/warranty" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">گارانتی محصولات</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">تماس با ما</h3>
              <ul className="space-y-2">
                <li className="text-gray-600 dark:text-gray-300">تهران، خیابان ولیعصر</li>
                <li className="text-gray-600 dark:text-gray-300">تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</li>
                <li className="text-gray-600 dark:text-gray-300">ایمیل: info@bookstore.ir</li>
                <li className="text-gray-600 dark:text-gray-300">ساعات کاری: شنبه تا پنجشنبه ۹ الی ۱۸</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-400 dark:text-gray-500">
              © ۱۴۰۲ کتاب‌خانه. تمامی حقوق محفوظ است.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;