import express from 'express';
import * as authController from '../controllers/authController';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/me', authenticate, authController.getCurrentUser);
router.put('/update', authenticate, authController.updateUser);

// Premium routes
router.post('/premium', authenticate, authController.addPremium);
router.get('/premium/check', authenticate, authController.checkPremium);

export default router; 