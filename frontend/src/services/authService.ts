// Authentication Service for FesGuide
// This service handles login, logout, and authorization

interface User {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  name?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
  token?: string;
}

// In a real app, this would be replaced with an API call
// For now, we're using local storage to simulate a backend
const ADMIN_CREDENTIALS = {
  email: 'admin@fesguide.com',
  password: 'admin'
};

// Mock admin user
const ADMIN_USER: User = {
  id: 'admin-1',
  email: 'admin@fesguide.com',
  username: 'admin',
  role: 'admin',
  name: 'Admin User'
};

// Check if user is logged in
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('auth_token');
  return !!token;
};

// Check if current user is admin
export const isAdmin = (): boolean => {
  const userRole = localStorage.getItem('userRole');
  return userRole === 'admin';
};

// Login function
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // In a real app, this would make an API call to a backend server
  // For now, we'll just check against our hardcoded admin credentials
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check credentials against admin account
    if (credentials.email === ADMIN_CREDENTIALS.email && 
        credentials.password === ADMIN_CREDENTIALS.password) {
      
      // Generate a fake token
      const token = `mock-jwt-token-${Date.now()}`;
      
      // Store auth data in localStorage (would be done by a real JWT in production)
      localStorage.setItem('auth_token', token);
      localStorage.setItem('userId', ADMIN_USER.id);
      localStorage.setItem('userRole', ADMIN_USER.role);
      
      return {
        success: true,
        user: ADMIN_USER,
        token
      };
    }

    // If we get here, authentication failed
    return {
      success: false,
      message: 'Invalid email or password'
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'An error occurred during login'
    };
  }
};

// Logout function
export const logout = (): void => {
  // Clear auth data from localStorage
  localStorage.removeItem('auth_token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userRole');
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');
  
  // If we have a userId and it's the admin, return admin user
  if (userId === ADMIN_USER.id && userRole === 'admin') {
    return ADMIN_USER;
  }
  
  return null;
};

export default {
  login,
  logout,
  isAuthenticated,
  isAdmin,
  getCurrentUser
}; 