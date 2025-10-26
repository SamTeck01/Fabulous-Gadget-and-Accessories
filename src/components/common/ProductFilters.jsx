import { useEffect, useMemo, useState } from 'react';

export default function ProductFilters({
  products = [],
  brands = [], // optional: [{id, name}]
  value = {},
  onChange = () => {},
  className = ''
}) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedBrands, setSelectedBrands] = useState(Array.isArray(value.brands) ? value.brands : []);
  // sort is handled at page level (top bar), keep passthrough support if provided
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
    setSelectedBrands(Array.isArray(value.brands) ? value.brands : []);
  }, [value.minPrice, value.maxPrice, value.sortBy, value.brands]);

  const emitChange = (next) => {
    onChange({
      minPrice: next.minPrice ?? minPrice,
      maxPrice: next.maxPrice ?? maxPrice,
      brands: next.brands ?? selectedBrands,
      sortBy: next.sortBy ?? sortBy
    });
  };

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-0 ${className}`}>
      <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">Filters</h3>
        <button
          onClick={() => {
            setMinPrice('');
            setMaxPrice('');
            setSelectedBrands([]);
            emitChange({ minPrice: '', maxPrice: '', brands: [] });
          }}
          className="text-sm text-gold2 hover:text-gold2/80 font-medium transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Price Section */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">Price (₦)</h4>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder={parsedPrices.min ? `${parsedPrices.min}` : 'Min'}
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              emitChange({ minPrice: e.target.value });
            }}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gold2 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
          />
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder={parsedPrices.max ? `${parsedPrices.max}` : 'Max'}
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              emitChange({ maxPrice: e.target.value });
            }}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gold2 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
          />
        </div>
      </div>

      {/* Brands Section */}
      {brands && brands.length > 0 && (
        <div className="px-4 py-3">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">Brand</h4>
          <div className="max-h-56 overflow-auto pr-1 space-y-2">
            {brands.map((b) => {
              const checked = selectedBrands.includes(b.id);
              return (
                <label key={b.id} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-gold2 focus:ring-2 focus:ring-gold2 focus:ring-offset-0 cursor-pointer"
                    checked={checked}
                    onChange={(e) => {
                      let next;
                      if (e.target.checked) next = [...selectedBrands, b.id];
                      else next = selectedBrands.filter(id => id !== b.id);
                      setSelectedBrands(next);
                      emitChange({ brands: next });
                    }}
                  />
                  <span className="flex-1">{b.name}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


