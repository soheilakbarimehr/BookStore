import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // اعتبار پیش‌فرض برای ادمین
  const ADMIN_EMAIL = 'admin@gmail.com';
  const ADMIN_PASSWORD = 'admin123';

  // مدیریت نمایش نوتیفیکیشن
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000); // نوتیفیکیشن بعد از 3 ثانیه محو می‌شود
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // تابع اعتبارسنجی ایمیل
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // اعتبارسنجی دستی
    if (!isLogin && !name.trim()) {
      setNotification({ message: 'لطفاً نام و نام خانوادگی خود را وارد کنید.', type: 'error' });
      return;
    }

    if (!email.trim()) {
      setNotification({ message: 'لطفاً ایمیل خود را وارد کنید.', type: 'error' });
      return;
    }

    if (!validateEmail(email)) {
      setNotification({ message: 'لطفاً یک ایمیل معتبر وارد کنید.', type: 'error' });
      return;
    }

    if (!password.trim()) {
      setNotification({ message: 'لطفاً رمز عبور خود را وارد کنید.', type: 'error' });
      return;
    }

    if (password.length < 6) {
      setNotification({ message: 'رمز عبور باید حداقل ۶ کاراکتر باشد.', type: 'error' });
      return;
    }

    // منطق ثبت‌نام
    if (!isLogin) {
      console.log('ثبت‌نام موفق با نام:', name, 'و ایمیل:', email);
      onClose(); // بستن مودال
      setNotification({ message: 'حساب کاربری با موفقیت ایجاد شد!', type: 'success' });
      return;
    }

    // منطق ورود
    if (isLogin) {
      // بررسی ورود به عنوان ادمین
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        console.log('ورود ادمین موفق:', { email, password });
        onClose(); // بستن مودال
        setNotification({ message: 'ورود با موفقیت انجام شد!', type: 'success' });
        navigate('/admin'); // هدایت به صفحه ادمین
        return;
      }

      // اگر ادمین نبود، فرض می‌کنیم کاربر معمولی است
      // در اینجا می‌توانید منطق واقعی ورود کاربر معمولی را اضافه کنید (مثلاً بررسی با API)
      const from = location.state?.from?.pathname || '/'; // صفحه قبلی یا صفحه اصلی
      console.log('ورود موفق کاربر معمولی، بازگشت به:', from);
      onClose(); // بستن مودال
      setNotification({ message: 'ورود با موفقیت انجام شد!', type: 'success' });
      navigate(from); // بازگشت به صفحه قبلی یا صفحه اصلی
      return;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md p-8 bg-white rounded-lg dark:bg-gray-800"
            >
              <button
                onClick={onClose}
                className="absolute text-gray-500 left-4 top-4 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
                {isLogin ? 'ورود به حساب کاربری' : 'ثبت‌نام در کتاب‌خانه'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      نام و نام خانوادگی
                    </label>
                    <div className="relative">
                      <User className="absolute w-5 h-5 text-gray-400 right-3 top-3" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 pr-10 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="نام خود را وارد کنید"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    ایمیل
                  </label>
                  <div className="relative">
                    <Mail className="absolute w-5 h-5 text-gray-400 right-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 pr-10 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="ایمیل خود را وارد کنید"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    رمز عبور
                  </label>
                  <div className="relative">
                    <Lock className="absolute w-5 h-5 text-gray-400 right-3 top-3" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 pr-10 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="رمز عبور خود را وارد کنید"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
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

      {/* نوتیفیکیشن در پایین سمت راست */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 ${
              notification.type === 'success' ? 'bg-white text-gray-900' : 'bg-red-100 text-red-700'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-500" />
            )}
            <span className="text-lg font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthModal;