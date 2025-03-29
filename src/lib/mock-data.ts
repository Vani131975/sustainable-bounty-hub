
import { User, FoodListing, CropRecommendation, OrganicFertilizer } from './types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'consumer',
    location: 'Portland, OR',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    createdAt: new Date('2023-03-10')
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'farmer',
    location: 'Eugene, OR',
    profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    createdAt: new Date('2023-02-15')
  },
  {
    id: '3',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    role: 'consumer',
    location: 'Seattle, WA',
    createdAt: new Date('2023-05-20')
  },
  {
    id: '4',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'farmer',
    location: 'Boise, ID',
    createdAt: new Date('2023-01-08')
  },
];

// Mock Food Listings
export const mockFoodListings: FoodListing[] = [
  {
    id: '1',
    title: 'Fresh Apples',
    description: 'Organic Honeycrisp apples, freshly picked from my backyard tree.',
    quantity: 5,
    unit: 'lbs',
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a',
    category: 'fruits',
    userId: '1',
    status: 'available',
    location: 'Portland, OR',
    createdAt: new Date('2023-06-15')
  },
  {
    id: '2',
    title: 'Homemade Bread',
    description: 'Freshly baked sourdough bread, made this morning.',
    quantity: 2,
    unit: 'loaves',
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7c',
    category: 'bakery',
    userId: '1',
    status: 'available',
    location: 'Portland, OR',
    createdAt: new Date('2023-06-16')
  },
  {
    id: '3',
    title: 'Farm Fresh Carrots',
    description: 'Organic carrots harvested this week from our sustainable farm.',
    quantity: 10,
    unit: 'lbs',
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    imageUrl: 'https://images.unsplash.com/photo-1447175008436-054170c2e979',
    category: 'vegetables',
    userId: '2',
    status: 'available',
    location: 'Eugene, OR',
    createdAt: new Date('2023-06-10')
  },
  {
    id: '4',
    title: 'Organic Tomatoes',
    description: 'Heirloom tomatoes, perfect for salads or sauces.',
    quantity: 3,
    unit: 'lbs',
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    imageUrl: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6',
    category: 'vegetables',
    userId: '4',
    status: 'available',
    location: 'Boise, ID',
    createdAt: new Date('2023-06-12')
  },
];

// Mock Organic Fertilizers
export const mockOrganicFertilizers: OrganicFertilizer[] = [
  {
    name: 'Compost',
    description: 'Rich organic matter made from decomposed plant materials.',
    benefits: ['Improves soil structure', 'Adds essential nutrients', 'Enhances microbial activity'],
    applicationMethod: 'Mix into top 6 inches of soil before planting or use as a top dressing.',
  },
  {
    name: 'Worm Castings',
    description: 'Nutrient-rich organic fertilizer produced from earthworms.',
    benefits: ['High in nitrogen', 'Improves soil aeration', 'Enhances plant growth'],
    applicationMethod: 'Mix into soil or brew as a compost tea for foliar application.',
  },
  {
    name: 'Fish Emulsion',
    description: 'Liquid fertilizer made from fish waste products.',
    benefits: ['Quick nutrient release', 'High in nitrogen', 'Contains trace elements'],
    applicationMethod: 'Dilute with water and apply directly to soil around plants.',
  },
  {
    name: 'Bone Meal',
    description: 'Made from ground animal bones, rich in phosphorus and calcium.',
    benefits: ['Promotes root development', 'Supports flowering and fruiting', 'Long-lasting effect'],
    applicationMethod: 'Work into soil before planting or mix into planting holes.',
  },
];

// Mock Crop Recommendations
export const mockCropRecommendations: CropRecommendation[] = [
  {
    id: '1',
    cropName: 'Tomatoes',
    description: 'Versatile fruit that thrives in warm conditions with good sunlight.',
    bestSeason: ['summer'],
    soilType: ['loamy', 'sandy'],
    waterRequirements: 'medium',
    growthDuration: 80,
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea',
    benefits: ['Rich in vitamins A and C', 'High yield', 'Multiple varieties available'],
    organicFertilizers: [mockOrganicFertilizers[0], mockOrganicFertilizers[2]],
  },
  {
    id: '2',
    cropName: 'Kale',
    description: 'Hardy leafy green that can withstand cooler temperatures.',
    bestSeason: ['spring', 'autumn'],
    soilType: ['loamy', 'clay'],
    waterRequirements: 'medium',
    growthDuration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1515872474884-980eeb8c0aa6',
    benefits: ['Cold resistant', 'Nutrient dense', 'Multiple harvests possible'],
    organicFertilizers: [mockOrganicFertilizers[0], mockOrganicFertilizers[1]],
  },
  {
    id: '3',
    cropName: 'Carrots',
    description: 'Root vegetable that prefers looser, well-drained soil.',
    bestSeason: ['spring', 'autumn'],
    soilType: ['sandy', 'loamy'],
    waterRequirements: 'medium',
    growthDuration: 70,
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
    benefits: ['Stores well', 'Low maintenance', 'Good companion plant'],
    organicFertilizers: [mockOrganicFertilizers[0], mockOrganicFertilizers[3]],
  },
  {
    id: '4',
    cropName: 'Squash',
    description: 'Sprawling plants that produce abundant fruit in warm weather.',
    bestSeason: ['summer'],
    soilType: ['loamy'],
    waterRequirements: 'high',
    growthDuration: 90,
    imageUrl: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818',
    benefits: ['High yield', 'Long harvest period', 'Stores well'],
    organicFertilizers: [mockOrganicFertilizers[0], mockOrganicFertilizers[2]],
  },
  {
    id: '5',
    cropName: 'Lettuce',
    description: 'Quick-growing leafy green that prefers cooler temperatures.',
    bestSeason: ['spring', 'autumn'],
    soilType: ['loamy', 'sandy'],
    waterRequirements: 'medium',
    growthDuration: 45,
    imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1',
    benefits: ['Fast growing', 'Multiple harvests', 'Space efficient'],
    organicFertilizers: [mockOrganicFertilizers[1], mockOrganicFertilizers[2]],
  },
];
