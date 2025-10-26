import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import PhoneDeals from './pages/PhoneDeals';
import PhoneSession from './pages/PhoneSession';
import LaptopDeals from './pages/LaptopDeals';
import LaptopSession from './pages/LaptopSession';
import ProductDetail from './pages/ProductDetail';
import SearchResults from './pages/SearchResults';
import AdminLogin from './components/auth/AdminLogin';
import AdminPage from './components/auth/AdminPage';
import NotFound from './components/common/NotFound';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Wishlist from './pages/Wishlist';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <BrowserRouter>
              <ScrollToTop />
              <Header/>
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="phone-deals">
                    <Route index element={<PhoneDeals />} />
                    <Route path=":brand" element={<PhoneSession />} />
                    <Route path=":brand/:productId" element={<ProductDetail />} />
                  </Route>
                  <Route path="laptop-deals">
                    <Route index element={<LaptopDeals />} />
                    <Route path=":brand" element={<LaptopSession />} />
                    <Route path=":brand/:productId" element={<ProductDetail />} />
                  </Route>
                  <Route path="search" element={<SearchResults />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="order-confirmation" element={<OrderConfirmation />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="admin-login" element={<AdminLogin />} />
                  <Route path="admin-page" element={<AdminPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
              </BrowserRouter>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}