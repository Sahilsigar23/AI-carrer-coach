import React, { useState } from 'react';
import { FaCheckCircle, FaCircle, FaClock, FaLightbulb, FaStar, FaBookOpen } from 'react-icons/fa';
import { MdTimeline, MdSpeed, MdTrendingUp } from 'react-icons/md';

const Roadmap = () => {
  const [selectedPath, setSelectedPath] = useState('ai-engineer');

  const roadmapData = {
    'ai-engineer': {
      title: 'AI Engineer',
      description: 'Complete roadmap to become an AI Engineer',
      totalSteps: 12,
      completedSteps: 5,
      estimatedTime: '8 months',
      steps: [
        {
          id: 1,
          title: 'Python Fundamentals',
          description: 'Master Python programming basics',
          status: 'completed',
          duration: '2 weeks',
          difficulty: 'Beginner',
          resources: ['Python.org Tutorial', 'Codecademy Python', 'Python Crash Course Book'],
          skills: ['Variables', 'Functions', 'Data Structures', 'OOP']
        },
        {
          id: 2,
          title: 'Data Structures & Algorithms',
          description: 'Learn essential DS&A for technical interviews',
          status: 'completed',
          duration: '4 weeks',
          difficulty: 'Intermediate',
          resources: ['LeetCode', 'Cracking the Coding Interview', 'AlgoExpert'],
          skills: ['Arrays', 'Linked Lists', 'Trees', 'Dynamic Programming']
        },
        {
          id: 3,
          title: 'Mathematics for AI',
          description: 'Linear algebra, calculus, and statistics',
          status: 'completed',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          resources: ['Khan Academy', 'MIT OpenCourseWare', '3Blue1Brown'],
          skills: ['Linear Algebra', 'Calculus', 'Statistics', 'Probability']
        },
        {
          id: 4,
          title: 'NumPy & Pandas',
          description: 'Data manipulation and analysis libraries',
          status: 'completed',
          duration: '2 weeks',
          difficulty: 'Beginner',
          resources: ['NumPy Docs', 'Pandas Docs', 'Data School YouTube'],
          skills: ['Data Manipulation', 'Data Analysis', 'Data Cleaning']
        },
        {
          id: 5,
          title: 'Machine Learning Basics',
          description: 'Understand ML algorithms and concepts',
          status: 'completed',
          duration: '4 weeks',
          difficulty: 'Intermediate',
          resources: ['Andrew Ng Course', 'Scikit-learn', 'Hands-On ML Book'],
          skills: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation']
        },
        {
          id: 6,
          title: 'Deep Learning Fundamentals',
          description: 'Neural networks and deep learning',
          status: 'in-progress',
          duration: '5 weeks',
          difficulty: 'Advanced',
          resources: ['Deep Learning Specialization', 'PyTorch Tutorials', 'Fast.ai'],
          skills: ['Neural Networks', 'CNNs', 'RNNs', 'Backpropagation']
        },
        {
          id: 7,
          title: 'Computer Vision',
          description: 'Image processing and computer vision',
          status: 'pending',
          duration: '4 weeks',
          difficulty: 'Advanced',
          resources: ['OpenCV', 'PyTorch Vision', 'CS231n Stanford'],
          skills: ['Image Processing', 'Object Detection', 'Image Classification']
        },
        {
          id: 8,
          title: 'Natural Language Processing',
          description: 'Text processing and language models',
          status: 'pending',
          duration: '4 weeks',
          difficulty: 'Advanced',
          resources: ['NLTK', 'spaCy', 'Hugging Face Transformers'],
          skills: ['Text Processing', 'Sentiment Analysis', 'Language Models']
        },
        {
          id: 9,
          title: 'MLOps & Deployment',
          description: 'Deploy ML models to production',
          status: 'pending',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          resources: ['MLflow', 'Docker', 'AWS SageMaker'],
          skills: ['Model Deployment', 'CI/CD', 'Monitoring', 'Containerization']
        },
        {
          id: 10,
          title: 'Cloud Platforms',
          description: 'AWS/GCP/Azure for AI workloads',
          status: 'pending',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          resources: ['AWS ML Services', 'Google AI Platform', 'Azure ML'],
          skills: ['Cloud Computing', 'Scalable ML', 'Cloud Storage']
        },
        {
          id: 11,
          title: 'Portfolio Projects',
          description: 'Build impressive AI projects',
          status: 'pending',
          duration: '6 weeks',
          difficulty: 'Advanced',
          resources: ['GitHub', 'Kaggle', 'Personal Blog'],
          skills: ['Project Management', 'Documentation', 'Presentation']
        },
        {
          id: 12,
          title: 'Job Preparation',
          description: 'Interview prep and job applications',
          status: 'pending',
          duration: '4 weeks',
          difficulty: 'Intermediate',
          resources: ['Pramp', 'InterviewBit', 'Company Research'],
          skills: ['Technical Interviews', 'System Design', 'Communication']
        }
      ]
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-600" size={20} />;
      case 'in-progress':
        return <FaClock className="text-yellow-600" size={20} />;
      default:
        return <FaCircle className="text-gray-400" size={20} />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'text-green-700 bg-green-100';
      case 'intermediate': return 'text-yellow-700 bg-yellow-100';
      case 'advanced': return 'text-red-700 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const currentRoadmap = roadmapData[selectedPath];
  const progressPercentage = (currentRoadmap.completedSteps / currentRoadmap.totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 transition-colors duration-300 hover:text-indigo-600">Career Roadmap</h1>
          <p className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Follow your personalized learning path to achieve your career goals</p>
        </div>

        {/* Roadmap Overview */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg hover:-translate-y-1 group">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 transition-colors duration-200 group-hover:text-indigo-600">{currentRoadmap.title}</h2>
              <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">{currentRoadmap.description}</p>
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <div className="text-center transition-all duration-200 transform group-hover:scale-105">
                <div className="text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">{currentRoadmap.completedSteps}</div>
                <div className="text-sm text-gray-600 transition-colors duration-200 group-hover:text-gray-700">of {currentRoadmap.totalSteps}</div>
              </div>
              <div className="text-center transition-all duration-200 transform group-hover:scale-105">
                <div className="text-2xl font-bold text-indigo-600 transition-colors duration-300 group-hover:text-indigo-700">{Math.round(progressPercentage)}%</div>
                <div className="text-sm text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Complete</div>
              </div>
              <div className="text-center transition-all duration-200 transform group-hover:scale-105">
                <div className="text-2xl font-bold text-yellow-600 transition-colors duration-300 group-hover:text-yellow-700">{currentRoadmap.estimatedTime}</div>
                <div className="text-sm text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Remaining</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-200">
              <span>Overall Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-gray-100/50 rounded-lg p-4 transition-all duration-200 transform hover:scale-105 hover:bg-indigo-50 hover:shadow-md group/stat">
              <MdTimeline className="text-indigo-600 transition-all duration-200 transform group-hover/stat:scale-110 group-hover/stat:rotate-12" size={24} />
              <div>
                <div className="text-sm text-gray-600 transition-colors duration-200 group-hover/stat:text-indigo-600">Next Milestone</div>
                <div className="font-semibold transition-colors duration-200 group-hover/stat:text-indigo-700">Deep Learning</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-100/50 rounded-lg p-4 transition-all duration-200 transform hover:scale-105 hover:bg-green-50 hover:shadow-md group/stat">
              <MdSpeed className="text-green-600 transition-all duration-200 transform group-hover/stat:scale-110 group-hover/stat:rotate-12" size={24} />
              <div>
                <div className="text-sm text-gray-600 transition-colors duration-200 group-hover/stat:text-green-600">Learning Pace</div>
                <div className="font-semibold transition-colors duration-200 group-hover/stat:text-green-700">On Track</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-100/50 rounded-lg p-4 transition-all duration-200 transform hover:scale-105 hover:bg-yellow-50 hover:shadow-md group/stat">
              <MdTrendingUp className="text-yellow-600 transition-all duration-200 transform group-hover/stat:scale-110 group-hover/stat:rotate-12" size={24} />
              <div>
                <div className="text-sm text-gray-600 transition-colors duration-200 group-hover/stat:text-yellow-600">Streak</div>
                <div className="font-semibold transition-colors duration-200 group-hover/stat:text-yellow-700">12 days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-6">
          {currentRoadmap.steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connecting Line */}
              {index < currentRoadmap.steps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-100"></div>
              )}

              <div className={`bg-white rounded-xl p-6 border transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 group ${
                step.status === 'in-progress'
                  ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                  : step.status === 'completed'
                  ? 'border-green-500/30 hover:border-green-400'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}>
                <div className="flex items-start gap-4">
                  {/* Step Icon */}
                  <div className="flex-shrink-0 mt-1 transition-transform duration-200 group-hover:scale-110">
                    {getStatusIcon(step.status)}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1 transition-colors duration-200 group-hover:text-indigo-600">{step.title}</h3>
                        <p className="text-gray-600 text-sm transition-colors duration-200 group-hover:text-gray-700">{step.description}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2 lg:mt-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 transform group-hover:scale-105 ${getDifficultyColor(step.difficulty)}`}>
                          {step.difficulty}
                        </span>
                        <span className="text-sm text-gray-600 flex items-center gap-1 group-hover:text-gray-700 transition-colors duration-200">
                          <FaClock size={12} className="transition-transform duration-200 group-hover:rotate-12" />
                          {step.duration}
                        </span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2 group-hover:text-indigo-600 transition-colors duration-200">
                        <FaStar className="text-yellow-600 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={12} />
                        Skills You'll Learn
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {step.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs transition-all duration-200 transform hover:scale-105 hover:bg-indigo-200 hover:shadow-md cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2 group-hover:text-indigo-600 transition-colors duration-200">
                        <FaBookOpen className="text-green-600 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={12} />
                        Recommended Resources
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {step.resources.map((resource, resourceIndex) => (
                          <div
                            key={resourceIndex}
                            className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100/50 rounded-lg p-3 transition-all duration-200 transform hover:scale-105 hover:bg-green-50 hover:text-gray-700 hover:shadow-md cursor-pointer group/resource"
                          >
                            <FaLightbulb size={12} className="text-yellow-600 flex-shrink-0 transition-all duration-200 transform group-hover/resource:scale-110 group-hover/resource:rotate-12" />
                            <span>{resource}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    {step.status === 'in-progress' && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-indigo-500/25">
                          Continue Learning
                        </button>
                      </div>
                    )}

                    {step.status === 'pending' && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md">
                          Start This Step
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;