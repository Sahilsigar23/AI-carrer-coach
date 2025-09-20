import React from 'react';

const SimpleDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Career Coach Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume Analyzer</h3>
          <p className="text-gray-600 mb-4">Upload and analyze your resume for improvements</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Analyze Resume
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills Gap Analysis</h3>
          <p className="text-gray-600 mb-4">Identify skills you need to develop</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Analyze Skills
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Roadmap</h3>
          <p className="text-gray-600 mb-4">Generate a personalized career roadmap</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Create Roadmap
          </button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to AI Career Coach!</h2>
        <p className="text-gray-600 mb-4">
          Your personalized AI-powered career development platform. Get insights, track progress, and achieve your career goals.
        </p>
        <div className="flex space-x-4">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Get Started
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;
