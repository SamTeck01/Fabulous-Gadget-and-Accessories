import { Link, NavLink } from 'react-router-dom';
import { User, ShoppingCart, Search, Menu, Moon, Sun } from 'lucide-react';
import logo from '../../assets/img/fabulous-logo.png'
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';
import CartModal from './CartModal';
import GlobalSearch from './GlobalSearch';
import MobileSidebar from './MobileSidebar';

export default function Header() {
  const { cartItems } = useCart();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 grid grid-cols-3 items-center">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-light-orange transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to='/' id='logo' className='flex items-center flex-row outline-none justify-center lg:justify-start'>
            <img 
              src={logo}
              alt="Alpha Tech"
              className="h-14 w-fit"
            />
            <span className='outline-none hidden md:block ml-2'>
              <p className='text-xl font-medium text-gray-800 dark:text-white'>Alpha Tech</p>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 justify-center">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `font-medium text-gray-700 dark:text-gray-200 hover:text-light-orange transition-colors ${
                  isActive ? 'active_link' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/phone-deals" 
              className={({ isActive }) => 
                `font-medium text-gray-700 dark:text-gray-200 hover:text-light-orange transition-colors ${
                  isActive ? 'text-light-orange' : ''
                }`
              }
            >
              Phones
            </NavLink>
            <NavLink 
              to="/laptop-deals" 
              className={({ isActive }) => 
                `font-medium text-gray-700 dark:text-gray-200 hover:text-light-orange transition-colors ${
                  isActive ? 'text-light-orange' : ''
                }`
              }
            >
              Laptops
            </NavLink>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center justify-end space-x-2">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-light-orange transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-light-orange transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button className="p-2 text-gray-700 dark:text-gray-200 hover:text-light-orange transition-colors">
              <User className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-light-orange transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-[3px] -right-[3px] bg-light-orange text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
