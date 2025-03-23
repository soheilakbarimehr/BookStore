import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Search,
  UserPlus,
  Edit,
  Trash2,
  Mail,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ChevronUp,
  ChevronDown
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg dark:bg-gray-800">
        <div className="flex items-center gap-3 mb-4 text-red-600 dark:text-red-400">
          <AlertCircle className="w-6 h-6" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <div className="mb-6 text-gray-600 dark:text-gray-300">
          {message}
          {children}
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 transition-colors rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {cancelText || 'بستن'}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
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
    joinDate: null as DayValue | null,
    status: 'فعال'
  });
  const [editUserForm, setEditUserForm] = useState({
    name: '',
    email: '',
    role: 'کاربر عادی',
    joinDate: null as DayValue | null,
    status: 'فعال'
  });
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [goToPageInput, setGoToPageInput] = useState<string>('');
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof User | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc'
  });

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'علی محمدی', email: 'ali@example.com', role: 'کاربر عادی', joinDate: '1404/01/01', status: 'فعال' },
    { id: 2, name: 'سارا احمدی', email: 'sara@example.com', role: 'مدیر', joinDate: '1403/12/15', status: 'فعال' },
    { id: 3, name: 'محمد حسینی', email: 'mohammad@example.com', role: 'کاربر عادی', joinDate: '1404/02/10', status: 'غیرفعال' },
    { id: 4, name: 'نازنین رحیمی', email: 'nazanin@example.com', role: 'کاربر عادی', joinDate: '1404/03/05', status: 'فعال' },
    { id: 5, name: 'رضا کریمی', email: 'reza@example.com', role: 'مدیر', joinDate: '1403/11/20', status: 'فعال' },
    { id: 6, name: 'فاطمه رضایی', email: 'fateme@example.com', role: 'کاربر عادی', joinDate: '1404/01/15', status: 'فعال' },
    { id: 7, name: 'حسین موسوی', email: 'hossein@example.com', role: 'کاربر عادی', joinDate: '1403/12/25', status: 'غیرفعال' },
    { id: 8, name: 'مریم کاظمی', email: 'maryam@example.com', role: 'مدیر', joinDate: '1404/02/01', status: 'فعال' },
    { id: 9, name: 'امیر جعفری', email: 'amir@example.com', role: 'کاربر عادی', joinDate: '1404/03/10', status: 'فعال' },
    { id: 10, name: 'زهرا نوری', email: 'zahra@example.com', role: 'کاربر عادی', joinDate: '1403/11/10', status: 'غیرفعال' },
    { id: 11, name: 'مهدی شریفی', email: 'mahdi@example.com', role: 'مدیر', joinDate: '1404/01/20', status: 'فعال' },
    { id: 12, name: 'لیلا قاسمی', email: 'leila@example.com', role: 'کاربر عادی', joinDate: '1403/12/05', status: 'فعال' },
    { id: 13, name: 'بهرام علوی', email: 'bahram@example.com', role: 'کاربر عادی', joinDate: '1404/02/15', status: 'غیرفعال' },
    { id: 14, name: 'شیما مرادی', email: 'shima@example.com', role: 'مدیر', joinDate: '1404/03/01', status: 'فعال' },
    { id: 15, name: 'پیمان رستمی', email: 'peyman@example.com', role: 'کاربر عادی', joinDate: '1403/11/15', status: 'فعال' },
    { id: 16, name: 'آتنا نجفی', email: 'atena@example.com', role: 'کاربر عادی', joinDate: '1404/01/25', status: 'فعال' },
    { id: 17, name: 'کیانوش یوسفی', email: 'kianoush@example.com', role: 'کاربر عادی', joinDate: '1403/12/10', status: 'غیرفعال' },
    { id: 18, name: 'الهام صادقی', email: 'elham@example.com', role: 'مدیر', joinDate: '1404/02/20', status: 'فعال' },
    { id: 19, name: 'کامران زمانی', email: 'kamran@example.com', role: 'کاربر عادی', joinDate: '1404/03/15', status: 'فعال' },
    { id: 20, name: 'مینا خسروی', email: 'mina@example.com', role: 'کاربر عادی', joinDate: '1403/11/25', status: 'غیرفعال' },
    { id: 21, name: 'فرهاد کاظمی', email: 'farhad@example.com', role: 'مدیر', joinDate: '1404/01/05', status: 'فعال' },
    { id: 22, name: 'نسیم شریفی', email: 'nasim@example.com', role: 'کاربر عادی', joinDate: '1403/12/20', status: 'فعال' },
    { id: 23, name: 'آرش قادری', email: 'arash@example.com', role: 'کاربر عادی', joinDate: '1404/02/05', status: 'غیرفعال' },
    { id: 24, name: 'پریناز رحمانی', email: 'parinaz@example.com', role: 'مدیر', joinDate: '1404/03/20', status: 'فعال' },
    { id: 25, name: 'سامان نعمتی', email: 'saman@example.com', role: 'کاربر عادی', joinDate: '1403/11/05', status: 'فعال' },
    { id: 26, name: 'هانیه حسینی', email: 'hanieh@example.com', role: 'کاربر عادی', joinDate: '1404/01/10', status: 'فعال' },
    { id: 27, name: 'بهزاد رجبی', email: 'behzad@example.com', role: 'کاربر عادی', joinDate: '1403/12/15', status: 'غیرفعال' },
    { id: 28, name: 'رها مرتضوی', email: 'raha@example.com', role: 'مدیر', joinDate: '1404/02/25', status: 'فعال' },
    { id: 29, name: 'امید شریعتی', email: 'omid@example.com', role: 'کاربر عادی', joinDate: '1404/03/25', status: 'فعال' },
    { id: 30, name: 'شقایق احمدی', email: 'shaghayegh@example.com', role: 'کاربر عادی', joinDate: '1403/11/30', status: 'غیرفعال' }
  ]);

  useEffect(() => {
    const today = new Date();
    const persianToday = {
      year: 1404,
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    setNewUserForm(prev => ({ ...prev, joinDate: persianToday }));
    setEditUserForm(prev => ({ ...prev, joinDate: persianToday }));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showMessage = (title: string, message: string) => {
    setMessageModal({ isOpen: true, title, message });
  };

  const formatDate = (date: DayValue | null): string => {
    if (!date || !date.year || !date.month || !date.day) return '';
    return `${date.year}/${String(date.month).padStart(2, '0')}/${String(date.day).padStart(2, '0')}`;
  };

  const parseDate = (dateString: string): DayValue => {
    const [year, month, day] = dateString.split('/').map(Number);
    if (year < 1300 || year > 1500) {
      console.warn(`سال ${year} خارج از محدوده است، به حداقل (1300) تنظیم شد.`);
      return { year: 1300, month: 1, day: 1 };
    }
    return { year, month, day };
  };

  const sortUsers = (users: User[]) => {
    if (!sortConfig.key) return users;

    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => {
      if (sortConfig.key === 'joinDate') {
        const dateA = new Date(a.joinDate.split('/').reverse().join('-'));
        const dateB = new Date(b.joinDate.split('/').reverse().join('-'));
        return sortConfig.direction === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      if (sortConfig.key === 'id') {
        return sortConfig.direction === 'asc'
          ? a.id - b.id
          : b.id - a.id;
      }

      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue, 'fa')
          : bValue.localeCompare(aValue, 'fa');
      }

      return 0;
    });

    return sortedUsers;
  };

  const handleSort = (key: keyof User) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
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
    const parsedDate = parseDate(user.joinDate);
    setEditUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      joinDate: parsedDate,
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

  const sortedUsers = sortUsers(filteredUsers);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sortedUsers.length);
  const currentUsers = sortedUsers.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleGoToPage = () => {
    const page = parseInt(goToPageInput);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setGoToPageInput('');
    } else {
      showMessage('خطا', 'لطفاً یک شماره صفحه معتبر وارد کنید');
    }
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages: (number | string)[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <>
      <Helmet>
        <title>مدیریت کاربران | کتاب‌خانه</title>
      </Helmet>

      <style>
        {`
          .DatePicker__calendarContainer {
            background-color: var(--dp-background, #fff);
            color: var(--dp-text, #212121);
            z-index: 20;
            max-height: 300px;
            overflow-y: auto;
          }
          .DatePicker__calendarContainer .Calendar__day.-selected {
            background-color: var(--dp-primary, #1e88e5);
            color: #fff;
          }
          :root.dark {
            --dp-background: #1f2937;
            --dp-text: #e5e7eb;
            --dp-primary: #3b82f6;
          }
          .DatePicker__input {
            background-color: var(--dp-input-bg, #fff);
            color: var(--dp-input-text, #212121);
            border-color: var(--dp-input-border, #d1d5db);
          }
          :root.dark .DatePicker__input {
            --dp-input-bg: #374151;
            --dp-input-text: #e5e7eb;
            --dp-input-border: #4b5563;
          }
        `}
      </style>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">مدیریت کاربران</h1>
          <button 
            onClick={handleAddUser}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-primary-600 hover:bg-primary-700"
          >
            <UserPlus className="w-5 h-5" />
            افزودن کاربر جدید
          </button>
        </div>

        <div className="p-4 mb-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative">
              <label htmlFor="search-users" className="sr-only">جستجو در کاربران</label>
              <Search className="absolute text-gray-400 right-3 top-3 dark:text-gray-300" />
              <input
                id="search-users"
                type="text"
                placeholder="جستجو در کاربران..."
                className="w-full px-4 py-2 pr-10 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="role-filter" className="text-gray-900 dark:text-white">فیلتر نقش:</label>
              <select 
                id="role-filter"
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option>همه نقش‌ها</option>
                <option>مدیر</option>
                <option>کاربر عادی</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="status-filter" className="text-gray-900 dark:text-white">فیلتر وضعیت:</label>
              <select 
                id="status-filter"
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>همه وضعیت‌ها</option>
                <option>فعال</option>
                <option>غیرفعال</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow dark:bg-gray-800">
          <table className="w-full table-fixed font-sans border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <th className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">
                  <button 
                    onClick={() => handleSort('name')} 
                    className="flex items-center justify-center w-full gap-1 text-center"
                  >
                    نام
                    {sortConfig.key === 'name' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="w-[20%] py-3 px-2 text-gray-900 dark:text-white text-center">
                  <button 
                    onClick={() => handleSort('email')} 
                    className="flex items-center justify-center w-full gap-1 text-center"
                  >
                    ایمیل
                    {sortConfig.key === 'email' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">
                  <button 
                    onClick={() => handleSort('role')} 
                    className="flex items-center justify-center w-full gap-1 text-center"
                  >
                    نقش
                    {sortConfig.key === 'role' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">
                  <button 
                    onClick={() => handleSort('joinDate')} 
                    className="flex items-center justify-center w-full gap-1 text-center"
                  >
                    تاریخ عضویت
                    {sortConfig.key === 'joinDate' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">
                  <button 
                    onClick={() => handleSort('status')} 
                    className="flex items-center justify-center w-full gap-1 text-center"
                  >
                    وضعیت
                    {sortConfig.key === 'status' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="w-[20%] py-3 px-2 text-gray-900 dark:text-white text-center">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center truncate">{user.name}</td>
                  <td className="w-[20%] py-3 px-2 text-gray-900 dark:text-white text-center truncate">{user.email}</td>
                  <td className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">{user.role}</td>
                  <td className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">{user.joinDate}</td>
                  <td className="w-[15%] py-3 px-2 text-center">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.status === 'فعال' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="w-[20%] py-3 px-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleEditClick(user)}
                        aria-label={`ویرایش کاربر ${user.name}`}
                        title={`ویرایش کاربر ${user.name}`}
                        className="text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleMailClick(user)}
                        aria-label={`ارسال ایمیل به ${user.name}`}
                        title={`ارسال ایمیل به ${user.name}`}
                        className="text-gray-600 transition-colors dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                      >
                        <Mail className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(user)}
                        aria-label={`حذف کاربر ${user.name}`}
                        title={`حذف کاربر ${user.name}`}
                        className="text-red-600 transition-colors dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between p-4 mt-4 bg-white rounded-lg shadow sm:flex-row dark:bg-gray-800">
          <div className="flex flex-col items-center gap-4 mb-4 sm:flex-row sm:mb-0">
            <div className="flex items-center gap-2">
              <label htmlFor="items-per-page" className="text-gray-900 dark:text-white">تعداد در هر صفحه:</label>
              <select
                id="items-per-page"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <span className="text-gray-900 dark:text-white">
              نمایش {startIndex + 1}-{endIndex} از {sortedUsers.length} کاربر
            </span>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                aria-label="صفحه قبلی"
                title="صفحه قبلی"
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex gap-1">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && goToPage(page)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      page === currentPage
                        ? 'bg-primary-600 text-white'
                        : typeof page === 'number'
                        ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                        : 'text-gray-500 dark:text-gray-400 cursor-default'
                    }`}
                    disabled={typeof page !== 'number'}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                aria-label="صفحه بعدی"
                title="صفحه بعدی"
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="go-to-page" className="sr-only">شماره صفحه</label>
              <input
                id="go-to-page"
                type="number"
                value={goToPageInput}
                onChange={(e) => setGoToPageInput(e.target.value)}
                placeholder="شماره صفحه"
                className="w-24 px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                min="1"
                max={totalPages}
              />
              <button
                onClick={handleGoToPage}
                className="px-3 py-2 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
              >
                برو
              </button>
            </div>
          </div>
        </div>

        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            aria-label="برو به بالای صفحه"
            title="برو به بالای صفحه"
            className="fixed p-3 text-white transition-colors rounded-full shadow-lg bottom-6 left-6 bg-primary-600 hover:bg-primary-700"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>

      <CustomModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="افزودن کاربر جدید"
        message="اطلاعات کاربر جدید را وارد کنید:"
        onConfirm={confirmAddUser}
        confirmText="ثبت"
        cancelText="انصراف"
      >
        <div className="mt-2 space-y-4">
          <div className="flex items-center gap-2">
            <label htmlFor="new-user-name" className="text-gray-600 dark:text-gray-300">نام:</label>
            <input
              id="new-user-name"
              type="text"
              value={newUserForm.name}
              onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
              placeholder="نام"
              className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="new-user-email" className="text-gray-600 dark:text-gray-300">ایمیل:</label>
            <input
              id="new-user-email"
              type="email"
              value={newUserForm.email}
              onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
              placeholder="ایمیل"
              className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="new-user-role" className="text-gray-600 dark:text-gray-300">نقش:</label>
            <select
              id="new-user-role"
              value={newUserForm.role}
              onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
              className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="کاربر عادی">کاربر عادی</option>
              <option value="مدیر">مدیر</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="new-user-join-date" className="text-gray-600 dark:text-gray-300">تاریخ عضویت:</label>
            <DatePicker
              value={newUserForm.joinDate}
              onChange={(date) => setNewUserForm({ ...newUserForm, joinDate: date })}
              locale="fa"
              minimumDate={{ year: 1300, month: 1, day: 1 }}
              maximumDate={{ year: 1500, month: 12, day: 29 }}
              shouldHighlightWeekends
              wrapperClassName="w-full"
              inputClassName="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              inputPlaceholder="تاریخ عضویت را انتخاب کنید"
              calendarClassName="react-calendar"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="new-user-status" className="text-gray-600 dark:text-gray-300">وضعیت:</label>
            <select
              id="new-user-status"
              value={newUserForm.status}
              onChange={(e) => setNewUserForm({ ...newUserForm, status: e.target.value })}
              className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="فعال">فعال</option>
              <option value="غیرفعال">غیرفعال</option>
            </select>
          </div>
        </div>
      </CustomModal>

      <CustomModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="تایید حذف کاربر"
        message={`آیا از حذف کاربر "${userToDelete?.name}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        onConfirm={confirmDelete}
        confirmText="حذف"
        cancelText="انصراف"
      />

      <CustomModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="ویرایش کاربر"
        message="اطلاعات جدید کاربر را وارد کنید:"
        onConfirm={confirmEdit}
        confirmText="ثبت"
        cancelText="انصراف"
      >
        <div className="mt-2 space-y-4">
          <div className="flex items-center gap-2">
            <label htmlFor="edit-user-name" className="text-gray-600 dark:text-gray-300">نام:</label>
            <input
              id="edit-user-name"
              type="text"
              value={editUserForm.name}
              onChange={(e) => setEditUserForm({ ...editUserForm, name: e.target.value })}
              placeholder="نام"
              className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="edit-user-email" className="text-gray-600 dark:text-gray-300">ایمیل:</label>
            <input
              id="edit-user-email"
              type="email"
              value={editUserForm.email}
              onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })}
              placeholder="ایمیل"
              className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="edit-user-role" className="text-gray-600 dark:text-gray-300">نقش:</label>
            <select
              id="edit-user-role"
              value={editUserForm.role}
              onChange={(e) => setEditUserForm({ ...editUserForm, role: e.target.value })}
              className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="کاربر عادی">کاربر عادی</option>
              <option value="مدیر">مدیر</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="edit-user-join-date" className="text-gray-600 dark:text-gray-300">تاریخ عضویت:</label>
            <DatePicker
              value={editUserForm.joinDate}
              onChange={(date) => setEditUserForm({ ...editUserForm, joinDate: date })}
              locale="fa"
              minimumDate={{ year: 1300, month: 1, day: 1 }}
              maximumDate={{ year: 1500, month: 12, day: 29 }}
              shouldHighlightWeekends
              wrapperClassName="w-full"
              inputClassName="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              inputPlaceholder="تاریخ عضویت را انتخاب کنید"
              calendarClassName="react-calendar"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="edit-user-status" className="text-gray-600 dark:text-gray-300">وضعیت:</label>
            <select
              id="edit-user-status"
              value={editUserForm.status}
              onChange={(e) => setEditUserForm({ ...editUserForm, status: e.target.value })}
              className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="فعال">فعال</option>
              <option value="غیرفعال">غیرفعال</option>
            </select>
          </div>
        </div>
      </CustomModal>

      <CustomModal
        isOpen={showMailModal}
        onClose={() => setShowMailModal(false)}
        title="ارسال ایمیل"
        message="پیام خود را برای ارسال به کاربر وارد کنید:"
        onConfirm={confirmMail}
        confirmText="ارسال"
        cancelText="انصراف"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="mail-message" className="text-gray-600 dark:text-gray-300">پیام:</label>
          <textarea
            id="mail-message"
            value={mailMessage}
            onChange={(e) => setMailMessage(e.target.value)}
            className="w-full p-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            rows={4}
          />
        </div>
      </CustomModal>

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