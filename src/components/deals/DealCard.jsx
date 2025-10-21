import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import RatingDisplay from '../common/RatingDisplay';
import WishlistButton from '../common/WishlistButton';
import StockBadge from '../common/StockBadge';
import FeaturedBadge from '../common/FeaturedBadge';

export default function DealCard({ product, type = 'phone' }) {
  const { addToCart } = useCart();
  const toast = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 mb-4 w-full sm:w-44 md:w-56 lg:w-60 shrink-0 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow relative group">
      {product.featured && <FeaturedBadge />}
      
      <Link to={`/${type}-deals/${product.brand || 'unknown'}/${product.id}`} className="block">
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            <WishlistButton product={product} size="md" />
          </div>
        </div>
        <div className="px-3 py-2 sm:px-4 sm:py-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
          
          {product.rating && (
            <div className="mb-2">
              <RatingDisplay rating={product.rating} reviews={product.reviews} size="sm" />
            </div>
          )}
          
          <p className="text-gold2 font-bold text-lg sm:text-xl mb-2">
            ₦{product.price}
          </p>
          
          <div className="mb-3">
            <StockBadge inStock={product.inStock !== false} size="sm" />
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.inStock === false}
            className="w-full bg-gold2 text-white py-2 rounded-lg hover:bg-gold2/90 transition-colors flex items-center justify-center gap-2 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
}
