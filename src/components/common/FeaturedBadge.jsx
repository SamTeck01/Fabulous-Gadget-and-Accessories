import { Star } from 'lucide-react';

export default function FeaturedBadge({ className = '' }) {
  return (
    <div className={`absolute top-2 left-2 bg-gradient-to-r from-gold2 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-10 ${className}`}>
      <Star className="w-3 h-3 fill-white" />
      <span>Featured</span>
    </div>
  );
}
