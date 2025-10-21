import { Package, XCircle } from 'lucide-react';

export default function StockBadge({ inStock, size = 'sm' }) {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return inStock ? (
    <div className={`flex items-center gap-1 text-green-600 dark:text-green-400 ${sizeClasses[size]} font-medium`}>
      <Package className={iconSizes[size]} />
      <span>In Stock</span>
    </div>
  ) : (
    <div className={`flex items-center gap-1 text-red-600 dark:text-red-400 ${sizeClasses[size]} font-medium`}>
      <XCircle className={iconSizes[size]} />
      <span>Out of Stock</span>
    </div>
  );
}
