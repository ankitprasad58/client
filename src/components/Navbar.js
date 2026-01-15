import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { authService } from "../services";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = authService.isLoggedIn();
  const user = authService.getCurrentUser();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authService.logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FaShoppingBag className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-gray-900">
                Market Station
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-600 hover:text-indigo-600"
              } transition`}
            >
              Home
            </Link>
            <Link
              to="/marketplace"
              className={`${
                isActive("/marketplace")
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-600 hover:text-indigo-600"
              } transition`}
            >
              Marketplace
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className={`${
                    isActive("/profile")
                      ? "text-indigo-600 font-semibold"
                      : "text-gray-600 hover:text-indigo-600"
                  } transition flex items-center space-x-1`}
                >
                  <FaUser />
                  <span>{user?.username || "Profile"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <FaSignOutAlt />
                  <span>{loggingOut ? "..." : "Logout"}</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-indigo-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-indigo-600"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/"
              className="block text-gray-600 hover:text-indigo-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/marketplace"
              className="block text-gray-600 hover:text-indigo-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="block text-gray-600 hover:text-indigo-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  disabled={loggingOut}
                  className="block py-2 text-red-600 hover:text-red-700"
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-600 hover:text-indigo-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-indigo-600 text-white text-center py-2 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
