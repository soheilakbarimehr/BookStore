import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Search,
  UserPlus,
  Edit,
  Trash2,
  Mail,
  AlertCircle,
} from 'lucide-react';
import DatePicker, { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  status: string;
}

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  onConfirm, 
  confirmText, 
  cancelText, 
  children 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertCircle className="h-6 w-6" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="text-gray-600 mb-6">
          {message}
          {children}
        </div>
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

const AdminUsers: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMailModal, setShowMailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToMail, setUserToMail] = useState<User | null>(null);
  const [messageModal, setMessageModal] = useState<{ isOpen: boolean; title: string; message: string }>({
    isOpen: false,
    title: '',
    message: ''
  });
  const [mailMessage, setMailMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('همه نقش‌ها');
  const [statusFilter, setStatusFilter] = useState<string>('همه وضعیت‌ها');
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'کاربر عادی',
    joinDate: null as DayValue,
    status: 'فعال'
  });
  const [editUserForm, setEditUserForm] = useState({
    name: '',
    email: '',
    role: 'کاربر عادی',
    joinDate: null as DayValue,
    status: 'فعال'
  });

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'علی محمدی', email: 'ali@example.com', role: 'کاربر عادی', joinDate: '۱۴۰۴/۰۱/۰۱', status: 'فعال' },
    { id: 2, name: 'سارا احمدی', email: 'sara@example.com', role: 'مدیر', joinDate: '۱۴۰۳/۱۲/۱۵', status: 'فعال' },
    { id: 3, name: 'محمد حسینی', email: 'mohammad@example.com', role: 'کاربر عادی', joinDate: '۱۴۰۴/۰۲/۱۰', status: 'غیرفعال' },
    { id: 4, name: 'نازنین رحیمی', email: 'nazanin@example.com', role: 'کاربر عادی', joinDate: '۱۴۰۴/۰۳/۰۵', status: 'فعال' },
    { id: 5, name: 'رضا کریمی', email: 'reza@example.com', role: 'مدیر', joinDate: '۱۴۰۳/۱۱/۲۰', status: 'فعال' },
  ]);

  // مقدار اولیه تاریخ (امروز) برای جلوگیری از null
  useEffect(() => {
    const today = new Date();
    const defaultDate: DayValue = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    setNewUserForm(prev => ({ ...prev, joinDate: defaultDate }));
    setEditUserForm(prev => ({ ...prev, joinDate: defaultDate }));
  }, []);

  const showMessage = (title: string, message: string) => {
    setMessageModal({ isOpen: true, title, message });
  };

  const formatDate = (date: DayValue): string => {
    if (!date || !date.year || !date.month || !date.day) return '';
    return `${date.year}/${String(date.month).padStart(2, '0')}/${String(date.day).padStart(2, '0')}`;
  };

  const parseDate = (dateString: string): DayValue => {
    const [year, month, day] = dateString.split('/').map(Number);
    return { year, month, day };
  };

  const handleAddUser = () => {
    setNewUserForm({
      name: '',
      email: '',
      role: 'کاربر عادی',
      joinDate: null,
      status: 'فعال'
    });
    setShowAddModal(true);
  };

  const confirmAddUser = () => {
    if (!newUserForm.name || !newUserForm.email || !newUserForm.joinDate) {
      showMessage('خطا', 'لطفاً همه فیلدها را پر کنید');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUserForm.email)) {
      showMessage('خطا', 'لطفاً یک ایمیل معتبر وارد کنید');
      return;
    }

    const newUser: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role,
      joinDate: formatDate(newUserForm.joinDate),
      status: newUserForm.status
    };

    setUsers([...users, newUser]);
    setShowAddModal(false);
    setNewUserForm({ name: '', email: '', role: 'کاربر عادی', joinDate: null, status: 'فعال' });
    showMessage('موفقیت', 'کاربر جدید با موفقیت اضافه شد');
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!userToDelete) return;
    
    setUsers(users.filter(user => user.id !== userToDelete.id));
    setShowDeleteModal(false);
    setUserToDelete(null);
    showMessage('موفقیت', 'کاربر با موفقیت حذف شد');
  };

  const handleEditClick = (user: User) => {
    setUserToEdit(user);
    setEditUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      joinDate: parseDate(user.joinDate),
      status: user.status
    });
    setShowEditModal(true);
  };

  const confirmEdit = () => {
    if (!userToEdit || !editUserForm.name || !editUserForm.email || !editUserForm.joinDate) {
      showMessage('خطا', 'لطفاً همه فیلدها را پر کنید');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editUserForm.email)) {
      showMessage('خطا', 'لطفاً یک ایمیل معتبر وارد کنید');
      return;
    }

    setUsers(users.map(u => 
      u.id === userToEdit.id ? { 
        ...u, 
        name: editUserForm.name, 
        email: editUserForm.email, 
        role: editUserForm.role, 
        joinDate: formatDate(editUserForm.joinDate), 
        status: editUserForm.status 
      } : u
    ));
    setShowEditModal(false);
    setUserToEdit(null);
    showMessage('موفقیت', 'کاربر با موفقیت ویرایش شد');
  };

  const handleMailClick = (user: User) => {
    setUserToMail(user);
    setMailMessage('');
    setShowMailModal(true);
  };

  const confirmMail = () => {
    if (!userToMail || !mailMessage) return;
    
    setShowMailModal(false);
    setUserToMail(null);
    showMessage('موفقیت', `ایمیل با موفقیت به ${userToMail.email} ارسال شد`);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'همه نقش‌ها' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'همه وضعیت‌ها' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <>
      <Helmet>
        <title>مدیریت کاربران | کتاب‌خانه</title>
      </Helmet>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">مدیریت کاربران</h1>
          <button 
            onClick={handleAddUser}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <UserPlus className="h-5 w-5" />
            افزودن کاربر جدید
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="جستجو در کاربران..."
                className="w-full pr-10 py-2 px-4 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="w-full py-2 px-4 border rounded-lg"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option>همه نقش‌ها</option>
              <option>مدیر</option>
              <option>کاربر عادی</option>
            </select>
            <select 
              className="w-full py-2 px-4 border rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>همه وضعیت‌ها</option>
              <option>فعال</option>
              <option>غیرفعال</option>
            </select>
          </div>
        </div>

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
              {filteredUsers.map((user) => (
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

      {/* Add User Modal */}
      <CustomModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="افزودن کاربر جدید"
        message="اطلاعات کاربر جدید را وارد کنید:"
        onConfirm={confirmAddUser}
        confirmText="ثبت"
        cancelText="انصراف"
      >
        <div className="space-y-4 mt-2">
          <input
            type="text"
            value={newUserForm.name}
            onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
            placeholder="نام"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="email"
            value={newUserForm.email}
            onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
            placeholder="ایمیل"
            className="w-full p-2 border rounded-lg"
          />
          <select
            value={newUserForm.role}
            onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="کاربر عادی">کاربر عادی</option>
            <option value="مدیر">مدیر</option>
          </select>
          <DatePicker
            value={newUserForm.joinDate}
            onChange={(date) => setNewUserForm({ ...newUserForm, joinDate: date || null })}
            locale="fa"
            shouldHighlightWeekends
            wrapperClassName="w-full"
            inputClassName="w-full p-2 border rounded-lg"
            inputPlaceholder="تاریخ عضویت را انتخاب کنید"
            calendarClassName="react-calendar"
          />
          <select
            value={newUserForm.status}
            onChange={(e) => setNewUserForm({ ...newUserForm, status: e.target.value })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="فعال">فعال</option>
            <option value="غیرفعال">غیرفعال</option>
          </select>
        </div>
      </CustomModal>

      {/* Delete Modal */}
      <CustomModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="تایید حذف کاربر"
        message={`آیا از حذف کاربر "${userToDelete?.name}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        onConfirm={confirmDelete}
        confirmText="حذف"
        cancelText="انصراف"
      />

      {/* Edit Modal */}
      <CustomModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="ویرایش کاربر"
        message="اطلاعات جدید کاربر را وارد کنید:"
        onConfirm={confirmEdit}
        confirmText="ثبت"
        cancelText="انصراف"
      >
        <div className="space-y-4 mt-2">
          <input
            type="text"
            value={editUserForm.name}
            onChange={(e) => setEditUserForm({ ...editUserForm, name: e.target.value })}
            placeholder="نام"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="email"
            value={editUserForm.email}
            onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })}
            placeholder="ایمیل"
            className="w-full p-2 border rounded-lg"
          />
          <select
            value={editUserForm.role}
            onChange={(e) => setEditUserForm({ ...editUserForm, role: e.target.value })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="کاربر عادی">کاربر عادی</option>
            <option value="مدیر">مدیر</option>
          </select>
          <DatePicker
            value={editUserForm.joinDate}
            onChange={(date) => setEditUserForm({ ...editUserForm, joinDate: date || null })}
            locale="fa"
            shouldHighlightWeekends
            wrapperClassName="w-full"
            inputClassName="w-full p-2 border rounded-lg"
            inputPlaceholder="تاریخ عضویت را انتخاب کنید"
            calendarClassName="react-calendar"
          />
          <select
            value={editUserForm.status}
            onChange={(e) => setEditUserForm({ ...editUserForm, status: e.target.value })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="فعال">فعال</option>
            <option value="غیرفعال">غیرفعال</option>
          </select>
        </div>
      </CustomModal>

      {/* Mail Modal */}
      <CustomModal
        isOpen={showMailModal}
        onClose={() => setShowMailModal(false)}
        title="ارسال ایمیل"
        message="پیام خود را برای ارسال به کاربر وارد کنید:"
        onConfirm={confirmMail}
        confirmText="ارسال"
        cancelText="انصراف"
      >
        <textarea
          value={mailMessage}
          onChange={(e) => setMailMessage(e.target.value)}
          className="w-full mt-2 p-2 border rounded-lg"
          rows={4}
        />
      </CustomModal>

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