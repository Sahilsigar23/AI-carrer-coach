import React, { useState, useEffect } from 'react';
import { MdOutlineSettings, MdOutlinePerson, MdOutlineNotifications, MdOutlineSecurity, MdOutlineStorage } from 'react-icons/md';
import { BiRefresh, BiDownload, BiSave, BiEdit, BiTrash } from 'react-icons/bi';
import { FaUser, FaEnvelope, FaBell, FaEye, FaEyeSlash, FaLock, FaDatabase, FaCheck, FaTimes } from 'react-icons/fa';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    location: true,
    linkedin: true,
    website: true,
    bio: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [hasChanges, setHasChanges] = useState(false);
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Original data for reset functionality
  const [originalData, setOriginalData] = useState({
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      bio: 'Aspiring AI Engineer with passion for machine learning and data science.',
      location: 'San Francisco, CA',
      linkedin: 'https://linkedin.com/in/johndoe',
      website: 'https://johndoe.dev'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      roadmapUpdates: true,
      newFeatures: true,
      weeklyDigest: false,
      marketingEmails: false
    },
    account: {
      twoFactorAuth: false,
      profileVisibility: 'private',
      dataCollection: true,
      analyticsSharing: false
    }
  });

  // Profile settings state
  const [profileData, setProfileData] = useState(originalData.profile);

  // Notification settings state
  const [notifications, setNotifications] = useState(originalData.notifications);

  // Account settings state
  const [accountSettings, setAccountSettings] = useState(originalData.account);

  const tabOptions = [
    { id: 'profile', name: 'Profile', icon: MdOutlinePerson },
    { id: 'notifications', name: 'Notifications', icon: MdOutlineNotifications },
    { id: 'security', name: 'Security', icon: MdOutlineSecurity },
    { id: 'privacy', name: 'Privacy & Data', icon: MdOutlineStorage }
  ];

  // Check for changes
  useEffect(() => {
    const hasProfileChanges = JSON.stringify(profileData) !== JSON.stringify(originalData.profile);
    const hasNotificationChanges = JSON.stringify(notifications) !== JSON.stringify(originalData.notifications);
    const hasAccountChanges = JSON.stringify(accountSettings) !== JSON.stringify(originalData.account);
    
    setHasChanges(hasProfileChanges || hasNotificationChanges || hasAccountChanges);
  }, [profileData, notifications, accountSettings, originalData]);

  const handleInputChange = (section, field, value) => {
    switch (section) {
      case 'profile':
        setProfileData(prev => ({ ...prev, [field]: value }));
        break;
      case 'notifications':
        setNotifications(prev => ({ ...prev, [field]: value }));
        break;
      case 'account':
        setAccountSettings(prev => ({ ...prev, [field]: value }));
        break;
      default:
        break;
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };


  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Validate profile data
      if (!validateEmail(profileData.email)) {
        showMessage('error', 'Please enter a valid email address');
        return;
      }
      
      if (!validatePhone(profileData.phone)) {
        showMessage('error', 'Please enter a valid phone number');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update original data to reflect saved state
      setOriginalData({
        profile: { ...profileData },
        notifications: { ...notifications },
        account: { ...accountSettings }
      });
      
      setHasChanges(false);
      showMessage('success', 'Settings saved successfully!');
      
    } catch (error) {
      showMessage('error', 'Failed to save settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values? This will discard any unsaved changes.')) {
      setProfileData({ ...originalData.profile });
      setNotifications({ ...originalData.notifications });
      setAccountSettings({ ...originalData.account });
      setHasChanges(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showMessage('info', 'Settings reset to default values');
    }
  };

  const handlePasswordUpdate = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      showMessage('error', 'Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('error', 'New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showMessage('error', 'New password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showMessage('success', 'Password updated successfully!');
      
    } catch (error) {
      showMessage('error', 'Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    const confirmText = prompt('Type "DELETE" to confirm account deletion:');
    if (confirmText === 'DELETE') {
      if (window.confirm('This action cannot be undone. Are you absolutely sure you want to delete your account?')) {
        // Simulate account deletion
        showMessage('info', 'Account deletion initiated. You will be logged out shortly.');
        // In a real app, this would redirect to login or home page
      }
    } else if (confirmText !== null) {
      showMessage('error', 'Account deletion cancelled. Please type "DELETE" exactly to confirm.');
    }
  };

  const handleExportData = () => {
    const exportData = {
      profile: profileData,
      notifications: notifications,
      account: accountSettings,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `career-coach-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showMessage('success', 'Data exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
          {/* Message Display */}
          {message.text && (
            <div className={`mb-4 p-4 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
              message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
              message.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
              message.type === 'info' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
              'bg-gray-100 text-gray-800 border border-gray-200'
            }`}>
              {message.type === 'success' && <FaCheck className="text-green-600" />}
              {message.type === 'error' && <FaTimes className="text-red-600" />}
              {message.type === 'info' && <FaBell className="text-blue-600" />}
              <span>{message.text}</span>
            </div>
          )}

          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3 group">
              <MdOutlineSettings className="text-indigo-400 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-180" size={32} />
              <h1 className="text-3xl font-bold text-gray-900 transition-colors duration-300 hover:text-indigo-600">Admin & Settings</h1>
              {hasChanges && (
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full border border-orange-200">
                  Unsaved Changes
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveSettings}
                disabled={!hasChanges || isLoading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  hasChanges && !isLoading
                    ? 'bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <BiSave size={18} className="transition-transform duration-200 hover:scale-110" />
                <span className="hidden md:inline">
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </span>
              </button>
              <button
                onClick={handleResetSettings}
                disabled={isLoading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  isLoading
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md'
                }`}
              >
                <BiRefresh size={18} className="transition-transform duration-200 hover:rotate-180" />
                <span className="hidden md:inline">Reset</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 transition-colors duration-200 hover:text-indigo-600">Settings</h2>
                <nav className="space-y-2">
                  {tabOptions.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                        activeTab === tab.id
                          ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md'
                      }`}
                    >
                      <tab.icon size={18} className="transition-transform duration-200 hover:rotate-12" />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl group">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2 transition-colors duration-200 group-hover:text-indigo-600">
                      <FaUser className="text-indigo-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={20} />
                      <span>Personal Information</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
                          className="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-[1.02] focus:shadow-lg hover:border-indigo-300"
                          placeholder="Enter your first name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
                          className="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-[1.02] focus:shadow-lg hover:border-indigo-300"
                          placeholder="Enter your last name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                          className="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-[1.02] focus:shadow-lg hover:border-indigo-300"
                          placeholder="Enter your email address"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                          className="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-[1.02] focus:shadow-lg hover:border-indigo-300"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Location</label>
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => handleInputChange('profile', 'location', e.target.value)}
                          className="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-[1.02] focus:shadow-lg hover:border-indigo-300"
                          placeholder="Enter your location"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">LinkedIn</label>
                        <input
                          type="url"
                          value={profileData.linkedin}
                          onChange={(e) => handleInputChange('profile', 'linkedin', e.target.value)}
                          className="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-[1.02] focus:shadow-lg hover:border-indigo-300"
                          placeholder="Enter your LinkedIn profile URL"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Website</label>
                        <input
                          type="url"
                          value={profileData.website}
                          onChange={(e) => handleInputChange('profile', 'website', e.target.value)}
                          className="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-[1.02] focus:shadow-lg hover:border-indigo-300"
                          placeholder="Enter your website URL"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Bio</label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => handleInputChange('profile', 'bio', e.target.value)}
                          rows="3"
                          className="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-[1.02] focus:shadow-lg hover:border-indigo-300"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl group">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2 transition-colors duration-200 group-hover:text-indigo-600">
                      <FaBell className="text-indigo-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={20} />
                      <span>Notification Preferences</span>
                    </h3>
                    
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
                          <div>
                            <h4 className="font-medium text-gray-900 capitalize transition-colors duration-200 hover:text-indigo-600">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 transition-colors duration-200 hover:text-gray-700">
                              {getNotificationDescription(key)}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 transition-all duration-200 hover:scale-105"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl group">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2 transition-colors duration-200 group-hover:text-indigo-600">
                      <FaLock className="text-indigo-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={20} />
                      <span>Security Settings</span>
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2 transition-colors duration-200 hover:text-indigo-600">Change Password</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1 transition-colors duration-200 hover:text-gray-700">Current Password</label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                value={passwordData.currentPassword}
                                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                                className="w-full bg-gray-100 text-gray-900 rounded-lg px-4 py-2 pr-10 border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-[1.02] focus:shadow-lg focus:bg-white"
                                placeholder="Enter current password"
                              />
                              <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-110"
                              >
                                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1 transition-colors duration-200 hover:text-gray-700">New Password</label>
                            <input
                              type="password"
                              value={passwordData.newPassword}
                              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                              className="w-full bg-gray-100 text-gray-900 rounded-lg px-4 py-2 border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-[1.02] focus:shadow-lg focus:bg-white"
                              placeholder="Enter new password"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1 transition-colors duration-200 hover:text-gray-700">Confirm New Password</label>
                            <input
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                              className="w-full bg-gray-100 text-gray-900 rounded-lg px-4 py-2 border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-[1.02] focus:shadow-lg focus:bg-white"
                              placeholder="Confirm new password"
                            />
                          </div>
                          <button 
                            onClick={handlePasswordUpdate}
                            disabled={isLoading}
                            className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                              isLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25'
                            }`}
                          >
                            {isLoading ? 'Updating...' : 'Update Password'}
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-100 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={accountSettings.twoFactorAuth}
                              onChange={(e) => handleInputChange('account', 'twoFactorAuth', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy & Data Settings */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl group">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2 transition-colors duration-200 group-hover:text-indigo-600">
                      <FaDatabase className="text-indigo-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={20} />
                      <span>Privacy & Data Management</span>
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="p-4 bg-gray-100 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
                        <h4 className="font-medium text-gray-900 mb-4 transition-colors duration-200 hover:text-blue-600">Data Export & Download</h4>
                        <p className="text-gray-600 text-sm mb-4 transition-colors duration-200 hover:text-gray-700">Download a copy of all your data including profile information, analysis history, and generated roadmaps.</p>
                        <button
                          onClick={handleExportData}
                          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
                        >
                          <BiDownload size={18} className="transition-transform duration-200 hover:scale-110" />
                          <span>Export My Data</span>
                        </button>
                      </div>

                      <div className="p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-4">Profile Visibility</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-md cursor-pointer">
                            <input
                              type="radio"
                              name="visibility"
                              value="public"
                              checked={accountSettings.profileVisibility === 'public'}
                              onChange={(e) => handleInputChange('account', 'profileVisibility', e.target.value)}
                              className="form-radio text-indigo-400 transition-all duration-200 focus:ring-2 focus:ring-indigo-400"
                            />
                            <div>
                              <span className="text-gray-900 transition-colors duration-200 hover:text-indigo-600">Public</span>
                              <p className="text-sm text-gray-600 transition-colors duration-200 hover:text-gray-700">Your profile is visible to everyone</p>
                            </div>
                          </label>
                          <label className="flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-md cursor-pointer">
                            <input
                              type="radio"
                              name="visibility"
                              value="private"
                              checked={accountSettings.profileVisibility === 'private'}
                              onChange={(e) => handleInputChange('account', 'profileVisibility', e.target.value)}
                              className="form-radio text-indigo-400 transition-all duration-200 focus:ring-2 focus:ring-indigo-400"
                            />
                            <div>
                              <span className="text-gray-900 transition-colors duration-200 hover:text-indigo-600">Private</span>
                              <p className="text-sm text-gray-600 transition-colors duration-200 hover:text-gray-700">Only you can see your profile</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-4">Data Collection & Analytics</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg transition-all duration-200 hover:shadow-md">
                            <div>
                              <h5 className="font-medium text-gray-900 transition-colors duration-200 hover:text-indigo-600">Data Collection</h5>
                              <p className="text-sm text-gray-600 mt-1 transition-colors duration-200 hover:text-gray-700">Allow collection of usage data to improve the platform</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={accountSettings.dataCollection}
                                onChange={(e) => handleInputChange('account', 'dataCollection', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 transition-all duration-200 hover:scale-105"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg transition-all duration-200 hover:shadow-md">
                            <div>
                              <h5 className="font-medium text-gray-900 transition-colors duration-200 hover:text-indigo-600">Analytics Sharing</h5>
                              <p className="text-sm text-gray-600 mt-1 transition-colors duration-200 hover:text-gray-700">Share anonymized analytics data for research purposes</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={accountSettings.analyticsSharing}
                                onChange={(e) => handleInputChange('account', 'analyticsSharing', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 transition-all duration-200 hover:scale-105"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg transition-all duration-200 hover:bg-red-100 hover:shadow-md">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2 transition-colors duration-200 hover:text-red-600">
                          <BiTrash className="text-red-400 transition-all duration-200 transform hover:scale-110 hover:rotate-12" size={18} />
                          <span>Delete Account</span>
                        </h4>
                        <p className="text-gray-600 text-sm mb-4 transition-colors duration-200 hover:text-gray-700">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <button
                          onClick={handleDeleteAccount}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/25"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

const getNotificationDescription = (key) => {
  const descriptions = {
    emailNotifications: 'Receive notifications via email',
    pushNotifications: 'Receive push notifications in your browser',
    roadmapUpdates: 'Get notified when your roadmap is updated',
    newFeatures: 'Be the first to know about new platform features',
    weeklyDigest: 'Receive a weekly summary of your progress',
    marketingEmails: 'Receive promotional emails and offers'
  };
  return descriptions[key] || 'Toggle this notification setting';
};

export default Settings;