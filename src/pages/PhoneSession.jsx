import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/deals/ProductCard';
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
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', sortBy: 'relevance' });

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
  }, [products, searchTerm, filters.minPrice, filters.maxPrice, filters.sortBy]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!brandData) return <div className="text-center py-10">Brand not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <img 
          src={brandData.logo} 
          alt={brandData.name} 
          className="h-16 mr-4"
        />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {brandData.name} Phones
        </h1>
      </div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={{...product, brand: brand}} 
            type="phone"
          />
        ))}
      </div>
    </div>
  );
}