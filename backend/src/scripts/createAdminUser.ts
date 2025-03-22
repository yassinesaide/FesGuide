import dotenv from 'dotenv';
import pool from '../config/database';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

async function createAdminUser() {
  console.log('Creating admin user...');
  const connection = await pool.getConnection();
  
  try {
    // Check if admin user already exists
    const [existingUsers] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      ['admin@fesguide.com']
    );
    
    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      console.log('Admin user already exists');
      return;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin', salt);
    
    // Insert admin user
    await connection.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      ['admin', 'admin@fesguide.com', hashedPassword, 'admin']
    );
    
    console.log('Admin user created successfully:');
    console.log('Username: admin');
    console.log('Email: admin@fesguide.com');
    console.log('Password: admin');
    console.log('Role: admin');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    connection.release();
    process.exit();
  }
}

// Execute the function
createAdminUser(); 