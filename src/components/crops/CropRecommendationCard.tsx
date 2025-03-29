
import { CropRecommendation } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Droplet, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CropRecommendationCardProps {
  crop: CropRecommendation;
  className?: string;
}

export function CropRecommendationCard({ crop, className }: CropRecommendationCardProps) {
  const formatSeasons = (seasons: string[]) => {
    return seasons.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
  };
  
  const formatSoilTypes = (soilTypes: string[]) => {
    return soilTypes.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
  };
  
  const getWaterRequirementIcon = (requirement: string) => {
    switch(requirement) {
      case 'low':
        return <div className="flex"><Droplet className="h-4 w-4 text-blue-400" /></div>;
      case 'medium':
        return <div className="flex"><Droplet className="h-4 w-4 text-blue-400" /><Droplet className="h-4 w-4 text-blue-400" /></div>;
      case 'high':
        return <div className="flex"><Droplet className="h-4 w-4 text-blue-400" /><Droplet className="h-4 w-4 text-blue-400" /><Droplet className="h-4 w-4 text-blue-400" /></div>;
      default:
        return null;
    }
  };

  return (
    <Card className={cn("overflow-hidden transition-shadow hover:shadow-md", className)}>
      <div 
        className="aspect-[4/3] relative bg-muted" 
        style={{
          backgroundImage: `url(${crop.imageUrl || 'https://images.unsplash.com/photo-1560493676-04071c5f467b'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <h3 className="text-white font-semibold">{crop.cropName}</h3>
          <p className="text-white/90 text-sm">{formatSeasons(crop.bestSeason)} • {crop.growthDuration} days</p>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{crop.cropName}</CardTitle>
            <CardDescription>Growth period: {crop.growthDuration} days</CardDescription>
          </div>
          {getWaterRequirementIcon(crop.waterRequirements)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2 pb-2">
        <p className="text-sm line-clamp-2">{crop.description}</p>
        
        <div className="flex flex-wrap gap-1">
          {crop.bestSeason.map((season) => (
            <Badge key={season} variant="outline" className="flex gap-1 items-center bg-secondary/50">
              <Sun className="h-3 w-3" />
              {season.charAt(0).toUpperCase() + season.slice(1)}
            </Badge>
          ))}
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground">Soil types: {formatSoilTypes(crop.soilType)}</p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button variant="outline" asChild size="sm" className="w-full">
          <Link to={`/crop-recommendations/${crop.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
