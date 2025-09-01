import { Link, NavLink } from 'react-router-dom';
import { User, ShoppingCart } from 'lucide-react';
import logo from '../../assets/img/fabulous-logo.png'
//import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Logo */}
        <Link to='/' id='logo' className='flex items-center flex-row outline-none  '>
          <img 
            src={logo}
            alt="Alpha Tech"
            className="h-14 w-fit md:-mx-2"
          />
          <Link to='/' className='outline-none hidden md:block '>
            <p className='text-xl font-medium text-gray-800'>Alpha Tech</p>
            {/* <p className='text-sm text-ash'>GADGETS AND ACCESSORIES</p> */}
          </Link>
        </Link>

        {/* Main Navigation */}
        <nav className="hidden md:flex space-x-8 justify-center">
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
            to="/phones" 
            className={({ isActive }) => 
              `font-medium text-gray-700 dark:text-gray-200 hover:text-light-orange transition-colors ${
                isActive ? 'text-light-orange' : ''
              }`
            }
          >
            Phones
          </NavLink>
          <NavLink 
            to="/laptops" 
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
        <div className="flex items-center justify-end space-x-4 ">
          <button className="p-2 text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors cursor-pointer">
            <User className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-700 dark:text-gray-200 hover:text-gold2 transition-colors relative cursor-pointer">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-[3px] -right-[3px] bg-gold2 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </button>
          {/*<ThemeToggle />*/}
        </div>
      </div>
    </header>
  );
}
