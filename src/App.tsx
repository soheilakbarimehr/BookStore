import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { HomeContentProvider } from './context/HomeContentContext';
import { AboutContentProvider } from './context/AboutContentContext';
import { BooksContentProvider } from './context/BooksContentContext';
import { CategoriesProvider } from './context/CategoriesContentContext';
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
import Checkout from './pages/CheckOut';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminBooks from './pages/admin/Books';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';
import CategoriesSettings from './pages/admin/CategoriesSettings';
import BooksSettings from './pages/admin/BooksSettings';
import HomeSettings from './pages/admin/HomeSettings';
import AboutSettings from './pages/admin/AboutSettings';

function App() {

  return (
    <CartProvider>
      <HomeContentProvider>
        <AboutContentProvider>
          <BooksContentProvider>
            <CategoriesProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="books" element={<Books />} />
                  <Route path="books/:id" element={<BookDetails />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="category/:category" element={<CategoryBooks />} />
                  <Route path="about" element={<About />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="shipping" element={<Shipping />} />
                  <Route path="returns" element={<Returns />} />
                  <Route path="warranty" element={<Warranty />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="books" element={<AdminBooks />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="page-settings">
                    <Route path="categories" element={<CategoriesSettings />} />
                    <Route path="books" element={<BooksSettings />} />
                    <Route path="home" element={<HomeSettings />} />
                    <Route path="about" element={<AboutSettings />} />
                  </Route>
                </Route>
              </Routes>
            </CategoriesProvider>
          </BooksContentProvider>
        </AboutContentProvider>
      </HomeContentProvider>
    </CartProvider>
  );
}

export default App;