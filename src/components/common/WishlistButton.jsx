import { Heart } from 'lucide-react';
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

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 ${
        inWishlist ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'
      } hover:text-red-500 transition-colors ${className}`}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart className={`${sizeClasses[size]} ${
        inWishlist ? 'fill-red-500' : ''
      }`} />
      {showText && (
        <span className="text-sm font-medium">
          {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </span>
      )}
    </button>
  );
}
