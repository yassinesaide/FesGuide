import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import { ProductType } from "../services/paymentService";

interface CheckoutProps {
  open: boolean;
  onClose: () => void;
  productTitle: string;
  productPrice: number;
  productType: ProductType;
  productId: string;
  onPurchaseComplete: (transactionId: string) => void;
}

// Steps in the checkout process
const steps = ["Review Order", "Payment Details", "Confirmation"];

const Checkout: React.FC<CheckoutProps> = ({
  open,
  onClose,
  productTitle,
  productPrice,
  productType,
  productId,
  onPurchaseComplete,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    email: "",
  });

  // Form validation errors
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = { ...errors };

    // Card number validation (16 digits)
    if (!/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
      valid = false;
    }

    // Expiry date validation (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)";
      valid = false;
    }

    // CVV validation (3 digits)
    if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = "Please enter a valid 3-digit CVV";
      valid = false;
    }

    // Name validation
    if (formData.name.trim().length < 3) {
      newErrors.name = "Please enter your full name";
      valid = false;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (activeStep === 1) {
      // Validate form before proceeding to confirmation
      if (!validateForm()) {
        return;
      }
    }

    setActiveStep((prevStep) => prevStep + 1);

    // If we're moving to the confirmation step, process the payment
    if (activeStep === 2) {
      processPayment();
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const processPayment = async () => {
    setIsProcessing(true);

    try {
      // In a real app, this would call your payment processor
      // For demo purposes, we'll simulate a successful payment after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate a mock transaction ID
      const transactionId = `tx-${Date.now()}-${Math.floor(
        Math.random() * 10000
      )}`;

      // Call the onPurchaseComplete callback with the transaction ID
      onPurchaseComplete(transactionId);

      // Reset the form and close the dialog
      setFormData({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        name: "",
        email: "",
      });
      setActiveStep(0);
      onClose();
    } catch (error) {
      console.error("Payment processing error:", error);
      // Handle payment errors here
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Content for each step
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Paper elevation={0} sx={{ p: 2, bgcolor: "background.default" }}>
              <Typography variant="h6">{productTitle}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {getProductTypeLabel(productType)}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Price:</Typography>
                <Typography variant="body1">
                  {formatCurrency(productPrice)}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Tax:</Typography>
                <Typography variant="body1">
                  {formatCurrency(productPrice * 0.05)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">
                  {formatCurrency(productPrice * 1.05)}
                </Typography>
              </Box>
            </Paper>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cardholder Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  error={!!errors.cvv}
                  helperText={errors.cvv}
                  required
                />
              </Grid>
            </Grid>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 2, display: "block" }}
            >
              * This is a demo checkout. No actual payment will be processed.
            </Typography>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ textAlign: "center", py: 2 }}>
            {isProcessing ? (
              <>
                <CircularProgress size={60} sx={{ mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Processing your payment...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please wait while we process your order.
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h6" color="success.main" gutterBottom>
                  Payment Successful!
                </Typography>
                <Typography variant="body1" paragraph>
                  Thank you for your purchase of {productTitle}.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A confirmation email has been sent to {formData.email}.
                </Typography>
              </>
            )}
          </Box>
        );

      default:
        return "Unknown step";
    }
  };

  const getProductTypeLabel = (type: ProductType): string => {
    switch (type) {
      case ProductType.AUDIO_TOUR:
        return "Audio Tour";
      case ProductType.DIGITAL_MAP:
        return "Digital Map";
      case ProductType.CUSTOM_ITINERARY:
        return "Custom Itinerary";
      case ProductType.VIRTUAL_GUIDE:
        return "Virtual Guide Rental";
      case ProductType.PHOTO_LOCATION:
        return "Premium Photo Location";
      case ProductType.AFFILIATE_BOOKING:
        return "Hotel Booking";
      default:
        return "Product";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={activeStep === 2 ? undefined : onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Checkout
        <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>

      <DialogContent dividers>{getStepContent(activeStep)}</DialogContent>

      <DialogActions>
        {activeStep !== 0 && activeStep !== 2 && (
          <Button onClick={handleBack}>Back</Button>
        )}

        {activeStep === 0 && (
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
        )}

        {activeStep < 2 && (
          <Button onClick={handleNext} variant="contained" color="primary">
            {activeStep === 1 ? "Place Order" : "Next"}
          </Button>
        )}

        {activeStep === 2 && !isProcessing && (
          <Button onClick={onClose} variant="contained" color="primary">
            Done
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Checkout;
