import { useState } from "react";
import DiscoverPlaces from "../components/DiscoverPlaces";
import { useNavigate } from "react-router-dom";
import paymentService, { ProductType } from "../services/paymentService";
import Checkout from "../components/Checkout";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

const Places = () => {
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    title: string;
    price: number;
    type: ProductType;
  } | null>(null);

  // Handle product selection and open checkout
  const handleProductSelect = (
    id: string,
    title: string,
    price: number,
    type: ProductType
  ) => {
    setSelectedProduct({
      id,
      title,
      price,
      type,
    });
    setCheckoutOpen(true);
  };

  // Handle checkout completion
  const handlePurchaseComplete = (transactionId: string) => {
    console.log(`Transaction completed: ${transactionId}`);
    // Navigate to dashboard after a delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DiscoverPlaces />

      {/* Enhanced Experience Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/5 p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-3">
                Enhance Your Fes Experience
              </h2>
              <p className="text-blue-800 mb-6">
                Discover the hidden stories and secret spots with our premium
                travel resources
              </p>

              {/* Featured Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Audio Guide */}
                <div className="bg-white rounded-lg shadow-sm p-4 border border-blue-100 hover:shadow-md transition-all">
                  <div className="flex items-start mb-3">
                    <div className="bg-amber-100 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-amber-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Artisan Workshop Tour
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Explore traditional crafts with local experts
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-700">
                      $3.99
                    </span>
                    <button
                      onClick={() =>
                        handleProductSelect(
                          "craft-workshops",
                          "Artisan Workshop Tour",
                          3.99,
                          ProductType.AUDIO_TOUR
                        )
                      }
                      className="text-blue-700 hover:text-blue-900 text-sm font-medium inline-flex items-center"
                    >
                      Get Access
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Digital Map */}
                <div className="bg-white rounded-lg shadow-sm p-4 border border-blue-100 hover:shadow-md transition-all">
                  <div className="flex items-start mb-3">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-blue-700"
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
                      <h3 className="font-medium text-gray-900">
                        Medina Navigation Map
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Never get lost in the historic maze of Fes
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-700">
                      $2.99
                    </span>
                    <button
                      onClick={() =>
                        handleProductSelect(
                          "medina-navigation",
                          "Medina Navigation Map",
                          2.99,
                          ProductType.DIGITAL_MAP
                        )
                      }
                      className="text-blue-700 hover:text-blue-900 text-sm font-medium inline-flex items-center"
                    >
                      Get Access
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate("/guide")}
                  className="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium"
                >
                  View more premium travel resources
                  <svg
                    className="w-4 h-4 ml-1"
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
                </button>
              </div>
            </div>

            <div className="hidden md:block w-2/5 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <pattern
                      id="pattern"
                      width="8"
                      height="8"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="4" cy="4" r="1.5" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#pattern)" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold mb-3">
                    Unlock the Best of Fes
                  </h3>
                  <p className="text-blue-100 mb-4">
                    Local insights and curated experiences to make your journey
                    unforgettable
                  </p>
                  <div className="inline-block mt-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center text-white">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      Crafted by local expert guides
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Dialog */}
      {selectedProduct && (
        <Checkout
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          productTitle={selectedProduct.title}
          productPrice={selectedProduct.price}
          productType={selectedProduct.type}
          productId={selectedProduct.id}
          onPurchaseComplete={handlePurchaseComplete}
        />
      )}

      {/* Premium Features Call-to-Action */}
      <Box
        sx={{
          mt: 10,
          mb: 6,
          py: 5,
          px: 3,
          backgroundColor: "rgba(245, 245, 245, 0.8)",
          borderRadius: 4,
          textAlign: "center",
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
          backgroundSize: "cover",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          maxWidth: "1000px",
          mx: "auto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            backgroundImage:
              "linear-gradient(to right, #1976d2, #82b1ff, #1976d2)",
          }}
        />
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          color="primary.dark"
        >
          Discover Secret Spots in Fes
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ maxWidth: 700, mx: "auto", mb: 4 }}
        >
          After exploring these amazing places, unlock our premium resources to
          discover hidden gems, audio tours, and expert local guides.
        </Typography>
        <Button
          component={Link}
          to="/premium"
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowForward />}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 50,
            fontWeight: "bold",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: 3,
            },
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
        >
          Explore Premium Features
        </Button>
      </Box>
    </div>
  );
};

export default Places;
