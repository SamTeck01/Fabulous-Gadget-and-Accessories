import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [selectedItems, setSelectedItems] = useState(new Set(cartItems.map(item => item.id)));

  const toggleItemSelection = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const toggleAllItems = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map(item => item.id)));
    }
  };

  const selectedTotal = cartItems
    .filter(item => selectedItems.has(item.id))
    .reduce((sum, item) => sum + (parseFloat(item.price.replace(/,/g, '')) * item.quantity), 0);

  const handleRemoveSelected = () => {
    selectedItems.forEach(itemId => removeFromCart(itemId));
    setSelectedItems(new Set());
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-primary">
      <Helmet>
        <title>Cart - Fabulous Gadgets</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold dark:text-white">Cart</h1>
          {selectedItems.size > 0 && (
            <button
              onClick={handleRemoveSelected}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400"
            >
              <Trash2 className="w-5 h-5" />
              Remove
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
                <div className="col-span-1 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.size === cartItems.length && cartItems.length > 0}
                    onChange={toggleAllItems}
                    className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                  />
                </div>
                <div className="col-span-5 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  PRODUCT
                </div>
                <div className="col-span-3 text-sm font-semibold text-gray-600 dark:text-gray-400 text-center">
                  QUANTITY
                </div>
                <div className="col-span-3 text-sm font-semibold text-gray-600 dark:text-gray-400 text-right">
                  PRICE
                </div>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-100 dark:border-gray-800"
                  >
                    {/* Checkbox */}
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.id)}
                        onChange={() => toggleItemSelection(item.id)}
                        className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="col-span-5 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain bg-gray-100 dark:bg-gray-800 rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {item.name}
                        </h3>
                        {item.selectedColor && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.selectedColor}
                            {item.selectedSize && ` • ${item.selectedSize}`}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-3 flex items-center justify-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-semibold dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="col-span-3 text-right">
                      <p className="font-bold text-lg dark:text-white">
                        ${(parseFloat(item.price.replace(/,/g, '')) * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 flex items-center gap-1 ml-auto mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-6 dark:text-white">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-semibold dark:text-white">
                      ${selectedTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Discount</span>
                    <span className="font-semibold dark:text-white">$0</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold dark:text-white">
                      <span>Grand total</span>
                      <span>${selectedTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  disabled={selectedItems.size === 0}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Checkout now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
