// components/deals/DealCard.jsx
import { Link } from 'react-router-dom';

export default function DealCard({ product, type = 'phone' }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Link to={`/${type}-deals/${product.id}`} className="block">
        <div className="h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-light-orange font-bold">₦{product.price}</p>
          <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-300">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            In Stock
          </div>
        </div>
      </Link>
    </div>
  );
}