import { Link } from 'react-router-dom';

export default function DealCard({ product, type = 'phone' }) {
  return (
    <div className="bg-white mb-4 w-full sm:w-44 md:w-56 lg:w-60 shrink-0 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Link to={`/${type}-deals/${product.id}`} className="block">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="px-3 py-2 sm:px-4 sm:py-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-2 truncate" >
            {product.name}
          </h3>
          <p className="text-light-orange font-bold text-sm sm:text-base">
            ₦{product.price}
          </p>
          <div className="mt-1 sm:mt-2 flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            In Stock
          </div>
        </div>
      </Link>
    </div>
  );
}
