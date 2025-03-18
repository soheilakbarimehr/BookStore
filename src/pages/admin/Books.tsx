import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Plus,
  Search,
  Edit,
  Trash2,
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

  const showMessage = (title: string, message: string) => {
    setMessageModal({ isOpen: true, title, message });
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    const matchesFormat = !selectedFormat || book.format === selectedFormat;
    return matchesSearch && matchesCategory && matchesFormat;
  });

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
      id: Math.max(...books.map(b => b.id)) + 1, // Generate new ID
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
      price: book.price,
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

    const priceNum = parseInt(editForm.price.replace(/[^0-9]/g, ''));
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
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
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

      {/* Add Book Modal */}
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
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            value={newBookForm.author || ''}
            onChange={(e) => setNewBookForm({ ...newBookForm, author: e.target.value })}
            placeholder="نویسنده"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            value={newBookForm.price || ''}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
              setNewBookForm({ ...newBookForm, price: value });
            }}
            placeholder="قیمت (فقط عدد)"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="number"
            value={newBookForm.stock || 0}
            onChange={(e) => setNewBookForm({ ...newBookForm, stock: parseInt(e.target.value) || 0 })}
            min="0"
            placeholder="موجودی"
            className="w-full p-2 border rounded-lg"
          />
          <select
            value={newBookForm.status || 'available'}
            onChange={(e) => setNewBookForm({ ...newBookForm, status: e.target.value as Book['status'] })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="available">موجود</option>
            <option value="unavailable">ناموجود</option>
            <option value="preorder">پیش‌فروش</option>
          </select>
          <select
            value={newBookForm.category || 'رمان'}
            onChange={(e) => setNewBookForm({ ...newBookForm, category: e.target.value })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="رمان">رمان</option>
            <option value="علمی">علمی</option>
          </select>
          <select
            value={newBookForm.format || 'physical'}
            onChange={(e) => setNewBookForm({ ...newBookForm, format: e.target.value as Book['format'] })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="physical">چاپی</option>
            <option value="digital">الکترونیک</option>
          </select>
        </div>
      </CustomModal>

      {/* Delete Modal */}
      <CustomModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="تایید حذف کتاب"
        message={`آیا از حذف کتاب "${bookToDelete?.title}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        onConfirm={confirmDelete}
        confirmText="حذف"
        cancelText="انصراف"
      />

      {/* Edit Modal */}
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
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            value={editForm.author || ''}
            onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
            placeholder="نویسنده"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            value={editForm.price || ''}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
              setEditForm({ ...editForm, price: value });
            }}
            placeholder="قیمت (فقط عدد)"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="number"
            value={editForm.stock || 0}
            onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value) || 0 })}
            min="0"
            placeholder="موجودی"
            className="w-full p-2 border rounded-lg"
          />
          <select
            value={editForm.status || ''}
            onChange={(e) => setEditForm({ ...editForm, status: e.target.value as Book['status'] })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="available">موجود</option>
            <option value="unavailable">ناموجود</option>
            <option value="preorder">پیش‌فروش</option>
          </select>
          <select
            value={editForm.category || ''}
            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="رمان">رمان</option>
            <option value="علمی">علمی</option>
          </select>
          <select
            value={editForm.format || ''}
            onChange={(e) => setEditForm({ ...editForm, format: e.target.value as Book['format'] })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="physical">چاپی</option>
            <option value="digital">الکترونیک</option>
          </select>
        </div>
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

export default AdminBooks;