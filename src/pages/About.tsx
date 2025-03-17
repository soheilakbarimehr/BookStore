import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Book, Users, Clock, Truck, Award, Mail, Phone, MapPin } from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: Book,
      value: '۱۰،۰۰۰+',
      label: 'عنوان کتاب',
    },
    {
      icon: Users,
      value: '۵۰،۰۰۰+',
      label: 'کاربر فعال',
    },
    {
      icon: Clock,
      value: '۲۴/۷',
      label: 'پشتیبانی',
    },
    {
      icon: Award,
      value: '۹۸٪',
      label: 'رضایت مشتری',
    },
  ];

  const team = [
    {
      name: 'علی محمدی',
      role: 'مدیر عامل',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      bio: 'بیش از ۱۵ سال تجربه در صنعت نشر و کتاب'
    },
    {
      name: 'مریم حسینی',
      role: 'مدیر محتوا',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
      bio: 'کارشناس ارشد ادبیات و ویراستار با ۱۰ سال سابقه'
    },
    {
      name: 'رضا کریمی',
      role: 'مدیر فنی',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      bio: 'متخصص فناوری اطلاعات و توسعه نرم‌افزار'
    },
    {
      name: 'سارا رضایی',
      role: 'مدیر فروش',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      bio: 'کارشناس بازاریابی و فروش با تجربه در صنعت نشر'
    },
  ];

  return (
    <>
      <Helmet>
        <title>درباره ما | کتاب‌خانه</title>
        <meta name="description" content="درباره کتاب‌خانه، بزرگترین فروشگاه آنلاین کتاب در ایران" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            داستان ما
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto"
          >
            از سال ۱۳۹۵ با هدف گسترش فرهنگ کتابخوانی و دسترسی آسان به کتاب‌های با کیفیت، فعالیت خود را آغاز کردیم.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">مأموریت ما</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                ما در کتاب‌خانه معتقدیم که دسترسی به کتاب و دانش حق همه است. هدف ما ایجاد پلتفرمی است که در آن همه بتوانند به راحتی به کتاب‌های مورد علاقه خود دسترسی داشته باشند.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full mr-3">
                    <Book className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </span>
                  ارائه بهترین کتاب‌ها با قیمت مناسب
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full mr-3">
                    <Truck className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </span>
                  ارسال سریع و مطمئن به سراسر کشور
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </span>
                  پشتیبانی ۲۴ ساعته از مشتریان
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative h-96"
            >
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800"
                alt="کتابخانه"
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">تیم ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">تماس با ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center"
            >
              <MapPin className="h-8 w-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">آدرس</h3>
              <p className="text-gray-600 dark:text-gray-300">تهران، خیابان ولیعصر، بالاتر از میدان ونک</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center"
            >
              <Phone className="h-8 w-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">تلفن</h3>
              <p className="text-gray-600 dark:text-gray-300">۰۲۱-۱۲۳۴۵۶۷۸</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center"
            >
              <Mail className="h-8 w-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">ایمیل</h3>
              <p className="text-gray-600 dark:text-gray-300">info@bookstore.ir</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;