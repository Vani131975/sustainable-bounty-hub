
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FoodListing } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { toast } from "@/components/ui/use-toast";
import { Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FoodListingCardProps {
  listing: FoodListing;
  className?: string;
}

export function FoodListingCard({ listing, className }: FoodListingCardProps) {
  const [status, setStatus] = useState(listing.status);
  
  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };
  
  const daysUntilExpiry = () => {
    const now = new Date();
    const expiryDate = new Date(listing.expiryDate);
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const expiryDays = daysUntilExpiry();
  
  const handleReserve = () => {
    setStatus('reserved');
    toast({
      title: "Item Reserved",
      description: `You've reserved ${listing.title}. Please arrange pickup.`,
    });
  };

  return (
    <Card className={cn("overflow-hidden transition-shadow hover:shadow-md", className)}>
      <div 
        className="aspect-[4/3] relative bg-muted" 
        style={{
          backgroundImage: `url(${listing.imageUrl || 'https://images.unsplash.com/photo-1576021182211-9ea8dced3690'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute top-2 right-2">
          <Badge variant={status === 'available' ? 'default' : status === 'reserved' ? 'secondary' : 'outline'}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{listing.title}</CardTitle>
        </div>
        <CardDescription className="flex items-center gap-1 text-xs">
          <MapPin className="h-3 w-3" /> {listing.location}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-2 mb-2">{listing.description}</p>
        
        <div className="flex justify-between items-center text-sm">
          <div>
            <span className="font-medium">{listing.quantity} {listing.unit}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className={cn(
              "text-xs",
              expiryDays <= 1 ? "text-destructive font-medium" : 
              expiryDays <= 3 ? "text-amber-600 font-medium" : ""
            )}>
              {expiryDays <= 0 ? "Expired" : `Expires in ${expiryDays} day${expiryDays === 1 ? '' : 's'}`}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild size="sm">
          <Link to={`/food-listings/${listing.id}`}>Details</Link>
        </Button>
        
        {status === 'available' && (
          <Button size="sm" onClick={handleReserve}>Reserve</Button>
        )}
        
        {status === 'reserved' && (
          <Button size="sm" variant="secondary" disabled>Reserved</Button>
        )}
        
        {status === 'donated' && (
          <Button size="sm" variant="ghost" disabled>Donated</Button>
        )}
      </CardFooter>
    </Card>
  );
}
