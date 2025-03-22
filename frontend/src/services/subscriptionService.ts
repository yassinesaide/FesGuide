import { Bundle } from './bundleService';

export enum SubscriptionTier {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  ULTIMATE = 'ULTIMATE'
}

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  features: string[];
  bundleId?: string;
}

export interface UserPermissions {
  canAccessAudioTours: boolean;
  canAccessDigitalMaps: boolean;
  canAccessVirtualGuide: boolean;
  canAccessPhotoLocations: boolean;
  canAccessCustomItineraries: boolean;
  hasVIPSupport: boolean;
  hasEarlyAccess: boolean;
  maxItineraries: number;
  maxPhotoLocations: number;
  maxGuideHours: number;
}

const TIER_PERMISSIONS: Record<SubscriptionTier, UserPermissions> = {
  [SubscriptionTier.FREE]: {
    canAccessAudioTours: false,
    canAccessDigitalMaps: true,
    canAccessVirtualGuide: false,
    canAccessPhotoLocations: false,
    canAccessCustomItineraries: false,
    hasVIPSupport: false,
    hasEarlyAccess: false,
    maxItineraries: 0,
    maxPhotoLocations: 0,
    maxGuideHours: 0
  },
  [SubscriptionTier.BASIC]: {
    canAccessAudioTours: true,
    canAccessDigitalMaps: true,
    canAccessVirtualGuide: true,
    canAccessPhotoLocations: true,
    canAccessCustomItineraries: false,
    hasVIPSupport: false,
    hasEarlyAccess: false,
    maxItineraries: 1,
    maxPhotoLocations: 5,
    maxGuideHours: 24
  },
  [SubscriptionTier.PREMIUM]: {
    canAccessAudioTours: true,
    canAccessDigitalMaps: true,
    canAccessVirtualGuide: true,
    canAccessPhotoLocations: true,
    canAccessCustomItineraries: true,
    hasVIPSupport: true,
    hasEarlyAccess: false,
    maxItineraries: 3,
    maxPhotoLocations: 15,
    maxGuideHours: 72
  },
  [SubscriptionTier.ULTIMATE]: {
    canAccessAudioTours: true,
    canAccessDigitalMaps: true,
    canAccessVirtualGuide: true,
    canAccessPhotoLocations: true,
    canAccessCustomItineraries: true,
    hasVIPSupport: true,
    hasEarlyAccess: true,
    maxItineraries: -1, // unlimited
    maxPhotoLocations: -1, // unlimited
    maxGuideHours: 168 // 7 days
  }
};

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  price: number;
  billingPeriod: 'MONTHLY' | 'YEARLY';
  features: string[];
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'monthly-basic',
    name: 'Basic Monthly',
    tier: SubscriptionTier.BASIC,
    price: 9.99,
    billingPeriod: 'MONTHLY',
    features: [
      'Basic Digital Maps',
      '24h Virtual Guide',
      '5 Photo Locations',
      '1 Basic Itinerary'
    ]
  },
  {
    id: 'monthly-premium',
    name: 'Premium Monthly',
    tier: SubscriptionTier.PREMIUM,
    price: 19.99,
    billingPeriod: 'MONTHLY',
    features: [
      'All Digital Maps',
      '72h Virtual Guide',
      '15 Photo Locations',
      '3 Custom Itineraries',
      'Priority Support'
    ]
  },
  {
    id: 'monthly-ultimate',
    name: 'Ultimate Monthly',
    tier: SubscriptionTier.ULTIMATE,
    price: 39.99,
    billingPeriod: 'MONTHLY',
    features: [
      'All Features Unlimited',
      '7-Day Virtual Guide',
      'Unlimited Photo Locations',
      'Unlimited Itineraries',
      'VIP Support',
      'Early Access'
    ]
  },
  {
    id: 'yearly-basic',
    name: 'Basic Yearly',
    tier: SubscriptionTier.BASIC,
    price: 99.99,
    billingPeriod: 'YEARLY',
    features: [
      'Basic Digital Maps',
      '24h Virtual Guide',
      '5 Photo Locations',
      '1 Basic Itinerary',
      '2 Months Free'
    ]
  },
  {
    id: 'yearly-premium',
    name: 'Premium Yearly',
    tier: SubscriptionTier.PREMIUM,
    price: 199.99,
    billingPeriod: 'YEARLY',
    features: [
      'All Digital Maps',
      '72h Virtual Guide',
      '15 Photo Locations',
      '3 Custom Itineraries',
      'Priority Support',
      '2 Months Free'
    ]
  },
  {
    id: 'yearly-ultimate',
    name: 'Ultimate Yearly',
    tier: SubscriptionTier.ULTIMATE,
    price: 399.99,
    billingPeriod: 'YEARLY',
    features: [
      'All Features Unlimited',
      '7-Day Virtual Guide',
      'Unlimited Photo Locations',
      'Unlimited Itineraries',
      'VIP Support',
      'Early Access',
      '2 Months Free'
    ]
  }
];

class SubscriptionService {
  private currentSubscription: Subscription | null = null;

  async getCurrentSubscription(): Promise<Subscription | null> {
    // In a real implementation, this would fetch from your backend
    return this.currentSubscription;
  }

  async subscribe(planId: string): Promise<{ success: boolean; subscriptionId?: string }> {
    try {
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
      if (!plan) {
        throw new Error('Plan not found');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real implementation, this would:
      // 1. Process payment
      // 2. Create subscription in backend
      // 3. Update user permissions
      // 4. Send confirmation email

      const subscriptionId = `SUB-${Date.now()}-${planId}`;
      this.currentSubscription = {
        id: subscriptionId,
        userId: 'current-user', // This would come from auth service
        tier: plan.tier,
        startDate: new Date(),
        endDate: new Date(Date.now() + (plan.billingPeriod === 'YEARLY' ? 365 : 30) * 24 * 60 * 60 * 1000),
        autoRenew: true,
        features: plan.features
      };

      return {
        success: true,
        subscriptionId
      };
    } catch (error) {
      console.error('Subscription error:', error);
      return {
        success: false
      };
    }
  }

  async cancelSubscription(): Promise<boolean> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (this.currentSubscription) {
        this.currentSubscription.autoRenew = false;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Cancel subscription error:', error);
      return false;
    }
  }

  getPermissions(tier: SubscriptionTier): UserPermissions {
    return TIER_PERMISSIONS[tier];
  }

  async upgradeToBundle(bundle: Bundle): Promise<boolean> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real implementation, this would:
      // 1. Check if user has active subscription
      // 2. Calculate price difference
      // 3. Process additional payment if needed
      // 4. Update subscription with bundle features
      // 5. Update permissions

      if (this.currentSubscription) {
        this.currentSubscription.bundleId = bundle.id;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Bundle upgrade error:', error);
      return false;
    }
  }
}

export const subscriptionService = new SubscriptionService();
export default subscriptionService; 