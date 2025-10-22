import { FavouriteIcon } from 'hugeicons-react';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

export default function WishlistButton({ product, size = 'md', showText = false, className = '' }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const toast = useToast();
  const inWishlist = isInWishlist(product.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(inWishlist ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 ${
        inWishlist ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'
      } hover:text-red-500 transition-colors ${className}`}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <FavouriteIcon
        size={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
        style={{
          fill: inWishlist ? '#ef4444' : 'none',
          stroke: 'currentColor',
          strokeWidth: 2
        }}
      />
      {showText && (
        <span className="text-sm font-medium">
          {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </span>
      )}
    </button>
  );
}
