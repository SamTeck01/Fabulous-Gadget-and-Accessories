import { Link, NavLink } from 'react-router-dom';
import { User, ShoppingCart } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/img/logo.png" 
            alt="Fabulous Gadgets" 
            className="h-12 w-auto"
          />
        </Link>

        {/* Main Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `font-medium text-gray-700 dark:text-gray-200 hover:text-light-orange transition-colors ${
                isActive ? 'text-light-orange' : ''
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
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-700 dark:text-gray-200 hover:text-light-orange transition-colors">
            <User className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-700 dark:text-gray-200 hover:text-light-orange transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-light-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
