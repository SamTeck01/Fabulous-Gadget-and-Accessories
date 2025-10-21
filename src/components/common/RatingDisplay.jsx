import { Star } from 'lucide-react';

export default function RatingDisplay({ rating, reviews, size = 'sm', showCount = true }) {
  if (!rating) return null;

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`${sizes[size]} ${
              i < Math.floor(rating) 
                ? 'fill-yellow-500 text-yellow-500' 
                : 'text-gray-300 dark:text-gray-600'
            }`} 
          />
        ))}
      </div>
      <span className={`font-semibold dark:text-white ${textSizes[size]}`}>
        {rating.toFixed(1)}
      </span>
      {showCount && reviews && (
        <span className={`text-gray-500 dark:text-gray-400 ${textSizes[size]}`}>
          ({reviews})
        </span>
      )}
    </div>
  );
}
