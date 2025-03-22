import { RowDataPacket, ResultSetHeader, Pool } from 'mysql2/promise';
import bcrypt from 'bcryptjs';

// User types
export interface User extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  premium_until: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreationAttributes {
  username: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  premium_until?: Date | null;
}

export interface UserLoginAttributes {
  email: string;
  password: string;
}

export default class UserModel {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  // Create table if it doesn't exist
  async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        premium_until DATETIME DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await this.db.query(query);
  }

  // Create a new user
  async create(userData: UserCreationAttributes): Promise<number> {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const query = `
      INSERT INTO users (username, email, password, role, premium_until)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await this.db.query<ResultSetHeader>(query, [
      userData.username,
      userData.email,
      hashedPassword,
      userData.role || 'user',
      userData.premium_until || null
    ]);

    return result.insertId;
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await this.db.query<User[]>(query, [email]);
    
    return rows.length > 0 ? rows[0] : null;
  }

  // Find user by id
  async findById(id: number): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await this.db.query<User[]>(query, [id]);
    
    return rows.length > 0 ? rows[0] : null;
  }

  // Update user
  async update(id: number, userData: Partial<UserCreationAttributes>): Promise<boolean> {
    // If password is being updated, hash it
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    // Build query dynamically based on provided fields
    const setClause = Object.keys(userData)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const query = `UPDATE users SET ${setClause} WHERE id = ?`;
    
    // Add id as the last parameter
    const params = [...Object.values(userData), id];
    
    const [result] = await this.db.query<ResultSetHeader>(query, params);
    
    return result.affectedRows > 0;
  }

  // Add premium subscription
  async addPremium(userId: number, durationDays: number): Promise<boolean> {
    // Get current premium date if exists
    const user = await this.findById(userId);
    if (!user) return false;
    
    let newDate: Date;
    const currentDate = new Date();
    
    // If user already has premium, extend it
    if (user.premium_until && new Date(user.premium_until) > currentDate) {
      newDate = new Date(user.premium_until);
    } else {
      newDate = currentDate;
    }
    
    // Add days
    newDate.setDate(newDate.getDate() + durationDays);
    
    const query = 'UPDATE users SET premium_until = ? WHERE id = ?';
    const [result] = await this.db.query<ResultSetHeader>(query, [newDate, userId]);
    
    return result.affectedRows > 0;
  }

  // Check if user is premium
  async isPremium(userId: number): Promise<boolean> {
    const user = await this.findById(userId);
    if (!user || !user.premium_until) return false;
    
    return new Date(user.premium_until) > new Date();
  }

  // Validate password
  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
} 