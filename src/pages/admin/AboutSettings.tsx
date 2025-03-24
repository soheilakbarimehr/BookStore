// src/pages/admin/AdminAboutSettings.tsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Save, Plus, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useAboutContent } from '../../context/AboutContentContext';

const AdminAboutSettings: React.FC = () => {
  const { content: initialSettings, updateContent } = useAboutContent(); // استفاده از Context
  const [settings, setSettings] = useState(initialSettings);

  const handleInputChange = (
    section: keyof typeof settings,
    field: string,
    value: any,
    index?: number
  ) => {
    setSettings((prev) => {
      const updatedSettings = { ...prev };

      if (section === 'hero') {
        updatedSettings.hero = { ...updatedSettings.hero, [field]: value };
      } else if (section === 'stats' && index !== undefined) {
        updatedSettings.stats = [...updatedSettings.stats];
        updatedSettings.stats[index] = { ...updatedSettings.stats[index], [field]: value };
      } else if (section === 'mission') {
        if (field === 'items' && index !== undefined) {
          updatedSettings.mission = {
            ...updatedSettings.mission,
            items: updatedSettings.mission.items.map((item, i) =>
              i === index ? value : item
            ),
          };
        } else {
          updatedSettings.mission = { ...updatedSettings.mission, [field]: value };
        }
      } else if (section === 'team' && index !== undefined) {
        updatedSettings.team = [...updatedSettings.team];
        if (field === 'instagram' || field === 'twitter') {
          updatedSettings.team[index] = {
            ...updatedSettings.team[index],
            socials: {
              ...updatedSettings.team[index].socials,
              [field]: value,
            },
          };
        } else {
          updatedSettings.team[index] = {
            ...updatedSettings.team[index],
            [field]: value,
          };
        }
      } else if (section === 'testimonials' && index !== undefined) {
        updatedSettings.testimonials = [...updatedSettings.testimonials];
        updatedSettings.testimonials[index] = {
          ...updatedSettings.testimonials[index],
          [field]: value,
        };
      } else if (section === 'contact') {
        updatedSettings.contact = { ...updatedSettings.contact, [field]: value };
      }

      return updatedSettings;
    });
  };

  const addTeamMember = () => {
    setSettings((prev) => ({
      ...prev,
      team: [
        ...prev.team,
        {
          name: '',
          role: '',
          image: '',
          bio: '',
          socials: { instagram: '', twitter: '' },
        },
      ],
    }));
  };

  const removeTeamMember = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index),
    }));
  };

  const addTestimonial = () => {
    setSettings((prev) => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        { name: '', comment: '', rating: 5 },
      ],
    }));
  };

  const removeTestimonial = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(settings); // آپدیت کردن Context
    Swal.fire({
      title: 'تغییرات ذخیره شد!',
      text: 'تنظیمات صفحه درباره ما با موفقیت ذخیره شد.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <Helmet>
        <title>تنظیمات صفحه درباره ما | کتاب‌خانه</title>
      </Helmet>

      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">تنظیمات صفحه درباره ما</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hero Section */}
          <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">بخش هدر</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="hero-title" className="block mb-2 text-gray-600 dark:text-gray-300">عنوان</label>
                <input
                  id="hero-title"
                  type="text"
                  value={settings.hero.title}
                  onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="hero-description" className="block mb-2 text-gray-600 dark:text-gray-300">توضیحات</label>
                <textarea
                  id="hero-description"
                  value={settings.hero.description}
                  onChange={(e) => handleInputChange('hero', 'description', e.target.value)}
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  rows={3}
                />
              </div>
              <div>
                <label htmlFor="hero-backgroundImage" className="block mb-2 text-gray-600 dark:text-gray-300">لینک تصویر پس‌زمینه</label>
                <input
                  id="hero-backgroundImage"
                  type="text"
                  value={settings.hero.backgroundImage}
                  onChange={(e) => handleInputChange('hero', 'backgroundImage', e.target.value)}
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="hero-buttonText" className="block mb-2 text-gray-600 dark:text-gray-300">متن دکمه</label>
                <input
                  id="hero-buttonText"
                  type="text"
                  value={settings.hero.buttonText}
                  onChange={(e) => handleInputChange('hero', 'buttonText', e.target.value)}
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="hero-buttonLink" className="block mb-2 text-gray-600 dark:text-gray-300">لینک دکمه</label>
                <input
                  id="hero-buttonLink"
                  type="text"
                  value={settings.hero.buttonLink}
                  onChange={(e) => handleInputChange('hero', 'buttonLink', e.target.value)}
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">بخش آمار</h2>
            <div className="space-y-4">
              {settings.stats.map((stat, index) => (
                <div key={index} className="pb-4 border-b">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor={`stat-label-${index}`} className="block mb-2 text-gray-600 dark:text-gray-300">برچسب</label>
                      <input
                        id={`stat-label-${index}`}
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleInputChange('stats', 'label', e.target.value, index)}
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor={`stat-value-${index}`} className="block mb-2 text-gray-600 dark:text-gray-300">مقدار</label>
                      <input
                        id={`stat-value-${index}`}
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleInputChange('stats', 'value', e.target.value, index)}
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Section */}
          <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">بخش مأموریت</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="mission-title" className="block mb-2 text-gray-600 dark:text-gray-300">عنوان</label>
                <input
                  id="mission-title"
                  type="text"
                  value={settings.mission.title}
                  onChange={(e) => handleInputChange('mission', 'title', e.target.value)}
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="mission-description" className="block mb-2 text-gray-600 dark:text-gray-300">توضیحات</label>
                <textarea
                  id="mission-description"
                  value={settings.mission.description}
                  onChange={(e) => handleInputChange('mission', 'description', e.target.value)}
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  rows={3}
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-600 dark:text-gray-300">موارد لیست</label>
                {settings.mission.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <label htmlFor={`mission-item-${index}`} className="sr-only">
                      مورد {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`mission-item-${index}`}
                      value={item}
                      onChange={(e) => handleInputChange('mission', 'items', e.target.value, index)}
                      className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label htmlFor="mission-image" className="block mb-2 text-gray-600 dark:text-gray-300">لینک تصویر</label>
                <input
                  id="mission-image"
                  type="text"
                  value={settings.mission.image}
                  onChange={(e) => handleInputChange('mission', 'image', e.target.value)}
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">بخش تیم</h2>
            <button
              type="button"
              onClick={addTeamMember}
              className="flex items-center gap-2 px-4 py-2 mb-4 text-white rounded-lg bg-primary-600 hover:bg-primary-700"
            >
              <Plus className="w-5 h-5" />
              افزودن عضو جدید
            </button>
            <div className="space-y-4">
              {settings.team.map((member, index) => (
                <div key={index} className="pb-4 border-b">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor={`team-name-${index}`} className="block mb-2 text-gray-600 dark:text-gray-300">نام</label>
                      <input
                        id={`team-name-${index}`}
                        type="text"
                        value={member.name}
                        onChange={(e) => handleInputChange('team', 'name', e.target.value, index)}
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor={`team-role-${index}`} className="block mb-2 text-gray-600 dark:text-gray-300">نقش</label>
                      <input
                        id={`team-role-${index}`}
                        type="text"
                        value={member.role}
                        onChange={(e) => handleInputChange('team', 'role', e.target.value, index)}
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor={`team-image-${index}`} className="block mb-2 text-gray-600 dark:text-gray-300">لینک تصویر</label>
                      <input
                        id={`team-image-${index}`}
                        type="text"
                        value={member.image}
                        onChange={(e) => handleInputChange('team', 'image', e.target.value, index)}
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor={`team-bio-${index}`} className="block mb-2 text-gray-600 dark:text-gray-300">بیوگرافی</label>
                      <input
                        id={`team-bio-${index}`}
                        type="text"
                        value={member.bio}
                        onChange={(e) => handleInputChange('team', 'bio', e.target.value, index)}
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor={`team-instagram-${index}`} className="block mb-2 text-gray-600 dark:text-gray-300">لینک اینستاگرام</label>
                      <input
                        id={`team-instagram-${index}`}
                        type="text"
                        value={member.socials.instagram}
                        onChange={(e) => handleInputChange('team', 'instagram', e.target.value, index)}
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor={`team-twitter-${index}`} className="block mb-2 text-gray-600 dark:text-gray-300">لینک توییتر</label>
                      <input
                        id={`team-twitter-${index}`}
                        type="text"
                        value={member.socials.twitter}
                        onChange={(e) => handleInputChange('team', 'twitter', e.target.value, index)}
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="flex items-center gap-2 px-4 py-2 mt-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">بخش نظرات مشتریان</h2>
            <button
              type="button"
              onClick={addTestimonial}
              className="flex items-center gap-2 px-4 py-2 mb-4 text-white rounded-lg bg-primary-600 hover:bg-primary-700"
            >
              <Plus className="w-5 h-5" />
              افزودن نظر جدید
            </button>
            <div className="space-y-4">
              {settings.testimonials.map((testimonial, index) => (
                <div key={index} className="pb-4 border-b">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor={`testimonial-name-${index}`} className="block mb-2 text-gray-600 dark:text-gray-300">نام</label>
                      <input
                        id={`testimonial-name-${index}`}
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => handleInputChange('testimonials', 'name', e.target.value, index)}
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor={`testimonial-comment-${index}`} className="block mb-2 text-gray-600 dark:text-gray-300">نظر</label>
                      <textarea
                        id={`testimonial-comment-${index}`}
                        value={testimonial.comment}
                        onChange={(e) => handleInputChange('testimonials', 'comment', e.target.value, index)}
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label htmlFor={`testimonial-rating-${index}`} className="block mb-2 text-gray-600 dark:text-gray-300">امتیاز (۱ تا ۵)</label>
                      <input
                        id={`testimonial-rating-${index}`}
                        type="number"
                        min="1"
                        max="5"
                        value={testimonial.rating}
                        onChange={(e) => handleInputChange('testimonials', 'rating', Number(e.target.value), index)}
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTestimonial(index)}
                    className="flex items-center gap-2 px-4 py-2 mt-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">بخش تماس با ما</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="contact-address" className="block mb-2 text-gray-600 dark:text-gray-300">آدرس</label>
                <input
                  id="contact-address"
                  type="text"
                  value={settings.contact.address}
                  onChange={(e) => handleInputChange('contact', 'address', e.target.value)}
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block mb-2 text-gray-600 dark:text-gray-300">تلفن</label>
                <input
                  id="contact-phone"
                  type="text"
                  value={settings.contact.phone}
                  onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block mb-2 text-gray-600 dark:text-gray-300">ایمیل</label>
                <input
                  id="contact-email"
                  type="email"
                  value={settings.contact.email}
                  onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 text-white rounded-lg bg-primary-600 hover:bg-primary-700"
            >
              <Save className="w-5 h-5" />
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminAboutSettings;