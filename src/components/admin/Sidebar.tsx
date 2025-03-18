import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  Users,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'داشبورد' },
    { path: '/admin/books', icon: BookOpen, label: 'کتاب‌ها' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'سفارشات' },
    { path: '/admin/users', icon: Users, label: 'کاربران' },
    { path: '/admin/settings', icon: Settings, label: 'تنظیمات' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 h-screen w-64 fixed right-0 top-0 shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">پنل مدیریت</h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-0 w-full p-6 border-t dark:border-gray-700">
        <button className="flex items-center gap-3 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
          <LogOut className="h-5 w-5" />
          خروج
        </button>
      </div>
    </div>
  );
};

export default Sidebar;