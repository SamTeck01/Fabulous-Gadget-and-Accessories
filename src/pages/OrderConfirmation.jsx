import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary py-12">
      <Helmet>
        <title>Order Confirmation - Fabulous Gadgets</title>
      </Helmet>
      
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Order Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for your purchase. We've received your order and will process it shortly.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 dark:bg-dark-primary rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Order Details</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Order Date:</span>
                <span className="font-medium dark:text-white">
                  {new Date(order.orderDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                <span className="font-medium dark:text-white capitalize">
                  {order.paymentMethod === 'cash' ? 'Cash on Delivery' : order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                <span className="font-bold text-lg text-gold2">
                  ₦{order.total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t dark:border-gray-700 pt-4">
              <h3 className="font-semibold mb-3 dark:text-white">Items Ordered:</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm dark:text-white">{item.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gold2">₦{item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t dark:border-gray-700 pt-4 mt-4">
              <h3 className="font-semibold mb-2 dark:text-white">Shipping Address:</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {order.customer.name}<br />
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                {order.customer.phone}
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-4 flex items-center justify-center gap-2 dark:text-white">
              <Package className="w-5 h-5" />
              What Happens Next?
            </h3>
            <div className="space-y-3 text-sm text-left">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-gold2 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  1
                </div>
                <p className="dark:text-gray-300">
                  We'll send you an email confirmation at <strong>{order.customer.email}</strong>
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-gold2 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  2
                </div>
                <p className="dark:text-gray-300">
                  Our team will prepare your order for shipment
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-gold2 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  3
                </div>
                <p className="dark:text-gray-300">
                  You'll receive a call from our delivery partner to schedule delivery
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold2 text-white rounded-lg hover:bg-gold2/90 transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              to="/phone-deals"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gold2 text-gold2 rounded-lg hover:bg-gold2 hover:text-white transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            Need help? Contact us at {import.meta.env.VITE_SUPPORT_EMAIL || 'support@fabulousgadgets.com'}
          </p>
        </div>
      </div>
    </div>
  );
}
