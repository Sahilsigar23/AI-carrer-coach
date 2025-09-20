import React, { useState, useEffect, useRef } from 'react';
import { FaChartBar, FaChartLine, FaChartPie, FaDownload, FaCalendarAlt, FaFilter, FaFilePdf, FaFileCsv, FaFileCode } from 'react-icons/fa';
import { MdAnalytics, MdTrendingUp, MdAssessment, MdDateRange } from 'react-icons/md';
import { BiRefresh, BiExport } from 'react-icons/bi';

const Reports = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('last30days');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef(null);

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const reportTypes = [
    {
      id: 'overview',
      name: 'Overview Report',
      description: 'Comprehensive view of your career progress',
      icon: MdAnalytics,
      color: 'text-blue-400'
    },
    {
      id: 'skills',
      name: 'Skills Analysis',
      description: 'Detailed breakdown of skill development',
      icon: FaChartBar,
      color: 'text-green-400'
    },
    {
      id: 'activity',
      name: 'Activity Report',
      description: 'Your learning and engagement patterns',
      icon: FaChartLine,
      color: 'text-purple-400'
    },
    {
      id: 'goals',
      name: 'Goals Progress',
      description: 'Track progress towards career objectives',
      icon: MdTrendingUp,
      color: 'text-yellow-400'
    }
  ];

  const overviewStats = {
    totalLearningHours: 127,
    skillsImproved: 8,
    assessmentsCompleted: 12,
    goalsAchieved: 5,
    averageScore: 87,
    streakDays: 15
  };

  const skillsData = [
    { skill: 'Python', currentLevel: 85, improvement: 15, timeSpent: 45 },
    { skill: 'Machine Learning', currentLevel: 72, improvement: 22, timeSpent: 38 },
    { skill: 'Data Analysis', currentLevel: 90, improvement: 10, timeSpent: 25 },
    { skill: 'React.js', currentLevel: 78, improvement: 18, timeSpent: 32 },
    { skill: 'AWS', currentLevel: 65, improvement: 25, timeSpent: 28 },
    { skill: 'Communication', currentLevel: 82, improvement: 12, timeSpent: 15 }
  ];

  const activityData = [
    { week: 'Week 1', hours: 12, assessments: 3, goals: 1 },
    { week: 'Week 2', hours: 18, assessments: 2, goals: 2 },
    { week: 'Week 3', hours: 15, assessments: 4, goals: 1 },
    { week: 'Week 4', hours: 22, assessments: 3, goals: 1 }
  ];

  const goalsData = [
    {
      goal: 'Complete Python Certification',
      progress: 85,
      deadline: '2024-04-15',
      status: 'on-track',
      timeSpent: 45
    },
    {
      goal: 'Build ML Portfolio Project',
      progress: 60,
      deadline: '2024-05-01',
      status: 'on-track',
      timeSpent: 32
    },
    {
      goal: 'Improve Resume Score to 95%',
      progress: 92,
      deadline: '2024-03-30',
      status: 'ahead',
      timeSpent: 8
    },
    {
      goal: 'Network with 20 Professionals',
      progress: 40,
      deadline: '2024-06-01',
      status: 'behind',
      timeSpent: 12
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ahead': return 'text-green-600 bg-green-100';
      case 'on-track': return 'text-blue-600 bg-blue-100';
      case 'behind': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const exportReport = (format) => {
    const reportData = getReportData();
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `career_analytics_${selectedReport}_${timestamp}`;
    
    switch (format) {
      case 'pdf':
        exportToPDF(reportData, filename);
        break;
      case 'csv':
        exportToCSV(reportData, filename);
        break;
      case 'json':
        exportToJSON(reportData, filename);
        break;
      default:
        console.error('Unsupported export format');
    }
    setShowExportMenu(false);
  };

  const getReportData = () => {
    const baseData = {
      reportType: selectedReport,
      timeframe: selectedTimeframe,
      generatedAt: new Date().toISOString(),
      overviewStats,
      skillsData,
      activityData,
      goalsData
    };

    switch (selectedReport) {
      case 'overview':
        return {
          ...baseData,
          data: {
            totalLearningHours: overviewStats.totalLearningHours,
            skillsImproved: overviewStats.skillsImproved,
            assessmentsCompleted: overviewStats.assessmentsCompleted,
            goalsAchieved: overviewStats.goalsAchieved,
            averageScore: overviewStats.averageScore,
            streakDays: overviewStats.streakDays,
            weeklyActivity: activityData
          }
        };
      case 'skills':
        return {
          ...baseData,
          data: skillsData
        };
      case 'activity':
        return {
          ...baseData,
          data: {
            weeklyActivity: activityData,
            peakLearningTimes: {
              mostActiveDay: 'Wednesday',
              peakHours: '2:00 PM - 4:00 PM',
              averageSession: '45 minutes'
            },
            engagementMetrics: {
              completionRate: '89%',
              timeOnPlatform: '127 hours',
              consistencyScore: '8.5/10'
            }
          }
        };
      case 'goals':
        return {
          ...baseData,
          data: goalsData
        };
      default:
        return baseData;
    }
  };

  const exportToPDF = (data, filename) => {
    // Create a simple HTML content for PDF generation
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Career Analytics Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin-bottom: 25px; }
          .section h2 { color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 5px; }
          .metric { display: flex; justify-content: space-between; margin: 10px 0; }
          .skill-item { margin: 15px 0; padding: 10px; border-left: 4px solid #4f46e5; background: #f8fafc; }
          .goal-item { margin: 15px 0; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; }
          .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
          .status.ahead { background: #dcfce7; color: #166534; }
          .status.on-track { background: #dbeafe; color: #1e40af; }
          .status.behind { background: #fee2e2; color: #dc2626; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>AI Career Coach - Analytics Report</h1>
          <p>Report Type: ${data.reportType.charAt(0).toUpperCase() + data.reportType.slice(1)}</p>
          <p>Timeframe: ${data.timeframe}</p>
          <p>Generated: ${new Date(data.generatedAt).toLocaleDateString()}</p>
        </div>
        
        ${generatePDFContent(data)}
      </body>
      </html>
    `;

    // Create a new window and print
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const generatePDFContent = (data) => {
    switch (data.reportType) {
      case 'overview':
        return `
          <div class="section">
            <h2>Overview Statistics</h2>
            <div class="metric"><span>Total Learning Hours:</span><span>${data.data.totalLearningHours}</span></div>
            <div class="metric"><span>Skills Improved:</span><span>${data.data.skillsImproved}</span></div>
            <div class="metric"><span>Assessments Completed:</span><span>${data.data.assessmentsCompleted}</span></div>
            <div class="metric"><span>Goals Achieved:</span><span>${data.data.goalsAchieved}</span></div>
            <div class="metric"><span>Average Score:</span><span>${data.data.averageScore}%</span></div>
            <div class="metric"><span>Current Streak:</span><span>${data.data.streakDays} days</span></div>
          </div>
          <div class="section">
            <h2>Weekly Activity</h2>
            ${data.data.weeklyActivity.map(week => `
              <div class="metric">
                <span>${week.week}:</span>
                <span>${week.hours}h, ${week.assessments} assessments, ${week.goals} goals</span>
              </div>
            `).join('')}
          </div>
        `;
      case 'skills':
        return `
          <div class="section">
            <h2>Skills Development Analysis</h2>
            ${data.data.map(skill => `
              <div class="skill-item">
                <h3>${skill.skill}</h3>
                <div class="metric"><span>Current Level:</span><span>${skill.currentLevel}%</span></div>
                <div class="metric"><span>Improvement:</span><span>+${skill.improvement}%</span></div>
                <div class="metric"><span>Time Spent:</span><span>${skill.timeSpent}h</span></div>
              </div>
            `).join('')}
          </div>
        `;
      case 'activity':
        return `
          <div class="section">
            <h2>Learning Activity Trends</h2>
            ${data.data.weeklyActivity.map(week => `
              <div class="metric">
                <span>${week.week}:</span>
                <span>${week.hours}h, ${week.assessments} assessments, ${week.goals} goals</span>
              </div>
            `).join('')}
          </div>
          <div class="section">
            <h2>Peak Learning Times</h2>
            <div class="metric"><span>Most Active Day:</span><span>${data.data.peakLearningTimes.mostActiveDay}</span></div>
            <div class="metric"><span>Peak Hours:</span><span>${data.data.peakLearningTimes.peakHours}</span></div>
            <div class="metric"><span>Average Session:</span><span>${data.data.peakLearningTimes.averageSession}</span></div>
          </div>
          <div class="section">
            <h2>Engagement Metrics</h2>
            <div class="metric"><span>Completion Rate:</span><span>${data.data.engagementMetrics.completionRate}</span></div>
            <div class="metric"><span>Time on Platform:</span><span>${data.data.engagementMetrics.timeOnPlatform}</span></div>
            <div class="metric"><span>Consistency Score:</span><span>${data.data.engagementMetrics.consistencyScore}</span></div>
          </div>
        `;
      case 'goals':
        return `
          <div class="section">
            <h2>Goals Progress Report</h2>
            ${data.data.map(goal => `
              <div class="goal-item">
                <h3>${goal.goal}</h3>
                <div class="metric"><span>Progress:</span><span>${goal.progress}%</span></div>
                <div class="metric"><span>Status:</span><span class="status ${goal.status}">${goal.status.replace('-', ' ')}</span></div>
                <div class="metric"><span>Time Spent:</span><span>${goal.timeSpent}h</span></div>
                <div class="metric"><span>Deadline:</span><span>${new Date(goal.deadline).toLocaleDateString()}</span></div>
                <div class="metric"><span>Days Left:</span><span>${Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))}</span></div>
              </div>
            `).join('')}
          </div>
        `;
      default:
        return '<p>No data available for this report type.</p>';
    }
  };

  const exportToCSV = (data, filename) => {
    let csvContent = '';
    
    switch (data.reportType) {
      case 'overview':
        csvContent = 'Metric,Value\n';
        csvContent += `Total Learning Hours,${data.data.totalLearningHours}\n`;
        csvContent += `Skills Improved,${data.data.skillsImproved}\n`;
        csvContent += `Assessments Completed,${data.data.assessmentsCompleted}\n`;
        csvContent += `Goals Achieved,${data.data.goalsAchieved}\n`;
        csvContent += `Average Score,${data.data.averageScore}%\n`;
        csvContent += `Current Streak,${data.data.streakDays} days\n`;
        csvContent += '\nWeekly Activity\nWeek,Hours,Assessments,Goals\n';
        data.data.weeklyActivity.forEach(week => {
          csvContent += `${week.week},${week.hours},${week.assessments},${week.goals}\n`;
        });
        break;
      case 'skills':
        csvContent = 'Skill,Current Level,Improvement,Time Spent\n';
        data.data.forEach(skill => {
          csvContent += `${skill.skill},${skill.currentLevel}%,+${skill.improvement}%,${skill.timeSpent}h\n`;
        });
        break;
      case 'activity':
        csvContent = 'Week,Hours,Assessments,Goals\n';
        data.data.weeklyActivity.forEach(week => {
          csvContent += `${week.week},${week.hours},${week.assessments},${week.goals}\n`;
        });
        csvContent += '\nPeak Learning Times\nMetric,Value\n';
        csvContent += `Most Active Day,${data.data.peakLearningTimes.mostActiveDay}\n`;
        csvContent += `Peak Hours,${data.data.peakLearningTimes.peakHours}\n`;
        csvContent += `Average Session,${data.data.peakLearningTimes.averageSession}\n`;
        csvContent += '\nEngagement Metrics\nMetric,Value\n';
        csvContent += `Completion Rate,${data.data.engagementMetrics.completionRate}\n`;
        csvContent += `Time on Platform,${data.data.engagementMetrics.timeOnPlatform}\n`;
        csvContent += `Consistency Score,${data.data.engagementMetrics.consistencyScore}\n`;
        break;
      case 'goals':
        csvContent = 'Goal,Progress,Status,Time Spent,Deadline,Days Left\n';
        data.data.forEach(goal => {
          const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
          csvContent += `${goal.goal},${goal.progress}%,${goal.status},${goal.timeSpent}h,${new Date(goal.deadline).toLocaleDateString()},${daysLeft}\n`;
        });
        break;
    }

    downloadFile(csvContent, `${filename}.csv`, 'text/csv');
  };

  const exportToJSON = (data, filename) => {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, `${filename}.json`, 'application/json');
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-4">
            <FaChartLine className="text-blue-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
            <span className="text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:text-blue-500">{overviewStats.totalLearningHours}</span>
          </div>
          <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Total Learning Hours</p>
          <p className="text-sm text-green-400 mt-1 transition-colors duration-200 group-hover:text-green-500">+12% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-4">
            <MdTrendingUp className="text-green-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
            <span className="text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:text-green-500">{overviewStats.skillsImproved}</span>
          </div>
          <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Skills Improved</p>
          <p className="text-sm text-green-400 mt-1 transition-colors duration-200 group-hover:text-green-500">+3 from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-4">
            <MdAssessment className="text-purple-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
            <span className="text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:text-purple-500">{overviewStats.assessmentsCompleted}</span>
          </div>
          <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Assessments Completed</p>
          <p className="text-sm text-green-400 mt-1 transition-colors duration-200 group-hover:text-green-500">+5 from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl group">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-200 group-hover:text-indigo-600">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Assessment Score</span>
              <span className="text-xl font-bold text-green-400">{overviewStats.averageScore}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Goals Achieved</span>
              <span className="text-xl font-bold text-blue-400">{overviewStats.goalsAchieved}/8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Streak</span>
              <span className="text-xl font-bold text-yellow-400">{overviewStats.streakDays} days</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl group">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-200 group-hover:text-indigo-600">Weekly Activity</h3>
          <div className="space-y-3">
            {activityData.map((week, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
                <span className="text-gray-600 transition-colors duration-200 hover:text-gray-700">{week.week}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-blue-400 transition-colors duration-200 hover:text-blue-500">{week.hours}h</span>
                  <span className="text-sm text-green-400 transition-colors duration-200 hover:text-green-500">{week.assessments} assessments</span>
                  <span className="text-sm text-purple-400 transition-colors duration-200 hover:text-purple-500">{week.goals} goals</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkillsReport = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl group">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 transition-colors duration-200 group-hover:text-indigo-600">Skills Development Analysis</h3>
      <div className="space-y-6">
        {skillsData.map((skill, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900 transition-colors duration-200 hover:text-indigo-600">{skill.skill}</h4>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 transition-colors duration-200 hover:text-gray-700">{skill.timeSpent}h spent</span>
                <span className={`text-sm transition-colors duration-200 ${skill.improvement > 15 ? 'text-green-400 hover:text-green-500' : 'text-yellow-400 hover:text-yellow-500'}`}>
                  +{skill.improvement}% improvement
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Current Level</span>
                  <span>{skill.currentLevel}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500 animate-pulse"
                    style={{ width: `${skill.currentLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivityReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl group">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 transition-colors duration-200 group-hover:text-indigo-600">Learning Activity Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {activityData.map((week, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-100 rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 hover:bg-indigo-50 group">
                <div className="text-2xl font-bold text-indigo-400 mb-2 transition-all duration-300 group-hover:text-indigo-600 group-hover:scale-110">{week.hours}</div>
                <div className="text-sm text-gray-600 transition-colors duration-200 group-hover:text-gray-700">{week.week}</div>
                <div className="text-xs text-gray-500 mt-1 transition-colors duration-200 group-hover:text-gray-600">{week.assessments} assessments</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl group">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-200 group-hover:text-indigo-600">Peak Learning Times</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
              <span className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Most Active Day</span>
              <span className="text-gray-900 transition-colors duration-200 hover:text-indigo-600">Wednesday</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
              <span className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Peak Hours</span>
              <span className="text-gray-900 transition-colors duration-200 hover:text-indigo-600">2:00 PM - 4:00 PM</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
              <span className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Average Session</span>
              <span className="text-gray-900 transition-colors duration-200 hover:text-indigo-600">45 minutes</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl group">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-200 group-hover:text-indigo-600">Engagement Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
              <span className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Completion Rate</span>
              <span className="text-green-400 transition-colors duration-200 hover:text-green-500">89%</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
              <span className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Time on Platform</span>
              <span className="text-blue-400 transition-colors duration-200 hover:text-blue-500">127 hours</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
              <span className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Consistency Score</span>
              <span className="text-purple-400 transition-colors duration-200 hover:text-purple-500">8.5/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGoalsReport = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl group">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 transition-colors duration-200 group-hover:text-indigo-600">Goals Progress Report</h3>
      <div className="space-y-6">
        {goalsData.map((goal, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900 transition-colors duration-200 group-hover:text-indigo-600">{goal.goal}</h4>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs transition-all duration-200 transform group-hover:scale-105 ${getStatusColor(goal.status)}`}>
                  {goal.status.replace('-', ' ')}
                </span>
                <span className="text-sm text-gray-600 transition-colors duration-200 group-hover:text-gray-700">{goal.timeSpent}h</span>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 animate-pulse ${
                    goal.status === 'ahead' ? 'bg-green-500' :
                    goal.status === 'on-track' ? 'bg-blue-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span className="transition-colors duration-200 group-hover:text-gray-700">Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
              <span className="transition-colors duration-200 group-hover:text-gray-700">{Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview': return renderOverviewReport();
      case 'skills': return renderSkillsReport();
      case 'activity': return renderActivityReport();
      case 'goals': return renderGoalsReport();
      default: return renderOverviewReport();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div className="group">
              <div className="flex items-center space-x-3 mb-2">
                <MdAnalytics className="text-indigo-400 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12" size={32} />
                <h1 className="text-3xl font-bold text-gray-900 transition-colors duration-300 hover:text-indigo-600">Reports & Analytics</h1>
              </div>
              <p className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Comprehensive insights into your career development progress</p>
            </div>
            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <button className="flex items-center gap-2 bg-white hover:bg-gray-100 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md border border-gray-200">
                <BiRefresh size={16} className="transition-transform duration-200 hover:rotate-180" />
                Refresh
              </button>
              <div className="relative" ref={exportMenuRef}>
                <button 
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-indigo-500/25"
                >
                  <FaDownload size={16} className="transition-transform duration-200 hover:scale-110" />
                  Export
                </button>
                
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <button
                        onClick={() => exportReport('pdf')}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <FaFilePdf className="text-red-500" size={16} />
                        Export as PDF
                      </button>
                      <button
                        onClick={() => exportReport('csv')}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <FaFileCsv className="text-green-500" size={16} />
                        Export as CSV
                      </button>
                      <button
                        onClick={() => exportReport('json')}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <FaFileCode className="text-blue-500" size={16} />
                        Export as JSON
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Report Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`text-left p-4 rounded-xl border transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group ${
                  selectedReport === report.id
                    ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-500/25'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
              >
                <report.icon className={`${selectedReport === report.id ? 'text-white' : report.color} mb-3 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12`} size={24} />
                <h3 className={`font-semibold mb-1 transition-colors duration-200 ${
                  selectedReport === report.id ? 'text-white' : 'text-gray-900 group-hover:text-indigo-600'
                }`}>{report.name}</h3>
                <p className={`text-sm transition-colors duration-200 ${
                  selectedReport === report.id ? 'text-indigo-100' : 'text-gray-600 group-hover:text-gray-700'
                }`}>{report.description}</p>
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2 group">
              <FaCalendarAlt className="text-gray-600 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={16} />
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:scale-105 focus:shadow-lg hover:border-indigo-300 hover:shadow-md"
              >
                <option value="last7days">Last 7 days</option>
                <option value="last30days">Last 30 days</option>
                <option value="last3months">Last 3 months</option>
                <option value="last6months">Last 6 months</option>
                <option value="lastyear">Last year</option>
              </select>
            </div>
          </div>

          {/* Report Content */}
          {renderReportContent()}
      </div>
    </div>
  );
};

export default Reports;