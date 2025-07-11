import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Upload, Heart, Users, Camera, Star, TrendingUp, Award, Zap } from 'lucide-react';

const ModernEmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const mockEvents = [
    {
      id: '1',
      name: 'Annual Company Day 2024',
      date: '2024-12-15',
      image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=400',
      mediaCount: 45,
      likes: 128,
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      id: '2',
      name: 'Team Building Adventure',
      date: '2024-12-10',
      image: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=400',
      mediaCount: 32,
      likes: 89,
      gradient: 'from-green-400 to-blue-500'
    },
    {
      id: '3',
      name: 'Holiday Celebration',
      date: '2024-12-05',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      mediaCount: 67,
      likes: 203,
      gradient: 'from-orange-400 to-pink-500'
    },
  ];

  const quickActions = [
    {
      title: 'Upload Photos',
      description: 'Share your latest event memories',
      icon: Upload,
      color: 'from-blue-500 to-purple-600',
      action: () => navigate('/employee/upload')
    },
    {
      title: 'Browse Events',
      description: 'Discover new event galleries',
      icon: Calendar,
      color: 'from-orange-400 to-pink-500',
      action: () => navigate('/employee/events')
    },
    {
      title: 'My Gallery',
      description: 'View your uploaded content',
      icon: Camera,
      color: 'from-green-400 to-blue-500',
      action: () => navigate('/employee/gallery')
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-300 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Welcome back to your memories!</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Hey {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to relive some amazing moments? Let's explore your latest memories and create new ones together.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Uploads</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{user?.totalUploads || 42}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Upload className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Likes Received</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{user?.totalLikes || 128}</p>
                <p className="text-xs text-pink-600 mt-1 flex items-center">
                  <Heart className="h-3 w-3 mr-1" />
                  +8% this week
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Events Joined</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  3 new this month
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Achievement</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">⭐</p>
                <p className="text-xs text-yellow-600 mt-1 flex items-center">
                  <Award className="h-3 w-3 mr-1" />
                  Top Contributor
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={action.action}
              className="group cursor-pointer bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-gray-600 mb-4">{action.description}</p>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-purple-600 transition-colors">
                <span>Get Started</span>
                <Zap className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Events */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Recent Events</h2>
            <button 
              onClick={() => navigate('/employee/events')}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              View All Events
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${event.gradient} opacity-60`}></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{event.name}</h3>
                    <p className="text-sm opacity-90">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center">
                      <Camera className="h-4 w-4 mr-1" />
                      {event.mediaCount} photos
                    </span>
                    <span className="text-sm text-gray-600 flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {event.likes} likes
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernEmployeeDashboard;