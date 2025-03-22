import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel, { UserInput, User, UserUpdate, PremiumInput } from '../models/UserModel';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Constants
// Use a hardcoded value to ensure both files use exactly the same key
const JWT_SECRET = '84b29dc8d7e59101acc480e78d2f3708a9592b4ea6e1ef965b170e75f2398f19';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Initialize user tables
export const initUserTables = async (): Promise<void> => {
  try {
    await UserModel.initTable();
    await UserModel.initPremiumTable();
    console.log('User tables initialized successfully');
  } catch (error) {
    console.error('Error initializing user tables:', error);
  }
};

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      res.status(400).json({ message: 'Please provide all required fields' });
      return;
    }

    // Check if email is already registered
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: 'Email already registered' });
      return;
    }

    // Create new user
    const userData: UserInput = {
      username,
      email,
      password
    };

    const newUser = await UserModel.create(userData);

    // Generate JWT token
    const payload = { id: newUser.id, email: newUser.email, role: newUser.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });

    // Return user and token
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        premium: newUser.premium,
        premiumUntil: newUser.premium_until
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: 'Please provide email and password' });
      return;
    }

    // Find user by email
    const user = await UserModel.findByEmail(email);
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate JWT token
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });

    // Return user and token
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        premium: user.premium,
        premiumUntil: user.premium_until
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check premium status
    const isPremium = await UserModel.isPremium(userId);

    // Return user data
    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        premium: isPremium,
        premiumUntil: user.premium_until
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { username, email, password } = req.body;

    if (!username && !email && !password) {
      res.status(400).json({ message: 'No update data provided' });
      return;
    }

    // Create update data object
    const updateData: UserUpdate = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    // Update user
    const updatedUser = await UserModel.update(userId, updateData);
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Return updated user
    res.json({
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        premium: updatedUser.premium,
        premiumUntil: updatedUser.premium_until
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Add premium access
export const addPremium = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { months, productType } = req.body;

    if (!months || !productType) {
      res.status(400).json({ message: 'Please provide months and productType' });
      return;
    }

    // Convert to appropriate data structure
    const premiumData: PremiumInput = {
      userId,
      months: parseInt(months, 10),
      productType
    };

    // Add premium access
    const updatedUser = await UserModel.addPremium(premiumData);
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Return updated user
    res.json({
      message: 'Premium access added successfully',
      premium: true,
      premiumUntil: updatedUser.premium_until
    });
  } catch (error) {
    console.error('Add premium error:', error);
    res.status(500).json({ message: 'Error adding premium access' });
  }
};

// Check premium access
export const checkPremium = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    // Check premium status
    const isPremium = await UserModel.isPremium(userId);

    // Return premium status
    res.json({
      premium: isPremium
    });
  } catch (error) {
    console.error('Check premium error:', error);
    res.status(500).json({ message: 'Error checking premium status' });
  }
}; 