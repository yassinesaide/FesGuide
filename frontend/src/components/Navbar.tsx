import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <div className="hidden md:flex space-x-8">
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
              to="/about"
              className={`text-white/90 hover:text-fes-amber transition-colors duration-300 font-medium ${
                isActive("/about") ? "text-fes-amber" : ""
              }`}
            >
              About
            </Link>
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
                to="/about"
                className={`text-white/90 hover:text-fes-amber transition-colors duration-300 font-medium ${
                  isActive("/about") ? "text-fes-amber" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
