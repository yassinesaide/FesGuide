export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: 'DISCOUNT' | 'FEATURE_ACCESS' | 'EXTENSION' | 'VIRTUAL_GUIDE_HOURS';
  value: number | string;
  thumbnail: string;
}

export interface UserRewards {
  userId: string;
  points: number;
  tier: RewardsTier;
  pointsHistory: PointsTransaction[];
  redeemedRewards: RedeemedReward[];
}

export interface PointsTransaction {
  id: string;
  date: Date;
  points: number;
  type: 'EARNED' | 'SPENT';
  description: string;
}

export interface RedeemedReward {
  id: string;
  rewardId: string;
  dateRedeemed: Date;
  expiryDate?: Date;
  status: 'ACTIVE' | 'USED' | 'EXPIRED';
}

export enum RewardsTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM'
}

export const REWARDS_TIERS = {
  [RewardsTier.BRONZE]: {
    name: 'Bronze Explorer',
    minPoints: 0,
    perks: ['5% off bundles', 'Birthday reward']
  },
  [RewardsTier.SILVER]: {
    name: 'Silver Wanderer',
    minPoints: 1000,
    perks: ['10% off bundles', 'Birthday reward', '2x points on purchases']
  },
  [RewardsTier.GOLD]: {
    name: 'Gold Adventurer',
    minPoints: 5000,
    perks: ['15% off bundles', 'Birthday reward', '3x points on purchases', 'Priority support']
  },
  [RewardsTier.PLATINUM]: {
    name: 'Platinum Voyager',
    minPoints: 10000,
    perks: ['20% off bundles', 'Birthday reward', '4x points on purchases', 'VIP support', 'Early access']
  }
};

export const AVAILABLE_REWARDS: Reward[] = [
  {
    id: 'discount-10',
    name: '10% Off Next Purchase',
    description: 'Get 10% off your next bundle or subscription purchase',
    pointsCost: 500,
    type: 'DISCOUNT',
    value: 10,
    thumbnail: '/images/rewards/discount.jpg'
  },
  {
    id: 'guide-24h',
    name: '24h Virtual Guide Extension',
    description: 'Extend your virtual guide access by 24 hours',
    pointsCost: 750,
    type: 'VIRTUAL_GUIDE_HOURS',
    value: 24,
    thumbnail: '/images/rewards/guide.jpg'
  },
  {
    id: 'premium-week',
    name: '1 Week Premium Access',
    description: 'Try all premium features for one week',
    pointsCost: 1500,
    type: 'FEATURE_ACCESS',
    value: 'premium-trial',
    thumbnail: '/images/rewards/premium.jpg'
  },
  {
    id: 'subscription-extension',
    name: '1 Month Extension',
    description: 'Extend your current subscription by one month',
    pointsCost: 2500,
    type: 'EXTENSION',
    value: 30,
    thumbnail: '/images/rewards/extension.jpg'
  }
];

class RewardsService {
  private userRewards: UserRewards | null = null;

  async getUserRewards(): Promise<UserRewards | null> {
    // In a real implementation, this would fetch from your backend
    return this.userRewards;
  }

  async initializeUser(userId: string): Promise<UserRewards> {
    this.userRewards = {
      userId,
      points: 0,
      tier: RewardsTier.BRONZE,
      pointsHistory: [],
      redeemedRewards: []
    };
    return this.userRewards;
  }

  async addPoints(points: number, description: string): Promise<boolean> {
    try {
      if (!this.userRewards) return false;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const transaction: PointsTransaction = {
        id: `PTS-${Date.now()}`,
        date: new Date(),
        points,
        type: 'EARNED',
        description
      };

      this.userRewards.points += points;
      this.userRewards.pointsHistory.push(transaction);
      this.updateTier();

      return true;
    } catch (error) {
      console.error('Add points error:', error);
      return false;
    }
  }

  async redeemReward(rewardId: string): Promise<{ success: boolean; redeemedReward?: RedeemedReward }> {
    try {
      if (!this.userRewards) throw new Error('User not initialized');

      const reward = AVAILABLE_REWARDS.find(r => r.id === rewardId);
      if (!reward) throw new Error('Reward not found');

      if (this.userRewards.points < reward.pointsCost) {
        throw new Error('Insufficient points');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Deduct points
      const transaction: PointsTransaction = {
        id: `PTS-${Date.now()}`,
        date: new Date(),
        points: -reward.pointsCost,
        type: 'SPENT',
        description: `Redeemed: ${reward.name}`
      };

      const redeemedReward: RedeemedReward = {
        id: `RWD-${Date.now()}`,
        rewardId: reward.id,
        dateRedeemed: new Date(),
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        status: 'ACTIVE'
      };

      this.userRewards.points -= reward.pointsCost;
      this.userRewards.pointsHistory.push(transaction);
      this.userRewards.redeemedRewards.push(redeemedReward);
      this.updateTier();

      return {
        success: true,
        redeemedReward
      };
    } catch (error) {
      console.error('Redeem reward error:', error);
      return {
        success: false
      };
    }
  }

  private updateTier() {
    if (!this.userRewards) return;

    const points = this.userRewards.points;
    
    if (points >= REWARDS_TIERS[RewardsTier.PLATINUM].minPoints) {
      this.userRewards.tier = RewardsTier.PLATINUM;
    } else if (points >= REWARDS_TIERS[RewardsTier.GOLD].minPoints) {
      this.userRewards.tier = RewardsTier.GOLD;
    } else if (points >= REWARDS_TIERS[RewardsTier.SILVER].minPoints) {
      this.userRewards.tier = RewardsTier.SILVER;
    } else {
      this.userRewards.tier = RewardsTier.BRONZE;
    }
  }

  getAvailableRewards(): Reward[] {
    return AVAILABLE_REWARDS;
  }

  getTierInfo(tier: RewardsTier) {
    return REWARDS_TIERS[tier];
  }

  getPointsToNextTier(): number {
    if (!this.userRewards) return 0;

    const currentPoints = this.userRewards.points;
    const currentTier = this.userRewards.tier;

    switch (currentTier) {
      case RewardsTier.BRONZE:
        return REWARDS_TIERS[RewardsTier.SILVER].minPoints - currentPoints;
      case RewardsTier.SILVER:
        return REWARDS_TIERS[RewardsTier.GOLD].minPoints - currentPoints;
      case RewardsTier.GOLD:
        return REWARDS_TIERS[RewardsTier.PLATINUM].minPoints - currentPoints;
      case RewardsTier.PLATINUM:
        return 0;
    }
  }
}

export const rewardsService = new RewardsService();
export default rewardsService; 