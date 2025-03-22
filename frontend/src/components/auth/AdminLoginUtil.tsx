import React from "react";
import { Button, Box, Typography, Paper } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { setUserAsAdmin } from "../../store/slices/userSlice";

/**
 * A simple utility component that adds an "Admin Login" button to any page
 * This is for development and testing only
 */
const AdminLoginUtil: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSetAdmin = () => {
    // Create a fake JWT token and set in localStorage
    const fakeToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiYWRtaW5AZmVzZ3VpZGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTk4NTQyODcwLCJleHAiOjE5MTQwMzA4NzB9.3kp0Zbst-Xv4uXSVCVmjIQCGPVaFQECK-6UH3jQ";
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("userRole", "admin");

    // Update Redux store
    dispatch(setUserAsAdmin());

    // Force reload the page to ensure everything is updated
    window.location.reload();
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        p: 2,
        zIndex: 1000,
        opacity: 0.9,
        border: "1px dashed #ff9800",
      }}
    >
      <Typography variant="subtitle2" gutterBottom color="warning.main">
        DEV ONLY
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={handleSetAdmin}
        >
          Quick Admin Login
        </Button>
      </Box>
    </Paper>
  );
};

export default AdminLoginUtil;
