import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sorting01Icon } from 'hugeicons-react';
import DealCard from '../components/deals/DealCard';
import { getLaptopBrands, getAllLaptopProducts } from '../data/laptops';
import ModernDropdown from '../components/common/ModernDropdown';
import SearchBar from '../components/common/SearchBar';
import ProductFilters from '../components/common/ProductFilters';

export default function LaptopDeals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const brands = getLaptopBrands();
  const allProducts = useMemo(() => getAllLaptopProducts(), []);
  
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', sortBy: 'relevance', brands: [] });

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
      const brandOk = !filters.brands || filters.brands.length === 0 || filters.brands.includes(p.brand);
      return nameMatch && minOk && maxOk && brandOk;
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
  }, [allProducts, searchTerm, filters.minPrice, filters.maxPrice, filters.sortBy, filters.brands]);
  
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
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Laptop Deals</h1>

      {/* Brands */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map(brand => (
            <Link
              key={brand.id}
              to={`/laptop-deals/${brand.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 flex items-center justify-center hover:shadow-md transition"
            >
              <img src={brand.logo} alt={brand.name} className="h-10 object-contain" />
            </Link>
          ))}
        </div>
      </div>

      {/* Top controls: mobile filter button + search + sort */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
            onClick={() => setShowMobileFilters(true)}
          >
            Filters
          </button>
      <SearchBar 
        placeholder="Search laptop products..."
        value={searchTerm}
        onChange={(value) => {
          setSearchTerm(value);
              setCurrentPage(1);
            }}
            className="w-full md:w-80"
          />
        </div>
        <ModernDropdown
          value={filters.sortBy}
          onChange={(value) => setFilters({ ...filters, sortBy: value })}
          icon={Sorting01Icon}
          options={[
            { value: 'relevance', label: 'Relevance' },
            { value: 'price-asc', label: 'Price: Low to High' },
            { value: 'price-desc', label: 'Price: High to Low' },
            { value: 'name-asc', label: 'Name: A to Z' },
            { value: 'name-desc', label: 'Name: Z to A' }
          ]}
          className="w-full md:w-64"
        />
      </div>

      {/* Applied filter chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.brands?.map((b) => (
          <button key={b} className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border" onClick={() => setFilters({ ...filters, brands: filters.brands.filter(x => x !== b) })}>
            {brands.find(x => x.id === b)?.name || b} ×
          </button>
        ))}
        {(filters.minPrice || filters.maxPrice) && (
          <button className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border" onClick={() => setFilters({ ...filters, minPrice: '', maxPrice: '' })}>
            ₦{filters.minPrice || 0}–₦{filters.maxPrice || '∞'} ×
          </button>
        )}
        {(filters.brands?.length || filters.minPrice || filters.maxPrice) ? (
          <button className="px-3 py-1 text-xs rounded-full border" onClick={() => setFilters({ ...filters, brands: [], minPrice: '', maxPrice: '' })}>Clear all</button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-6">
        {/* Sidebar filters (desktop) */}
        <aside className="hidden md:block">
          <ProductFilters
            products={allProducts}
            brands={brands.map(({ id, name }) => ({ id, name }))}
            value={filters}
            onChange={(next) => {
              setFilters(next);
              setCurrentPage(1);
            }}
          />
        </aside>

        {/* Content */}
        <section>
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-300">Showing {currentProducts.length} of {filteredProducts.length} products</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {currentProducts.map(product => (
              <DealCard key={product.id} product={product} type="laptop" />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">Previous</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => handlePageChange(page)} className={`px-3 py-2 border rounded-md ${currentPage === page ? 'bg-gold2 text-white border-gold2' : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'}`}>{page}</button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">Next</button>
            </div>
          )}
        </section>
      </div>

      {/* Mobile filter drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute inset-x-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold">Filters</h3>
              <button className="text-sm" onClick={() => setShowMobileFilters(false)}>Close</button>
            </div>
            <ProductFilters
              products={allProducts}
              brands={brands.map(({ id, name }) => ({ id, name }))}
              value={filters}
              onChange={(next) => setFilters(next)}
            />
          </div>
        </div>
      )}
    </div>
  );
}