import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Search,
  UserPlus,
  Edit,
  Trash2,
  Mail,
  AlertCircle
} from 'lucide-react';

// کامپوننت مودال سفارشی برای پیام‌ها
const CustomModal = ({ isOpen, onClose, title, message, onConfirm, confirmText, cancelText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertCircle className="h-6 w-6" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {cancelText || 'بستن'}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {confirmText || 'تایید'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminUsers = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [messageModal, setMessageModal] = useState({ isOpen: false, title: '', message: '' });

  const [users, setUsers] = useState([
    { id: 1, name: 'علی محمدی', email: 'ali@example.com', role: 'کاربر عادی', joinDate: '۱۴۰۴/۰۱/۰۱', status: 'فعال' },
    { id: 2, name: 'سارا احمدی', email: 'sara@example.com', role: 'مدیر', joinDate: '۱۴۰۳/۱۲/۱۵', status: 'فعال' },
    { id: 3, name: 'محمد حسینی', email: 'mohammad@example.com', role: 'کاربر عادی', joinDate: '۱۴۰۴/۰۲/۱۰', status: 'غیرفعال' },
    { id: 4, name: 'نازنین رحیمی', email: 'nazanin@example.com', role: 'کاربر عادی', joinDate: '۱۴۰۴/۰۳/۰۵', status: 'فعال' },
    { id: 5, name: 'رضا کریمی', email: 'reza@example.com', role: 'مدیر', joinDate: '۱۴۰۳/۱۱/۲۰', status: 'فعال' },
  ]);

  // تابع نمایش پیام
  const showMessage = (title, message) => {
    setMessageModal({ isOpen: true, title, message });
  };

  // تابع برای حذف کاربر
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/users/${userToDelete.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
        showMessage('موفقیت', 'کاربر با موفقیت حذف شد');
      } else {
        throw new Error('خطا در حذف کاربر');
      }
    } catch (error) {
      console.error('خطا:', error);
      showMessage('خطا', 'خطایی در حذف کاربر رخ داد');
    }
  };

  // تابع برای ویرایش کاربر
  const handleEditClick = async (user) => {
    const newName = prompt('نام جدید کاربر را وارد کنید:', user.name);
    if (!newName) return;

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, name: newName }),
      });

      if (response.ok) {
        setUsers(users.map(u => u.id === user.id ? { ...u, name: newName } : u));
        showMessage('موفقیت', 'کاربر با موفقیت ویرایش شد');
      } else {
        throw new Error('خطا در ویرایش کاربر');
      }
    } catch (error) {
      console.error('خطا:', error);
      showMessage('خطا', 'خطایی در ویرایش کاربر رخ داد');
    }
  };

  // تابع برای ارسال ایمیل
  const handleMailClick = async (user) => {
    const message = prompt('پیام خود را برای ارسال به کاربر وارد کنید:');
    if (!message) return;

    try {
      const response = await fetch(`/api/users/${user.id}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, message }),
      });

      if (response.ok) {
        showMessage('موفقیت', `ایمیل با موفقیت به ${user.email} ارسال شد`);
      } else {
        throw new Error('خطا در ارسال ایمیل');
      }
    } catch (error) {
      console.error('خطا:', error);
      showMessage('خطا', 'خطایی در ارسال ایمیل رخ داد');
    }
  };

  return (
    <>
      <Helmet>
        <title>مدیریت کاربران | کتاب‌خانه</title>
      </Helmet>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">مدیریت کاربران</h1>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            افزودن کاربر جدید
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="جستجو در کاربران..."
                className="w-full pr-10 py-2 px-4 border rounded-lg"
              />
            </div>
            <select className="w-full py-2 px-4 border rounded-lg">
              <option>همه نقش‌ها</option>
              <option>مدیر</option>
              <option>کاربر عادی</option>
            </select>
            <select className="w-full py-2 px-4 border rounded-lg">
              <option>همه وضعیت‌ها</option>
              <option>فعال</option>
              <option>غیرفعال</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-right py-4 px-6">نام</th>
                <th className="text-right py-4 px-6">ایمیل</th>
                <th className="text-right py-4 px-6">نقش</th>
                <th className="text-right py-4 px-6">تاریخ عضویت</th>
                <th className="text-right py-4 px-6">وضعیت</th>
                <th className="text-right py-4 px-6">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">{user.role}</td>
                  <td className="py-4 px-6">{user.joinDate}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.status === 'فعال' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditClick(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleMailClick(user)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <Mail className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(user)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertCircle className="h-6 w-6" />
              <h3 className="text-lg font-semibold">تایید حذف کاربر</h3>
            </div>
            <p className="text-gray-600 mb-6">
              آیا از حذف کاربر "{userToDelete?.name}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      <CustomModal
        isOpen={messageModal.isOpen}
        onClose={() => setMessageModal({ isOpen: false, title: '', message: '' })}
        title={messageModal.title}
        message={messageModal.message}
      />
    </>
  );
};

export default AdminUsers;