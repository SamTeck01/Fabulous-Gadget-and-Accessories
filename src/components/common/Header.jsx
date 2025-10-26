import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserIcon, ShoppingCart01Icon, Search01Icon, Menu01Icon, Moon02Icon, Sun03Icon, FavouriteIcon, Settings02Icon, Logout03Icon, ArrowDown01Icon as ChevronDownIcon } from 'hugeicons-react';
import logo from '../../assets/img/fabulous-logo.png'
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { useState, useRef, useEffect } from 'react';
import { getTopBrandProducts } from '../../data/phones';
import { getAllLaptopProducts } from '../../data/laptops';
import MobileSidebar from './MobileSidebar';

export default function Header() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search products as user types
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const phones = getTopBrandProducts();
      const laptops = getAllLaptopProducts();
      const allProducts = [...phones, ...laptops];
      
      const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5); // Limit to 5 results
      
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle clicking on a search result
  const handleResultClick = (product) => {
    setSearchQuery('');
    setShowSearchResults(false);
    navigate(`/product/${product.id}`);
  };
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <>
      <header className="bg-white dark:bg-ash shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-3 py-3 flex items-center justify-between gap-4">
          {/* Left Side - Logo */}
          <div className='flex items-center space-x-3 flex-shrink-0'>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors"
            >
              <Menu01Icon size={24} />
            </button>

            <Link to='/' id='logo' className='flex items-center space-x-3'>
              <img 
                src={logo}
                alt="Sam Teck"
                className="h-12 md:h-14 w-fit"
              />
              <span className='hidden md:block'>
                <p className='text-xl font-medium text-gray-800 dark:text-white'>Sam Teck</p>
              </span>
            </Link>
          </div>

          {/* Center - Search Bar (Desktop Only) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search01Icon 
                size={20} 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none z-10"
              />
              <input
                type="text"
                placeholder="Search Product"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold2 focus:border-transparent transition-all"
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-slideDown">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleResultClick(product)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {product.brand || 'Electronics'}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gold2">
                        ₦{product.price}
                      </p>
                    </button>
                  ))}
                  <button
                    type="submit"
                    onClick={handleSearchSubmit}
                    className="w-full px-4 py-3 text-sm text-center text-gold2 hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700 font-medium"
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>
              )}
              
              {/* No Results */}
              {showSearchResults && searchQuery.trim() && searchResults.length === 0 && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 z-50 animate-slideDown">
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    No products found for "{searchQuery}"
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Right Side - Icons */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            {/* Search Button - Mobile Only */}
            <button 
              onClick={() => navigate('/search')}
              className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors ring-2 ring-gray-100 hover:ring-gold2 rounded-full"
              aria-label="Search"
            >
              <Search01Icon size={20} />
            </button>

            {/* Wishlist - Desktop Only */}
            <Link 
              to="/wishlist"
              className="relative hidden md:flex p-2 text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors ring-2 ring-gray-100 rounded-full"
              aria-label="Wishlist"
            >
              <FavouriteIcon size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-[3px] -right-[3px] bg-red-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            {/* Cart Button */}
            <button 
              onClick={() => navigate('/cart')}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors relative ring-2 ring-gray-100 rounded-full cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingCart01Icon size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-[3px] -right-[3px] bg-gold2 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 md:space-x-4 px-2 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                aria-label="Profile menu"
              >
                {/* Profile Avatar */}
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gold2 to-yellow-600 flex items-center justify-center text-white font-semibold shadow-md flex-shrink-0">
                  <UserIcon size={20} />
                </div>
                
                {/* User Info - Hidden on mobile */}
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Hi, Welcome</span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-white leading-tight">Guest</span>
                </div>

                {/* Chevron Icon */}
                <ChevronDownIcon 
                  size={18} 
                  className={`hidden md:block text-gray-700 dark:text-gray-200 transition-transform duration-300 ${
                    isProfileDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Modern Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-slideDown">
                  {/* User Info Section */}
                  <div className="px-4 py-3 bg-gradient-to-r from-gold2/10 to-yellow-600/10 dark:from-gold2/20 dark:to-yellow-600/20 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">Guest User</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">guest@samteck.com</p>
                  </div>

                  {/* Desktop Only - Navigation Links */}
                  <div className="hidden lg:block border-b border-gray-200 dark:border-gray-700">
                    <NavLink
                      to="/phone-deals"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          isActive ? 'text-gold2 bg-gold2/5' : 'text-gray-700 dark:text-gray-200'
                        }`
                      }
                    >
                      <span className="mr-3">📱</span>
                      <span>Phones</span>
                    </NavLink>
                    <NavLink
                      to="/laptop-deals"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          isActive ? 'text-gold2 bg-gold2/5' : 'text-gray-700 dark:text-gray-200'
                        }`
                      }
                    >
                      <span className="mr-3">💻</span>
                      <span>Laptops</span>
                    </NavLink>
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        navigate('/phone-deals');
                      }}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="mr-3">🎧</span>
                      <span>Accessories</span>
                    </button>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    {/* Wishlist - Mobile Only */}
                    <Link
                      to="/wishlist"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="md:hidden flex items-center justify-between px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center">
                        <FavouriteIcon size={18} className="mr-3 text-red-500" />
                        <span>Wishlist</span>
                      </div>
                      {wishlistCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>

                    <button
                      onClick={() => {
                        toggleDarkMode();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center">
                        {isDarkMode ? (
                          <Sun03Icon size={18} className="mr-3 text-yellow-500" />
                        ) : (
                          <Moon02Icon size={18} className="mr-3 text-blue-500" />
                        )}
                        <span>Theme</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {isDarkMode ? 'Dark' : 'Light'}
                      </span>
                    </button>

                    <button
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Settings02Icon size={18} className="mr-3 text-gray-500" />
                      <span>Settings</span>
                    </button>
                  </div>

                  {/* Logout Section */}
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="w-full flex items-center px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Logout03Icon size={18} className="mr-3" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
