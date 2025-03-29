
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CropRecommendationGrid } from '@/components/crops/CropRecommendationGrid';
import { mockCropRecommendations } from '@/lib/mock-data';
import { CropRecommendation, Season, SoilType } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Search, FilterX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const seasons: {label: string; value: Season}[] = [
  { label: 'Spring', value: 'spring' },
  { label: 'Summer', value: 'summer' },
  { label: 'Autumn', value: 'autumn' },
  { label: 'Winter', value: 'winter' },
];

const soilTypes: {label: string; value: SoilType}[] = [
  { label: 'Clay', value: 'clay' },
  { label: 'Sandy', value: 'sandy' },
  { label: 'Silty', value: 'silty' },
  { label: 'Loamy', value: 'loamy' },
  { label: 'Chalky', value: 'chalky' },
  { label: 'Peaty', value: 'peaty' },
];

const CropRecommendations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState<Season | ''>('');
  const [selectedSoilType, setSelectedSoilType] = useState<SoilType | ''>('');
  const [filteredRecommendations, setFilteredRecommendations] = useState<CropRecommendation[]>(mockCropRecommendations);
  
  useEffect(() => {
    let results = mockCropRecommendations;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        crop => 
          crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) || 
          crop.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by season
    if (selectedSeason) {
      results = results.filter(crop => crop.bestSeason.includes(selectedSeason));
    }
    
    // Filter by soil type
    if (selectedSoilType) {
      results = results.filter(crop => crop.soilType.includes(selectedSoilType));
    }
    
    setFilteredRecommendations(results);
  }, [searchTerm, selectedSeason, selectedSoilType]);
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSeason('');
    setSelectedSoilType('');
  };
  
  const toggleSeason = (season: Season) => {
    if (selectedSeason === season) {
      setSelectedSeason('');
    } else {
      setSelectedSeason(season);
    }
  };
  
  const toggleSoilType = (soilType: SoilType) => {
    if (selectedSoilType === soilType) {
      setSelectedSoilType('');
    } else {
      setSelectedSoilType(soilType);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Crop Recommendations</h1>
            <p className="text-muted-foreground">
              Find the best crops to grow based on season, soil type, and more
            </p>
          </div>
          
          <Card className="p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search crops..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              {(searchTerm || selectedSeason || selectedSoilType) && (
                <Button variant="ghost" onClick={clearFilters} size="sm" className="h-10">
                  <FilterX className="h-4 w-4 mr-2" />
                  Clear filters
                </Button>
              )}
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Seasons</p>
              <div className="flex flex-wrap gap-2">
                {seasons.map(season => (
                  <Badge 
                    key={season.value}
                    variant={selectedSeason === season.value ? "default" : "outline"}
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => toggleSeason(season.value)}
                  >
                    {season.label}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Soil Types</p>
              <div className="flex flex-wrap gap-2">
                {soilTypes.map(soilType => (
                  <Badge 
                    key={soilType.value}
                    variant={selectedSoilType === soilType.value ? "default" : "outline"}
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => toggleSoilType(soilType.value)}
                  >
                    {soilType.label}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
          
          {filteredRecommendations.length > 0 ? (
            <CropRecommendationGrid recommendations={filteredRecommendations} />
          ) : (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium">No crop recommendations found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find more results
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CropRecommendations;
