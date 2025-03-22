import { Request, Response } from 'express';

// Premium audio tours data
const premiumAudioTours = [
  { 
    id: 'medina-secrets', 
    title: 'Hidden Secrets of the Medina', 
    price: 4.99,
    description: 'Discover hidden gems and secret spots in the ancient Medina of Fes with our expert audio guide.',
    duration: '45 minutes',
    audioUrl: '/assets/audio/medina-secrets.mp3',
    coverImageUrl: '/images/audio-tour-medina-secrets.jpg'
  },
  { 
    id: 'craft-workshops', 
    title: 'Artisan Workshop Tour', 
    price: 3.99,
    description: 'Visit the best artisan workshops in Fes and learn about traditional crafting techniques.',
    duration: '35 minutes',
    audioUrl: '/assets/audio/craft-workshops.mp3',
    coverImageUrl: '/images/audio-tour-craft-workshops.jpg'
  },
  { 
    id: 'food-journey', 
    title: 'Culinary Journey Through Fes', 
    price: 5.99,
    description: 'Explore the rich culinary traditions of Fes with recommendations for the best local dishes and eateries.',
    duration: '55 minutes',
    audioUrl: '/assets/audio/food-journey.mp3',
    coverImageUrl: '/images/audio-tour-food-journey.jpg'
  }
];

// Digital maps data
const digitalMaps = [
  { 
    id: 'medina-map', 
    title: 'Medina Navigation Map', 
    price: 2.99,
    description: 'Never get lost in the Medina again. This detailed map shows all major landmarks and hidden paths.',
    mapUrl: '/assets/maps/medina-map.jpg',
    thumbnailUrl: '/images/map-medina-map.jpg'
  },
  { 
    id: 'artisan-map', 
    title: 'Artisan Workshop Map', 
    price: 3.99,
    description: 'Find the best artisan workshops and leather tanneries with this specialized map.',
    mapUrl: '/assets/maps/artisan-map.jpg',
    thumbnailUrl: '/images/map-artisan-map.jpg'
  },
  { 
    id: 'food-tour-map', 
    title: 'Food Tour Map', 
    price: 2.99,
    description: 'Discover the best food spots in Fes, from street food to fine dining.',
    mapUrl: '/assets/maps/food-tour-map.jpg',
    thumbnailUrl: '/images/map-food-tour-map.jpg'
  }
];

// Custom itineraries
const customItineraries = [
  { 
    id: '1-day', 
    title: 'Perfect Day in Fes', 
    days: 1,
    price: 2.99,
    description: 'Make the most of a single day in Fes with this carefully planned itinerary.',
    pdfUrl: '/assets/itineraries/1-day-fes.pdf',
    thumbnailUrl: '/images/itinerary-1day.jpg'
  },
  { 
    id: '3-day', 
    title: 'Weekend in Fes', 
    days: 3,
    price: 5.99,
    description: 'The ideal 3-day plan to experience the best of Fes without rushing.',
    pdfUrl: '/assets/itineraries/3-day-fes.pdf',
    thumbnailUrl: '/images/itinerary-3day.jpg'
  },
  { 
    id: '7-day', 
    title: 'Complete Fes Experience', 
    days: 7,
    price: 8.99,
    description: 'A week-long comprehensive itinerary to deeply explore Fes and surrounding areas.',
    pdfUrl: '/assets/itineraries/7-day-fes.pdf',
    thumbnailUrl: '/images/itinerary-7day.jpg'
  }
];

// Photo locations
const photoLocations = [
  { 
    id: 'blue-gate', 
    title: 'Blue Gate at Sunset', 
    price: 1.99,
    description: 'Perfect timing and angle to capture the iconic Blue Gate in its best light.',
    bestTime: 'Sunset',
    gpsCoordinates: { latitude: 34.0614, longitude: -5.0023 },
    thumbnailUrl: '/images/photo-blue-gate.jpg'
  },
  { 
    id: 'tanneries-view', 
    title: 'Chouara Tanneries Overlook', 
    price: 1.99,
    description: 'The secret spot to photograph the famous tanneries without crowds.',
    bestTime: 'Morning',
    gpsCoordinates: { latitude: 34.0673, longitude: -4.9850 },
    thumbnailUrl: '/images/photo-tanneries-view.jpg'
  },
  { 
    id: 'medina-street', 
    title: 'Ancient Medina Alleyway', 
    price: 1.99,
    description: 'A picturesque alleyway perfect for capturing the essence of the Medina.',
    bestTime: 'Mid-day',
    gpsCoordinates: { latitude: 34.0631, longitude: -4.9903 },
    thumbnailUrl: '/images/photo-medina-street.jpg'
  }
];

// Get all premium audio tours
export const getAudioTours = (req: Request, res: Response): void => {
  // If not authenticated or premium, return basic info only
  if (!(req as any).user) {
    const limitedInfo = premiumAudioTours.map(({ id, title, description, price, duration, coverImageUrl }) => ({
      id, title, description, price, duration, coverImageUrl
    }));
    res.json({ audioTours: limitedInfo });
    return;
  }

  // Premium users get all details
  res.json({ audioTours: premiumAudioTours });
};

// Get audio tour by ID
export const getAudioTourById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const audioTour = premiumAudioTours.find(tour => tour.id === id);
  
  if (!audioTour) {
    res.status(404).json({ message: 'Audio tour not found' });
    return;
  }
  
  // If not premium, don't include audio URL
  if (!(req as any).isPremium) {
    const { audioUrl, ...limitedInfo } = audioTour;
    res.json({ audioTour: limitedInfo });
    return;
  }
  
  res.json({ audioTour });
};

// Get all digital maps
export const getDigitalMaps = (req: Request, res: Response): void => {
  // If not authenticated or premium, return basic info only
  if (!(req as any).user) {
    const limitedInfo = digitalMaps.map(({ id, title, description, price, thumbnailUrl }) => ({
      id, title, description, price, thumbnailUrl
    }));
    res.json({ digitalMaps: limitedInfo });
    return;
  }

  // Premium users get all details
  res.json({ digitalMaps });
};

// Get digital map by ID
export const getDigitalMapById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const map = digitalMaps.find(map => map.id === id);
  
  if (!map) {
    res.status(404).json({ message: 'Digital map not found' });
    return;
  }
  
  // If not premium, don't include map URL
  if (!(req as any).isPremium) {
    const { mapUrl, ...limitedInfo } = map;
    res.json({ map: limitedInfo });
    return;
  }
  
  res.json({ map });
};

// Get all custom itineraries
export const getItineraries = (req: Request, res: Response): void => {
  // If not authenticated or premium, return basic info only
  if (!(req as any).user) {
    const limitedInfo = customItineraries.map(({ id, title, description, days, price, thumbnailUrl }) => ({
      id, title, description, days, price, thumbnailUrl
    }));
    res.json({ itineraries: limitedInfo });
    return;
  }

  // Premium users get all details
  res.json({ itineraries: customItineraries });
};

// Get itinerary by ID
export const getItineraryById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const itinerary = customItineraries.find(itinerary => itinerary.id === id);
  
  if (!itinerary) {
    res.status(404).json({ message: 'Itinerary not found' });
    return;
  }
  
  // If not premium, don't include PDF URL
  if (!(req as any).isPremium) {
    const { pdfUrl, ...limitedInfo } = itinerary;
    res.json({ itinerary: limitedInfo });
    return;
  }
  
  res.json({ itinerary });
};

// Get all photo locations
export const getPhotoLocations = (req: Request, res: Response): void => {
  // If not authenticated or premium, return basic info only
  if (!(req as any).user) {
    const limitedInfo = photoLocations.map(({ id, title, description, bestTime, price, thumbnailUrl }) => ({
      id, title, description, bestTime, price, thumbnailUrl
    }));
    res.json({ photoLocations: limitedInfo });
    return;
  }

  // Premium users get all details including GPS coordinates
  res.json({ photoLocations });
};

// Get photo location by ID
export const getPhotoLocationById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const location = photoLocations.find(location => location.id === id);
  
  if (!location) {
    res.status(404).json({ message: 'Photo location not found' });
    return;
  }
  
  // If not premium, don't include GPS coordinates
  if (!(req as any).isPremium) {
    const { gpsCoordinates, ...limitedInfo } = location;
    res.json({ location: limitedInfo });
    return;
  }
  
  res.json({ location });
}; 