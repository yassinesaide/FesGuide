import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  login,
  selectIsAuthenticated,
  selectError,
  selectIsLoading,
  clearError,
  setUserAsAdmin,
} from "../../store/slices/userSlice";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoading);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
    // Clear errors on unmount
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login(formData));
  };

  const handleAdminLogin = async () => {
    await dispatch(
      login({
        email: "admin@fesguide.com",
        password: "admin123",
      })
    );

    // If login succeeds, set as admin
    setTimeout(() => {
      dispatch(setUserAsAdmin());
    }, 500);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Login to FesGuide
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Login"}
          </Button>

          <Divider sx={{ my: 2 }}>or</Divider>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/register")}
            sx={{ mb: 2 }}
          >
            Create Account
          </Button>

          <Divider sx={{ my: 2 }}>Admin Access</Divider>

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleAdminLogin}
            disabled={isLoading}
          >
            Login as Admin
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
