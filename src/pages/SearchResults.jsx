import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import DealCard from '../components/deals/DealCard';
import { getFeaturedProducts } from '../data/phones';
import { getAllLaptopProducts } from '../data/laptops';
import { Search01Icon, FilterIcon, Sorting01Icon } from 'hugeicons-react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('name');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const allProducts = [
    ...getFeaturedProducts().map(p => ({ ...p, type: 'phone', category: 'Phones' })),
    ...getAllLaptopProducts().map(p => ({ ...p, type: 'laptop', category: 'Laptops' }))
  ];

  // Filter and sort products
  const filteredProducts = allProducts
    .filter(product => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) ||
                          product.detailedName.toLowerCase().includes(query.toLowerCase());
      const matchesType = filterType === 'all' || product.type === filterType;
      return matchesQuery && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price.replace(/,/g, '')) - parseFloat(b.price.replace(/,/g, ''));
        case 'price-high':
          return parseFloat(b.price.replace(/,/g, '')) - parseFloat(a.price.replace(/,/g, ''));
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search changes
  }, [query, filterType, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Search01Icon size={24} className="text-gold2 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Search Results
          </h1>
        </div>
        
        {query && (
          <p className="text-gray-600 dark:text-gray-300">
            Showing results for "<span className="font-semibold text-gold2">{query}</span>"
          </p>
        )}
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FilterIcon size={16} className="text-gray-500 mr-2" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold2"
            >
              <option value="all">All Products</option>
              <option value="phone">Phones</option>
              <option value="laptop">Laptops</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <Sorting01Icon size={16} className="text-gray-500 mr-2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold2"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="text-gray-600 dark:text-gray-300">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Results */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <Search01Icon size={64} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Try adjusting your search terms or filters
          </p>
          <Link
            to="/phone-deals"
            className="inline-block bg-gold2 hover:bg-dark-orange text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
            {currentProducts.map(product => (
              <DealCard 
                key={`${product.type}-${product.id}`} 
                product={{...product, brand: product.type === 'phone' ? 'apple' : 'hp'}} 
                type={product.type}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
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
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
