import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import placeRoutes from './routes/placeRoutes';
import guideRoutes from './routes/guideRoutes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/places', placeRoutes);
app.use('/api/guide', guideRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to FesGuide API - Your AI-powered guide to Fes, Morocco');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 