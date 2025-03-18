import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  BookOpen, 
  Users, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  Package,
  AlertCircle,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'کل فروش', value: '۱۲،۵۰۰،۰۰۰ تومان', icon: DollarSign, change: '+12%' },
    { title: 'سفارشات', value: '۱۲۴', icon: ShoppingCart, change: '+8%' },
    { title: 'کاربران', value: '۱،۲۳۴', icon: Users, change: '+23%' },
    { title: 'کتاب‌ها', value: '۴۵۶', icon: BookOpen, change: '+4%' },
  ];

  const recentOrders = [
    { id: '۱۲۳۴', customer: 'علی محمدی', date: '۱۴۰۴/۰۱/۰۱', status: 'در حال پردازش', amount: '۲۵۰،۰۰۰' },
    { id: '۱۲۳۳', customer: 'مریم احمدی', date: '۱۴۰۴/۰۱/۰۱', status: 'تحویل شده', amount: '۱۸۰،۰۰۰' },
    // ... more orders
  ];

  return (
    <>
      <Helmet>
        <title>داشبورد مدیریت | کتاب‌خانه</title>
      </Helmet>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">داشبورد مدیریت</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <stat.icon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="mt-4">
                <span className="text-green-500 text-sm">{stat.change}</span>
                <span className="text-gray-500 text-sm"> نسبت به ماه قبل</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">سفارشات اخیر</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-3 px-4">شماره سفارش</th>
                  <th className="text-right py-3 px-4">مشتری</th>
                  <th className="text-right py-3 px-4">تاریخ</th>
                  <th className="text-right py-3 px-4">وضعیت</th>
                  <th className="text-right py-3 px-4">مبلغ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4">{order.status}</td>
                    <td className="py-3 px-4">{order.amount} تومان</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;