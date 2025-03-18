import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  Download,
  AlertCircle
} from 'lucide-react';

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

const initialBooks: Book[] = [
  {
    id: 1,
    title: "سووشون",
    author: "سیمین دانشور",
    price: "۸۵،۰۰۰ تومان",
    stock: 12,
    status: "available",
    category: "رمان",
    format: "physical"
  },
  {
    id: 2,
    title: "بوف کور",
    author: "صادق هدایت",
    price: "۹۵،۰۰۰ تومان",
    stock: 8,
    status: "available",
    category: "رمان",
    format: "physical"
  },
  {
    id: 3,
    title: "کیمیاگر",
    author: "پائولو کوئیلو",
    price: "۱۲۰،۰۰۰ تومان",
    stock: 0,
    status: "unavailable",
    category: "رمان",
    format: "physical"
  },
  {
    id: 4,
    title: "صد سال تنهایی",
    author: "گابریل گارسیا مارکز",
    price: "۱۵۰،۰۰۰ تومان",
    stock: 5,
    status: "available",
    category: "رمان",
    format: "physical"
  },
  {
    id: 5,
    title: "فیزیک کوانتوم",
    author: "استیون هاوکینگ",
    price: "۲۰۰،۰۰۰ تومان",
    stock: 3,
    status: "available",
    category: "علمی",
    format: "digital"
  },
  {
    id: 6,
    title: "هنر جنگ",
    author: "سون تزو",
    price: "۷۵،۰۰۰ تومان",
    stock: 15,
    status: "available",
    category: "علمی",
    format: "physical"
  },
  {
    id: 7,
    title: "مزرعه حیوانات",
    author: "جورج اورول",
    price: "۱۱۰،۰۰۰ تومان",
    stock: 0,
    status: "preorder",
    category: "رمان",
    format: "physical"
  }
];

const AdminBooks = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  // Filter books based on search term, category, and format
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.includes(searchTerm) || 
                         book.author.includes(searchTerm);
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    const matchesFormat = !selectedFormat || book.format === selectedFormat;
    
    return matchesSearch && matchesCategory && matchesFormat;
  });

  const handleAddBook = () => {
    // TODO: Implement add book functionality
    alert("این قابلیت به زودی اضافه خواهد شد");
  };

  const handleEditBook = (book: Book) => {
    // TODO: Implement edit book functionality
    alert(`ویرایش کتاب: ${book.title}`);
  };

  const handleDeleteBook = (book: Book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      setBooks(books.filter(b => b.id !== bookToDelete.id));
      setShowDeleteModal(false);
      setBookToDelete(null);
    }
  };

  const getStatusBadgeClass = (status: Book['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'unavailable':
        return 'bg-red-100 text-red-800';
      case 'preorder':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
          <h1 className="text-2xl font-bold">مدیریت کتاب‌ها</h1>
          <button 
            onClick={handleAddBook}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            افزودن کتاب جدید
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو در کتاب‌ها..."
                className="w-full pr-10 py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">همه دسته‌بندی‌ها</option>
              <option value="رمان">رمان</option>
              <option value="علمی">علمی</option>
            </select>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">همه فرمت‌ها</option>
              <option value="physical">چاپی</option>
              <option value="digital">الکترونیک</option>
            </select>
          </div>
        </div>

        {/* Books Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-right py-4 px-6">عنوان</th>
                <th className="text-right py-4 px-6">نویسنده</th>
                <th className="text-right py-4 px-6">قیمت</th>
                <th className="text-right py-4 px-6">موجودی</th>
                <th className="text-right py-4 px-6">وضعیت</th>
                <th className="text-right py-4 px-6">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{book.title}</td>
                  <td className="py-4 px-6">{book.author}</td>
                  <td className="py-4 px-6">{book.price}</td>
                  <td className="py-4 px-6">{book.stock}</td>
                  <td className="py-4 px-6">
                    <span className={`${getStatusBadgeClass(book.status)} px-2 py-1 rounded-full text-sm`}>
                      {getStatusText(book.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditBook(book)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteBook(book)}
                        className="text-red-600 hover:text-red-800 transition-colors"
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
              <h3 className="text-lg font-semibold">تایید حذف کتاب</h3>
            </div>
            <p className="text-gray-600 mb-6">
              آیا از حذف کتاب "{bookToDelete?.title}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.
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
    </>
  );
};

export default AdminBooks;