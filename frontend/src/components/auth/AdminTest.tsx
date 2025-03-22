import React from 'react';
import { Box, Button, Typography, Paper, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUserAsAdmin, selectUser, selectIsAdmin } from '../../store/slices/userSlice';

/**
 * This is a utility component for development & testing only.
 * It allows quickly setting the current user as an admin.
 */
const AdminTest: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAdmin = useAppSelector(selectIsAdmin);

  const handleSetAdmin = () => {
    dispatch(setUserAsAdmin());
    // Also set in localStorage for persistence
    localStorage.setItem('userRole', 'admin');
  };

  if (!user) {
    return (
      <Paper sx={{ p: 3, my: 2 }}>
        <Alert severity="info">You must be logged in to use admin features</Alert>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Admin Access Tool
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">
          Current status: {isAdmin ? (
            <span style={{ color: 'green', fontWeight: 'bold' }}>Admin</span>
          ) : (
            <span style={{ color: 'grey' }}>Regular User</span>
          )}
        </Typography>
      </Box>
      
      <Button 
        variant="contained" 
        color="warning"
        onClick={handleSetAdmin}
        disabled={isAdmin}
      >
        Set as Admin
      </Button>
      
      <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
        This tool is for testing purposes only and should be removed in production.
      </Typography>
    </Paper>
  );
};

export default AdminTest; 