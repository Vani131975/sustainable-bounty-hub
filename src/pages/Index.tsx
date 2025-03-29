
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FoodListingGrid } from '@/components/food/FoodListingGrid';
import { CropRecommendationGrid } from '@/components/crops/CropRecommendationGrid';
import { mockFoodListings, mockCropRecommendations } from '@/lib/mock-data';
import { Sprout, Apple, Leaf, Users } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Index = () => {
  // Get latest food listings and crop recommendations
  const latestFoodListings = mockFoodListings.slice(0, 4);
  const featuredCropRecommendations = mockCropRecommendations.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-green-100 via-green-50 to-brown-50 dark:from-green-900/20 dark:via-green-900/10 dark:to-brown-900/20" />
          <div className="absolute inset-0 z-0 opacity-20" style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1592924357228-91a4daadcfea")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
          }} />
          
          <div className="container relative z-10 px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <Sprout className="h-12 w-12 text-leaf-dark animate-grow" />
              </div>
              <h1 className="mb-6 text-4xl md:text-6xl font-bold tracking-tight">
                Sustainable Food Ecosystem
              </h1>
              <p className="mb-10 text-lg md:text-xl text-muted-foreground">
                Connecting food sharing with intelligent farming recommendations 
                to enhance efficiency and sustainability.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/signup">Join Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none bg-card/50 shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Apple className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Food Waste Management</h3>
                  <p className="text-muted-foreground">Share surplus food, get recipe suggestions, and facilitate donations.</p>
                </CardContent>
              </Card>
              
              <Card className="border-none bg-card/50 shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Smart Crop Recommendations</h3>
                  <p className="text-muted-foreground">Get tailored crop suggestions based on geographical and seasonal conditions.</p>
                </CardContent>
              </Card>
              
              <Card className="border-none bg-card/50 shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Sprout className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Organic Farming Support</h3>
                  <p className="text-muted-foreground">Get recommendations for organic fertilizers to enhance soil health and yield.</p>
                </CardContent>
              </Card>
              
              <Card className="border-none bg-card/50 shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">AI-Driven Insights</h3>
                  <p className="text-muted-foreground">Leverage data-informed decision making for efficient food distribution.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Latest Food Listings Section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Latest Food Listings</h2>
              <Button variant="outline" asChild>
                <Link to="/food-listings">View All</Link>
              </Button>
            </div>
            
            <FoodListingGrid listings={latestFoodListings} />
          </div>
        </section>

        {/* Crop Recommendations Section */}
        <section className="py-16 bg-muted/50">
          <div className="container px-4 mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Featured Crop Recommendations</h2>
              <Button variant="outline" asChild>
                <Link to="/crop-recommendations">View All</Link>
              </Button>
            </div>
            
            <CropRecommendationGrid recommendations={featuredCropRecommendations} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white text-center">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to make a difference?</h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join our community today and be part of the sustainable food movement.
              Together we can reduce waste and promote sustainable agriculture.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/signup">Sign Up Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
