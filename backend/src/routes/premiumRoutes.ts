import express from 'express';
import * as premiumController from '../controllers/premiumController';
import { authenticate, requirePremium } from '../middleware/authMiddleware';

const router = express.Router();

// Audio tours routes
router.get('/audio-tours', authenticate, premiumController.getAudioTours);
router.get('/audio-tours/:id', authenticate, premiumController.getAudioTourById);

// Digital maps routes
router.get('/maps', authenticate, premiumController.getDigitalMaps);
router.get('/maps/:id', authenticate, premiumController.getDigitalMapById);

// Custom itineraries routes
router.get('/itineraries', authenticate, premiumController.getItineraries);
router.get('/itineraries/:id', authenticate, premiumController.getItineraryById);

// Photo locations routes
router.get('/photo-locations', authenticate, premiumController.getPhotoLocations);
router.get('/photo-locations/:id', authenticate, premiumController.getPhotoLocationById);

export default router; 