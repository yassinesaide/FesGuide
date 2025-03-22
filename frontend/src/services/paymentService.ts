// Payment Processing Service for FesGuide
// This service handles all transactions and passive income streams

import { v4 as uuidv4 } from 'uuid';

// Product types for tracking analytics and income sources
export enum ProductType {
  AUDIO_TOUR = 'audio_tour',
  DIGITAL_MAP = 'digital_map',
  CUSTOM_ITINERARY = 'custom_itinerary',
  VIRTUAL_GUIDE = 'virtual_guide',
  PHOTO_LOCATION = 'photo_location',
  AFFILIATE_BOOKING = 'affiliate_booking'
}

// Rental durations for virtual guides
export enum RentalDuration {
  HOURS_24 = '24_hours',
  HOURS_72 = '72_hours',
  DAYS_7 = '7_days'
}

// Transaction details interface
export interface Transaction {
  id: string;
  userId: string;
  productType: ProductType;
  productId: string;
  amount: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'refunded';
  metadata?: Record<string, any>;
}

// Premium guides and their pricing
export const premiumAudioTours = [
  { 
    id: 'medina-secrets', 
    title: 'Hidden Secrets of the Medina', 
    price: 4.99,
    description: 'Discover hidden gems and secret spots in the ancient Medina of Fes with our expert audio guide.',
    duration: '45 minutes'
  },
  { 
    id: 'craft-workshops', 
    title: 'Artisan Workshop Tour', 
    price: 3.99,
    description: 'Visit the best artisan workshops in Fes and learn about traditional crafting techniques.',
    duration: '35 minutes'
  },
  { 
    id: 'food-journey', 
    title: 'Culinary Journey Through Fes', 
    price: 5.99,
    description: 'Explore the rich culinary traditions of Fes with recommendations for the best local dishes and eateries.',
    duration: '55 minutes'
  }
];

// Digital maps available for purchase
export const digitalMaps = [
  {
    id: 'artisan-map',
    title: 'Artisan Workshop Maps',
    price: 3.99,
    description: 'Detailed maps showing the best artisan workshops in Fes with insider information.'
  },
  {
    id: 'medina-navigation',
    title: 'Medina Navigation Map',
    price: 2.99,
    description: 'Never get lost in the Medina again with this detailed navigation map and key landmarks.'
  },
  {
    id: 'food-tasting-route',
    title: 'Food Tasting Route',
    price: 3.49,
    description: 'The perfect route for sampling the best Moroccan cuisine throughout Fes.'
  }
];

// Itinerary options
export const itineraryOptions = [
  { 
    id: 'itinerary-1day', 
    days: 1, 
    price: 2.99, 
    title: 'Essential Fes - 1 Day',
    description: 'Essential Fes highlights for quick visits' 
  },
  { 
    id: 'itinerary-3day', 
    days: 3, 
    price: 5.99, 
    title: 'Complete Fes - 3 Days',
    description: 'Comprehensive exploration of all major areas' 
  },
  { 
    id: 'itinerary-5day', 
    days: 5, 
    price: 8.99, 
    title: 'Fes & Beyond - 5 Days',
    description: 'Deep dive including day trips to nearby attractions' 
  }
];

// Virtual guide rental options
export const virtualGuideOptions = [
  { 
    id: 'guide-24h',
    hours: 24, 
    price: 2.99, 
    features: ['Text Q&A', 'Basic Recommendations'],
    duration: RentalDuration.HOURS_24
  },
  { 
    id: 'guide-72h',
    hours: 72, 
    price: 7.99, 
    features: ['Unlimited Q&A', '3 Image Requests', '1 Audio Guide'],
    duration: RentalDuration.HOURS_72
  },
  { 
    id: 'guide-7d',
    hours: 168, 
    price: 14.99, 
    features: ['All Features', 'Unlimited Images', 'Offline Access', 'Emergency Support'],
    duration: RentalDuration.DAYS_7
  }
];

// Premium photo locations
export const photoLocations = [
  {
    id: 'blue-gate-sunset',
    title: 'Blue Gate Sunset',
    price: 1.99,
    coordinates: { latitude: 34.0636, longitude: -4.9847 },
    bestTime: '1 hour before sunset',
    photographyTips: 'Use a wide-angle lens to capture the full gate. Position yourself slightly to the right for the best composition.'
  },
  {
    id: 'medina-viewpoint',
    title: 'Medina Viewpoint',
    price: 1.99,
    coordinates: { latitude: 34.0722, longitude: -4.9775 },
    bestTime: 'Early morning or late afternoon',
    photographyTips: 'Bring a telephoto lens to capture beautiful details of the city. The golden hour light makes the city glow.'
  },
  {
    id: 'hidden-courtyard',
    title: 'Hidden Courtyard',
    price: 1.99,
    coordinates: { latitude: 34.0645, longitude: -4.9742 },
    bestTime: '10-11 AM for best light',
    photographyTips: 'This private courtyard requires permission but offers stunning traditional architecture. Shoot upward to capture the ornate ceiling.'
  },
  {
    id: 'tannery-overlook',
    title: 'Tannery Overlook',
    price: 1.99,
    coordinates: { latitude: 34.0647, longitude: -4.9739 },
    bestTime: 'Morning, when workers are active',
    photographyTips: 'Shoot from the terrace of the leather shop. Bring something to cover your nose as the smell can be strong.'
  }
];

// Affiliate hotel listings
export const affiliateHotels = [
  {
    id: 'riad-palais-andalou',
    name: 'Riad Palais Andalou',
    price: 120,
    priceUnit: 'night',
    rating: 4.8,
    commission: 0.15, // 15% commission
    bookingUrl: 'https://example.com/book/riad-palais-andalou?ref=fesguide',
    description: 'Luxury riad in the heart of Fes with traditional Moroccan architecture and modern amenities.'
  },
  {
    id: 'dar-seffarine',
    name: 'Dar Seffarine',
    price: 95,
    priceUnit: 'night',
    rating: 4.7,
    commission: 0.12, // 12% commission
    bookingUrl: 'https://example.com/book/dar-seffarine?ref=fesguide',
    description: 'Authentic Moroccan experience in a beautifully restored 14th-century house.'
  },
  {
    id: 'riad-fes',
    name: 'Riad Fes',
    price: 180,
    priceUnit: 'night',
    rating: 4.9,
    commission: 0.18, // 18% commission
    bookingUrl: 'https://example.com/book/riad-fes?ref=fesguide',
    description: 'Luxury 5-star riad with spa services and panoramic views of the medina.'
  },
  {
    id: 'dar-tahyra',
    name: 'Dar Tahyra',
    price: 85,
    priceUnit: 'night',
    rating: 4.6,
    commission: 0.14, // 14% commission
    bookingUrl: 'https://example.com/book/dar-tahyra?ref=fesguide',
    description: 'Boutique guesthouse offering comfortable rooms and a rooftop terrace with city views.'
  }
];

// Mock storage for transactions - would be replaced with a database in production
const transactions: Transaction[] = [];

// Mock user authentication - would be integrated with your auth system
const getCurrentUserId = (): string => {
  // In a real app, you'd get this from your auth service
  return localStorage.getItem('userId') || 'guest-user';
};

// Process a payment and return transaction details
export const processPayment = async (
  productType: ProductType,
  productId: string,
  amount: number,
  metadata?: Record<string, any>
): Promise<Transaction> => {
  // In a real app, this would integrate with Stripe, PayPal, etc.
  console.log(`Processing payment of $${amount} for ${productType} (${productId})`);
  
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Create transaction record
  const transaction: Transaction = {
    id: uuidv4(),
    userId: getCurrentUserId(),
    productType,
    productId,
    amount,
    timestamp: new Date(),
    status: 'completed',
    metadata
  };
  
  // Store transaction record
  transactions.push(transaction);
  
  // Log the transaction for analytics
  logTransactionAnalytics(transaction);
  
  return transaction;
};

// Purchase an audio tour
export const purchaseAudioTour = async (tourId: string): Promise<Transaction> => {
  const tour = premiumAudioTours.find(t => t.id === tourId);
  if (!tour) {
    throw new Error(`Audio tour with ID ${tourId} not found`);
  }
  
  const transaction = await processPayment(
    ProductType.AUDIO_TOUR,
    tourId,
    tour.price,
    { title: tour.title, duration: tour.duration }
  );
  
  // In a real app, you would unlock access to the content here
  unlockPremiumContent(tourId, ProductType.AUDIO_TOUR);
  
  return transaction;
};

// Purchase a digital map
export const purchaseDigitalMap = async (mapId: string): Promise<Transaction> => {
  const map = digitalMaps.find(m => m.id === mapId);
  if (!map) {
    throw new Error(`Digital map with ID ${mapId} not found`);
  }
  
  const transaction = await processPayment(
    ProductType.DIGITAL_MAP,
    mapId,
    map.price,
    { title: map.title }
  );
  
  // In a real app, you would deliver the map download here
  unlockPremiumContent(mapId, ProductType.DIGITAL_MAP);
  
  return transaction;
};

// Purchase a custom itinerary
export const purchaseItinerary = async (itineraryId: string): Promise<Transaction> => {
  const itinerary = itineraryOptions.find(i => i.id === itineraryId);
  if (!itinerary) {
    throw new Error(`Itinerary with ID ${itineraryId} not found`);
  }
  
  const transaction = await processPayment(
    ProductType.CUSTOM_ITINERARY,
    itineraryId,
    itinerary.price,
    { title: itinerary.title, days: itinerary.days }
  );
  
  // In a real app, you would generate and deliver the itinerary here
  generateCustomItinerary(itineraryId);
  
  return transaction;
};

// Rent a virtual guide
export const rentVirtualGuide = async (guideOptionId: string): Promise<Transaction> => {
  const option = virtualGuideOptions.find(o => o.id === guideOptionId);
  if (!option) {
    throw new Error(`Guide option with ID ${guideOptionId} not found`);
  }
  
  const transaction = await processPayment(
    ProductType.VIRTUAL_GUIDE,
    guideOptionId,
    option.price,
    { 
      hours: option.hours,
      features: option.features,
      expiryDate: new Date(Date.now() + option.hours * 60 * 60 * 1000)
    }
  );
  
  // In a real app, you would activate the guide for the user
  activateVirtualGuide(option.duration);
  
  return transaction;
};

// Purchase photo location details
export const purchasePhotoLocation = async (locationId: string): Promise<Transaction> => {
  const location = photoLocations.find(l => l.id === locationId);
  if (!location) {
    throw new Error(`Photo location with ID ${locationId} not found`);
  }
  
  const transaction = await processPayment(
    ProductType.PHOTO_LOCATION,
    locationId,
    location.price,
    { title: location.title }
  );
  
  // In a real app, you would deliver the photo spot details
  unlockPhotoLocationDetails(locationId);
  
  return transaction;
};

// Track an affiliate booking
export const trackAffiliateBooking = async (hotelId: string, bookingAmount: number): Promise<Transaction> => {
  const hotel = affiliateHotels.find(h => h.id === hotelId);
  if (!hotel) {
    throw new Error(`Hotel with ID ${hotelId} not found`);
  }
  
  const commission = bookingAmount * hotel.commission;
  
  const transaction = await processPayment(
    ProductType.AFFILIATE_BOOKING,
    hotelId,
    commission,
    { 
      hotelName: hotel.name,
      bookingAmount,
      commissionRate: hotel.commission,
      commissionAmount: commission
    }
  );
  
  return transaction;
};

// Check if a user has purchased a specific product
export const hasUserPurchased = (productType: ProductType, productId: string): boolean => {
  const userId = getCurrentUserId();
  
  return transactions.some(
    t => t.userId === userId && 
         t.productType === productType && 
         t.productId === productId &&
         t.status === 'completed'
  );
};

// Get all transactions for the current user
export const getUserTransactions = (): Transaction[] => {
  const userId = getCurrentUserId();
  return transactions.filter(t => t.userId === userId);
};

// Check if user has an active virtual guide rental
export const hasActiveVirtualGuide = (): boolean => {
  const userId = getCurrentUserId();
  
  const latestRental = transactions
    .filter(t => 
      t.userId === userId && 
      t.productType === ProductType.VIRTUAL_GUIDE &&
      t.status === 'completed'
    )
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
  
  if (!latestRental || !latestRental.metadata?.expiryDate) {
    return false;
  }
  
  const expiryDate = new Date(latestRental.metadata.expiryDate);
  return expiryDate > new Date();
};

// Get statistics for passive income streams
export const getPassiveIncomeStats = (): Record<string, number> => {
  const stats: Record<string, number> = {
    totalRevenue: 0,
    audioTourRevenue: 0,
    digitalMapRevenue: 0,
    itineraryRevenue: 0,
    virtualGuideRevenue: 0,
    photoLocationRevenue: 0,
    affiliateRevenue: 0,
    transactionCount: transactions.length
  };
  
  transactions.forEach(t => {
    if (t.status === 'completed') {
      stats.totalRevenue += t.amount;
      
      switch (t.productType) {
        case ProductType.AUDIO_TOUR:
          stats.audioTourRevenue += t.amount;
          break;
        case ProductType.DIGITAL_MAP:
          stats.digitalMapRevenue += t.amount;
          break;
        case ProductType.CUSTOM_ITINERARY:
          stats.itineraryRevenue += t.amount;
          break;
        case ProductType.VIRTUAL_GUIDE:
          stats.virtualGuideRevenue += t.amount;
          break;
        case ProductType.PHOTO_LOCATION:
          stats.photoLocationRevenue += t.amount;
          break;
        case ProductType.AFFILIATE_BOOKING:
          stats.affiliateRevenue += t.amount;
          break;
      }
    }
  });
  
  return stats;
};

// Mock functions that would be implemented in a real application
const unlockPremiumContent = (contentId: string, type: ProductType) => {
  console.log(`Unlocking ${type} content: ${contentId}`);
  localStorage.setItem(`${type}_${contentId}_access`, 'granted');
};

const generateCustomItinerary = (itineraryId: string) => {
  console.log(`Generating custom itinerary: ${itineraryId}`);
  // In a real app, this would call your backend API to create a personalized itinerary
};

const activateVirtualGuide = (duration: RentalDuration) => {
  console.log(`Activating virtual guide for duration: ${duration}`);
  const now = new Date();
  let expiryDate: Date;
  
  switch (duration) {
    case RentalDuration.HOURS_24:
      expiryDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      break;
    case RentalDuration.HOURS_72:
      expiryDate = new Date(now.getTime() + 72 * 60 * 60 * 1000);
      break;
    case RentalDuration.DAYS_7:
      expiryDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      break;
  }
  
  localStorage.setItem('virtualGuideExpiry', expiryDate.toISOString());
};

const unlockPhotoLocationDetails = (locationId: string) => {
  console.log(`Unlocking photo location details: ${locationId}`);
  const location = photoLocations.find(l => l.id === locationId);
  if (location) {
    localStorage.setItem(`photo_${locationId}_access`, 'granted');
  }
};

// Analytics tracking for reporting and optimizing revenue streams
const logTransactionAnalytics = (transaction: Transaction) => {
  console.log('Transaction recorded for analytics:', transaction);
  // In a real app, this would send data to your analytics service like Google Analytics or Mixpanel
};

export default {
  // Products
  premiumAudioTours,
  digitalMaps,
  itineraryOptions,
  virtualGuideOptions,
  photoLocations,
  affiliateHotels,
  
  // Purchase functions
  purchaseAudioTour,
  purchaseDigitalMap,
  purchaseItinerary,
  rentVirtualGuide,
  purchasePhotoLocation,
  trackAffiliateBooking,
  
  // Utility functions
  hasUserPurchased,
  getUserTransactions,
  hasActiveVirtualGuide,
  getPassiveIncomeStats
}; 