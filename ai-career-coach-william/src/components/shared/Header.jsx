import React, { useEffect, useState } from 'react';
import { LuBrainCircuit } from 'react-icons/lu';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../../utils/auth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const syncAuthFromStorage = () => setIsAuth(isAuthenticated());
    window.addEventListener('storage', syncAuthFromStorage);
    return () => window.removeEventListener('storage', syncAuthFromStorage);
  }, []);

  const handleLogout = () => {
    setIsAuth(false);
    setShowLogoutModal(false);
    logout(navigate);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  return (
    <header className="w-full max-w-7xl flex justify-between items-center py-6 px-4 md:px-8">
      {/* Brand logo and text */}
      <div className="flex items-center space-x-2 group">
        <LuBrainCircuit size={40} color='#6260ec' className="transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12"/>
        <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-900 transition-all duration-200 hover:text-indigo-600 transform hover:scale-105">
          AI Career Coach
        </Link>
      </div>

      {/* Desktop navigation and buttons (visible on md screens and up) */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Additional links can go here */}
        {!isAuth ? (
          <>
            <Link to="/auth/register" className="px-6 py-3 text-base font-semibold text-white bg-indigo-500 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-indigo-500/25 hover:bg-indigo-600">
              Sign Up
            </Link>
            <Link to="/auth/login" className="px-6 py-3 text-base font-semibold text-indigo-400 border-2 border-indigo-400 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 hover:bg-indigo-400 hover:text-white hover:shadow-md">
              Login
            </Link>
          </>
        ) : (
          <button onClick={handleLogoutClick} className="px-6 py-3 text-base font-semibold text-white bg-gray-800 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:bg-gray-900">
            Logout
          </button>
        )}
      </div>

      {/* Hamburger menu button for mobile */}
      <button
        id="menu-button"
        className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none z-50 transition-all duration-200 transform hover:scale-110 active:scale-95"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FaBars className="h-6 w-6 transition-transform duration-200" />
      </button>

      {/* Mobile Menu - Full-screen overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out animate-fadeIn"
          onClick={toggleMenu} // Allows closing by clicking outside the menu
        >
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>

          {/* Menu content */}
          <div className="relative w-80 ml-auto bg-white h-full p-6 shadow-2xl flex flex-col items-center transform transition-transform duration-300 ease-out translate-x-0">
            {/* Close button */}
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-gray-900 hover:text-gray-600 focus:outline-none transition-all duration-200 transform hover:scale-110 active:scale-95 hover:rotate-90"
              aria-label="Close menu"
            >
              <FaTimes className="h-6 w-6 transition-transform duration-200" />
            </button>

            {/* Mobile navigation links */}
            <nav className="flex flex-col items-center py-4 space-y-4 w-full mt-10">
              {!isAuth ? (
                <>
                  <Link to="/auth/login" className="w-full px-4 py-2 text-sm font-medium text-indigo-400 border border-indigo-400 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 hover:bg-indigo-400 hover:text-white hover:shadow-md text-center">
                    Login
                  </Link>
                  <Link to="/auth/register" className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-indigo-500/25 hover:bg-indigo-600 text-center">
                    Sign Up
                  </Link>
                </>
              ) : (
                <button onClick={handleLogoutClick} className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:bg-gray-900 text-center">
                  Logout
                </button>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-2xl border border-gray-200 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Confirm Logout</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out? You'll need to sign in again to access your account.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 bg-gray-200 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;