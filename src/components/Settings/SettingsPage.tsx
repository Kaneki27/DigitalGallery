import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Globe, 
  Smartphone, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Volume2,
  VolumeX
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    newEvents: true,
    eventReminders: false,
    weeklyDigest: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'everyone',
    showEmail: false,
    showDepartment: true,
  });
  const [preferences, setPreferences] = useState({
    darkMode: false,
    soundEffects: true,
    autoPlay: false,
  });

  const settingSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Edit Profile', action: () => console.log('Edit profile') },
        { label: 'Change Password', action: () => console.log('Change password') },
        { label: 'Email Preferences', action: () => console.log('Email preferences') },
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        { label: 'Privacy Settings', action: () => console.log('Privacy settings') },
        { label: 'Blocked Users', action: () => console.log('Blocked users') },
        { label: 'Data Download', action: () => console.log('Data download') },
      ]
    },
    {
      title: 'Help & Support',
      icon: HelpCircle,
      items: [
        { label: 'Help Center', action: () => console.log('Help center') },
        { label: 'Report a Problem', action: () => console.log('Report problem') },
        { label: 'Terms of Service', action: () => console.log('Terms') },
        { label: 'Privacy Policy', action: () => console.log('Privacy policy') },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500">{user?.department} Department</p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </span>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Privacy</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Visibility
              </label>
              <select
                value={privacy.profileVisibility}
                onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="everyone">Everyone</option>
                <option value="company">Company Only</option>
                <option value="department">Department Only</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Show Email Address</span>
              <button
                onClick={() => setPrivacy(prev => ({ ...prev, showEmail: !prev.showEmail }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacy.showEmail ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Show Department</span>
              <button
                onClick={() => setPrivacy(prev => ({ ...prev, showDepartment: !prev.showDepartment }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacy.showDepartment ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.showDepartment ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Smartphone className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {preferences.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="text-gray-700">Dark Mode</span>
              </div>
              <button
                onClick={() => setPreferences(prev => ({ ...prev, darkMode: !prev.darkMode }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.darkMode ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {preferences.soundEffects ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                <span className="text-gray-700">Sound Effects</span>
              </div>
              <button
                onClick={() => setPreferences(prev => ({ ...prev, soundEffects: !prev.soundEffects }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.soundEffects ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.soundEffects ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Auto-play Videos</span>
              <button
                onClick={() => setPreferences(prev => ({ ...prev, autoPlay: !prev.autoPlay }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.autoPlay ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.autoPlay ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {settingSections.map((section) => (
          <div key={section.title} className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <section.icon className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
            </div>
            <div className="space-y-2">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="text-gray-700">{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div className="p-6">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;