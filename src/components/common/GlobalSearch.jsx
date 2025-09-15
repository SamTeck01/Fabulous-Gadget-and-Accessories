import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { getFeaturedProducts } from '../../data/phones';
import { getAllLaptopProducts } from '../../data/laptops';

export default function GlobalSearch({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const allProducts = useMemo(() => [
    ...getFeaturedProducts().map(p => ({ ...p, type: 'phone', category: 'Phones' })),
    ...getAllLaptopProducts().map(p => ({ ...p, type: 'laptop', category: 'Laptops' }))
  ], []);

  useEffect(() => {
    if (searchTerm.length > 2) {
      setIsLoading(true);
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.detailedName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered.slice(0, 8)); // Limit to 8 results
      setIsLoading(false);
    } else {
      setResults([]);
    }
  }, [searchTerm, allProducts]);

  const handleProductClick = (product) => {
    navigate(`/${product.type}-deals/${product.brand || 'unknown'}/${product.id}`);
    onClose();
    setSearchTerm('');
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      onClose();
      setSearchTerm('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (results.length > 0) {
        handleProductClick(results[0]);
      } else {
        handleSearchSubmit();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[70vh] overflow-hidden shadow-xl">
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
          />
          <button
            onClick={onClose}
            className="ml-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : searchTerm.length <= 2 ? (
            <div className="p-4 text-center text-gray-500">
              Type at least 3 characters to search
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p className="mb-4">No products found for "{searchTerm}"</p>
              <button
                onClick={handleSearchSubmit}
                className="px-4 py-2 bg-gold2 text-white rounded-lg hover:bg-gold2/80 transition-colors"
              >
                View All Results
              </button>
            </div>
          ) : (
            <div className="p-2">
              {results.map((product) => (
                <button
                  key={`${product.type}-${product.id}`}
                  onClick={() => handleProductClick(product)}
                  className="w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded mr-3"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {product.category} • ₦{product.price}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
