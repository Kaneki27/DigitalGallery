import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  Image, 
  Heart, 
  MessageCircle,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Upload,
  Award,
  Clock,
  Target
} from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const mockAnalytics = {
    overview: {
      totalUsers: 234,
      activeUsers: 189,
      totalEvents: 18,
      totalMedia: 1847,
      totalLikes: 5632,
      totalComments: 892,
      storageUsed: '2.4 GB',
      avgEngagement: '78%'
    },
    trends: {
      userGrowth: '+12%',
      mediaUploads: '+24%',
      engagement: '+8%',
      eventParticipation: '+15%'
    },
    topEvents: [
      { name: 'Annual Company Day 2024', participants: 234, media: 156, engagement: '92%' },
      { name: 'Holiday Celebration', participants: 189, media: 89, engagement: '87%' },
      { name: 'Team Building Adventure', participants: 145, media: 67, engagement: '84%' },
      { name: 'Engineering Hackathon', participants: 89, media: 45, engagement: '91%' }
    ],
    topContributors: [
      { name: 'Sarah Wilson', uploads: 45, likes: 234, department: 'Marketing' },
      { name: 'John Doe', uploads: 38, likes: 189, department: 'Engineering' },
      { name: 'Mike Johnson', uploads: 32, likes: 156, department: 'Sales' },
      { name: 'Emma Davis', uploads: 28, likes: 134, department: 'Design' }
    ],
    departmentStats: [
      { name: 'Engineering', users: 67, uploads: 234, engagement: '89%' },
      { name: 'Marketing', users: 45, uploads: 189, engagement: '92%' },
      { name: 'Sales', users: 38, uploads: 156, engagement: '85%' },
      { name: 'HR', users: 23, uploads: 98, engagement: '94%' },
      { name: 'Design', users: 19, uploads: 87, engagement: '88%' }
    ]
  };

  const chartData = [
    { day: 'Mon', uploads: 12, likes: 45, comments: 8 },
    { day: 'Tue', uploads: 19, likes: 67, comments: 12 },
    { day: 'Wed', uploads: 15, likes: 52, comments: 9 },
    { day: 'Thu', uploads: 22, likes: 78, comments: 15 },
    { day: 'Fri', uploads: 28, likes: 89, comments: 18 },
    { day: 'Sat', uploads: 8, likes: 23, comments: 4 },
    { day: 'Sun', uploads: 6, likes: 18, comments: 3 }
  ];

  const maxValue = Math.max(...chartData.map(d => Math.max(d.uploads, d.likes, d.comments)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Platform Analytics</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Analytics Dashboard 📊
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive insights into platform usage, engagement, and growth metrics.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="overview">Overview</option>
                <option value="engagement">Engagement</option>
                <option value="users">Users</option>
                <option value="content">Content</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              <button className="px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {mockAnalytics.trends.userGrowth}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockAnalytics.overview.totalUsers}</h3>
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-xs text-gray-500 mt-1">{mockAnalytics.overview.activeUsers} active this week</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {mockAnalytics.trends.eventParticipation}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockAnalytics.overview.totalEvents}</h3>
            <p className="text-gray-600 text-sm">Active Events</p>
            <p className="text-xs text-gray-500 mt-1">3 new this month</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Image className="h-6 w-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {mockAnalytics.trends.mediaUploads}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockAnalytics.overview.totalMedia}</h3>
            <p className="text-gray-600 text-sm">Total Media</p>
            <p className="text-xs text-gray-500 mt-1">{mockAnalytics.overview.storageUsed} storage used</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {mockAnalytics.trends.engagement}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockAnalytics.overview.avgEngagement}</h3>
            <p className="text-gray-600 text-sm">Avg Engagement</p>
            <p className="text-xs text-gray-500 mt-1">{mockAnalytics.overview.totalLikes} total likes</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Activity Chart */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Weekly Activity</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Uploads</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Likes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Comments</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {chartData.map((data, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 text-sm text-gray-600">{data.day}</div>
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(data.uploads / maxValue) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 w-8">{data.uploads}</span>
                  </div>
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(data.likes / maxValue) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 w-8">{data.likes}</span>
                  </div>
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${(data.comments / maxValue) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 w-8">{data.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Events */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Top Events</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
            
            <div className="space-y-4">
              {mockAnalytics.topEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{event.name}</h4>
                      <p className="text-sm text-gray-600">{event.participants} participants • {event.media} media</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{event.engagement}</div>
                    <div className="text-xs text-gray-500">engagement</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Stats & Top Contributors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Department Statistics */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Department Statistics</h3>
              <Target className="h-5 w-5 text-gray-500" />
            </div>
            
            <div className="space-y-4">
              {mockAnalytics.departmentStats.map((dept, index) => (
                <div key={index} className="p-4 bg-white/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                    <span className="text-sm font-medium text-green-600">{dept.engagement}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{dept.users} users</span>
                    <span>{dept.uploads} uploads</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                      style={{ width: `${parseInt(dept.engagement)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Contributors */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Top Contributors</h3>
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            
            <div className="space-y-4">
              {mockAnalytics.topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                      index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                      index === 2 ? 'bg-gradient-to-r from-orange-400 to-red-500' :
                      'bg-gradient-to-r from-blue-400 to-purple-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{contributor.name}</h4>
                      <p className="text-sm text-gray-600">{contributor.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{contributor.uploads} uploads</div>
                    <div className="text-xs text-gray-500">{contributor.likes} likes</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;