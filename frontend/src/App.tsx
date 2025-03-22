import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Places from "./pages/Places";
import PlaceBlog from "./components/PlaceBlog";
import Guide from "./pages/Guide";
import About from "./pages/About";
import TrainModel from "./pages/TrainModel";
import Dashboard from "./pages/Dashboard";
import PremiumFeatures from "./pages/PremiumFeatures";
import ReduxLogin from "./components/auth/Login";
import Register from "./components/auth/Register";
import FesTimeline from "./components/FesTimeline";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import {
  selectIsAuthenticated,
  selectIsAdmin,
  getCurrentUser,
} from "./store/slices/userSlice";
import "./App.css";

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = true,
}) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    // Try to get current user if we have a token
    if (isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-fes-blue">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-fes-amber">Fes</span>
            <span className="text-white">Guide</span>
          </h1>
          <div className="w-16 h-16 border-4 border-fes-amber border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow pt-24 md:pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/places/:id" element={<PlaceBlog />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/about" element={<About />} />
          <Route path="/train" element={<TrainModel />} />
          <Route path="/timeline" element={<FesTimeline />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/premium" element={<PremiumFeatures />} />
          <Route path="/login" element={<ReduxLogin />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
