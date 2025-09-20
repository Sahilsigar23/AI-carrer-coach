import React from 'react';
import { BiRefresh } from 'react-icons/bi';
import { LuBrainCircuit } from 'react-icons/lu';
import { MdAccessTime } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const goGenerate = (roleName) => {
    navigate('/roadmap-generator', { state: { targetRole: roleName } });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <LuBrainCircuit className="text-purple-600 text-3xl mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">AI Career Coach</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Current Career Path */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Current Career Path</h3>
            <BiRefresh className="text-gray-400 hover:text-gray-600 cursor-pointer" />
          </div>
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
            AI Engineer
          </div>
          <p className="text-gray-600 text-sm">92% fit based on your profile</p>
        </div>

        {/* Skills Mastered */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Skills Mastered</h3>
            <LuBrainCircuit className="text-purple-600" />
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">12</div>
          <p className="text-gray-600 text-sm">Skills completed this month</p>
        </div>

        {/* Pending Steps */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Steps</h3>
            <MdAccessTime className="text-red-500" />
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">5</div>
          <p className="text-gray-600 text-sm">Roadmap milestones remaining</p>
        </div>
      </div>

      {/* Recommended Career Paths */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Career Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Engineer Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Engineer</h3>
            <div className="mb-4">
              <span className="text-purple-600 font-medium">92% fit</span>
              <p className="text-gray-600 text-sm mt-1">Salary: ₹6-15L</p>
              <p className="text-green-600 text-sm font-medium">Demand: Very High</p>
            </div>
            <button 
              onClick={() => goGenerate('AI Engineer')}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Generate Roadmap
            </button>
          </div>

          {/* Data Analyst Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Analyst</h3>
            <div className="mb-4">
              <span className="text-purple-600 font-medium">87% fit</span>
              <p className="text-gray-600 text-sm mt-1">Salary: ₹6-15L</p>
              <p className="text-green-600 text-sm font-medium">Demand: Very High</p>
            </div>
            <button 
              onClick={() => goGenerate('Data Analyst')}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Generate Roadmap
            </button>
          </div>

          {/* UX Designer Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">UX Designer</h3>
            <div className="mb-4">
              <span className="text-purple-600 font-medium">79% fit</span>
              <p className="text-gray-600 text-sm mt-1">Salary: ₹8-18L</p>
              <p className="text-green-600 text-sm font-medium">Demand: High</p>
            </div>
            <button 
              onClick={() => goGenerate('UX Designer')}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Generate Roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;