import { useState } from "react";
import { motion } from "framer-motion";
import { Bundle, bundleService } from "../services/bundleService";

const PremiumBundles: React.FC = () => {
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const bundles = bundleService.getBundles();

  const handlePurchase = async (bundle: Bundle) => {
    setIsProcessing(true);
    try {
      const result = await bundleService.purchaseBundle(bundle.id);
      if (result.success) {
        // Show success message and handle post-purchase actions
        alert("Purchase successful! Transaction ID: " + result.transactionId);
      } else {
        throw new Error("Purchase failed");
      }
    } catch (error) {
      alert("Failed to process purchase. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-12 bg-gradient-to-b from-fes-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-fes-blue sm:text-4xl">
            Choose Your Perfect Bundle
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Unlock the full potential of your Fes experience
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {bundles.map((bundle) => (
            <motion.div
              key={bundle.id}
              className={`relative rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
                bundle.popularityRank === 1
                  ? "border-2 border-fes-amber"
                  : "border border-gray-200"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {bundle.popularityRank === 1 && (
                <div className="absolute top-0 right-0 bg-fes-amber text-white px-4 py-1 rounded-bl-lg z-10">
                  Most Popular
                </div>
              )}

              <div className="relative h-48">
                <div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url(${bundle.thumbnail})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{bundle.name}</h3>
                  <p className="text-white/80">{bundle.duration} days access</p>
                </div>
              </div>

              <div className="p-6 bg-white">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-fes-blue">
                    ${bundle.price}
                  </span>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ${bundle.originalPrice}
                  </span>
                  <span className="ml-2 text-sm text-green-600 font-semibold">
                    Save {bundleService.calculateSavingsPercentage(bundle)}%
                  </span>
                </div>

                <p className="mt-4 text-gray-600">{bundle.description}</p>

                <ul className="mt-6 space-y-3">
                  {bundle.features.map((feature, index) => (
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
                  onClick={() => handlePurchase(bundle)}
                  disabled={isProcessing}
                  className={`mt-8 w-full rounded-lg px-4 py-3 text-center font-semibold text-white transition-all duration-300
                    ${
                      bundle.popularityRank === 1
                        ? "bg-gradient-to-r from-fes-amber to-fes-terracotta hover:from-fes-terracotta hover:to-fes-amber"
                        : "bg-gradient-to-r from-fes-blue to-fes-teal hover:from-fes-teal hover:to-fes-blue"
                    }
                    ${
                      isProcessing
                        ? "opacity-75 cursor-not-allowed"
                        : "hover:shadow-lg"
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
                    "Get Started"
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All bundles come with a 30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumBundles;
