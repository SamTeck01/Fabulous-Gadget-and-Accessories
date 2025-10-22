import { PackageIcon, CancelCircleIcon } from 'hugeicons-react';

export default function StockBadge({ inStock, size = 'sm' }) {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return inStock ? (
    <div className={`flex items-center gap-1 text-green-600 dark:text-green-400 ${sizeClasses[size]} font-medium`}>
      <PackageIcon size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} />
      <span>In Stock</span>
    </div>
  ) : (
    <div className={`flex items-center gap-1 text-red-600 dark:text-red-400 ${sizeClasses[size]} font-medium`}>
      <CancelCircleIcon size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} />
      <span>Out of Stock</span>
    </div>
  );
}
