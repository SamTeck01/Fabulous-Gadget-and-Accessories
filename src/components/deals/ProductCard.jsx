import { Link } from 'react-router-dom';

export default function ProductCard({ product, type = 'phone' }) {
  return (
    <Link 
      to={`/${type}-deals/${product.id}`} 
      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
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
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-light-orange font-bold">
          ₦{product.price}
        </p>
      </div>
    </Link>
  );
}