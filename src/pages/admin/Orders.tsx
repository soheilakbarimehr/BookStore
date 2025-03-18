import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Search,
  Eye,
  Download,
  Plus,
  AlertCircle,
  Calendar
} from 'lucide-react';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

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

interface DayObject {
  year: number;
  month: number;
  day: number;
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
    date: "۱۴۰۴/۰۱/۰۱",
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
    date: "۱۴۰۴/۰۱/۰۱",
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
    date: "۱۴۰۳/۱۲/۲۹",
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
    date: "۱۴۰۳/۱۲/۲۸",
    total: "۱۱۰،۰۰۰ تومان",
    status: "shipped",
    items: [
      { title: "مزرعه حیوانات", quantity: 1, price: "۱۱۰،۰۰۰ تومان" }
    ]
  },
  {
    id: "#۱۲۳۸",
    customerName: "امیر تهرانی",
    date: "۱۴۰۳/۱۲/۲۷",
    total: "۱۷۰،۰۰۰ تومان",
    status: "cancelled",
    items: [
      { title: "بوف کور", quantity: 1, price: "۹۵،۰۰۰ تومان" },
      { title: "هنر جنگ", quantity: 1, price: "۷۵،۰۰۰ تومان" }
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

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [startDate, setStartDate] = useState<DayObject | null>(null);
  const [endDate, setEndDate] = useState<DayObject | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showGenerateInvoiceModal, setShowGenerateInvoiceModal] = useState(false);
  const [showInvoiceDatePicker, setShowInvoiceDatePicker] = useState(false);
  const [messageModal, setMessageModal] = useState<{ isOpen: boolean; title: string; message: string }>({
    isOpen: false,
    title: '',
    message: ''
  });
  const [newInvoice, setNewInvoice] = useState({
    customerName: '',
    date: null as DayObject | null,
    status: 'pending_payment' as Order['status'],
    items: [{ title: '', quantity: 1, price: '' }],
  });

  const showMessage = (title: string, message: string) => {
    setMessageModal({ isOpen: true, title, message });
  };

  const formatDate = (date: DayObject | null): string => {
    if (!date) return '';
    return `${date.year}/${String(date.month).padStart(2, '0')}/${String(date.day).padStart(2, '0')}`;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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
        return 'bg-orange-100 text-orange-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <>
      <Helmet>
        <title>مدیریت سفارشات | کتاب‌خانه</title>
      </Helmet>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">مدیریت سفارشات</h1>
          <button 
            onClick={handleGenerateInvoice}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            ایجاد فاکتور جدید
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو در سفارشات..."
                className="w-full pr-10 py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">همه وضعیت‌ها</option>
              <option value="pending_payment">در انتظار پرداخت</option>
              <option value="processing">در حال پردازش</option>
              <option value="shipped">ارسال شده</option>
              <option value="delivered">تحویل شده</option>
              <option value="cancelled">لغو شده</option>
            </select>
            <div className="relative">
              <div 
                className="w-full py-2 px-4 border rounded-lg flex items-center justify-between cursor-pointer hover:border-blue-500"
                onClick={() => setShowStartDatePicker(true)}
              >
                <span className={startDate ? 'text-gray-900' : 'text-gray-500'}>
                  {startDate ? formatDate(startDate) : 'از تاریخ'}
                </span>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              {showStartDatePicker && (
                <div className="absolute top-full right-0 mt-1 z-50">
                  <DatePicker
                    value={startDate}
                    onChange={date => {
                      setStartDate(date);
                      setShowStartDatePicker(false);
                    }}
                    locale="fa"
                    shouldHighlightWeekends
                    inputPlaceholder="انتخاب تاریخ"
                  />
                </div>
              )}
            </div>
            <div className="relative">
              <div 
                className="w-full py-2 px-4 border rounded-lg flex items-center justify-between cursor-pointer hover:border-blue-500"
                onClick={() => setShowEndDatePicker(true)}
              >
                <span className={endDate ? 'text-gray-900' : 'text-gray-500'}>
                  {endDate ? formatDate(endDate) : 'تا تاریخ'}
                </span>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              {showEndDatePicker && (
                <div className="absolute top-full right-0 mt-1 z-50">
                  <DatePicker
                    value={endDate}
                    onChange={date => {
                      setEndDate(date);
                      setShowEndDatePicker(false);
                    }}
                    locale="fa"
                    shouldHighlightWeekends
                    inputPlaceholder="انتخاب تاریخ"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-right py-4 px-6">شماره سفارش</th>
                <th className="text-right py-4 px-6">مشتری</th>
                <th className="text-right py-4 px-6">تاریخ</th>
                <th className="text-right py-4 px-6">مبلغ کل</th>
                <th className="text-right py-4 px-6">وضعیت</th>
                <th className="text-right py-4 px-6">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{order.id}</td>
                  <td className="py-4 px-6">{order.customerName}</td>
                  <td className="py-4 px-6">{order.date}</td>
                  <td className="py-4 px-6">{order.total}</td>
                  <td className="py-4 px-6">
                    <span className={`${getStatusBadgeClass(order.status)} px-2 py-1 rounded-full text-sm`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDownloadInvoice(order)}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">جزئیات سفارش {selectedOrder.id}</h3>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">نام مشتری</p>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-gray-600">تاریخ سفارش</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-2">اقلام سفارش</p>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-right py-2 px-4">عنوان</th>
                        <th className="text-right py-2 px-4">تعداد</th>
                        <th className="text-right py-2 px-4">قیمت</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="py-2 px-4">{item.title}</td>
                          <td className="py-2 px-4">{item.quantity}</td>
                          <td className="py-2 px-4">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-gray-600">مبلغ کل</span>
                <span className="font-bold text-lg">{selectedOrder.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Invoice Modal */}
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
            className="w-full p-2 border rounded-lg"
          />
          <div className="relative">
            <div 
              className="w-full py-2 px-4 border rounded-lg flex items-center justify-between cursor-pointer hover:border-blue-500"
              onClick={() => setShowInvoiceDatePicker(true)}
            >
              <span className={newInvoice.date ? 'text-gray-900' : 'text-gray-500'}>
                {newInvoice.date ? formatDate(newInvoice.date) : 'انتخاب تاریخ'}
              </span>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            {showInvoiceDatePicker && (
              <div className="absolute top-full right-0 mt-1 z-50">
                <DatePicker
                  value={newInvoice.date}
                  onChange={date => {
                    setNewInvoice({ ...newInvoice, date });
                    setShowInvoiceDatePicker(false);
                  }}
                  locale="fa"
                  shouldHighlightWeekends
                  inputPlaceholder="انتخاب تاریخ"
                />
              </div>
            )}
          </div>
          <select
            value={newInvoice.status}
            onChange={(e) => setNewInvoice({ ...newInvoice, status: e.target.value as Order['status'] })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="pending_payment">در انتظار پرداخت</option>
            <option value="processing">در حال پردازش</option>
            <option value="shipped">ارسال شده</option>
            <option value="delivered">تحویل شده</option>
            <option value="cancelled">لغو شده</option>
          </select>
          <div>
            <p className="text-gray-600 mb-2">اقلام فاکتور</p>
            {newInvoice.items.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateItemField(index, 'title', e.target.value)}
                  placeholder="عنوان"
                  className="w-1/3 p-2 border rounded-lg"
                />
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItemField(index, 'quantity', parseInt(e.target.value) || 1)}
                  min="1"
                  placeholder="تعداد"
                  className="w-1/3 p-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={item.price}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
                    updateItemField(index, 'price', value);
                  }}
                  placeholder="قیمت (فقط عدد)"
                  className="w-1/3 p-2 border rounded-lg"
                />
              </div>
            ))}
            <button
              onClick={addItemField}
              className="text-blue-600 hover:text-blue-800"
            >
              + افزودن قلم دیگر
            </button>
          </div>
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

export default AdminOrders;