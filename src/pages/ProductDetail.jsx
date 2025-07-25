import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSolePhone } from '../api/phoneApi';
import { getSoleLaptopHeader } from '../api/laptopApi';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Enhanced product search logic
  const findProduct = () => {
    const phoneBrands = ['apple', 'samsung', 'tecno'];
    for (const brand of phoneBrands) {
      const product = getSolePhone(brand, id);
      if (product) return { product, type: 'phone' };
    }

    const laptopBrands = ['hp', 'dell', 'lenovo'];
    for (const brand of laptopBrands) {
      const product = getSoleLaptopHeader(brand, id);
      if (product) return { product, type: 'laptop' };
    }

    return { product: null, type: null };
  };

  const { product, type } = findProduct();

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
      >
        Back to {type === 'phone' ? 'Phones' : 'Laptops'}
      </button>
      <div className="flex flex-col md:flex-row gap-8 bg-gray-800 p-6 rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-contain rounded-lg"
          loading="lazy"
        />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4 text-yellow-400">{product.name}</h1>
          <p className="text-2xl text-yellow-500 font-semibold mb-6">₦{product.price}</p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Details</h3>
            <p className="text-gray-300">{product.details || product.description}</p>
          </div>
          <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-semibold">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;