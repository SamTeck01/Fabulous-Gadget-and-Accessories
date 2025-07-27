import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import PhoneDeals from './pages/PhoneDeals';
import PhoneSession from './pages/PhoneSession';
import LaptopDeals from './pages/LaptopDeals';
import LaptopSession from './pages/LaptopSession';
import AdminLogin from './components/auth/AdminLogin';
import AdminPage from './components/auth/AdminPage';
//import Layout from './components/common/';
import NotFound from './components/common/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="phones">
            <Route index element={<PhoneDeals />} />
            <Route path=":brand" element={<PhoneSession />} />
          </Route>
          <Route path="laptops">
            <Route index element={<LaptopDeals />} />
            <Route path=":brand" element={<LaptopSession />} />
          </Route>
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="admin-page" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}