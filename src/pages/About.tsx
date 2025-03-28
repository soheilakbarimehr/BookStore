// src/pages/About.tsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Book, Users, Clock, Award, Mail, Phone, MapPin, Star, Instagram, Twitter, Send, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAboutContent } from '../context/AboutContentContext';

const About: React.FC = () => {
  const { content: settings } = useAboutContent(); // استفاده از Context به جای state داخلی

  const [counts, setCounts] = useState({
    books: 0,
    users: 0,
    satisfaction: 0,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prevCounts) => {
        const books = prevCounts.books < (settings.stats[0].value as number) ? prevCounts.books + 200 : (settings.stats[0].value as number);
        const users = prevCounts.users < (settings.stats[1].value as number) ? prevCounts.users + 1000 : (settings.stats[1].value as number);
        const satisfaction = prevCounts.satisfaction < (settings.stats[3].value as number) ? prevCounts.satisfaction + 2 : (settings.stats[3].value as number);
        return { books, users, satisfaction };
      });
    }, 50);
    return () => clearInterval(interval);
  }, [settings.stats]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire({
      title: 'پیام ارسال شد!',
      text: 'پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Book,
    Users,
    Clock,
    Award,
  };

  return (
    <>
      <Helmet>
        <title>درباره ما | کتاب‌خانه</title>
        <meta name="description" content="درباره کتاب‌خانه، بزرگترین فروشگاه آنلاین کتاب در ایران" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-700 to-primary-900">
        <div className="absolute inset-0 opacity-20">
          <img
            src={settings.hero.backgroundImage}
            alt="کتاب‌ها"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="relative px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-4xl font-bold text-white md:text-5xl"
          >
            {settings.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto mb-8 text-xl text-white/90"
          >
            {settings.hero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to={settings.hero.buttonLink}
              className="inline-block px-6 py-3 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
              title={`مشاهده ${settings.hero.buttonText}`}
            >
              {settings.hero.buttonText}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* بقیه بخش‌ها بدون تغییر باقی می‌مونه، فقط settings از Context میاد */}
      {/* Stats */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {settings.stats.map((stat, index) => {
              const Icon = iconMap[stat.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 text-center transition-shadow rounded-lg shadow-md bg-gray-50 dark:bg-gray-800 hover:shadow-lg"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary-600" />
                  <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.countKey ? counts[stat.countKey as keyof typeof counts] + (stat.suffix || '') : stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">{settings.mission.title}</h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">{settings.mission.description}</p>
              <ul className="space-y-4">
                {settings.mission.items.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="p-2 mr-3 rounded-full bg-primary-100 dark:bg-primary-900">
                      {index === 0 && <Book className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
                      {index === 1 && <Truck className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
                      {index === 2 && <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative h-96"
            >
              <img
                src={settings.mission.image}
                alt="کتاب‌ها و مطالعه"
                className="absolute inset-0 object-cover w-full h-full rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 dark:text-white">تیم ما</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {settings.team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="p-6 text-center transition-shadow rounded-lg shadow-md bg-gray-50 dark:bg-gray-800 hover:shadow-lg"
              >
                <img
                  src={member.image}
                  alt={`عکس ${member.name}، ${member.role} کتاب‌خانه`}
                  className="object-cover w-24 h-24 mx-auto mb-4 rounded-full"
                />
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="mb-3 text-primary-600 dark:text-primary-400">{member.role}</p>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.socials.instagram}
                    className="text-gray-500 hover:text-primary-600"
                    title={`اینستاگرام ${member.name}`}
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="sr-only">اینستاگرام {member.name}</span>
                  </a>
                  <a
                    href={member.socials.twitter}
                    className="text-gray-500 hover:text-primary-600"
                    title={`توییتر ${member.name}`}
                  >
                    <Twitter className="w-5 h-5" />
                    <span className="sr-only">توییتر {member.name}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 dark:text-white">نظرات مشتریان</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {settings.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 text-center bg-white rounded-lg shadow-md dark:bg-gray-900"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="mb-4 text-gray-600 dark:text-gray-300">{testimonial.comment}</p>
                <p className="font-semibold text-primary-600 dark:text-primary-400">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 dark:text-white">تماس با ما</h2>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center shadow-md min-h-[120px] flex flex-col justify-center"
              >
                <MapPin className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">آدرس</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{settings.contact.address}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center shadow-md min-h-[120px] flex flex-col justify-center"
              >
                <Phone className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">تلفن</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{settings.contact.phone}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center shadow-md min-h-[120px] flex flex-col justify-center"
              >
                <Mail className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">ایمیل</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{settings.contact.email}</p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-lg shadow-md bg-gray-50 dark:bg-gray-800"
            >
              <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">ارسال پیام</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-gray-600 dark:text-gray-300">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-gray-600 dark:text-gray-300">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-gray-600 dark:text-gray-300">
                    پیام شما
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                >
                  <Send className="w-5 h-5" />
                  ارسال پیام
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;