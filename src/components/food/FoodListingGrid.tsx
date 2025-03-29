
import { FoodListing } from '@/lib/types';
import { FoodListingCard } from './FoodListingCard';

interface FoodListingGridProps {
  listings: FoodListing[];
}

export function FoodListingGrid({ listings }: FoodListingGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {listings.map((listing) => (
        <FoodListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
