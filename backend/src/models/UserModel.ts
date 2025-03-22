import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/database';
import bcrypt from 'bcryptjs';

export interface User extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  role: 'user' | 'admin';
  premium: boolean;
  premium_until: Date | null;
}

export interface UserInput {
  username: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface UserUpdate {
  username?: string;
  email?: string;
  password?: string;
}

export interface PremiumInput {
  userId: number;
  months: number;
  productType: string;
}

class UserModel {
  // Initialize user table
  async initTable(): Promise<void> {
    const connection = await pool.getConnection();
    try {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role ENUM('user', 'admin') DEFAULT 'user',
          premium BOOLEAN DEFAULT FALSE,
          premium_until DATETIME NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log('User table initialized successfully');
    } catch (error) {
      console.error('Error initializing user table:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Create a new user
  async create(userData: UserInput): Promise<User> {
    const connection = await pool.getConnection();
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      // Insert user into database
      const [result] = await connection.query<ResultSetHeader>(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [userData.username, userData.email, hashedPassword, userData.role || 'user']
      );
      
      // Fetch the created user (without password)
      const [users] = await connection.query<User[]>(
        'SELECT id, username, email, role, premium, premium_until, created_at, updated_at FROM users WHERE id = ?',
        [result.insertId]
      );
      
      return users[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    const connection = await pool.getConnection();
    try {
      const [users] = await connection.query<User[]>(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      
      return users.length ? users[0] : null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Find user by ID
  async findById(id: number): Promise<User | null> {
    const connection = await pool.getConnection();
    try {
      const [users] = await connection.query<User[]>(
        'SELECT id, username, email, role, premium, premium_until, created_at, updated_at FROM users WHERE id = ?',
        [id]
      );
      
      return users.length ? users[0] : null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Update user
  async update(id: number, userData: UserUpdate): Promise<User | null> {
    const connection = await pool.getConnection();
    try {
      // Start building the query
      let query = 'UPDATE users SET ';
      const values: any[] = [];
      
      // Add fields to update
      if (userData.username) {
        query += 'username = ?, ';
        values.push(userData.username);
      }
      
      if (userData.email) {
        query += 'email = ?, ';
        values.push(userData.email);
      }
      
      if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        query += 'password = ?, ';
        values.push(hashedPassword);
      }
      
      // Remove trailing comma and space
      query = query.slice(0, -2);
      
      // Add WHERE clause
      query += ' WHERE id = ?';
      values.push(id);
      
      // Execute query
      await connection.query<ResultSetHeader>(query, values);
      
      // Return updated user
      return this.findById(id);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Add premium access to user
  async addPremium(premiumData: PremiumInput): Promise<User | null> {
    const connection = await pool.getConnection();
    try {
      // Calculate premium_until date
      const now = new Date();
      const premiumUntil = new Date(now);
      premiumUntil.setMonth(now.getMonth() + premiumData.months);
      
      // Update user premium status
      await connection.query<ResultSetHeader>(
        'UPDATE users SET premium = TRUE, premium_until = ? WHERE id = ?',
        [premiumUntil, premiumData.userId]
      );
      
      // Log purchase
      await connection.query<ResultSetHeader>(
        'INSERT INTO premium_purchases (user_id, product_type, months, purchased_at, expires_at) VALUES (?, ?, ?, ?, ?)',
        [premiumData.userId, premiumData.productType, premiumData.months, now, premiumUntil]
      );
      
      // Return updated user
      return this.findById(premiumData.userId);
    } catch (error) {
      console.error('Error adding premium:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Check if a user has premium access
  async isPremium(userId: number): Promise<boolean> {
    const connection = await pool.getConnection();
    try {
      const [users] = await connection.query<User[]>(
        'SELECT premium, premium_until FROM users WHERE id = ?',
        [userId]
      );
      
      if (!users.length) {
        return false;
      }
      
      const user = users[0];
      
      // If not premium, return false
      if (!user.premium) {
        return false;
      }
      
      // If premium but no expiration date, assume indefinite premium
      if (!user.premium_until) {
        return true;
      }
      
      // Check if premium has expired
      const now = new Date();
      const premiumUntil = new Date(user.premium_until);
      
      return now <= premiumUntil;
    } catch (error) {
      console.error('Error checking premium status:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Initialize premium purchases table
  async initPremiumTable(): Promise<void> {
    const connection = await pool.getConnection();
    try {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS premium_purchases (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          product_type VARCHAR(255) NOT NULL,
          months INT NOT NULL,
          purchased_at TIMESTAMP NOT NULL,
          expires_at TIMESTAMP NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);
      console.log('Premium purchases table initialized successfully');
    } catch (error) {
      console.error('Error initializing premium purchases table:', error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new UserModel(); 