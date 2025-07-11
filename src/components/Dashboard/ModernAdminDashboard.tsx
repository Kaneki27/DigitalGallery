import React from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Image, Shield, BarChart3, AlertTriangle, TrendingUp, Activity, Zap } from 'lucide-react';

const ModernAdminDashboard: React.FC = () => {
  const { user, adminLogout } = useAdminAuth();
  const navigate = useNavigate();

  const mockPendingMedia = [
    {
      id: '1',
      title: 'Team Outing Photos',
      user: 'John Doe',
      event: 'Annual Company Day 2024',
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200',
      uploadedAt: '2024-12-15T10:30:00Z',
    },
    {
      id: '2',
      title: 'Holiday Party Moments',
      user: 'Sarah Wilson',
      event: 'Holiday Celebration',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=200',
      uploadedAt: '2024-12-15T09:15:00Z',
    },
  ];

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: Users,
      color: 'from-blue-500 to-purple-600',
      action: () => navigate('/admin/users')
    },
    {
      title: 'Content Review',
      description: 'Review and moderate pending media',
      icon: Shield,
      color: 'from-green-400 to-blue-500',
      action: () => navigate('/admin/moderation')
    },
    {
      title: 'Analytics',
      description: 'View platform metrics and insights',
      icon: BarChart3,
      color: 'from-orange-400 to-pink-500',
      action: () => navigate('/admin/analytics')
    },
    {
      title: 'Media Library',
      description: 'Manage all uploaded media files',
      icon: Image,
      color: 'from-purple-400 to-pink-500',
      action: () => navigate('/admin/media')
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Admin Control Center</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Admin Dashboard 🚀
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Monitor and manage your office event gallery platform with powerful admin tools.
          </p>
          <p className="text-sm text-gray-500 mt-2">Welcome, {user?.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">234</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Events</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">18</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  3 new this week
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
                <p className="text-sm font-medium text-gray-600">Total Media</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">1,847</p>
                <p className="text-xs text-orange-600 mt-1 flex items-center">
                  <Image className="h-3 w-3 mr-1" />
                  156 today
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Image className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  4 urgent
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={action.action}
              className="group cursor-pointer bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{action.description}</p>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-purple-600 transition-colors">
                <span className="text-sm">Manage</span>
                <Zap className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Pending Approvals */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <AlertTriangle className="h-6 w-6 text-orange-500 mr-3" />
              Pending Approvals
            </h2>
            <button 
              onClick={() => navigate('/admin/moderation')}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              Review All
            </button>
          </div>
          
          <div className="space-y-4">
            {mockPendingMedia.map((media) => (
              <div key={media.id} className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200 bg-white/50 hover:bg-white/80 transition-colors">
                <img
                  src={media.image}
                  alt={media.title}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{media.title}</h3>
                  <p className="text-sm text-gray-600">by {media.user}</p>
                  <p className="text-xs text-gray-500">{media.event}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors font-medium">
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors font-medium">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernAdminDashboard;