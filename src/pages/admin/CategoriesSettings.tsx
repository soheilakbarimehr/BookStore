// src/pages/admin/CategoriesSettings.tsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Save, Plus, Trash2, X } from 'lucide-react';
import Swal from 'sweetalert2';
import { useCategories } from '../../context/CategoriesContentContext';
import { iconList, defaultIcon, iconMap } from '../../utils/icons';

const CategoriesSettings: React.FC = () => {
  const { categories, updateCategories } = useCategories();
  const [localCategories, setLocalCategories] = useState(categories);
  const [showIconPicker, setShowIconPicker] = useState<number | null>(null);
  const [iconSearchQuery, setIconSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    id: 0,
    title: '',
    icon: 'BookOpen',
    description: '',
    subcategories: [] as string[],
  });

  // دیباگ: بررسی داده‌ها
  console.log('Categories in CategoriesSettings:', categories);
  console.log('Local Categories:', localCategories);
  console.log('Icon List:', iconList);
  console.log('Show Icon Picker:', showIconPicker);


  const openAddModal = () => {
    setNewCategory({
      id: localCategories.length ? Math.max(...localCategories.map((c) => c.id)) + 1 : 1,
      title: '',
      icon: 'BookOpen',
      description: '',
      subcategories: [],
    });
    setShowAddModal(true);
  };

  // بستن مودال
  const closeAddModal = () => {
    setShowAddModal(false);
  };

  // اضافه کردن دسته‌بندی جدید از مودال
  const addCategoryFromModal = () => {
    if (!newCategory.title.trim()) {
      Swal.fire({
        title: 'خطا',
        text: 'عنوان دسته‌بندی نمی‌تواند خالی باشد.',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }
    setLocalCategories([newCategory, ...localCategories]);
    setShowAddModal(false);
  };

  // حذف دسته‌بندی
  const removeCategory = (id: number) => {
    setLocalCategories(localCategories.filter((category) => category.id !== id));
  };

  // به‌روزرسانی فیلدهای دسته‌بندی
  const updateCategoryField = (
    id: number,
    field: keyof typeof localCategories[0],
    value: string | string[]
  ) => {
    setLocalCategories(
      localCategories.map((category) =>
        category.id === id ? { ...category, [field]: value } : category
      )
    );
  };

  // اضافه کردن زیرمجموعه
  const addSubcategory = (id: number) => {
    setLocalCategories(
      localCategories.map((category) =>
        category.id === id
          ? { ...category, subcategories: [...category.subcategories, ''] }
          : category
      )
    );
  };

  // حذف زیرمجموعه
  const removeSubcategory = (id: number, subIndex: number) => {
    setLocalCategories(
      localCategories.map((category) =>
        category.id === id
          ? {
              ...category,
              subcategories: category.subcategories.filter((_, i) => i !== subIndex),
            }
          : category
      )
    );
  };

  // به‌روزرسانی زیرمجموعه
  const updateSubcategory = (id: number, subIndex: number, value: string) => {
    setLocalCategories(
      localCategories.map((category) =>
        category.id === id
          ? {
              ...category,
              subcategories: category.subcategories.map((sub, i) =>
                i === subIndex ? value : sub
              ),
            }
          : category
      )
    );
  };

  // انتخاب آیکون
  const selectIcon = (id: number, iconName: string) => {
    console.log('Selecting icon:', iconName, 'for id:', id);
    if (showAddModal) {
      setNewCategory({ ...newCategory, icon: iconName });
    } else {
      updateCategoryField(id, 'icon', iconName);
    }
    setShowIconPicker(null);
  };

  // ذخیره تغییرات
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCategories(localCategories);
    Swal.fire({
      title: 'تغییرات ذخیره شد!',
      text: 'تنظیمات دسته‌بندی‌ها با موفقیت به‌روزرسانی شد.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // فیلتر آیکون‌ها بر اساس جستجو (فارسی و انگلیسی)
  const filteredIcons = iconList.filter((icon) =>
    icon.displayName.toLowerCase().includes(iconSearchQuery.toLowerCase()) ||
    icon.name.toLowerCase().includes(iconSearchQuery.toLowerCase())
  );

  // دیباگ: بررسی آیکون‌های فیلترشده
  console.log('Filtered Icons:', filteredIcons);

  // اگر داده‌ها وجود نداشته باشند، پیام خطا نمایش بده
  if (!localCategories) {
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-400">
        خطا: داده‌های دسته‌بندی‌ها بارگذاری نشدند.
      </div>
    );
  }

  // مدیریت زدن کلید Enter در مودال
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && showAddModal) {
      e.preventDefault();
      addCategoryFromModal();
    }
  };

  return (
    <>
      <Helmet>
        <title>تنظیمات دسته‌بندی‌ها | کتاب‌خانه</title>
      </Helmet>

      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">تنظیمات دسته‌بندی‌ها</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* مدیریت دسته‌بندی‌ها */}
          <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">دسته‌بندی‌ها</h2>
            <button
              type="button"
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 mb-4 text-white rounded-lg bg-primary-600 hover:bg-primary-700"
            >
              <Plus className="w-5 h-5" />
              افزودن دسته‌بندی جدید
            </button>
            {localCategories.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">هیچ دسته‌بندی‌ای وجود ندارد.</p>
            ) : (
              localCategories.map((category) => {
                const IconComponent = iconMap[category.icon] || defaultIcon.Icon;

                return (
                  <div key={category.id} className="p-4 mb-4 border rounded-lg dark:border-gray-600">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {/* عنوان دسته‌بندی */}
                      <div>
                        <label
                          htmlFor={`category-title-${category.id}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          عنوان دسته‌بندی
                        </label>
                        <input
                          id={`category-title-${category.id}`}
                          type="text"
                          value={category.title}
                          onChange={(e) => updateCategoryField(category.id, 'title', e.target.value)}
                          placeholder="عنوان دسته‌بندی"
                          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      {/* آیکون دسته‌بندی */}
                      <div>
                        <label
                          htmlFor={`category-icon-${category.id}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          آیکون دسته‌بندی
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowIconPicker(category.id)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-900 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white"
                          >
                            <IconComponent className="w-5 h-5" />
                            انتخاب آیکون
                          </button>
                        </div>
                      </div>
                      {/* توضیحات دسته‌بندی */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor={`category-description-${category.id}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          توضیحات
                        </label>
                        <textarea
                          id={`category-description-${category.id}`}
                          value={category.description}
                          onChange={(e) => updateCategoryField(category.id, 'description', e.target.value)}
                          placeholder="توضیحات دسته‌بندی"
                          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          rows={3}
                        />
                      </div>
                      {/* زیرمجموعه‌ها */}
                      <div className="md:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          زیرمجموعه‌ها
                        </label>
                        <button
                          type="button"
                          onClick={() => addSubcategory(category.id)}
                          className="flex items-center gap-2 px-4 py-2 mb-2 text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                        >
                          <Plus className="w-5 h-5" />
                          افزودن زیرمجموعه
                        </button>
                        {category.subcategories.map((sub, subIndex) => (
                          <div key={subIndex} className="flex items-center gap-2 mb-2">
                            <input
                              type="text"
                              value={sub}
                              onChange={(e) => updateSubcategory(category.id, subIndex, e.target.value)}
                              placeholder="نام زیرمجموعه"
                              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <button
                              type="button"
                              onClick={() => removeSubcategory(category.id, subIndex)}
                              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-5 h-5" />
                              حذف
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCategory(category.id)}
                      className="flex items-center gap-2 px-4 py-2 mt-4 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                      حذف دسته‌بندی
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* دکمه ذخیره */}
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 text-white rounded-lg bg-primary-600 hover:bg-primary-700"
          >
            <Save className="w-5 h-5" />
            ذخیره تغییرات
          </button>
        </form>

        {/* مودال افزودن دسته‌بندی جدید */}
        {showAddModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onKeyDown={handleModalKeyDown}
          >
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg dark:bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">افزودن دسته‌بندی جدید</h2>
                <button
                  onClick={closeAddModal}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* عنوان دسته‌بندی */}
                <div>
                  <label
                    htmlFor="new-category-title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    عنوان دسته‌بندی
                  </label>
                  <input
                    id="new-category-title"
                    type="text"
                    value={newCategory.title}
                    onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                    placeholder="عنوان دسته‌بندی"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                    autoFocus
                  />
                </div>
                {/* آیکون دسته‌بندی */}
                <div>
                  <label
                    htmlFor="new-category-icon"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    آیکون دسته‌بندی
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowIconPicker(0)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-900 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white"
                    >
                      {(() => {
                        const IconComponent = iconMap[newCategory.icon] || defaultIcon.Icon;
                        return <IconComponent className="w-5 h-5" />;
                      })()}
                      انتخاب آیکون
                    </button>
                  </div>
                </div>
                {/* توضیحات دسته‌بندی */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="new-category-description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    توضیحات
                  </label>
                  <textarea
                    id="new-category-description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="توضیحات دسته‌بندی"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={3}
                  />
                </div>
                {/* زیرمجموعه‌ها */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    زیرمجموعه‌ها
                  </label>
                  <button
                    type="button"
                    onClick={() => setNewCategory({ ...newCategory, subcategories: [...newCategory.subcategories, ''] })}
                    className="flex items-center gap-2 px-4 py-2 mb-2 text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    <Plus className="w-5 h-5" />
                    افزودن زیرمجموعه
                  </button>
                  {newCategory.subcategories.map((sub, subIndex) => (
                    <div key={subIndex} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={sub}
                        onChange={(e) => {
                          const updatedSubcategories = [...newCategory.subcategories];
                          updatedSubcategories[subIndex] = e.target.value;
                          setNewCategory({ ...newCategory, subcategories: updatedSubcategories });
                        }}
                        placeholder="نام زیرمجموعه"
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedSubcategories = newCategory.subcategories.filter((_, i) => i !== subIndex);
                          setNewCategory({ ...newCategory, subcategories: updatedSubcategories });
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                        حذف
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  لغو
                </button>
                <button
                  type="button"
                  onClick={addCategoryFromModal}
                  className="px-4 py-2 text-white rounded-md bg-primary-600 hover:bg-primary-700"
                >
                  تأیید
                </button>
              </div>
            </div>
          </div>
        )}

        {/* انتخاب‌گر آیکون */}
        {showIconPicker !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg dark:bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">انتخاب آیکون</h2>
                <button
                  onClick={() => setShowIconPicker(null)}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <input
                type="text"
                placeholder="جستجو در آیکون‌ها (فارسی یا انگلیسی)..."
                value={iconSearchQuery}
                onChange={(e) => setIconSearchQuery(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {filteredIcons.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">آیکونی یافت نشد.</p>
              ) : (
                <div className="grid grid-cols-6 gap-4 overflow-y-auto max-h-96">
                  {filteredIcons.map(({ name, displayName, Icon }) => (
                    <button
                      key={name}
                      onClick={() => selectIcon(showIconPicker === 0 ? 0 : showIconPicker, name)}
                      className="flex flex-col items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <Icon className="w-6 h-6 text-gray-900 dark:text-white" />
                      <span className="mt-1 text-sm text-gray-900 dark:text-white">{displayName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesSettings;