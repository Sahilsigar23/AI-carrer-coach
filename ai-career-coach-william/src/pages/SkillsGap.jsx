import React, { useState } from 'react';
import { FaChartLine, FaBookOpen, FaLightbulb, FaClock } from 'react-icons/fa';
import { MdTrendingUp, MdAssessment } from 'react-icons/md';
import { ai } from '../lib/api';

const SkillsGap = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [targetRole, setTargetRole] = useState('AI Engineer');
  const [currentSkills, setCurrentSkills] = useState('Python, SQL, React');
  const [result, setResult] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onAnalyze() {
    try {
      setLoading(true);
      setError('');
      const res = await ai.skillGapRoadmap({ targetRole, currentSkills: currentSkills.split(',').map(s => s.trim()).filter(Boolean), currentLevel: 'beginner' });
      setResult(res.data.skillGap || res.data?.skillgap || res.data?.gap || null);
      setRoadmap(res.data.roadmap || null);
    } catch (err) {
      setError(err.message || 'Failed to analyze');
      setResult(null); // Clear any previous results
      setRoadmap(null); // Clear any previous roadmap
    } finally {
      setLoading(false);
    }
  }

  // Only process data if there's no error and we have valid results
  const have = (!error && result && Array.isArray(result.have)) ? result.have : [];
  const need = (!error && result && Array.isArray(result.need)) ? result.need : [];

  const computedFromResult = have.length > 0 || need.length > 0;

  // Only show skills data if we have real results and no error
  const skillsData = (computedFromResult && !error) ? (
    [
      ...have.map((s, i) => ({ id: i + 1, name: s, currentLevel: 70, requiredLevel: 85, priority: 'Medium', category: 'Technical', timeToComplete: '1-2 months', recommendations: [] })),
      ...need.map((s, i) => ({ id: 100 + i + 1, name: s, currentLevel: 30, requiredLevel: 80, priority: 'High', category: 'Technical', timeToComplete: '2-3 months', recommendations: [] })),
    ]
  ) : [];

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getGapPercentage = (current, required) => {
    return Math.max(0, required - current);
  };

  const filteredSkills = error ? [] : (selectedLevel === 'all'
    ? skillsData
    : skillsData.filter(skill => skill.priority.toLowerCase() === selectedLevel));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
        <div className="mb-6 bg-white rounded-xl p-4 border">
          <div className="flex flex-col md:flex-row gap-3">
            <input className="border rounded p-2 flex-1" value={targetRole} onChange={e => setTargetRole(e.target.value)} placeholder="Target role e.g. Data Analyst" />
            <input className="border rounded p-2 flex-1" value={currentSkills} onChange={e => setCurrentSkills(e.target.value)} placeholder="Your skills, comma separated" />
            <button onClick={onAnalyze} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? 'Analyzing...' : 'Analyze'}</button>
          </div>
          {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 transition-colors duration-300 hover:text-indigo-600">Skills Gap Analysis</h1>
          <p className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Identify and bridge the gaps between your current skills and career requirements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <FaChartLine className="text-blue-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
              <span className="text-2xl font-bold transition-colors duration-300 group-hover:text-blue-600">{error ? 0 : filteredSkills.length}</span>
            </div>
            <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Skills to Improve</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <MdTrendingUp className="text-red-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
              <span className="text-2xl font-bold transition-colors duration-300 group-hover:text-red-600">{error ? 0 : filteredSkills.filter(s => s.priority.toLowerCase()==='high').length}</span>
            </div>
            <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">High Priority</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <FaClock className="text-yellow-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
              <span className="text-2xl font-bold transition-colors duration-300 group-hover:text-yellow-600">{error ? 0 : Math.max(1, Math.ceil(filteredSkills.length * 2))}</span>
            </div>
            <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Months to Complete</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <MdAssessment className="text-green-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
              <span className="text-2xl font-bold transition-colors duration-300 group-hover:text-green-600">{error ? '0%' : '72%'}</span>
            </div>
            <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Overall Progress</p>
          </div>
        </div>

        <div className="space-y-6">
          {!error && filteredSkills.map((skill) => (
            <div key={skill.id} className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-200 group-hover:text-indigo-600">{skill.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 transform group-hover:scale-105 ${getPriorityColor(skill.priority)}`}>{skill.priority} Priority</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 transition-all duration-200 transform group-hover:scale-105 group-hover:bg-indigo-50 group-hover:text-indigo-700">{skill.category}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                    <span>Current: {skill.currentLevel}%</span>
                    <span>Required: {skill.requiredLevel}%</span>
                    <span>Gap: {getGapPercentage(skill.currentLevel, skill.requiredLevel)}%</span>
                    <span className="flex items-center gap-1"><FaClock size={12} className="transition-transform duration-200 group-hover:rotate-12" />{skill.timeToComplete}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!error && roadmap && Array.isArray(roadmap.milestones) && roadmap.milestones.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Suggested Learning Roadmap</h2>
            <div className="space-y-4">
              {roadmap.milestones.map((m, idx) => (
                <div key={idx} className="bg-white p-4 rounded border">
                  <div className="font-semibold">Step {idx + 1}: {m.title}</div>
                  <div className="text-sm text-gray-700 mb-2">{m.description}</div>
                  <ul className="list-disc pl-5 text-sm">
                    {(m.resources || []).map((r, i) => (
                      <li key={i}><a href={r.url} className="text-indigo-600" target="_blank" rel="noreferrer">{r.title}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SkillsGap;