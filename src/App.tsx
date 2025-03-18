// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Books from './pages/Books';
import Categories from './pages/Categories';
import About from './pages/About';
import NotFound from './pages/NotFound';
import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Warranty from './pages/Warranty';
import CategoryBooks from './pages/CategoryBooks';
import Cart from './pages/Cart';
import BookDetails from './pages/BookDetails';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminBooks from './pages/admin/Books';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';

// تعریف دیتای کتاب‌ها
const booksData = [
  {
    id: 1,
    title: 'سووشون',
    author: 'سیمین دانشور',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    format: 'both',
    description: 'رمانی ماندگار از ادبیات معاصر ایران که روایتگر داستانی عاشقانه در بستر تاریخ است.',
    category: 'ادبیات داستانی',
  },
  {
    id: 2,
    title: 'چشم‌هایش',
    author: 'بزرگ علوی',
    price: 92000,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    format: 'print',
    description: 'داستان عشق و هنر در دوران پرتلاطم تاریخ معاصر ایران.',
    category: 'ادبیات داستانی',
  },
  {
    id: 3,
    title: 'روانشناسی مثبت',
    author: 'نویسنده ناشناس',
    price: 78000,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    category: 'توسعه فردی',
  },
  {
    id: 4,
    title: 'تاریخ ایران باستان',
    author: 'نویسنده تاریخ',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
    category: 'تاریخ',
  },
];

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books books={booksData} />} />
          <Route path="books/:id" element={<BookDetails books={booksData} />} />
          <Route path="categories" element={<Categories />} />
          <Route path="category/:category" element={<CategoryBooks books={booksData} />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="returns" element={<Returns />} />
          <Route path="warranty" element={<Warranty />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<Dashboard />} />
  <Route path="books" element={<AdminBooks />} />
  <Route path="orders" element={<AdminOrders />} />
  <Route path="users" element={<AdminUsers />} />
  <Route path="settings" element={<AdminSettings />} />
</Route>
      </Routes>
    </CartProvider>
  );
}

export default App;