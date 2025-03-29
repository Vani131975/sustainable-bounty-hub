
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FoodListingGrid } from '@/components/food/FoodListingGrid';
import { mockFoodListings } from '@/lib/mock-data';
import { FoodListing, FoodCategory } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Search, FilterX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const categories: {label: string; value: FoodCategory}[] = [
  { label: 'Fruits', value: 'fruits' },
  { label: 'Vegetables', value: 'vegetables' },
  { label: 'Dairy', value: 'dairy' },
  { label: 'Grains', value: 'grains' },
  { label: 'Meat', value: 'meat' },
  { label: 'Bakery', value: 'bakery' },
  { label: 'Prepared', value: 'prepared' },
  { label: 'Other', value: 'other' },
];

const FoodListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | ''>('');
  const [filteredListings, setFilteredListings] = useState<FoodListing[]>(mockFoodListings);
  
  useEffect(() => {
    let results = mockFoodListings;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        listing => 
          listing.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          listing.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      results = results.filter(listing => listing.category === selectedCategory);
    }
    
    setFilteredListings(results);
  }, [searchTerm, selectedCategory]);
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };
  
  const toggleCategory = (category: FoodCategory) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Food Listings</h1>
            <p className="text-muted-foreground">
              Browse available food items that are being shared in your community
            </p>
          </div>
          
          <Card className="p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search food listings..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              {(searchTerm || selectedCategory) && (
                <Button variant="ghost" onClick={clearFilters} size="sm" className="h-10">
                  <FilterX className="h-4 w-4 mr-2" />
                  Clear filters
                </Button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map(category => (
                <Badge 
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => toggleCategory(category.value)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </Card>
          
          {filteredListings.length > 0 ? (
            <FoodListingGrid listings={filteredListings} />
          ) : (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium">No food listings found</h3>
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

export default FoodListings;
