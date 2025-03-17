import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="books/:id" element={<BookDetails />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:category" element={<CategoryBooks />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="returns" element={<Returns />} />
        <Route path="warranty" element={<Warranty />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;