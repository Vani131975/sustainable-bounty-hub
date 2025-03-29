
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FoodListingGrid } from '@/components/food/FoodListingGrid';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/lib/auth';
import { mockFoodListings } from '@/lib/mock-data';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ConsumerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('listings');
  
  // Filter listings for current user, and by different statuses
  const myListings = mockFoodListings.filter(listing => listing.userId === user?.id);
  const availableListings = mockFoodListings.filter(listing => listing.status === 'available');
  const reservedListings = mockFoodListings.filter(listing => listing.status === 'reserved');
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your food sharing activity.
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Food Listing
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Food Listing</DialogTitle>
              <DialogDescription>
                Share your surplus food with others and reduce waste.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>This feature is coming soon. You'll be able to add your surplus food items here.</p>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
              <Button type="button">
                Save Listing
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">My Listings</CardTitle>
            <CardDescription>Food items you're sharing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myListings.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Items</CardTitle>
            <CardDescription>Food available for reservation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableListings.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">My Reservations</CardTitle>
            <CardDescription>Food items you've reserved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reservedListings.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="listings" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="available">Available Food</TabsTrigger>
          <TabsTrigger value="reserved">My Reservations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="listings" className="space-y-4">
          {myListings.length > 0 ? (
            <FoodListingGrid listings={myListings} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">You haven't listed any food items yet</h3>
              <p className="text-muted-foreground mb-4">Start sharing your surplus food to reduce waste</p>
              <Button asChild>
                <Link to="/food-listings/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Food Listing
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="available" className="space-y-4">
          {availableListings.length > 0 ? (
            <FoodListingGrid listings={availableListings} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No available food listings</h3>
              <p className="text-muted-foreground">Check back later for new listings</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="reserved" className="space-y-4">
          {reservedListings.length > 0 ? (
            <FoodListingGrid listings={reservedListings} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">You haven't reserved any food items</h3>
              <p className="text-muted-foreground mb-4">Browse available listings to find food items</p>
              <Button asChild variant="outline">
                <Link to="/food-listings">Browse Food Listings</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
