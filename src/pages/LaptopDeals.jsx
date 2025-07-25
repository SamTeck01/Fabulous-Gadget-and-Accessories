import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLaptopBrands } from '../data/laptops';
import SearchBar from '../components/common/SearchBar';

export default function LaptopDeals() {
  const [searchTerm, setSearchTerm] = useState('');
  const brands = getLaptopBrands();

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Laptop Deals
      </h1>

      <SearchBar 
        placeholder="Search laptop brands..."
        value={searchTerm}
        onChange={setSearchTerm}
        className="mb-8"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredBrands.map(brand => (
          <Link 
            key={brand.id} 
            to={`/laptop-deals/${brand.id}`}
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