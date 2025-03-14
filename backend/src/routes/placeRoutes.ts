import express, { Request, Response, NextFunction } from 'express';
import { 
  getAllPlaces, 
  getPlaceById, 
  getPlacesByCategory, 
  createPlace 
} from '../controllers/placeController';

const router = express.Router();

// GET all places
router.get('/', getAllPlaces as any);

// GET places by category - this needs to come before the /:id route to avoid conflicts
router.get('/category/:category', getPlacesByCategory as any);

// GET place by ID
router.get('/:id', getPlaceById as any);

// POST create new place
router.post('/', createPlace as any);

export default router; 