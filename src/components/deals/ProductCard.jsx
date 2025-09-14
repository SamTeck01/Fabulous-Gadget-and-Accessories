import { Link } from 'react-router-dom';

export default function ProductCard({ product, type = 'phone' }) {
  return (
    <Link 
      to={`/${type}-deals/${product.brand || 'unknown'}/${product.id}`} 
      className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
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
        <p className="text-light-orange font-bold">
          ₦{product.price}
        </p>
      </div>
    </Link>
  );
}