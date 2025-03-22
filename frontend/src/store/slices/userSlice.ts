import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  premium: boolean;
  premiumUntil: Date | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  username: string;
}

interface LoginResponse {
  user: User;
  token: string;
  message: string;
}

// Async thunks
export const login = createAsyncThunk<LoginResponse, LoginCredentials>(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      
      // Store token in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role);
      
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

export const register = createAsyncThunk<LoginResponse, RegisterData>(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      
      // Store token in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role);
      
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Registration failed. Please try again.');
    }
  }
);

export const getCurrentUser = createAsyncThunk<User>(
  'user/getCurrentUser',
  async (_, { rejectWithValue, getState }) => {
    // Load token from state or localStorage
    const token = (getState() as { user: AuthState }).user.token || localStorage.getItem('token');
    
    if (!token) {
      return rejectWithValue('No token found');
    }
    
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Update userRole in localStorage
      localStorage.setItem('userRole', response.data.user.role);
      
      return response.data.user;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Failed to fetch user data');
    }
  }
);

export const checkPremium = createAsyncThunk<{ premium: boolean }>(
  'user/checkPremium',
  async (_, { rejectWithValue, getState }) => {
    // Load token from state or localStorage
    const token = (getState() as { user: AuthState }).user.token || localStorage.getItem('token');
    
    if (!token) {
      return rejectWithValue('No token found');
    }
    
    try {
      const response = await axios.get(`${API_URL}/auth/premium/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Failed to check premium status');
    }
  }
);

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

// Create slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      // Clear token and user from state
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      
      // Clear token from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    },
    clearError: (state) => {
      state.error = null;
    },
    setUserAsAdmin: (state) => {
      // For testing: Set the user as admin
      if (state.user) {
        state.user.role = 'admin';
        localStorage.setItem('userRole', 'admin');
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    
    // Register
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    
    // Get current user
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    });
    
    // Check premium
    builder.addCase(checkPremium.fulfilled, (state, action) => {
      if (state.user) {
        state.user.premium = action.payload.premium;
      }
    });
  },
});

// Export actions and reducer
export const { logout, clearError, setUserAsAdmin } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUser = (state: { user: AuthState }) => state.user.user;
export const selectIsAuthenticated = (state: { user: AuthState }) => state.user.isAuthenticated;
export const selectIsAdmin = (state: { user: AuthState }) => state.user.user?.role === 'admin';
export const selectIsPremium = (state: { user: AuthState }) => state.user.user?.premium || false;
export const selectIsLoading = (state: { user: AuthState }) => state.user.isLoading;
export const selectError = (state: { user: AuthState }) => state.user.error; 