
import { CropRecommendation } from '@/lib/types';
import { CropRecommendationCard } from './CropRecommendationCard';

interface CropRecommendationGridProps {
  recommendations: CropRecommendation[];
}

export function CropRecommendationGrid({ recommendations }: CropRecommendationGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {recommendations.map((crop) => (
        <CropRecommendationCard key={crop.id} crop={crop} />
      ))}
    </div>
  );
}
