import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  Folder,
  Book,
  Home,
  Info
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'داشبورد' },
    { path: '/admin/books', icon: BookOpen, label: 'کتاب‌ها' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'سفارشات' },
    { path: '/admin/users', icon: Users, label: 'کاربران' },
    { path: '/admin/settings', icon: Settings, label: 'تنظیمات' },
    {
      label: 'تنظیمات صفحه',
      icon: Folder,
      subItems: [
        { path: '/admin/page-settings/categories', icon: Folder, label: 'دسته‌بندی‌ها' },
        { path: '/admin/page-settings/books', icon: Book, label: 'کتاب‌ها' },
        { path: '/admin/page-settings/home', icon: Home, label: 'صفحه اصلی' },
        { path: '/admin/page-settings/about', icon: Info, label: 'درباره ما' },
      ],
    },
  ];

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-6">
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.path ? location.pathname === item.path : false;
              const isSubmenuOpen = openSubmenu === item.label;

              if (item.subItems) {
                return (
                  <li key={index}>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </div>
                      {isSubmenuOpen ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    {isSubmenuOpen && (
                      <ul className="mt-2 mr-6 space-y-1">
                        {item.subItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = location.pathname === subItem.path;
                          return (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                onClick={handleClick}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                  isSubActive
                                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                                }`}
                              >
                                <SubIcon className="h-4 w-4" />
                                {subItem.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.path}>
                  <Link
                    to={item.path!}
                    onClick={handleClick}
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
      <div className="p-6 border-t dark:border-gray-700">
        <button className="flex items-center gap-3 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
          <LogOut className="h-5 w-5" />
          خروج
        </button>
      </div>
    </div>
  );
};

export default Sidebar;