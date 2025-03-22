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

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">داشبورد مدیریت</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 p-6 transform transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stat.value}</h3>
                </div>
                <stat.icon className="h-8 w-8 text-primary-700 dark:text-primary-300" />
              </div>
              <div className="mt-4">
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stat.change}
                </span>
                <span className="text-gray-600 dark:text-gray-300 text-sm"> نسبت به ماه قبل</span>
              </div>
            </div>
          ))}
        </div>

        {/* Top Books */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">محبوب‌ترین کتاب‌ها</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto font-sans border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <th className="py-3 px-4 text-gray-900 dark:text-white text-right">نام کتاب</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white text-right">نویسنده</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white text-right">تعداد فروش</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white text-right">قیمت</th>
                </tr>
              </thead>
              <tbody>
                {topBooks.map((book) => (
                  <tr key={book.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white text-right truncate">{book.title}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white text-right truncate">{book.author}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white text-right">{book.sales}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white text-right">{book.price} تومان</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">کاربران فعال اخیر</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto font-sans border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <th className="py-3 px-4 text-gray-900 dark:text-white text-right">نام کاربر</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white text-right">ایمیل</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white text-right">آخرین فعالیت</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white text-right">تعداد سفارشات</th>
                </tr>
              </thead>
              <tbody>
                {activeUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white text-right truncate">{user.name}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white text-right truncate">{user.email}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white text-right">{user.lastActivity}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white text-right">{user.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">سفارشات اخیر</h2>
            <select 
              className="w-48 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
          <div className="overflow-x-auto">
            <table className="w-full table-fixed font-sans border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <th className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">
                    <button 
                      onClick={() => handleSort('id')} 
                      className="flex items-center justify-center gap-1 w-full text-center"
                    >
                      شماره سفارش
                      {sortConfig.key === 'id' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="w-[20%] py-3 px-2 text-gray-900 dark:text-white text-center">
                    <button 
                      onClick={() => handleSort('customer')} 
                      className="flex items-center justify-center gap-1 w-full text-center"
                    >
                      مشتری
                      {sortConfig.key === 'customer' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">
                    <button 
                      onClick={() => handleSort('date')} 
                      className="flex items-center justify-center gap-1 w-full text-center"
                    >
                      تاریخ
                      {sortConfig.key === 'date' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="w-[20%] py-3 px-2 text-gray-900 dark:text-white text-center">
                    <button 
                      onClick={() => handleSort('status')} 
                      className="flex items-center justify-center gap-1 w-full text-center"
                    >
                      وضعیت
                      {sortConfig.key === 'status' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">
                    <button 
                      onClick={() => handleSort('amount')} 
                      className="flex items-center justify-center gap-1 w-full text-center"
                    >
                      مبلغ
                      {sortConfig.key === 'amount' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
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

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-0">
              <div className="flex items-center gap-2">
                <label className="text-gray-900 dark:text-white">تعداد در هر صفحه:</label>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
              <span className="text-gray-900 dark:text-white">
                نمایش {startIndex + 1}-{endIndex} از {sortedOrders.length} سفارش
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === 1
                      ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
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
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === totalPages
                      ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={goToPageInput}
                  onChange={(e) => setGoToPageInput(e.target.value)}
                  placeholder="شماره صفحه"
                  className="w-24 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="1"
                  max={totalPages}
                />
                <button
                  onClick={handleGoToPage}
                  className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
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
            className="fixed bottom-6 left-6 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
      </div>
    </>
  );
};

export default Dashboard;