import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// Create Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here as needed
  },
  // Enable Redux DevTools
  devTools: import.meta.env.DEV,
});

// Export store type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 