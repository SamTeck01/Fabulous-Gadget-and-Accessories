import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft02Icon, ArrowRight02Icon, StarIcon, Remove01Icon, Add01Icon, FavouriteIcon } from 'hugeicons-react';
import { Helmet } from 'react-helmet';
import { getProductById } from '../data/phones';
import { getProductById as getLaptopProductById } from '../data/laptops';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const ProductDetail = () => {
  const { brand, productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const toast = useToast();
  const inWishlist = isInWishlist(productId);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

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
      <div className="min-h-screen bg-white dark:bg-dark-primary flex items-center justify-center p-4">
        <Helmet><title>Product Not Found - Fabulous Gadgets</title></Helmet>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Product not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Mock data for gallery and related products
  const productImages = [product.image, product.image, product.image, product.image];
  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'black', class: 'bg-gray-900' },
    { name: 'white', class: 'bg-white border-2 border-gray-300' },
  ];

  const handleAddToCart = () => {
    addToCart({
      ...product,
      type: type,
      brand: brand,
      quantity: quantity,
      selectedSize,
      selectedColor
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-primary">
      <Helmet>
        <title>{product.name} - Fabulous Gadgets</title>
        <meta name="description" content={product.description || `Buy ${product.name} at the best price`} />
      </Helmet>

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <button onClick={() => navigate('/')} className="hover:text-gray-900 dark:hover:text-white">Home</button>
            <span>/</span>
            <button onClick={() => navigate(-1)} className="hover:text-gray-900 dark:hover:text-white">Products</button>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">{type === 'phone' ? 'Phones' : 'Laptops'}</span>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">Jackets</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 aspect-[4/3] overflow-hidden group">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                disabled={selectedImage === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft02Icon size={24} />
              </button>
              <button
                onClick={() => setSelectedImage(Math.min(productImages.length - 1, selectedImage + 1))}
                disabled={selectedImage === productImages.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight02Icon size={24} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === idx
                      ? 'border-black dark:border-white'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-3 dark:text-white">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    size={20}
                    style={{
                      fill: i < Math.floor(product.rating || 4.5) ? '#eab308' : 'none',
                      stroke: i < Math.floor(product.rating || 4.5) ? '#eab308' : '#d1d5db',
                      strokeWidth: 2
                    }}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">({product.reviews || 15})</span>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold mb-6 dark:text-white">${product.price}</p>

            {/* Available Size */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3 dark:text-white">Available Size</label>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 font-semibold transition ${
                      selectedSize === size
                        ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                        : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Color */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3 dark:text-white">Available Color</label>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full ${color.class} transition ${
                      selectedColor === color.name
                        ? 'ring-2 ring-offset-2 ring-black dark:ring-white'
                        : ''
                    }`}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity, Add to Cart, and Wishlist */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <Remove01Icon size={16} />
                </button>
                <span className="px-6 py-3 font-semibold dark:text-white">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <Add01Icon size={16} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition font-semibold"
              >
                Add to cart
              </button>
              <button
                onClick={() => {
                  toggleWishlist(product);
                  toast.success(inWishlist ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`);
                }}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-red-500 dark:hover:border-red-500 transition"
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <FavouriteIcon
                  size={24}
                  style={{
                    fill: inWishlist ? '#ef4444' : 'none',
                    stroke: inWishlist ? '#ef4444' : 'currentColor',
                    strokeWidth: 2
                  }}
                />
              </button>
            </div>

            {/* Last seen info */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              <span className="font-semibold">Last seen:</span> {product.lastSeen || 'Never (new!)'}
            </p>

            {/* Specifications */}
            {product.specs && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-bold mb-4 dark:text-white">Specifications</h3>
                <div className="space-y-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex text-sm">
                      <span className="text-gray-600 dark:text-gray-400 w-32 capitalize">{key}:</span>
                      <span className="text-gray-900 dark:text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-4 font-semibold transition ${
                  activeTab === 'details'
                    ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`pb-4 font-semibold transition ${
                  activeTab === 'discussion'
                    ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Discussion
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 font-semibold transition ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Ratings & Reviews
                <span className="ml-2 text-sm text-gray-400">{product.reviews || 15}</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className=" dark:bg-gray-800 rounded-lg p-6">
            {activeTab === 'details' ? (
              <div>
                <h3 className="font-bold text-lg mb-4 dark:text-white">Product Details</h3>
                
                {/* Description */}
                {product.description && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 dark:text-white">Description</h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Full Specifications */}
                {product.specs && (
                  <div>
                    <h4 className="font-semibold mb-3 dark:text-white">Full Specifications</h4>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <table className="w-full">
                        <tbody>
                          {Object.entries(product.specs).map(([key, value], index) => (
                            <tr key={key} className={index !== 0 ? 'border-t border-gray-200 dark:border-gray-600' : ''}>
                              <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 capitalize font-medium w-1/3">
                                {key}
                              </td>
                              <td className="py-3 text-gray-900 dark:text-white">
                                {value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h5 className="font-semibold mb-2 dark:text-white">Warranty</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.warranty || '1 Year Manufacturer Warranty'}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h5 className="font-semibold mb-2 dark:text-white">Return Policy</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.returnPolicy || '7 Days Return & Exchange'}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h5 className="font-semibold mb-2 dark:text-white">Shipping</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.shipping || 'Standard Shipping Available'}
                    </p>
                  </div>
                </div>
              </div>
            ) : activeTab === 'discussion' ? (
              <div>
                <h3 className="font-bold text-lg mb-4 dark:text-white">Discussion</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Share your thoughts and questions about this product with other customers.
                </p>
                <textarea
                  placeholder="Write a discussion..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-4 dark:bg-gray-700 dark:text-white"
                  rows="4"
                />
                <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
                  Comment
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-lg mb-4 dark:text-white">Customer Reviews</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No reviews yet. Be the first to review this product!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold dark:text-white">Related Products</h2>
            <button className="text-sm font-semibold hover:underline dark:text-white">View All →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Mock related products - you can replace with actual data */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg aspect-square flex items-center justify-center">
                <span className="text-gray-400">Product {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;