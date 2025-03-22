import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  Alert,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  CircularProgress,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import {
  Headphones,
  Map,
  Route,
  Tour,
  PhotoCamera,
  EmojiEvents,
  Close as CloseIcon,
  Check as CheckIcon,
  Star,
  LocalOffer,
} from "@mui/icons-material";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  image: string;
  icon: React.ReactNode;
  popular?: boolean;
}

interface CheckoutProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  onPurchaseComplete: () => void;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  hover: {
    scale: 1.03,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const featureItemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

const staggerContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const products: Product[] = [
  {
    id: "audio-tours",
    name: "Audio Tours",
    description:
      "Immersive audio guides that transport you through the ancient streets of Fes with expert narration and cultural insights.",
    price: 19.99,
    features: [
      "Professional narration by local experts",
      "Rich historical and cultural insights",
      "Atmospheric sounds and music",
      "Offline access and downloadable content",
    ],
    image: "/images/audio-tours/1.jpg",
    icon: <Headphones />,
    popular: true,
  },
  {
    id: "maps",
    name: "Interactive Maps",
    description:
      "Detailed interactive maps with hidden gems, secret passages, and specially curated points of interest throughout Fes.",
    price: 14.99,
    features: [
      "Offline high-resolution maps",
      "Custom markers and favorites",
      "Optimized route planning",
      "Real-time location tracking",
    ],
    image: "/images/maps/1.jpg",
    icon: <Map />,
  },
  {
    id: "itineraries",
    name: "Custom Itineraries",
    description:
      "Personalized travel plans tailored to your interests, time constraints, and preferences for the perfect Fes experience.",
    price: 24.99,
    features: [
      "Personalized day-by-day planning",
      "Local dining recommendations",
      "Cultural activity scheduling",
      "Time optimization for sightseeing",
    ],
    image: "/images/itineraries/1.svg",
    icon: <Route />,
  },
  {
    id: "virtual-guide",
    name: "Virtual Guide",
    description:
      "Your personal AI-powered companion offering real-time insights, translations, and assistance as you explore Fes.",
    price: 29.99,
    features: [
      "24/7 real-time assistance",
      "Deep cultural insights on demand",
      "Instant language translation",
      "Personalized recommendations",
    ],
    image: "/images/virtual-guide/1.svg",
    icon: <Tour />,
    popular: true,
  },
  {
    id: "photo-spots",
    name: "Photo Spots",
    description:
      "Discover the most photogenic and Instagram-worthy locations in Fes with expert photography tips for stunning shots.",
    price: 9.99,
    features: [
      "Hidden viewpoints and perspectives",
      "Best timing for golden hour shots",
      "Camera setting recommendations",
      "Pro photography composition tips",
    ],
    image: "/images/photo-spots/1.svg",
    icon: <PhotoCamera />,
  },
  {
    id: "rewards",
    name: "Rewards Program",
    description:
      "Join our exclusive loyalty program to earn points with every purchase and unlock special perks and experiences in Fes.",
    price: 0,
    features: [
      "Points system with every purchase",
      "Exclusive member discounts",
      "Special access to private events",
      "Member-only experiences",
    ],
    image: "/images/rewards/1.svg",
    icon: <EmojiEvents />,
  },
];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Checkout: React.FC<CheckoutProps> = ({
  open,
  onClose,
  product,
  onPurchaseComplete,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const handlePurchase = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onPurchaseComplete();
      onClose();
    } catch (err) {
      setError("An error occurred during purchase. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 2,
          backgroundImage:
            "linear-gradient(to bottom right, rgba(255,255,255,0.95), rgba(255,255,255,0.98))",
          backgroundSize: "cover",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "8px",
          background: theme.palette.primary.main,
          backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        }}
      />

      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                backgroundColor: "rgba(0,0,0,0.05)",
                borderRadius: "50%",
                p: 1,
                display: "flex",
                color: theme.palette.primary.main,
              }}
            >
              {product.icon}
            </Box>
            <Typography variant="h6">Purchase {product.name}</Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: "100%",
                height: 120,
                objectFit: "cover",
                borderRadius: 2,
                mb: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                component="span"
                color="primary"
                fontWeight="bold"
                sx={{ display: "inline-flex", alignItems: "center" }}
              >
                ${product.price.toFixed(2)}
                {product.popular && (
                  <Chip
                    icon={<LocalOffer fontSize="small" />}
                    label="Best Value"
                    size="small"
                    color="secondary"
                    sx={{ ml: 1 }}
                  />
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography
              variant="body1"
              paragraph
              sx={{ fontStyle: "italic", color: "text.secondary", pb: 1 }}
            >
              {product.description}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
              Features included:
            </Typography>
            <motion.div
              variants={staggerContainerVariants}
              initial="initial"
              animate="animate"
            >
              <List dense>
                {product.features.map((feature, index) => (
                  <motion.div key={index} variants={featureItemVariants}>
                    <ListItem dense sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{
                          variant: "body2",
                          color: "text.primary",
                        }}
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </motion.div>
          </Grid>
        </Grid>
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          disabled={isProcessing}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handlePurchase}
          disabled={isProcessing}
          variant="contained"
          color="primary"
          startIcon={isProcessing ? <CircularProgress size={20} /> : undefined}
          sx={{
            borderRadius: 2,
            px: 3,
            backgroundImage: isProcessing
              ? "none"
              : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
              transform: "translateY(-2px)",
            },
          }}
        >
          {isProcessing
            ? "Processing..."
            : `Purchase for $${product.price.toFixed(2)}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const PremiumFeatures: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Track scroll position for parallax effects
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePurchaseClick = (product: Product) => {
    setSelectedProduct(product);
    setShowCheckout(true);
  };

  const handlePurchaseComplete = () => {
    setShowSuccess(true);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Hero Section with Parallax */}
      <Box
        sx={{
          position: "relative",
          height: "40vh",
          minHeight: 300,
          maxHeight: 500,
          overflow: "hidden",
          mb: 8,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(https://images.unsplash.com/photo-1489493585363-13099b89baef?ixlib=rb-4.0.3)`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            transform: `translateY(${scrollY * 0.3}px)`,
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)",
            },
          }}
        />
        <Box
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: 3,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Typography
              variant="h1"
              component="h1"
              color="white"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                mb: 2,
              }}
            >
              Premium Features
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Typography
              variant="h5"
              component="p"
              color="white"
              sx={{
                maxWidth: 700,
                mx: "auto",
                opacity: 0.9,
                textShadow: "0 1px 5px rgba(0,0,0,0.3)",
              }}
            >
              Elevate your journey through Fes with our curated premium
              experiences
            </Typography>
          </motion.div>
        </Box>

        {/* Decorative Pattern Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60px",
            background:
              "linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "40px",
              backgroundImage: `url('https://www.transparenttextures.com/patterns/arabesque.png')`,
              backgroundRepeat: "repeat-x",
              backgroundSize: "auto 100%",
              opacity: 0.1,
              mt: "auto",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ px: 4, maxWidth: 1200, mx: "auto", pb: 10 }}>
        <Grid container spacing={4}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 3,
                    boxShadow: product.popular
                      ? "0 8px 24px rgba(0,0,0,0.15)"
                      : theme.shadows[3],
                    border: product.popular
                      ? `2px solid ${theme.palette.secondary.main}`
                      : "none",
                  }}
                >
                  {product.popular && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 20,
                        right: -30,
                        transform: "rotate(45deg)",
                        backgroundColor: theme.palette.secondary.main,
                        color: "white",
                        py: 0.5,
                        px: 4,
                        zIndex: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Typography variant="body2" fontWeight="bold">
                        POPULAR
                      </Typography>
                    </Box>
                  )}
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "56.25%",
                      overflow: "hidden",
                      backgroundColor: theme.palette.grey[100],
                    }}
                  >
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.name}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.6s ease",
                        ".MuiCard-root:hover &": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%)",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                          borderRadius: "50%",
                          p: 1,
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {product.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                      >
                        {product.name}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                      sx={{ mb: 2 }}
                    >
                      {product.description}
                    </Typography>
                    <motion.div
                      variants={staggerContainerVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <List dense sx={{ mb: 2 }}>
                        {product.features.slice(0, 3).map((feature, index) => (
                          <motion.div
                            key={index}
                            variants={featureItemVariants}
                          >
                            <ListItem dense sx={{ px: 0, py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 28 }}>
                                <CheckIcon color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText
                                primary={feature}
                                primaryTypographyProps={{
                                  variant: "body2",
                                  color: "text.primary",
                                }}
                              />
                            </ListItem>
                          </motion.div>
                        ))}
                      </List>
                    </motion.div>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: "auto",
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="bold"
                      >
                        {product.price === 0
                          ? "Free"
                          : `$${product.price.toFixed(2)}`}
                      </Typography>

                      {product.popular && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: theme.palette.secondary.main,
                          }}
                        >
                          <Star fontSize="small" />
                          <Star fontSize="small" />
                          <Star fontSize="small" />
                          <Star fontSize="small" />
                          <Star fontSize="small" />
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 3, pt: 0 }}>
                    <Button
                      variant="contained"
                      color={product.popular ? "secondary" : "primary"}
                      fullWidth
                      onClick={() => handlePurchaseClick(product)}
                      startIcon={
                        product.price === 0 ? <EmojiEvents /> : undefined
                      }
                      sx={{
                        borderRadius: 2,
                        py: 1.2,
                        textTransform: "none",
                        fontWeight: "bold",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        backgroundImage: product.popular
                          ? `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`
                          : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        "&:hover": {
                          boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      {product.price === 0
                        ? "Join Now"
                        : `Buy Now - $${product.price.toFixed(2)}`}
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Guarantee Message */}
        <Box
          component={Paper}
          sx={{
            mt: 8,
            py: 3,
            px: 4,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.8), rgba(255,255,255,0.95))",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
          elevation={0}
        >
          <Typography variant="h6" color="primary" gutterBottom>
            30-Day Money-Back Guarantee
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try any premium feature with confidence. If you're not completely
            satisfied, we'll refund your purchase within 30 days, no questions
            asked.
          </Typography>
        </Box>

        <AnimatePresence>
          {selectedProduct && showCheckout && (
            <Checkout
              open={showCheckout}
              onClose={() => setShowCheckout(false)}
              product={selectedProduct}
              onPurchaseComplete={handlePurchaseComplete}
            />
          )}
        </AnimatePresence>

        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setShowSuccess(false)}
            severity="success"
            variant="filled"
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <Typography variant="body1" fontWeight="medium">
              Purchase successful! Thank you for your purchase.
            </Typography>
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default PremiumFeatures;
