import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook01Icon, NewTwitterIcon, Instagram01Icon, Linkedin01Icon } from 'hugeicons-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-yellow-400 py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start">
        {/* Logo and description */}
        <div className="mb-6 md:mb-0 md:w-1/3">
          <h2 className="text-2xl font-bold mb-2 text-yellow-300">Fabulous Gadget</h2>
          <p className="text-yellow-300">
            Your one-stop shop for the latest and greatest gadgets.
          </p>
        </div>

        {/* Navigation links */}
        <div className="mb-6 md:mb-0 md:w-1/3 flex justify-around w-full md:w-auto">
          <div>
            <h3 className="font-semibold mb-2 text-yellow-300">Products</h3>
            <ul>
              <li><Link to="/products/phones" className="hover:underline hover:text-yellow-500">Phones</Link></li>
              <li><Link to="/products/laptops" className="hover:underline hover:text-yellow-500">Laptops</Link></li>
              <li><Link to="/products/accessories" className="hover:underline hover:text-yellow-500">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-yellow-300">Company</h3>
            <ul>
              <li><Link to="/about" className="hover:underline hover:text-yellow-500">About Us</Link></li>
              <li><Link to="/services" className="hover:underline hover:text-yellow-500">Services</Link></li>
              <li><Link to="/contact" className="hover:underline hover:text-yellow-500">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Social media and contact */}
        <div className="md:w-1/3 flex flex-col items-center md:items-end">
          <div className="flex space-x-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-80">
              <Facebook01Icon size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:opacity-80">
              <NewTwitterIcon size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80">
              <Instagram01Icon size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-80">
              <Linkedin01Icon size={24} />
            </a>
          </div>
          <p className="text-sm text-yellow-300">&copy; {new Date().getFullYear()} Fabulous Gadget. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
