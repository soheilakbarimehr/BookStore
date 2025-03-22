import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  stock: number;
  status: 'available' | 'unavailable' | 'preorder';
  category: string;
  format: 'physical' | 'digital';
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

const initialBooks: Book[] = [
  { id: 1, title: "سووشون", author: "سیمین دانشور", price: "۸۵،۰۰۰ تومان", stock: 12, status: "available", category: "رمان", format: "physical" },
  { id: 2, title: "بوف کور", author: "صادق هدایت", price: "۹۵،۰۰۰ تومان", stock: 8, status: "available", category: "رمان", format: "physical" },
  { id: 3, title: "کیمیاگر", author: "پائولو کوئیلو", price: "۱۲۰،۰۰۰ تومان", stock: 0, status: "unavailable", category: "رمان", format: "physical" },
  { id: 4, title: "صد سال تنهایی", author: "گابریل گارسیا مارکز", price: "۱۵۰،۰۰۰ تومان", stock: 5, status: "available", category: "رمان", format: "physical" },
  { id: 5, title: "فیزیک کوانتوم", author: "استیون هاوکینگ", price: "۲۰۰،۰۰۰ تومان", stock: 3, status: "available", category: "علمی", format: "digital" },
  { id: 6, title: "هنر جنگ", author: "سون تزو", price: "۷۵،۰۰۰ تومان", stock: 15, status: "available", category: "علمی", format: "physical" },
  { id: 7, title: "مزرعه حیوانات", author: "جورج اورول", price: "۱۱۰،۰۰۰ تومان", stock: 0, status: "preorder", category: "رمان", format: "physical" },
  { id: 8, title: "شازده کوچولو", author: "آنتوان دو سنت‌اگزوپری", price: "۶۰،۰۰۰ تومان", stock: 20, status: "available", category: "رمان", format: "physical" },
  { id: 9, title: "جزء از کل", author: "استیو تولتز", price: "۱۸۰،۰۰۰ تومان", stock: 2, status: "available", category: "رمان", format: "physical" },
  { id: 10, title: "ناتور دشت", author: "جی.دی. سلینجر", price: "۹۰،۰۰۰ تومان", stock: 0, status: "unavailable", category: "رمان", format: "physical" },
  { id: 11, title: "خورشید همچنان می‌دمد", author: "ارنست همینگوی", price: "۱۳۰،۰۰۰ تومان", stock: 7, status: "available", category: "رمان", format: "physical" },
  { id: 12, title: "جهان در پوست گردو", author: "استیون هاوکینگ", price: "۲۲۰،۰۰۰ تومان", stock: 1, status: "preorder", category: "علمی", format: "digital" },
  { id: 13, title: "1984", author: "جورج اورول", price: "۱۱۵،۰۰۰ تومان", stock: 4, status: "available", category: "رمان", format: "physical" },
  { id: 14, title: "قلعه حیوانات", author: "جورج اورول", price: "۸۰،۰۰۰ تومان", stock: 10, status: "available", category: "رمان", format: "physical" },
  { id: 15, title: "هستی و زمان", author: "مارتین هایدگر", price: "۲۵۰،۰۰۰ تومان", stock: 0, status: "unavailable", category: "علمی", format: "physical" },
  { id: 16, title: "بینوایان", author: "ویکتور هوگو", price: "۳۰۰،۰۰۰ تومان", stock: 6, status: "available", category: "رمان", format: "physical" },
  { id: 17, title: "جنگ و صلح", author: "لئو تولستوی", price: "۳۵۰،۰۰۰ تومان", stock: 3, status: "available", category: "رمان", format: "physical" },
  { id: 18, title: "جنایت و مکافات", author: "فئودور داستایوفسکی", price: "۱۶۰،۰۰۰ تومان", stock: 0, status: "preorder", category: "رمان", format: "physical" },
  { id: 19, title: "برادران کارامازوف", author: "فئودور داستایوفسکی", price: "۲۰۰،۰۰۰ تومان", stock: 5, status: "available", category: "رمان", format: "physical" },
  { id: 20, title: "غرور و تعصب", author: "جین آستین", price: "۱۱۰،۰۰۰ تومان", stock: 8, status: "available", category: "رمان", format: "physical" },
  { id: 21, title: "عقل و احساس", author: "جین آستین", price: "۱۰۰،۰۰۰ تومان", stock: 0, status: "unavailable", category: "رمان", format: "physical" },
  { id: 22, title: "کتابخانه نیمه‌شب", author: "مت هیگ", price: "۱۴۰،۰۰۰ تومان", stock: 12, status: "available", category: "رمان", format: "physical" },
  { id: 23, title: "انسان در جستجوی معنا", author: "ویکتور فرانکل", price: "۹۰،۰۰۰ تومان", stock: 15, status: "available", category: "علمی", format: "physical" },
  { id: 24, title: "قدرت عادت", author: "چارلز داهیگ", price: "۱۲۰،۰۰۰ تومان", stock: 7, status: "available", category: "علمی", format: "digital" },
  { id: 25, title: "هری پاتر و سنگ جادو", author: "جی.کی. رولینگ", price: "۱۵۰،۰۰۰ تومان", stock: 20, status: "available", category: "رمان", format: "physical" },
  { id: 26, title: "هری پاتر و تالار اسرار", author: "جی.کی. رولینگ", price: "۱۶۰،۰۰۰ تومان", stock: 18, status: "available", category: "رمان", format: "physical" },
  { id: 27, title: "هری پاتر و زندانی آزکابان", author: "جی.کی. رولینگ", price: "۱۷۰،۰۰۰ تومان", stock: 0, status: "unavailable", category: "رمان", format: "physical" },
  { id: 28, title: "ارباب حلقه‌ها: یاران حلقه", author: "جی.آر.آر. تالکین", price: "۲۲۰،۰۰۰ تومان", stock: 5, status: "available", category: "رمان", format: "physical" },
  { id: 29, title: "ارباب حلقه‌ها: دو برج", author: "جی.آر.آر. تالکین", price: "۲۳۰،۰۰۰ تومان", stock: 4, status: "available", category: "رمان", format: "physical" },
  { id: 30, title: "ارباب حلقه‌ها: بازگشت پادشاه", author: "جی.آر.آر. تالکین", price: "۲۴۰،۰۰۰ تومان", stock: 0, status: "preorder", category: "رمان", format: "physical" },
  { id: 31, title: "هابیت", author: "جی.آر.آر. تالکین", price: "۱۲۰،۰۰۰ تومان", stock: 10, status: "available", category: "رمان", format: "physical" },
  { id: 32, title: "داستان دو شهر", author: "چارلز دیکنز", price: "۱۴۰،۰۰۰ تومان", stock: 6, status: "available", category: "رمان", format: "physical" },
  { id: 33, title: "آرزوهای بزرگ", author: "چارلز دیکنز", price: "۱۳۰،۰۰۰ تومان", stock: 0, status: "unavailable", category: "رمان", format: "physical" },
  { id: 34, title: "کتاب دزد", author: "مارکوس زوساک", price: "۱۶۰،۰۰۰ تومان", stock: 8, status: "available", category: "رمان", format: "physical" },
  { id: 35, title: "دختری که پادشاه سوئد را نجات داد", author: "یوناس یوناسون", price: "۱۵۰،۰۰۰ تومان", stock: 3, status: "available", category: "رمان", format: "physical" },
  { id: 36, title: "مردی به نام اوه", author: "فردریک بکمن", price: "۱۳۰،۰۰۰ تومان", stock: 12, status: "available", category: "رمان", format: "physical" },
  { id: 37, title: "جهان سوفی", author: "یوستین گوردر", price: "۱۸۰،۰۰۰ تومان", stock: 0, status: "preorder", category: "علمی", format: "physical" },
  { id: 38, title: "کفش‌باز", author: "فیل نایت", price: "۱۶۰،۰۰۰ تومان", stock: 5, status: "available", category: "علمی", format: "digital" },
  { id: 39, title: "اثر مرکب", author: "دارن هاردی", price: "۱۱۰،۰۰۰ تومان", stock: 10, status: "available", category: "علمی", format: "physical" },
  { id: 40, title: "عادت‌های اتمی", author: "جیمز کلیر", price: "۱۳۰،۰۰۰ تومان", stock: 15, status: "available", category: "علمی", format: "digital" },
  { id: 41, title: "شدن", author: "میشل اوباما", price: "۱۷۰،۰۰۰ تومان", stock: 7, status: "available", category: "علمی", format: "physical" },
  { id: 42, title: "زندگی دومت وقتی شروع می‌شود", author: "رافائل ژیوردانو", price: "۱۲۰،۰۰۰ تومان", stock: 0, status: "unavailable", category: "رمان", format: "physical" },
  { id: 43, title: "ملت عشق", author: "الیف شافاک", price: "۱۴۰،۰۰۰ تومان", stock: 20, status: "available", category: "رمان", format: "physical" },
  { id: 44, title: "چهل قانون عشق", author: "الیف شافاک", price: "۱۵۰،۰۰۰ تومان", stock: 18, status: "available", category: "رمان", format: "physical" },
  { id: 45, title: "سه‌شنبه‌ها با موری", author: "میچ آلبوم", price: "۹۰،۰۰۰ تومان", stock: 0, status: "unavailable", category: "رمان", format: "physical" },
  { id: 46, title: "پنج نفری که در بهشت ملاقات می‌کنید", author: "میچ آلبوم", price: "۱۰۰،۰۰۰ تومان", stock: 5, status: "available", category: "رمان", format: "physical" },
  { id: 47, title: "کوری", author: "ژوزه ساراماگو", price: "۱۶۰،۰۰۰ تومان", stock: 3, status: "available", category: "رمان", format: "physical" },
  { id: 48, title: "بینایی", author: "ژوزه ساراماگو", price: "۱۷۰،۰۰۰ تومان", stock: 0, status: "preorder", category: "رمان", format: "physical" },
  { id: 49, title: "طاعون", author: "آلبر کامو", price: "۱۱۰،۰۰۰ تومان", stock: 8, status: "available", category: "رمان", format: "physical" },
  { id: 50, title: "بیگانه", author: "آلبر کامو", price: "۹۰،۰۰۰ تومان", stock: 10, status: "available", category: "رمان", format: "physical" }
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-4">
          <AlertCircle className="h-6 w-6" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <div className="text-gray-600 dark:text-gray-300 mb-6">
          {message}
          {children}
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
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

const AdminBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [messageModal, setMessageModal] = useState<{ isOpen: boolean; title: string; message: string }>({
    isOpen: false,
    title: '',
    message: ''
  });
  const [editForm, setEditForm] = useState<Partial<Book>>({});
  const [newBookForm, setNewBookForm] = useState<Partial<Book>>({
    title: '',
    author: '',
    price: '',
    stock: 0,
    status: 'available',
    category: 'رمان',
    format: 'physical'
  });
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [goToPageInput, setGoToPageInput] = useState<string>('');
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Book | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc'
  });

  const showMessage = (title: string, message: string) => {
    setMessageModal({ isOpen: true, title, message });
  };

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

  const convertPriceToNumber = (priceString: string): number => {
    // Remove non-numeric characters and convert Persian numbers to English
    const numericString = priceString.replace(/[^۰-۹0-9]/g, '')
      .replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - '۰'.charCodeAt(0) + '0'.charCodeAt(0)));
    return parseInt(numericString, 10);
  };

 const sortBooks = (books: Book[]) => {
  if (!sortConfig.key) return books;

  const sortedBooks = [...books];
  sortedBooks.sort((a, b) => {
    if (sortConfig.key === 'price') {
      const priceA = convertPriceToNumber(a.price);
      const priceB = convertPriceToNumber(b.price);
      return sortConfig.direction === 'asc' ? priceA - priceB : priceB - priceA;
    }

    const aValue = a[sortConfig.key!];
    const bValue = b[sortConfig.key!];

    // برای مقادیر عددی (مثل stock)
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    // برای مقادیر رشته‌ای (مثل title, author, status)
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue, 'fa')
        : bValue.localeCompare(aValue, 'fa');
    }

    return 0;
  });

  return sortedBooks;
};
  const handleSort = (key: keyof Book) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    const matchesFormat = !selectedFormat || book.format === selectedFormat;
    return matchesSearch && matchesCategory && matchesFormat;
  });

  const sortedBooks = sortBooks(filteredBooks);
  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sortedBooks.length);
  const currentBooks = sortedBooks.slice(startIndex, endIndex);

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

  const handleAddBook = () => {
    setNewBookForm({
      title: '',
      author: '',
      price: '',
      stock: 0,
      status: 'available',
      category: 'رمان',
      format: 'physical'
    });
    setShowAddModal(true);
  };

  const confirmAddBook = () => {
    if (!newBookForm.title || !newBookForm.author || !newBookForm.price || newBookForm.stock === undefined) {
      showMessage('خطا', 'لطفاً همه فیلدها را پر کنید');
      return;
    }

    const priceNum = parseInt(newBookForm.price.replace(/[^0-9]/g, ''));
    if (isNaN(priceNum)) {
      showMessage('خطا', 'قیمت باید فقط شامل اعداد باشد');
      return;
    }

    const newBook: Book = {
      id: Math.max(...books.map(b => b.id)) + 1,
      title: newBookForm.title,
      author: newBookForm.author,
      price: `${priceNum.toLocaleString('fa-IR')} تومان`,
      stock: newBookForm.stock,
      status: newBookForm.status || 'available',
      category: newBookForm.category || 'رمان',
      format: newBookForm.format || 'physical'
    };

    setBooks([...books, newBook]);
    setShowAddModal(false);
    setNewBookForm({
      title: '',
      author: '',
      price: '',
      stock: 0,
      status: 'available',
      category: 'رمان',
      format: 'physical'
    });
    showMessage('موفقیت', 'کتاب جدید با موفقیت اضافه شد');
  };

  const handleEditBook = (book: Book) => {
    setBookToEdit(book);
    setEditForm({
      title: book.title,
      author: book.author,
      price: book.price.replace(/[^0-9]/g, ''),
      stock: book.stock,
      status: book.status,
      category: book.category,
      format: book.format
    });
    setShowEditModal(true);
  };

  const confirmEdit = () => {
    if (!bookToEdit || !editForm.title || !editForm.author || !editForm.price || editForm.stock === undefined) {
      showMessage('خطا', 'لطفاً همه فیلدها را پر کنید');
      return;
    }

    const priceNum = parseInt(editForm.price);
    if (isNaN(priceNum)) {
      showMessage('خطا', 'قیمت باید فقط شامل اعداد باشد');
      return;
    }

    setBooks(books.map(b => 
      b.id === bookToEdit.id ? { 
        ...b, 
        ...editForm, 
        price: `${priceNum.toLocaleString('fa-IR')} تومان` 
      } as Book : b
    ));
    setShowEditModal(false);
    setBookToEdit(null);
    showMessage('موفقیت', 'کتاب با موفقیت ویرایش شد');
  };

  const handleDeleteBook = (book: Book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!bookToDelete) return;

    setBooks(books.filter(b => b.id !== bookToDelete.id));
    setShowDeleteModal(false);
    setBookToDelete(null);
    showMessage('موفقیت', 'کتاب با موفقیت حذف شد');
  };

  const getStatusBadgeClass = (status: Book['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'unavailable':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'preorder':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusText = (status: Book['status']) => {
    switch (status) {
      case 'available':
        return 'موجود';
      case 'unavailable':
        return 'ناموجود';
      case 'preorder':
        return 'پیش‌فروش';
      default:
        return status;
    }
  };

  return (
    <>
      <Helmet>
        <title>مدیریت کتاب‌ها | کتاب‌خانه</title>
      </Helmet>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">مدیریت کتاب‌ها</h1>
          <button 
            onClick={handleAddBook}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            افزودن کتاب جدید
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو در کتاب‌ها..."
                className="w-full pr-10 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">همه دسته‌بندی‌ها</option>
              <option value="رمان">رمان</option>
              <option value="علمی">علمی</option>
            </select>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">همه فرمت‌ها</option>
              <option value="physical">چاپی</option>
              <option value="digital">الکترونیک</option>
            </select>
          </div>
        </div>
<div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
  <table className="w-full table-fixed font-sans border-collapse min-w-[800px]">
    <thead>
      <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <th className="w-[22%] py-3 px-2 text-gray-900 dark:text-white text-center">
          <button 
            onClick={() => handleSort('title')} 
            className="flex items-center justify-center gap-1 w-full text-center"
          >
            عنوان
            {sortConfig.key === 'title' && (
              sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </th>
        <th className="w-[22%] py-3 px-2 text-gray-900 dark:text-white text-center">
          <button 
            onClick={() => handleSort('author')} 
            className="flex items-center justify-center gap-1 w-full text-center"
          >
            نویسنده
            {sortConfig.key === 'author' && (
              sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </th>
        <th className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">
          <button 
            onClick={() => handleSort('price')} 
            className="flex items-center justify-center gap-1 w-full text-center"
          >
            قیمت
            {sortConfig.key === 'price' && (
              sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </th>
        <th className="w-[12%] py-3 px-2 text-gray-900 dark:text-white text-center">
          <button 
            onClick={() => handleSort('stock')} 
            className="flex items-center justify-center gap-1 w-full text-center"
          >
            موجودی
            {sortConfig.key === 'stock' && (
              sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </th>
        <th className="w-[12%] py-3 px-2 text-gray-900 dark:text-white text-center">
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
        <th className="w-[17%] py-3 px-2 text-gray-900 dark:text-white text-center">
          عملیات
        </th>
      </tr>
    </thead>
    <tbody>
      <AnimatePresence>
        {currentBooks.map((book) => (
          <motion.tr
            key={book.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td className="w-[22%] py-3 px-2 text-gray-900 dark:text-white text-center truncate">{book.title}</td>
            <td className="w-[22%] py-3 px-2 text-gray-900 dark:text-white text-center truncate">{book.author}</td>
            <td className="w-[15%] py-3 px-2 text-gray-900 dark:text-white text-center">{book.price}</td>
            <td className="w-[12%] py-3 px-2 text-gray-900 dark:text-white text-center">{book.stock}</td>
            <td className="w-[12%] py-3 px-2 text-center">
              <span className={`${getStatusBadgeClass(book.status)} px-2 py-1 rounded-full text-sm`}>
                {getStatusText(book.status)}
              </span>
            </td>
            <td className="w-[17%] py-3 px-2 text-center">
              <div className="flex gap-2 justify-center">
                <button 
                  onClick={() => handleEditBook(book)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleDeleteBook(book)}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </td>
          </motion.tr>
        ))}
      </AnimatePresence>
    </tbody>
  </table>
</div>
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
                <option value={50}>50</option>
              </select>
            </div>
            <span className="text-gray-900 dark:text-white">
              نمایش {startIndex + 1}-{endIndex} از {sortedBooks.length} کتاب
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

        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
      </div>

      <CustomModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="افزودن کتاب جدید"
        message="اطلاعات کتاب جدید را وارد کنید:"
        onConfirm={confirmAddBook}
        confirmText="ثبت"
        cancelText="انصراف"
      >
        <div className="space-y-4 mt-2">
          <input
            type="text"
            value={newBookForm.title || ''}
            onChange={(e) => setNewBookForm({ ...newBookForm, title: e.target.value })}
            placeholder="عنوان"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            value={newBookForm.author || ''}
            onChange={(e) => setNewBookForm({ ...newBookForm, author: e.target.value })}
            placeholder="نویسنده"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <div className="flex items-center gap-2">
            <span className="text-gray-900 dark:text-white">تومان</span>
            <input
              type="text"
              value={newBookForm.price || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setNewBookForm({ ...newBookForm, price: value });
              }}
              placeholder="قیمت (فقط عدد)"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <input
            type="number"
            value={newBookForm.stock || 0}
            onChange={(e) => setNewBookForm({ ...newBookForm, stock: parseInt(e.target.value) || 0 })}
            min="0"
            placeholder="موجودی"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <select
            value={newBookForm.status || 'available'}
            onChange={(e) => setNewBookForm({ ...newBookForm, status: e.target.value as Book['status'] })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="available">موجود</option>
            <option value="unavailable">ناموجود</option>
            <option value="preorder">پیش‌فروش</option>
          </select>
          <select
            value={newBookForm.category || 'رمان'}
            onChange={(e) => setNewBookForm({ ...newBookForm, category: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="رمان">رمان</option>
            <option value="علمی">علمی</option>
          </select>
          <select
            value={newBookForm.format || 'physical'}
            onChange={(e) => setNewBookForm({ ...newBookForm, format: e.target.value as Book['format'] })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="physical">چاپی</option>
            <option value="digital">الکترونیک</option>
          </select>
        </div>
      </CustomModal>

      <CustomModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="تایید حذف کتاب"
        message={`آیا از حذف کتاب "${bookToDelete?.title}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        onConfirm={confirmDelete}
        confirmText="حذف"
        cancelText="انصراف"
      />

      <CustomModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="ویرایش کتاب"
        message="اطلاعات جدید کتاب را وارد کنید:"
        onConfirm={confirmEdit}
        confirmText="ثبت"
        cancelText="انصراف"
      >
        <div className="space-y-4 mt-2">
          <input
            type="text"
            value={editForm.title || ''}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            placeholder="عنوان"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            value={editForm.author || ''}
            onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
            placeholder="نویسنده"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <div className="flex items-center gap-2">
            <span className="text-gray-900 dark:text-white">تومان</span>
            <input
              type="text"
              value={editForm.price || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setEditForm({ ...editForm, price: value });
              }}
              placeholder="قیمت (فقط عدد)"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <input
            type="number"
            value={editForm.stock || 0}
            onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value) || 0 })}
            min="0"
            placeholder="موجودی"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <select
            value={editForm.status || ''}
            onChange={(e) => setEditForm({ ...editForm, status: e.target.value as Book['status'] })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="available">موجود</option>
            <option value="unavailable">ناموجود</option>
            <option value="preorder">پیش‌فروش</option>
          </select>
          <select
            value={editForm.category || ''}
            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="رمان">رمان</option>
            <option value="علمی">علمی</option>
          </select>
          <select
            value={editForm.format || ''}
            onChange={(e) => setEditForm({ ...editForm, format: e.target.value as Book['format'] })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="physical">چاپی</option>
            <option value="digital">الکترونیک</option>
          </select>
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

export default AdminBooks;