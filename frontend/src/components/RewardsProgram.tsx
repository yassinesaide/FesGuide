import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Reward,
  UserRewards,
  RewardsTier,
  rewardsService,
  REWARDS_TIERS,
} from "../services/rewardsService";

const RewardsProgram: React.FC = () => {
  const [userRewards, setUserRewards] = useState<UserRewards | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const availableRewards = rewardsService.getAvailableRewards();

  useEffect(() => {
    // Initialize user rewards (in a real app, this would use the actual user ID)
    rewardsService.initializeUser("demo-user").then(setUserRewards);
  }, []);

  const handleRedeemReward = async (reward: Reward) => {
    setIsProcessing(true);
    try {
      const result = await rewardsService.redeemReward(reward.id);
      if (result.success) {
        alert("Reward redeemed successfully!");
        // Refresh user rewards
        const updated = await rewardsService.getUserRewards();
        setUserRewards(updated);
      } else {
        throw new Error("Failed to redeem reward");
      }
    } catch (error) {
      alert("Failed to redeem reward. Please try again.");
    } finally {
      setIsProcessing(false);
      setSelectedReward(null);
    }
  };

  if (!userRewards) return null;

  const currentTier = REWARDS_TIERS[userRewards.tier];
  const pointsToNext = rewardsService.getPointsToNextTier();
  const nextTierName =
    userRewards.tier === RewardsTier.PLATINUM
      ? null
      : REWARDS_TIERS[
          Object.values(RewardsTier)[
            Object.values(RewardsTier).indexOf(userRewards.tier) + 1
          ]
        ].name;

  return (
    <div className="py-12 bg-gradient-to-b from-fes-cream/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-fes-blue sm:text-4xl">
            FesGuide Rewards
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Earn points and unlock exclusive perks
          </p>
        </div>

        {/* User Status */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-600">
                Current Tier
              </h3>
              <p className="text-2xl font-bold text-fes-blue">
                {currentTier.name}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-600">
                Points Balance
              </h3>
              <p className="text-2xl font-bold text-fes-teal">
                {userRewards.points} points
              </p>
            </div>
            <div>
              {nextTierName && (
                <>
                  <h3 className="text-lg font-semibold text-gray-600">
                    Next Tier
                  </h3>
                  <p className="text-2xl font-bold text-fes-amber">
                    {pointsToNext} points to {nextTierName}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {nextTierName && (
            <div className="mt-8">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-fes-teal to-fes-blue"
                  style={{
                    width: `${Math.min(
                      (userRewards.points /
                        (currentTier.minPoints + pointsToNext)) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Current Perks */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-600 mb-4">
              Your Perks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentTier.perks.map((perk, index) => (
                <div
                  key={index}
                  className="flex items-center bg-fes-cream/10 rounded-lg p-4"
                >
                  <svg
                    className="h-5 w-5 text-fes-amber mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {perk}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Available Rewards */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-fes-blue text-center mb-8">
            Available Rewards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {availableRewards.map((reward) => (
              <motion.div
                key={reward.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-300 ${
                  userRewards.points >= reward.pointsCost
                    ? "border-fes-teal hover:border-fes-blue"
                    : "border-gray-200"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-48">
                  <img
                    src={reward.thumbnail}
                    alt={reward.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-fes-blue text-white px-3 py-1 rounded-bl-lg">
                    {reward.pointsCost} pts
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-fes-blue mb-2">
                    {reward.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {reward.description}
                  </p>
                  <button
                    onClick={() => handleRedeemReward(reward)}
                    disabled={
                      isProcessing || userRewards.points < reward.pointsCost
                    }
                    className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
                      userRewards.points >= reward.pointsCost
                        ? "bg-gradient-to-r from-fes-teal to-fes-blue hover:from-fes-blue hover:to-fes-teal"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {isProcessing
                      ? "Processing..."
                      : userRewards.points >= reward.pointsCost
                      ? "Redeem Now"
                      : `Need ${
                          reward.pointsCost - userRewards.points
                        } more points`}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Points History */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-fes-blue text-center mb-8">
            Points History
          </h3>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="max-h-64 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-fes-blue text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {userRewards.pointsHistory.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {transaction.description}
                      </td>
                      <td
                        className={`px-6 py-4 text-right font-medium ${
                          transaction.type === "EARNED"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "EARNED" ? "+" : "-"}
                        {transaction.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsProgram;
