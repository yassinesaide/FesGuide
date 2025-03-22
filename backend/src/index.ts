import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import placeRoutes from './routes/placeRoutes';
import guideRoutes from './routes/guideRoutes';
import authRoutes from './routes/authRoutes';
import premiumRoutes from './routes/premiumRoutes';
import { testConnection } from './config/database';
import { initUserTables } from './controllers/authController';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database connections and tables
(async () => {
  try {
    // Test database connection
    await testConnection();
    // Initialize user tables
    await initUserTables();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
})();

// Routes
app.use('/api/places', placeRoutes);
app.use('/api/guide', guideRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/premium', premiumRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to FesGuide API - Your AI-powered guide to Fes, Morocco');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 