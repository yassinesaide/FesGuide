import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "../components/ChatInterface";
import { createGlobalStyle } from "styled-components";
import AdminLoginUtil from "../components/auth/AdminLoginUtil";
import PremiumBundles from "../components/PremiumBundles";
import SubscriptionPlans from "../components/SubscriptionPlans";
import RewardsProgram from "../components/RewardsProgram";

// Import images
import qarawiyyin from "../assets/images/qarawin fes.jpg";
import medina from "../assets/images/old medina fes.jpg";
import entrance from "../assets/images/enter of the old medina.jpg";
import tannery from "../assets/images/dar dbegh.jpg";
import batha from "../assets/images/the enter of batha.jpg";
import riadEnter from "../assets/images/riad enter.jpg";

// Define image URLs with imported assets
const IMAGES = {
  qarawiyyin,
  medina,
  entrance,
  tannery,
  batha,
  riadEnter,
  riadCourtyard:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Riad_Fes_courtyard.jpg/1280px-Riad_Fes_courtyard.jpg",
  mosque:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Bou_Inania_Madrasa.jpg/1280px-Bou_Inania_Madrasa.jpg",
  palace:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Royal_Palace_of_Fez.jpg/1280px-Royal_Palace_of_Fez.jpg",
  background:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Moroccan_Zellige.jpg/1280px-Moroccan_Zellige.jpg",
  patterns: {
    arabic:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Arabic_pattern.svg/1000px-Arabic_pattern.svg.png",
    moroccan:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Moroccan_pattern.svg/1000px-Moroccan_pattern.svg.png",
    geometric:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Islamic_geometric_pattern.svg/1000px-Islamic_geometric_pattern.svg.png",
  },
};

const GlobalStyle = createGlobalStyle`
  .pulse-animation {
    position: relative;
  }
  .pulse-animation::after {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.2;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.2;
    }
    50% {
      transform: scale(1.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex flex-col">
      <GlobalStyle />
      {/* Riad Entrance Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.entrance}
            alt="Enter of the Old Medina"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto relative"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white font-arabic">
              مرحبا بكم في فاس
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Welcome to <span className="text-fes-amber">Fes</span>Guide
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Step into the ancient medina of Fes, where centuries of history
              await your discovery
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-20 pointer-events-auto">
              <Link
                to="/timeline"
                className="group relative overflow-hidden rounded-full bg-fes-amber px-8 py-4 transition-all duration-300 z-10"
              >
                <span className="relative z-10 text-lg font-semibold text-white">
                  Begin Your Journey
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-fes-terracotta to-fes-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Arabic Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent">
          <div
            className="h-full bg-repeat-x opacity-20"
            style={{ backgroundImage: `url(${IMAGES.patterns.arabic})` }}
          ></div>
        </div>
      </section>

      {/* Discover Section - Medina Experience */}
      <section className="relative min-h-screen bg-fes-cream overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${IMAGES.patterns.geometric})`,
            backgroundRepeat: "repeat",
            backgroundSize: "100px",
          }}
        />

        <div className="container mx-auto px-6 py-24">
          <div className="max-w-7xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-fes-blue mb-6">
                Discover the Heart of Morocco
              </h2>
              <p className="text-xl text-gray-600">
                Journey through the ancient gates into a world of wonder
              </p>
            </div>

            {/* Interactive Medina Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Side - Map Navigation */}
              <div className="lg:col-span-8 relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative h-[700px] rounded-3xl overflow-hidden shadow-2xl"
                >
                  {/* Main Image */}
                  <img
                    src={IMAGES.riadEnter}
                    alt="Traditional Riad Entrance"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay with Moroccan Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

                  {/* Interactive Points */}
                  <div className="absolute inset-0">
                    {/* Point 1 - Entrance */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-1/4 left-1/4"
                    >
                      <div className="relative group">
                        <div className="w-6 h-6 bg-fes-amber rounded-full pulse-animation" />
                        <div className="absolute -top-12 -left-24 bg-white/90 rounded-lg p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-48">
                          <p className="text-sm font-semibold text-fes-blue">
                            Bab Boujloud
                          </p>
                          <p className="text-xs text-gray-600">
                            The famous Blue Gate entrance
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Point 2 - Courtyard */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute top-1/2 right-1/3"
                    >
                      <div className="relative group">
                        <div className="w-6 h-6 bg-fes-teal rounded-full pulse-animation" />
                        <div className="absolute -top-12 -left-24 bg-white/90 rounded-lg p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-48">
                          <p className="text-sm font-semibold text-fes-blue">
                            Traditional Courtyard
                          </p>
                          <p className="text-xs text-gray-600">
                            Center of Moroccan daily life
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Point 3 - Architecture */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="absolute bottom-1/4 left-1/3"
                    >
                      <div className="relative group">
                        <div className="w-6 h-6 bg-fes-terracotta rounded-full pulse-animation" />
                        <div className="absolute -top-12 -left-24 bg-white/90 rounded-lg p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-48">
                          <p className="text-sm font-semibold text-fes-blue">
                            Islamic Architecture
                          </p>
                          <p className="text-xs text-gray-600">
                            Centuries of artistic tradition
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Navigation Compass */}
                  <div className="absolute top-6 right-6 bg-white/90 rounded-full p-4 shadow-xl">
                    <svg
                      className="w-8 h-8 text-fes-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12l-4-4v8l4-4zm0 0l4-4v8l-4-4z"
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Information */}
              <div className="lg:col-span-4 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white rounded-2xl p-8 shadow-xl relative"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-fes-amber/20 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-fes-amber"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-fes-blue">
                          Interactive Navigation
                        </h3>
                        <p className="text-gray-600">
                          Explore key landmarks with our guide
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-fes-teal/20 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-fes-teal"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-fes-blue">
                          Real-time Updates
                        </h3>
                        <p className="text-gray-600">
                          Live information as you explore
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-fes-terracotta/20 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-fes-terracotta"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-fes-blue">
                          Cultural Insights
                        </h3>
                        <p className="text-gray-600">
                          Discover hidden stories and traditions
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-8 relative z-20 pointer-events-auto">
                    <Link
                      to="/timeline"
                      className="block w-full bg-gradient-to-r from-fes-blue to-fes-teal text-white text-center py-4 rounded-xl hover:shadow-lg transition-all duration-300 relative z-10"
                    >
                      Start Exploring
                    </Link>
                  </div>
                </motion.div>

                {/* Quick Facts */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <h4 className="font-semibold text-fes-blue mb-4">
                    Did You Know?
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    The Medina of Fes el Bali is the largest car-free urban area
                    in the world, with over 9,000 winding streets and alleys to
                    explore.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Locations */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-fes-blue">Sacred Places</h2>
            <p className="text-xl text-gray-600 mt-4">
              Explore the spiritual heart of Fes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative h-[400px] rounded-xl overflow-hidden"
            >
              <img
                src={IMAGES.qarawiyyin}
                alt="Al-Qarawiyyin Mosque"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white">Al-Qarawiyyin</h3>
                <p className="text-white/80">World's oldest university</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative h-[400px] rounded-xl overflow-hidden"
            >
              <img
                src={IMAGES.medina}
                alt="Fes Medina"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white">Fes el Bali</h3>
                <p className="text-white/80">The historic medina</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group relative h-[400px] rounded-xl overflow-hidden"
            >
              <img
                src={IMAGES.tannery}
                alt="Dar Dbegh Tannery"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white">
                  Chouara Tannery
                </h3>
                <p className="text-white/80">Traditional leather crafting</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Riad Experience Section */}
      <section className="relative py-24 bg-fes-cream/20">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${IMAGES.patterns.moroccan})`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px",
          }}
        ></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 relative"
            >
              <h2 className="text-4xl font-bold text-fes-blue">
                Experience the Magic of Fes
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Let Marhaba be your guide through the enchanting streets of Fes.
                From the bustling souks to the tranquil riads, discover the
                authentic soul of Morocco's spiritual capital.
              </p>
              <div className="pt-8 relative z-20 pointer-events-auto">
                <Link
                  to="/timeline"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-fes-blue to-fes-teal text-white px-8 py-4 rounded-full group hover:shadow-lg transition-all duration-300 relative z-10"
                >
                  <span className="text-lg font-semibold">
                    Start Your Journey
                  </span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="premium-bundles" className="relative">
        <PremiumBundles />
      </section>

      <section id="subscription-plans" className="relative">
        <SubscriptionPlans />
      </section>

      <section id="rewards-program" className="relative">
        <RewardsProgram />
      </section>

      {/* Marhaba Chat Bot */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <ChatInterface isOpen={isChatOpen} onClose={toggleChat} />
          )}
        </AnimatePresence>

        <div className="flex flex-col items-center">
          <motion.button
            onClick={toggleChat}
            className="relative w-16 h-16 rounded-full shadow-lg overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              delay: 0.5,
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-fes-teal to-fes-blue"
              animate={{
                background: [
                  "linear-gradient(to right, #0ea5e9, #3b82f6)",
                  "linear-gradient(to right, #3b82f6, #8b5cf6)",
                  "linear-gradient(to right, #8b5cf6, #ec4899)",
                  "linear-gradient(to right, #ec4899, #f97316)",
                  "linear-gradient(to right, #f97316, #0ea5e9)",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <div
              className="absolute inset-0 bg-center bg-cover opacity-20 mix-blend-overlay"
              style={{ backgroundImage: `url(${IMAGES.background})` }}
            />

            {!isChatOpen ? (
              <motion.div
                className="relative z-10 flex items-center justify-center w-full h-full"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <motion.span
                  className="absolute -top-2 -right-2 bg-fes-amber text-xs text-fes-blue font-bold w-5 h-5 flex items-center justify-center rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 1.5,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 400,
                  }}
                >
                  1
                </motion.span>
              </motion.div>
            ) : (
              <motion.div
                className="relative z-10 flex items-center justify-center w-full h-full"
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.div>
            )}
          </motion.button>

          <motion.div
            className="mt-2 bg-white px-4 py-1.5 rounded-full shadow-md"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <motion.p
              className="text-sm font-medium text-fes-blue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Ask Marhaba
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
