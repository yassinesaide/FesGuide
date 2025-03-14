import express, { Request, Response, NextFunction } from 'express';
import { getGuideResponse } from '../controllers/guideController';

const router = express.Router();

// POST to get a response from the AI guide
router.post('/ask', getGuideResponse as any);

export default router; 