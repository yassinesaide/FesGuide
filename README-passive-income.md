# FesGuide Passive Income Implementation

This document outlines the passive income strategies implemented in the FesGuide application.

## Overview

We've added several passive income revenue streams to the FesGuide application, focusing on digital products and affiliate marketing. The implementation includes a payment processing service, a checkout component, and a user dashboard to track purchases.

## Key Components

### 1. Payment Service (`paymentService.ts`)

This service handles all transaction processing and provides:

- Product catalogs for various offerings (audio tours, maps, etc.)
- Payment processing functionality
- Transaction history and tracking
- Revenue analytics and reporting
- User purchase verification

### 2. Checkout Component (`Checkout.tsx`)

A reusable checkout dialog that:

- Displays product information
- Collects payment details
- Validates form inputs
- Processes the transaction
- Provides confirmation feedback

### 3. User Dashboard (`Dashboard.tsx`)

A dashboard page that:

- Shows users their purchased products
- Displays virtual guide rental status
- For admins, provides revenue analytics with charts and statistics
- Tracks sales across different product categories

### 4. Guide Page Updates (`Guide.tsx`)

The Guide page was updated to:

- Display premium products for purchase
- Integrate with the payment service
- Launch the checkout component when users select products
- Show success messages after purchase

## Passive Income Revenue Streams

1. **Premium Audio Tours**: Audio guides for different areas of Fes, priced at $3.99-$5.99.

2. **Digital Maps**: Specialized maps showing workshops, navigation routes, and food tours, priced at $2.99-$3.99.

3. **Custom Itineraries**: Pre-planned itineraries for different trip durations, priced at $2.99-$8.99.

4. **Virtual Guide Rental**: Time-limited AI guide access with different feature tiers:

   - 24-hour access ($2.99)
   - 72-hour access ($7.99)
   - 7-day access ($14.99)

5. **Premium Photo Locations**: Coordinates and photography tips for Instagram-worthy spots, priced at $1.99 each.

6. **Affiliate Hotel Bookings**: Commission-based hotel recommendations with direct booking links, earning 12-18% of booking value.

## Implementation Details

- **Data Storage**: Currently using in-memory storage for demo purposes, but structured for easy migration to a database.
- **Payment Processing**: Mock implementation that simulates payment processing, designed to be replaced with Stripe, PayPal, or other payment processors.
- **User Identification**: Simple localStorage-based user identification, to be replaced with proper authentication.
- **Analytics**: Foundation for tracking sales and revenue across different products and time periods.

## Future Enhancements

1. **Subscription Model**: Add recurring subscription options for premium content.
2. **Bundle Packages**: Create discounted packages combining multiple products.
3. **Seasonal Promotions**: Infrastructure for time-limited sales and promotions.
4. **User Reviews**: Allow users to review purchased products to increase conversion.
5. **Email Marketing**: Send follow-up emails for abandoned carts and product recommendations.

## Technical Requirements

To use these features, ensure the following packages are installed:

- Material UI (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- Recharts for analytics visualizations
- UUID for transaction ID generation

## Installation

The passive income features are fully integrated into the main application. No separate installation steps are required beyond installing the dependencies in package.json.

## Testing

To test the purchase flow:

1. Navigate to the Guide page
2. Click on any product's purchase button
3. Complete the checkout form (any valid-looking test data will work)
4. View your purchases in the Dashboard
