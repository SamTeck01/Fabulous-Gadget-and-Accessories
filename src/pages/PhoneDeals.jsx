import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/deals/ProductCard';
import { getBrands } from '../data/phones';

export default function PhoneDeals() {
  const [searchTerm, setSearchTerm] = useState('');
  const brands = getBrands();

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Phone Deals
      </h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search phone brands..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-light-orange dark:bg-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredBrands.map(brand => (
          <Link 
            key={brand.id} 
            to={`/phone-deals/${brand.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
          >
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="h-16 w-auto mb-3 object-contain"
            />
            <h3 className="text-lg font-medium text-center text-gray-800 dark:text-white">
              {brand.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}