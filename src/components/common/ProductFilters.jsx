import { useEffect, useMemo, useState } from 'react';

export default function ProductFilters({
  products = [],
  value = {},
  onChange = () => {},
  className = ''
}) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState(value.sortBy || 'relevance');

  const parsedPrices = useMemo(() => {
    const prices = products
      .map(p => (typeof p.price === 'string' ? p.price.replace(/[,\s]/g, '') : p.price))
      .map(p => Number(p))
      .filter(n => !Number.isNaN(n));
    const min = prices.length ? Math.min(...prices) : 0;
    const max = prices.length ? Math.max(...prices) : 0;
    return { min, max };
  }, [products]);

  useEffect(() => {
    // initialize from incoming value
    setMinPrice(value.minPrice ?? '');
    setMaxPrice(value.maxPrice ?? '');
    setSortBy(value.sortBy || 'relevance');
  }, [value.minPrice, value.maxPrice, value.sortBy]);

  const emitChange = (next) => {
    onChange({
      minPrice: next.minPrice ?? minPrice,
      maxPrice: next.maxPrice ?? maxPrice,
      sortBy: next.sortBy ?? sortBy
    });
  };

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Min price</label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder={parsedPrices.min ? `${parsedPrices.min}` : '0'}
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              emitChange({ minPrice: e.target.value });
            }}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gold2 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Max price</label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder={parsedPrices.max ? `${parsedPrices.max}` : ''}
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              emitChange({ maxPrice: e.target.value });
            }}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gold2 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              emitChange({ sortBy: e.target.value });
            }}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gold2 dark:bg-gray-700 dark:text-white"
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
}


