import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar />
      <div className="flex-1 mr-64">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;