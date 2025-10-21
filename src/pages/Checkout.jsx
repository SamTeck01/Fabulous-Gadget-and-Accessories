import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { CreditCard, Truck, MapPin, Phone, Mail, User } from 'lucide-react';
import { Helmet } from 'react-helmet';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Payment
    paymentMethod: 'cash',
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = 'Phone number is invalid';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderData = {
        items: cartItems,
        total: cartTotal,
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        paymentMethod: formData.paymentMethod,
        orderDate: new Date().toISOString(),
        status: 'pending'
      };

      // Save to localStorage (in production, send to backend)
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push({ ...orderData, id: Date.now().toString() });
      localStorage.setItem('orders', JSON.stringify(orders));

      clearCart();
      toast.success('Order placed successfully!');
      navigate('/order-confirmation', { state: { order: orderData } });
    } catch (error) {
      toast.error('Failed to place order. Please try again.', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-primary py-12">
        <Helmet>
          <title>Checkout - Fabulous Gadgets</title>
        </Helmet>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">Your Cart is Empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Add some products to checkout</p>
          <button
            onClick={() => navigate('/phone-deals')}
            className="bg-gold2 text-white px-6 py-3 rounded-lg hover:bg-gold2/90 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary py-8">
      <Helmet>
        <title>Checkout - Fabulous Gadgets</title>
      </Helmet>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white dark:bg-dark-secondary rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
                  <User className="w-5 h-5" />
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold2 focus:border-transparent dark:bg-dark-primary dark:border-gray-700 dark:text-white ${errors.fullName ? 'border-red-500' : ''}`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold2 focus:border-transparent dark:bg-dark-primary dark:border-gray-700 dark:text-white ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold2 focus:border-transparent dark:bg-dark-primary dark:border-gray-700 dark:text-white ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="+234 800 000 0000"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white dark:bg-dark-secondary rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
                  <Truck className="w-5 h-5" />
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold2 focus:border-transparent dark:bg-dark-primary dark:border-gray-700 dark:text-white ${errors.address ? 'border-red-500' : ''}`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold2 focus:border-transparent dark:bg-dark-primary dark:border-gray-700 dark:text-white ${errors.city ? 'border-red-500' : ''}`}
                        placeholder="Lagos"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold2 focus:border-transparent dark:bg-dark-primary dark:border-gray-700 dark:text-white ${errors.state ? 'border-red-500' : ''}`}
                        placeholder="Lagos"
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold2 focus:border-transparent dark:bg-dark-primary dark:border-gray-700 dark:text-white ${errors.zipCode ? 'border-red-500' : ''}`}
                        placeholder="100001"
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white dark:bg-dark-secondary rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-primary dark:border-gray-700">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="w-4 h-4 text-gold2"
                    />
                    <span className="dark:text-white">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-primary dark:border-gray-700">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={formData.paymentMethod === 'transfer'}
                      onChange={handleChange}
                      className="w-4 h-4 text-gold2"
                    />
                    <span className="dark:text-white">Bank Transfer</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-primary dark:border-gray-700 opacity-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      disabled
                      className="w-4 h-4 text-gold2"
                    />
                    <span className="dark:text-white">Card Payment (Coming Soon)</span>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-secondary rounded-lg p-6 shadow-md sticky top-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-sm font-medium dark:text-white">{item.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gold2">₦{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>₦{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm dark:text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t dark:border-gray-700 pt-2 dark:text-white">
                  <span>Total</span>
                  <span className="text-gold2">₦{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full mt-6 bg-gold2 text-white py-3 rounded-lg font-semibold hover:bg-gold2/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
