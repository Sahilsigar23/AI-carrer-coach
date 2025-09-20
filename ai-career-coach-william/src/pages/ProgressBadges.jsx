import React, { useState } from 'react';
import { FaTrophy, FaMedal, FaStar, FaAward, FaChartLine, FaFire, FaCalendarCheck, FaLock } from 'react-icons/fa';
import { MdTrendingUp, MdSpeed, MdTimeline, MdAssessment } from 'react-icons/md';
import { BiRefresh } from 'react-icons/bi';

const ProgressBadges = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const progressStats = {
    totalPoints: 2850,
    currentLevel: 8,
    nextLevel: 9,
    pointsToNext: 150,
    streakDays: 15,
    completedChallenges: 23,
    totalBadges: 12
  };

  const badges = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Complete your first career assessment',
      icon: FaStar,
      category: 'milestone',
      earnedDate: '2024-01-15',
      points: 50,
      rarity: 'common',
      earned: true
    },
    {
      id: 2,
      name: 'Code Warrior',
      description: 'Complete 10 coding challenges',
      icon: FaTrophy,
      category: 'skill',
      earnedDate: '2024-02-20',
      points: 150,
      rarity: 'rare',
      earned: true
    },
    {
      id: 3,
      name: 'Learning Streak',
      description: 'Maintain a 7-day learning streak',
      icon: FaFire,
      category: 'consistency',
      earnedDate: '2024-02-10',
      points: 100,
      rarity: 'uncommon',
      earned: true
    },
    {
      id: 4,
      name: 'Resume Master',
      description: 'Upload and optimize your resume',
      icon: FaMedal,
      category: 'milestone',
      earnedDate: '2024-01-25',
      points: 75,
      rarity: 'common',
      earned: true
    },
    {
      id: 5,
      name: 'Interview Ready',
      description: 'Complete 5 mock interviews',
      icon: FaAward,
      category: 'skill',
      earnedDate: null,
      points: 200,
      rarity: 'epic',
      earned: false,
      progress: 60
    },
    {
      id: 6,
      name: 'Network Builder',
      description: 'Connect with 10 professionals',
      icon: FaTrophy,
      category: 'social',
      earnedDate: null,
      points: 120,
      rarity: 'rare',
      earned: false,
      progress: 30
    },
    {
      id: 7,
      name: 'Skill Collector',
      description: 'Master 5 different skills',
      icon: FaStar,
      category: 'skill',
      earnedDate: '2024-03-01',
      points: 250,
      rarity: 'epic',
      earned: true
    },
    {
      id: 8,
      name: 'Marathon Learner',
      description: 'Maintain a 30-day learning streak',
      icon: FaFire,
      category: 'consistency',
      earnedDate: null,
      points: 300,
      rarity: 'legendary',
      earned: false,
      progress: 50
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Skills Mastered',
      value: 12,
      target: 20,
      icon: FaChartLine,
      color: 'text-blue-400'
    },
    {
      id: 2,
      title: 'Days Active',
      value: 45,
      target: 100,
      icon: FaCalendarCheck,
      color: 'text-green-400'
    },
    {
      id: 3,
      title: 'Assessments Completed',
      value: 8,
      target: 15,
      icon: MdAssessment,
      color: 'text-purple-400'
    },
    {
      id: 4,
      title: 'Learning Hours',
      value: 127,
      target: 200,
      icon: MdTimeline,
      color: 'text-yellow-400'
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-500 bg-gray-500/10';
      case 'uncommon': return 'border-green-500 bg-green-500/10';
      case 'rare': return 'border-blue-500 bg-blue-500/10';
      case 'epic': return 'border-purple-500 bg-purple-500/10';
      case 'legendary': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getRarityTextColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-600';
      case 'uncommon': return 'text-green-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-600';
    }
  };

  const filteredBadges = selectedCategory === 'all'
    ? badges
    : badges.filter(badge => badge.category === selectedCategory);

  const levelProgress = ((progressStats.totalPoints % 300) / 300) * 100;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 transition-colors duration-300 hover:text-indigo-600">Progress & Badges</h1>
              <p className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Track your learning journey and celebrate achievements</p>
            </div>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 hover:scale-105 hover:shadow-lg px-4 py-2 rounded-lg transition-all duration-200 mt-4 lg:mt-0">
              <BiRefresh size={16} />
              Refresh Progress
            </button>
          </div>

          {/* Progress Overview */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="text-3xl font-bold text-indigo-400 transition-all duration-300 hover:text-indigo-500">{progressStats.totalPoints}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="text-3xl font-bold text-green-400 transition-all duration-300 hover:text-green-500">Level {progressStats.currentLevel}</div>
                <div className="text-sm text-gray-600">{progressStats.pointsToNext} to Level {progressStats.nextLevel}</div>
              </div>
              <div className="text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="text-3xl font-bold text-yellow-400 transition-all duration-300 hover:text-yellow-500">{progressStats.streakDays}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
              <div className="text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="text-3xl font-bold text-purple-400 transition-all duration-300 hover:text-purple-500">{progressStats.totalBadges}</div>
                <div className="text-sm text-gray-600">Badges Earned</div>
              </div>
            </div>

            {/* Level Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Level {progressStats.currentLevel}</span>
                <span>Level {progressStats.nextLevel}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${levelProgress}%` }}
                ></div>
              </div>
              <div className="text-center text-sm text-gray-600 mt-2">
                {progressStats.pointsToNext} points to next level
              </div>
            </div>
          </div>

          {/* Achievement Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <achievement.icon className={`${achievement.color}`} size={24} />
                  <span className="text-sm text-gray-600">{achievement.value}/{achievement.target}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${achievement.color.replace('text-', 'bg-')}`}
                    style={{ width: `${(achievement.value / achievement.target) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">
                  {Math.round((achievement.value / achievement.target) * 100)}% Complete
                </div>
              </div>
            ))}
          </div>

          {/* Badge Categories Filter */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-gray-900'
                  : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              All Badges
            </button>
            <button
              onClick={() => setSelectedCategory('milestone')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md ${
                selectedCategory === 'milestone'
                  ? 'bg-indigo-600 text-gray-900'
                  : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Milestones
            </button>
            <button
              onClick={() => setSelectedCategory('skill')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md ${
                selectedCategory === 'skill'
                  ? 'bg-indigo-600 text-gray-900'
                  : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setSelectedCategory('consistency')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md ${
                selectedCategory === 'consistency'
                  ? 'bg-indigo-600 text-gray-900'
                  : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Consistency
            </button>
            <button
              onClick={() => setSelectedCategory('social')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md ${
                selectedCategory === 'social'
                  ? 'bg-indigo-600 text-gray-900'
                  : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Social
            </button>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBadges.map((badge) => (
              <div
                key={badge.id}
                className={`bg-white rounded-xl p-6 border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-2 cursor-pointer ${
                  badge.earned
                    ? `${getRarityColor(badge.rarity)} hover:shadow-xl ${badge.rarity === 'legendary' ? 'badge-glow' : ''}`
                    : 'border-gray-200 bg-white/50 opacity-75 hover:opacity-90'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`relative mb-4 transition-all duration-300 ${badge.earned ? 'hover:scale-110' : 'opacity-50'}`}>
                    <badge.icon
                      size={48}
                      className={`transition-all duration-300 ${badge.earned ? `${getRarityTextColor(badge.rarity)} hover:drop-shadow-lg` : 'text-gray-600'}`}
                    />
                    {!badge.earned && (
                      <FaLock
                        size={16}
                        className="absolute -top-1 -right-1 text-gray-500 bg-white rounded-full p-1"
                      />
                    )}
                  </div>

                  <h3 className={`text-lg font-semibold mb-2 ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {badge.name}
                  </h3>

                  <p className={`text-sm mb-3 ${badge.earned ? 'text-gray-700' : 'text-gray-600'}`}>
                    {badge.description}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(badge.rarity)} ${getRarityTextColor(badge.rarity)}`}>
                      {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                    </span>
                    <span className="text-xs text-gray-600">{badge.points} pts</span>
                  </div>

                  {badge.earned ? (
                    <div className="text-xs text-green-400">
                      Earned {new Date(badge.earnedDate).toLocaleDateString()}
                    </div>
                  ) : badge.progress ? (
                    <div className="w-full">
                      <div className="text-xs text-gray-600 mb-1">{badge.progress}% Complete</div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500 animate-pulse"
                          style={{ width: `${badge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">Not started</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredBadges.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No badges found for the selected category.</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProgressBadges;