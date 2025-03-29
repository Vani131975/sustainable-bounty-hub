
// User types
export type UserRole = 'consumer' | 'farmer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location?: string;
  profileImage?: string;
  createdAt: Date;
}

// Food listing types
export interface FoodListing {
  id: string;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  expiryDate: Date;
  imageUrl?: string;
  category: FoodCategory;
  userId: string;
  status: 'available' | 'reserved' | 'donated';
  location: string;
  createdAt: Date;
}

export type FoodCategory = 
  | 'fruits' 
  | 'vegetables' 
  | 'dairy' 
  | 'grains' 
  | 'meat' 
  | 'bakery'
  | 'prepared'
  | 'other';

// Crop recommendation types
export interface CropRecommendation {
  id: string;
  cropName: string;
  description: string;
  bestSeason: Season[];
  soilType: SoilType[];
  waterRequirements: 'low' | 'medium' | 'high';
  growthDuration: number; // in days
  imageUrl?: string;
  benefits: string[];
  organicFertilizers: OrganicFertilizer[];
}

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type SoilType = 'clay' | 'sandy' | 'silty' | 'loamy' | 'chalky' | 'peaty';

export interface OrganicFertilizer {
  name: string;
  description: string;
  benefits: string[];
  applicationMethod: string;
}
