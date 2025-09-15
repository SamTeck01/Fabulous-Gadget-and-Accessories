import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/phones';
import { getProductById as getLaptopProductById } from '../data/laptops';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { brand, productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

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
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Product not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gold2 text-white rounded hover:bg-dark-orange transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      type: type,
      brand: brand
    });
    alert('Product added to cart!');
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gold2 text-white rounded hover:bg-dark-orange transition"
      >
        Back to {type === 'phone' ? 'Phones' : 'Laptops'}
      </button>
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-lg shadow-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-contain rounded-lg"
          loading="lazy"
        />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
          <p className="text-2xl text-gold2 font-semibold mb-6">₦{product.price}</p>
          
          {product.specs && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="font-medium text-gray-600 w-24 capitalize">{key}:</span>
                    <span className="text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Details</h3>
            <p className="text-gray-600">{product.details || product.description || 'No additional details available.'}</p>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="px-6 py-3 bg-gold2 text-white rounded-lg hover:bg-dark-orange transition font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;