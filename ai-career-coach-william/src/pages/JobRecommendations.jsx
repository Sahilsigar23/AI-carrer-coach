import React, { useEffect, useState } from 'react';
import { FaUserTie, FaMapMarkerAlt, FaDollarSign, FaClock, FaBuilding, FaHeart, FaExternalLinkAlt } from 'react-icons/fa';
import { MdOutlineWorkOutline, MdOutlineLocationOn, MdOutlineAttachMoney, MdSearch, MdFilterList } from 'react-icons/md';
import { BiRefresh, BiBookmark, BiBookmarkHeart } from 'react-icons/bi';
import { ai } from '../lib/api';

const JobRecommendations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: 'all',
    experience: 'all',
    location: 'all',
    salary: 'all'
  });
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await ai.recommendations({});
        const careers = res.data.recommendations?.careers || [];
        const mapped = careers.map((c, idx) => ({
          id: idx + 1,
          title: c.title || 'Role',
          company: '—',
          location: 'India',
          salary: '—',
          type: 'Full-time',
          experience: 'Mid-level',
          matchScore: 80,
          description: c.description || '',
          requirements: [],
          benefits: [],
          posted: '—',
          applicants: 0,
          logo: '💼'
        }));
        setJobsData(mapped);
      } catch (err) {
        setError('Using sample jobs');
        setJobsData([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filterOptions = {
    jobType: [
      { value: 'all', label: 'All Types' },
      { value: 'full-time', label: 'Full-time' },
      { value: 'part-time', label: 'Part-time' },
      { value: 'contract', label: 'Contract' },
      { value: 'internship', label: 'Internship' }
    ],
    experience: [
      { value: 'all', label: 'All Levels' },
      { value: 'entry-level', label: 'Entry Level' },
      { value: 'mid-level', label: 'Mid Level' },
      { value: 'senior', label: 'Senior Level' }
    ],
    location: [
      { value: 'all', label: 'All Locations' },
      { value: 'remote', label: 'Remote' },
      { value: 'san-francisco', label: 'San Francisco' },
      { value: 'new-york', label: 'New York' },
      { value: 'seattle', label: 'Seattle' }
    ],
    salary: [
      { value: 'all', label: 'Any Salary' },
      { value: '50k-80k', label: '$50k - $80k' },
      { value: '80k-120k', label: '$80k - $120k' },
      { value: '120k+', label: '$120k+' }
    ]
  };

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.requirements || []).some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedFilters.jobType === 'all' || job.type?.toLowerCase() === selectedFilters.jobType;
    const matchesExperience = selectedFilters.experience === 'all' || job.experience?.toLowerCase().replace(' ', '-') === selectedFilters.experience;
    const matchesLocation = selectedFilters.location === 'all' || job.location?.toLowerCase().includes(selectedFilters.location.replace('-', ' '));
    return matchesSearch && matchesType && matchesExperience && matchesLocation;
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) newSaved.delete(jobId); else newSaved.add(jobId);
      return newSaved;
    });
  };

  const handleApplyJob = (job) => {
    console.log('Applying to job:', job.title);
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getMatchBadgeColor = (score) => {
    if (score >= 90) return 'bg-green-400/20 text-green-400';
    if (score >= 80) return 'bg-yellow-400/20 text-yellow-400';
    return 'bg-orange-400/20 text-orange-400';
  };

  if (loading) return <div className="p-4">Loading recommendations...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3 group">
              <FaUserTie className="text-indigo-400 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12" size={32} />
              <h1 className="text-3xl font-bold text-gray-900 transition-colors duration-300 hover:text-indigo-600">Job Recommendations</h1>
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md">
                <BiBookmarkHeart size={18} className="transition-transform duration-200 hover:scale-110" />
                <span className="hidden md:inline">Saved ({savedJobs.size})</span>
              </button>
              <button onClick={() => window.location.reload()} className="flex items-center space-x-2 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md">
                <BiRefresh size={18} className="transition-transform duration-200 hover:rotate-180" />
                <span className="hidden md:inline">Refresh</span>
              </button>
            </div>
          </div>

          {error && <div className="text-sm text-yellow-700 mb-2">{error}</div>}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group">
              <div className="flex items-center space-x-2 mb-2">
                <MdOutlineWorkOutline className="text-indigo-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={20} />
                <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-indigo-600">Available Roles</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">{jobsData.length}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group">
              <div className="flex items-center space-x-2 mb-2">
                <FaHeart className="text-red-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={20} />
                <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-red-500">Saved Jobs</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-red-500">{savedJobs.size}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group">
              <div className="flex items-center space-x-2 mb-2">
                <MdOutlineLocationOn className="text-blue-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={20} />
                <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-500">Remote Friendly</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-500">
                {jobsData.length}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group">
              <div className="flex items-center space-x-2 mb-2">
                <MdOutlineAttachMoney className="text-green-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={20} />
                <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-green-500">Avg Match</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-500">
                {jobsData.length ? 85 : 0}%
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8 transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 transition-transform duration-200 hover:scale-110" size={20} />
                <input
                  type="text"
                  placeholder="Search roles or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-100 text-gray-900 pl-10 pr-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-[1.02] focus:shadow-lg focus:bg-white"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                {Object.entries(filterOptions).map(([filterType, options]) => (
                  <select
                    key={filterType}
                    value={selectedFilters[filterType]}
                    onChange={(e) => handleFilterChange(filterType, e.target.value)}
                    className="bg-gray-100 text-gray-900 px-3 py-2 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-105 focus:shadow-md hover:bg-gray-50"
                  >
                    {options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            </div>
          </div>

          {/* Job Results */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600 transition-colors duration-200 hover:text-gray-700">
              Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
            <select className="bg-white text-gray-900 px-3 py-2 rounded-lg border border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-300">
              <option>Sort by Match</option>
              <option>Sort by Date</option>
            </select>
          </div>

          {/* Job Cards */}
          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
                <FaUserTie className="mx-auto text-gray-600 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 hover:border-indigo-300 group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="text-4xl transition-transform duration-200 group-hover:scale-110">{job.logo}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-200 group-hover:text-indigo-600">{job.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 transform group-hover:scale-105 ${getMatchBadgeColor(job.matchScore)}`}>
                            {job.matchScore}% match
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-600 text-sm mb-3 group-hover:text-gray-700 transition-colors duration-200">
                          <div className="flex items-center space-x-1">
                            <FaBuilding size={14} className="transition-transform duration-200 group-hover:scale-110" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaMapMarkerAlt size={14} className="transition-transform duration-200 group-hover:scale-110" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaDollarSign size={14} className="transition-transform duration-200 group-hover:scale-110" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaClock size={14} className="transition-transform duration-200 group-hover:scale-110" />
                            <span>{job.posted}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4 group-hover:text-gray-800 transition-colors duration-200">{job.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                            {job.applicants} applicants
                          </div>
                          <div className="flex space-x-3">
                            <button onClick={() => handleSaveJob(job.id)} className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md ${savedJobs.has(job.id) ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/25' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                              <BiBookmark size={16} className="transition-transform duration-200 hover:scale-110" />
                              <span>{savedJobs.has(job.id) ? 'Saved' : 'Save'}</span>
                            </button>
                            <button onClick={() => handleApplyJob(job)} className="flex items-center space-x-1 bg-indigo-500 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25">
                              <FaExternalLinkAlt size={14} className="transition-transform duration-200 hover:scale-110" />
                              <span>Apply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
      </div>
    </div>
  );
};

export default JobRecommendations;