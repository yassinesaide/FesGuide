import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import authService from "../services/authService";
import { Button } from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Check auth status
    const checkAuthStatus = () => {
      const authStatus = authService.isAuthenticated();
      const adminStatus = authService.isAdmin();
      setIsAuthenticated(authStatus);
      setIsAdmin(adminStatus);
    };

    checkAuthStatus();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]); // Re-check on location change

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-fes-blue/95 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl md:text-3xl font-bold">
              <span className="text-fes-amber">Fes</span>
              <span className="text-white">Guide</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className={`text-white/90 hover:text-fes-amber transition-colors duration-300 font-medium ${
                isActive("/") ? "text-fes-amber" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/places"
              className={`text-white/90 hover:text-fes-amber transition-colors duration-300 font-medium ${
                isActive("/places") ? "text-fes-amber" : ""
              }`}
            >
              Places
            </Link>
            <Link
              to="/guide"
              className={`text-white/90 hover:text-fes-amber transition-colors duration-300 font-medium ${
                isActive("/guide") ? "text-fes-amber" : ""
              }`}
            >
              AI Guide
            </Link>
            <Link
              to="/premium"
              className={`text-white/90 hover:text-fes-amber transition-colors duration-300 font-medium ${
                isActive("/premium") ? "text-fes-amber" : ""
              }`}
            >
              Premium
            </Link>
            {isAdmin && (
              <Link
                to="/dashboard"
                className={`text-white/90 hover:text-fes-amber transition-colors duration-300 font-medium ${
                  isActive("/dashboard") ? "text-fes-amber" : ""
                }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/about"
              className={`text-white/90 hover:text-fes-amber transition-colors duration-300 font-medium ${
                isActive("/about") ? "text-fes-amber" : ""
              }`}
            >
              About
            </Link>

            {/* Login/Dashboard Button */}
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-fes-amber text-fes-blue px-4 py-2 rounded-full font-medium hover:bg-amber-400 transition-colors duration-300"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-fes-amber text-fes-blue px-4 py-2 rounded-full font-medium hover:bg-amber-400 transition-colors duration-300 flex items-center"
              >
                <LoginIcon sx={{ fontSize: 18, mr: 0.5 }} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`text-white/90 hover:text-fes-amber transition-colors duration-300 font-medium ${
                  isActive("/") ? "text-fes-amber" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/places"
                className={`text-white/90 hover:text-fes-amber transition-colors duration-300 font-medium ${
                  isActive("/places") ? "text-fes-amber" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Places
              </Link>
              <Link
                to="/guide"
                className={`text-white/90 hover:text-fes-amber transition-colors duration-300 font-medium ${
                  isActive("/guide") ? "text-fes-amber" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                AI Guide
              </Link>
              <Link
                to="/premium"
                className={`text-white/90 hover:text-fes-amber transition-colors duration-300 font-medium ${
                  isActive("/premium") ? "text-fes-amber" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Premium
              </Link>
              {isAdmin && (
                <Link
                  to="/dashboard"
                  className={`text-white/90 hover:text-fes-amber transition-colors duration-300 font-medium ${
                    isActive("/dashboard") ? "text-fes-amber" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="/about"
                className={`text-white/90 hover:text-fes-amber transition-colors duration-300 font-medium ${
                  isActive("/about") ? "text-fes-amber" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              {/* Login Button for Mobile */}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="bg-fes-amber text-fes-blue px-4 py-2 rounded-full font-medium text-center hover:bg-amber-400 transition-colors duration-300 mt-2 flex items-center justify-center w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LoginIcon sx={{ fontSize: 18, mr: 0.5 }} />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
