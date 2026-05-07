import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}

export const StarRating = ({
  rating,
  size = 14,
  interactive = false,
  onRate,
}: StarRatingProps) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={size}
          onClick={() => interactive && onRate?.(i)}
          onMouseEnter={() => interactive && setHovered(i)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={`transition-colors ${interactive ? 'cursor-pointer' : ''} ${
            i <= (hovered || rating)
              ? 'text-amber-400 fill-amber-400'
              : 'text-slate-200 fill-slate-200'
          }`}
        />
      ))}
    </div>
  );
};
