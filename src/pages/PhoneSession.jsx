import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { StarIcon } from 'hugeicons-react';
import DealCard from '../components/deals/DealCard';
import { getBrandById } from '../data/phones';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SearchBar from '../components/common/SearchBar';
import ProductFilters from '../components/common/ProductFilters';

export default function PhoneSession() {
  const { brand } = useParams();
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', sortBy: 'featured', minRating: 0, inStockOnly: false });

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from API:
        // const data = await fetchBrandProducts(brand);
        const data = getBrandById(brand);
        if (!data) throw new Error('Brand not found');
        setBrandData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
  }, [brand]);
  const products = useMemo(() => brandData?.products || [], [brandData]);
  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const parsePrice = (value) => {
      if (value === '' || value == null) return null;
      const n = Number(String(value).replace(/[,\s]/g, ''));
      return Number.isNaN(n) ? null : n;
    };

    const minP = parsePrice(filters.minPrice);
    const maxP = parsePrice(filters.maxPrice);

    let list = products.filter(p => {
      const nameMatch = term === '' || p.name.toLowerCase().includes(term) || p.detailedName.toLowerCase().includes(term);
      const priceNumber = parsePrice(p.price);
      const minOk = minP == null || (priceNumber != null && priceNumber >= minP);
      const maxOk = maxP == null || (priceNumber != null && priceNumber <= maxP);
      const ratingOk = !filters.minRating || (p.rating && p.rating >= filters.minRating);
      const stockOk = !filters.inStockOnly || (p.inStock !== false);
      return nameMatch && minOk && maxOk && ratingOk && stockOk;
    });

    const sortKey = filters.sortBy;
    if (sortKey === 'featured') {
      list = list.slice().sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortKey === 'rating') {
      list = list.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortKey === 'price-asc' || sortKey === 'price-desc') {
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
  }, [products, searchTerm, filters.minPrice, filters.maxPrice, filters.sortBy, filters.minRating, filters.inStockOnly]);

  const featuredProducts = useMemo(() => products.filter(p => p.featured), [products]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-10 text-red-500 dark:text-red-400">{error}</div>;
  if (!brandData) return <div className="text-center py-10 dark:text-white">Brand not found</div>;

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{brandData.name} Phones - Fabulous Gadgets</title>
        <meta name="description" content={`Browse ${brandData.name} phones with the best prices and deals`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <img 
            src={brandData.logo} 
            alt={brandData.name} 
            className="h-16 mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {brandData.name} Phones
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {products.length} products available
            </p>
          </div>
        </div>

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <StarIcon size={24} variant="solid" color="#FF9500" />
              <h2 className="text-2xl font-bold dark:text-white">Featured Products</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <DealCard 
                  key={product.id} 
                  product={{...product, brand: brand}} 
                  type="phone"
                />
              ))}
            </div>
          </div>
        )}

        {/* All Products Section */}
        <div>
          <h2 className="text-2xl font-bold dark:text-white mb-6">All Products</h2>
          <div className="space-y-4 mb-8">
            <SearchBar 
              placeholder={`Search ${brandData.name} phones...`}
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
              className=""
            />
            <ProductFilters
              products={products}
              value={filters}
              onChange={(next) => setFilters(next)}
            />
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Showing {filteredProducts.length} of {products.length} products
          </p>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No products match your filters</p>
              <button
                onClick={() => setFilters({ minPrice: '', maxPrice: '', sortBy: 'featured', minRating: 0, inStockOnly: false })}
                className="mt-4 px-6 py-2 bg-gold2 text-white rounded-lg hover:bg-gold2/90 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {filteredProducts.map(product => (
                <DealCard 
                  key={product.id} 
                  product={{...product, brand: brand}} 
                  type="phone"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}