import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'; // اضافه کردن useLocation

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // برای پیام موفقیت
  const navigate = useNavigate();
  const location = useLocation();

  // اعتبار پیش‌فرض برای ادمین
  const ADMIN_EMAIL = 'admin@gmail.com';
  const ADMIN_PASSWORD = 'admin123';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // اعتبارسنجی برای ورود به‌عنوان ادمین
    if (isLogin && email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      console.log('ورود ادمین موفق:', { email, password });
      onClose(); // بستن مودال
      navigate('/admin'); // هدایت به صفحه ادمین
      return;
    }

    // منطق ثبت‌نام (فقط برای تست)
    if (!isLogin) {
      console.log('ثبت‌نام موفق با نام:', name, 'و ایمیل:', email);
      setSuccessMessage('حساب کاربری با موفقیت ایجاد شد!');
      setTimeout(() => {
        setSuccessMessage(null);
        onClose(); // بستن مودال بعد از نمایش پیام
      }, 2000); // نمایش پیام برای 2 ثانیه
      return;
    }

    // منطق ورود معمولی (بازگشت به صفحه قبلی)
    const from = location.state?.from?.pathname || '/'; // صفحه قبلی یا صفحه اصلی
    console.log('ورود موفق، بازگشت به:', from);
    onClose(); // بستن مودال
    navigate(from); // بازگشت به صفحه قبلی
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative p-8 w-full max-w-md bg-white rounded-lg dark:bg-gray-800"
          >
            <button aria-label='Close modal'
              onClick={onClose}
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
              {isLogin ? 'ورود به حساب کاربری' : 'ثبت‌نام در کتاب‌خانه'}
            </h2>

            {/* نمایش پیام موفقیت */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="px-4 py-2 mb-4 text-center text-green-700 bg-green-100 rounded-md border border-green-400"
              >
                {successMessage}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    نام و نام خانوادگی
                  </label>
                  <div className="relative">
                    <User className="absolute top-3 right-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-4 py-2 pr-10 w-full text-gray-900 bg-white rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="نام خود را وارد کنید"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  ایمیل
                </label>
                <div className="relative">
                  <Mail className="absolute top-3 right-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2 pr-10 w-full text-gray-900 bg-white rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="ایمیل خود را وارد کنید"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  رمز عبور
                </label>
                <div className="relative">
                  <Lock className="absolute top-3 right-3 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-4 py-2 pr-10 w-full text-gray-900 bg-white rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="رمز عبور خود را وارد کنید"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 w-full text-white rounded-md transition-colors bg-primary-600 hover:bg-primary-700"
              >
                {isLogin ? 'ورود' : 'ثبت‌نام'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                {isLogin ? 'ثبت‌نام در کتاب‌خانه' : 'ورود به حساب کاربری'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;