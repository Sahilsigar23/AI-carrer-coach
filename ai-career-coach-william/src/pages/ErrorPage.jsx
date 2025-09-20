import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-900">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-9xl font-extrabold text-indigo-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! It looks like the page you're looking for doesn't exist.
        </p>
        <NavLink
          to="/dashboard"
          className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-300"
        >
          Go to Dashboard
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;