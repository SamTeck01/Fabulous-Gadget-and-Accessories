import { Link, NavLink } from 'react-router-dom';
import { User, ShoppingCart, Search, Menu, Moon, Sun, Heart } from 'lucide-react';
import logo from '../../assets/img/fabulous-logo.png'
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';
import CartModal from './CartModal';
import GlobalSearch from './GlobalSearch';
import MobileSidebar from './MobileSidebar';

export default function Header() {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <>
      <header className="bg-white dark:bg-ash shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 grid grid-cols-2 lg:grid-cols-3 items-center">
          {/* Mobile Menu Button */}
          <div className='lg:hidden flex flex-row'>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to='/' id='logo' className='w-fit p-0'>
              <img 
                src={logo}
                alt="Sam Teck"
                className="h-14 w-fit "
              />
            </Link>
          </div>  

          {/* Logo */}
          <Link to='/' id='logo' className=' hidden lg:flex items-center flex-row outline-none justify-start space-x-3'>
            <img 
              src={logo}
              alt="Sam Teck"
              className="h-14 w-fit"
            />
            <span className='outline-none '>
              <p className='text-xl font-medium text-gray-800 dark:text-white'>Sam Teck</p>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 justify-center">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `font-medium text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors ${
                  isActive ? 'active_link' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/phone-deals" 
              className={({ isActive }) => 
                `font-medium text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors ${
                  isActive ? 'text-gold2' : ''
                }`
              }
            >
              Phones
            </NavLink>
            <NavLink 
              to="/laptop-deals" 
              className={({ isActive }) => 
                `font-medium text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors ${
                  isActive ? 'text-gold2' : ''
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
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button className="p-2 text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors">
              <User className="w-5 h-5" />
            </button>
            
            <Link 
              to="/wishlist"
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors relative"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-[3px] -right-[3px] bg-red-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-[3px] -right-[3px] bg-gold2 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
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
