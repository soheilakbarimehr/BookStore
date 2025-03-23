import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Search,
  Eye,
  Download,
  Plus,
  AlertCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import DatePicker, { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { useOutletContext } from 'react-router-dom';

interface Order {
  id: string;
  customerName: string;
  date: string;
  total: string;
  status: 'pending_payment' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    title: string;
    quantity: number;
    price: string;
  }[];
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

const initialOrders: Order[] = [
  {
    id: "#۱۲۳۴",
    customerName: "علی محمدی",
    date: "1404/01/01",
    total: "۲۵۰،۰۰۰ تومان",
    status: "processing",
    items: [
      { title: "سووشون", quantity: 1, price: "۸۵،۰۰۰ تومان" },
      { title: "بوف کور", quantity: 2, price: "۱۶۵،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۳۵",
    customerName: "مریم حسینی",
    date: "1404/01/01",
    total: "۳۵۰،۰۰۰ تومان",
    status: "pending_payment",
    items: [
      { title: "کیمیاگر", quantity: 1, price: "۱۲۰،۰۰۰ تومان" },
      { title: "صد سال تنهایی", quantity: 1, price: "۱۵۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۳۶",
    customerName: "رضا کریمی",
    date: "1403/12/29",
    total: "۴۵۰،۰۰۰ تومان",
    status: "delivered",
    items: [
      { title: "فیزیک کوانتوم", quantity: 1, price: "۲۰۰،۰۰۰ تومان" },
      { title: "هنر جنگ", quantity: 2, price: "۲۵۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۳۷",
    customerName: "زهرا نوری",
    date: "1403/12/28",
    total: "۱۱۰،۰۰۰ تومان",
    status: "shipped",
    items: [
      { title: "مزرعه حیوانات", quantity: 1, price: "۱۱۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۳۸",
    customerName: "امیر تهرانی",
    date: "1403/12/27",
    total: "۱۷۰،۰۰۰ تومان",
    status: "cancelled",
    items: [
      { title: "بوف کور", quantity: 1, price: "۹۵،۰۰۰ تومان" },
      { title: "هنر جنگ", quantity: 1, price: "۷۵،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۳۹",
    customerName: "فاطمه احمدی",
    date: "1403/12/26",
    total: "۳۲۰،۰۰۰ تومان",
    status: "processing",
    items: [
      { title: "شازده کوچولو", quantity: 2, price: "۱۲۰،۰۰۰ تومان" },
      { title: "جزء از کل", quantity: 1, price: "۱۸۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۴۰",
    customerName: "حسین رضایی",
    date: "1403/12/25",
    total: "۲۱۰،۰۰۰ تومان",
    status: "delivered",
    items: [
      { title: "ناتور دشت", quantity: 1, price: "۹۰،۰۰۰ تومان" },
      { title: "خورشید همچنان می‌دمد", quantity: 1, price: "۱۲۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۴۱",
    customerName: "نرگس موسوی",
    date: "1403/12/24",
    total: "۴۸۰،۰۰۰ تومان",
    status: "shipped",
    items: [
      { title: "جهان در پوست گردو", quantity: 1, price: "۲۲۰،۰۰۰ تومان" },
      { title: "1984", quantity: 2, price: "۲۳۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۴۲",
    customerName: "مهدی کاظمی",
    date: "1403/12/23",
    total: "۲۹۰،۰۰۰ تومان",
    status: "pending_payment",
    items: [
      { title: "قلعه حیوانات", quantity: 1, price: "۸۰،۰۰۰ تومان" },
      { title: "هستی و زمان", quantity: 1, price: "۲۱۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۴۳",
    customerName: "سارا جعفری",
    date: "1403/12/22",
    total: "۶۵۰،۰۰۰ تومان",
    status: "delivered",
    items: [
      { title: "بینوایان", quantity: 1, price: "۳۰۰،۰۰۰ تومان" },
      { title: "جنگ و صلح", quantity: 1, price: "۳۵۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۴۴",
    customerName: "محمد حسنی",
    date: "1403/12/21",
    total: "۳۶۰،۰۰۰ تومان",
    status: "cancelled",
    items: [
      { title: "جنایت و مکافات", quantity: 1, price: "۱۶۰،۰۰۰ تومان" },
      { title: "برادران کارامازوف", quantity: 1, price: "۲۰۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۴۵",
    customerName: "لیلا رحیمی",
    date: "1403/12/20",
    total: "۲۲۰،۰۰۰ تومان",
    status: "processing",
    items: [
      { title: "غرور و تعصب", quantity: 1, price: "۱۱۰،۰۰۰ تومان" },
      { title: "عقل و احساس", quantity: 1, price: "۱۰۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۴۶",
    customerName: "بهرام شریفی",
    date: "1403/12/19",
    total: "۴۲۰،۰۰۰ تومان",
    status: "shipped",
    items: [
      { title: "کتابخانه نیمه‌شب", quantity: 1, price: "۱۴۴،۰۰۰ تومان" },
      { title: "انسان در جستجوی معنا", quantity: 2, price: "۲۸۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۴۷",
    customerName: "شیما قاسمی",
    date: "1403/12/18",
    total: "۳۷۰،۰۰۰ تومان",
    status: "delivered",
    items: [
      { title: "قدرت عادت", quantity: 1, price: "۱۲۰،۰۰۰ تومان" },
      { title: "هری پاتر و سنگ جادو", quantity: 1, price: "۱۵۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۴۸",
    customerName: "پیمان علوی",
    date: "1403/12/17",
    total: "۴۹۰،۰۰۰ تومان",
    status: "pending_payment",
    items: [
      { title: "هری پاتر و تالار اسرار", quantity: 1, price: "۱۶۰،۰۰۰ تومان" },
      { title: "ارباب حلقه‌ها: یاران حلقه", quantity: 1, price: "۲۲۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۴۹",
    customerName: "آتنا مرادی",
    date: "1403/12/16",
    total: "۳۳۰،۰۰۰ تومان",
    status: "processing",
    items: [
      { title: "ارباب حلقه‌ها: دو برج", quantity: 1, price: "۲۳۰،۰۰۰ تومان" },
      { title: "هابیت", quantity: 1, price: "۱۰۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۵۰",
    customerName: "کیانوش رستمی",
    date: "1403/12/15",
    total: "۲۷۰،۰۰۰ تومان",
    status: "shipped",
    items: [
      { title: "داستان دو شهر", quantity: 1, price: "۱۴۰،۰۰۰ تومان" },
      { title: "آرزوهای بزرگ", quantity: 1, price: "۱۳۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۵۱",
    customerName: "الهام نجفی",
    date: "1403/12/14",
    total: "۴۱۰،۰۰۰ تومان",
    status: "delivered",
    items: [
      { title: "کتاب دزد", quantity: 1, price: "۱۶۰،۰۰۰ تومان" },
      { title: "دختری که پادشاه سوئد را نجات داد", quantity: 1, price: "۱۵۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۵۲",
    customerName: "کامران یوسفی",
    date: "1403/12/13",
    total: "۲۶۰،۰۰۰ تومان",
    status: "cancelled",
    items: [
      { title: "مردی به نام اوه", quantity: 1, price: "۱۳۰،۰۰۰ تومان" },
      { title: "جهان سوفی", quantity: 1, price: "۱۳۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۵۳",
    customerName: "مینا صادقی",
    date: "1403/12/12",
    total: "۳۹۰،۰۰۰ تومان",
    status: "processing",
    items: [
      { title: "کفش‌باز", quantity: 1, price: "۱۶۰،۰۰۰ تومان" },
      { title: "اثر مرکب", quantity: 1, price: "۱۱۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۵۴",
    customerName: "فرهاد زمانی",
    date: "1403/12/11",
    total: "۴۳۰،۰۰۰ تومان",
    status: "shipped",
    items: [
      { title: "عادت‌های اتمی", quantity: 1, price: "۱۳۰،۰۰۰ تومان" },
      { title: "شدن", quantity: 1, price: "۱۷۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۵۵",
    customerName: "نسیم خسروی",
    date: "1403/12/10",
    total: "۲۵۰،۰۰۰ تومان",
    status: "delivered",
    items: [
      { title: "زندگی دومت وقتی شروع می‌شود", quantity: 1, price: "۱۲۰،۰۰۰ تومان" },
      { title: "ملت عشق", quantity: 1, price: "۱۳۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۵۶",
    customerName: "آرش کاظمی",
    date: "1403/12/09",
    total: "۳۱۰،۰۰۰ تومان",
    status: "pending_payment",
    items: [
      { title: "چهل قانون عشق", quantity: 1, price: "۱۵۰،۰۰۰ تومان" },
      { title: "سه‌شنبه‌ها با موری", quantity: 1, price: "۹۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۵۷",
    customerName: "پریناز شریفی",
    date: "1403/12/08",
    total: "۲۶۰،۰۰۰ تومان",
    status: "processing",
    items: [
      { title: "پنج نفری که در بهشت ملاقات می‌کنید", quantity: 1, price: "۱۰۰،۰۰۰ تومان" },
      { title: "کوری", quantity: 1, price: "۱۶۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۵۸",
    customerName: "سامان قادری",
    date: "1403/12/07",
    total: "۳۴۰،۰۰۰ تومان",
    status: "shipped",
    items: [
      { title: "بینایی", quantity: 1, price: "۱۷۰،۰۰۰ تومان" },
      { title: "طاعون", quantity: 1, price: "۱۱۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۵۹",
    customerName: "هانیه رحمانی",
    date: "1403/12/06",
    total: "۱۹۰،۰۰۰ تومان",
    status: "delivered",
    items: [
      { title: "بیگانه", quantity: 1, price: "۹۰،۰۰۰ تومان" },
      { title: "سووشون", quantity: 1, price: "۸۵،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۶۰",
    customerName: "بهزاد نعمتی",
    date: "1403/12/05",
    total: "۴۲۰،۰۰۰ تومان",
    status: "cancelled",
    items: [
      { title: "کیمیاگر", quantity: 2, price: "۲۴۰،۰۰۰ تومان" },
      { title: "صد سال تنهایی", quantity: 1, price: "۱۵۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۶۱",
    customerName: "رها حسینی",
    date: "1403/12/04",
    total: "۳۷۰،۰۰۰ تومان",
    status: "processing",
    items: [
      { title: "فیزیک کوانتوم", quantity: 1, price: "۲۰۰،۰۰۰ تومان" },
      { title: "هنر جنگ", quantity: 1, price: "۷۵،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۶۲",
    customerName: "امید رجبی",
    date: "1403/12/03",
    total: "۲۳۰،۰۰۰ تومان",
    status: "shipped",
    items: [
      { title: "مزرعه حیوانات", quantity: 1, price: "۱۱۰،۰۰۰ تومان" },
      { title: "شازده کوچولو", quantity: 1, price: "۶۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۶۳",
    customerName: "شقایق مرتضوی",
    date: "1403/12/02",
    total: "۴۱۰،۰۰۰ تومان",
    status: "delivered",
    items: [
      { title: "جزء از کل", quantity: 1, price: "۱۸۰،۰۰۰ تومان" },
      { title: "ناتور دشت", quantity: 1, price: "۹۰،۰۰۰ تومان" }
    ]
  }
];

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

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [startDate, setStartDate] = useState<DayValue | null>(null);
  const [endDate, setEndDate] = useState<DayValue | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showGenerateInvoiceModal, setShowGenerateInvoiceModal] = useState(false);
  const [messageModal, setMessageModal] = useState<{ isOpen: boolean; title: string; message: string }>({
    isOpen: false,
    title: '',
    message: ''
  });
  const [newInvoice, setNewInvoice] = useState({
    customerName: '',
    date: null as DayValue | null,
    status: 'pending_payment' as Order['status'],
    items: [{ title: '', quantity: 1, price: '' }],
  });
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [goToPageInput, setGoToPageInput] = useState<string>('');
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Order | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc'
  });

  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();

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

  const convertTotalToNumber = (totalString: string): number => {
    const numericString = totalString.replace(/[^۰-۹0-9]/g, '')
      .replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - '۰'.charCodeAt(0) + '0'.charCodeAt(0)));
    return parseInt(numericString, 10);
  };

  const sortOrders = (orders: Order[]) => {
    if (!sortConfig.key) return orders;

    const sortedOrders = [...orders];
    sortedOrders.sort((a, b) => {
      if (sortConfig.key === 'total') {
        const totalA = convertTotalToNumber(a.total);
        const totalB = convertTotalToNumber(b.total);
        return sortConfig.direction === 'asc' ? totalA - totalB : totalB - totalA;
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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleDownloadInvoice = (order: Order) => {
    showMessage('موفقیت', `فاکتور سفارش ${order.id} با موفقیت دانلود شد`);
  };

  const handleGenerateInvoice = () => {
    setShowGenerateInvoiceModal(true);
  };

  const confirmGenerateInvoice = () => {
    if (!newInvoice.customerName || !newInvoice.date || newInvoice.items.some(item => !item.title || !item.price)) {
      showMessage('خطا', 'لطفاً همه فیلدها را پر کنید');
      return;
    }

    const invalidPrice = newInvoice.items.some(item => isNaN(parseInt(item.price)));
    if (invalidPrice) {
      showMessage('خطا', 'قیمت باید فقط شامل اعداد باشد');
      return;
    }

    const total = newInvoice.items.reduce((sum, item) => {
      const priceNum = parseInt(item.price) || 0;
      return sum + (priceNum * item.quantity);
    }, 0);

    const newOrder: Order = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: newInvoice.customerName,
      date: formatDate(newInvoice.date),
      total: `${total.toLocaleString('fa-IR')} تومان`,
      status: newInvoice.status,
      items: newInvoice.items.map(item => ({
        title: item.title,
        quantity: item.quantity,
        price: `${parseInt(item.price).toLocaleString('fa-IR')} تومان`
      }))
    };

    setOrders([...orders, newOrder]);
    setShowGenerateInvoiceModal(false);
    setNewInvoice({ customerName: '', date: null, status: 'pending_payment', items: [{ title: '', quantity: 1, price: '' }] });
    showMessage('موفقیت', 'فاکتور جدید با موفقیت ایجاد شد');
  };

  const addItemField = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { title: '', quantity: 1, price: '' }]
    });
  };

  const updateItemField = (index: number, field: keyof Order['items'][0], value: string | number) => {
    const updatedItems = newInvoice.items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setNewInvoice({ ...newInvoice, items: updatedItems });
  };

  const getStatusBadgeClass = (status: Order['status']): string => {
    switch (status) {
      case 'pending_payment':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusText = (status: Order['status']): string => {
    switch (status) {
      case 'pending_payment':
        return 'در انتظار پرداخت';
      case 'processing':
        return 'در حال پردازش';
      case 'shipped':
        return 'ارسال شده';
      case 'delivered':
        return 'تحویل شده';
      case 'cancelled':
        return 'لغو شده';
      default:
        return status;
    }
  };

  const modalOpen = showOrderDetails || showGenerateInvoiceModal || messageModal.isOpen || isSidebarOpen;
  const datePickerClass = modalOpen ? "opacity-50 pointer-events-none" : "";

  return (
    <>
      <Helmet>
        <title>مدیریت سفارشات | کتاب‌خانه</title>
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

      <div className={modalOpen ? "opacity-50 pointer-events-none" : ""}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">مدیریت سفارشات</h1>
            <button 
              onClick={handleGenerateInvoice}
              className="flex items-center gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
            >
              <Plus className="w-5 h-5" />
              ایجاد فاکتور جدید
            </button>
          </div>

          <div className="p-4 mb-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute text-gray-400 right-3 top-3 dark:text-gray-300" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="جستجو در سفارشات..."
                  className="w-full px-4 py-2 pr-10 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="status-filter" className="text-gray-900 dark:text-white">فیلتر وضعیت:</label>
                <select
                  id="status-filter"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">همه وضعیت‌ها</option>
                  <option value="pending_payment">در انتظار پرداخت</option>
                  <option value="processing">در حال پردازش</option>
                  <option value="shipped">ارسال شده</option>
                  <option value="delivered">تحویل شده</option>
                  <option value="cancelled">لغو شده</option>
                </select>
              </div>
              <div className={datePickerClass}>
                <DatePicker
                  value={startDate}
                  onChange={setStartDate}
                  locale="fa"
                  minimumDate={{ year: 1300, month: 1, day: 1 }}
                  maximumDate={{ year: 1500, month: 12, day: 29 }}
                  shouldHighlightWeekends
                  inputPlaceholder="از تاریخ"
                  wrapperClassName="w-full"
                  inputClassName="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className={datePickerClass}>
                <DatePicker
                  value={endDate}
                  onChange={setEndDate}
                  locale="fa"
                  minimumDate={{ year: 1300, month: 1, day: 1 }}
                  maximumDate={{ year: 1500, month: 12, day: 29 }}
                  shouldHighlightWeekends
                  inputPlaceholder="تا تاریخ"
                  wrapperClassName="w-full"
                  inputClassName="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow dark:bg-gray-800">
            <table className="w-full table-fixed font-sans border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
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
                      onClick={() => handleSort('customerName')} 
                      className="flex items-center justify-center w-full gap-1 text-center"
                    >
                      مشتری
                      {sortConfig.key === 'customerName' && (
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
                  <th className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">
                    <button 
                      onClick={() => handleSort('total')} 
                      className="flex items-center justify-center w-full gap-1 text-center"
                    >
                      مبلغ کل
                      {sortConfig.key === 'total' && (
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
                {currentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">{order.id}</td>
                    <td className="w-[20%] py-3 px-2 text-gray-900 dark:text-white text-center truncate">{order.customerName}</td>
                    <td className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">{order.date}</td>
                    <td className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">{order.total}</td>
                    <td className="w-[15%] py-3 px-2 text-center">
                      <span className={`${getStatusBadgeClass(order.status)} px-2 py-1 rounded-full text-sm`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="w-[20%] py-3 px-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          aria-label={`مشاهده سفارش ${order.id}`}
                          title={`مشاهده سفارش ${order.id}`}
                          className="text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDownloadInvoice(order)}
                          aria-label={`دانلود فاکتور سفارش ${order.id}`}
                          title={`دانلود فاکتور سفارش ${order.id}`}
                          className="text-gray-600 transition-colors dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                        >
                          <Download className="w-5 h-5" />
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
                نمایش {startIndex + 1}-{endIndex} از {sortedOrders.length} سفارش
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
                <input
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
      </div>

      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl p-6 mx-4 bg-white rounded-lg dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">جزئیات سفارش {selectedOrder.id}</h3>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-300">نام مشتری</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">تاریخ سفارش</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.date}</p>
                </div>
              </div>
              <div>
                <p className="mb-2 text-gray-600 dark:text-gray-300">اقلام سفارش</p>
                <div className="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-600">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <th className="px-4 py-2 text-right text-gray-900 dark:text-white">عنوان</th>
                        <th className="px-4 py-2 text-right text-gray-900 dark:text-white">تعداد</th>
                        <th className="px-4 py-2 text-right text-gray-900 dark:text-white">قیمت</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                          <td className="px-4 py-2 text-gray-900 dark:text-white">{item.title}</td>
                          <td className="px-4 py-2 text-gray-900 dark:text-white">{item.quantity}</td>
                          <td className="px-4 py-2 text-gray-900 dark:text-white">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-600 dark:text-gray-300">مبلغ کل</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{selectedOrder.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <CustomModal
        isOpen={showGenerateInvoiceModal}
        onClose={() => setShowGenerateInvoiceModal(false)}
        title="ایجاد فاکتور جدید"
        message=""
        onConfirm={confirmGenerateInvoice}
        confirmText="ایجاد"
        cancelText="انصراف"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={newInvoice.customerName}
            onChange={(e) => setNewInvoice({ ...newInvoice, customerName: e.target.value })}
            placeholder="نام مشتری"
            className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <div className={modalOpen ? "opacity-50 pointer-events-none" : ""}>
            <DatePicker
              value={newInvoice.date}
              onChange={(date) => setNewInvoice({ ...newInvoice, date })}
              locale="fa"
              minimumDate={{ year: 1300, month: 1, day: 1 }}
              maximumDate={{ year: 1500, month: 12, day: 29 }}
              shouldHighlightWeekends
              inputPlaceholder="انتخاب تاریخ"
              wrapperClassName="w-full"
              inputClassName="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="invoice-status" className="text-gray-600 dark:text-gray-300">وضعیت:</label>
            <select
              id="invoice-status"
              value={newInvoice.status}
              onChange={(e) => setNewInvoice({ ...newInvoice, status: e.target.value as Order['status'] })}
              className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="pending_payment">در انتظار پرداخت</option>
              <option value="processing">در حال پردازش</option>
              <option value="shipped">ارسال شده</option>
              <option value="delivered">تحویل شده</option>
              <option value="cancelled">لغو شده</option>
            </select>
          </div>
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-300">اقلام فاکتور</p>
            {newInvoice.items.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateItemField(index, 'title', e.target.value)}
                  placeholder="عنوان"
                  className="w-1/3 p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItemField(index, 'quantity', parseInt(e.target.value) || 1)}
                  min="1"
                  placeholder="تعداد"
                  className="w-1/3 p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  value={item.price}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    updateItemField(index, 'price', value);
                  }}
                  placeholder="قیمت (فقط عدد)"
                  className="w-1/3 p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            ))}
            <button
              onClick={addItemField}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              + افزودن قلم دیگر
            </button>
          </div>
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

export default AdminOrders;