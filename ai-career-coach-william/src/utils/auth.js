/**
 * Authentication utility functions
 */

/**
 * Clear all authentication data from storage
 */
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  sessionStorage.clear();
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token') || !!localStorage.getItem('authToken');
};

/**
 * Get authentication token
 */
export const getAuthToken = () => {
  return localStorage.getItem('token') || localStorage.getItem('authToken');
};

/**
 * Set authentication token
 */
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Logout user and redirect to login page
 */
export const logout = (navigate) => {
  clearAuthData();
  
  if (navigate) {
    navigate('/auth/login');
  } else {
    // Fallback to window location if navigate is not available
    window.location.href = '/auth/login';
  }
};

