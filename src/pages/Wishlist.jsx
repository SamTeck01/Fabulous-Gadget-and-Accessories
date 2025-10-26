import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { Delete02Icon, ShoppingCart01Icon, FavouriteIcon } from 'hugeicons-react';
import { Helmet } from 'react-helmet';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const toast = useToast();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleRemove = (productId, productName) => {
    removeFromWishlist(productId);
    toast.info(`${productName} removed from wishlist`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-dark-primary py-12">
        <Helmet>
          <title>Wishlist - Fabulous Gadgets</title>
        </Helmet>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <FavouriteIcon size={96} className="mx-auto mb-6 text-gray-300 dark:text-gray-600" />
            <h1 className="text-3xl font-bold mb-4 dark:text-white">Your Wishlist is Empty</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Save your favorite products to your wishlist and shop them later!
            </p>
            <Link
              to="/phone-deals"
              className="inline-block bg-gold2 text-white px-8 py-3 rounded-lg hover:bg-gold2/90 transition-colors font-medium"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-primary py-8">
      <Helmet>
        <title>{`Wishlist (${wishlistItems.length || 0}) - Fabulous Gadgets`}</title>
      </Helmet>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white">
            My Wishlist ({wishlistItems.length})
          </h1>
          {wishlistItems.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your wishlist?')) {
                  clearWishlist();
                  toast.info('Wishlist cleared');
                }
              }}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-dark-secondary rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link to={`/${product.type || 'phone'}-deals/${product.brand || 'unknown'}/${product.id}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/${product.type || 'phone'}-deals/${product.brand || 'unknown'}/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 dark:text-white hover:text-gold2 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-2 mb-3">
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium dark:text-white">{product.rating}</span>
                      {product.reviews && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({product.reviews})
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <p className="text-2xl font-bold text-gold2 mb-4">
                  ₦{product.price}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-gold2 text-white py-2 rounded-lg hover:bg-gold2/90 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <ShoppingCart01Icon size={16} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(product.id, product.name)}
                    className="p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Delete02Icon size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
