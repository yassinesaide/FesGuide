import { ProductType } from './paymentService';

export interface Bundle {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;  // To show savings
  features: string[];
  includes: {
    type: ProductType;
    items: string[];  // Product IDs
  }[];
  popularityRank: number;
  duration?: number;  // in days
  thumbnail: string;
}

export const PREMIUM_BUNDLES: Bundle[] = [
  {
    id: 'essential-explorer',
    name: 'Essential Explorer',
    description: 'Perfect for a short visit to Fes. Get the must-have guides and features.',
    price: 49.99,
    originalPrice: 79.99,
    popularityRank: 2,
    duration: 3,
    thumbnail: '/images/bundles/essential.jpg',
    features: [
      '1 Premium Audio Tour',
      'Basic Digital Map',
      '24h Virtual Guide Access',
      '2 Premium Photo Locations',
      'Basic Itinerary Template'
    ],
    includes: [
      {
        type: ProductType.AUDIO_TOUR,
        items: ['medina-secrets']
      },
      {
        type: ProductType.DIGITAL_MAP,
        items: ['basic-medina-map']
      },
      {
        type: ProductType.VIRTUAL_GUIDE,
        items: ['guide-24h']
      },
      {
        type: ProductType.PHOTO_LOCATION,
        items: ['blue-gate', 'tannery-view']
      }
    ]
  },
  {
    id: 'premium-traveler',
    name: 'Premium Traveler',
    description: 'The complete Fes experience with all premium content and extended guide access.',
    price: 99.99,
    originalPrice: 159.99,
    popularityRank: 1,
    duration: 7,
    thumbnail: '/images/bundles/premium.jpg',
    features: [
      'All Audio Tours',
      'All Digital Maps',
      '72h Virtual Guide Access',
      'Custom 3-Day Itinerary',
      'All Photo Locations',
      'Priority Support'
    ],
    includes: [
      {
        type: ProductType.AUDIO_TOUR,
        items: ['medina-secrets', 'artisan-tour', 'food-tour', 'historical-tour']
      },
      {
        type: ProductType.DIGITAL_MAP,
        items: ['complete-medina-map', 'artisan-map', 'food-market-map']
      },
      {
        type: ProductType.VIRTUAL_GUIDE,
        items: ['guide-72h']
      },
      {
        type: ProductType.PHOTO_LOCATION,
        items: ['blue-gate', 'tannery-view', 'medina-sunset', 'palace-view', 'garden-view']
      }
    ]
  },
  {
    id: 'ultimate-explorer',
    name: 'Ultimate Explorer',
    description: 'The most comprehensive package with unlimited access and exclusive perks.',
    price: 199.99,
    originalPrice: 299.99,
    popularityRank: 3,
    duration: 30,
    thumbnail: '/images/bundles/ultimate.jpg',
    features: [
      'All Current & Future Content',
      '7-Day Virtual Guide Access',
      'Unlimited Map Updates',
      'Custom Itinerary Creation',
      'Exclusive Photo Locations',
      'VIP Support',
      'Monthly New Content',
      'Early Access to New Features'
    ],
    includes: [
      {
        type: ProductType.AUDIO_TOUR,
        items: ['all']
      },
      {
        type: ProductType.DIGITAL_MAP,
        items: ['all']
      },
      {
        type: ProductType.VIRTUAL_GUIDE,
        items: ['guide-7d']
      },
      {
        type: ProductType.PHOTO_LOCATION,
        items: ['all']
      }
    ]
  }
];

class BundleService {
  private bundles: Bundle[] = PREMIUM_BUNDLES;

  getBundles(): Bundle[] {
    return this.bundles;
  }

  getBundleById(id: string): Bundle | undefined {
    return this.bundles.find(bundle => bundle.id === id);
  }

  getMostPopularBundle(): Bundle {
    return this.bundles.reduce((prev, current) => 
      prev.popularityRank < current.popularityRank ? prev : current
    );
  }

  calculateSavings(bundle: Bundle): number {
    return bundle.originalPrice - bundle.price;
  }

  calculateSavingsPercentage(bundle: Bundle): number {
    return Math.round((this.calculateSavings(bundle) / bundle.originalPrice) * 100);
  }

  async purchaseBundle(bundleId: string): Promise<{ success: boolean; transactionId?: string }> {
    try {
      // Here you would implement the actual purchase logic
      // This might involve:
      // 1. Payment processing
      // 2. Activating included features
      // 3. Updating user's permissions
      // 4. Recording the transaction
      
      const bundle = this.getBundleById(bundleId);
      if (!bundle) {
        throw new Error('Bundle not found');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      return {
        success: true,
        transactionId: `BUNDLE-${Date.now()}-${bundleId}`
      };
    } catch (error) {
      console.error('Bundle purchase error:', error);
      return {
        success: false
      };
    }
  }
}

export const bundleService = new BundleService();
export default bundleService; 