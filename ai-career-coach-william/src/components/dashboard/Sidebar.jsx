import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';
import {
  MdOutlineDashboard,
  MdOutlineLogout,
  MdOutlineHistory,
  MdOutlineSettings,
  MdOutlinePersonOutline,
  MdOutlineSchool,
  MdOutlineAnalytics,
  MdOutlineAssessment,
  MdTimeline,
  MdWork,
  MdHelp,
  MdBarChart,
} from 'react-icons/md';
import { FaLaptopCode, FaUserTie, FaChartLine, FaTrophy } from 'react-icons/fa';

const navigationItems = [
  {
    name: 'Dashboard',
    icon: MdOutlineDashboard,
    path: '/dashboard',
    type: 'nav'
  },
  {
    name: 'Skills Gap',
    icon: FaChartLine,
    path: '/skills-gap',
    type: 'nav'
  },
  {
    name: 'Roadmap',
    icon: MdTimeline,
    path: '/roadmap',
    type: 'nav'
  },
  {
    name: 'Job Matches',
    icon: MdWork,
    path: '/job-matches',
    type: 'nav'
  },
  {
    name: 'Job Recommendations',
    icon: FaUserTie,
    path: '/job-recommendations',
    type: 'nav'
  },
  {
    name: 'Resume Analyzer',
    icon: MdOutlineAnalytics,
    path: '/resume-analyzer',
    type: 'nav'
  },
  {
    name: 'Roadmap Generator',
    icon: MdOutlineSchool,
    path: '/roadmap-generator',
    type: 'nav'
  },
  {
    name: 'Career Q&A',
    icon: MdOutlineAssessment,
    path: '/career-qa',
    type: 'nav'
  },
  {
    name: 'My History',
    icon: MdOutlineHistory,
    path: '/my-history',
    type: 'nav'
  },
  {
    name: 'Progress & Badges',
    icon: FaTrophy,
    path: '/progress-badges',
    type: 'nav'
  },
  {
    name: 'Reports',
    icon: MdBarChart,
    path: '/reports',
    type: 'nav'
  },
  {
    name: 'Help & Support',
    icon: MdHelp,
    path: '/help-support',
    type: 'nav'
  },
  {
    name: 'Admin & Settings',
    icon: MdOutlineSettings,
    path: '/settings',
    type: 'nav'
  },
  {
    name: 'Logout',
    icon: MdOutlineLogout,
    path: '/logout',
    type: 'action'
  },
];

const Sidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Close the modal
    setShowLogoutModal(false);
    
    // Use centralized logout function
    logout(navigate);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  return (
    <>
      <div className="fixed left-0 top-0 w-64 bg-white text-gray-600 p-4 h-screen border-r border-gray-200 overflow-y-auto z-10">
        <div className="flex flex-col h-full">
          <div className="flex flex-col space-y-2 flex-grow">
            {navigationItems.filter(item => item.type === 'nav').map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md ` +
                  (isActive
                    ? 'bg-indigo-100 text-indigo-800 shadow-md scale-105'
                    : 'hover:bg-gray-100 hover:text-gray-900 hover:translate-x-2')
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Logout button at bottom */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            {navigationItems.filter(item => item.type === 'action').map((item, index) => (
              <button
                key={index}
                onClick={handleLogoutClick}
                className="flex items-center space-x-2 p-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:bg-red-50 hover:text-red-600 hover:translate-x-2 text-left w-full"
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-2xl border border-gray-200 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <MdOutlineLogout className="text-red-400" size={24} />
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
    </>
  );
};

export default Sidebar;