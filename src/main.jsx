// main.jsx
import './index.css';
import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import LoadingSpinner from './components/common/LoadingSpinner';

const App = lazy(() => import('./App'));

const root = createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<LoadingSpinner fullScreen />}>
    <App />
  </Suspense>
);

// App.jsx - Update routes with lazy loading
const Home = lazy(() => import('./pages/Home'));
const PhoneDeals = lazy(() => import('./pages/PhoneDeals'));
const PhoneSession = lazy(() => import('./pages/PhoneSession'));
const LaptopDeals = lazy(() => import('./pages/LaptopDeals'));
const LaptopSession = lazy(() => import('./pages/LaptopSession'));
const AdminLogin = lazy(() => import('./components/auth/AdminLogin'));
const AdminPage = lazy(() => import('./components/auth/AdminPage'));
const NotFound = lazy(() => import('./components/common/NotFound'));