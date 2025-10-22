import { Link } from 'react-router-dom';
import { FavouriteIcon, ShoppingCart01Icon } from 'hugeicons-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function DealCard({ product, type }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const { addToCart } = useCart();
  const toast = useToast();

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      ...product,
      type: type,
      brand: product.brand,
    });
    toast.success(`${product.name} added to cart!`);
  };

  // Use type prop if provided, otherwise use product.type, default to 'phone'
  const productType = type || product.type || 'phone';

  return (
    <Link 
      to={`/${productType}-deals/${product.brand || 'unknown'}/${product.id}`}
      className="block group"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-4 border-4 border-white dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image Container with rounded background */}
        <div className="relative bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden mb-4 aspect-square p-4">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 rounded-lg overflow-hidden"
            loading="lazy"
          />
          
          {/* Wishlist Heart Button - Top Right */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-800/60 dark:bg-gray-900/60 backdrop-blur-sm flex items-center justify-center hover:bg-gray-800/80 transition-colors"
            aria-label="Add to wishlist"
          >
            <FavouriteIcon
              size={20}
              style={{
                fill: inWishlist ? '#fb2c36' : 'none',
                stroke: inWishlist ? '#fb2c36 ' : '#fff',
                strokeWidth: 2
              }}
              className="transition-all"
            />
          </button>

          {/* Carousel Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 truncate">
              {product.name}
            </h3>
            <p className="text-xl font-bold text-[#FF9500] dark:text-[#FFB340]">
              ${product.price}
            </p>
          </div>

          {/* Add to Cart Button - Bottom Right */}
          <button
            onClick={handleAddToCart}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gold2 hover:text-white transition-colors z-20"
            aria-label="Add to cart"
          >
            <ShoppingCart01Icon
              size={20}
              className="text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors"
            />
          </button>
        </div>
      </div>
    </Link>
  );
}
