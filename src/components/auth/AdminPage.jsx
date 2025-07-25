import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, LogOut } from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with actual API calls
  const mockProducts = [
    { id: 1, name: 'iPhone 15 Pro Max', price: '2,080,000', stock: 5 },
    { id: 2, name: 'Samsung Galaxy S23 Ultra', price: '1,250,000', stock: 8 },
  ];

  const handleDelete = (id) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Admin Dashboard
          </h1>
          <Link 
            to="/admin-login" 
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <LogOut className="mr-1" /> Logout
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-light-orange text-light-orange'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-light-orange text-light-orange'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Orders
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Product Management
              </h2>
              <Link
                to="/admin/add-product"
                className="bg-light-orange hover:bg-dark-orange text-white px-4 py-2 rounded-md flex items-center"
              >
                <Plus className="mr-1" /> Add Product
              </Link>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {mockProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {product.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        ₦{product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          <Edit />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Order Management
            </h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-300">
                Order management content will go here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
