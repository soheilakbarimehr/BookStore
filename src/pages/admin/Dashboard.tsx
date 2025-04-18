import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  BookOpen, 
  Users, 
  ShoppingCart, 
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  date: string;
  status: string;
  amount: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  sales: number;
  price: string;
}

interface ActiveUser {
  id: number;
  name: string;
  email: string;
  lastActivity: string;
  orders: number;
}

const Dashboard = () => {
  const stats = [
    { title: 'کل فروش', value: '۱۲،۵۰۰،۰۰۰ تومان', icon: DollarSign, change: '+12%' },
    { title: 'سفارشات', value: '۱۲۴', icon: ShoppingCart, change: '+8%' },
    { title: 'کاربران', value: '۱،۲۳۴', icon: Users, change: '+23%' },
    { title: 'کتاب‌ها', value: '۴۵۶', icon: BookOpen, change: '+4%' },
  ];

  const recentOrders: Order[] = [
    { id: '۱۲۳۴', customer: 'علی محمدی', date: '۱۴۰۴/۰۱/۰۱', status: 'در حال پردازش', amount: '۲۵۰،۰۰۰' },
    { id: '۱۲۳۳', customer: 'مریم احمدی', date: '۱۴۰۴/۰۱/۰۱', status: 'تحویل شده', amount: '۱۸۰،۰۰۰' },
    { id: '۱۲۳۵', customer: 'رضا کریمی', date: '۱۴۰۴/۰۱/۰۲', status: 'لغو شده', amount: '۳۲۰،۰۰۰' },
    { id: '۱۲۳۶', customer: 'زهرا نوری', date: '۱۴۰۴/۰۱/۰۳', status: 'ارسال شده', amount: '۴۱۰،۰۰۰' },
    { id: '۱۲۳۷', customer: 'امیر تهرانی', date: '۱۴۰۴/۰۱/۰۴', status: 'در انتظار پرداخت', amount: '۲۹۰،۰۰۰' },
    { id: '۱۲۳۸', customer: 'فاطمه رضایی', date: '۱۴۰۴/۰۱/۰۵', status: 'تحویل شده', amount: '۳۵۰،۰۰۰' },
    { id: '۱۲۳۹', customer: 'حسین موسوی', date: '۱۴۰۴/۰۱/۰۶', status: 'در حال پردازش', amount: '۲۲۰،۰۰۰' },
    { id: '۱۲۴۰', customer: 'مریم کاظمی', date: '۱۴۰۴/۰۱/۰۷', status: 'ارسال شده', amount: '۴۸۰،۰۰۰' },
    { id: '۱۲۴۱', customer: 'امیر جعفری', date: '۱۴۰۴/۰۱/۰۸', status: 'لغو شده', amount: '۱۹۰،۰۰۰' },
    { id: '۱۲۴۲', customer: 'مهدی شریفی', date: '۱۴۰۴/۰۱/۰۹', status: 'تحویل شده', amount: '۳۷۰،۰۰۰' },
    { id: '۱۲۴۳', customer: 'لیلا قاسمی', date: '۱۴۰۴/۰۱/۱۰', status: 'در انتظار پرداخت', amount: '۲۶۰،۰۰۰' },
    { id: '۱۲۴۴', customer: 'بهرام علوی', date: '۱۴۰۴/۰۱/۱۱', status: 'در حال پردازش', amount: '۴۳۰،۰۰۰' },
    { id: '۱۲۴۵', customer: 'شیما مرادی', date: '۱۴۰۴/۰۱/۱۲', status: 'ارسال شده', amount: '۳۱۰،۰۰۰' },
    { id: '۱۲۴۶', customer: 'پیمان رستمی', date: '۱۴۰۴/۰۱/۱۳', status: 'تحویل شده', amount: '۲۷۰،۰۰۰' },
    { id: '۱۲۴۷', customer: 'آتنا نجفی', date: '۱۴۰۴/۰۱/۱۴', status: 'لغو شده', amount: '۴۲۰،۰۰۰' },
    { id: '۱۲۴۸', customer: 'کیانوش یوسفی', date: '۱۴۰۴/۰۱/۱۵', status: 'در حال پردازش', amount: '۳۳۰،۰۰۰' },
    { id: '۱۲۴۹', customer: 'الهام صادقی', date: '۱۴۰۴/۰۱/۱۶', status: 'ارسال شده', amount: '۲۹۰،۰۰۰' },
    { id: '۱۲۵۰', customer: 'کامران زمانی', date: '۱۴۰۴/۰۱/۱۷', status: 'تحویل شده', amount: '۴۱۰،۰۰۰' },
    { id: '۱۲۵۱', customer: 'مینا خسروی', date: '۱۴۰۴/۰۱/۱۸', status: 'در انتظار پرداخت', amount: '۲۵۰،۰۰۰' },
    { id: '۱۲۵۲', customer: 'فرهاد کاظمی', date: '۱۴۰۴/۰۱/۱۹', status: 'لغو شده', amount: '۳۶۰،۰۰۰' },
  ];

  const topBooks: Book[] = [
    { id: 1, title: 'شازده کوچولو', author: 'آنتوان دو سنت اگزوپری', sales: 150, price: '۱۲۰،۰۰۰' },
    { id: 2, title: 'کیمیاگر', author: 'پائولو کوئیلو', sales: 130, price: '۹۰،۰۰۰' },
    { id: 3, title: 'ملت عشق', author: 'الیف شافاک', sales: 110, price: '۱۵۰،۰۰۰' },
    { id: 4, title: 'بادبادک‌باز', author: 'خالد حسینی', sales: 95, price: '۱۳۰،۰۰۰' },
    { id: 5, title: 'صد سال تنهایی', author: 'گابریل گارسیا مارکز', sales: 80, price: '۱۶۰،۰۰۰' },
  ];

  const activeUsers: ActiveUser[] = [
    { id: 1, name: 'علی محمدی', email: 'ali@example.com', lastActivity: '۱۴۰۴/۰۱/۱۹', orders: 5 },
    { id: 2, name: 'مریم احمدی', email: 'maryam@example.com', lastActivity: '۱۴۰۴/۰۱/۱۸', orders: 3 },
    { id: 3, name: 'رضا کریمی', email: 'reza@example.com', lastActivity: '۱۴۰۴/۰۱/۱۷', orders: 4 },
    { id: 4, name: 'زهرا نوری', email: 'zahra@example.com', lastActivity: '۱۴۰۴/۰۱/۱۶', orders: 2 },
    { id: 5, name: 'امیر تهرانی', email: 'amir@example.com', lastActivity: '۱۴۰۴/۰۱/۱۵', orders: 6 },
  ];

  const [sortConfig, setSortConfig] = useState<{ key: keyof Order | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc'
  });
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [goToPageInput, setGoToPageInput] = useState<string>('');
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>('همه وضعیت‌ها');

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

  const convertAmountToNumber = (amountString: string): number => {
    const numericString = amountString.replace(/[^۰-۹0-9]/g, '')
      .replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - '۰'.charCodeAt(0) + '0'.charCodeAt(0)));
    return parseInt(numericString, 10);
  };

  const sortOrders = (orders: Order[]) => {
    if (!sortConfig.key) return orders;

    const sortedOrders = [...orders];
    sortedOrders.sort((a, b) => {
      if (sortConfig.key === 'amount') {
        const amountA = convertAmountToNumber(a.amount);
        const amountB = convertAmountToNumber(b.amount);
        return sortConfig.direction === 'asc' ? amountA - amountB : amountB - amountA;
      }

      if (sortConfig.key === 'date') {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return sortConfig.direction === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
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

    return sortedOrders;
  };

  const handleSort = (key: keyof Order) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
  };

  const filteredOrders = recentOrders.filter(order => 
    statusFilter === 'همه وضعیت‌ها' || order.status === statusFilter
  );

  const sortedOrders = sortOrders(filteredOrders);
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sortedOrders.length);
  const currentOrders = sortedOrders.slice(startIndex, endIndex);

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
      alert('لطفاً یک شماره صفحه معتبر وارد کنید');
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

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'در انتظار پرداخت':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'در حال پردازش':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'ارسال شده':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'تحویل شده':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'لغو شده':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <>
      <Helmet>
        <title>داشبورد مدیریت | کتاب‌خانه</title>
      </Helmet>

      <div className="p-4 sm:p-6">
        <h1 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">داشبورد مدیریت</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 mb-8 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="p-4 transition-all duration-300 transform border border-gray-200 rounded-lg shadow-md sm:p-6 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-300">{stat.title}</p>
                  <h3 className="mt-1 text-lg font-bold text-gray-900 sm:text-2xl dark:text-white">{stat.value}</h3>
                </div>
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-700 dark:text-primary-300" />
              </div>
              <div className="mt-2 sm:mt-4">
                <span className={`text-xs sm:text-sm ${stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-600 sm:text-sm dark:text-gray-300"> نسبت به ماه قبل</span>
              </div>
            </div>
          ))}
        </div>

        {/* Top Books */}
        <div className="p-4 mb-8 bg-white rounded-lg shadow sm:p-6 dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl dark:text-white">محبوب‌ترین کتاب‌ها</h2>
          <div className="overflow-x-auto">
            <table className="w-full font-sans border-collapse table-auto">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <th className="px-2 py-2 text-xs text-right text-gray-900 sm:px-4 sm:py-3 sm:text-sm dark:text-white">نام کتاب</th>
                  <th className="px-2 py-2 text-xs text-right text-gray-900 sm:px-4 sm:py-3 sm:text-sm dark:text-white">نویسنده</th>
                  <th className="px-2 py-2 text-xs text-right text-gray-900 sm:px-4 sm:py-3 sm:text-sm dark:text-white">تعداد فروش</th>
                  <th className="px-2 py-2 text-xs text-right text-gray-900 sm:px-4 sm:py-3 sm:text-sm dark:text-white">قیمت</th>
                </tr>
              </thead>
              <tbody>
                {topBooks.map((book) => (
                  <tr key={book.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-2 py-2 text-xs text-right text-gray-900 truncate sm:px-4 sm:py-3 sm:text-sm dark:text-white">{book.title}</td>
                    <td className="px-2 py-2 text-xs text-right text-gray-900 truncate sm:px-4 sm:py-3 sm:text-sm dark:text-white">{book.author}</td>
                    <td className="px-2 py-2 text-xs text-right text-gray-900 sm:px-4 sm:py-3 sm:text-sm dark:text-white">{book.sales}</td>
                    <td className="px-2 py-2 text-xs text-right text-gray-900 sm:px-4 sm:py-3 sm:text-sm dark:text-white">{book.price} تومان</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Users */}
        <div className="p-4 mb-8 bg-white rounded-lg shadow sm:p-6 dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl dark:text-white">کاربران فعال اخیر</h2>
          <div className="overflow-x-auto">
            <table className="w-full font-sans border-collapse table-auto">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <th className="px-2 py-2 text-xs text-right text-gray-900 sm:px-4 sm:py-3 sm:text-sm dark:text-white">نام کاربر</th>
                  <th className="px-2 py-2 text-xs text-right text-gray-900 sm:px-4 sm:py-3 sm:text-sm dark:text-white">ایمیل</th>
                  <th className="px-2 py-2 text-xs text-right text-gray-900 sm:px-4 sm:py-3 sm:text-sm dark:text-white">آخرین فعالیت</th>
                  <th className="px-2 py-2 text-xs text-right text-gray-900 sm:px-4 sm:py-3 sm:text-sm dark:text-white">تعداد سفارشات</th>
                </tr>
              </thead>
              <tbody>
                {activeUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-2 py-2 text-xs text-right text-gray-900 truncate sm:px-4 sm:py-3 sm:text-sm dark:text-white">{user.name}</td>
                    <td className="px-2 py-2 text-xs text-right text-gray-900 truncate sm:px-4 sm:py-3 sm:text-sm dark:text-white">{user.email}</td>
                    <td className="px-2 py-2 text-xs text-right text-gray-900 sm:px-4 sm:py-3 sm:text-sm dark:text-white">{user.lastActivity}</td>
                    <td className="px-2 py-2 text-xs text-right text-gray-900 sm:px-4 sm:py-3 sm:text-sm dark:text-white">{user.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="p-4 bg-white rounded-lg shadow sm:p-6 dark:bg-gray-800">
          <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">سفارشات اخیر</h2>
            <div className="flex items-center gap-2">
              <label htmlFor="status-filter" className="text-sm text-gray-900 dark:text-white sm:text-base">فیلتر وضعیت:</label>
              <select 
                id="status-filter"
                className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg sm:w-48 sm:text-base dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>همه وضعیت‌ها</option>
                <option>در انتظار پرداخت</option>
                <option>در حال پردازش</option>
                <option>ارسال شده</option>
                <option>تحویل شده</option>
                <option>لغو شده</option>
              </select>
            </div>
          </div>

          {/* نمایش به صورت جدول در دسکتاپ و تبلت */}
          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full table-fixed font-sans border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <th className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">
                    <button 
                      onClick={() => handleSort('id')} 
                      className="flex items-center justify-center w-full gap-1 text-center"
                    >
                      شماره سفارش
                      {sortConfig.key === 'id' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="w-[20%] py-3 px-2 text-gray-900 dark:text-white text-center">
                    <button 
                      onClick={() => handleSort('customer')} 
                      className="flex items-center justify-center w-full gap-1 text-center"
                    >
                      مشتری
                      {sortConfig.key === 'customer' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">
                    <button 
                      onClick={() => handleSort('date')} 
                      className="flex items-center justify-center w-full gap-1 text-center"
                    >
                      تاریخ
                      {sortConfig.key === 'date' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="w-[20%] py-3 px-2 text-gray-900 dark:text-white text-center">
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
                  <th className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">
                    <button 
                      onClick={() => handleSort('amount')} 
                      className="flex items-center justify-center w-full gap-1 text-center"
                    >
                      مبلغ
                      {sortConfig.key === 'amount' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">{order.id}</td>
                    <td className="w-[20%] py-3 px-2 text-gray-900 dark:text-white text-center truncate">{order.customer}</td>
                    <td className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">{order.date}</td>
                    <td className="w-[20%] py-3 px-2 text-center">
                      <span className={`${getStatusBadgeClass(order.status)} px-2 py-1 rounded-full text-sm`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">{order.amount} تومان</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* نمایش به صورت کارت در موبایل */}
          <div className="block space-y-4 sm:hidden">
            {currentOrders.map((order) => (
              <div key={order.id} className="p-4 border border-gray-200 rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">شماره سفارش:</span>
                    <span className="text-gray-900 dark:text-white">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">مشتری:</span>
                    <span className="text-gray-900 truncate dark:text-white">{order.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">تاریخ:</span>
                    <span className="text-gray-900 dark:text-white">{order.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">وضعیت:</span>
                    <span className={`${getStatusBadgeClass(order.status)} px-2 py-1 rounded-full text-sm`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">مبلغ:</span>
                    <span className="text-gray-900 dark:text-white">{order.amount} تومان</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-4 p-4 mt-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex flex-col items-center w-full gap-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <label htmlFor="items-per-page" className="text-sm text-gray-900 dark:text-white">تعداد در هر صفحه:</label>
                <select
                  id="items-per-page"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="px-2 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
              <span className="text-sm text-gray-900 dark:text-white">
                نمایش {startIndex + 1}-{endIndex} از {sortedOrders.length} سفارش
              </span>
            </div>

            <div className="flex flex-col items-center w-full gap-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  aria-label="صفحه قبلی"
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === 1
                      ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <div className="flex gap-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && goToPage(page)}
                      className={`px-2 sm:px-3 py-1 rounded-lg transition-colors text-sm sm:text-base ${
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
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === totalPages
                      ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={goToPageInput}
                  onChange={(e) => setGoToPageInput(e.target.value)}
                  placeholder="شماره صفحه"
                  className="w-20 px-2 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg sm:w-24 sm:px-3 sm:py-2 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  min="1"
                  max={totalPages}
                />
                <button
                  onClick={handleGoToPage}
                  aria-label="برو به صفحه مورد نظر"
                  title="برو به صفحه مورد نظر"
                  className="px-2 py-1 text-sm text-white transition-colors rounded-lg sm:px-3 sm:py-2 sm:text-base bg-primary-600 hover:bg-primary-700"
                >
                  برو
                </button>
              </div>
            </div>
          </div>
        </div>

        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            aria-label="برو به بالای صفحه"
            title="برو به بالای صفحه"
            className="fixed p-2 text-white transition-colors rounded-full shadow-lg sm:p-3 bottom-4 sm:bottom-6 left-4 sm:left-6 bg-primary-600 hover:bg-primary-700"
          >
            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>
    </>
  );
};

export default Dashboard;