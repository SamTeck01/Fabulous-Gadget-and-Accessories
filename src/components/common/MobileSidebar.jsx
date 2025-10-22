import { Link, NavLink } from 'react-router-dom';
import { Cancel01Icon, Home01Icon, SmartPhone01Icon, LaptopIcon, UserIcon, ShoppingCart01Icon, Search01Icon, Moon02Icon, Sun03Icon } from 'hugeicons-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

export default function MobileSidebar({ isOpen, onClose }) {
  const { cartItems } = useCart();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navigationItems = [
    { name: 'Home', path: '/', icon: Home01Icon },
    { name: 'Phones', path: '/phone-deals', icon: SmartPhone01Icon },
    { name: 'Laptops', path: '/laptop-deals', icon: LaptopIcon },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sam Teck</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <Cancel01Icon size={24} />
          </button>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gold2 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <item.icon size={20} className="mr-3" />
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              <button className="flex items-center w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <UserIcon size={20} className="mr-3" />
                Account
              </button>
              
              <button className="flex items-center w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <ShoppingCart01Icon size={20} className="mr-3" />
                Cart
                {cartCount > 0 && (
                  <span className="ml-auto bg-gold2 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={toggleDarkMode}
                className="flex items-center w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {isDarkMode ? (
                  <Sun03Icon size={20} className="mr-3" />
                ) : (
                  <Moon02Icon size={20} className="mr-3" />
                )}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
