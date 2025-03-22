import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  Paper,
  Button,
  Container,
  Grid,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  ArrowForward,
  ArrowBack,
  Place,
  AccessTime,
  EventNote,
  MenuBook,
  Public,
  Timeline as TimelineIcon,
  Architecture,
  Mosque,
  School,
  NavigateNext,
  NavigateBefore,
} from "@mui/icons-material";

// Timeline data representing key events in Fes history
const timelineEvents = [
  {
    id: "founding",
    year: 789,
    title: "Foundation of Fes",
    description:
      "Idris I founded the city of Fes on the banks of the Fes River, establishing what would become the spiritual and cultural capital of Morocco.",
    image:
      "https://images.unsplash.com/photo-1548017860-48fc112185c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: <Place />,
    color: "#f9a825",
    landmark: "The Ancient Walls",
    fact: 'The name "Fes" comes from the Arabic word "فأس" (Fas) which means pickaxe, referring to a golden pickaxe used to establish the city\'s boundaries.',
  },
  {
    id: "qarawiyyin",
    year: 859,
    title: "Al-Qarawiyyin University",
    description:
      "Fatima al-Fihri founded the Al-Qarawiyyin Mosque and University, recognized by UNESCO as the oldest existing continually operating higher educational institution in the world.",
    image:
      "https://images.unsplash.com/photo-1548121377-e7d6ce719d9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: <School />,
    color: "#00897b",
    landmark: "Al-Qarawiyyin University",
    fact: "The Al-Qarawiyyin Library houses some of the world's oldest manuscripts, including a 9th-century Quran and works by Aristotle and Ibn Khaldun.",
  },
  {
    id: "golden-age",
    year: 1250,
    title: "Golden Age of Fes",
    description:
      "Under the Marinid dynasty, Fes entered its golden age, becoming a major center for education, art, and trade in the Islamic world.",
    image:
      "https://images.unsplash.com/photo-1547636780-e41778614c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: <Architecture />,
    color: "#6a1b9a",
    landmark: "Bou Inania Madrasa",
    fact: "The Marinid dynasty established Fes el-Jdid (New Fes) as a royal city alongside the original medina, with magnificent palaces and gardens.",
  },
  {
    id: "tanneries",
    year: 1450,
    title: "Famous Tanneries",
    description:
      "The iconic Chouara Tanneries reached their full development during this period, creating a center for leather production that continues to operate today using traditional methods.",
    image:
      "https://images.unsplash.com/photo-1526659666039-bce4ce183b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: <Public />,
    color: "#d84315",
    landmark: "Chouara Tannery",
    fact: "The tanneries use natural dyes for leather coloring: poppy flower for red, mint for green, indigo for blue, saffron for yellow, and cedar wood for brown.",
  },
  {
    id: "colonial",
    year: 1912,
    title: "French Protectorate",
    description:
      "Morocco became a French protectorate, with Fes remaining a cultural and spiritual center despite the administrative capital moving to Rabat.",
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: <EventNote />,
    color: "#3949ab",
    landmark: "Ville Nouvelle",
    fact: 'The French built a "Ville Nouvelle" (New City) outside the medina walls, creating a stark contrast between the medieval and modern sections of Fes.',
  },
  {
    id: "independence",
    year: 1956,
    title: "Moroccan Independence",
    description:
      "Morocco gained independence from France, with Fes playing a significant role in the nationalist movement and preserving Moroccan identity.",
    image:
      "https://images.unsplash.com/photo-1536248320171-99353f642212?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: <Public />,
    color: "#2e7d32",
    landmark: "Royal Palace of Fes",
    fact: "The people of Fes were among the most active in the resistance against colonial rule, with the city serving as a center for nationalist movements.",
  },
  {
    id: "unesco",
    year: 1981,
    title: "UNESCO World Heritage",
    description:
      "The Medina of Fes was designated as a UNESCO World Heritage site for its outstanding universal value as one of the most complete medieval cities in the Arab world.",
    image:
      "https://images.unsplash.com/photo-1546005303-cc0d9d0b9958?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: <MenuBook />,
    color: "#1565c0",
    landmark: "Entire Fes el-Bali Medina",
    fact: "The medina contains over 9,000 streets and alleys, making it the world's largest urban pedestrian zone and car-free area.",
  },
  {
    id: "present",
    year: 2023,
    title: "Fes Today",
    description:
      "Today, Fes balances its rich history with modernization, remaining a spiritual and cultural capital while embracing tourism and sustainable development.",
    image:
      "https://images.unsplash.com/photo-1530021217482-524016f0d526?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    icon: <AccessTime />,
    color: "#ad1457",
    landmark: "Fes Festival of World Sacred Music",
    fact: "The annual Fes Festival of World Sacred Music brings together artists from diverse spiritual traditions, symbolizing the city's continued role as a bridge between cultures.",
  },
];

// Animation variants
const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
  }),
};

const pageTransition = {
  type: "spring",
  stiffness: 70,
  damping: 20,
};

const textVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const productListVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const productItemVariants = {
  hidden: {
    x: -20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// Define the gate data structure
interface GateData {
  id: number;
  name: string;
  arabicName: string;
  year: number;
  description: string;
  products: string[];
  story: string;
  imageUrl: string;
}

// Add fallback image handling
const fallbackImage =
  "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80";

// Gates of Fes Medina data
const gatesData: GateData[] = [
  {
    id: 1,
    name: "Bab Boujloud",
    arabicName: "باب بوجلود",
    year: 1913,
    description: "The famous Blue Gate, main entrance to the old medina",
    products: [
      "Traditional crafts",
      "Moroccan textiles",
      "Local souvenirs",
      "Street food",
    ],
    story:
      "Known as the Blue Gate, Bab Boujloud welcomes visitors with its stunning blue tilework on the outside and green tiles on the inside, symbolizing the color of Islam. This gate leads to the heart of the medina's bustling markets and is surrounded by local artisans selling traditional crafts.",
    imageUrl:
      "https://images.unsplash.com/photo-1548017860-48fc112185c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    name: "Bab Ftouh",
    arabicName: "باب الفتوح",
    year: 1176,
    description: "Eastern gate leading to the gardens",
    products: [
      "Fresh produce",
      "Herbs",
      "Medicinal plants",
      "Spices",
      "Natural remedies",
    ],
    story:
      "Bab Ftouh, the Gate of Gardens, was where merchants would bring fresh produce from the surrounding gardens into the medina each morning. The area around this gate was known for its herbalists and traditional medicine practitioners.",
    imageUrl:
      "https://images.unsplash.com/photo-1547636780-e41778614c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    name: "Bab Rcif",
    arabicName: "باب الرصيف",
    year: 1203,
    description: "Gate of the marketplace",
    products: [
      "Textiles",
      "Traditional clothing",
      "Embroidery",
      "Silk goods",
      "Handwoven carpets",
    ],
    story:
      "Bab Rcif was the center of Fes's textile trade, where merchants would gather to sell fine silks, embroidered fabrics, and traditional Moroccan clothing. The gate's name comes from the Arabic word for 'pavement', referring to the stone-paved marketplace.",
    imageUrl:
      "https://images.unsplash.com/photo-1557632401-4b98920db36c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 4,
    name: "Bab Guissa",
    arabicName: "باب كيسة",
    year: 1308,
    description: "Northern gate of craftsmanship",
    products: [
      "Leather goods",
      "Metal crafts",
      "Jewelry",
      "Traditional lamps",
      "Decorative items",
    ],
    story:
      "Bab Guissa was known for its skilled artisans who worked with leather and metal. The area around this gate housed workshops where craftsmen created intricate jewelry, traditional Moroccan lamps, and decorative metalwork using centuries-old techniques.",
    imageUrl:
      "https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 5,
    name: "Bab Semmarine",
    arabicName: "باب السمارين",
    year: 1248,
    description: "Gate of the blacksmiths",
    products: [
      "Metal works",
      "Traditional tools",
      "Copper items",
      "Brass decorations",
      "Ironwork",
    ],
    story:
      "Bab Semmarine was the center of metalworking in Fes. The name comes from the Arabic word for 'blacksmiths'. Here, skilled craftsmen would forge tools, create intricate copper items, and produce beautiful metalwork using traditional methods passed down through generations.",
    imageUrl:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 6,
    name: "Bab Mahrouk",
    arabicName: "باب المحروق",
    year: 1204,
    description: "Western gate of food and spices",
    products: [
      "Spices",
      "Dried fruits",
      "Nuts",
      "Traditional sweets",
      "Local delicacies",
    ],
    story:
      "Bab Mahrouk was famous for its spice markets and food vendors. The air around this gate was filled with the aromatic scents of exotic spices, dried fruits, and traditional Moroccan sweets. Merchants would travel from far and wide to trade their goods here.",
    imageUrl:
      "https://images.unsplash.com/photo-1535372790083-459d5d907c08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  },
];

// Add image error handling component
const GateImage: React.FC<{ gate: GateData }> = ({ gate }) => {
  const [imgSrc, setImgSrc] = useState(gate.imageUrl);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImgSrc(fallbackImage);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(0,0,0,0.5)",
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                textAlign: "center",
                fontFamily: "Amiri, serif",
              }}
            >
              Loading...
            </Typography>
          </motion.div>
        </Box>
      )}
      <motion.img
        src={imgSrc}
        alt={gate.name}
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)",
        }}
      />
    </Box>
  );
};

// Main component
const FesTimeline: React.FC = () => {
  const [currentGate, setCurrentGate] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const currentData = gatesData[currentGate];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("FesTimeline component mounted");
  }, []);

  const nextGate = () => {
    setDirection(1);
    setCurrentGate((prev) => Math.min(prev + 1, gatesData.length - 1));
  };

  const prevGate = () => {
    setDirection(-1);
    setCurrentGate((prev) => Math.max(prev - 0, 0));
  };

  const navigateToEvent = (index: number) => {
    setDirection(index > currentGate ? 1 : -1);
    setCurrentGate(index);
  };

  // Custom gradients based on time period
  const getAgeGradient = (year: number) => {
    if (year < 1000) {
      return "linear-gradient(135deg, #ffa000 0%, #f57c00 100%)"; // Early Islamic
    } else if (year < 1500) {
      return "linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%)"; // Medieval
    } else if (year < 1900) {
      return "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)"; // Pre-modern
    } else {
      return "linear-gradient(135deg, #00897b 0%, #00695c 100%)"; // Modern
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Pattern Background with Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/patterns/arabesque-dark.png')",
          backgroundSize: "200px",
          backgroundRepeat: "repeat",
        }}
      />

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentGate}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            padding: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              height: "100%",
              gap: 4,
            }}
          >
            {/* Left Side - Image and Navigation */}
            <Box
              sx={{
                flex: 1,
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <GateImage gate={gatesData[currentGate]} />

              {/* Navigation Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <IconButton
                  onClick={prevGate}
                  disabled={currentGate === 0}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
                    transition: "all 0.3s ease",
                  }}
                >
                  <NavigateBefore />
                </IconButton>
                <IconButton
                  onClick={nextGate}
                  disabled={currentGate === gatesData.length - 1}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
                    transition: "all 0.3s ease",
                  }}
                >
                  <NavigateNext />
                </IconButton>
              </motion.div>
            </Box>

            {/* Right Side - Content */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    fontFamily: "Amiri, serif",
                    mb: 2,
                    background: "linear-gradient(45deg, #fff 30%, #e0c8a0 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {gatesData[currentGate].name}
                </Typography>

                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "2rem", md: "3rem" },
                    fontFamily: "Amiri, serif",
                    color: "primary.main",
                    mb: 4,
                    opacity: 0.9,
                  }}
                >
                  {gatesData[currentGate].arabicName}
                </Typography>

                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.2rem",
                      mb: 6,
                      lineHeight: 1.8,
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {gatesData[currentGate].story}
                  </Typography>
                </motion.div>

                <Box sx={{ mb: 4 }}>
                  <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "primary.main",
                        mb: 3,
                        fontSize: "1.5rem",
                      }}
                    >
                      Famous Products
                    </Typography>
                  </motion.div>

                  <motion.div
                    variants={productListVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {gatesData[currentGate].products.map((product, index) => (
                      <motion.div
                        key={index}
                        variants={productItemVariants}
                        whileHover={{ x: 10, transition: { duration: 0.2 } }}
                      >
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2,
                            color: "rgba(255,255,255,0.9)",
                            fontSize: "1.1rem",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              bgcolor: "primary.main",
                              mr: 2,
                            }}
                          />
                          {product}
                        </Typography>
                      </motion.div>
                    ))}
                  </motion.div>
                </Box>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default FesTimeline;
