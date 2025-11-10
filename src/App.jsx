import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';

// Landing Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategory from './pages/admin/AdminCategory';
import AdminSettings from './pages/admin/AdminSettings';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/admin/AdminLayout';

// ScrollToTop component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={
          <>
            <Navbar />
            <HomePage />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <AboutPage />
            <Footer />
          </>
        } />
        <Route path="/products" element={
          <>
            <Navbar />
            <ProductsPage />
            <Footer />
          </>
        } />
        <Route path="/products/:id" element={
          <>
            <Navbar />
            <ProductDetailPage />
            <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <ContactPage />
            <Footer />
          </>
        } />

        {/* Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <AdminLayout>
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategory />} />
              <Route path="settings" element={<AdminSettings />} />
            </Routes>
          </AdminLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;