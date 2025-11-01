import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { ShoppingCart01Icon, FavouriteIcon } from 'hugeicons-react';
import { Helmet } from 'react-helmet';
import { FaTrash } from 'react-icons/fa'; // For Font Awesome trash icon

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
      
      <div className="container mx-auto px-12 max-w-6xl">
        <div className="flex flex-col shadow-md bg-gray-100 dark:bg-dark-secondary rounded-lg border border-gray-200 dark:border-dark-tertiary">
           <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-white bg-gold2 p-2 rounded-lg mt-5 ml-2">
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
              className="text-red-600 hover:bg-gold2/90 text-sm font-medium bg-gold2 p-2 rounded-lg mr-2 mt-5"
            >
              Clear All
            </button>
          )}
        </div>

          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-dark-secondary rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-row m-2 justify-between"
            >
              <Link to={`/${product.type || 'phone'}-deals/${product.brand || 'unknown'}/${product.id}`}>
                <div className="aspect-[4/2] lg:aspect-[3/2] w-50 flex flex-row">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform mt-2 mb-2 ml-2"
                  />

                  <div className='flex flex-col justify-between p-2'>
                      <Link to={`/${product.type || 'phone'}-deals/${product.brand || 'unknown'}/${product.id}`}>
                        <h3 className="font-semibold text-sm lg:text-lg mb-2 dark:text-white hover:text-gold2 transition-colors line-clamp-2">
                        {product.name}
                        </h3>
                      </Link>

                      <p className="text-xl font-bold text-gold2 lg:text-2xl">
                      ₦{product.price}
                      </p>
                  </div>

                  

                  
                </div>
              </Link>
              
              <div className="p-4">            
                <div className="flex flex-col gap-6 lg:gap-10 justify-center mt-2 lg:mt-4">

                   <button
                    onClick={() => handleRemove(product.id, product.name)}
                    className="text-red-500 hover:text-red-400 transition-colors cursor-pointer text-md lg:text-lg"
                    aria-label="Remove from wishlist"
                  >
                    <FaTrash />
                  </button>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-gold2 text-white text-sm lg:text-lg p-2 rounded-lg hover:bg-gold2/90 transition-colors flex items-center justify-center gap-2 font-medium mb-0"
                  >
                    <ShoppingCart01Icon size={16} />
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
