
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CropRecommendationGrid } from '@/components/crops/CropRecommendationGrid';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/lib/auth';
import { mockCropRecommendations } from '@/lib/mock-data';
import { Leaf, FileText, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export function FarmerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('recommendations');
  
  const seasonRecommendations = () => {
    const currentMonth = new Date().getMonth();
    let currentSeason: string;
    
    if (currentMonth >= 2 && currentMonth <= 4) {
      currentSeason = 'spring';
    } else if (currentMonth >= 5 && currentMonth <= 7) {
      currentSeason = 'summer';
    } else if (currentMonth >= 8 && currentMonth <= 10) {
      currentSeason = 'autumn';
    } else {
      currentSeason = 'winter';
    }
    
    return mockCropRecommendations.filter(crop => 
      crop.bestSeason.includes(currentSeason as any)
    );
  };
  
  const seasonalCrops = seasonRecommendations();
  const allCrops = mockCropRecommendations;
  
  const getCurrentSeason = () => {
    const currentMonth = new Date().getMonth();
    if (currentMonth >= 2 && currentMonth <= 4) return "Spring";
    if (currentMonth >= 5 && currentMonth <= 7) return "Summer";
    if (currentMonth >= 8 && currentMonth <= 10) return "Autumn";
    return "Winter";
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">
            Here's how you can optimize your farming practices.
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Leaf className="mr-2 h-4 w-4" />
              Farm Planning
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Farm Planning Tool</DialogTitle>
              <DialogDescription>
                Create and manage your sustainable farming plans.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>This feature is coming soon. You'll be able to create detailed farming plans here.</p>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Season</CardTitle>
            <CardDescription>Best planting time for many crops</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <div className="text-2xl font-bold">{getCurrentSeason()}</div>
            <Badge variant="outline" className="ml-2 bg-primary/10">{seasonalCrops.length} recommended crops</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Soil Health Tips</CardTitle>
            <CardDescription>Best practices for your region</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <Link to="/farming-tips" className="text-primary hover:underline">View Tips</Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Planting Calendar</CardTitle>
            <CardDescription>Optimal planting windows</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <Link to="/planting-calendar" className="text-primary hover:underline">View Calendar</Link>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommendations" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommendations">Seasonal Recommendations</TabsTrigger>
          <TabsTrigger value="all-crops">All Crops</TabsTrigger>
          <TabsTrigger value="my-crops">My Crops</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommendations" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recommended for {getCurrentSeason()}</h2>
          </div>
          
          {seasonalCrops.length > 0 ? (
            <CropRecommendationGrid recommendations={seasonalCrops} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No seasonal recommendations available</h3>
              <p className="text-muted-foreground">Check the all crops section for options</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="all-crops" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Available Crops</h2>
          </div>
          
          <CropRecommendationGrid recommendations={allCrops} />
        </TabsContent>
        
        <TabsContent value="my-crops" className="space-y-4">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">You haven't added any crops to your farm yet</h3>
            <p className="text-muted-foreground mb-4">Add crops from our recommendations to track in your farm</p>
            <Button variant="outline" onClick={() => setActiveTab('recommendations')}>
              View Recommendations
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
