import { useState } from "react";
import { motion } from "framer-motion";
import {
  SubscriptionPlan,
  subscriptionService,
  SUBSCRIPTION_PLANS,
} from "../services/subscriptionService";

const SubscriptionPlans: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<"MONTHLY" | "YEARLY">(
    "YEARLY"
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredPlans = SUBSCRIPTION_PLANS.filter(
    (plan) => plan.billingPeriod === billingPeriod
  );

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    setIsProcessing(true);
    try {
      const result = await subscriptionService.subscribe(plan.id);
      if (result.success) {
        alert("Subscription successful! ID: " + result.subscriptionId);
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      alert("Failed to process subscription. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-12 bg-gradient-to-b from-white to-fes-cream/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-fes-blue sm:text-4xl">
            Choose Your Journey
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select the perfect plan for your Fes adventure
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-12 flex justify-center">
          <div className="relative bg-white rounded-full p-1 shadow-inner">
            <div className="flex space-x-1">
              <button
                onClick={() => setBillingPeriod("MONTHLY")}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  billingPeriod === "MONTHLY"
                    ? "bg-fes-blue text-white shadow-md"
                    : "text-gray-500 hover:text-fes-blue"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("YEARLY")}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  billingPeriod === "YEARLY"
                    ? "bg-fes-blue text-white shadow-md"
                    : "text-gray-500 hover:text-fes-blue"
                }`}
              >
                Yearly
                <span className="ml-1 text-xs font-normal">(Save 17%)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {filteredPlans.map((plan) => (
            <motion.div
              key={plan.id}
              className="relative rounded-2xl shadow-xl overflow-hidden bg-white border-2 border-transparent hover:border-fes-teal transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-fes-blue mb-4">
                  {plan.name}
                </h3>

                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-fes-blue">
                    ${plan.price}
                  </span>
                  <span className="ml-2 text-gray-500">
                    /{billingPeriod.toLowerCase()}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg
                        className="h-5 w-5 text-fes-teal mr-2"
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
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={isProcessing}
                  className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300
                    ${
                      isProcessing
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-fes-blue to-fes-teal hover:from-fes-teal hover:to-fes-blue hover:shadow-lg"
                    }
                  `}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Subscribe Now"
                  )}
                </button>
              </div>

              {billingPeriod === "YEARLY" && (
                <div className="absolute top-0 right-0 bg-fes-amber text-white px-4 py-1 rounded-bl-lg">
                  2 Months Free
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All plans include a 30-day money-back guarantee
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Need help choosing? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
