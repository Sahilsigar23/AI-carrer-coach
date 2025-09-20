import React, { useState } from 'react';
import { FaMapMarkerAlt, FaDollarSign, FaClock, FaBuilding, FaHeart, FaHeartBroken, FaExternalLinkAlt } from 'react-icons/fa';
import { MdWork, MdTrendingUp, MdFilterList } from 'react-icons/md';
import { BiRefresh } from 'react-icons/bi';

const JobMatches = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [savedJobs, setSavedJobs] = useState(new Set([1, 3]));

  const jobMatches = [
    {
      id: 1,
      title: 'AI/ML Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$140,000 - $180,000',
      type: 'Full-time',
      remote: true,
      matchScore: 95,
      postedDate: '2 days ago',
      logo: '🏢',
      skills: ['Python', 'TensorFlow', 'Machine Learning', 'Deep Learning', 'AWS'],
      description: 'We are looking for an AI/ML Engineer to join our innovative team building cutting-edge AI solutions.',
      requirements: ['3+ years ML experience', 'Python proficiency', 'Cloud platform experience'],
      benefits: ['Health Insurance', 'Stock Options', 'Flexible Hours', 'Remote Work']
    },
    {
      id: 2,
      title: 'Senior Data Scientist',
      company: 'DataVision Labs',
      location: 'New York, NY',
      salary: '$130,000 - $170,000',
      type: 'Full-time',
      remote: false,
      matchScore: 88,
      postedDate: '1 week ago',
      logo: '📊',
      skills: ['Python', 'R', 'SQL', 'Statistics', 'Machine Learning'],
      description: 'Join our data science team to drive insights and build predictive models for business growth.',
      requirements: ['5+ years data science experience', 'Advanced statistics knowledge', 'Business acumen'],
      benefits: ['Health Insurance', 'Retirement Plan', 'Learning Budget', 'Gym Membership']
    },
    {
      id: 3,
      title: 'Machine Learning Researcher',
      company: 'AI Research Institute',
      location: 'Boston, MA',
      salary: '$120,000 - $160,000',
      type: 'Full-time',
      remote: true,
      matchScore: 82,
      postedDate: '3 days ago',
      logo: '🔬',
      skills: ['Python', 'PyTorch', 'Research', 'Deep Learning', 'Computer Vision'],
      description: 'Research and develop novel ML algorithms for computer vision and natural language processing.',
      requirements: ['PhD or Masters in CS/ML', 'Publication record', 'Strong math background'],
      benefits: ['Health Insurance', 'Research Budget', 'Conference Travel', 'Flexible Schedule']
    },
    {
      id: 4,
      title: 'AI Product Manager',
      company: 'InnovateTech',
      location: 'Seattle, WA',
      salary: '$150,000 - $200,000',
      type: 'Full-time',
      remote: true,
      matchScore: 75,
      postedDate: '5 days ago',
      logo: '📱',
      skills: ['Product Management', 'AI/ML Understanding', 'Strategy', 'Leadership'],
      description: 'Lead AI product strategy and work with engineering teams to deliver AI-powered solutions.',
      requirements: ['5+ years product management', 'Technical AI knowledge', 'Leadership experience'],
      benefits: ['Health Insurance', 'Stock Options', 'Unlimited PTO', 'Remote Work']
    },
    {
      id: 5,
      title: 'Computer Vision Engineer',
      company: 'VisionTech Solutions',
      location: 'Austin, TX',
      salary: '$125,000 - $165,000',
      type: 'Full-time',
      remote: false,
      matchScore: 90,
      postedDate: '1 day ago',
      logo: '👁️',
      skills: ['Python', 'OpenCV', 'Computer Vision', 'Deep Learning', 'C++'],
      description: 'Develop computer vision algorithms for autonomous vehicle perception systems.',
      requirements: ['3+ years CV experience', 'Strong programming skills', 'Automotive experience preferred'],
      benefits: ['Health Insurance', 'Stock Options', 'Relocation Package', 'Tech Budget']
    },
    {
      id: 6,
      title: 'NLP Engineer',
      company: 'Language AI Corp',
      location: 'Remote',
      salary: '$135,000 - $175,000',
      type: 'Full-time',
      remote: true,
      matchScore: 85,
      postedDate: '4 days ago',
      logo: '💬',
      skills: ['Python', 'NLP', 'Transformers', 'BERT', 'Spacy'],
      description: 'Build and deploy NLP models for text understanding and generation applications.',
      requirements: ['4+ years NLP experience', 'Transformer models expertise', 'Production ML experience'],
      benefits: ['Health Insurance', 'Fully Remote', 'Learning Budget', 'Equipment Allowance']
    }
  ];

  const toggleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-green-700 bg-green-100';
    if (score >= 80) return 'text-yellow-700 bg-yellow-100';
    if (score >= 70) return 'text-orange-700 bg-orange-100';
    return 'text-red-700 bg-red-100';
  };

  const filteredJobs = selectedFilter === 'all'
    ? jobMatches
    : selectedFilter === 'saved'
    ? jobMatches.filter(job => savedJobs.has(job.id))
    : selectedFilter === 'remote'
    ? jobMatches.filter(job => job.remote)
    : jobMatches.filter(job => job.matchScore >= 85);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 transition-colors duration-300 hover:text-indigo-600">Job Matches</h1>
            <p className="text-gray-600 transition-colors duration-200 hover:text-gray-700">AI-powered job recommendations tailored to your profile</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-indigo-500/25 mt-4 lg:mt-0 text-white">
            <BiRefresh size={16} className="transition-transform duration-200 hover:rotate-180" />
            Refresh Matches
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <MdWork className="text-indigo-600 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
              <span className="text-2xl font-bold transition-colors duration-300 group-hover:text-indigo-600">{jobMatches.length}</span>
            </div>
            <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Total Matches</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <MdTrendingUp className="text-green-600 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
              <span className="text-2xl font-bold transition-colors duration-300 group-hover:text-green-600">{jobMatches.filter(job => job.matchScore >= 85).length}</span>
            </div>
            <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">High Match</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <FaHeart className="text-pink-600 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
              <span className="text-2xl font-bold transition-colors duration-300 group-hover:text-pink-600">{savedJobs.size}</span>
            </div>
            <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Saved Jobs</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <FaClock className="text-yellow-600 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
              <span className="text-2xl font-bold transition-colors duration-300 group-hover:text-yellow-600">3</span>
            </div>
            <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Applied Today</p>
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex items-center gap-4 mb-6">
          <MdFilterList className="text-gray-600 transition-transform duration-200 hover:rotate-12" size={20} />
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md ${
                selectedFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-indigo-300'
              }`}
            >
              All Jobs
            </button>
            <button
              onClick={() => setSelectedFilter('high-match')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md ${
                selectedFilter === 'high-match'
                  ? 'bg-green-600 text-white shadow-lg shadow-green-500/25'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-green-300'
              }`}
            >
              High Match (85%+)
            </button>
            <button
              onClick={() => setSelectedFilter('remote')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md ${
                selectedFilter === 'remote'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-blue-300'
              }`}
            >
              Remote Jobs
            </button>
            <button
              onClick={() => setSelectedFilter('saved')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md ${
                selectedFilter === 'saved'
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/25'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-pink-300'
              }`}
            >
              Saved Jobs
            </button>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 hover:border-indigo-300 group">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl transition-transform duration-200 group-hover:scale-110">{job.logo}</div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-200 group-hover:text-indigo-600">{job.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 transform group-hover:scale-105 ${getMatchColor(job.matchScore)}`}>
                          {job.matchScore}% Match
                        </span>
                        {job.remote && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 transition-all duration-200 transform group-hover:scale-105 group-hover:bg-blue-200">
                            Remote
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-gray-600 mb-3 group-hover:text-gray-700 transition-colors duration-200">
                        <span className="flex items-center gap-1">
                          <FaBuilding size={12} className="transition-transform duration-200 group-hover:scale-110" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt size={12} className="transition-transform duration-200 group-hover:scale-110" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaDollarSign size={12} className="transition-transform duration-200 group-hover:scale-110" />
                          {job.salary}
                        </span>
                        <span className="text-sm">{job.postedDate}</span>
                      </div>
                      <p className="text-gray-700 mb-4 group-hover:text-gray-800 transition-colors duration-200">{job.description}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm transition-all duration-200 transform hover:scale-105 hover:bg-indigo-200 hover:shadow-md cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">Key Requirements</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 group-hover:text-gray-700 transition-colors duration-200">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="transition-all duration-200 hover:text-gray-800">{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">Benefits</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm transition-all duration-200 transform hover:scale-105 hover:bg-green-100 hover:text-green-700 hover:shadow-md cursor-default"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mt-4 lg:mt-0 lg:ml-6">
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md ${
                      savedJobs.has(job.id)
                        ? 'bg-pink-600 text-white hover:bg-pink-700 shadow-lg shadow-pink-500/25'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {savedJobs.has(job.id) ? <FaHeartBroken size={14} className="transition-transform duration-200 hover:scale-110" /> : <FaHeart size={14} className="transition-transform duration-200 hover:scale-110" />}
                    {savedJobs.has(job.id) ? 'Unsave' : 'Save'}
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-indigo-500/25">
                    <FaExternalLinkAlt size={14} className="transition-transform duration-200 hover:scale-110" />
                    Apply Now
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No jobs found for the selected filter.</p>
            <button
              onClick={() => setSelectedFilter('all')}
              className="text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              View all jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatches;