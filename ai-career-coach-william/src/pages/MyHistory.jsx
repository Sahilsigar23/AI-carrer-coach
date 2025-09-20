import React, { useState } from 'react';
import { MdOutlineHistory, MdOutlineAnalytics, MdOutlineSchool, MdOutlineAssessment, MdSearch, MdFilterList } from 'react-icons/md';
import { BiRefresh, BiDownload, BiBot, BiUser } from 'react-icons/bi';
import { FaFileAlt, FaRoad, FaComments, FaCalendarAlt, FaClock } from 'react-icons/fa';

const MyHistory = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Add CSS keyframes for staggered animations
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }

      .animate-pulse-hover:hover {
        animation: pulse 0.6s ease-in-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Sample history data
  const historyData = [
    {
      id: 1,
      type: 'resume',
      title: 'Resume Analysis - Software Engineer Position',
      description: 'Analyzed resume for software engineering role with 78% overall score',
      date: '2024-01-15',
      time: '14:30',
      status: 'completed',
      details: {
        score: 78,
        strengths: 4,
        improvements: 3,
        missingSkills: 2
      }
    },
    {
      id: 2,
      type: 'roadmap',
      title: 'AI Engineer Career Roadmap',
      description: 'Generated 6-month learning roadmap for AI Engineer transition',
      date: '2024-01-14',
      time: '10:15',
      status: 'in-progress',
      details: {
        phases: 4,
        duration: '6-12 months',
        currentPhase: 'Foundation Phase'
      }
    },
    {
      id: 3,
      type: 'chat',
      title: 'Career Q&A Session',
      description: 'Discussed interview preparation strategies and salary negotiation',
      date: '2024-01-13',
      time: '16:45',
      status: 'completed',
      details: {
        messages: 24,
        duration: '45 minutes',
        topics: ['Interviews', 'Salary', 'Skills']
      }
    },
    {
      id: 4,
      type: 'resume',
      title: 'Resume Analysis - Data Scientist Role',
      description: 'Comprehensive analysis for data science position application',
      date: '2024-01-12',
      time: '09:20',
      status: 'completed',
      details: {
        score: 85,
        strengths: 6,
        improvements: 2,
        missingSkills: 3
      }
    },
    {
      id: 5,
      type: 'roadmap',
      title: 'Full Stack Developer Roadmap',
      description: 'Created learning path for full stack web development',
      date: '2024-01-10',
      time: '11:30',
      status: 'completed',
      details: {
        phases: 4,
        duration: '8-10 months',
        currentPhase: 'Completed'
      }
    },
    {
      id: 6,
      type: 'chat',
      title: 'Career Transition Discussion',
      description: 'Explored career change options from marketing to tech',
      date: '2024-01-08',
      time: '13:15',
      status: 'completed',
      details: {
        messages: 18,
        duration: '30 minutes',
        topics: ['Career Change', 'Skills Gap', 'Learning Path']
      }
    }
  ];

  const filterOptions = [
    { id: 'all', name: 'All Activities', icon: MdOutlineHistory },
    { id: 'resume', name: 'Resume Analysis', icon: MdOutlineAnalytics },
    { id: 'roadmap', name: 'Career Roadmaps', icon: MdOutlineSchool },
    { id: 'chat', name: 'Q&A Sessions', icon: MdOutlineAssessment }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'resume':
        return <FaFileAlt className="text-blue-400 hover:text-blue-500 hover:scale-110 transition-all duration-200" size={20} />;
      case 'roadmap':
        return <FaRoad className="text-green-400 hover:text-green-500 hover:scale-110 transition-all duration-200" size={20} />;
      case 'chat':
        return <FaComments className="text-indigo-400 hover:text-indigo-500 hover:scale-110 transition-all duration-200" size={20} />;
      default:
        return <MdOutlineHistory className="text-gray-600 hover:text-gray-700 hover:scale-110 transition-all duration-200" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-400/10 hover:bg-green-400/20 hover:text-green-600';
      case 'in-progress':
        return 'text-yellow-500 bg-yellow-400/10 hover:bg-yellow-400/20 hover:text-yellow-600';
      case 'failed':
        return 'text-red-500 bg-red-400/10 hover:bg-red-400/20 hover:text-red-600';
      default:
        return 'text-gray-600 bg-gray-400/10 hover:bg-gray-400/20 hover:text-gray-700';
    }
  };

  const filteredHistory = historyData.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      // Clear history logic would go here
      console.log('History cleared');
      // Add success animation or notification here
    }
  };

  const handleExportHistory = () => {
    // Export history logic would go here
    console.log('Exporting history...');
    // Add download animation or notification here
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <MdOutlineHistory className="text-indigo-400 hover:scale-110 transition-transform duration-200" size={32} />
              <h1 className="text-3xl font-bold text-gray-900 transition-colors duration-300 hover:text-indigo-600">My History</h1>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleExportHistory}
                className="flex items-center space-x-2 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 hover:scale-105 hover:shadow-lg transition-all duration-200"
              >
                <BiDownload className="hover:scale-110 transition-transform duration-200" size={18} />
                <span className="hidden md:inline">Export</span>
              </button>
              <button
                onClick={handleClearHistory}
                className="flex items-center space-x-2 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 hover:scale-105 hover:shadow-lg transition-all duration-200"
              >
                <BiRefresh className="hover:rotate-180 transition-transform duration-300" size={18} />
                <span className="hidden md:inline">Clear All</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:scale-105 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-2 mb-2">
                <MdOutlineHistory className="text-indigo-400 hover:scale-110 transition-transform duration-200" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Total Activities</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 transition-all duration-300">{historyData.length}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:scale-105 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-2 mb-2">
                <FaFileAlt className="text-blue-400 hover:scale-110 transition-transform duration-200" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Resume Analysis</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 transition-all duration-300">
                {historyData.filter(item => item.type === 'resume').length}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:scale-105 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-2 mb-2">
                <FaRoad className="text-green-400 hover:scale-110 transition-transform duration-200" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Career Roadmaps</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 transition-all duration-300">
                {historyData.filter(item => item.type === 'roadmap').length}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:scale-105 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-2 mb-2">
                <FaComments className="text-yellow-400 hover:scale-110 transition-transform duration-200" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Q&A Sessions</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 transition-all duration-300">
                {historyData.filter(item => item.type === 'chat').length}
              </p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:scale-105 hover:shadow-md transition-all duration-200 ${
                      activeFilter === filter.id
                        ? 'bg-indigo-500 text-white scale-105 shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    <filter.icon className="hover:scale-110 transition-transform duration-200" size={16} />
                    <span>{filter.name}</span>
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:scale-110 transition-transform duration-200" size={20} />
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-100 text-gray-900 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-105 focus:shadow-lg border border-gray-300 w-full lg:w-64 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-4">
            {filteredHistory.length === 0 ? (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
                <MdOutlineHistory className="mx-auto text-gray-600 mb-4 hover:scale-110 hover:text-indigo-400 transition-all duration-300 animate-pulse-hover" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors duration-200">No History Found</h3>
                <p className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                  {searchTerm ? 'No activities match your search criteria.' : 'Start using the platform to see your activity history here.'}
                </p>
              </div>
            ) : (
              filteredHistory.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-indigo-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.5s ease-out forwards'
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0 hover:scale-110 transition-transform duration-200">
                        {getTypeIcon(item.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200">{item.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-110 ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-3 hover:text-gray-800 transition-colors duration-200">{item.description}</p>

                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1 hover:text-gray-700 transition-colors duration-200">
                            <FaCalendarAlt className="hover:scale-110 transition-transform duration-200" size={14} />
                            <span>{formatDate(item.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1 hover:text-gray-700 transition-colors duration-200">
                            <FaClock className="hover:scale-110 transition-transform duration-200" size={14} />
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details Panel */}
                    <div className="flex-shrink-0 ml-6">
                      <div className="bg-gray-100 rounded-lg p-4 min-w-[200px] hover:bg-gray-50 hover:shadow-lg transition-all duration-300">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors duration-200">Details</h4>
                        {item.type === 'resume' && (
                          <div className="space-y-1 text-sm text-gray-700">
                            <div className="hover:text-gray-900 transition-colors duration-200">Score: <span className="text-gray-900 font-semibold">{item.details.score}%</span></div>
                            <div className="hover:text-gray-900 transition-colors duration-200">Strengths: <span className="text-green-500 font-semibold hover:scale-105 inline-block transition-transform duration-200">{item.details.strengths}</span></div>
                            <div className="hover:text-gray-900 transition-colors duration-200">Improvements: <span className="text-yellow-500 font-semibold hover:scale-105 inline-block transition-transform duration-200">{item.details.improvements}</span></div>
                            <div className="hover:text-gray-900 transition-colors duration-200">Missing Skills: <span className="text-red-500 font-semibold hover:scale-105 inline-block transition-transform duration-200">{item.details.missingSkills}</span></div>
                          </div>
                        )}
                        {item.type === 'roadmap' && (
                          <div className="space-y-1 text-sm text-gray-700">
                            <div className="hover:text-gray-900 transition-colors duration-200">Duration: <span className="text-gray-900 font-semibold">{item.details.duration}</span></div>
                            <div className="hover:text-gray-900 transition-colors duration-200">Phases: <span className="text-gray-900 font-semibold">{item.details.phases}</span></div>
                            <div className="hover:text-gray-900 transition-colors duration-200">Current: <span className="text-indigo-500 font-semibold hover:scale-105 inline-block transition-transform duration-200">{item.details.currentPhase}</span></div>
                          </div>
                        )}
                        {item.type === 'chat' && (
                          <div className="space-y-1 text-sm text-gray-700">
                            <div className="hover:text-gray-900 transition-colors duration-200">Messages: <span className="text-gray-900 font-semibold">{item.details.messages}</span></div>
                            <div className="hover:text-gray-900 transition-colors duration-200">Duration: <span className="text-gray-900 font-semibold">{item.details.duration}</span></div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.details.topics.map((topic, index) => (
                                <span
                                  key={index}
                                  className="bg-indigo-500/20 text-indigo-600 px-2 py-1 rounded text-xs hover:bg-indigo-500/30 hover:scale-105 transition-all duration-200 cursor-pointer"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More Button */}
          {filteredHistory.length > 0 && (
            <div className="text-center mt-8">
              <button className="bg-gray-100 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 hover:text-indigo-600 hover:scale-105 hover:shadow-lg transition-all duration-300">
                Load More Activities
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default MyHistory;