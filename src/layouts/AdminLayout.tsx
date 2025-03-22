import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, Sun, Moon, Book, X } from 'lucide-react';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark')
  );

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <Link to="/" className="flex items-center justify-center">
            <Book className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            <span className="mr-2 text-xl font-bold text-gray-900 dark:text-white">کتاب‌خانه</span>
          </Link>

          <button
            onClick={toggleDarkMode}
            className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Sidebar - Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 shadow-lg z-40 transform transition-transform duration-300 md:hidden ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:block fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="pt-16 md:mr-64">
        <Outlet context={{ isSidebarOpen }} /> {/* پاس دادن isSidebarOpen به صورت context */}
      </div>
    </div>
  );
};

export default AdminLayout;