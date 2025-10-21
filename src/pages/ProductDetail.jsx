import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Truck, Shield, RefreshCw } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { getProductById } from '../data/phones';
import { getProductById as getLaptopProductById } from '../data/laptops';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import RatingDisplay from '../components/common/RatingDisplay';
import WishlistButton from '../components/common/WishlistButton';
import StockBadge from '../components/common/StockBadge';
import FeaturedBadge from '../components/common/FeaturedBadge';

const ProductDetail = () => {
  const { brand, productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const toast = useToast();

  // Try to find product in phones first, then laptops
  let product = null;
  let type = null;

  try {
    product = getProductById(brand, productId);
    type = 'phone';
  } catch {
    try {
      product = getLaptopProductById(brand, productId);
      type = 'laptop';
    } catch {
      // Product not found
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-primary flex items-center justify-center p-4">
        <Helmet><title>Product Not Found - Fabulous Gadgets</title></Helmet>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Product not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gold2 text-white rounded-lg hover:bg-gold2/90 transition flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      type: type,
      brand: brand
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary py-8">
      <Helmet>
        <title>{product.name} - Fabulous Gadgets</title>
        <meta name="description" content={product.description || `Buy ${product.name} at the best price`} />
      </Helmet>

      <div className="container mx-auto px-4 max-w-7xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-white dark:bg-dark-secondary text-gray-700 dark:text-white rounded-lg hover:shadow-md transition flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to {type === 'phone' ? 'Phones' : 'Laptops'}
        </button>

        <div className="grid md:grid-cols-2 gap-8 bg-white dark:bg-dark-secondary p-6 md:p-8 rounded-lg shadow-lg">
          {/* Product Image */}
          <div className="relative">
            {product.featured && <FeaturedBadge />}
            <div className="aspect-square bg-gray-100 dark:bg-dark-primary rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-4"
                loading="lazy"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="mb-4">
                <RatingDisplay rating={product.rating} reviews={product.reviews} size="lg" />
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl text-gold2 font-bold">₦{product.price}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <StockBadge inStock={product.inStock !== false} size="md" />
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-dark-primary rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.inStock === false}
                className="flex-1 bg-gold2 text-white px-8 py-4 rounded-lg hover:bg-gold2/90 transition font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
              <WishlistButton product={product} size="lg" showText={false} className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-red-500" />
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 dark:bg-dark-primary rounded-lg">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-gold2" />
                <p className="text-xs font-medium dark:text-gray-300">Free Delivery</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-gold2" />
                <p className="text-xs font-medium dark:text-gray-300">Warranty</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-8 h-8 mx-auto mb-2 text-gold2" />
                <p className="text-xs font-medium dark:text-gray-300">Easy Returns</p>
              </div>
            </div>

            {/* Specifications */}
            {product.specs && (
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4 dark:text-white">Specifications</h3>
                <div className="space-y-3 bg-gray-50 dark:bg-dark-primary p-4 rounded-lg">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0">
                      <span className="font-semibold text-gray-700 dark:text-gray-300 w-32 capitalize">{key}:</span>
                      <span className="text-gray-600 dark:text-gray-400 flex-1">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;