// src/pages/admin/HomeSettings.tsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHomeContent } from '../../context/HomeContentContext';
import { Trash2, Plus, Eye, EyeOff, Truck, CreditCard, Headphones, Edit2, Eye as PreviewIcon } from 'lucide-react';
import Swal from 'sweetalert2';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonLink: string;
}

// تایپ جدید برای Slide که شامل index هم می‌شه
interface SlideWithIndex extends Slide {
  index: number;
}

interface Feature {
  title: string;
  description: string;
  icon: 'Truck' | 'CreditCard' | 'Headphones';
}

interface Section {
  id: number;
  title: string;
  type: 'featured-books' | 'categories' | 'features' | 'custom' | 'latest-books';
  content: string[] | Feature[] | string;
  visible: boolean;
}

// تایپ جدید برای Section که شامل index هم می‌شه
interface SectionWithIndex extends Section {
  index: number;
}

const HomeSettings = () => {
  const { content, updateSlider, updateSections } = useHomeContent();
  const page = 'home';
  const homeContent = content.pages[page] || { slider: [], sections: [] };

  const showSuccessToast = (message: string) => {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  };

  // مدیریت اسلایدر
  const [newSliderItem, setNewSliderItem] = useState({
    image: '',
    title: '',
    description: '',
    buttonLink: '',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editSliderItem, setEditSliderItem] = useState<SlideWithIndex | null>(null); // استفاده از SlideWithIndex
  const [previewSlider, setPreviewSlider] = useState<Slide[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setNewSliderItem({ ...newSliderItem, image: base64String });
        setPreviewImage(base64String);
        if (editSliderItem) {
          setEditSliderItem({ ...editSliderItem, image: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSliderItem = () => {
    const missingFields = [];
    if (!newSliderItem.image) missingFields.push('تصویر');
    if (!newSliderItem.title) missingFields.push('عنوان');
    if (!newSliderItem.description) missingFields.push('توضیحات');
    if (!newSliderItem.buttonLink) missingFields.push('لینک دکمه');

    if (missingFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: `لطفاً این فیلدها را پر کنید: ${missingFields.join(', ')}`,
      });
      return;
    }

    const newItem: Slide = {
      id: (homeContent.slider?.length || 0) + 1,
      ...newSliderItem,
    };

    updateSlider(page, [...(homeContent.slider || []), newItem]);
    setNewSliderItem({ image: '', title: '', description: '', buttonLink: '' });
    setPreviewImage(null);
    showSuccessToast('اسلاید با موفقیت اضافه شد!');
  };

  const handleEditSliderItem = (index: number) => {
    const item = homeContent.slider![index];
    setEditSliderItem({ ...item, index }); // حالا با SlideWithIndex سازگاره
    setNewSliderItem({
      image: item.image,
      title: item.title,
      description: item.description,
      buttonLink: item.buttonLink,
    });
    setPreviewImage(item.image);
  };

  const handleUpdateSliderItem = () => {
    if (!editSliderItem) return;

    const missingFields = [];
    if (!newSliderItem.image) missingFields.push('تصویر');
    if (!newSliderItem.title) missingFields.push('عنوان');
    if (!newSliderItem.description) missingFields.push('توضیحات');
    if (!newSliderItem.buttonLink) missingFields.push('لینک دکمه');

    if (missingFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: `لطفاً این فیلدها را پر کنید: ${missingFields.join(', ')}`,
      });
      return;
    }

    const updatedSlider = [...(homeContent.slider || [])];
    updatedSlider[editSliderItem.index] = { ...editSliderItem, ...newSliderItem };
    updateSlider(page, updatedSlider);
    setEditSliderItem(null);
    setNewSliderItem({ image: '', title: '', description: '', buttonLink: '' });
    setPreviewImage(null);
    showSuccessToast('اسلاید با موفقیت به‌روزرسانی شد!');
  };

  const handleDeleteSliderItem = (index: number) => {
    updateSlider(page, (homeContent.slider || []).filter((_: any, i: number) => i !== index));
    showSuccessToast('اسلاید با موفقیت حذف شد!');
  };

  const handlePreviewSlider = () => {
    setPreviewSlider(homeContent.slider || []);
    Swal.fire({
      title: 'پیش‌نمایش اسلایدر',
      html: `
        <div class="relative h-[300px] overflow-hidden">
          ${(homeContent.slider || [])
            .map(
              (slide: Slide, index: number) => `
              <div class="absolute inset-0 transition-opacity duration-500 ${
                index === 0 ? 'opacity-100' : 'opacity-0'
              }">
                <img src="${slide.image}" alt="${slide.title}" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div class="text-center text-white">
                    <h1 class="text-2xl font-bold mb-4">${slide.title}</h1>
                    <p class="text-lg">${slide.description}</p>
                    <a href="${slide.buttonLink}" class="mt-4 inline-block bg-white text-primary-700 px-6 py-2 rounded-full">شروع به خرید</a>
                  </div>
                </div>
              </div>
            `
            )
            .join('')}
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: 'بستن',
    });
  };

  const onDragEndSlider = (result: any) => {
    if (!result.destination) return;
    const reorderedSlider = Array.from(homeContent.slider || []);
    const [movedItem] = reorderedSlider.splice(result.source.index, 1);
    reorderedSlider.splice(result.destination.index, 0, movedItem);
    updateSlider(page, reorderedSlider);
    showSuccessToast('ترتیب اسلایدها با موفقیت تغییر کرد!');
  };

  // مدیریت بخش‌ها
  const [newSection, setNewSection] = useState({
    title: '',
    type: 'custom' as 'featured-books' | 'categories' | 'custom' | 'features' | 'latest-books',
    content: '',
  });
  const [editSection, setEditSection] = useState<SectionWithIndex | null>(null); // استفاده از SectionWithIndex
  const [previewSections, setPreviewSections] = useState<Section[]>([]);

  const [newFeature, setNewFeature] = useState<Feature>({
    icon: 'Truck',
    title: '',
    description: '',
  });
  const [featuresList, setFeaturesList] = useState<Feature[]>([]);

  const handleAddFeature = () => {
    if (!newFeature.title || !newFeature.description) {
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'لطفاً عنوان و توضیحات ویژگی را پر کنید',
      });
      return;
    }
    setFeaturesList([...featuresList, newFeature]);
    setNewFeature({ icon: 'Truck', title: '', description: '' });
    showSuccessToast('ویژگی با موفقیت اضافه شد!');
  };

  const handleAddSection = () => {
    if (!newSection.title) {
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'لطفاً عنوان بخش را وارد کنید',
      });
      return;
    }

    let content: string | string[] | Feature[];
    if (newSection.type === 'features') {
      if (featuresList.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'لطفاً حداقل یک ویژگی اضافه کنید',
        });
        return;
      }
      content = featuresList;
    } else {
      if (!newSection.content) {
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'لطفاً محتوا را وارد کنید',
        });
        return;
      }
      content = newSection.type === 'custom' ? newSection.content : newSection.content.split(',').map((item) => item.trim());
    }

    const newItem: Section = {
      id: homeContent.sections.length + 1,
      title: newSection.title,
      type: newSection.type,
      content,
      visible: true,
    };

    updateSections(page, [...homeContent.sections, newItem]);
    setNewSection({ title: '', type: 'custom', content: '' });
    setFeaturesList([]);
    showSuccessToast('بخش با موفقیت اضافه شد!');
  };

  const handleEditSection = (index: number) => {
    const section = homeContent.sections[index];
    setEditSection({ ...section, index }); // حالا با SectionWithIndex سازگاره
    setNewSection({
      title: section.title,
      type: section.type,
      content: Array.isArray(section.content) ? section.content.map((item: Feature | string) => (typeof item === 'string' ? item : item.title)).join(', ') : section.content,
    });
    if (section.type === 'features') {
      setFeaturesList(section.content as Feature[]);
    }
  };

  const handleUpdateSection = () => {
    if (!editSection) return;

    if (!newSection.title) {
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'لطفاً عنوان بخش را وارد کنید',
      });
      return;
    }

    let content: string | string[] | Feature[];
    if (newSection.type === 'features') {
      if (featuresList.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'لطفاً حداقل یک ویژگی اضافه کنید',
        });
        return;
      }
      content = featuresList;
    } else {
      if (!newSection.content) {
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'لطفاً محتوا را وارد کنید',
        });
        return;
      }
      content = newSection.type === 'custom' ? newSection.content : newSection.content.split(',').map((item) => item.trim());
    }

    const updatedSections = [...homeContent.sections];
    updatedSections[editSection.index] = { ...editSection, title: newSection.title, type: newSection.type, content };
    updateSections(page, updatedSections);
    setEditSection(null);
    setNewSection({ title: '', type: 'custom', content: '' });
    setFeaturesList([]);
    showSuccessToast('بخش با موفقیت به‌روزرسانی شد!');
  };

  const handlePreviewSections = () => {
    setPreviewSections(homeContent.sections);
    Swal.fire({
      title: 'پیش‌نمایش بخش‌ها',
      html: `
        <div class="space-y-4">
          ${homeContent.sections
            .filter((section: Section) => section.visible)
            .map(
              (section: Section) => `
              <div class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">${section.title}</h2>
                <p class="text-gray-600 dark:text-gray-300">
                  ${
                    section.type === 'features'
                      ? (section.content as Feature[])
                          .map((f: Feature) => `${f.title}: ${f.description}`)
                          .join('<br>')
                      : Array.isArray(section.content)
                      ? (section.content as string[]).join(', ')
                      : section.content
                  }
                </p>
              </div>
            `
            )
            .join('')}
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: 'بستن',
    });
  };

  const onDragEndSections = (result: any) => {
    if (!result.destination) return;
    const reorderedSections = Array.from(homeContent.sections);
    const [movedItem] = reorderedSections.splice(result.source.index, 1);
    reorderedSections.splice(result.destination.index, 0, movedItem);
    updateSections(page, reorderedSections);
    showSuccessToast('ترتیب بخش‌ها با موفقیت تغییر کرد!');
  };

  const handleToggleSectionVisibility = (index: number) => {
    const updatedSections = [...homeContent.sections];
    updatedSections[index].visible = !updatedSections[index].visible;
    updateSections(page, updatedSections);
    showSuccessToast(updatedSections[index].visible ? 'بخش نمایش داده شد!' : 'بخش مخفی شد!');
  };

  const handleDeleteSection = (index: number) => {
    updateSections(page, homeContent.sections.filter((_: any, i: number) => i !== index));
    showSuccessToast('بخش با موفقیت حذف شد!');
  };

  return (
    <>
      <Helmet>
        <title>تنظیمات صفحه اصلی | کتاب‌خانه</title>
      </Helmet>
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">تنظیمات صفحه اصلی</h1>

        <div className="p-6 mb-8 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">مدیریت اسلایدر</h2>

          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {editSliderItem ? 'ویرایش آیتم اسلایدر' : 'اضافه کردن آیتم جدید'}
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="relative p-6 text-center border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600">
                <label htmlFor="image-upload" className="sr-only">
                  آپلود تصویر
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="object-cover w-32 h-32 mx-auto rounded-lg" />
                ) : (
                  <div>
                    <svg
                      className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      تصویر را اینجا بکشید و رها کنید یا کلیک کنید تا انتخاب کنید
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="slider-title" className="sr-only">
                  عنوان اسلایدر
                </label>
                <input
                  id="slider-title"
                  type="text"
                  placeholder="عنوان"
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={newSliderItem.title}
                  onChange={(e) => setNewSliderItem({ ...newSliderItem, title: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="slider-description" className="sr-only">
                  توضیحات اسلایدر
                </label>
                <input
                  id="slider-description"
                  type="text"
                  placeholder="توضیحات"
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={newSliderItem.description}
                  onChange={(e) => setNewSliderItem({ ...newSliderItem, description: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="slider-buttonLink" className="sr-only">
                  لینک دکمه اسلایدر
                </label>
                <input
                  id="slider-buttonLink"
                  type="text"
                  placeholder="لینک دکمه (مثال: /books)"
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={newSliderItem.buttonLink}
                  onChange={(e) => setNewSliderItem({ ...newSliderItem, buttonLink: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {editSliderItem ? (
                <button
                  onClick={handleUpdateSliderItem}
                  className="px-4 py-2 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
                  aria-label="به‌روزرسانی اسلاید"
                >
                  <Edit2 className="inline-block w-5 h-5 ml-2" />
                  به‌روزرسانی
                </button>
              ) : (
                <button
                  onClick={handleAddSliderItem}
                  className="px-4 py-2 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
                  aria-label="اضافه کردن اسلاید"
                >
                  <Plus className="inline-block w-5 h-5 ml-2" />
                  اضافه کردن
                </button>
              )}
              <button
                onClick={handlePreviewSlider}
                className="px-4 py-2 text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700"
                aria-label="پیش‌نمایش اسلایدر"
              >
                <PreviewIcon className="inline-block w-5 h-5 ml-2" />
                پیش‌نمایش
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">آیتم‌های اسلایدر</h3>
            {(!homeContent.slider || homeContent.slider.length === 0) ? (
              <p className="text-gray-600 dark:text-gray-300">هیچ آیتمی وجود ندارد.</p>
            ) : (
              <DragDropContext onDragEnd={onDragEndSlider}>
                <Droppable droppableId="slider">
                  {(provided) => (
                    <ul className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
                      {(homeContent.slider || []).map((item: Slide, index: number) => (
                        <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                            >
                              <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.title} className="object-cover w-16 h-16 rounded" />
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                                  <p className="text-gray-600 dark:text-gray-300">لینک: {item.buttonLink}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditSliderItem(index)}
                                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                  aria-label="ویرایش اسلاید"
                                >
                                  <Edit2 className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteSliderItem(index)}
                                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                  aria-label="حذف اسلاید"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">مدیریت بخش‌ها</h2>

          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {editSection ? 'ویرایش بخش' : 'اضافه کردن بخش جدید'}
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label htmlFor="section-title" className="sr-only">
                  عنوان بخش
                </label>
                <input
                  id="section-title"
                  type="text"
                  placeholder="عنوان بخش"
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={newSection.title}
                  onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="section-type" className="sr-only">
                  نوع بخش
                </label>
                <select
                  id="section-type"
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={newSection.type}
                  onChange={(e) =>
                    setNewSection({
                      ...newSection,
                      type: e.target.value as 'featured-books' | 'categories' | 'custom' | 'features' | 'latest-books',
                    })
                  }
                >
                  <option value="featured-books">کتاب‌های ویژه (ID کتاب‌ها با کاما جدا کنید)</option>
                  <option value="categories">دسته‌بندی‌ها (نام دسته‌ها با کاما جدا کنید)</option>
                  <option value="custom">سفارشی (متن دلخواه)</option>
                  <option value="features">ویژگی‌ها (ارسال سریع، پرداخت امن و ...)</option>
                </select>
              </div>
              {newSection.type !== 'features' && (
                <div>
                  <label htmlFor="section-content" className="sr-only">
                    محتوای بخش
                  </label>
                  <input
                    id="section-content"
                    type="text"
                    placeholder={
                      newSection.type === 'custom'
                        ? 'محتوای بخش'
                        : newSection.type === 'featured-books'
                        ? 'ID کتاب‌ها (مثال: 1,2,3)'
                        : 'نام دسته‌ها (مثال: ادبیات داستانی,توسعه فردی)'
                    }
                    className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    value={newSection.content}
                    onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
                  />
                </div>
              )}
            </div>

            {newSection.type === 'features' && (
              <div className="mt-4">
                <h4 className="mb-2 font-semibold text-gray-900 text-md dark:text-white">اضافه کردن ویژگی</h4>
                <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
                  <div>
                    <label htmlFor="feature-icon" className="sr-only">
                      آیکون ویژگی
                    </label>
                    <select
                      id="feature-icon"
                      className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={newFeature.icon}
                      onChange={(e) =>
                        setNewFeature({
                          ...newFeature,
                          icon: e.target.value as 'Truck' | 'CreditCard' | 'Headphones',
                        })
                      }
                    >
                      <option value="Truck">ارسال (Truck)</option>
                      <option value="CreditCard">پرداخت (CreditCard)</option>
                      <option value="Headphones">پشتیبانی (Headphones)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="feature-title" className="sr-only">
                      عنوان ویژگی
                    </label>
                    <input
                      id="feature-title"
                      type="text"
                      placeholder="عنوان ویژگی"
                      className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={newFeature.title}
                      onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="feature-description" className="sr-only">
                      توضیحات ویژگی
                    </label>
                    <input
                      id="feature-description"
                      type="text"
                      placeholder="توضیحات ویژگی"
                      className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={newFeature.description}
                      onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddFeature}
                  className="px-4 py-2 mb-4 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
                  aria-label="اضافه کردن ویژگی"
                >
                  <Plus className="inline-block w-5 h-5 ml-2" />
                  اضافه کردن ویژگی
                </button>

                {featuresList.length > 0 && (
                  <ul className="mb-4 space-y-2">
                    {featuresList.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                      >
                        <div className="flex items-center gap-2">
                          {feature.icon === 'Truck' && <Truck className="w-5 h-5 text-primary-600" />}
                          {feature.icon === 'CreditCard' && <CreditCard className="w-5 h-5 text-primary-600" />}
                          {feature.icon === 'Headphones' && <Headphones className="w-5 h-5 text-primary-600" />}
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{feature.title}</p>
                            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setFeaturesList(featuresList.filter((_, i) => i !== index))}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          aria-label="حذف ویژگی"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="flex gap-2 mt-4">
              {editSection ? (
                <button
                  onClick={handleUpdateSection}
                  className="px-4 py-2 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
                  aria-label="به‌روزرسانی بخش"
                >
                  <Edit2 className="inline-block w-5 h-5 ml-2" />
                  به‌روزرسانی بخش
                </button>
              ) : (
                <button
                  onClick={handleAddSection}
                  className="px-4 py-2 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
                  aria-label="اضافه کردن بخش"
                >
                  <Plus className="inline-block w-5 h-5 ml-2" />
                  اضافه کردن بخش
                </button>
              )}
              <button
                onClick={handlePreviewSections}
                className="px-4 py-2 text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700"
                aria-label="پیش‌نمایش بخش‌ها"
              >
                <PreviewIcon className="inline-block w-5 h-5 ml-2" />
                پیش‌نمایش
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">بخش‌های صفحه اصلی</h3>
            {homeContent.sections.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">هیچ بخشی وجود ندارد.</p>
            ) : (
              <DragDropContext onDragEnd={onDragEndSections}>
                <Droppable droppableId="sections">
                  {(provided) => (
                    <ul className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
                      {homeContent.sections.map((section: Section, index: number) => (
                        <Draggable key={section.id} draggableId={String(section.id)} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                            >
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">{section.title}</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                  نوع: {section.type === 'featured-books' ? 'کتاب‌های ویژه' : section.type === 'categories' ? 'دسته‌بندی‌ها' : section.type === 'custom' ? 'سفارشی' : 'ویژگی‌ها'}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300">
                                  محتوا:{' '}
                                  {section.type === 'features'
                                    ? (section.content as Feature[]).map((f: Feature) => f.title).join(', ')
                                    : Array.isArray(section.content)
                                    ? (section.content as string[]).join(', ')
                                    : section.content}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditSection(index)}
                                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                  aria-label="ویرایش بخش"
                                >
                                  <Edit2 className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleToggleSectionVisibility(index)}
                                  className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                                  aria-label={section.visible ? 'مخفی کردن بخش' : 'نمایش بخش'}
                                >
                                  {section.visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                </button>
                                <button
                                  onClick={() => handleDeleteSection(index)}
                                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                  aria-label="حذف بخش"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSettings;