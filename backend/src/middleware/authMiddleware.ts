import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';
import db from '../config/database';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const userModel = new UserModel(db);
// Use a hardcoded value to ensure both files use exactly the same key
const JWT_SECRET = '84b29dc8d7e59101acc480e78d2f3708a9592b4ea6e1ef965b170e75f2398f19';

interface JwtPayload {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// Authentication middleware to verify JWT token
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Add user data to request
    (req as any).user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    if ((error as Error).name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token expired' });
    } else if ((error as Error).name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Invalid token' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

// Admin authorization middleware
export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userRole = (req as any).user?.role;
  
  if (userRole !== 'admin') {
    res.status(403).json({ message: 'Access denied: Admin role required' });
    return;
  }
  
  next();
};

// Premium access middleware
export const requirePremium = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }
    
    const isPremium = await userModel.isPremium(userId);
    
    if (!isPremium) {
      res.status(403).json({ 
        message: 'Premium subscription required to access this feature',
        requiresPremium: true
      });
      return;
    }
    
    next();
  } catch (error) {
    console.error('Premium access check error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 