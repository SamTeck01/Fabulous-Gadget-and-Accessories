import { StarIcon } from 'hugeicons-react';

export default function RatingDisplay({ rating, reviews, size = 'sm', showCount = true }) {
  if (!rating) return null;

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <StarIcon 
            key={i} 
            size={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
            style={{
              fill: i < Math.floor(rating) ? '#eab308' : 'none',
              stroke: i < Math.floor(rating) ? '#eab308' : '#d1d5db',
              strokeWidth: 2
            }}
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
