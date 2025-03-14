# FesGuide - AI-Powered Tourist Guide for Fes, Morocco

FesGuide is a full-stack web application that serves as an AI-powered virtual tourist guide for Fes, Morocco. It provides tourists with accurate information about monuments, history, culture, and practical details to enhance their visit to this historic city.

## Features

- **Places Directory**: Browse and search for attractions, monuments, and points of interest in Fes
- **Detailed Information**: Get comprehensive details about each location including descriptions, opening hours, ticket prices, and more
- **AI Guide**: Interact with an AI-powered virtual guide that can answer questions about Fes
- **Multilingual Support**: Access information in multiple languages including English, French, Arabic, and Spanish
- **Responsive Design**: Enjoy a seamless experience across desktop and mobile devices

## Tech Stack

### Frontend

- React with TypeScript
- Vite for fast development and building
- TailwindCSS for styling
- React Router for navigation

### Backend

- Node.js with Express
- TypeScript
- MySQL database with mysql2 driver
- RESTful API architecture

## Project Structure

```
FesGuide/
├── frontend/             # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript type definitions
│   └── ...
│
└── backend/              # Node.js backend application
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── controllers/  # Request handlers
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   └── utils/        # Utility functions
    └── ...
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/fesguide.git
   cd fesguide
   ```

2. Set up the backend:

   ```
   cd backend
   npm install
   ```

3. Create a MySQL database and run the SQL script:

   ```
   mysql -u root -p < src/config/database.sql
   ```

4. Configure environment variables:

   - Copy `.env.example` to `.env` and update the values

5. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server:

   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Places

- `GET /api/places` - Get all places
- `GET /api/places/:id` - Get place by ID
- `GET /api/places/category/:category` - Get places by category
- `POST /api/places` - Create a new place

### Guide

- `POST /api/guide/ask` - Ask the AI guide a question

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Images from Unsplash
- Icons from Heroicons
- Tailwind CSS for the UI framework
"# gu-a" 
