import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DealCard from '../components/deals/DealCard';
import { getFeaturedProducts, getBrands } from '../data/phones';
import ProductFilters from '../components/common/ProductFilters';

export default function PhoneDeals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  
  const allProducts = getFeaturedProducts();
  const brands = getBrands();
  
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', sortBy: 'relevance' });

  // Apply search + filters + sort
  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const parsePrice = (value) => {
      if (value === '' || value == null) return null;
      const n = Number(String(value).replace(/[,\s]/g, ''));
      return Number.isNaN(n) ? null : n;
    };

    const minP = parsePrice(filters.minPrice);
    const maxP = parsePrice(filters.maxPrice);

    let list = allProducts.filter(p => {
      const nameMatch = term === '' || p.name.toLowerCase().includes(term) || p.detailedName.toLowerCase().includes(term);
      const priceNumber = parsePrice(p.price);
      const minOk = minP == null || (priceNumber != null && priceNumber >= minP);
      const maxOk = maxP == null || (priceNumber != null && priceNumber <= maxP);
      return nameMatch && minOk && maxOk;
    });

    const sortKey = filters.sortBy;
    if (sortKey === 'price-asc' || sortKey === 'price-desc') {
      list = list.slice().sort((a, b) => {
        const pa = parsePrice(a.price) ?? Number.MAX_SAFE_INTEGER;
        const pb = parsePrice(b.price) ?? Number.MAX_SAFE_INTEGER;
        return sortKey === 'price-asc' ? pa - pb : pb - pa;
      });
    } else if (sortKey === 'name-asc' || sortKey === 'name-desc') {
      list = list.slice().sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return sortKey === 'name-asc' ? cmp : -cmp;
      });
    }

    return list;
  }, [allProducts, searchTerm, filters.minPrice, filters.maxPrice, filters.sortBy]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Phone Deals
      </h1>

      {/* Brands */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map(brand => (
            <Link
              key={brand.id}
              to={`/phone-deals/${brand.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 flex items-center justify-center hover:shadow-md transition"
            >
              <img src={brand.logo} alt={brand.name} className="h-10 object-contain" />
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Search phone products..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gold2 dark:bg-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <ProductFilters
          products={allProducts}
          value={filters}
          onChange={(next) => {
            setFilters(next);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          Showing {currentProducts.length} of {filteredProducts.length} products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {currentProducts.map(product => (
          <DealCard 
            key={product.id} 
            product={{...product, brand: 'apple'}} 
            type="phone"
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 border rounded-md ${
                currentPage === page
                  ? 'bg-gold2 text-white border-gold2'
                  : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}